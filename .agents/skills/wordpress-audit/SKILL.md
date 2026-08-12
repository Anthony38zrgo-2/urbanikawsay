---
name: wordpress-audit
description: Inventory a legacy WordPress surface before migration and classify what must be preserved, rebuilt, replaced, dropped or investigated.
---

# WordPress Audit

Do not begin by translating PHP templates to Vue.

For the requested scope, inventory the smallest relevant set of:

1. public URL/permalink and redirects;
2. template/template-part or page-builder source;
3. menus/navigation state;
4. content source, custom post type, taxonomy, fields and media;
5. shortcodes/widgets/plugins that alter rendered behavior;
6. forms, validation, submission target and success/error states;
7. metadata, canonical, schema, robots and social tags;
8. analytics/tag-manager/cookie behavior;
9. client scripts and third-party embeds;
10. responsive states and accessibility-critical interactions.

Classify each item:

```text
PRESERVE | REBUILD | REPLACE | DROP | UNKNOWN
```

Every `DROP` needs explicit justification. Every `UNKNOWN` blocks destructive migration of that dependency.

Output a bounded legacy contract, not a repository encyclopedia. Preserve source references so Builder can verify behavior without reopening the entire investigation.
