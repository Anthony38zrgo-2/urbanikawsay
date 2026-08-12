---
name: vue3-migration
description: Implement bounded Vue 3 pages, components and composables under an approved migration contract without changing migration architecture.
---

# Vue 3 Migration

Use established repository conventions first. For new Vue 3 code, prefer Composition API and `<script setup>` unless the project explicitly standardizes another style.

Implementation order:

1. identify target route/page ownership;
2. preserve content/data contract;
3. build the smallest coherent component tree;
4. keep page orchestration separate from truly reusable presentation;
5. extract composables only for reusable stateful behavior;
6. implement loading/error/empty states when the legacy feature has them;
7. validate route behavior before broad refactoring.

Do not introduce a second router, state library, data-fetching pattern, form framework, or component-system convention without Planner approval. Avoid mega-components, but also avoid fragmentation into meaningless one-line wrappers.
