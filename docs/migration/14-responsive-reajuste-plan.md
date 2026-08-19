# 14 — Auditoría Responsive + Plan de Reajuste

**Fecha:** 2026-05-13 → ejecutado 2026-08-19 (S0-S7)  
**Estado:** `DONE` — todos los sprints aplicados, build PASS, capturas S7-final verificadas  
**Visual intent:** `REFRESH` — preservar jerarquía/contenido, modernizar ritmo y consistencia responsive  
**Riesgo:** `medium` — toca todas las secciones + layout global, pero sin cambiar rutas/datos/SEO

---

## 1) OBJECTIVE

Revisar **todo el responsive** del sitio (one-page `App.vue` → 7 secciones + header/footer + 2 modales + 2 flotantes) y planificar un reajuste incremental que:

1. Unifique el sistema de breakpoints y ritmo vertical.
2. Elimine fragilidades en `ContactSection` (3 definiciones de grid compitiendo).
3. Garantice legibilidad, tap-targets ≥44px y ausencia de overflow horizontal en **320 → 1440**.
4. Deje un contrato visual validable por viewport (no solo "build PASS").

**No** re-escribir contenido, ni cambiar URLs/meta/estructura SEO, ni cambiar identidad visual (colores/tipografía).

---

## 2) LEGACY BASELINE (qué preservamos)

- **Ruta única:** `index.html` SPA con anclas `#inicio #nosotros #testimonios #proyectos #contacto` → comportamiento de scroll preservado.
- **Contenedor:** `.container-page` max 72rem centrado — se mantiene, pero su `padding-inline` se tokeniza.
- **Secciones existentes:** `Hero / About / Testimonials / Team / Projects / Values / Contact` + `AppHeader/AppFooter` + `WhatsAppButton/SocialFloating` + `ProjectModal/ReserveLotModal/BaseModal`.
- **Tokens actuales (`theme.css`):** `--text-display-*`, `--space-section/block`, `--radius-*`, `--shadow-premium-*` — se reutilizan, se corrigen solo los que rompen móvil.
- **Viewport meta y fonts:** `<meta name="viewport" content="width=device-width, initial-scale=1.0">` + Inter/Poppins — ya existente.
- **Build actual:** `vite build` PASS. Validación previa `11-responsive-validation.md` declara PASS pero **sin capturas** — por eso esta auditoría existe.

---

## 3) IN SCOPE

- Auditoría completa por componente (esta doc).
- Definición de **escala de breakpoints única** y tokens de ritmo responsive.
- Reajuste CSS/Template **solo donde hay regresión o fragilidad** (ver matriz §5).
- Normalización de grids: `Projects / Team / Values / Footer / Contact`.
- Header + Hero + carruseles (About/Testimonials/ProjectModal) — tap-targets y alturas.
- Modales y flotantes — safe-area y stacking en altura corta.
- Validación visual en 6 anchos representativos.

## 4) OUT OF SCOPE

- Re-diseño de marca, paleta o tipografía base.
- Nueva ruta, i18n, SSR/prerender, o cambio de data model (`projects.json` / `site.json`).
- Optimización de imágenes más allá de `sizes` ya existente.
- Reescritura de copy.
- Eliminar `web-legacy` o tocar `dist`.

---

## 5) AUDITORÍA — HALLAZGOS POR SUPERFICIE

> `Sev: H=alto M=medio L=bajo`

### 5.1 Transversal (tokens + sistema)

| # | Hallazgo | Sev | Evidencia |
|---|----------|-----|-----------|
| G01 | **7 breakpoints distintos**: 480, 640, 768, 900, 992, 1024, 1200 dispersos | H | `grep: @media.*min-width` en `ContactSection` (768/900/992/1200) vs `About` 992 vs `Projects` 1024 |
| G02 | `container-page` padding fijo `1.25rem` — en 320 quedan 20px útiles perdidos, en 1440 sobra aire | M | `components.css .container-page { padding-inline: var(--space-inline) }` `--space-inline:1.25rem` fijo |
| G03 | `--space-section: clamp(4.5rem,10vw,7.5rem)` igual para todas las secciones — `Values` y `Projects` necesitan ritmo distinto a `Hero` | M | `theme.css` — todas usan `.section-pad` |
| G04 | Sin `overflow-x: clip` en `.page-shell` / `body` — un grid desbordado habilita scroll horizontal | M | `App.vue .page-shell` sin overflow |
| G05 | `scroll-margin-top: 5rem` fijo vs header `min-height:4.75rem` + `top:4.5rem` del menú móvil → desalineo 0.25rem | L | `components.css .anchor-offset` + `AppHeader.vue` |
| G06 | Tap-targets <44px: `.carousel-btn 2.25rem (36px)`, `.indicator-dot 0.6rem`, `.testimonial-nav 2.5rem` borde | M | `ProjectModal/BaseModal` |

### 5.2 `AppHeader`

| # | Hallazgo | Sev |
|---|----------|-----|
| H01 | Menú móvil `top:4.5rem` vs header `4.75rem` → deja 4px de "grieta" al abrir | M |
| H02 | `aria-hidden` en `<nav>` pero el menú sigue focuseable cuando está cerrado (falta `inert`/`hidden` real) | M |
| H03 | `header-inner gap:1rem` + navigation centrada + logo 12rem + CTA hidden en móvil → en 768-900 colisión logo/nav/CTA | M |
| H04 | `menu-toggle` 2.75rem OK pero borde `1px solid white` sobre `bg #0D4D2E` bajo contraste en high-contrast | L |

### 5.3 `HeroSection`

| # | Hallazgo | Sev |
|---|----------|-----|
| He01 | `padding-block:6rem` en `.hero-content` + `min-height: clamp(36rem,82svh,52rem)` en móvil → en iPhone SE (667h) el CTA queda al límite del fold sin scroll cue | M |
| He02 | `hero-title --text-display-3xl clamp(2.5rem,7vw,4rem)` — en 375 el `7vw=26px` pero el `min 2.5rem=40px` domina: siempre 40px, muy grande para 320 | M |
| He03 | 5 `<figure>` absolute con `animation: heroCrossfade 25s infinite` → 5 imágenes simultáneas en DOM, costoso en móvil low-end | L |
| He04 | Sin `padding-bottom` safe-area (`env(safe-area-inset-bottom)`) para CTA pegado abajo en landscape | L |

### 5.4 `AboutSection`

| # | Hallazgo | Sev |
|---|----------|-----|
| A01 | Grid pasa 1→1.15fr/1fr en **992** único en el sistema (resto usa 768/1024) → salto tardío, en 800-991 texto estrecho + carrusel pequeño | M |
| A02 | `aspect-ratio:4/5` + `max-width 440-480` → en 375 altura ≈ 475-550px, roba 70% del viewport, rompe ritmo con `Projects` debajo | M |
| A03 | Botones nav `2.5rem` OK pero dots `0.6rem` no cumplen 44x44 ni WCAG 2.5.8 | L |

### 5.5 `ProjectsSection`

| # | Hallazgo | Sev |
|---|----------|-----|
| P01 | `grid: 1 → 2@640 → 3@1024` — en 768-1023 ya cabrían 3 cards (72rem-2*1.25rem ≈ 69.5rem /3 ≈ 22rem) pero se queda en 2, desperdicia ancho tablet | M |
| P02 | `.media-frame--contain` + `aspect-4/3` deja bandas blancas cuando la imagen no es 4/3 (ej. `proyecto-las-palmeras.png` es apaisada) → inconsistencia visual | M |
| P03 | `features-grid` flex wrap center OK pero sin `max-width` → en 320 los chips hacen 2 filas con gap irregular | L |

### 5.6 `ValuesSection`

| # | Hallazgo | Sev |
|---|----------|-----|
| V01 | `values-grid: 1→2@640→4@1024` — 4 cards de texto largo en 1024 quedan a 220px c/u, tipografía 0.92rem ilegible por línea corta | M |
| V02 | 5 imágenes `valuesCrossfade` absolute animadas igual que Hero — doble costo en una misma página | L |
| V03 | `tabs-pill` bg `rgba(255,255,255,0.18)` + `backdrop-filter:blur(8px)` falla en Firefox sin flag y sin fallback sólido | L |

### 5.7 `ContactSection` — **crítico**

| # | Hallazgo | Sev |
|---|----------|-----|
| C01 | **Grids en conflicto**: `@media 992` → `1.4fr 1fr`, `@media 1200` → `320px minmax(250px,1fr) 340px`, `@media 900` → `1.15fr 1fr 1.4fr` (declarado **después** de los 1200, por cascada gana 900 en ≥1200). Resultado: layout impredecible ≥900 | H |
| C02 | `.contact-left-col {display:contents}` en ≥900/1200 rompe accesibilidad (el aside mascota deja de ser landmark) y complica orden de foco | M |
| C03 | En ≥1200 el form se compacta (`padding 1.25rem → 1.5rem`, `field-input padding-block 0.38rem`) → **inputs de 31px** (<44px) rompen a11y y son intocables con pulgar | H |
| C04 | `landscape-bg width clamp(360px,43vw,620px) height 100%` + `landscape-img object-fit:cover object-position:left center` → en 768-900 la imagen tapa el texto bajo la máscara (mask pasa de vertical a horizontal en 767) | M |
| C05 | `contact-heading clamp 2.2rem-3.2rem + white-space:nowrap en ≥900` → en 900-1024 "¡Llama ya!" cabe pero "Contáctanos" eyebrow + lead 0.85rem generan overflow si el usuario aumenta font-size 120% | M |
| C06 | Mascota `width 12rem → 280px → 320px` con `drop-shadow(0 16px 32px)` + hover `translateY(-6px) scale(1.02)` puede salir del viewport en 320 con `gap 2.5rem` | L |

### 5.8 `Team / Testimonials / Footer`

| # | Hallazgo | Sev |
|---|----------|-----|
| T01 | `Team grid 1→2@640→3@1024` OK pero cards sin altura igual → en 640 con 2 col la 3ª queda huérfana y rompe ritmo | L |
| Te01 | `Testimonials aspect 16/9 max 560px` OK, pero nav `‹ ›` texto sin icono SVG → en 320 el hit-area es 40px pero depende de font-size | L |
| F01 | Footer `1→4@768` → en 768 4 col a 170px c/u: "Topic" y "Navegación" colapsan a 2 líneas por link, "Contacto" se desborda. Correcto sería `1→2@640→4@1024` | M |
| F02 | `footer-socials gap 0.75rem` + 5 iconos 24px → en 320 ocupa 156px, bien, pero sin `flex-wrap` si se añaden más | L |

### 5.9 Modales y flotantes

| # | Hallazgo | Sev |
|---|----------|-----|
| M01 | `BaseModal .modal-dialog max-width 40rem` OK pero `padding:1rem` en overlay + `max-height 85vh` → en iPhone landscape 667h la cabecera `1.25rem` + body `1.5rem` deja solo ~380px scrollables | M |
| M02 | `commercial-box 2→4@480` → en 375 dos col con `price "Desde S/ 26,000*"` + `monthlyQuota` hacen wrap y desalinean alturas | M |
| W01 | `whatsapp-panel width min(92vw,24rem) right 1rem bottom 5rem` OK pero no usa `max-height: min(70dvh, 36rem)` → en altura 600px tapa el 80% | M |
| W02 | `social-floating bottom 5.5rem` + `whatsapp bottom 1.25rem` → separación 0.5rem sobre el botón, sin `safe-area` | L |
| S01 | `BaseModal trapFocus` busca `button:not([disabled])` pero WhatsApp dentro del modal usa `<a target="_blank">` — queda fuera del trap en algunos flujos | L |

---

## 6) SISTEMA PROPUESTO (en qué aterrizamos)

### 6.1 Breakpoints únicos

Usar **Tailwind 4 defaults + 1 extra** alineado a `components.css`:

```css
--breakpoint-xs: 480px  /* teléfonos grandes */
--breakpoint-sm: 640px  /* phablet */
--breakpoint-md: 768px  /* tablet vertical */
--breakpoint-lg: 1024px /* tablet horizontal / laptop */
--breakpoint-xl: 1280px /* desktop */
--breakpoint-2xl: 1536px /* opcional, no usado aún */
```

**Regra:** eliminar `900` y `992`. Mapeo: `900 → 1024`, `992 → 1024`. `1200 → 1280` (o 1024 si es layout, 1280 si es densificación).

### 6.2 Tokens de ritmo y contenedor

```css
@theme {
  --space-inline: clamp(1rem, 4vw, 1.5rem);
  --space-section: clamp(3.5rem, 8vw, 6.5rem);
  --space-section-dense: clamp(2.5rem, 6vw, 4rem); /* Projects/Team */
  --text-display-3xl: clamp(2rem, 6vw, 3.5rem); /* Hero reduce min de 2.5→2.0 */
}
.container-page { max-width: 72rem; padding-inline: var(--space-inline); }
.page-shell { overflow-x: clip; }
.anchor-offset { scroll-margin-top: clamp(4.5rem, 8vh, 5.5rem); }
```

### 6.3 Principios de grids

- **1 col por defecto**, subir a 2 en `sm`/`md`, a 3-4 solo en `lg`.
- Cards con `height: 100%` donde hay grid para igualar alturas.
- Tap-target mínimo **44×44** (dots 12px + padding 16px hit-area, nav 44px).
- Imágenes `aspect` fijas + `object-fit: cover` (no `contain` en cards).

---

## 7) PLAN DE REAJUSTE — 7 SPRINTS INCREMENTALES

Cada sprint: 1 hipótesis → 1 slice → build → verificación visual en 6 viewports.

**Viewports de validación:** `375×800, 640×900, 768×1024, 1024×768, 1280×900, 1440×900` + `320 smoke` y `390 iPhone`.

### Sprint 0 — Fundación (tokens + overflow)
- **Objetivo:** instalar escala única sin tocar layout visible.
- **Archivos:** `src/styles/theme.css`, `src/styles/components.css`, `src/App.vue`
- **Cambios:**
  - Añadir `--breakpoint-*` y redefinir `--space-inline` como clamp, `--space-section-dense`.
  - `page-shell { overflow-x: clip }`, `html { scrollbar-gutter: stable }`.
  - `anchor-offset` con clamp.
- **Validación:** `npm run build`, `grep -R "900px\|992px"` debe dar 0 tras S1-S7, `npx vite --host` smoke 375/1440 sin scroll horizontal.
- **Criterio PASS:** sin regresión visual, solo ritmo levemente más aireado en 320.

### Sprint 1 — Header + Hero
- **Archivos:** `AppHeader.vue`, `HeroSection.vue`
- **Header:**
  - Unificar a `768` único, `top: var(--header-h)` con `--header-h:4.75rem` (no 4.5).
  - `header-inner gap clamp(0.75rem,2vw,1rem)`, logo `clamp(9rem, 22vw, 12rem)`.
  - Menú cerrado con `hidden`/`inert` + focus trap ligero, no solo `aria-hidden`.
  - `menu-toggle` 44px garantizado.
- **Hero:**
  - `hero-content padding-block clamp(3rem, 10svh, 6rem)`, `hero-title` min 2.0rem.
  - `hero min-height clamp(32rem, 88svh, 44rem)` en móvil, `90vh` solo ≥1024.
- **Validación:** header sticky + menú operable en 375/768, hero CTA visible sin scroll en 375×667.

### Sprint 2 — About + Projects
- **Archivos:** `AboutSection.vue`, `ProjectsSection.vue`, `components.css` (cards)
- **About:** grid breakpoint `1024` (no 992), carrusel `max-width clamp(320px, 90vw, 440px)`, `aspect 4/5` solo ≥640 si no `5/6` más bajo en móvil para no tapar viewport.
- **Projects:** grid `1 → 2@640 → 3@1024` → propuesto `1 → 2@640 → 3@1024` mantener pero mover 3 a `1024` → realmente a `768` si 69.5rem/3 cabe: **test A/B**. Decisión: dejar `1024` pero documentar por qué (ancho card 280px mínimo). Cambiar `media-frame--contain` → `cover`, `project-grid gap clamp(1rem,2.5vw,1.5rem)`. Igualar altura cards `height:100%`.
- **Validación:** 2 col en 768 si sobra aire → revisar, sin bandas blancas en cards.

### Sprint 3 — Values + Team + Testimonials
- **Archivos:** `ValuesSection.vue`, `TeamSection.vue`, `TestimonialsSection.vue`
- **Values:** `values-grid 1→2@640→2@1024` (no 4), pasar a 4 solo en `xl 1280`. `attr-grid` igual. Reducir animaciones simultáneas: pausar `valuesCrossfade` en `prefers-reduced-motion` ya OK, pero throttlear en móvil con `animation-play-state: paused` si `hover:none`.
- **Team:** igualar alturas, `grid 1→2@640→3@1024` OK.
- **Testimonials:** nav 44px, `aspect 16/9` OK.
- **Validación:** 4 cards en 1024 no se ven apretadas, texto legible.

### Sprint 4 — Contact (crítico) — descomponer en 2 PRs
- **4a — Grid:** eliminar conflicto 900/992/1200 → un solo grid `1fr` base, `1.4fr 1fr` en `lg 1024`, `320px 1fr 380px` en `xl 1280`. Eliminar `display:contents`, usar subgrid o grid anidado sin romper landmarks.
- **4b — Form:** des-compactar en 1280: `padding 1.75rem`, `field-input min-height 42px`, `field-textarea 88px`. Mascota `width clamp(12rem, 28vw, 22rem)` y `order` distinto en móvil (mascota debajo del texto en 320 para no empujar).
- **Validación:** en 900, 1024, 1280 no hay salto, inputs tocables, sin overflow del heading.

### Sprint 5 — Footer + Modales
- **Archivos:** `AppFooter.vue`, `BaseModal.vue`, `ProjectModal.vue`, `ReserveLotModal.vue`
- **Footer:** `1 → 2@640 → 4@1024` (no 4@768). Gap `clamp(1.5rem,3vw,2rem)`.
- **Modales:** `modal-dialog max-width min(40rem, 92vw)`, `max-height 86dvh`, `commercial-box 1→2@480→3@768` (no 4 en 480). Dots hit-area 44px.
- **Validación:** footer legible en 768, modal no tapa viewport en landscape.

### Sprint 6 — Flotantes + Safe-area + Polish
- **Archivos:** `WhatsAppButton.vue`, `SocialFloating.vue`, `styles/components.css`
- **Flotantes:** `bottom calc(1rem + env(safe-area-inset-bottom))`, `max-height min(68dvh, 32rem)` para panel, `gap 0.75rem` garantizado entre burbujas. Ocultar `SocialFloating` en `max-width 320` si colisiona o agrupar en un FAB.
- **Polish:** `prefers-reduced-motion` ya, añadir `scrollbar-gutter`.

### Sprint 7 — Validación integral + documentación
- Generar capturas (o inspección manual) en los 6 viewports, tabla PASS/FAIL, actualizar `11-responsive-validation.md` y `11-visual-regression.md`.
- `npm run build` + Lighthouse responsive smoke.

---

## 8) AFFECTED ROUTES / FEATURES

- Ruta única `/` con anclas — todas las secciones.
- Modales `#proyectos → ProjectModal` y `ReserveLotModal` (form).
- Flotantes globales.

## 9) RELEVANT FILES

```
src/styles/theme.css
src/styles/components.css
src/App.vue
src/components/layout/AppHeader.vue
src/components/layout/AppFooter.vue
src/components/sections/HeroSection.vue
src/components/sections/AboutSection.vue
src/components/sections/ProjectsSection.vue
src/components/sections/ValuesSection.vue
src/components/sections/ContactSection.vue
src/components/sections/TeamSection.vue
src/components/sections/TestimonialsSection.vue
src/components/ui/BaseModal.vue
src/components/ui/ProjectModal.vue
src/components/ui/ReserveLotModal.vue
src/components/ui/WhatsAppButton.vue
src/components/ui/SocialFloating.vue
```

## 10) EXTERNAL CONTRACTS TO PRESERVE

- URLs/anclas, `index.html` meta/OG/canonical, JSON-LD.
- Copy y features de `projects.json` / `site.json` — no tocar.
- `mailto:` y `whatsapp` hrefs — preservar.
- A11y: `aria-*`, `role=dialog`, focus ring ámbar — preservar y ampliar.

## 11) DESIGN / COMPONENT DECISIONS

- **Breakpoints:** 480/640/768/1024/1280 únicos.
- **Container:** clamp padding, sin nuevo `max-width`.
- **Cards:** `cover` no `contain`, alturas igualadas, sombras premium intactas.
- **Contact:** patrón 3-col solo en `xl`, no antes.
- **Footer:** 4-col solo en `lg`.
- **Iconografía:** tamaño visual idéntico, hit-area aumentada con padding invisible.

## 12) CONTENT / SEO REQUIREMENTS

- No re-escribir textos. No tocar `h1/h2` hierarchy (`Hero h1`, `About h2`, `Projects h2`, `Values h2`, `Contact h2`).
- Mantener `id` de secciones para anclas.

## 13) SVG / ASSET REQUIREMENTS

- Ningún nuevo icono —-hit-area vía CSS.

## 14) IMPLEMENTATION STEPS (orden Builder)

1. S0 tokens + overflow (1 file batch pequeño, build).
2. S1 header+hero (2 files).
3. S2 about+projects (2 files).
4. S3 values/team/testimonials (3 files).
5. S4a contact grid → build + visual.
6. S4b contact form/mascota → build + visual.
7. S5 footer/modales (3 files).
8. S6 flotantes/safe-area (2 files).
9. S7 validación integral + docs.

Cada paso: **un PR/slice**, `npm run build` y verificación manual 375/768/1280 antes del siguiente.

## 15) VALIDATION COMMANDS

```bash
npm run build
# opcional si hay dev paralelo:
npm run dev -- --host
# búsqueda de breakpoints huérfanos:
grep -R "900px\|992px" src
# visual smoke (manual):
# 375×800, 640×900, 768×1024, 1024×768, 1280×900, 1440×900
```

## 16) VISUAL VALIDATION

- Clase `REFRESH` — comparar jerarquía/espaciado/legibilidad, no pixel-perfect legacy.
- **PASS si:** sin overflow-x, sin colisiones, tap-targets ≥44px, grids estables en los 6 viewports, tipografía legible en 320 con font 100%, y Contact no salta entre 900-1280.
- **FAIL si:** cualquier breakpoint deja texto truncado, CTA inaccesible, o grid impredecible.
- Evidencia: tabla `viewport | estado | captura-nota` en `11-responsive-validation.md` (actualizar en S7).

## 17) ACCEPTANCE CRITERIA

- [ ] `grep -R "900px\|992px" src` → 0 resultados (solo legacy en docs si acaso).
- [ ] `container-page` usa `clamp` y no hay scroll horizontal en 320, 375, 1440.
- [ ] Header menú abre/cierra en 375 con `Esc` y foco atrapado, `top` alineado a header height.
- [ ] Hero CTA visible sin scroll en 375×667 y 390×844.
- [ ] Contact: un único comportamiento entre 900-1280, inputs ≥42px, grid estable, mascota no tapa texto.
- [ ] Footer 2 col en 640-1023, 4 col solo ≥1024.
- [ ] Flotantes con safe-area y sin superposición en altura 600px.
- [ ] Build PASS y docs de validación actualizados.

## 18) ROLLBACK CONDITIONS

- Cada sprint se revierte con `git checkout -- <files>` si introduce regresión visual en 2 viewports o rompe `build`.
- Si S4 (Contact) genera overflow o pérdida de landmark, revertir 4a/4b juntos y re-planificar con Grid alternativo.

## 19) KNOWN RISKS

- Contact tiene 960 líneas de CSS con 3 grids; riesgo de especificidad. Mitigación: extraer grid a un único bloque y borrar duplicados.
- Cambiar `contain→cover` en cards puede recortar imágenes apaisadas — validar con `proyecto-*` reales.
- Reducir `--text-display-3xl` min puede "encoger" Hero en branding — mantener 2.0rem mínimo es seguro, probar 2.2rem si se ve pequeño.

## 20) DO NOT CHANGE

- `site.json` / `projects.json` / `index.html` meta.
- Paleta `--color-*` ni `font-display`/`font-sans`.
- Lógica de `useWhatsApp` / `useScrollLock`.
- Estructura de `BaseModal` (solo estilos).

---

## 21) DECISIÓN REQUERIDA PARA ARRANCAR

El plan está listo para ejecutarse slice por slice. ¿Quieres que arranque por **S0 Fundación + S1 Header/Hero** en este mismo turno y deje el resto encolado, o prefieres revisar/ajustar algún sprint (ej. mantener footer 4@768)?
