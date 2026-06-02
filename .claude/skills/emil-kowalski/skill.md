# Emil Kowalski Skill — Motion & Animation Principles

## Filosofía Central
Cada animación debe tener propósito. La suavidad no es belleza; la intención es belleza.

**Principio Core:** "Move only what needs to move. Move it only once."

---

## 1. PRINCIPIOS FUNDAMENTALES

### A. Animaciones performantes
- Solo animar `transform` y `opacity`
- NUNCA animar: `width`, `height`, `top`, `left`, `margin`, `padding`
- Esto causa reflow y lagea el navegador

### B. Duraciones
```css
--dur-fast:    150ms   /* Micro-interacciones: button hover, toggles */
--dur-normal:  300ms   /* Transiciones UI: modales, dropdowns */
--dur-slow:    600ms   /* Animaciones de entrada: fade in, slide */
--dur-slower:  1000ms  /* Reveals grandes: parallax, hero animations */
```

**Regla:** Si dura más de 300ms en UI, algo está mal.

### C. Easings
```css
--ease-out:    cubic-bezier(0.16, 1, 0.3, 1)     /* Entradas — rápido inicio */
--ease-in-out: cubic-bezier(0.87, 0, 0.13, 1)    /* Smooth — suave total */
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1) /* Bounce — elástico */
```

**No uses:**
- `ease` (genérico)
- `ease-in` (entrada lenta = extraño)
- `linear` (robotizado)

---

## 2. PATRONES DE ANIMACIÓN APROBADOS

### Button Press
```javascript
// En mousedown
element.style.transform = 'scale(0.97)';
element.style.transition = '100ms ease-out';

// En mouseup
element.style.transform = 'scale(1)';
```

### Hover States
```css
button {
  transition: all 150ms var(--ease-out);
}

button:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}
```

### Fade In (Entrada)
```javascript
gsap.to(element, {
  opacity: 1,
  y: 0,
  duration: 0.6,
  ease: "power2.out"
});
```

### Fade Out (Salida)
```javascript
gsap.to(element, {
  opacity: 0,
  y: 20,
  duration: 0.3,
  ease: "power2.in"
});
```

### Stagger (Animación en cascada)
```javascript
gsap.to('.card', {
  opacity: 1,
  y: 0,
  duration: 0.6,
  stagger: 0.1,  // 100ms entre cada elemento
  ease: "power2.out"
});
```

### Parallax Scroll
```javascript
gsap.to('.bg', {
  y: -100,
  scrollTrigger: {
    trigger: '.section',
    start: 'top center',
    end: 'bottom center',
    scrub: 0.5,
    markers: false
  }
});
```

---

## 3. ANIMACIONES ESPECÍFICAS DE MAIKPHOTOGRAPHER.COM

### 1. Preloader (1.8s fade out)
```javascript
gsap.to('.preloader', {
  opacity: 0,
  pointerEvents: 'none',
  duration: 1.8,
  delay: 0.2,
  ease: "power2.inOut"
});
```

### 2. Hero Title (SplitType letra por letra)
```javascript
const split = new SplitType('.hero h1', { types: 'chars' });
gsap.from(split.chars, {
  opacity: 0,
  y: 20,
  duration: 0.8,
  stagger: 0.05,
  ease: "back.out"
});
```

### 3. Portfolio Reveal (cortina scaleX)
```javascript
gsap.from('.port-item img', {
  scaleX: 0,
  transformOrigin: 'left center',
  duration: 1.2,
  ease: "power4.inOut",
  scrollTrigger: {
    trigger: '.port-item',
    start: 'top 80%'
  }
});
```

### 4. Scroll Video (currentTime sync)
```javascript
gsap.to(videoElement, {
  currentTime: videoElement.duration,
  ease: 'none',
  scrollTrigger: {
    trigger: '.scroll-section',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.5,
    pin: true
  }
});
```

### 5. Magnetic Button (mousemove tracking)
```javascript
element.addEventListener('mousemove', (e) => {
  const rect = element.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  
  gsap.to(element, {
    x: x * 0.3,
    y: y * 0.3,
    duration: 0.3,
    overwrite: 'auto'
  });
});

element.addEventListener('mouseleave', () => {
  gsap.to(element, {
    x: 0,
    y: 0,
    duration: 0.3
  });
});
```

### 6. Badge Pulse (infinite)
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.badge-dot {
  animation: pulse 2s ease-in-out infinite;
}
```

### 7. Nav Hide on Scroll
```javascript
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  
  if (scrollTop > lastScrollTop) {
    // Scrolling down
    gsap.to('nav', {
      y: -80,
      duration: 0.3,
      ease: "power2.out"
    });
  } else {
    // Scrolling up
    gsap.to('nav', {
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});
```

---

## 4. REGLAS DE ORO

### ✅ SÍ
- Animar transform y opacity únicamente
- Duraciones cortas (150-300ms UI, 600-1000ms reveals)
- Easings específicas de Kowalski
- GPU acceleration con will-change
- Respetar prefers-reduced-motion

### ❌ NO
- Animar propiedades de layout
- Animations > 600ms en botones y UI
- Usar ease o ease-in para entradas
- Ignorar performance
- Multiple animaciones simultáneas sin orquestar

---

## 5. PERFORMANCE CHECKLIST

Antes de hacer commit:

- [ ] Animaciones solo en transform/opacity
- [ ] Duraciones < 300ms para UI
- [ ] GPU acceleration (will-change removido después)
- [ ] 60fps en DevTools Performance tab
- [ ] Sin lag en móvil
- [ ] Prefers-reduced-motion respetado

---

## 6. DEBUGGING

```javascript
// Activar modo debug en GSAP
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({ markers: true }); // Muestra triggers

// Revisar performance
window.addEventListener('scroll', () => {
  console.log('FPS:', 1000 / performance.now());
});

// Revisar animación específica
gsap.timeline().to('.element', {
  // ... animación
}).play().timeScale(0.5); // Ralentizar para debug
```

---

**"The best animation is the one the user doesn't notice — until it's missing."** — Emil Kowalski
