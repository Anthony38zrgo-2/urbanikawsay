---
name: regression-validation
description: Compare a migrated candidate against the relevant legacy or pre-change baseline and classify the result as PASS, FAIL or INCONCLUSIVE.
---

# Regression Validation

```text
BASELINE -> CONTRACT -> CHANGE -> CANDIDATE -> DELTA -> PASS | FAIL | INCONCLUSIVE
```

Validate in increasing scope: static/build checks, focused tests, route behavior, visual/responsive comparison, external contracts such as SEO/forms/analytics, then broader regression for accepted milestones.

Report baseline, candidate, measured/observed delta, uncertainty and classification. Roll back failed candidates unless independently useful and explicitly justified.
