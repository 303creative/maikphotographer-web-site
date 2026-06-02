# Parallax Scroll Effects — MotionSites Pattern

## Patrón: Image moves slower than scroll (depth effect)

Viktor Oddy usa parallax bajo testimonial quote. Max offset 200px.

## Implementación

```jsx
export function ParallaxImage({ src, alt, maxOffset = 200 }) {
  const [offset, setOffset] = useState(0);
  const imgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!imgRef.current) return;
      const rect = imgRef.current.getBoundingClientRect();
      // Calculate scroll percentage
      const scrollPercent = 1 - (rect.top / window.innerHeight);
      const newOffset = scrollPercent * maxOffset;
      setOffset(newOffset);
    };

    // Use requestAnimationFrame for smooth 60fps
    let rafId;
    const onScroll = () => {
      rafId = requestAnimationFrame(handleScroll);
    };
    
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [maxOffset]);

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      style={{
        transform: `translateY(${offset}px)`,
      }}
      className="w-full max-w-xs rounded-2xl shadow-lg"
    />
  );
}

// Uso
<ParallaxImage src={imageUrl} alt="Chris Halaska" maxOffset={200} />
```

## Vanilla JS Version

```html
<img id="parallax-image" src="image.jpg" alt="Parallax Image">

<script>
const img = document.getElementById('parallax-image');
const MAX_OFFSET = 200;

function updateParallax() {
  const rect = img.getBoundingClientRect();
  const scrollPercent = 1 - (rect.top / window.innerHeight);
  const offset = scrollPercent * MAX_OFFSET;
  img.style.transform = `translateY(${offset}px)`;
}

let rafId;
window.addEventListener('scroll', () => {
  rafId = requestAnimationFrame(updateParallax);
});
</script>

<style>
#parallax-image {
  transition: transform 0.3s ease-out;
  will-change: transform;
}
</style>
```

## Para maikphotographer.com

### 1. About Section
```
Current: Static about photo
Upgrade: Parallax image with max offset 150px
Effect: Photo "floats" as you scroll
```

### 2. Portfolio Items
```
Current: Static grid images
Upgrade: Each image has parallax zoom on scroll
Effect: Subtle zoom as you scroll past
```

```jsx
// Portfolio parallax zoom variant
export function ParallaxPortfolioItem({ src, alt }) {
  const [scale, setScale] = useState(1);
  const imgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!imgRef.current) return;
      const rect = imgRef.current.getBoundingClientRect();
      const scrollPercent = 1 - (rect.top / window.innerHeight);
      // Scale from 1.0 to 1.1
      const newScale = 1 + (scrollPercent * 0.1);
      setScale(newScale);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      style={{
        transform: `scale(${scale})`,
      }}
      className="w-full object-cover rounded-lg"
    />
  );
}
```

## Precauciones

⚠️ **Performance:**
- Use requestAnimationFrame (no lag)
- Use will-change: transform (GPU acceleration)
- Limite maxOffset (200px es máximo recomendado)

⚠️ **Accessibility:**
- Respete prefers-reduced-motion:
```css
@media (prefers-reduced-motion: reduce) {
  [style*="transform"] {
    transform: none !important;
  }
}
```

## Impacto

- **Tiempo:** 1-2 horas de implementación
- **Visual impact:** +20% wow factor
- **Performance risk:** Low (requestAnimationFrame es efficient)
- **Mobile:** Works pero manténlo subtle en <768px

