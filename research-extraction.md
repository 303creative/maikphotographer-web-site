# HALLAZGOS DE INVESTIGACIÓN
## maikphotographer.com — Mejoras Premium

### Emil Kowalski (UI Engineering Master)
**Fuente:** emilkowalski.com + repos Vaul, Sonner

**Principios Extraídos:**
- Easings: cubic-bezier(0.16, 1, 0.3, 1) para entrada
- Easings: cubic-bezier(0.87, 0, 0.13, 1) para salida  
- Duración máxima: 300ms para micro-interacciones
- Spring: cubic-bezier(0.34, 1.56, 0.64, 1)
- Scale feedback: 0.97 en click
- Transform-origin critical para rotaciones

**Aplicable:** Button press, text reveals, transiciones

### GSAP Showcase Patterns
**Fuente:** codepen.io/GreenSock + gsap.com/showcase

**Patrones Premium Encontrados:**
1. Image reveal curtain — scaleX: 0 desde left
2. Hero parallax — múltiples capas con diferentes velocidades
3. Scroll video scrubbing — currentTime mapping
4. Text reveal letter by letter — Split Type + stagger
5. Portfolio cascade — fromTo con stagger 0.1-0.15

**Aplicable:** Todas las secciones

### Lenis + GSAP Integration
**Fuente:** lenis.darkroom.engineering

**Config Óptima para Dark Portfolio:**
```
const lenis = new Lenis({
  duration: 1.2,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10*t)),
  smooth: true,
  smoothTouch: false,
  wheelMultiplier: 1
});
gsap.ticker.add(time => lenis.raf(time * 1000));
lenis.on('scroll', ScrollTrigger.update);
```

### Repos Awwwards 100+ Stars
**Encontrados:**
1. Creative agencies — horizontal scroll, parallax multi-layer
2. Photography portfolios — image reveal curtain, badge animado
3. Cinematic portfolios — preloader + hero timing, magnetic buttons

**Técnicas Únicas:**
- Horizontal scroll section con pin
- Image reveal con transform-origin
- Preloader con logo animation + bar fill
- Nav hide/show on scroll
- Stats counter con onUpdate

### CSS Cinematográfico
**Easings Premium:**
- power2.out: 0.25, 0.46, 0.45, 0.94
- power3.out: 0.16, 1, 0.3, 1
- power4.out: 0.19, 1, 0.22, 1
- Elastic out: cubic-bezier(1, 0.5, 0.3, 1)

**Técnicas Blend:**
- mix-blend-mode: screen para light leaks
- mix-blend-mode: overlay para grain
- mix-blend-mode: multiply para vignette
- backdrop-filter: blur(20px) para nav

### Plan de Implementación (Mayor a Menor Impacto)
1. ✅ Easing perfecto Emil Kowalski (100% código)
2. ✅ Image reveal curtain (HTML mínimo + GSAP)
3. ✅ Hero title SplitType premium (JS puro)
4. ✅ Parallax multi-layer (GSAP ScrollTrigger)
5. ✅ Horizontal scroll section (GSAP pin)
6. ✅ Magnetic buttons (addEventListener + GSAP)
7. ✅ Stats counter premium (GSAP fromTo)
8. ✅ Nav scroll behavior (scroll listener + GSAP)
9. ✅ Preloader cinematográfico (CSS + JS timing)
10. ✅ Hero entrance animation (GSAP timeline)

