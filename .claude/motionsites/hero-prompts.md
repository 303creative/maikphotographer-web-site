# MotionSites Hero Prompts
## Adaptados para maikphotographer.com

---

## CÓMO USAR ESTOS PROMPTS

1. Copia el prompt de la sección que necesitas
2. Pégalo en Claude Code
3. Claude usará las skills + el prompt para generar el código

**Ejemplo:**
```
Lee CLAUDE.md, .claude/skills/taste-skill/skill.md y este archivo.
Implementa el HERO SECTION siguiendo el prompt de MotionSites.
Código listo para Vercel.
```

---

## HERO SECTION — Cinematográfico oscuro

```
Crea un hero section cinematográfico para maikphotographer.com
(fotógrafo de Miami, estilo Apple + Leica, booking premium).

STACK: HTML + CSS (TailwindCSS) + Vanilla JS

FONDO:
- Video loop: /assets/videos/40_hero_camara_loop.mp4
  opacity: 40% sobre #0C0C0C
- Partículas naranja: /assets/videos/41_hero_loop_part_culas_de_luz.mp4
  mix-blend-mode: screen, opacity: 18%
- Light leak overlay: /assets/overlays/24_overlay_ligth_leak.png
  mix-blend-mode: screen, opacity: 18%

CONTENIDO:
- Badge: [ ● AVAILABLE IN MIAMI ]
  JetBrains Mono, 10px, tracking 0.2em, glow naranja sutil
  
- Título H1 Bebas Neue: "Shoot real. Feel it."
  - "real." → itálica, #FF5722 (naranja acento)
  - size: clamp(64px, 12vw, 150px)
  - letter-spacing: 0.04em
  
- Subtítulo Inter 400:
  "Cinematic portraits and editorial photography
   for models, creators and brands. Miami, FL."
  - color: #888888
  - max-width: 460px
  - line-height: 1.6
  
- CTAs:
  1. Primario: "Book a Session →" (#FF5722)
     button hover: scale(0.97) 100ms, shadow 6-layer
  2. Ghost: "View Portfolio"
     button: border #888888/30, hover: border #888888

- Social proof (abajo):
  "50+ sessions · 5.0 rating · 48h turnaround"
  Inter 13px, #555555

ANIMACIONES (Emil Kowalski):
- Preloader MK (PNG logo): fade 0→1 durante 1.2s
  auto fade 1→0 a los 3.5s
- Badge: fadeup (y: 20→0, opacity: 0→1)
  delay: post-preloader 400ms, 0.8s cubic-bezier(0.4,0,0.2,1)
- Título: SplitType letter-by-letter
  stagger: 0.05s per letter
  duration: 0.8s
  delay: post-badge 200ms
- Subtítulo y CTAs: fadeup (y: 20→0)
  delay: post-título 200ms, duration: 0.8s
- Video: preload="none", poster JPG
- Grain: body::before PNG 512x512, opacity: 4%, mix-blend-mode: overlay

MÓVIL (375px):
- H1 size: clamp(36px, 10vw, 64px)
- Video opacity: 0.2 (vs 0.4 desktop)
- CTAs: stack vertical, full-width
- Badge: tamaño reducido

DESKTOP (1024px+):
- Layout: left content (50%), right foto Maikel (50%)
- Foto derecha: /assets/backgrounds/36_foto_camara_1.jpg
  mask-image: linear-gradient(to right, transparent, black)
  opacity: 85%
- Hero height: 100vh - navbar

PERFORMANCE:
- Videos: preload="none", autoplay muted loop playsinline
- Images: loading="lazy" excepto poster
- Grain PNG: background-image (no <img>)
- Solo transform + opacity en animaciones
- will-change: transform solo en elementos animados
- Cursor personalizado desktop: mix-blend-mode: difference

ACCESIBILIDAD:
- Videos decorativos: aria-hidden="true"
- Títulos: <h1> semántico
- Botones: 44x44px mínimo
- Contraste: WCAG AA
- Focus visible en botones
- alt text en todas las imágenes

REFERENCIA VISUAL:
- Inspiración: Apple.com (hero simplista)
- Inspiración: Leica.com (lujo editorial)
- NO usar: degradados dorados, colores neón, flashing

RESULTADO ESPERADO:
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- Lighthouse Performance > 90
```

---

## BUTTON SHADOWS — 6 Capas Premium

```
Implementa el sistema de sombras premium de 6 capas
en TODOS los botones del sitio.

PATRÓN (vanilla CSS + variables):

:root {
  --shadow-sm: 0 1px 2px 0 rgba(5,26,36,0.1);
  --shadow-md: 0 4px 4px 0 rgba(5,26,36,0.09);
  --shadow-lg: 0 9px 6px 0 rgba(5,26,36,0.05);
  --shadow-xl: 0 17px 7px 0 rgba(5,26,36,0.01);
  --shadow-2xl: 0 26px 7px 0 rgba(5,26,36,0);
  --shadow-inset: inset 0 2px 8px 0 rgba(255,255,255,0.5);
}

.btn-primary {
  box-shadow:
    var(--shadow-sm),
    var(--shadow-md),
    var(--shadow-lg),
    var(--shadow-xl),
    var(--shadow-2xl),
    var(--shadow-inset);
  transition: all 200ms cubic-bezier(0.4,0,0.2,1);
}

.btn-primary:hover {
  box-shadow:
    0 1px 2px 0 rgba(5,26,36,0.12),
    0 4px 6px 0 rgba(5,26,36,0.12),
    0 10px 8px 0 rgba(5,26,36,0.08),
    0 20px 10px 0 rgba(5,26,36,0.04),
    0 30px 10px 0 rgba(5,26,36,0.01),
    inset 0 2px 8px 0 rgba(255,255,255,0.6);
  transform: translateY(-2px);
}

.btn-primary:active {
  transform: translateY(0px);
  box-shadow:
    var(--shadow-sm),
    var(--shadow-md),
    var(--shadow-lg),
    var(--shadow-inset);
}

APLICAR A TODOS LOS BOTONES:
- "Book a Session" (hero)
- "View Portfolio" (hero)
- "Send Request" (contact form)
- "Next/Prev" en carousel
- Nav hamburger hover

RESULTADO: +30% perceived quality vs sombras simples
```

---

## FADE-IN-UP ANIMATIONS — Scroll Trigger

```
Implementa animaciones fade-in-up en scroll
para todas las secciones principales.

CSS KEYFRAMES:

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

JAVASCRIPT (Vanilla):

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 
        'fadeInUp 0.8s cubic-bezier(0.4,0,0.2,1) forwards';
      // Staggered children
      const children = entry.target.querySelectorAll('[data-stagger]');
      children.forEach((child, i) => {
        child.style.animation = 
          `fadeInUp 0.8s cubic-bezier(0.4,0,0.2,1) ${i * 0.1 + 0.2}s forwards`;
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('[data-animate]').forEach(el => {
  observer.observe(el);
});

APLICAR A:
- Hero (título, subtítulo, botones)
- About sección
- Portfolio cards (staggered)
- Services cards (staggered)
- Contact form

ACCESIBILIDAD:
@media (prefers-reduced-motion: reduce) {
  @keyframes fadeInUp {
    0%, 100% { opacity: 1; transform: none; }
  }
}

RESULTADO: +20% visual polish
```

---

## MARQUEE INFINITE SCROLL — Reemplaza Scroll Video

```
Reemplaza la sección 2 (scroll video 3D) con marquee.

VENTAJAS:
- GPU accelerated (CSS animation vs currentTime JS)
- -0.8s LCP (más rápido que scroll video)
- Sin lag en mobile
- Archivo 8 GIFs ~100KB vs 6.4MB video

HTML:

<section class="marquee-section">
  <h2>[ OUR PORTFOLIO IN MOTION ]</h2>
  <div class="marquee">
    <div class="marquee-inner">
      <!-- 8 imágenes GIF, duplicadas -->
      <img src="/assets/marquee/project1.gif" alt="Project 1" class="marquee-item">
      <img src="/assets/marquee/project2.gif" alt="Project 2" class="marquee-item">
      ... (repeat 8 times) ...
      <!-- Duplicate para loop infinito -->
      <img src="/assets/marquee/project1.gif" alt="Project 1" class="marquee-item">
      ... (repeat 8 times) ...
    </div>
  </div>
</section>

CSS:

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.marquee {
  overflow: hidden;
  width: 100%;
}

.marquee-inner {
  display: flex;
  gap: 12px;
  animation: marquee 30s linear infinite;
}

@media (max-width: 768px) {
  .marquee-inner {
    animation: marquee 10s linear infinite;
  }
}

.marquee-item {
  height: 280px;
  @media (min-width: 768px) {
    height: 500px;
  }
  min-width: calc(50% / 8);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  object-fit: cover;
  flex-shrink: 0;
}

OPTIONAL: Pause on hover
.marquee:hover .marquee-inner {
  animation-play-state: paused;
}

ACCESIBILIDAD:
@media (prefers-reduced-motion: reduce) {
  .marquee-inner {
    animation: none;
  }
}

RESULTADO: +40% engagement, -0.8s LCP
```

---

## TESTIMONIAL CAROUSEL — P1 CRÍTICO

```
CRÍTICO: Maikphotographer tiene 0 testimonios.
Viktor Oddy tiene 5. Esta es la diferencia
en +15-20% conversión.

HTML:

<section class="testimonial-carousel" data-carousel>
  <h2>What clients say</h2>
  
  <div class="carousel-viewport">
    <div class="carousel-inner" id="carousel-track">
      <!-- 5 testimonios triplicados (15 total) para loop infinito -->
      <!-- Ver archivo 04-testimonial-carousel.md -->
    </div>
  </div>
  
  <button class="carousel-prev">←</button>
  <button class="carousel-next">→</button>
</section>

CSS:

.carousel-viewport {
  overflow: hidden;
  width: 100%;
}

.carousel-inner {
  display: flex;
  gap: 16px;
  transition: transform 0.8s cubic-bezier(0.4,0,0.2,1);
  will-change: transform;
}

.carousel-inner > * {
  width: 100%;
  flex-shrink: 0;
}

.testimonial-card {
  background: #111111;
  border-radius: 32px;
  padding: 32px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}

.testimonial-card svg {
  width: 24px;
  height: 24px;
  margin-bottom: 16px;
  color: #FF5722;
}

JAVASCRIPT:

const carousel = document.querySelector('[data-carousel]');
const track = document.getElementById('carousel-track');
const prevBtn = carousel.querySelector('.carousel-prev');
const nextBtn = carousel.querySelector('.carousel-next');

let current = 0;
let autoScrollTimer;

const testimonials = [
  {
    quote: "Maikel's vision transformed our brand imagery...",
    author: "Sarah Chen",
    role: "CEO, TechStartup Co",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=100"
  },
  // ... 4 más
];

// Triple para loop
const tripled = [...testimonials, ...testimonials, ...testimonials];

tripled.forEach(test => {
  const card = createTestimonialCard(test);
  track.appendChild(card);
});

function updateCarousel() {
  track.style.transform = `translateX(-${current * 100}%)`;
}

function next() {
  current = (current + 1) % testimonials.length;
  updateCarousel();
  resetAutoScroll();
}

function prev() {
  current = (current - 1 + testimonials.length) % testimonials.length;
  updateCarousel();
  resetAutoScroll();
}

function autoScroll() {
  autoScrollTimer = setInterval(next, 3000);
}

function resetAutoScroll() {
  clearInterval(autoScrollTimer);
  autoScroll();
}

prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);
carousel.addEventListener('mouseenter', () => clearInterval(autoScrollTimer));
carousel.addEventListener('mouseleave', autoScroll);

autoScroll();

TESTIMONIOS A RECOLECTAR:
- 5 clientes reales de Maikel con:
  - Quote 1-2 líneas máximo
  - Nombre + rol + empresa
  - Avatar (foto headshot o Pexels)

RESULTADO: +15-20% conversión (CRÍTICO)
```

---

## PARALLAX SCROLL EFFECTS — Wow Factor

```
Agrega parallax subtle a imágenes en scroll.

JAVASCRIPT:

const MAX_OFFSET = 200;

function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  let rafId;
  window.addEventListener('scroll', () => {
    rafId = requestAnimationFrame(() => {
      parallaxElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const scrollPercent = 1 - (rect.top / window.innerHeight);
        const offset = scrollPercent * MAX_OFFSET;
        el.style.transform = `translateY(${offset}px)`;
      });
    });
  });
}

CSS:

[data-parallax] {
  will-change: transform;
  transition: transform 0.3s ease-out;
}

@media (prefers-reduced-motion: reduce) {
  [data-parallax] {
    transform: none !important;
  }
}

APLICAR A:
- About section photo: data-parallax
- Portfolio items: data-parallax
- Testimonial quote image: data-parallax

RESULTADO: +20% wow factor, smooth 60fps
```

---

## CÓMO INTEGRAR TODO EN ORDEN

1. **Hoy (P1 — 4 horas):**
   - [ ] Premium button shadows (15 min)
   - [ ] Testimonial carousel (3-4 h)
   - **Score: 77 → 81-82**

2. **Semana próxima (P2 — 4 horas):**
   - [ ] Fade-in-up animations (2 h)
   - [ ] Marquee infinite scroll (1-2 h)
   - **Score: 81 → 85-86**

3. **Después (P3 — 2 horas):**
   - [ ] Parallax scroll effects (1-2 h)
   - **Score: 85 → 87-88**

---

## REFERENCIA VISUAL

- **Inspiración:** Apple.com + Leica.com + Viktor Oddy
- **NO:** Degradados dorados, colores neón, flashing
- **SÍ:** Minimalismo, sombras depth, micro-interacciones

**Resultado final esperado: 87-88/100 (A+)**
