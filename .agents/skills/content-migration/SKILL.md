---
name: content-migration
description: Move WordPress copy, media references and structured content into the new application without accidental rewriting or loss of source semantics.
---

# Content Migration

Content and presentation are separate migration concerns.

- Preserve source copy by default.
- Normalize only what the migration contract explicitly permits.
- Keep traceability from legacy source to target representation.
- Preserve meaningful alt text, captions, labels and link targets.
- Identify embedded shortcodes/HTML/widgets before stripping markup.
- Do not bake server secrets or private WordPress data into client bundles.
- Treat missing/ambiguous content as a migration defect, not an invitation to invent text.

If a new content model is required, Planner defines it before Builder performs bulk conversion.
