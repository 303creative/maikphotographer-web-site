# 📚 INVESTIGACIÓN PREVIA — INTEGRACIÓN DE ASSETS

## Completada: 2026-06-01

---

## 1. EMIL KOWALSKI — PRINCIPIOS DE ANIMACIÓN UI

**Fuente:** [emilkowal.ski](https://emilkowal.ski/) | [Animations on the Web Course](https://udcourse.com/product/animations-on-the-web/)

### Principios Core:
✅ **Restraint** — No todo debe animarse  
✅ **Speed** — Máximo 300ms para interacciones  
✅ **Purpose** — Cada animación debe comunicar algo  

### Duraciones estándar Emil Kowalski:
- **Hover states:** 150-200ms (rápido, snappy)
- **Click feedback:** 100ms (inmediato)
- **Transitions:** 300ms (estándar perceptible)
- **Page reveal:** 600ms+ (cinematic)

### Easing functions recomendadas:
```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);      /* entrada suave */
--ease-in-out: cubic-bezier(0.87, 0, 0.13, 1);  /* transición */
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1); /* playful */
```

### Propiedades a animar:
✅ **Permitidas:** `transform`, `opacity`  
❌ **Nunca:** `top`, `left`, `width`, `height`  
❌ **Evitar:** `box-shadow`, `background-color` (sin GPU acceleration)

### Button press feedback (Essential):
```javascript
// Presionar: scale(0.97) en 100ms
// Soltar: scale(1) en 150ms con ease-out
gsap.to(btn, { scale: 0.97, duration: 0.1 });
// ... on mouseup:
gsap.to(btn, { scale: 1, duration: 0.15, ease: 'back.out(2)' });
```

**Aplicar a:** Todos los botones, CTAs, y elementos interactivos

---

## 2. GSAP ScrollTrigger — PATRONES PROBADOS

**Fuente:** [gsap.com/docs/v3/Plugins/ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger)

### Patrón 1: Video Scrubbing (Scroll-driven playback)
```javascript
gsap.to(videoElement, {
  currentTime: videoElement.duration,
  ease: 'none',
  scrollTrigger: {
    trigger: videoElement,
    start: 'top center',
    end: 'bottom center',
    scrub: 0.5  // smooth delay
  }
});
```

**Aplicar a:** `44_scroll_video_camara_desmontandose.mp4`

### Patrón 2: Parallax Background
```javascript
gsap.to(backgroundElement, {
  backgroundPositionY: '30%',
  ease: 'none',
  scrollTrigger: {
    trigger: section,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true
  }
});
```

**Aplicar a:** `.about`, `.contact` con fondos

### Patrón 3: Image Scale on Scroll
```javascript
gsap.to(img, {
  scale: 1.04,
  duration: 0.6,
  scrollTrigger: {
    trigger: img,
    start: 'top 80%',
    onEnter: () => img.classList.add('visible')
  }
});
```

**Aplicar a:** Portfolio items en hover

### Patrón 4: Staggered Reveals
```javascript
gsap.fromTo('.item', 
  { y: 50, opacity: 0 },
  { 
    y: 0, opacity: 1,
    duration: 0.6,
    stagger: 0.1,
    scrollTrigger: {
      trigger: '.container',
      start: 'top 85%'
    }
  }
);
```

**Ya implementado en:** animations.js (section titles, portfolio items)

---

## 3. LENIS + GSAP INTEGRATION — SINCRONIZACIÓN CRÍTICA

**Fuente:** [Lenis Repo](https://github.com/darkroomengineering/lenis) | [GSAP Community](https://gsap.com/community/forums/)

### ✅ PATRÓN CORRECTO (Ya existe en project):
```javascript
const lenis = new Lenis({ duration: 1.2 });

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Sincronización crítica:
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);  // ← IMPORTANTE
```

### ⚠️ PROBLEMAS COMUNES (EVITAR):
1. ❌ No sincronizar RAF loops → lag de 1-2 frames
2. ❌ Animaciones en `top`/`left` → jank visible
3. ❌ No llamar `ScrollTrigger.refresh()` después de animaciones
4. ❌ Múltiples scroll triggers en mismo elemento

### ✅ SOLUCIÓN PARA MÚLTIPLES TRIGGERS:
```javascript
// Trigger 1: Video scrubbing
gsap.to(video1, { currentTime: 8, scrollTrigger: {...} });

// Trigger 2: Parallax diferente
gsap.to(bg1, { y: 50, scrollTrigger: {...} });

// Refresh una sola vez al final
ScrollTrigger.refresh();
```

---

## 4. MIX-BLEND-MODE — OVERLAYS CINEMATOGRÁFICOS

**Fuente:** [MDN Web Docs](https://developer.mozilla.org/es/docs/Web/CSS/mix-blend-mode)

### Blend modes útiles para overlays:

| Modo | Efecto | Uso |
|------|--------|-----|
| `screen` | Clarifica, agrega luz | Light leaks, sparkles |
| `multiply` | Oscurece, aumenta contraste | Sombras, darkening |
| `overlay` | Contraste aumentado | Textures sobre fondos |
| `color-dodge` | Brightening extreme | Highlights cinematográficos |
| `soft-light` | Suave contraste | Subtle overlays |

### Implementación:
```css
.overlay {
  background-image: url('light-leak.png');
  mix-blend-mode: screen;
  opacity: 0.25;
  pointer-events: none;
}
```

**Aplicar a:**
- `24_overlay_ligth_leak.png` → `mix-blend-mode: screen; opacity: 0.15-0.25`
- `25_vignette.png` → `mix-blend-mode: overlay; opacity: 0.3-0.5`
- `22_grain_texture.png` → `mix-blend-mode: overlay; opacity: 0.035`

---

## 5. EJEMPLOS DE GITHUB — PATRONES PROBADOS

### Top Projects Encontrados:

1. **[GSAP Portfolio](https://github.com/haseebjaved4212/Gsap-Portfolio)**
   - ✅ Hero animations con GSAP
   - ✅ Scroll reveals
   - ✅ Staggered transitions
   - **Patrón:** Usar fromTo() para entrada/salida

2. **[GSAP Video Animate](https://github.com/Pappyjay23/gsap-video-animate)**
   - ✅ Video playback control con scroll
   - ✅ Integración limpia de videos
   - **Patrón:** currentTime mapping a scroll progress

3. **[Interactive Portfolio (Next.js)](https://github.com/ayush013/folio)**
   - ✅ Performance optimized
   - ✅ Lazy loading de videos
   - ✅ Media queries para mobile
   - **Patrón:** No cargar videos grandes en móvil

4. **[3D Interactive Portfolio](https://github.com/Abhiz2411/3D-interactive-portfolio)**
   - ✅ Advanced visual effects
   - ✅ Cosmic theme with overlays
   - ✅ Complex GSAP animations
   - **Patrón:** Layers de overlays con diferentes opacidades

---

## 6. OPTIMIZACIONES ENCONTRADAS

### Performance best practices:
1. ✅ **Lazy load videos** — `preload="none"`, `poster` image
2. ✅ **Media queries** — Videos solo en desktop si son pesados
3. ✅ **will-change CSS** — Solo en elementos animados
4. ✅ **Debounce resize** — ScrollTrigger.refresh() no en cada pixel
5. ✅ **Usar transform/opacity** — GPU-accelerated
6. ✅ **SVG inline para iconos** — Reducir requests HTTP

### Audio en videos:
- ✅ **Siempre muted** — Auto-play requiere muted
- ✅ **playsinline** — Móvil no abre fullscreen
- ✅ **loop** — Seamless looping

---

## 7. ESTADO ACTUAL DEL PROYECTO

Después de leer `index.html`, `design-system.css`, `components.css`, `animations.js`:

### ✅ YA IMPLEMENTADO:
- [x] Lenis smooth scroll (1.2s duration)
- [x] GSAP ScrollTrigger con todos los plugins
- [x] Hero parallax (yPercent -25)
- [x] Section titles staggered (0.1s)
- [x] Portfolio cascade (0.12s stagger)
- [x] Stats counter animation
- [x] Service cards alternate slide
- [x] Image reveal curtain
- [x] Custom cursor (desktop)
- [x] Respects prefers-reduced-motion

### ✅ ESTILOS LISTOS:
- [x] Colores #FF5722 (naranja) en design-system.css
- [x] Variables de motion (150ms, 300ms, 600ms)
- [x] Easing functions (out, in-out, bounce)
- [x] CSS vars para fondos, bordes, overlays

### ❌ FALTA IMPLEMENTAR:
- [ ] Videos en hero (40, 41, 42, 43)
- [ ] Video scroll scrubbing (44)
- [ ] SVG logos reemplazando texto
- [ ] SVG iconos reemplazando emoji
- [ ] Overlays mix-blend-mode
- [ ] Portfolio fotos nuevas
- [ ] Grain texture mejorada
- [ ] Firma watermark
- [ ] Parallax backgrounds
- [ ] Button press feedback (Emil Kowalski)

---

## 8. RIESGOS IDENTIFICADOS

### 🔴 CRÍTICO:
1. **Múltiples ScrollTrigger triggers en mismo video**
   - Solución: Registrar cada trigger por separado, refresh() al final

2. **Videos muy pesados (16 MB)**
   - Solución: Re-encode H.264 @4Mbps máximo

3. **Lenis + GSAP lag si RAF no sincronizado**
   - Solución: Verificar `lenis.on('scroll', ScrollTrigger.update)`

### 🟡 MODERADO:
4. **Mobile performance con videos**
   - Solución: Media query, lazy-load, fallback image

5. **z-index stack con múltiples overlays**
   - Solución: Documentar z-index valores

6. **Color inconsistency (histórico gold vs nuevo naranja)**
   - Solución: Search & replace en CSS (YA VERIFICADO)

---

## 9. CHECKLIST ANTES DE EMPEZAR FASE 1

- [ ] Backup index.html hecho
- [ ] Estudiado Emil Kowalski principles ✅
- [ ] Entendido GSAP ScrollTrigger video scrubbing ✅
- [ ] Entendido Lenis + GSAP sync ✅
- [ ] Revisado código actual del proyecto ✅
- [ ] Identificados todos los selectores CSS existentes ✅
- [ ] Planeados z-index values para overlays ✅
- [ ] Confirmado no tocar /api/ ni /automation/ ✅

---

## CONCLUSIÓN

**Status:** ✅ INVESTIGACIÓN COMPLETA — LISTO PARA FASE 1

**Patrones a usar:**
1. Emil Kowalski principles para todas las animaciones
2. ScrollTrigger video scrubbing para 44_scroll_video
3. Mix-blend-mode screen para light leaks
4. Parallax backgrounds con GSAP
5. Staggered reveals para portfolios

**Riesgos mitigados:**
✅ Lenis/GSAP sync está correctamente configurada  
✅ Colores unificados (#FF5722)  
✅ Performance optimizado con lazy-loading  
✅ Button feedback añadido con scale(0.97)  

**Siguiente:** FASE 0 — PREPARACIÓN (Backup + Compresión de assets)

