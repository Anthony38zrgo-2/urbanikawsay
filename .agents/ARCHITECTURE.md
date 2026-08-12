# Architecture — WordPress to Vue 3 Modernization Control Plane

## Scope

This `.agents` directory is a small local control plane for a WordPress -> Vue 3 + Tailwind migration. Its purpose is not to create a large autonomous-agent platform. It exists to keep planning expensive and sparse, execution cheap and frequent, context bounded, and migration decisions reviewable.

## Core topology

```text
User / backlog item
       |
       v
bounded project context
       |
       +--> exact instructions
       +--> curated knowledge
       +--> common migration problems
       +--> relevant skill metadata
       |
       v
Deterministic Router
       |
       +--> PLANNER: GLM 5.2 MAX
       |       audit / architecture / migration contracts / diagnosis / milestone review
       |
       +--> BUILDER: DeepSeek V4 Flash Low
               Vue / Tailwind / SVG / tests / bounded fixes
       |
       v
validation evidence + telemetry
```

## Cost discipline

The default economic shape is one Planner pass followed by several Builder tasks. A Builder task returns to Planner only when a planning boundary is crossed: architecture, rendering strategy, URL/SEO policy, component-system policy, ambiguous ownership, contradictory acceptance criteria, high-risk cross-cutting change, or repeated failure.

Large file count alone is not a Planner trigger.

## Storage

### SQLite — runtime state

`.agents/data/agents.db` stores fast local indexes, backlog state, context bundles, routing decisions, and telemetry. It is not committed.

### JSON — canonical reviewed inputs

Version-controlled JSON stores agents, skills, instructions, known problems, curated knowledge and backlog seeds. These are readable in diffs and reseed SQLite.

## Knowledge channels

- `wordpress`
- `vue`
- `tailwind`
- `svg`
- `seo`
- `web-platform`

The knowledge layer is intentionally compact. It stores project-useful constraints and lookup hints, not full copies of documentation.

## Runtime hot path

```text
Task
  -> agentdb agent <planner|builder>
  -> agentdb instruction <scope> [trigger]
  -> optional agentdb problem <term>
  -> optional agentdb knowledge <channel> <term>
  -> agentdb route <task metadata>
  -> opencode run --model ... --variant ... --agent ...
```

No embeddings, crawling, bulk documentation ingestion, or ETL are allowed in the hot path.

## Routing policy

Planner is selected for explicit planning/review/audit tasks, architecture or rendering changes, high technical risk, cross-system policy changes, Diagnostic Mode, missing migration contracts for meaningful implementation, and evidence stagnation.

Builder is selected for routine implementation, bounded refactors, tests, content wiring, SVG generation, responsive fixes and ordinary debugging while the plan remains valid.

The router is deterministic. The LLM does not decide which model should receive the task.

## Migration unit

The preferred unit is a vertical slice that can be evaluated independently, for example:

```text
/about
  + route
  + page component
  + shared header/footer dependencies
  + migrated content/assets
  + SVG icons
  + responsive states
  + metadata
  + visual baseline comparison
```

A slice is accepted before the next major slice when practical. Shared primitives may be extracted after at least two real usages demonstrate the abstraction.

## Rendering strategy boundary

Vue 3 is fixed; delivery mode is not assumed. A public WordPress replacement may require client rendering, prerendering, static generation, SSR, or a hybrid. Planner owns that decision based on the actual site and deployment constraints. Builder must not change it opportunistically.

## Deliberate non-goals

- vector database;
- autonomous recursive delegation;
- automatic web crawling of WordPress;
- automatic content rewriting;
- blind one-shot site regeneration;
- a universal design system before real pages exist;
- a microfrontend architecture without measured need;
- replacing backend/server functionality with browser code merely to simplify the frontend;
- storing secrets in the client bundle.
