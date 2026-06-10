# DIAGNÓSTICO COMPLETO — maikphotographer-web-site
**Fecha:** 10 junio 2026 · **Analizado:** `GITHUB CLON\maikphotographer-web-site` (repo activo) + web en producción (maikphotographer-web-site.vercel.app)

---

## 0. NOTA PREVIA: el MASTER-PROJECT-BRIEF no existe como archivo

No hay ningún archivo `MASTER-PROJECT-BRIEF` en ninguna carpeta del proyecto. La referencia de diseño más cercana es `maik-photographer calude design/project/` (hero.jsx, portfolio.jsx, about.jsx, services.jsx, booking.jsx) + `DESIGN_SYSTEM.md`. Este reporte compara contra esa referencia.

También confirmé las carpetas viejas que NO se usan:
- `Maik Photograper Website(old)` — vieja (3 jun)
- `maikphotographer-web-site (old)` — vieja (4 jun)
- ⚠️ **La carpeta raíz `303 Marketing Agency` TAMBIÉN es un clon del mismo repo de GitHub** — y ahí está el problema de deploy (ver punto 1).

---

## TOP 10 PROBLEMAS (ordenados por impacto)

### 🥇 1. Tienes DOS clones del repo y trabajo perdido en el equivocado (CRÍTICO — explica "mis cambios no llegan a Vercel")
- `GITHUB CLON\maikphotographer-web-site` → **0 commits sin pushear**, sincronizado con origin/main. Lo que está aquí ES lo que ve Vercel.
- La carpeta raíz `303 Marketing Agency` → **es otro clon del MISMO repo con 9 commits (4–6 junio) que NUNCA se pushearon**, entre ellos:
  - `perf: Compress scroll video from 6.3MB to 437KB` ← la compresión del video que falta en producción
  - 6 mejoras de accesibilidad/UX
  - Todos los fixes de fade-in/fade-out
- Conclusión: trabajaste unos días en la carpeta raíz, esos commits quedaron huérfanos, y luego seguiste en GITHUB CLON sin esos cambios. **Nada está "atascado" en Vercel: el deploy funciona; el trabajo está en el clon equivocado.**
- Los cientos de archivos "modified" en `git status` del GITHUB CLON son **solo finales de línea (CRLF/LF)**: con `git diff --ignore-cr-at-eol` el diff es CERO. No hay cambios reales pendientes.

### 🥈 2. La homepage usa ~10 clases CSS que no tienen estilos cargados
`index.html` solo carga 5 hojas: `unified.css, accessibility.css, design-system.css, components.css, animations.css`. Pero usa clases definidas SOLO en hojas que NO carga (`main.css`, `about-section-enhancement.css`, `marketing-cta.css`, etc.):

| Clase sin estilos | Sección afectada |
|---|---|
| `.hero-badge` | Hero ("Available in Miami" sin diseño) |
| `.about-container`, `.about-stats`, `.astat-val` | About (stats 200+/3/48h rotos) |
| `.port-caption` | Portfolio (captions sin estilo) |
| `.svc-price` | Servicios (precios sin estilo) |
| `.marketing-cta-section` | CTA Marketing (bloque plano) |
| `.contact-ways`, `.contact-icon` | Contacto (**SVGs gigantes sin tamaño** — los iconos WhatsApp/Mail/IG miden 700px+ de viewBox y no hay regla que los limite) |
| `.footer-logo` | Footer |

### 🥉 3. Video del hero: 9.4MB (objetivo <5MB)
- `40_hero_camara_loop.mp4` = **9.4MB** → LCP desastroso en móvil/4G.
- La versión comprimida (437KB) **existe pero está en los commits sin pushear del clon raíz**.
- Bonus: `<video loading="lazy">` es un atributo inválido y el `<track>` no tiene `src`.

### 4. Logo del footer = texto plano (confirmado)
El SVG del footer usa `<text font-family="ChunkFive">` — esa fuente NO se carga en ninguna parte → el navegador lo pinta con fuente fallback: se ve como texto plano, no como logo. Hay que vectorizar el logo (convertir texto a paths) o cargar la fuente.

### 5. `js/animations.js` con 4 bugs reales
1. **Parallax mal anidado:** la sección 13 (parallax) quedó DENTRO del `if (carousel)` — y aplica `translateY` de hasta ±200px a los `.port-item`, peleándose con las animaciones GSAP de cascada y curtain → el portfolio "salta".
2. **Carrusel con drift:** `translateX(-current*100%)` ignora el `gap: 20px` → cada slide se desalinea 20px acumulativos.
3. **Reduced motion = contenido invisible:** `gsap.globalTimeline.timeScale(0)` congela los `fromTo` en opacity:0 → usuarios con "reducir movimiento" ven secciones VACÍAS.
4. **Código muerto:** anima `.section-title`, `.about-card`, `.hero-img-wrap`, `.hero-img` que NO existen en el HTML; crea cursor custom `.cur-dot/.cur-ring` sin CSS en la homepage (solo existe inline en gallery.html). Sin guard `typeof gsap` — si el CDN falla, todo el JS muere.

### 6. Repo de ~180MB de assets deployados, la mayoría sin uso
- `public/img` = **125MB**, `public/assets` = 52MB.
- 6 videos en `/assets/videos` (49MB) — solo se usa 1. El de 16MB (`45_scroll_video_ojo...`) no se referencia en ningún HTML.
- Posters Velora: 3 PNGs de **14–16MB cada uno** (no referenciados pero deployados).
- Posters Monrowelle: 14 PNGs de 1.2–3.4MB (no referenciados en marketing.html).
- Todo esto va en cada deploy de Vercel y es público en la web.

### 7. Testimonios falsos con fotos de stock de Pexels
5 testimonios inventados (Sarah Chen, Marcus Anderson...) con avatares hotlinkeados de `images.pexels.com`. Riesgo de credibilidad ante clientes reales, y dependencia externa que puede romperse. La sección además está triplicada en el HTML (15 cards).

### 8. Design system fracturado: 20 hojas CSS contradictorias + páginas con otra identidad
- 5 archivos distintos definen `.hero-badge`; reglas duplicadas/contradictorias por todo lados (20 archivos CSS, 3 "sistemas" diferentes).
- `gallery.html`, `sessions.html`, `pricing.html`, `blog.html` usan **fuente Jost** y estilos inline propios — la homepage usa **Bebas Neue/Inter/JetBrains Mono**. Dos webs distintas en una.
- `design-system.css` además re-importa Google Fonts vía `@import` (doble descarga, render-blocking).

### 9. Emojis en vez de los iconos SVG de marca (confirmado)
`📍`, `📧` en Contacto y `✓` en el form status — teniendo 30+ iconos SVG de marca en `/assets/icons/` (16_icono_ubicacion, 17_icono_mail, etc.) sin usar.

### 10. Performance/SEO secundarios
- Existen versiones `.webp` de todo el portfolio (30–40% más ligeras) pero el HTML usa `.jpg` sin `<picture>`.
- 20 imágenes de la galería >200KB; `the303-netflix-3.png` (About) = 872KB.
- `canonical` y `og:url` apuntan a `www.maikphotographer.com` mientras el sitio vive en `vercel.app` → si el dominio no está conectado, las señales SEO se van a un dominio que no responde.
- Lenis se carga del CDN (~30KB) pero el código lo tiene desactivado ("Native scroll behavior enabled").
- Imagen About sin dimensiones explícitas → layout shift.

---

## ESTADO POR SECCIÓN vs REFERENCIA DE DISEÑO

| Sección | Existe | Estado |
|---|---|---|
| Hero | ✅ | Video 9.4MB, badge sin estilos, light-leak OK |
| Marquee galería | ✅ | Funciona, 2 imágenes >250KB |
| About | ✅ | Stats y container SIN CSS cargado |
| Portfolio | ✅ | Filtros OK, parallax conflictivo, webp sin usar |
| Servicios | ✅ | Precios sin estilos; OK en contenido |
| **Booking** | ⚠️ | No es sección propia: solo un embed de Cal.com escondido al final de Contacto, sin título ni diseño |
| Contacto | ✅ | Iconos SVG sin límite de tamaño, emojis, form → /api/contact OK |
| Footer | ✅ | Logo en texto plano (fuente no cargada) |
| Testimonios | ✅ | Contenido falso/stock |

Backend (api/contact.js → Notion + webhook Make) está bien estructurado. El `vercel.json` actual es válido (los 2 últimos commits arreglaron los deploys bloqueados).

---

## PLAN DE RECONSTRUCCIÓN (ejecutable por Claude sin pedirte nada)

### FASE 0 — Rescate y saneamiento de Git (30 min)
1. Portar los 9 commits huérfanos del clon raíz al GITHub CLON (en especial el video comprimido de 437KB y los fixes de accesibilidad). Método: copiar los archivos resultantes, no cherry-pick (los repos divergieron).
2. Crear `.gitattributes` con `* text=auto eol=lf` + renormalizar → adiós a los 250 archivos "modified" fantasma.
3. Dejar nota `DEPRECATED.md` en el clon raíz y carpetas (old) para no volver a editar ahí.

### FASE 1 — Consolidación CSS (1 sesión)
4. Auditar las 20 hojas y fusionar en 4: `design-system.css` (tokens), `components.css`, `sections.css`, `animations.css`.
5. Garantizar que TODA clase usada en index.html tiene estilos cargados (los 10 huecos de la tabla).
6. Eliminar `@import` de fuentes duplicado; un solo `<link>` de Google Fonts.

### FASE 2 — Reconstrucción sección por sección
7. **Hero:** video comprimido (<1MB H.264 + poster JPG), quitar `loading="lazy"` y `<track>` vacío, badge estilizado.
8. **About:** estilos de stats restaurados, `the303-netflix-3.png` → webp ~150KB con width/height.
9. **Portfolio:** `<picture>` con webp+jpg, eliminar parallax conflictivo (`data-parallax`), mantener cascada GSAP.
10. **Servicios:** estilos de precio, sin cambios de contenido.
11. **Booking:** sección propia `#booking` con título "Book your session", el embed Cal.com con tema oscuro (`calendar-dark-theme.css` ya existe y no se carga).
12. **Contacto:** iconos de marca de `/assets/icons` con tamaño fijo 48px, fuera emojis.
13. **Footer:** logo vectorizado (texto→path) — se ve idéntico en todos los dispositivos.
14. **Testimonios:** reducir a 5 cards (sin triplicar en HTML, duplicación via JS), avatares locales con iniciales (sin Pexels) hasta tener testimonios reales.
15. **animations.js:** sacar parallax del `if`, arreglar drift del carrusel (gap en el cálculo), fix reduced-motion (gsap.set a estado final), guard `typeof gsap`, borrar código muerto.

### FASE 3 — Performance y limpieza (1 sesión)
16. Mover assets no usados (videos extra, posters Velora/Monrowelle gigantes) fuera de `public/` a una carpeta `_assets_archive/` fuera del repo o con `.vercelignore`.
17. Comprimir las 20 imágenes >200KB de la galería (sharp ya está en package.json).
18. Quitar Lenis del HTML (no se usa); unificar fuentes en páginas secundarias (Jost → sistema Bebas/Inter).

### FASE 4 — QA y deploy
19. `node scripts/qa-check.js` + verificación manual de las 6 páginas + Lighthouse.
20. Commit por fase con mensajes claros + `git push` → Vercel auto-deploy → verificar producción.

**Orden de ejecución recomendado: 0 → 2.7 (hero/video) → 1 → resto de 2 → 3 → 4.** El mayor impacto visible está en Fase 0 + el video del hero.
