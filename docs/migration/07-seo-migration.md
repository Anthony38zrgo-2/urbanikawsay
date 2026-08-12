# 07 — SEO Migration

## Mapa 301 (legacy → nueva SPA)
| Legacy | Nueva |
|---|---|
| / | / (canonical self) |
| /proyecto/ | /#proyectos |
| /proyecto/villa-norte/ | /#proyectos |
| /proyecto/guaral-villge/ | /#proyectos |
| /proyecto/villa-rica/ | /#proyectos |
| /acerca-de-nosotros/ | /#nosotros |
| /contactenos/ | /#contacto |
| /separa-tu-lote/ | / (modal accesible por CTA header) |

## Mecanismo
GitHub Pages no soporta .htaccess ni 301 server-side. Implementado vía
`public/404.html` con redirección JS/meta-refresh por ruta. Redirección 301 real
(HTTP) requiere DNS/CDN externo → mejora futura documentada.

## Metadata (index.html)
- title, description, theme-color #0D4D2E, canonical self
- OpenGraph (type/title/description/url/locale/image) + twitter:card
- JSON-LD RealEstateAgent (name, legalName, tel, email, dirección, horario)
- lang=es

## robots.txt + sitemap.xml
- `public/robots.txt`: Allow / + Sitemap
- `public/sitemap.xml`: URL única https://urbanikawsay.com/

## Links legacy a corregir
- CTA header "Separa tu lote" (href="" roto) → abre ReserveLotModal
- "Conoce más aquí" (href="#") → ancla #proyectos
- Redes footer (href="#" rotas) → sin URLs reales; dejadas como "#" pendiente URLs
