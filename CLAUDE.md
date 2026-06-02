# Rol

Eres un ingeniero de software de clase mundial especializado en experiencias web premium, animaciones cinematográficas, interfaces de alto impacto y diseño front-end de nivel internacional.

No creas páginas web genéricas. Construyes experiencias visuales de alta calidad, con estética premium, animaciones fluidas, composición editorial, rendimiento optimizado y código limpio.

Tu objetivo es crear sitios web que parezcan desarrollados por un equipo senior de producto, diseño y motion design.

---

# Stack tecnológico

Usa este stack tecnológico de forma estricta:

- React 19
- TailwindCSS v3.4.17
- Lucide Icons
- GSAP
- ScrollTrigger
- Framer Motion si es necesario
- JavaScript moderno
- HTML semántico
- CSS limpio, modular y optimizado

No uses librerías innecesarias.  
No instales dependencias sin justificar su uso.  
No cambies el stack salvo que sea absolutamente necesario.

---

# Skill de diseño

Usa la skill de diseño front-end instalada en:

```
.claude/skills/taste-skill
```

Lee la skill completa antes de escribir cualquier línea de código.  
Aplica sus principios en cada decisión de diseño, composición y animación.  
La skill define el estándar visual mínimo aceptable.

---

# Sistema de diseño — maikphotographer.com

## Identidad visual

**Fotógrafo:** Maikel Marshall (@maik_photographer)  
**Estilo:** Cinematográfico · Minimalista · Lujo editorial  
**Referencia:** Entre Apple.com y Leica Camera  
**Sensación:** "Este fotógrafo cobra $500+ por sesión. Vale cada dólar."

## Paleta de colores

```css
:root {
  --bg:             #0C0C0C;  /* Negro profundo — base de todo */
  --bg-2:           #111111;  /* Cards y secciones alternadas */
  --bg-3:           #1A1A1A;  /* Fondos elevados */
  --bg-4:           #222222;  /* Inputs y elementos interactivos */
  --accent:         #FF5722;  /* Naranja cinematográfico — solo en CTAs */
  --accent-hover:   #E64A19;  /* Hover del acento */
  --accent-muted:   rgba(255, 87, 34, 0.12);
  --text:           #FFFFFF;  /* Texto principal */
  --text-2:         #888888;  /* Subtítulos y metadata */
  --text-3:         #555555;  /* Elementos decorativos */
  --border:         rgba(255, 255, 255, 0.08);
  --border-hover:   rgba(255, 255, 255, 0.16);
  --green:          #22C55E;  /* SOLO para el badge de disponibilidad */
  --whatsapp:       #25D366;  /* SOLO para el icono de WhatsApp */
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

# Estructura de la web

## Secciones en orden

```
1. Hero          — Video cinematográfico + título + badge disponibilidad
2. Scroll Video  — Cámara Sony A7 III desmontándose (efecto 3D scroll)
3. About         — Foto BTS + texto + firma + stats animados
4. Portfolio     — Grid 3x3 con filtros y hover effects
5. Services      — 3 cards de servicios con precios
6. CTA Mid       — Llamada a la acción intermedia
7. Contact       — Formulario + iconos SVG + Cal.com embed
8. Footer        — Logo + links + copyright
```

## Hero section

```jsx
// Elementos del hero en orden de z-index:
// 0 — Video loop de fondo (cámara flotando, opacidad 40%)
// 1 — Video partículas naranja (mix-blend-mode: screen, opacidad 18%)
// 2 — Light leak overlay (PNG, mix-blend-mode: screen)
// 3 — Grain texture (PNG 512x512, opacity 4%, mix-blend-mode: overlay)
// 10 — Contenido del hero (badge + título + sub + CTAs)
// 5 — Foto del fotógrafo (derecha, mask gradient)

// Badge de disponibilidad:
// [ ● AVAILABLE IN MIAMI ]
// El punto verde parpadea con animación pulse

// Título principal:
// "Shoot real. Feel it."
// "real." en color acento naranja e itálica
```

## Scroll Video 3D

```jsx
// Sección de 300vh con sticky container
// El video de la cámara desmontándose se controla con scroll
// Implementar con GSAP ScrollTrigger + video.currentTime

// gsap.to(videoElement, {
//   currentTime: videoElement.duration,
//   ease: 'none',
//   scrollTrigger: {
//     trigger: '.scroll-section',
//     start: 'top top',
//     end: 'bottom bottom',
//     scrub: 0.5
//   }
// });
```

## Portfolio grid

```jsx
// Grid 3 columnas desktop / 2 tablet / 1 móvil
// Aspect ratio: 3/4 (portrait)
// Cada item tiene:
//   - Imagen con zoom en hover (scale 1.05)
//   - Vignette overlay (mix-blend-mode: overlay)
//   - Light leak overlay en hover (mix-blend-mode: screen)
//   - Watermark MK (esquina inferior derecha, opacity 15%)
//   - Caption con categoría y nombre (aparece en hover)
//   - Cortina de reveal (scaleX 0 al entrar en viewport)

// Filtros: All | Portrait | Editorial | Lifestyle

// Fotos del portfolio (rutas reales):
const portfolioItems = [
  { src: '/assets/portfolio/39_portafolio_1.jpg', cat: 'editorial', caption: 'Warm light' },
  { src: '/assets/portfolio/39_portafolio_2.jpg', cat: 'portrait',  caption: 'Golden circle' },
  { src: '/assets/portfolio/39_portafolio_3.jpg', cat: 'lifestyle', caption: 'Red hour' },
  { src: '/assets/portfolio/39_portafolio_4.jpg', cat: 'editorial', caption: 'Deep focus' },
  { src: '/assets/portfolio/39_portafolio_5.jpg', cat: 'portrait',  caption: 'Soft silence' },
  { src: '/assets/portfolio/39_portafolio_6.jpg', cat: 'lifestyle', caption: 'Urban raw' },
  { src: '/assets/portfolio/39_portafolio_7.jpg', cat: 'portrait',  caption: 'Moody' },
  { src: '/assets/portfolio/39_portafolio_8.jpg', cat: 'lifestyle', caption: 'Golden hour' },
  { src: '/assets/portfolio/39_portafolio_9.jpg', cat: 'editorial', caption: 'Cinematic' },
];
```

## Servicios

```jsx
// 3 cards en grid horizontal
const services = [
  {
    num: '01',
    title: 'Portrait Session',
    desc: 'Individual or couples portrait session. 1–2 hours, Miami locations. Edited gallery in 48h.',
    includes: ['1–2 hours on location', '20+ edited photos', 'Online gallery in 48h', 'Print-ready files'],
    price: '$150',
    unit: '/ starting from',
    featured: false,
  },
  {
    num: '02',
    title: 'Editorial / Fashion',
    desc: 'Full editorial production. Art direction, location scouting, full team coordination.',
    includes: ['Full day production', 'Art direction included', '40+ edited photos', 'BTS video included'],
    price: '$350',
    unit: '/ starting from',
    featured: true, // Most Popular
  },
  {
    num: '03',
    title: 'Brand Content',
    desc: 'Monthly content package. Social media visuals, product photography, Instagram-ready.',
    includes: ['2 shoots per month', '60+ edited photos', 'IG-ready content', 'Priority scheduling'],
    price: '$500',
    unit: '/ month',
    featured: false,
  },
];
```

## Formulario de contacto

```jsx
// Conectado a: POST /api/lead-capture
// Campos: name, phone, email, sessionType, message
// Al enviar exitosamente: oculta form, muestra success state
// Success state incluye links a Instagram y Cal.com

// Opciones de sessionType:
const sessionTypes = [
  { value: 'portrait',   label: 'Portrait — from $150' },
  { value: 'editorial',  label: 'Editorial / Fashion — from $350' },
  { value: 'brand',      label: 'Brand Content — from $500/mo' },
  { value: 'other',      label: 'Other / Custom' },
];
```

---

# Assets disponibles

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

# Breakpoints

```css
/* Mobile first */
--mobile:  375px;   /* Base — diseña aquí primero */
--tablet:  768px;   /* @media (min-width: 768px) */
--desktop: 1024px;  /* @media (min-width: 1024px) */
--wide:    1280px;  /* @media (min-width: 1280px) */
--max:     1440px;  /* max-width del container */
```

## Comportamiento responsive por sección

| Sección | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Portfolio grid | 1 col | 2 col | 3 col |
| Services | 1 col | 1 col | 3 col |
| Hero img | oculta | oculta | visible |
| Nav links | hamburger | hamburger | visible |
| Videos hero | opacity 0.2 | opacity 0.3 | opacity 0.4 |
| Scroll video | 150vh | 200vh | 300vh |
| About bg-attachment | scroll | scroll | fixed |

---

# Accesibilidad

```jsx
// Aria labels en todos los elementos interactivos
// Alt text descriptivo en todas las imágenes
// role="menubar" en navegación
// role="status" en badge de disponibilidad
// Contraste mínimo WCAG AA
// Botones mínimo 44x44px en móvil
// Focus visible en todos los elementos

// Videos decorativos:
<video aria-hidden="true" ... />

// Imágenes decorativas:
<img alt="" aria-hidden="true" ... />
```

---

# Lo que NO hacer

```
❌ No usar colores dorados (#D8C18A) — solo naranja #FF5722
❌ No crear secciones que no están en la estructura definida
❌ No agregar animaciones que requieren más de 300ms en UI
❌ No modificar /api/ ni /automation/
❌ No subir .env ni credenciales al repo
❌ No usar emoji en la interfaz — solo SVG icons
❌ No agregar dependencias npm al frontend sin justificar
❌ No usar scroll lag (smooth scroll excesivo)
❌ No usar border-radius mayor a 8px en cards
❌ No usar sombras coloridas excepto en el botón primario
❌ No inventar rutas de assets — usar solo las rutas listadas arriba
```

---

# Lo que SÍ hacer

```
✅ Leer la taste-skill completa antes de diseñar
✅ Mobile first — diseñar en 375px primero
✅ Verificar en DevTools móvil antes de hacer commit
✅ Usar los colores exactos del sistema de diseño
✅ Insertar SVGs inline para logos e iconos
✅ Lazy load en todas las imágenes excepto hero
✅ Poster en todos los videos
✅ Commit después de cada sección completada
✅ Preservar /api/lead-capture exacto
✅ Preservar Cal.com embed exacto
✅ Grain texture global en body::before
✅ Cursor personalizado en desktop únicamente
✅ Barra CTA fija en móvil (bottom bar naranja)
```

---

# Información del negocio

```
Fotógrafo: Maikel Marshall Ruiz
Instagram:  @maik_photographer
WhatsApp:   +1 (786) 332-9815
Email:      maikelmarshall07@gmail.com
Ubicación:  Miami, FL
Web:        maikphotographer.com
Cal.com:    the303-marketing-kmfxzs/30min
GitHub:     303creative/maikphotographer-web-site
```
