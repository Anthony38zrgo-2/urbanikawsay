---
name: repo-analysis
description: Perform bounded repository analysis to identify ownership, execution flow and migration boundaries without exhaustively exploring the codebase.
---

# Bounded Repository Analysis

Inspect only enough to answer the current migration question.

1. Read root project instructions and `.agents/AGENTS.md`.
2. Identify the legacy and target surfaces.
3. Trace route -> data/content -> component/template -> style -> interaction ownership.
4. Inspect authoritative config and relevant dependencies.
5. List unknowns that can change the migration plan.
6. Design the cheapest falsification test.
7. Expand only when evidence requires it.

Large repositories do not justify loading the entire tree into model context.
