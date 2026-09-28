# PROYECTO — The303 / maikphotographer.com · Contexto maestro

> **Léeme al iniciar y ACTUALÍZAME después de cada cambio importante.**
> Fuente única de verdad del proyecto: qué es, cómo está armado y qué ya está integrado.
> Si algo aquí contradice tu suposición, gana este archivo. No vuelvas a preguntar lo que ya está resuelto abajo.

Última actualización: 2026-09-27

---

## 1. Qué es
- Marca: **The303 Creative** (agencia de contenido, marca y marketing en Miami) — fundador **Maikel Marshall** (@maik_photographer).
- La web se está **reposicionando de "fotógrafo" a "agencia de marketing"**: el resultado que se vende es *listings, reservas y ventas*; foto/video/Reels son insumos de un sistema.
- Dominio: **https://www.maikphotographer.com** (canónico con www).

## 2. Repo, deploy, stack
- Repo: `github.com/303creative/maikphotographer-web-site`. Carpeta local: `...GITHUB CLON\maikphotographer-web-site`.
- Deploy: **Vercel**, `outputDirectory: public` (todo lo público vive en `public/`).
- Stack: **HTML/CSS/JS vanilla** (NO React, NO Tailwind). CSS modular en `public/css/`, JS en `public/js/`, funciones serverless en `api/`.
- La home nueva `the303.html` es un export de **Claude Design (DC)** y usa `public/support.js` (runtime DC). El resto del sitio es vanilla.

## 3. Integraciones YA HECHAS (no volver a pedirlas)
- **Chatbot Mariela** — widget propio: `public/js/mariela-widget.js` (botón flotante en todas las páginas, estilo Apple). Backend n8n:
  `https://the303photography.app.n8n.cloud/webhook/2a1d3c2e-1dd1-4734-9cf5-7ec2922e9d04/chat`
- **Calendario (Book a call)** — **Cal.com** embed (`cal.com/embed/embed.js`), link **`the303-marketing-kmfxzs/30min`**, tema oscuro en `public/css/calendar-dark-theme.css`.
- **Formulario de contacto/auditoría** — postea a **`/api/contact`** (serverless en `api/`).
- **WhatsApp:** +1 786 332 9815 → `https://wa.me/17863329815`
- **Email:** maikelmarshall07@gmail.com · **Instagram:** @maik_photographer
- Analítica: Vercel Insights.

## 4. Sistema de diseño — "Brutalismo Editorial Oscuro" (home nueva)
- Fondo #0A0A0A/#050505 · texto #F2F2F0 · secundario #8A8A87/#B4B4B0 · **acento coral #FF5A36** (solo hover/1 dato).
- Tipografía: **Archivo** (display mayúsculas, font-stretch 108–115%, titulares gigantes) + **IBM Plex Mono** (eyebrows, precios, metadatos).
- Retícula expuesta, indexación `[00][01]…`, métricas como arte, acentos técnicos (coordenadas Miami 25.76°N 80.19°W, REC ●).
- **Fotos A COLOR** (realce sutil `saturate(1.05) contrast(1.03)` — NO blanco y negro).
- **Bilingüe EN/ES** con toggle.
- Referencia maestra del estilo: `public/the303.html`.

## 5. Mapa de páginas (`public/`)
- `index.html` — home actual (fotógrafo, vanilla). **Pendiente:** promover `the303.html` a home cuando se apruebe.
- `the303.html` — **home nueva** (agencia, brutalista, bilingüe, a color). Ya desplegada como página aparte para revisión.
- `gallery.html` · `sessions.html` · `pricing.html` · `marketing.html` · `blog.html` (+ `blog-brand-content-photography.html`, `blog-courthouse-wedding-miami.html`, `blog-editorial-photographer-miami.html`) · `card.html` (tarjeta NFC).
- Plan de reestructura (agencia): Home `/` · Services `/services` · Work `/work` (reemplaza gallery) · About `/about` · Pricing · Journal/Blog · Contact. Ver `PROMPT_ClaudeDesign_The303_Web.md`.

## 6. Servicios / sistemas (los que vende)
- **Personal** (sesión editorial) — desde $350
- **Content Engine** (contenido mensual) — $1,500/mes · *Most popular*
- **Luxury Content System** (real estate/hospitality/beauty) — $3,000+/mes
- **Website + AI (Mariela)** — $2,500+ + $249/mes
- (Evaluar 5º: **Ads & Prospección**)

## 7. Reglas del proyecto
- Posicionar como **agencia**, no fotógrafo. Bilingüe EN/ES.
- **No inventar** métricas ni testimonios: usar placeholders claros hasta tener datos reales (casos: D'Homes, Sazón Latino).
- Fotos a color. Mantener el sistema de diseño de `the303.html` en toda página nueva.
- Al terminar Claude Design: los archivos que devuelva se **integran al repo** cableando Mariela (`mariela-widget.js`), Cal.com (`the303-marketing-kmfxzs/30min`) y el form (`/api/contact`).

## 8. Estado / pendientes
- [ ] Aprobar `the303.html` en vivo → promover a `index.html` y actualizar navegación del resto.
- [ ] Reformular Services / Work / About / Pricing / Journal / Contact en el mismo estilo (Claude Design o a mano).
- [ ] Casos reales con métricas verificadas.
- [ ] Confirmar precios finales por paquete.
- [ ] Migrar blog a temas de marketing (no solo fotografía).

---

## CHANGELOG (agregar una línea por cada actualización)
- 2026-09-27 — Creado este archivo de contexto. Desplegada `the303.html` (home nueva brutalista, bilingüe) + `support.js`; fotos cambiadas de B/N a color. Confirmadas integraciones existentes: Mariela (n8n), Cal.com (`the303-marketing-kmfxzs/30min`), `/api/contact`.
- 2026-09-27 — Integrado el sitio COMPLETO de Claude Design en `public/`: páginas `Home/Services/Work/About/Pricing/Journal/Journal Article/Contact/Card.dc.html` + componentes `SiteHeader/SiteFooter/AuditBlock.dc.html` (runtime DC `support.js`, COMPONENT_DIR="."). Cableado: form→`/api/contact` (default en AuditBlock), Cal.com embed en Contact (`#cal-embed`), widget Mariela en las 8 páginas, SEO head + assets en `public/uploads/`. NOTA: navegación enlaza por `Nombre.dc.html`. `index.html` NO se tocó todavía (revisar en `/Home.dc.html` y luego promover Home→index).
- 2026-09-28 — **Logo oficial The303 aplicado.** Fuente: `02_BRANDS/the303/brand-identity/the303-creative-mejorado.png` (blanco s/ negro, sin alfa). Generé versión transparente `public/assets/brand/the303-logo.png` (blanco, fondo transparente, recortado) + favicons (`favicon-32/512`, `apple-touch-icon`) + `og-the303.jpg` (1200×630). Colocado en el **header** (reemplaza el texto "THE303", alto 42px, en todas las páginas vía SiteHeader), **favicon** en las 19 páginas, y **OG** del home (index + Home). Footer conserva el wordmark tipográfico gigante (decisión de diseño). Regenerar logo → clave el negro a alfa por luminancia.
- 2026-09-28 — **7 casos de cliente más añadidos a Work** (desde `CLIENTES_WEB/`): D´Homes (retratos de marca), Good Trip (branding+web), Structure (contenido+editorial), Moses (diseño web), Titi & Maddi (música/sesión+BTS), Monrowelle (catálogo bolsos), Sculpt x Strength (fitness). Cada uno: `client-<slug>.dc.html` (portada + brief editorial + alcance + feed masonry, sin métricas) + fotos optimizadas en `public/assets/work/<slug>/`. Work muestra los 8 casos con tags (sin KPIs). Generador: `/tmp/gen_clients.py` (config por cliente: cover_idx/feed_idx sobre `sorted(os.walk)` de su carpeta). `ClientPortfolio.dc.html` = plantilla base, ahora `noindex`. Sitemap + los 8. **Pendiente:** @ Instagram por cliente; decidir si sumar sesiones personales (bodas/modelo/DJ) y casos de estudio (Nike/CasaBlanca/OrillaStudio) como sección aparte.
- 2026-09-28 — **Caso Sazón Latino (creación de contenido).** Creada `public/client-sazon-latino.dc.html` (portada + brief editorial + alcance + feed 12 fotos, SIN métricas/resultados, por ser trabajo de creación de contenido). En `Work.dc.html` el caso Sazón ya NO muestra KPIs: la tarjeta ahora usa tags (`Creación de contenido · Foto · Editorial`) mediante `showKpis/noKpis`, y enlaza a su página. Fotos: YA COLOCADAS y optimizadas en `public/assets/work/sazon-latino/` (`cover.jpg` + `01.jpg…12.jpg`, ~2.5 MB total, desde `CLIENTES_WEB/sazon-latino (sesion de fotos)`). Portada = costillar entero sobre el barril. **Carpeta maestra de fotos de clientes:** `303 Marketing Agency/CLIENTES_WEB/` (una subcarpeta por cliente, algunas con subcategorías). Ahí están: D´Homes, Good Trip, Structure, Moses, Titi y Maddi, Sofía, Roger y Ana (boda), May DJ, Sculpt x Strength, monrowelle, Sazón, + `# Casos de Estudio` (CasaBlanca, Nike, OrillaStudio, posters). Pendiente: `@` de Instagram de Sazón.
- 2026-09-28 — **Casos de cliente clickeables en Work.** Integrada plantilla "Client Portfolio" (subida por Maikel) como `public/ClientPortfolio.dc.html` + dependencia `public/image-slot.js`. Cada tarjeta de caso en `Work.dc.html` ahora es un enlace (`<a href="{{ c.href }}">`) que abre la página de detalle del cliente (portada, brief, alcance, feed, reels, resultados, testimonio, CTA). Resultados/testimonio ocultos por defecto (no mostrar métricas placeholder hasta tener datos verificados). **Flujo para nuevos clientes (poco a poco):** por cada cliente → copiar `ClientPortfolio.dc.html` a `client-<slug>.dc.html`, llenar nombre/@/sector/fotos/(métricas si verificadas), y añadir el 4º campo `href` en el array `t.cs` (en/es) de `Work.dc.html` apuntando a ese archivo. Hoy todas las tarjetas apuntan a `ClientPortfolio.dc.html` (demo).
- 2026-09-28 — **Sitio nuevo promovido a PRINCIPAL** (aprobado por Maikel). `Home.dc.html` → `index.html` (canonical/og:url a la raíz `/`). Correcciones: enlaces "home" del header/footer/tarjeta → `/`; renombrado `Journal Article.dc.html` → `JournalArticle.dc.html` + refs actualizadas; `sitemap.xml` reescrito a la estructura de agencia (home + Services/Work/About/Pricing/Journal/JournalArticle/Contact); redirects 301 de rutas viejas de fotógrafo (`/gallery→/Work`, `/sessions,/marketing→/Services`, `/pricing→/Pricing`, `/blog→/Journal`) y limpias (`/services,/work,/about,/journal,/contact`) en `vercel.json`; `index.html` viejo respaldado en `_backup/` (fuera de `public/`). Verificado: relativos DC resuelven a raíz (sin trailing slash), Mariela+support.js en index. **Pendiente:** push del repo por el usuario.
