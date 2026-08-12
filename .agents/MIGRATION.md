# Migration Notes

This bundle intentionally removes Formula-90/Godot/3D-specific roles, knowledge and skills while retaining the useful control-plane ideas: deterministic routing, SQLite lookup, compact JSON knowledge, backlog packets, telemetry, Fail Fast guardrails, Context GC and evidence-based handoff.

## Routing changes

Old multi-model escalation policy -> two-capability policy:

```text
GLM 5.2 MAX           planner / architect / diagnostic reviewer
DeepSeek V4 Flash Low builder / implementer / routine validator
```

The critical optimization is not "always ask the stronger model first". It is "use one strong planning pass to create several cheap executable tasks".

## Domain changes

Removed: Godot, C++, Blender, vehicle physics, 3D assets, telemetry-specific game skills.

Added: WordPress audit, migration planning, Vue 3, Tailwind, SVG, content migration, SEO preservation, accessibility, visual regression and web performance.
