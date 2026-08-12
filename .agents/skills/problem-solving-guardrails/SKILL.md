---
name: problem-solving-guardrails
description: Enforce hypothesis-based debugging, the implementation-attempt budget, rollback and Diagnostic Mode during migration failures.
---

# Problem-Solving Guardrails

Attempt 0: observe, baseline, ownership, hypothesis, falsification test.
Attempt 1: one reversible causal micro-patch.
Attempt 2: only with new evidence, changed hypothesis, or changed failure signature.

Same hypothesis + same signature after two implementation attempts => no more Builder patches. Run Context GC and route to Planner Diagnostic Mode.

Failed experiments must reject a hypothesis, verify a fact, narrow the search, change the failure signature or identify ownership. Otherwise redesign the experiment.
