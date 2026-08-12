# Web Modernization Agent Guide

## Mission

Modernize a legacy WordPress website into a maintainable Vue 3 + Tailwind CSS application while preserving the business-visible behavior that matters: content, URLs, navigation, forms, SEO signals, accessibility, responsive behavior, analytics hooks, and recognizable visual identity.

The system uses two capabilities only:

```text
GLM 5.2 MAX             -> PLANNER
DeepSeek V4 Flash Low   -> BUILDER
```

Planner thinks, decomposes, resolves ambiguity, defines contracts, and reviews consequential deltas. Builder implements bounded work, validates it, and reports evidence. The Builder must not silently redesign the migration. The Planner must not become the routine coding worker.

## Canonical principles

1. Inventory before rewrite.
2. Preserve externally observable contracts before improving internals.
3. Fail hypotheses before implementations.
4. Prefer the cheapest falsification test over speculative coding.
5. One migration increment should have one bounded objective and explicit acceptance criteria.
6. Capture a legacy baseline before replacing a page, template, component, route, form, or visual system.
7. Validate immediately after the smallest meaningful change.
8. A failed candidate must produce information and normally be rolled back.
9. Do not rewrite content while refactoring presentation unless content rewriting is explicitly in scope.
10. Do not change URLs, redirects, metadata, structured data, analytics, or form semantics accidentally.
11. Remove falsified assumptions and stale investigation output from active context.
12. Escalate to Planner on evidence stagnation, architecture uncertainty, migration-policy changes, or cross-cutting regressions—not because the task merely has many files.
13. Prefer repeated Builder executions under one good plan over repeated Planner calls.
14. Modernization is incremental. Avoid a "big bang" replacement unless the migration plan explicitly proves it is safer.

## Planner / Builder contract

### Planner — GLM 5.2 MAX

Use Planner for:

- initial WordPress audit and migration map;
- architecture and rendering strategy decisions;
- route/content/SEO preservation strategy;
- design-system and component-boundary decisions;
- plugin/widget/form replacement strategy;
- cross-cutting refactors or dependency changes;
- Diagnostic Mode after repeated failure;
- milestone review when a change affects several routes or contracts.

Planner output must be executable by a cheaper Builder. Every implementation plan should contain:

```text
OBJECTIVE
LEGACY BASELINE
IN SCOPE
OUT OF SCOPE
AFFECTED ROUTES / FEATURES
RELEVANT FILES
EXTERNAL CONTRACTS TO PRESERVE
DESIGN / COMPONENT DECISIONS
CONTENT / SEO REQUIREMENTS
SVG / ASSET REQUIREMENTS
IMPLEMENTATION STEPS
VALIDATION COMMANDS
VISUAL VALIDATION
ACCEPTANCE CRITERIA
ROLLBACK CONDITIONS
KNOWN RISKS
DO NOT CHANGE
```

A plan is not complete if the Builder still has to invent architecture, infer what must be preserved, or decide whether a visible mismatch is acceptable.

### Builder — DeepSeek V4 Flash Low

Use Builder for:

- Vue components and composables;
- Tailwind implementation from established tokens/patterns;
- page-by-page migration;
- SVG icon generation and integration;
- content/data wiring;
- route implementation under an existing route map;
- tests, lint fixes, accessibility fixes, responsive fixes;
- small refactors with explicit ownership and acceptance criteria;
- bounded debugging where the failure signature is known.

Builder rules:

1. Read the current plan/task packet before editing.
2. Do not widen scope without evidence.
3. Do not replace a dependency, routing strategy, rendering strategy, design system, or content model without Planner approval.
4. Prefer existing project conventions over inventing a parallel abstraction.
5. Implement the smallest coherent slice and validate immediately.
6. Report changed files, validation results, remaining mismatches, and any new evidence.
7. If acceptance criteria are contradictory or ownership is unknown, stop production edits and route back to Planner.

## Required migration workflow

```text
LEGACY WORDPRESS
    -> INVENTORY
    -> CAPTURE BASELINE
    -> CLASSIFY PAGE / FEATURE
    -> DEFINE MIGRATION CONTRACT
    -> PLAN
    -> BUILD VUE / TAILWIND SLICE
    -> GENERATE / INTEGRATE SVG ASSETS
    -> STATIC + UNIT VALIDATION
    -> VISUAL / RESPONSIVE COMPARISON
    -> SEO / ROUTE / FORM VALIDATION
    -> ACCEPT OR ROLLBACK
    -> NEXT SLICE
```

Do not start by translating templates line-for-line. First identify what the WordPress page actually owns: content, layout, navigation, state, forms, plugins, shortcodes, metadata, scripts, and URL behavior.

## Preflight

Before a meaningful migration change, determine:

- task type;
- legacy page/template/plugin that owns the current behavior;
- target Vue route/component that should own the replacement;
- risk (`low`, `medium`, `high`);
- relevant skill;
- acceptance criteria;
- legacy baseline evidence;
- cheapest falsification test;
- immediate validation command;
- rollback strategy;
- whether a Planner-approved task packet already exists.

Trace the full visible contract where applicable:

```text
URL -> route -> page/template -> content/data -> component -> styling
    -> asset/icon -> interaction/form -> metadata/analytics -> rendered result
```

Patch the owning layer, not merely the visible symptom.

## Baseline policy

Before replacing an existing route or reusable visual component, capture enough baseline evidence to answer "did the migration preserve what we intended to preserve?".

Baseline may include:

- route and final URL;
- desktop/mobile screenshots;
- heading hierarchy;
- navigation state;
- page title, meta description, canonical, robots directives;
- structured data that matters;
- main copy and media references;
- form fields, validation, submit behavior and success/error states;
- analytics/event hooks;
- responsive breakpoints or critical layout transitions;
- accessibility semantics for interactive elements.

Do not require exhaustive capture for trivial internal refactors. Validation must be proportional to risk.

## Hypothesis protocol

For bugs, visual regressions, migration mismatches, or unexpected behavior:

```text
HYPOTHESIS
EVIDENCE
FALSIFICATION TEST
EXPECTED SIGNAL
FAILURE SIGNATURE
```

States: `UNTESTED`, `SUPPORTED`, `FALSIFIED`, `INCONCLUSIVE`, `SUPERSEDED`.

### Attempt budget

- Attempt 0: no production patch. Observe, identify ownership, capture the relevant baseline, form a hypothesis, and run the cheapest falsification test.
- Attempt 1: one causal micro-patch after the hypothesis survives Attempt 0.
- Attempt 2: final local implementation only with new evidence, a changed hypothesis, or a changed failure signature.

Same hypothesis + same failure signature after two implementation attempts => stop Builder edits and enter Diagnostic Mode with Planner.

## Diagnostic Mode

No production patches. Inspect WordPress behavior, Vue ownership, configuration, routing, generated CSS, network behavior, build output, DOM/accessibility tree, plugin dependencies, tests, and recent history. Return to Builder only after Planner can state a bounded causal fix and validation signal.

## Domain routing

- WordPress inventory/templates/plugins/shortcodes: `wordpress-audit`
- overall decomposition and task packets: `migration-planning`
- Vue ownership/components/composables/router: `vue3-migration`
- Tailwind tokens/responsive/layout: `tailwind-design-system`
- SVG icons: `svg-icon-pipeline`
- content extraction/mapping: `content-migration`
- URLs/meta/canonical/structured data/redirects: `seo-preservation`
- accessibility/keyboard/semantics: `accessibility`
- visual comparison/responsive fidelity: `visual-regression`
- bundle/loading/performance: `web-performance`
- unclear repository ownership: `repo-analysis`
- known recurring failures: `problem-lookup`
- uncertain framework behavior: `knowledge-query`
- repeated failure/workaround pressure: `problem-solving-guardrails`
- baseline/candidate classification: `regression-validation`
- planner/builder transition: `context-handoff`
- stale or falsified context: `context-garbage-collection`

## Vue 3 rules

- Prefer Vue 3 Composition API and `<script setup>` for new components unless the repository has an explicit different convention.
- Components should represent stable UI/domain responsibilities, not arbitrary fragments created only to reduce line count.
- Keep route/page orchestration separate from reusable presentation when the distinction is real.
- Extract composables only for reusable stateful behavior; do not create composables as a ritual.
- Keep data transformation out of templates when it obscures intent.
- Avoid global state for page-local state.
- Do not introduce a second routing/state/data-fetching approach beside an established one without Planner approval.
- If the target project does not yet exist, the Planner must choose the scaffold/build approach before Builder implementation. Do not smuggle architecture decisions into setup commands.

## Tailwind rules

- Establish a small design-token vocabulary before mass migration: typography, spacing, radii, shadows, surfaces, text colors, accent colors, container widths, and major breakpoints.
- Prefer reusable semantic patterns/components over copying long utility strings across many pages.
- Arbitrary values are allowed for genuine one-off fidelity requirements, not as a substitute for a design system.
- Preserve responsive intent; do not validate only one desktop width.
- Do not recreate legacy CSS specificity fights inside utility classes.
- Remove obsolete CSS only after the migrated surface no longer depends on it.

## SVG icon rules

All new icons are SVG. Do not add icon fonts, raster icons, emoji substitutes, or a third-party icon dependency unless explicitly approved.

For every generated icon:

- use a valid `viewBox`;
- keep geometry minimal and deterministic;
- use `currentColor` when the icon should inherit UI color;
- avoid hard-coded fill/stroke colors unless the icon is intentionally multicolor;
- use consistent stroke width, cap, join, optical size and visual language across the set;
- remove editor metadata and unnecessary groups;
- give files semantic names;
- provide accessible labeling only when the icon conveys information; decorative icons must not create duplicate accessible names;
- verify at the actual rendered sizes used by the UI.

Do not generate visually unrelated icons one at a time without first defining the icon style contract.

## WordPress migration rules

Classify legacy behavior before replacing it:

```text
PRESERVE   REBUILD   REPLACE   DROP   UNKNOWN
```

Inventory at minimum when relevant:

- public routes/permalinks;
- menus and navigation hierarchy;
- templates and template parts;
- custom post types/taxonomies;
- page-builder blocks or shortcodes;
- forms and validation;
- plugin-provided frontend behavior;
- redirects;
- media/assets;
- SEO/meta/schema behavior;
- analytics/tag-manager hooks;
- cookie/consent behavior;
- search/filter/pagination;
- dynamic server-side features that cannot be reproduced by static markup alone.

Never assume a plugin is "just styling" until its visible/runtime behavior is inspected.

## SEO and rendering gate

A WordPress replacement can change how public content is discovered and rendered. Before choosing a pure client-side SPA for a public content route, Planner must explicitly classify SEO/crawl requirements and decide whether SPA rendering is sufficient or whether prerendering, static generation, SSR, or another delivery strategy is required. Vue 3 is the UI framework requirement; it does not by itself settle the rendering strategy.

Preserve intentionally:

- canonical URLs and redirects;
- titles/descriptions where still valid;
- heading structure;
- index/noindex intent;
- structured data that remains applicable;
- social metadata when required;
- sitemap/robots behavior where in scope.

## Visual modernization policy

"Modern" does not mean "unrelated redesign". For each migrated page, Planner must classify visual intent:

```text
FIDELITY      -> preserve composition closely
REFRESH       -> preserve hierarchy/content, modernize styling
REDESIGN      -> structure and visual language may change intentionally
```

Builder may not infer a redesign from vague wording. Visual acceptance requires comparison against the declared class and baseline.

## Validation ladder

Validate in increasing scope:

1. syntax/static checks;
2. lint/type/build checks available in the repository;
3. focused component/unit tests;
4. route-level interaction checks;
5. responsive/visual comparison;
6. route + SEO + forms + analytics contract checks where relevant;
7. broader regression only for accepted candidates or milestones.

Classify candidate as `PASS`, `FAIL`, or `INCONCLUSIVE`.

## Context policy

Before Planner -> Builder handoff, run Context GC and pass only decision-relevant context. Preserve verified facts, route/page scope, baseline, content/SEO constraints, component decisions, acceptance criteria, validation commands, and rollback conditions. Remove raw terminal noise, rejected plans, duplicate screenshots descriptions, and superseded hypotheses.

## Safety

- Preserve unrelated dirty-worktree changes.
- Never overwrite the only copy of legacy assets/content during extraction or migration.
- Never delete WordPress-specific code/assets merely because a new Vue implementation exists; delete only after dependency verification and accepted replacement.
- Do not expose secrets copied from WordPress configuration into client-side Vue code.
- Do not move server-only credentials or privileged logic into the browser.
- Do not claim visual parity without visual evidence.
- Do not claim SEO preservation from a successful build alone.
- Do not stack compatibility hacks after repeated failure; route to Planner and resolve ownership/root cause.
