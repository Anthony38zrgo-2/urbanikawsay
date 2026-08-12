---
name: accessibility
description: Preserve and improve semantic HTML, keyboard behavior, focus, labels and assistive-technology semantics during the migration.
---

# Accessibility

Prefer native semantic elements before ARIA.

Validate at minimum when relevant:

- logical headings and landmarks;
- keyboard reachability;
- visible focus;
- labels and descriptions for controls;
- button vs link semantics;
- form error association;
- dialogs/menus disclosure behavior;
- icon accessible names;
- image alt behavior;
- contrast and reduced-motion implications when the design changes.

Do not add ARIA to compensate for incorrect native semantics. Visual similarity is not enough if interaction semantics regress.
