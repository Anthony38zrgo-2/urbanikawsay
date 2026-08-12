# Web Modernization Agent Runtime

Control plane for incrementally migrating a legacy WordPress frontend to Vue 3 + Tailwind CSS.

## Model split

- Planner: `GLM 5.2`, variant `max`.
- Builder: `DeepSeek V4 Flash`, variant `low`.

The default configuration targets OpenCode Go model ids. If the project uses OpenCode Zen pay-as-you-go instead, change only the two model ids in `config/model-routing.json` from `opencode-go/...` to `opencode/...`.

## Bootstrap

```text
cd .agents/runtime
cargo build --release
cd ../..
.agents/runtime/target/release/agentdb init
.agents/runtime/target/release/agentdb seed
.agents/runtime/target/release/agentdb validate
```

PowerShell preflight:

```powershell
.agents/scripts/00-preflight.ps1
```

## Useful queries

```text
agentdb agent planner
agentdb agent builder
agentdb knowledge wordpress shortcode
agentdb knowledge vue component ownership
agentdb knowledge tailwind tokens
agentdb knowledge svg currentColor
agentdb knowledge seo canonical
agentdb problem route
agentdb skill migration-planning
```

## Invoke through deterministic routing

Example planning pass:

```powershell
.agents/scripts/invoke-agent.ps1 `
  -AgentId planner `
  -TaskType planning `
  -Prompt "Audit the legacy site and produce the migration contract for /about"
```

Example Builder pass after the plan exists:

```powershell
.agents/scripts/invoke-agent.ps1 `
  -AgentId builder `
  -TaskType implementation `
  -PlanReady `
  -AcceptanceCriteriaReady `
  -Prompt "Implement the approved /about migration contract"
```

`invoke-agent.ps1` passes the router-selected model, variant and OpenCode primary agent (`plan` or `build`) to `opencode run`.

## Recommended repository migration stages

```text
legacy/         optional read-only snapshot/export references
src/            Vue application
public/         static public assets
migration/      inventories, route maps, content maps, visual baselines
.agents/        this control plane
```

Do not create these directories mechanically if the repository already has an established structure; adapt the plan to the actual project.
