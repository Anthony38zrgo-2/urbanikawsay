---
name: seo-preservation
description: Preserve intentional URL, metadata, crawl and structured-data behavior while moving public WordPress pages to Vue.
---

# SEO Preservation

For each public route in scope, compare legacy and candidate:

- URL/permalink;
- redirects;
- title and meta description;
- canonical;
- robots intent;
- heading hierarchy;
- applicable structured data;
- social metadata when required;
- sitemap/robots integration when affected.

Rendering strategy is a Planner decision. Do not assume that a pure client-rendered SPA is appropriate for a public content page merely because Vue is the target framework.

A build/test PASS does not prove SEO equivalence. Validate generated/delivered HTML and route behavior using the deployment strategy selected by the plan.
