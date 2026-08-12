---
name: web-performance
description: Keep the modernized Vue site lightweight by measuring actual loading/runtime costs before adding optimization complexity.
---

# Web Performance

Measure before optimizing. Focus on costs introduced by the migration:

- oversized JS/CSS bundles;
- duplicate dependencies;
- unnecessary global imports;
- unoptimized images/fonts;
- eager loading of route-specific code;
- repeated network requests;
- layout shifts caused by missing dimensions;
- expensive reactive work in frequently rendered components.

Prefer simple fixes such as asset sizing, route-level loading, dependency removal and avoiding unnecessary reactivity before introducing caching layers or complex build customization.
