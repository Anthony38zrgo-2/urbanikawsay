---
name: tailwind-design-system
description: Rebuild legacy styling with Tailwind using a small coherent token system, responsive intent and reusable patterns rather than utility-string duplication.
---

# Tailwind Design System

Before mass styling, identify the active token set: typography, spacing, surfaces, borders, radii, shadows, accent colors, container widths and major breakpoints.

Rules:

- prefer semantic shared components/patterns when repetition is proven;
- avoid arbitrary-value drift across pages;
- use arbitrary values only when a real fidelity requirement cannot be expressed by the token set;
- preserve mobile/tablet/desktop behavior intentionally;
- do not reproduce legacy specificity hacks;
- remove old CSS only when dependency checks prove the migrated surface no longer needs it;
- compare computed/rendered results, not just class names.

A successful build is not visual acceptance.
