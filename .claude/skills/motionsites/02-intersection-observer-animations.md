# Intersection Observer Animations — MotionSites Pattern

## El Patrón

Cuando un elemento entra en pantalla, dispara una animación fade-in-up elegante.

```javascript
// Hook reusable
function useInViewAnimation(threshold = 0.1) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isInView];
}

// Uso
const [ref, isInView] = useInViewAnimation();
<div ref={ref} className={isInView ? "animate-fade-in-up" : "opacity-0"} />
```

## CSS Animation

```css
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

.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
```

## Staggered Animation (Hijos)

```jsx
<div ref={ref}>
  <h1 className={isInView ? "animate-fade-in-up" : "opacity-0"} 
      style={{animationDelay: "0.1s"}}>
    Heading
  </h1>
  <p className={isInView ? "animate-fade-in-up" : "opacity-0"} 
     style={{animationDelay: "0.2s"}}>
    Paragraph
  </p>
  <button className={isInView ? "animate-fade-in-up" : "opacity-0"} 
          style={{animationDelay: "0.3s"}}>
    CTA
  </button>
</div>
```

## Para maikphotographer.com (Vanilla JS)

Sin React, usa IntersectionObserver + data attributes:

```html
<section data-fade-in>
  <h2 class="fade-in-item" style="--delay: 0.1s">Hero Title</h2>
  <p class="fade-in-item" style="--delay: 0.2s">Description</p>
  <button class="fade-in-item" style="--delay: 0.3s">CTA</button>
</section>

<script>
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in-up');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('[data-fade-in] .fade-in-item').forEach(el => {
  el.classList.add('opacity-0');
  observer.observe(el);
});
</script>

<style>
.fade-in-item {
  --delay: 0s;
  animation: fadeInUp 0.8s ease-out forwards;
  animation-delay: var(--delay);
}
</style>
```

## Uso en maikphotographer.com

- Hero title + paragraphs + buttons
- About section content
- Portfolio items (fade-in on scroll)
- Services cards
- Contact form

**Impacto:** UX profesional, no jarring entrance

