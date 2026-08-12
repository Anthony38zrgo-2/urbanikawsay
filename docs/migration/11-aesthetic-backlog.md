# Urbanikawsay — Backlog de Mejora Estética

Estado: `PLANNED`
Iteración: `AESTHETIC-01`
Baseline técnico: commit `5ba94c7`, SPA Vue 3 + Vite 8 + Tailwind v4.

## Objective

Modernizar la interfaz de Urbanikawsay con una dirección visual deliberada:

- **Flat design** para secciones, tarjetas, formularios, navegación, iconos y superficies.
- **Aero UI** únicamente para botones y controles accionables que sean botones.
- Responsive mobile-first validado después de terminar la iteración estética.
- Conservar contenido, URLs/anclas, modales, formularios, SEO, assets y comportamiento de negocio.

## Legacy Baseline

- La implementación actual ya tiene la estructura Vue, tokens de color, componentes y modales.
- `src/styles/components.css` usa sombras y gradientes también fuera de botones.
- Las tarjetas de proyecto son `<button>` completos, por lo que no pueden ser superficies flat y controles aero a la vez.
- El menú móvil cambia `menuOpen`, pero `.side-nav` permanece `display: none` en móvil; esto debe corregirse antes de validar responsive.
- El hero marca todas las imágenes como `loading="eager"` y `fetchpriority="high"`; revisar en la fase de performance.
- El avatar del equipo reutiliza el icono de WhatsApp, lo que no representa visualmente a una persona.
- La regresión visual anterior quedó `INCONCLUSIVE` porque no había capturas baseline locales.

## Visual Intent

`REDESIGN` visual con contratos funcionales preservados.

La comparación no busca copiar el aspecto de Elementor. Debe preservar jerarquía,
contenido, rutas, acciones, legibilidad y estados responsive, mientras que la
composición visual se moderniza de forma intencional.

## In Scope

- Tokens flat/aero y patrones globales.
- Header, menú móvil, hero, secciones de contenido, proyectos, formularios, modales, WhatsApp y footer.
- Tipografía, espaciado, bordes, focus states, iconos y tratamiento de imágenes.
- Responsive en 320/360/390/480/768/1024/1440 px.
- Validación de accesibilidad, contraste, build, performance y regresión visual.

## Out Of Scope

- Cambiar copy, navegación, URLs, anclas, SEO, datos de contacto o integración de formularios.
- Añadir Vue Router, Pinia, TypeScript, una librería de iconos o un design-system externo.
- Inventar URLs de redes sociales que actualmente son `#`.
- Rediseñar el logotipo o editar las imágenes originales.
- Introducir un segundo sistema visual paralelo.

## Flat Design Contract

- Secciones y cards usan fondos sólidos: `surface`, `surface-soft` o `surface-muted`.
- No usar gradientes en hero overlays, secciones, cards, inputs, paneles ni footer.
- Cards usan borde sutil y radio consistente; no usan `shadow-card` como decoración.
- Las imágenes pueden tener `object-fit`, recorte y borde, pero no bevels ni overlays decorativos.
- Iconos permanecen SVG, monocromáticos, `currentColor`, sin efectos 3D.
- El modal puede conservar una sombra funcional mínima para separarse del backdrop; no es una card aero.
- El footer y el header mantienen superficies sólidas de marca.

## Aero Button Contract

Todos los controles accionables que sean botones o CTA visuales usan el mismo contrato:

- fondo con gradiente reservado exclusivamente al botón;
- borde semitransparente y highlight superior mediante `inset`;
- sombra exterior contenida, sin aspecto de botón 3D pesado;
- estado `hover`, `active`, `focus-visible`, `disabled` y `prefers-reduced-motion`;
- texto con contraste WCAG AA en cada variante;
- variantes `primary`, `secondary`, `quiet` e `icon`;
- tamaño táctil mínimo de 44 × 44 px;
- links que funcionan como CTA pueden adoptar el patrón aero, pero no links de lectura ni navegación de texto.

Las tarjetas de proyecto no serán botones gigantes: se convierten en `<article>` flat
con un botón aero interno `Ver detalles`.

## Responsive Contract

Validar después de AEST-002..AEST-010 en:

| Viewport | Obligaciones |
|---|---|
| 320 × 800 | Sin overflow; header y CTA utilizables; modal usable |
| 360 × 800 | Hero legible; botones no desbordan; WhatsApp no tapa contenido |
| 390 × 844 | Menú y formularios cómodos con safe spacing |
| 480 × 900 | Cards y grids sin saltos visuales |
| 768 × 1024 | Transición tablet estable; navegación y columnas correctas |
| 1024 × 768 | Layout desktop compacto sin colisiones |
| 1440 × 900 | Contenedor centrado; ritmo vertical y ancho de lectura controlados |

Debe verificarse también con teclado, zoom del navegador al 200% cuando sea viable,
orientación horizontal móvil y `prefers-reduced-motion`.

## Execution Graph

```text
AEST-001 baseline
      ↓
AEST-002 tokens → AEST-003 flat primitives → AEST-004 aero buttons
                                      ↘
                       AEST-005 header/menu
                       AEST-006 hero
                       AEST-007 about/team/values
                       AEST-008 projects/features
                       AEST-009 forms/modals/WhatsApp
                       AEST-010 footer/icons
                                      ↓
                              BARRIER RESPONSIVE
                              AEST-011 responsive
                                      ↓
                              AEST-012 a11y/interactions
                                      ↓
                              AEST-013 visual regression
                                      ↓
                              AEST-014 build/performance/release
```

## Backlog

### AEST-001 — Capturar baseline visual y auditoría de estados

- **Fase:** discovery | **Tipo:** test | **Prioridad:** P0 | **Riesgo:** medium
- **Owner/model:** Builder / DeepSeek V4 Flash Low
- **Depends on:** none | **Parallel group:** A
- **Subagent:** `RECOMMENDED`, Visual Regression Inspector
- **Skills:** `visual-regression`, `regression-validation`, `accessibility`
- **Input:** aplicación actual, commit `5ba94c7`, URLs/anclas existentes
- **Output:** `docs/migration/11-aesthetic-baseline.md`
- **Minimum context:** este contrato, `App.vue`, `components.css`, layout, secciones y UI.
- **Steps:**
  1. Ejecutar `npm run build` antes de modificar estilos.
  2. Capturar desktop, tablet y móvil en los viewports del Responsive Contract.
  3. Registrar header cerrado/abierto, hero, project cards, tabs, formularios, cada modal y WhatsApp abierto.
  4. Anotar overflow, colisiones, estados sin focus visible y diferencias entre móvil/tablet/desktop.
  5. Clasificar el baseline como `PASS`, `FAIL` o `INCONCLUSIVE` por superficie.
- **Restrictions:** no modificar código; no convertir defectos actuales en criterios de aceptación.
- **Acceptance criteria:** existe una matriz de capturas y riesgos; el menú móvil oculto queda registrado como bug; el build baseline queda documentado.
- **Validation:** `npm run build`; revisión del documento y de todas las capturas.
- **Definition of Done:** baseline reproducible disponible para AEST-013.
- **Escalate to GLM if:** no se puede capturar un estado funcional o aparecen contratos de negocio no documentados.

### AEST-002 — Implementar tokens flat y aero

- **Fase:** foundation | **Tipo:** design | **Prioridad:** P0 | **Riesgo:** medium
- **Owner/model:** Builder / DeepSeek V4 Flash Low
- **Depends on:** AEST-001 | **Parallel group:** B
- **Subagent:** `NO`
- **Skills:** `tailwind-design-system`, `accessibility`
- **Input:** `src/styles/theme.css`, `paleta-moderna.css`, contrato visual.
- **Output:** `src/styles/theme.css`
- **Minimum context:** tokens existentes y Flat Design/Aero Button Contract.
- **Steps:**
  1. Mantener los colores de marca existentes y añadir nombres semánticos para `surface-flat`, `surface-flat-soft`, `border-flat`, `focus-ring` y estados aero.
  2. Definir radios contenidos para flat y sombras exclusivas de aero/modal.
  3. Definir escala tipográfica y pesos para display/body sin cambiar familias aprobadas.
  4. Evitar HEX repetidos fuera de tokens.
  5. Documentar qué tokens son flat y cuáles son aero.
- **Restrictions:** no cambiar la paleta aprobada ni introducir colores arbitrarios por componente.
- **Acceptance criteria:** todos los nuevos tokens tienen uso semántico; el contraste de texto principal, texto inverso y texto sobre CTA conserva WCAG AA; no se añaden dependencias.
- **Validation:** `npm run build`; comprobación de tokens en DevTools; contraste de variantes aero.
- **Definition of Done:** los siguientes tasks pueden usar únicamente tokens definidos.
- **Escalate to GLM if:** una variante aero no logra contraste AA sin alterar la paleta de marca.

### AEST-003 — Convertir patrones globales a flat

- **Fase:** foundation | **Tipo:** design | **Prioridad:** P0 | **Riesgo:** medium
- **Owner/model:** Builder / DeepSeek V4 Flash Low
- **Depends on:** AEST-002 | **Parallel group:** B
- **Subagent:** `NO`
- **Skills:** `tailwind-design-system`, `visual-regression`
- **Input:** `src/styles/components.css`, tokens AEST-002.
- **Output:** `src/styles/components.css`
- **Minimum context:** Flat Design Contract y clases globales actuales.
- **Steps:**
  1. Convertir `.card`, `.card--feature`, `.badge-*`, contenedores y secciones a superficies sólidas.
  2. Eliminar gradientes globales no usados por botones; no dejar helpers que puedan aplicarse accidentalmente a cards.
  3. Definir `focus-visible`, selección, links y estados de superficie.
  4. Ajustar container, ritmo vertical y `scroll-margin` sin alterar anclas.
  5. Mantener solo una sombra funcional para modal y sombras aero en los botones.
- **Restrictions:** no introducir utilidades duplicadas por componente; no aplicar `!important`.
- **Acceptance criteria:** cards y secciones no presentan gradiente ni sombra decorativa; todas las superficies usan tokens; focus visible es reconocible.
- **Validation:** `npm run build`; inspección computada de card, input y section en 360/1440.
- **Definition of Done:** patrón flat estable para todos los componentes posteriores.
- **Escalate to GLM if:** un componente necesita profundidad visual para conservar comprensión de interacción.

### AEST-004 — Crear y migrar el sistema de botones aero

- **Fase:** foundation | **Tipo:** ui | **Prioridad:** P0 | **Riesgo:** medium
- **Owner/model:** Builder / DeepSeek V4 Flash Low
- **Depends on:** AEST-002, AEST-003 | **Parallel group:** B
- **Subagent:** `NO`
- **Skills:** `tailwind-design-system`, `accessibility`, `vue3-migration`
- **Input:** `BaseButton.vue`, usos de `.btn-primary`, `.btn-secondary`, `.btn-ghost`, CTA directos.
- **Output:** `components.css`, `BaseButton.vue` y clases de consumidores actualizadas.
- **Minimum context:** Aero Button Contract y grep de todos los botones existentes.
- **Steps:**
  1. Definir `.btn-aero`, `.btn-aero-primary`, `.btn-aero-secondary`, `.btn-aero-quiet` y `.btn-aero-icon`.
  2. Implementar highlight, borde, sombra, hover, active, disabled y focus-visible.
  3. Migrar Hero, Header, formularios, modal, tabs, menú y WhatsApp.
  4. Mantener links de navegación de texto fuera del patrón aero salvo CTA explícito.
  5. Eliminar usos visuales de `.btn-primary/.btn-secondary/.btn-ghost` o renombrarlos de forma consistente.
- **Restrictions:** gradientes solo dentro de botones; no usar emoji ni icon-font; no aumentar la dependencia visual con una librería.
- **Acceptance criteria:** todos los botones visibles tienen variante aero; cada botón tiene estado hover/active/focus/disabled; target táctil mínimo 44 px; `prefers-reduced-motion` no produce desplazamiento animado.
- **Validation:** `npm run build`; teclado; inspección a 360/1440; contraste por variante.
- **Definition of Done:** un único sistema de botones, sin estilos aero duplicados.
- **Escalate to GLM if:** un control semánticamente necesario no puede adoptar aero sin perder claridad.

### AEST-005 — Rediseñar header y corregir menú responsive

- **Fase:** shared layout | **Tipo:** ui | **Prioridad:** P0 | **Riesgo:** high
- **Owner/model:** Builder / DeepSeek V4 Flash Low
- **Depends on:** AEST-003, AEST-004 | **Parallel group:** C
- **Subagent:** `NO`
- **Skills:** `vue3-migration`, `tailwind-design-system`, `accessibility`
- **Input:** `AppHeader.vue`, navegación de `site.json`.
- **Output:** `AppHeader.vue`
- **Minimum context:** rutas/anclas actuales y Aero Button Contract.
- **Steps:**
  1. Mantener header sólido flat, jerarquía limpia y CTA aero.
  2. Hacer que `.side-nav.is-open` sea realmente visible en móvil como panel flat.
  3. Añadir cierre por Escape y conservar cierre al seleccionar una ancla.
  4. Verificar `aria-expanded`, `aria-controls`, focus y orden de tabulación.
  5. Evitar que el menú abierto tape el CTA o el contenido del hero.
- **Restrictions:** no cambiar labels, hrefs ni el evento `open-reserve`.
- **Acceptance criteria:** menú abre/cierra en 320–767 px; no se muestra en desktop como panel móvil; Escape lo cierra; CTA abre el modal existente; sin overflow horizontal.
- **Validation:** `npm run build`; teclado; 320, 360, 390, 768 y 1440 px.
- **Definition of Done:** header estable en todos los breakpoints y bug de menú móvil resuelto.
- **Escalate to GLM if:** el header requiere cambiar la estructura de navegación o introducir router.

### AEST-006 — Refresh flat/aero del hero

- **Fase:** content surface | **Tipo:** ui | **Prioridad:** P1 | **Riesgo:** medium
- **Owner/model:** Builder / DeepSeek V4 Flash Low
- **Depends on:** AEST-003, AEST-004 | **Parallel group:** D
- **Subagent:** `NO`
- **Skills:** `vue3-migration`, `tailwind-design-system`, `visual-regression`, `web-performance`
- **Input:** `HeroSection.vue`, assets actuales.
- **Output:** `HeroSection.vue`, `animations.css` si es necesario.
- **Minimum context:** copy, CTA y cuatro imágenes actuales.
- **Steps:**
  1. Mantener el contenido y CTA `#proyectos`.
  2. Sustituir el overlay degradado por una capa sólida semitransparente que preserve lectura.
  3. Mejorar composición, ancho de lectura, escala del h1 y alineación del CTA.
  4. Mantener el movimiento sutil solo si no compite con el contenido.
  5. Cargar prioritariamente solo la primera imagen; revisar eager/lazy de slides restantes.
- **Restrictions:** no añadir texto, no cambiar imágenes sin evidencia, no usar gradientes fuera del CTA aero.
- **Acceptance criteria:** h1 legible en 320 px; CTA aero no desborda; imagen y overlay mantienen contraste; reduced motion muestra un estado estable.
- **Validation:** `npm run build`; 320/390/768/1440; comprobación de contraste y LCP.
- **Definition of Done:** hero moderno, legible y sin dependencia de Slider Revolution.
- **Escalate to GLM if:** la imagen disponible no permite contraste suficiente con overlay sólido.

### AEST-007 — Refresh flat de About, Team y Values

- **Fase:** content surface | **Tipo:** ui | **Prioridad:** P1 | **Riesgo:** low
- **Owner/model:** Builder / DeepSeek V4 Flash Low
- **Depends on:** AEST-003, AEST-004 | **Parallel group:** D
- **Subagent:** `NO`
- **Skills:** `tailwind-design-system`, `accessibility`, `vue3-migration`
- **Input:** `AboutSection.vue`, `TeamSection.vue`, `ValuesSection.vue`.
- **Output:** los tres componentes y estilos scoped relacionados.
- **Minimum context:** contenido existente, tabs y tokens flat.
- **Steps:**
  1. Aplicar ritmo editorial, superficies sólidas y bordes consistentes.
  2. Eliminar aspecto de card flotante pesado; usar agrupación por espacio y borde.
  3. Sustituir el avatar WhatsApp del equipo por un tratamiento neutro de persona/rol usando SVG permitido.
  4. Mantener tabs accesibles y aplicar variante aero quiet a sus controles.
  5. Verificar que textos largos no rompan cards ni columnas.
- **Restrictions:** no reescribir copy ni eliminar miembros, valores o misión/visión.
- **Acceptance criteria:** no hay gradientes/sombras decorativas; equipo, valores y tabs mantienen contenido; tabs siguen siendo operables por teclado; cards se leen bien en móvil.
- **Validation:** `npm run build`; teclado; 320/390/768/1440; contraste.
- **Definition of Done:** tres superficies coherentes con el lenguaje flat.
- **Escalate to GLM if:** la falta de fotografía real exige cambiar el modelo de contenido.

### AEST-008 — Rediseñar proyectos y features sin botones gigantes

- **Fase:** content surface | **Tipo:** ui | **Prioridad:** P0 | **Riesgo:** medium
- **Owner/model:** Builder / DeepSeek V4 Flash Low
- **Depends on:** AEST-003, AEST-004 | **Parallel group:** D
- **Subagent:** `NO`
- **Skills:** `vue3-migration`, `tailwind-design-system`, `accessibility`, `visual-regression`
- **Input:** `ProjectsSection.vue`, `projects.json`, `BaseIcon.vue`.
- **Output:** `ProjectsSection.vue` y sus estilos.
- **Minimum context:** evento `open-project(slug)`, tres proyectos y features actuales.
- **Steps:**
  1. Cambiar cada tarjeta raíz de `<button>` a `<article>` flat.
  2. Añadir botón aero interno `Ver detalles` que emita exactamente el slug actual.
  3. Mantener imagen, ubicación, distancia y features sin cambiar datos.
  4. Dar a las features tratamiento flat de icono + texto, sin borde lateral dominante si no aporta jerarquía.
  5. Asegurar que toda la card mantiene foco/acción clara sin hacer clickable texto no accionable.
- **Restrictions:** no cambiar `ProjectModal`, slugs ni introducir carousel.
- **Acceptance criteria:** tres cards flat; tres botones aero abren el modal correcto; no hay botón gigante; keyboard focus es visible; grid funciona en 320/768/1024/1440.
- **Validation:** `npm run build`; click/teclado de los tres proyectos; responsive matrix parcial.
- **Definition of Done:** proyectos visualmente ligeros y semánticamente claros.
- **Escalate to GLM if:** la conversión de card button cambia un contrato externo de accesibilidad o tracking.

### AEST-009 — Refresh flat de formularios, modales y WhatsApp

- **Fase:** interaction surface | **Tipo:** ui | **Prioridad:** P1 | **Riesgo:** medium
- **Owner/model:** Builder / DeepSeek V4 Flash Low
- **Depends on:** AEST-003, AEST-004 | **Parallel group:** E
- **Subagent:** `NO`
- **Skills:** `tailwind-design-system`, `accessibility`, `vue3-migration`
- **Input:** `ContactSection.vue`, `BaseModal.vue`, `ProjectModal.vue`, `ReserveLotModal.vue`, `WhatsAppButton.vue`.
- **Output:** esos componentes y estilos scoped.
- **Minimum context:** validaciones actuales, eventos de modal y fallback `mailto:`.
- **Steps:**
  1. Hacer inputs y paneles flat: fondo sólido, borde, focus ring, sin gradientes.
  2. Aplicar botones aero a submit, close, reserve, WhatsApp y acciones del modal.
  3. Mantener el modal con contraste de overlay y una sola sombra funcional.
  4. Revisar ancho, scroll interno y botones en móvil.
  5. Mantener labels, errores, `aria-invalid`, `aria-describedby`, Escape y restauración de focus.
- **Restrictions:** no cambiar provider, fields, validaciones ni textos de negocio.
- **Acceptance criteria:** formularios legibles en 320 px; modales no salen del viewport; acciones aero alcanzan 44 px; validación y mailto siguen funcionando; WhatsApp no cubre el submit.
- **Validation:** `npm run build`; teclado; abrir/cerrar ambos modales; 320/390/768/1440.
- **Definition of Done:** superficies flat e interacciones aero sin regresión funcional.
- **Escalate to GLM if:** el layout móvil requiere cambiar el flujo del formulario.

### AEST-010 — Refresh flat del footer y superficies de iconos

- **Fase:** shared layout | **Tipo:** ui | **Prioridad:** P1 | **Riesgo:** low
- **Owner/model:** Builder / DeepSeek V4 Flash Low
- **Depends on:** AEST-003, AEST-004 | **Parallel group:** C
- **Subagent:** `NO`
- **Skills:** `tailwind-design-system`, `svg-icon-pipeline`, `accessibility`
- **Input:** `AppFooter.vue`, `BaseIcon.vue`, `site.json`.
- **Output:** `AppFooter.vue` y estilos necesarios.
- **Minimum context:** redes actualmente `#`, datos de contacto y contrato flat/aero.
- **Steps:**
  1. Mantener footer sólido y simplificar columnas, separación y densidad de texto.
  2. Aplicar aero solo a controles realmente accionables; enlaces de texto permanecen flat.
  3. Normalizar tamaño, peso y color de iconos SVG.
  4. No inventar URLs sociales; conservar la incertidumbre documentada.
  5. Verificar que columnas colapsan sin overflow y que legal/contacto siguen visibles.
- **Restrictions:** no modificar datos legales, URLs o redes.
- **Acceptance criteria:** footer no usa gradientes ni sombra decorativa; iconos coherentes; enlaces y datos son legibles en móvil; build PASS.
- **Validation:** `npm run build`; 320/768/1440; árbol de accesibilidad.
- **Definition of Done:** footer integrado al sistema visual sin alterar contratos.
- **Escalate to GLM if:** se requiere inventar o confirmar una URL social faltante.

### AEST-011 — Barrera responsive post-iteración estética

- **Fase:** validation | **Tipo:** test | **Prioridad:** P0 | **Riesgo:** high
- **Owner/model:** Builder / DeepSeek V4 Flash Low
- **Depends on:** AEST-005..AEST-010 | **Parallel group:** BARRIER-R
- **Subagent:** `RECOMMENDED`, Responsive Inspector
- **Skills:** `visual-regression`, `tailwind-design-system`, `accessibility`
- **Input:** candidate completo, Responsive Contract, baseline AEST-001.
- **Output:** `docs/migration/11-responsive-validation.md` y correcciones acotadas.
- **Minimum context:** solo contrato responsive, rutas/anclas, componentes modificados y capturas baseline.
- **Steps:**
  1. Probar todos los viewports definidos y orientación horizontal móvil.
  2. Verificar header cerrado/abierto, hero, grids, tabs, forms, modales y WhatsApp.
  3. Buscar overflow horizontal, clipping, texto ilegible, targets pequeños, fixed elements superpuestos y scroll lock incorrecto.
  4. Corregir solo problemas causales de esta iteración.
  5. Repetir la matriz completa después de cada corrección relevante.
- **Restrictions:** no aceptar “se ve bien” sin evidencia; no ampliar scope a copy o arquitectura.
- **Acceptance criteria:** cero overflow horizontal; cero controles cortados; menú móvil operable; modales y formularios utilizables; no hay superposición crítica del WhatsApp.
- **Validation:** capturas y revisión manual en 7 viewports; `npm run build`.
- **Definition of Done:** reporte `PASS` por viewport, o `INCONCLUSIVE` con causa explícita y escalación.
- **Escalate to GLM if:** el mismo fallo sobrevive dos micro-patches o exige cambiar la arquitectura responsive.

### AEST-012 — Auditoría de accesibilidad e interacción

- **Fase:** validation | **Tipo:** test | **Prioridad:** P0 | **Riesgo:** medium
- **Owner/model:** Builder / DeepSeek V4 Flash Low
- **Depends on:** AEST-011 | **Parallel group:** BARRIER-A11Y
- **Subagent:** `NO`
- **Skills:** `accessibility`, `visual-regression`
- **Input:** candidate responsive validado.
- **Output:** `docs/migration/11-a11y-validation.md` y fixes puntuales.
- **Minimum context:** componentes interactivos modificados y criterios WCAG.
- **Steps:**
  1. Recorrer tab order en desktop y móvil.
  2. Verificar focus-visible en aero buttons, menu, tabs, cards triggers, modals y forms.
  3. Verificar `aria-expanded`, `aria-controls`, `role=tab`, dialog labels y Escape.
  4. Validar contraste de flat surfaces y cada variante aero en hover/active/disabled.
  5. Validar `prefers-reduced-motion`.
- **Restrictions:** preferir HTML nativo; no añadir ARIA redundante.
- **Acceptance criteria:** cero errores críticos de axe/Lighthouse; todos los controles alcanzables; foco visible; contraste AA para texto normal y controles; reduced motion respetado.
- **Validation:** axe/Lighthouse si disponible, teclado y revisión de contraste.
- **Definition of Done:** reporte con `PASS` o issues bloqueantes explícitos.
- **Escalate to GLM if:** cumplir contraste o focus requiere cambiar tokens aprobados.

### AEST-013 — Regresión visual de la iteración estética

- **Fase:** validation | **Tipo:** test | **Prioridad:** P1 | **Riesgo:** medium
- **Owner/model:** Builder / DeepSeek V4 Flash Low
- **Depends on:** AEST-001, AEST-011, AEST-012 | **Parallel group:** BARRIER-VISUAL
- **Subagent:** `RECOMMENDED`, Visual Regression Inspector
- **Skills:** `visual-regression`, `regression-validation`
- **Input:** baseline AEST-001, candidate final, contrato `REDESIGN`.
- **Output:** `docs/migration/11-visual-regression.md`
- **Minimum context:** capturas baseline/candidate, visual contract, acceptance criteria; no historial bruto.
- **Steps:**
  1. Comparar header, hero, projects, content, forms/modals, WhatsApp y footer.
  2. Comparar 320/390/768/1440 como mínimo.
  3. Separar diferencias intencionales de flat/aero de regresiones accidentales.
  4. Clasificar cada superficie `PASS`, `FAIL` o `INCONCLUSIVE`.
  5. Reabrir solo las superficies FAIL con una tarea de corrección acotada.
- **Restrictions:** no exigir paridad con Elementor; sí exigir contenido, jerarquía, alineación y responsive sin regresión.
- **Acceptance criteria:** no hay FAIL en rutas, contenido, jerarquía, acciones o responsive; diferencias de sombras/gradientes quedan justificadas por el contrato.
- **Validation:** reporte visual y `npm run build`.
- **Definition of Done:** todas las superficies PASS o INCONCLUSIVE con riesgo aceptado por Planner.
- **Escalate to GLM if:** más de dos superficies FAIL o se discute volver a un patrón visual anterior.

### AEST-014 — Gate de build, performance y release

- **Fase:** release | **Tipo:** infra/test | **Prioridad:** P1 | **Riesgo:** medium
- **Owner/model:** Builder / DeepSeek V4 Flash Low
- **Depends on:** AEST-013 | **Parallel group:** RELEASE
- **Subagent:** `NO`
- **Skills:** `web-performance`, `regression-validation`
- **Input:** candidate validado y reportes AEST-011..013.
- **Output:** `docs/migration/11-aesthetic-release-check.md`
- **Minimum context:** comandos de build, reportes de validación y cambios de esta iteración.
- **Steps:**
  1. Ejecutar `npm run build` y `npm run build:deployment`.
  2. Revisar que no se hayan añadido dependencias ni assets duplicados.
  3. Revisar carga de imágenes del hero y ausencia de eager innecesario.
  4. Confirmar que `robots.txt`, `sitemap.xml`, `404.html` y meta SEO siguen en `dist`.
  5. Registrar tamaños de JS/CSS y cualquier regresión de LCP.
- **Restrictions:** no desplegar si AEST-011, AEST-012 o AEST-013 tienen FAIL abierto.
- **Acceptance criteria:** ambos builds PASS; no se rompe base `/urbanikawsay/`; presupuesto anterior de JS/CSS no empeora sin justificación; artefactos SEO presentes.
- **Validation:** `npm run build`, `npm run build:deployment`, `npm run preview` y smoke test HTTP.
- **Definition of Done:** release candidate listo para revisión visual y deploy.
- **Escalate to GLM if:** performance o build empeora por una decisión estética que requiere tradeoff.

## Critical Path

`AEST-001 → AEST-002 → AEST-003 → AEST-004 → AEST-005..010 → AEST-011 → AEST-012 → AEST-013 → AEST-014`

## First Builder-Ready Task

`AEST-001`, captura baseline y auditoría visual sin editar producción.

## Do Not Change

- URLs legacy, anclas `#inicio`, `#proyectos`, `#nosotros`, `#contacto` y eventos de modales.
- Copy, datos de contacto, slugs de proyectos, JSON-LD, robots, sitemap y canonical.
- Validación y destino de formularios, incluido el fallback `mailto:`.
- Estrategia Vue/Vite/Tailwind, estructura de carpetas y ausencia de router/store.
- Assets originales salvo mejoras de carga que no alteren su representación.
