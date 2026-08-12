---
name: context-garbage-collection
description: Compress migration/debugging context after falsified hypotheses, failed candidates, milestone handoffs or excessive context growth.
---

# Context Garbage Collection

Preserve only information that changes the next decision:

- objective and route/feature scope;
- legacy baseline;
- verified facts;
- active migration contract and constraints;
- current failure signature;
- current hypothesis/status;
- rejected hypotheses with evidence;
- validation and rollback conditions.

Remove raw terminal output already summarized, stale file lists, superseded plans, repeated narrative and contradicted assumptions.
