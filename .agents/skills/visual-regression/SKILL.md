---
name: visual-regression
description: Compare migrated Vue/Tailwind output against a declared legacy baseline and visual intent across representative responsive widths.
---

# Visual Regression

Every visual comparison must state the intended class:

```text
FIDELITY | REFRESH | REDESIGN
```

Compare the properties that matter for that class: hierarchy, spacing, alignment, typography, imagery, navigation state, breakpoints, interaction states and component consistency.

Use representative mobile and desktop widths at minimum for responsive surfaces. Add intermediate widths when the layout has meaningful transitions.

Classify results as `PASS`, `FAIL`, or `INCONCLUSIVE`. Do not call intentional redesign differences regressions, and do not excuse accidental layout breakage as modernization.
