use rusqlite::{params, Connection, OptionalExtension};
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use std::{error::Error, fs, path::Path};

#[derive(Deserialize, Clone)]
pub struct RoutingConfig {
    pub schema_version: u32,
    pub provider: ProviderConfig,
    pub planner: ModelSpec,
    pub builder: ModelSpec,
    pub limits: Limits,
    pub policy: Policy,
}

#[derive(Deserialize, Clone)]
pub struct ProviderConfig {
    pub id: String,
    pub enabled: bool,
}

#[derive(Deserialize, Serialize, Clone)]
pub struct ModelSpec {
    pub model: String,
    pub variant: String,
    pub opencode_agent: String,
}

#[derive(Deserialize, Clone)]
pub struct Limits {
    pub max_implementation_attempts: i64,
    pub cross_subsystem_threshold: i64,
    pub planner_review_file_threshold: i64,
}

#[derive(Deserialize, Clone)]
pub struct Policy {
    pub meaningful_implementation_requires_plan: bool,
    pub meaningful_implementation_requires_acceptance_criteria: bool,
    pub unknown_override_falls_back_to_planner: bool,
}

#[derive(Deserialize, Default, Clone)]
#[serde(default)]
pub struct TaskMetadata {
    pub agent_id: String,
    pub role: String,
    pub task_type: String,
    pub attempt_count: i64,
    pub hypothesis_changed: bool,
    pub new_evidence: bool,
    pub failure_signature_changed: bool,
    pub same_failure_signature: bool,
    pub diagnostic_mode: bool,
    pub affected_files: i64,
    pub affected_subsystems: i64,
    pub architecture_change: bool,
    pub cross_subsystem_change: bool,
    pub technical_risk: String,
    pub root_cause_unknown: bool,
    pub conflicting_architectural_constraints: bool,
    pub ownership_boundary_refactor: bool,
    pub large_regression: bool,
    pub plan_ready: bool,
    pub acceptance_criteria_ready: bool,
    pub user_model_override: Option<String>,
}

#[derive(Serialize, Clone)]
pub struct RoutingDecision {
    pub provider: String,
    pub requested_model: String,
    pub requested_effort: String,
    pub model_tier: String,
    pub reason: String,
    pub rule: String,
    pub profile: Option<String>,
}

pub fn load_routing_config(agents_root: &Path) -> Result<RoutingConfig, Box<dyn Error>> {
    let path = agents_root.join("config/model-routing.json");
    let data = fs::read_to_string(&path)?;
    let cfg: RoutingConfig = serde_json::from_str(&data)?;
    if cfg.schema_version != 1 {
        return Err(format!("unsupported model-routing schema_version: {}", cfg.schema_version).into());
    }
    if !cfg.provider.enabled {
        return Err("OpenCode provider disabled in model-routing policy".into());
    }
    if cfg.planner.model.trim().is_empty() || cfg.builder.model.trim().is_empty() {
        return Err("planner/builder model id cannot be empty".into());
    }
    Ok(cfg)
}

fn planner_decision(cfg: &RoutingConfig, reason: &str, rule: &str) -> RoutingDecision {
    RoutingDecision {
        provider: "opencode".into(),
        requested_model: cfg.planner.model.clone(),
        requested_effort: cfg.planner.variant.clone(),
        model_tier: "planner".into(),
        reason: reason.into(),
        rule: rule.into(),
        profile: Some(cfg.planner.opencode_agent.clone()),
    }
}

fn builder_decision(cfg: &RoutingConfig, reason: &str, rule: &str) -> RoutingDecision {
    RoutingDecision {
        provider: "opencode".into(),
        requested_model: cfg.builder.model.clone(),
        requested_effort: cfg.builder.variant.clone(),
        model_tier: "builder".into(),
        reason: reason.into(),
        rule: rule.into(),
        profile: Some(cfg.builder.opencode_agent.clone()),
    }
}

pub fn decide(cfg: &RoutingConfig, meta: &TaskMetadata, role_from_registry: Option<&str>) -> RoutingDecision {
    let role = if !meta.role.trim().is_empty() { meta.role.trim().to_lowercase() }
        else { role_from_registry.unwrap_or("builder").trim().to_lowercase() };
    let task = meta.task_type.trim().to_lowercase();
    let risk = meta.technical_risk.trim().to_lowercase();
    let max_attempts = cfg.limits.max_implementation_attempts.max(1);
    let cross_threshold = cfg.limits.cross_subsystem_threshold.max(1);

    if let Some(raw) = &meta.user_model_override {
        let o = raw.trim().to_lowercase();
        if matches!(o.as_str(), "planner" | "glm" | "glm-5.2" | "glm-5.2-max" | "glm max" | "max") {
            return planner_decision(cfg, "user explicitly requested Planner / GLM 5.2 MAX", "user_override");
        }
        if matches!(o.as_str(), "builder" | "deepseek" | "deepseek-v4-flash" | "deepseek-v4-flash-low" | "flash" | "low") {
            return builder_decision(cfg, "user explicitly requested Builder / DeepSeek V4 Flash Low", "user_override");
        }
        if cfg.policy.unknown_override_falls_back_to_planner {
            return planner_decision(cfg, "unknown model override; fail-safe to Planner", "unknown_user_override");
        }
    }

    // Explicit planner work.
    if role == "planner" {
        return planner_decision(cfg, "planner role explicitly selected", "role_planner");
    }
    if matches!(task.as_str(), "planning" | "architecture" | "audit" | "migration-map" | "design-system" | "seo-strategy" | "review") {
        return planner_decision(cfg, "task changes or evaluates migration policy", "planning_task");
    }

    // Hard Planner gates: architecture, risk, cross-cutting policy, or evidence stagnation.
    if meta.architecture_change {
        return planner_decision(cfg, "architecture change requires Planner", "architecture_change");
    }
    if meta.conflicting_architectural_constraints || meta.ownership_boundary_refactor {
        return planner_decision(cfg, "ownership/architecture constraints require Planner", "architecture_boundary");
    }
    if meta.cross_subsystem_change && meta.affected_subsystems >= cross_threshold {
        return planner_decision(cfg, "cross-subsystem migration change requires Planner", "cross_subsystem_change");
    }
    if risk == "high" || meta.large_regression {
        return planner_decision(cfg, "high-risk or large regression requires Planner", "high_risk");
    }
    if meta.diagnostic_mode {
        return planner_decision(cfg, "Diagnostic Mode requires Planner and no blind production patching", "diagnostic_mode");
    }
    if meta.same_failure_signature && !meta.hypothesis_changed && !meta.new_evidence && !meta.failure_signature_changed {
        return planner_decision(cfg, "same failure signature without new evidence", "evidence_stagnation");
    }
    if meta.attempt_count >= max_attempts {
        return planner_decision(cfg, "implementation attempt budget exhausted", "attempt_budget_exhausted");
    }
    if meta.root_cause_unknown && meta.attempt_count >= 1 && risk != "low" {
        return planner_decision(cfg, "consequential root cause remains unknown after implementation", "root_cause_unknown");
    }

    let meaningful_impl = matches!(task.as_str(), "implementation" | "bugfix" | "refactor" | "migration" | "backlog" | "");
    if meaningful_impl && cfg.policy.meaningful_implementation_requires_plan && !meta.plan_ready {
        return planner_decision(cfg, "meaningful implementation has no approved migration plan", "plan_required");
    }
    if meaningful_impl && cfg.policy.meaningful_implementation_requires_acceptance_criteria && !meta.acceptance_criteria_ready {
        return planner_decision(cfg, "meaningful implementation has no explicit acceptance criteria", "acceptance_criteria_required");
    }

    // Cheap builder work. Read-only lookup/test work stays cheap unless caller selected Planner.
    match task.as_str() {
        "lookup" | "scan" | "search" | "validate" | "test" | "documentation" | "format" => {
            return builder_decision(cfg, "bounded low-risk work", "bounded_builder");
        }
        "debugging" => {
            if meta.attempt_count <= 1 {
                return builder_decision(cfg, "bounded debugging within attempt budget", "builder_debug");
            }
        }
        _ => {}
    }

    if meaningful_impl {
        return builder_decision(cfg, "approved bounded migration implementation", "routine_builder");
    }

    builder_decision(cfg, "default bounded execution", "default_builder")
}

pub fn cmd_route(conn: &Connection, args: &[String], agents_root: &Path) -> Result<Value, Box<dyn Error>> {
    let payload = args.get(2).ok_or_else(|| "missing argument: task-metadata-json".to_string())?;
    let payload = crate::telemetry::decode_payload_arg(payload)?;
    let meta: TaskMetadata = serde_json::from_str(&payload)?;
    let cfg = load_routing_config(agents_root)?;

    let role_from_registry: Option<String> = if meta.role.trim().is_empty() && !meta.agent_id.trim().is_empty() {
        conn.query_row(
            "SELECT role FROM agent_registry WHERE enabled=1 AND id=?1",
            params![meta.agent_id],
            |r| r.get(0),
        ).optional().ok().flatten()
    } else { None };

    let decision = decide(&cfg, &meta, role_from_registry.as_deref());

    if let Some(rid) = crate::telemetry::run_id_from_env().as_deref() {
        let detail = serde_json::to_string(&decision)?;
        crate::telemetry::emit_event(conn, Some(rid), "routing_decision", Some("route"), Some(decision.rule.as_str()), None, Some(&detail))?;
        if decision.model_tier == "planner" {
            crate::telemetry::emit_event(conn, Some(rid), "escalation", Some("route"), Some(decision.rule.as_str()), Some(meta.attempt_count), Some(&detail))?;
        }
        if meta.attempt_count >= 1 {
            crate::telemetry::emit_event(conn, Some(rid), "retry", Some("route"), Some("attempt_count"), Some(meta.attempt_count), None)?;
        }
    }

    Ok(json!({
        "ok": true,
        "provider": decision.provider,
        "requested_model": decision.requested_model,
        "requested_effort": decision.requested_effort,
        "model_tier": decision.model_tier,
        "reason": decision.reason,
        "rule": decision.rule,
        "profile": decision.profile,
        "provider_id": cfg.provider.id,
        "role": role_from_registry.or_else(|| (!meta.role.is_empty()).then(|| meta.role.clone()))
    }))
}
