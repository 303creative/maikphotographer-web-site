# Claude Code Instructions — maikphotographer.com

Eres un ingeniero de software especializado en crear experiencias web premium, animaciones cinematográficas e interfaces de alto impacto visual.

Tu objetivo es mantener y mejorar maikphotographer.com: un sitio web premium para Maikel Marshall, fotógrafo profesional en Miami con estética cinematográfica, dark theme, botones cream-colored, y animaciones fluidas.

---

## Stack Tecnológico Actual (IMPORTANTE: NO REACT)

```
HTML vanilla (public/index.html)
CSS modular — múltiples archivos en public/css/
JavaScript vanilla — scripts en public/js/
(NO React, NO TailwindCSS, NO Framer Motion)
```

**Arquitectura CSS actual:**
- `public/css/main.css` — estilos base globales
- `public/css/hero-design-upgrade.css` — hero section (video, botones cream, line-in animations)
- `public/css/marketing-services.css` — sección de servicios de marketing (4 cards)
- `public/css/marketing-cta.css` — CTA mid-page
- Otros CSS según sea necesario

**JavaScript actual:**
- `public/js/hero-design-upgrade.js` — animaciones hero (video fade-in, line-in text split, badge pulse)

---

---

## Sistema de Diseño — maikphotographer.com

### Identidad Visual

```
Fotógrafo: Maikel Marshall (@maik_photographer)
Estilo: Cinematográfico · Minimalista · Lujo editorial
Paleta: Dark theme (#0C0C0C base) + naranja (#FF5722) + cream buttons (#E1E0CC)
Sensación: "Este fotógrafo cobra $400-500+ por sesión. Vale cada dólar."
```

### Colores

```css
:root {
  --bg:             #0C0C0C;      /* Negro profundo — base */
  --accent:         #FF5722;      /* Naranja cinematográfico — CTAs */
  --accent-hover:   #E64A19;
  --cream:          #E1E0CC;      /* Botones primarios */
  --text:           #FFFFFF;      /* Texto principal */
  --text-secondary: #888888;      /* Subtítulos */
  --border:         rgba(255,255,255,0.08);
}
```

## Tipografía

| Rol | Fuente | Uso |
|-----|--------|-----|
| `--font-heading` | Bebas Neue | H1, H2, H3 — impacto editorial |
| `--font-body` | Inter | Cuerpo, UI, párrafos |
| `--font-mono` | JetBrains Mono | Labels, tags, brackets, coordenadas |

```css
/* Tamaños responsivos */
--text-hero:  clamp(64px, 12vw, 150px);
--text-h1:    clamp(40px, 7vw, 80px);
--text-h2:    clamp(28px, 5vw, 64px);
--text-h3:    clamp(18px, 3vw, 32px);
--text-body:  16px;
--text-small: 13px;
--text-label: 11px;
--text-tag:   10px;
```

## Motion system — Emil Kowalski principles

```css
/* Easings */
--ease-out:    cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out: cubic-bezier(0.87, 0, 0.13, 1);
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);

/* Duraciones */
--dur-fast:    150ms;  /* Micro-interacciones */
--dur-normal:  300ms;  /* Transiciones UI */
--dur-slow:    600ms;  /* Animaciones de entrada */
--dur-slower:  1000ms; /* Reveals y parallax */
```

**Reglas de animación obligatorias:**
- Máximo 300ms para animaciones de UI
- Solo animar `transform` y `opacity` — nunca `top/left/width/height`
- `ease-out` para elementos que entran — `ease-in` para elementos que salen
- Button press: `scale(0.97)` en `100ms` al click
- GPU acceleration: usar `will-change: transform` solo en elementos que se animan

---

---

## Estructura de Páginas

### `public/index.html` — Página Principal

**Secciones en orden:**

```
1. Hero
   - Video background (loop de cámara)
   - Badge con disponibilidad (punto verde pulsante)
   - Título con line-in animation ("Shoot real. Feel it." — "real." en naranja itálica)
   - Subtítulo
   - CTAs: botón cream (primario) + ghost button (secundario)
   - Mobile: foto estática en lugar de video

2. About (Stats Section)
   - Foto de Maikel (the303-netflix-3.png con background removido)
   - Texto "I don't just take photos. I direct."
   - Stats: sesiones, países, años de experiencia
   - [REMOVIDO: firma 28_firma_maikel.png]

3. Portfolio Grid (3x3)
   - 9 fotos con aspect-ratio 3/4
   - Filtros: All | Portrait | Editorial | Lifestyle
   - Hover effects (scale, vignette, light leak)
   - Watermark MK en esquina inferior derecha

4. Marketing Services (NUEVO)
   - 4 servicios con galería de imágenes
   - Layouts responsive:
     * Desktop: grid 3+ columnas
     * Tablet: grid 2 columnas
     * Mobile: 1 columna
   - Cada servicio tiene:
     * Galería inline con imágenes
     * Descripción
     * Precio
     * CTA button

   Servicios actuales:
   1. Corporate Photography — $400/media-day
      Fotos: C:\Users\maike\Desktop\303 Marketing Agency\maikphotographer-web-site\public\img\marketing\Fotos Corporativas D'Homes Group\
   
   2. Event & Catering Photography — $450/event
      Fotos: C:\Users\maike\Desktop\303 Marketing Agency\maikphotographer-web-site\public\img\marketing\Fotos de Sazón Latino Catering\
   
   3. Social Media Marketing Design — $350/campaign
      Fotos: C:\Users\maike\Desktop\303 Marketing Agency\maikphotographer-web-site\public\img\marketing\Posters de D'Homes Group\
   
   4. Custom Promotional Flyers — $300/design
      Fotos: C:\Users\maike\Desktop\303 Marketing Agency\maikphotographer-web-site\public\img\marketing\Posters de Good Trip Viajes\flyers\

5. Services (Servicios estándar)
   - 3 cards (Portrait, Editorial/Fashion, Brand Content)
   - Layout: grid responsivo
   - Featured badge en Editorial

6. Contact
   - Icono + descripción (calendar booking)
   - Formulario contacto: nombre, email, teléfono, mensaje
   - Cal.com embed
   - Iconos de redes: Instagram, WhatsApp

7. Footer
   - Logo MK
   - Links rapidos
   - Copyright
```

---

## Componentes Clave & Estilos

### Hero Section (`public/css/hero-design-upgrade.css`)

**Video background:**
```css
.hero-video-bg {
  position: absolute;
  border-radius: clamp(12px, 3vw, 32px);
  overflow: hidden;
}

.hero-video-bg video {
  opacity: 0;
  transition: opacity 700ms cubic-bezier(0.22, 1, 0.36, 1);
}

.hero-video-bg video.ready {
  opacity: 0.35;  /* Desktop */
}

@media (max-width: 768px) {
  .hero-video-bg {
    display: none !important;  /* Muestra foto fallback en lugar de video */
  }
}
```

**Hero content (buttons + title):**
```css
.hero-content {
  position: absolute !important;
  bottom: 0 !important;
  display: flex !important;
  flex-direction: row !important;
  justify-content: space-between !important;  /* Botones a la derecha en desktop */
  padding: clamp(40px, 8vw, 80px) !important;
}

/* Desktop: buttons right, title left */
@media (max-width: 768px) {
  .hero-content {
    flex-direction: column;          /* Mobile: vertical */
    align-items: center;
    text-align: center;
  }
  
  .hero-ctas {
    flex-direction: column;
    width: 100%;
    align-items: stretch;
  }
}
```

**Buttons:**
```css
/* Cream button (primario) */
.btn-primary {
  background: #E1E0CC;
  color: #0C0C0C;
  padding: clamp(11px, 2vw, 14px) clamp(20px, 4vw, 28px);
  border-radius: 999px;
  transition: all 260ms cubic-bezier(0.22, 1, 0.36, 1);
}

.btn-primary:hover {
  background: #FFFFFF;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(225, 224, 204, 0.3);
}

/* Ghost button (secundario) */
.btn-ghost {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #FFFFFF;
}

.btn-ghost:hover {
  border-color: rgba(225, 224, 204, 0.8);
  background: rgba(225, 224, 204, 0.05);
  color: #E1E0CC;
}
```

**Line-in title animation:**
```css
.line-in {
  display: block;
  overflow: hidden;
  height: auto;
}

.line-in span {
  display: block;
  transform: translateY(110%);
  transition: transform 1s cubic-bezier(0.22, 1, 0.36, 1);
}

html.anim-ready .line-in span {
  transform: translateY(0);
}
```

**Badge:**
```css
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: clamp(8px, 2vw, 12px);
  padding: clamp(8px, 1.5vw, 12px) clamp(16px, 3vw, 20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(12px);
  font-size: clamp(9px, 1.2vw, 11px);
  color: #E1E0CC;
  text-transform: uppercase;
  letter-spacing: 0.15em;
}

.badge-dot {
  width: 6px;
  height: 6px;
  background: #22C55E;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}
```

### Marketing Services Section (`public/css/marketing-services.css`)

**Grid layout:**
```css
.marketing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: clamp(32px, 5vw, 48px);
}

@media (max-width: 768px) {
  .marketing-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 640px) {
  .marketing-grid {
    grid-template-columns: 1fr;
  }
}
```

**Marketing card:**
```css
.marketing-card {
  padding: clamp(48px, 8vw, 64px);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 300ms cubic-bezier(0.22, 1, 0.36, 1);
}

.marketing-card:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 87, 34, 0.4);
  transform: translateY(-4px);
}
```

**Image gallery (dentro de marketing card):**
```css
.marketing-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: clamp(12px, 2vw, 20px);
  margin-bottom: clamp(20px, 4vw, 32px);
}

.marketing-gallery img {
  width: 100%;
  height: 280px;
  object-fit: contain;        /* IMPORTANTE: contener, no cover */
  border-radius: 8px;
  transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
}

.marketing-gallery img:hover {
  transform: scale(1.03);
}
```

---

## Assets & Rutas

### Imágenes

```
/public/img/
├── the303-netflix-3.png              (About section, 0.35 MB)
├── marketing/
│   ├── Fotos Corporativas D'Homes Group/  (3 fotos JPG)
│   ├── Fotos de Sazón Latino Catering/    (13 fotos, usando 3)
│   ├── Posters de D'Homes Group/          (4 fotos, usando 3)
│   └── flyers/                            (Good Trip Viajes — 7 fotos)
└── assets/backgrounds/
    └── 37_foto_hero_horizontal_2.jpg      (Mobile fallback, 20KB)
```

### SVG Assets (en # Assets para web\SVG)

```
Logos:
- 01_logo_mk_blanco_principal.svg
- 02_logo_horizontal_blanco.svg
- 07_badge_disponible.svg

Iconos:
- 15_icono_camara_blanco.svg
- 16_icono_ubicacion_blanco.svg
- 17_icono_mail_blanco.svg
- 18_icono_whatsapp_blanco.svg
- 19_icono_instagram_blanco.svg
- 20_flecha_cta_corto_naranja.svg
```

---

## JavaScript — Animaciones & Comportamiento

### `public/js/hero-design-upgrade.js`

```javascript
// 1. VIDEO FADE-IN
Detecta cuando el video está listo (canplay, playing, loadeddata events)
Agrega clase .ready al video cuando está cargado
Opacity transiciona de 0 a 0.35

// 2. LINE-IN ANIMATION
Split del hero-title por <br>
Envuelve cada línea en span para animation
Clase anim-ready en html triggers transform: translateY(0)

// 3. BADGE PULSE
CSS keyframes pulse 2s ease-in-out
Opacity 1 → 0.5 → 1
```

**Cómo funciona:**
1. On DOMContentLoaded, espera evento de video listo
2. Agrega clase `.ready` al video → CSS transiciona opacity
3. Split título por `<br>` en líneas separadas
4. Cada línea envuelta en `.line-in` spans
5. Después de 50ms, agrega `anim-ready` al `<html>` → activa transforms

---

## Contact Section (Spacing Fixes)

**Archivo afectado:** `public/css/main.css`

```css
.contact-ways {
  gap: 24px;  /* Aumentado de 12px — spacing entre iconos */
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;  /* Espaciado entre campos */
}

.contact-icon,
.cway {
  padding: clamp(18px, 2vw, 28px) clamp(20px, 3vw, 32px);  /* Más generous */
  border-radius: 8px;  /* Aumentado de 4px */
}
```

---

# Assets disponibles (Legacy)

## Rutas exactas en producción

```
/assets/icons/01_logo_mk_blanco_principal.svg
/assets/icons/02_logo_horizontal_blanco.svg
/assets/icons/07_badge_disponible.svg
/assets/icons/15_icono_camara_blanco.svg
/assets/icons/16_icono_ubicacion_blanco.svg
/assets/icons/17_icono_mail_blanco.svg
/assets/icons/18_icono_whatsapp_blanco.svg
/assets/icons/19_icono_instagram_blanco.svg
/assets/icons/20_flecha_cta_corto_naranja.svg

/assets/backgrounds/31_fondo_ia1_oscuro_principal.jpg
/assets/backgrounds/34_fondo_about_bokeh_oscuro.jpg
/assets/backgrounds/38_miami_bg.jpg
/assets/backgrounds/36_foto_camara_1.jpg

/assets/portfolio/39_portafolio_1.jpg  (hasta _9.jpg)

/assets/overlays/24_overlay_ligth_leak.png
/assets/overlays/25_vignette.png
/assets/overlays/28_firma_maikel.png
/assets/overlays/29_watermark_mk.png

/assets/textures/22_grain_texture.png

/assets/videos/40_hero_camara_loop.mp4
/assets/videos/41_hero_loop_part_culas_de_luz.mp4
/assets/videos/44_scroll_video_camara_desmontandose.mp4
/assets/videos/42_hero_loop_destello_de_lente.mp4
/assets/videos/43_hero_loop_humo_cinematografico.mp4

/img/the303-netflix-2.png
/img/the303-netflix-3.png
```

## Rutas de API (NO modificar)

```
POST /api/lead-capture   — Captura leads del formulario
POST /api/booking-webhook — Cal.com webhook
```

## Cal.com embed

```javascript
// Booking embed en sección #booking
Cal("inline", {
  elementOrSelector: "#cal-embed",
  calLink: "the303-marketing-kmfxzs/30min"
});
```

---

# Performance — reglas obligatorias

## Imágenes

```jsx
// Siempre usar lazy loading excepto en el hero
<img loading="lazy" decoding="async" />

// Tamaños máximos aceptables:
// Hero poster: < 80KB
// Portfolio fotos: < 300KB cada una
// Fondos de sección: < 150KB
// Overlays PNG: < 50KB
```

## Videos

```jsx
// Siempre: autoplay muted loop playsinline preload="none"
// Poster obligatorio para evitar flash negro
// Opacidad máxima: 0.45 para el hero background
// mobile: reducir opacidad a 0.2

<video autoplay muted loop playsinline preload="none"
  poster="/assets/backgrounds/31_fondo_ia1_oscuro_principal.jpg">
  <source src="/assets/videos/40_hero_camara_loop.mp4" type="video/mp4">
</video>
```

## Animaciones

```javascript
// Nunca animar propiedades que causan reflow:
// ❌ width, height, top, left, margin, padding
// ✅ transform, opacity, filter

// Lazy load de GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Siempre usar will-change solo cuando sea necesario
// y removerlo después de la animación

// Respetar prefers-reduced-motion:
const prefersReduced = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;
```

---

---

## Responsive Design

```css
Breakpoints (mobile-first):
- Mobile:  375px (base, diseña aquí primero)
- Tablet:  768px (@media min-width: 768px)
- Desktop: 1024px (@media min-width: 1024px)
- Wide:    1280px

Comportamiento por sección:
┌─────────────────┬──────────┬────────┬─────────┐
│ Sección         │ Mobile   │ Tablet │ Desktop │
├─────────────────┼──────────┼────────┼─────────┤
│ Portfolio       │ 1 col    │ 2 col  │ 3 col   │
│ Services        │ 1 col    │ 1 col  │ 3 col   │
│ Marketing svcs  │ 1 col    │ 2 col  │ 3+ col  │
│ Hero buttons    │ vertical │ row*   │ row     │
│ Hero video      │ hidden   │ hidden │ visible │
│ Contact icons   │ 1 row    │ 1 row  │ 1 row   │
└─────────────────┴──────────┴────────┴─────────┘
(*) On tablet (768px), buttons change to row layout
```

---

## Trabajo Completado (Resumen)

✅ **Hero Section Upgrade**
- Video con fade-in animation (0 → 0.35 opacity)
- Botones cream-colored (#E1E0CC) + ghost buttons
- Title con line-in animation por línea
- Badge con punto verde pulsante
- Mobile: foto fallback en lugar de video
- Responsive: desktop (row layout) → mobile (column layout)

✅ **About Section**
- Foto the303-netflix-3.png (sin fondo)
- Stats: 150+ Sessões · 30+ Países · 8+ Anos
- Descripción "I don't just take photos. I direct."
- [REMOVIDO]: Firma 28_firma_maikel.png

✅ **Portfolio Grid**
- Grid 3x3 (desktop) → 2 cols (tablet) → 1 col (mobile)
- Aspect ratio 3/4 (portrait)
- Hover effects + watermark
- Filtros por categoría

✅ **Marketing Services Section (NUEVO)**
- 4 servicios con galerías inline
- Responsive grid: auto-fit, minmax(350px, 1fr)
- Corporate Photography, Event Catering, Social Media Design, Flyers
- object-fit: contain para imágenes
- Precios competitivos + CTA buttons

✅ **Services (estándar)**
- 3 cards: Portrait, Editorial, Brand Content
- Featured badge en Editorial
- Responsive 1 → 3 columnas

✅ **Contact Section**
- Espaciado aumentado (gap 24px entre iconos, 20px entre campos)
- Padding más generous con clamp()
- Border-radius mejorado (8px)

✅ **Performance**
- Cache busting con ?v=N parameters
- object-fit: contain para galerías (no crop)
- Imágenes optimizadas (72%+ compresión)
- Lazy loading en imágenes no-hero

---

## Lo que NO Hacer

```
❌ No agregar dependencias npm sin justificar (es HTML vanilla)
❌ No usar React, TailwindCSS, Framer Motion
❌ No modificar API endpoints
❌ No cambiar colores core (cream, naranja, dark)
❌ No agregar animaciones > 600ms
❌ No usar border-radius > 12px en cards
❌ No overwrite !important sin razón
❌ No dejar console.logs en producción
❌ No subir .env o credenciales
```

---

## Git Workflow

```bash
# Antes de trabajar
git status
git pull origin main

# Editar archivos, testear en navegador

# Commit por sección completada (ej: marketing-services, contact-spacing)
git add .
git commit -m "feat: [descripción corta]"
git push origin main
```

---

## Instrucciones para Futuro Trabajo

### Cuando Agregas Secciones Nuevas:
1. Crea CSS modular en `public/css/nueva-seccion.css`
2. Importa en `public/index.html` antes de closing `</head>`
3. Usa variables CSS del sistema de diseño (--accent, --cream, etc.)
4. Responsive mobile-first (375px → 768px → 1024px)
5. Solo animate transform y opacity (GPU-friendly)

### Cuando Modificas Botones:
- Siempre mantener `.btn-primary` cream (#E1E0CC)
- Ghost buttons con border transparente + hover naranja
- Min-height 44px en mobile para accesibilidad
- Transition 260ms cubic-bezier(0.22, 1, 0.36, 1)

### Cuando Agregas Imágenes:
- Lazy load EXCEPTO en hero
- Use `object-fit: cover` para portrait, `contain` para galerías
- Alt text descriptivo
- Comprime antes de subir (máx 300KB portfolio, 150KB backgrounds)

### Cuando Agregas Videos:
- Always: autoplay muted loop playsinline preload="metadata"
- Poster obligatorio
- Opacity máxima 0.35 en hero (no más opaco)
- Mobile: reduce opacity a 0.2 o muestra foto fallback

### Performance Checklist:
- [ ] DevTools Lighthouse → 75+ en todos los tests
- [ ] Mobile (375px): sin overflow horizontal
- [ ] Desktop (1440px): contenedor max-width respetado
- [ ] Videos cargan después de hero content
- [ ] Imágenes lazy load (excepto hero)
- [ ] Sin console errors o warnings

---

## Información del Negocio

```
Fotógrafo:    Maikel Marshall Ruiz
Instagram:    @maik_photographer
WhatsApp:     +1 (786) 332-9815
Email:        maikelmarshall07@gmail.com
Ubicación:    Miami, FL
Web:          maikphotographer.com
```

---

**Última actualización:** Junio 3, 2026
**Última acción:** Spacing fixes en contact section, agregada Marketing Services section
**Estado:** En producción en maikphotographer.com
