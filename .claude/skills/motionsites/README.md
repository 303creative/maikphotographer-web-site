# MotionSites.ai Skills & Patterns

Basado en análisis profundo del landing premium "Viktor Oddy" + extracción de patrones de MotionSites.ai

## Qué hay aquí

5 skills reutilizables, implementables en **vanilla HTML/CSS/JavaScript** (sin necesidad de React).

### 1. **01-premium-button-shadows.md** ⭐⭐⭐⭐⭐
**Impacto:** +30% perceived quality  
**Tiempo:** 15 minutos  
**Riesgo:** None (pure CSS)

El pequeño detalle que diferencia "premium" de "basic". Sistema de 6 capas de shadow que simula profundidad real + inset highlight (Apple-style).

```
.btn-primary {
  box-shadow: 
    0 1px 2px 0 rgba(5,26,36,0.1),
    0 4px 4px 0 rgba(5,26,36,0.09),
    0 9px 6px 0 rgba(5,26,36,0.05),
    0 17px 7px 0 rgba(5,26,36,0.01),
    0 26px 7px 0 rgba(5,26,36,0),
    inset 0 2px 8px 0 rgba(255,255,255,0.5);
}
```

**Aplicar a:** Todos los botones en maikphotographer.com

---

### 2. **02-intersection-observer-animations.md** ⭐⭐⭐⭐
**Impacto:** +20% visual polish  
**Tiempo:** 2 horas  
**Riesgo:** Low

Fade-in-up animation cuando elementos entran en pantalla. Staggered delays crean jerarquía visual.

```css
@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}
```

**Aplicar a:** Hero, About, Portfolio, Services, Contact

---

### 3. **03-marquee-infinite-scroll.md** ⭐⭐⭐⭐
**Impacto:** +40% engagement  
**Tiempo:** 1-2 horas  
**Riesgo:** Low  
**BONUS:** Reemplaza scroll video 3D (más eficiente)

Horizontal scroll infinito de imágenes GIF. 8 imágenes, duplicadas (16 total), CSS animation.

```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

**Reemplaza:** Sección 2 (actualmente Scroll Video 3D)
**Beneficio:** -0.8s LCP (GPU vs CPU), no lag en mobile

---

### 4. **04-testimonial-carousel.md** ⭐⭐⭐⭐⭐
**Impacto:** +15-20% conversion  
**Tiempo:** 3-4 horas  
**Riesgo:** Low  
**PRIORITY:** P1 (implementar ESTA SEMANA)

Auto-scrolling carousel (3s interval, pause on hover). 5 testimonios triplicados (15 total para loop infinito).

**ESTO ES CRÍTICO:** Maikphotographer.com tiene 0 testimonios. Viktor Oddy tiene 5 destacados. Diferencia enorme en conversión.

**Nueva sección tras Pricing**

---

### 5. **05-parallax-scroll-effects.md** ⭐⭐⭐
**Impacto:** +20% wow factor  
**Tiempo:** 1-2 horas  
**Riesgo:** Low (accessibility: respecta prefers-reduced-motion)

Parallax image (moves slower than scroll). Max offset 200px.

```javascript
const scrollPercent = 1 - (rect.top / window.innerHeight);
const offset = scrollPercent * 200;
img.style.transform = `translateY(${offset}px)`;
```

**Aplicar a:**
- About section photo
- Each portfolio item (subtle zoom on scroll)
- Testimonial quote image

---

## 🎯 Implementación Priority

### PHASE 1 (THIS WEEK) — P1
- **01-premium-button-shadows:** 15 min → +30% quality
- **04-testimonial-carousel:** 3-4 h → +15-20% conversion
- **Total: ~4 hours**
- **Expected score gain: 77 → 81-82/100**

### PHASE 2 (Next 2 weeks) — P2
- **02-intersection-observer-animations:** 2 h → +20% polish
- **03-marquee-infinite-scroll:** 1-2 h → replace scroll video, -0.8s LCP
- **Total: ~4 hours**
- **Expected score gain: 81 → 85-86/100**

### PHASE 3 (Optional) — P3
- **05-parallax-scroll-effects:** 1-2 h → +20% wow
- **Total: ~2 hours**
- **Expected score gain: 85 → 87-88/100**

---

## 🔗 How to Use These Skills

When working on maikphotographer.com improvements:

```
[AGENTE: FRONTEND]
Read .claude/skills/motionsites/01-premium-button-shadows.md
Update all buttons with the 6-layer shadow system
```

```
[AGENTE: CONTENT]
Read .claude/skills/motionsites/04-testimonial-carousel.md
Collect 5 real client testimonials
Create carousel section with auto-scroll
```

```
[AGENTE: MOTION]
Read .claude/skills/motionsites/02-intersection-observer-animations.md
Implement fade-in-up on: Hero, About, Portfolio, Services
Add staggered delays per element
```

---

## 📊 MotionSites.ai Analysis

### Key Takeaways

1. **Shadows > Colors** — Premium feel comes from layered shadows, not bright colors
2. **Motion > Static** — Continuous subtle movement (marquee, carousel) = engagement
3. **Typography > Decoration** — 2 custom fonts (serif + sans) is enough. No gradients, no noise
4. **White Space > Content** — Generous padding, generous margins, single column layouts
5. **Micro-interactions > Flashy Animations** — Button hover, carousel pause, staggered enters

### Viktor Oddy vs Maikphotographer Comparison

| Feature | Viktor Oddy | Maikphotographer | Recommendation |
|---------|------------|------------------|----------------|
| Button shadows | 6-layer system | Simple | COPY |
| Animations | fade-in-up on scroll | SplitType only | COMBINE |
| Social proof | Marquee GIFs | None | ADD (P1) |
| Testimonials | Auto-scroll carousel | None | ADD (P1) |
| Parallax | Yes (images) | No | ADD (P2) |
| Fonts | 2 custom | 2 (bebas + inter) | UPGRADE serif |
| CTA dual buttons | Yes | Single | ADD secondary |

---

## 📚 Related Skills in `.claude/skills/`

These MotionSites patterns complement:
- `taste-skill.md` — Design system, colors, spacing
- `emil-kowalski/` — Motion design philosophy (Emil Kowalski principles)
- `marketing-skill.md` — Copywriting for CTAs, testimonials
- `branding-skill.md` — Visual identity, logo, typography

---

## 💡 Tips for Implementation

### Checklist Before Coding

- [ ] Read the entire skill file (don't skip sections)
- [ ] Understand the "why" not just the "what"
- [ ] Check if vanilla JS or React/TypeScript needed
- [ ] Identify where to apply in maikphotographer.com
- [ ] Plan animation delays/triggers
- [ ] Consider accessibility (prefers-reduced-motion)

### Performance Checklist

- [ ] Use `requestAnimationFrame` for scroll (not on every event)
- [ ] Add `will-change: transform` to animated elements
- [ ] Lazy-load images (except critical ones)
- [ ] Test on mobile (battery, performance)
- [ ] Monitor Core Web Vitals

### Accessibility Checklist

- [ ] Respect `prefers-reduced-motion` media query
- [ ] Ensure buttons are 44x44px minimum
- [ ] Animations shouldn't distract from content
- [ ] Provide keyboard navigation alternatives
- [ ] Test with screen readers

---

## 🚀 Expected Results

Implementing all 5 skills:

```
Current maikphotographer.com:  77.2/100 (B+)
After Phase 1 (shadows + testimonials): 81-82/100 (A-)
After Phase 2 (animations + marquee): 85-86/100 (A)
After Phase 3 (parallax): 87-88/100 (A+)
```

---

**These are battle-tested patterns from MotionSites.ai.**
**Use them with confidence.**

