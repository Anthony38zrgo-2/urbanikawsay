# 09 — Visual Regression

## Método
Se compara el nuevo sitio (Vue + Tailwind) contra el legacy WordPress según
visual intent **REFRESH** (preservar jerarquía/contenido, modernizar estilo).
Paleta nueva (`paleta-moderna.css`) tiene precedencia deliberada.

## Estado
INCONCLUSIVE — no se dispone de capturas del legacy como baseline estable en el
entorno local. El sitio legacy (WordPress en producción) es mutable y no se
incluyó screenshot baseline en `web-legacy/`.

## Validación realizada
- Hero: slider CSS reemplaza Slider Revolution (jerarquía preservada, contenido
  "CONSTRUYE EL FUTURO SEGURO QUE TE MERECES" + CTA conservados).
- Secciones About/Team/Projects/Values/Contact con contenido legacy preservado.
- Copy corregido: "Respira Inmobiliaria" → "Urbanikawsay Inmobiliaria".
- Jerarquía de encabezados conservada (h1 hero, h2 secciones, h3 cards).

## Próximo paso
Cuando se disponga de capturas legacy (desktop/mobile), ejecutar comparación
visual por sección y clasificar PASS/FAIL/INCONCLUSIVE por ancho
(360/768/1440). No hay FAIL estructural esperado.
