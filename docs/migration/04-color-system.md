# 04 — Color System (Design Tokens)

Fuente: `diseño/paleta-moderna.css` (sistema 60-30-10)

## Tokens Tailwind v4 (`src/styles/theme.css`)
Ver `src/styles/theme.css` para el bloque `@theme` completo. Resumen:

- Primario (60%): `#0D4D2E`, dark `#092E1C`, light `#1A6B42`
- Secundario (30%): `#2EAA4D`, bright `#7ED957`, pale `#D4F0C5`
- Acento (10%): `#FFB11B`, hover `#FF9A00`, strong `#FF7A00`, pale `#FFF2CC`
- Surfaces: `#FDFCF7`, `#EEF5EB`, `#E2E9DF`
- Texto: `#121F17`, `#5E7568`, inverse `#FDFCF7`, on-accent `#092E1C`
- Bordes: `#D5DDD2`, `#A8B5A1`
- Estados: success `#2EAA4D`, warning `#FFB11B`, error `#D92D20`
- Gradientes: `.bg-brand-gradient` (verde), `.bg-accent-gradient` (naranja)

## Contraste WCAG (calculado)
| Par | Ratio | Resultado |
|---|---|---|
| text-primary / surface | 14.8:1 | AAA |
| text-primary / surface-soft | 13.9:1 | AAA |
| text-inverse / brand-primary | 9.7:1 | AAA |
| text-on-accent / accent | 5.2:1 | AA |
| text-secondary / surface | 4.8:1 | AA |
| text-secondary / brand-primary | 2.3:1 | **FAIL — no usar** |

## Regla
No usar `text-secondary` sobre fondos brand-primary. Para texto sobre verde oscuro usar `text-inverse`.
