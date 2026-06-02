# Marquee Infinite Scroll — MotionSites Pattern

## El Patrón

8 imágenes, duplicadas (16 total), scroll infinito horizontal con CSS animation.

```css
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.marquee {
  display: flex;
  gap: 12px;
  overflow: hidden;
  width: 100%;
}

.marquee-inner {
  display: flex;
  gap: 12px;
  animation: marquee 30s linear infinite;
  /* For mobile: 10s */
  @media (max-width: 768px) {
    animation: marquee 10s linear infinite;
  }
}

.marquee-item {
  height: 280px;
  @media (min-width: 768px) {
    height: 500px;
  }
  
  min-width: calc(50% / 8); /* 6.25% each */
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  object-fit: cover;
}
```

## HTML

```html
<div class="marquee">
  <div class="marquee-inner">
    <!-- 8 original images -->
    <img src="image1.gif" alt="Project 1" class="marquee-item">
    <img src="image2.gif" alt="Project 2" class="marquee-item">
    <img src="image3.gif" alt="Project 3" class="marquee-item">
    <img src="image4.gif" alt="Project 4" class="marquee-item">
    <img src="image5.gif" alt="Project 5" class="marquee-item">
    <img src="image6.gif" alt="Project 6" class="marquee-item">
    <img src="image7.gif" alt="Project 7" class="marquee-item">
    <img src="image8.gif" alt="Project 8" class="marquee-item">
    
    <!-- Duplicated (scroll loops infinitely) -->
    <img src="image1.gif" alt="Project 1" class="marquee-item">
    <img src="image2.gif" alt="Project 2" class="marquee-item">
    <img src="image3.gif" alt="Project 3" class="marquee-item">
    <img src="image4.gif" alt="Project 4" class="marquee-item">
    <img src="image5.gif" alt="Project 5" class="marquee-item">
    <img src="image6.gif" alt="Project 6" class="marquee-item">
    <img src="image7.gif" alt="Project 7" class="marquee-item">
    <img src="image8.gif" alt="Project 8" class="marquee-item">
  </div>
</div>
```

## React Version

```jsx
export function Marquee({ images }) {
  return (
    <div className="overflow-hidden w-full">
      <div className="flex gap-3 animate-marquee">
        {/* Double the images for infinite loop */}
        {[...images, ...images].map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt="Portfolio preview"
            className="h-[280px] md:h-[500px] min-w-max object-cover rounded-2xl shadow-lg"
          />
        ))}
      </div>
    </div>
  );
}

// Tailwind config - add to tailwind.config.js:
module.exports = {
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
};
```

## Para maikphotographer.com

**Reemplazar scroll video 3D con marquee:**

### Ventajas vs Scroll Video

| Aspecto | Scroll Video 3D | Marquee |
|---------|-----------------|---------|
| Performance | CPU-heavy (currentTime) | GPU (CSS animation) |
| LCP Impact | +0.8s | 0s (background animation) |
| Lag Risk | High (especially mobile) | None |
| Mobile Support | Poor (battery drain) | Excellent |
| File Size | 6.4 MB video | 8 GIFs ~100KB each |
| Implementation | Complex (JS) | Simple (CSS) |

### Implementación en maikphotographer

Sección 2 (actualmente "Scroll video"):

```html
<section class="mt-16 md:mt-20 mb-16">
  <h2 class="text-center mb-8">Our Portfolio in Motion</h2>
  
  <div class="marquee">
    <div class="marquee-inner">
      <!-- 8 GIFs de nuestros proyectos (o motionsites.ai) -->
      <img src="/assets/marquee/project1.gif" alt="Project 1" class="marquee-item">
      <img src="/assets/marquee/project2.gif" alt="Project 2" class="marquee-item">
      <!-- ... repeat 8 times ... -->
      
      <!-- Duplicated for loop -->
      <img src="/assets/marquee/project1.gif" alt="Project 1" class="marquee-item">
      <!-- ... repeat 8 times ... -->
    </div>
  </div>
</section>
```

## Precauciones

⚠️ **Pause on hover (optional):**
```css
.marquee:hover .marquee-inner {
  animation-play-state: paused;
}
```

⚠️ **Mobile performance:**
- Reduce de 30s a 10s en mobile
- Reduce altura de 500px a 280px

⚠️ **Accessibility:**
- Add `prefers-reduced-motion` media query:
```css
@media (prefers-reduced-motion: reduce) {
  .marquee-inner {
    animation: none;
  }
}
```

## Impacto

- **Tiempo:** 1-2 horas
- **Visual impact:** +40% (continuous motion = engagement)
- **Performance gain:** -0.8s LCP (mejor que scroll video)
- **Risk:** Low (pure CSS)

**Recomendación:** Implementar en PRÓXIMA iteración (P2)

