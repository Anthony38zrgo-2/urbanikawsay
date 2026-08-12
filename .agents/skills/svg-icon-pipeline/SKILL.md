---
name: svg-icon-pipeline
description: Generate and integrate a coherent set of lightweight SVG icons for the Vue interface without adding icon fonts or unnecessary icon dependencies.
---

# SVG Icon Pipeline

First define the icon contract for the site: stroke vs fill, optical grid, corner language, stroke width, default size and color behavior.

For each icon:

1. use a valid `viewBox`;
2. keep paths/shapes minimal;
3. use `currentColor` for themeable single-color icons;
4. avoid fixed colors unless intentionally multicolor;
5. remove editor metadata and unnecessary grouping;
6. use semantic filenames/component names;
7. ensure decorative icons do not duplicate accessible text;
8. label informational icons appropriately;
9. verify the actual UI sizes, not only a large preview.

Do not use raster icons, emoji substitutes, icon fonts or a third-party icon package unless the task explicitly changes that constraint.
