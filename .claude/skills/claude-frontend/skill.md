# Claude Frontend Design Skill — React & CSS Best Practices

## Filosofía
Escribir código frontend que sea limpio, performante, accesible y hermoso.

**Core Principle:** "Code that reads like poetry. Components that work like clockwork."

---

## 1. ARQUITECTURA DE COMPONENTES

### A. Estructura del proyecto
```
src/
├── components/
│   ├── ui/                 ← Componentes reutilizables (Button, Card, Badge)
│   ├── sections/           ← Secciones de página (Hero, Portfolio, Services)
│   ├── layout/             ← Layout (Nav, Footer, Sidebar)
│   └── hooks/              ← Custom React hooks
├── styles/
│   ├── global.css          ← Reset y variables globales
│   ├── variables.css       ← CSS custom properties
│   └── animations.css      ← GSAP y CSS animations
├── utils/                  ← Helper functions
└── types/                  ← TypeScript types (si aplica)

public/
├── assets/
│   ├── icons/              ← SVG icons
│   ├── portfolio/          ← Fotos portfolio
│   ├── videos/             ← MP4 videos
│   ├── overlays/           ← PNG overlays
│   ├── textures/           ← Texturas
│   └── backgrounds/        ← Fondos JPG
```

### B. Componentes pequeños y reutilizables
```jsx
// ✅ BIEN: Componente pequeño y específico
function Badge({ label, status = 'default' }) {
  return (
    <span className={`badge badge-${status}`}>
      {status === 'live' && <span className="dot" />}
      {label}
    </span>
  );
}

// ❌ MALO: Componente gigante con todo mezclado
function HeroSection() {
  // ... 500 líneas de código
}
```

### C. Props tipadas
```jsx
interface ButtonProps {
  variant: 'primary' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

function Button({ variant, size, ...props }: ButtonProps) {
  return (
    <button className={`btn btn-${variant} btn-${size}`} {...props} />
  );
}
```

---

## 2. REACT PATTERNS

### A. Custom Hooks
```jsx
// Hook para detectar scroll
function useScroll() {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
}

// Uso
function Header() {
  const scrollY = useScroll();
  return <header className={scrollY > 100 ? 'hidden' : ''} />;
}
```

### B. Error Boundaries
```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Oops, algo salió mal.</div>;
    }
    return this.props.children;
  }
}

// Uso
<ErrorBoundary>
  <Portfolio />
</ErrorBoundary>
```

### C. Lazy Loading de componentes
```jsx
const Portfolio = React.lazy(() => import('./sections/Portfolio'));
const Services = React.lazy(() => import('./sections/Services'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Portfolio />
      <Services />
    </Suspense>
  );
}
```

---

## 3. CSS & TAILWIND

### A. CSS Variables (TailwindCSS)
```css
:root {
  --bg: #0C0C0C;
  --text: #FFFFFF;
  --accent: #FF5722;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-fast: 150ms;
}

/* En Tailwind */
@layer components {
  .btn-primary {
    @apply px-7 py-3 bg-accent text-white rounded-lg font-semibold;
    @apply transition-all duration-150 ease-out;
    @apply hover:scale-105 hover:shadow-lg;
  }
}
```

### B. Responsive Design (Mobile First)
```jsx
export default function Portfolio() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:gap-6">
      {portfolioItems.map(item => (
        <PortfolioCard key={item.id} item={item} />
      ))}
    </div>
  );
}
```

### C. Aspect Ratio para imágenes
```jsx
function PortfolioCard({ item }) {
  return (
    <div className="aspect-[3/4] overflow-hidden rounded-lg">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover hover:scale-105 transition-transform"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
```

---

## 4. ANIMACIONES CON GSAP & LENIS

### A. ScrollTrigger básico
```jsx
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Portfolio() {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    gsap.to('.port-item', {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'top 20%',
        scrub: false
      }
    });
  }, []);

  return <div ref={containerRef} className="portfolio" />;
}
```

### B. Lenis Smooth Scroll
```jsx
import Lenis from '@studio-freight/lenis';

function App() {
  React.useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: false
    });

    const update = (time) => lenis.raf(time);
    const raf = gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return <div />;
}
```

---

## 5. ACCESIBILIDAD

### A. ARIA labels
```jsx
<button aria-label="Cerrar menú" onClick={closeMenu}>
  <X size={24} />
</button>

<div role="status" aria-live="polite">
  {successMessage}
</div>

<nav role="navigation">
  {/* ... */}
</nav>
```

### B. Alt text en imágenes
```jsx
<img
  src="/assets/portfolio/image.jpg"
  alt="Portrait session with golden hour lighting, shallow depth of field"
  loading="lazy"
  decoding="async"
/>
```

### C. Contraste y focus states
```css
.btn {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.btn:focus-visible {
  outline-color: var(--accent);
}

/* Respeta prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## 6. PERFORMANCE CHECKLIST

Antes de hacer commit:

- [ ] Componentes importados con lazy loading
- [ ] Imágenes con loading="lazy"
- [ ] CSS purged en producción (Tailwind)
- [ ] No hay console.log en producción
- [ ] PropTypes o TypeScript validando props
- [ ] Error boundaries en componentes críticos
- [ ] Lighthouse Performance > 85
- [ ] 0 errores en consola del navegador

---

## 7. REGLAS DE CÓDIGO

### ✅ SÍ
- Componentes funcionales con hooks
- Destructuring en props
- Nombres descriptivos (no `x`, `data`, `stuff`)
- Comentarios solo para el "por qué", no el "qué"
- Manejo de errores en API calls
- Loading states

### ❌ NO
- Componentes de clase (excepto Error Boundary)
- Props drilling (pasar props por 5 niveles)
- Mutaciones de estado
- console.log en producción
- Nombres genéricos (btn, card, item)
- Código comentado (usar git si lo necesitas después)

---

## 8. EJEMPLO COMPLETO

```jsx
// components/ui/Button.jsx
export default function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  className = '',
  ...props
}) {
  const baseStyle = 'font-semibold transition-all duration-150 ease-out';
  const variants = {
    primary: 'bg-accent text-white hover:scale-105',
    ghost: 'border border-white/20 text-white hover:border-accent'
  };
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-7 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const classes = `btn ${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button
      className={classes}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
```

---

**"Write components like you're explaining them to someone who's never coded before."**
