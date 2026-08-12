---
name: migration-planning
description: Convert a WordPress audit into a bounded Vue 3 migration contract that a cheaper Builder can execute without inventing architecture.
---

# Migration Planning

Prefer vertical slices that can be accepted independently.

Mandatory plan structure:

```text
OBJECTIVE
LEGACY BASELINE
VISUAL INTENT: FIDELITY | REFRESH | REDESIGN
IN SCOPE
OUT OF SCOPE
ROUTES / FEATURES
EXTERNAL CONTRACTS TO PRESERVE
CONTENT MAP
SEO / RENDERING REQUIREMENTS
COMPONENT OWNERSHIP
TAILWIND / DESIGN TOKENS USED
SVG ICON CONTRACT
IMPLEMENTATION STEPS
VALIDATION COMMANDS
VISUAL / RESPONSIVE CHECKS
ACCEPTANCE CRITERIA
ROLLBACK CONDITIONS
RISKS / UNKNOWNS
DO NOT CHANGE
```

Planner should resolve architecture and policy questions once, then produce several Builder-sized tasks. Avoid asking GLM to repeatedly rediscover the same repository context.

Do not create abstractions merely because several future pages might need them. Extract shared primitives after evidence from real migrated pages unless the legacy audit proves the shared contract already exists.
