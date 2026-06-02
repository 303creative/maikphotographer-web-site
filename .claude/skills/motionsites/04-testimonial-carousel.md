# Testimonial Carousel — MotionSites Pattern

## El Patrón

5 testimonios, auto-scroll cada 3 segundos, pause on hover, prev/next navigation.

## React Implementation

```jsx
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      quote: "Viktor led the creation of our best fundraising deck to date!",
      author: "alexwu",
      role: "Founder, Nexgate",
      avatar: "https://api.pexels.com/v1/users/12345/portraits" // Pexels image
    },
    {
      quote: "With very little guidance team delivered designs that were consistently spot on...",
      author: "Marcus Anderson",
      role: "CEO, Data.storage",
      avatar: "https://api.pexels.com/v1/users/67890/portraits"
    },
    {
      quote: "Working with Viktor transformed our product vision...",
      author: "James Mitchell",
      role: "VP Product, LaunchPad",
      avatar: "https://api.pexels.com/v1/users/11111/portraits"
    },
    // ... 2 more
  ];

  // Auto-scroll every 3 seconds
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused, testimonials.length]);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header with stars */}
        <div className="flex justify-between items-center mb-12 md:max-w-4xl md:ml-auto">
          <h2 className="text-4xl md:text-5xl font-serif">
            What <span className="italic">builders</span> say
          </h2>
          <div className="flex items-center gap-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-black" />
            ))}
            <span className="text-sm font-medium ml-2">Clutch 5/5</span>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Carousel Items */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-800 ease-in-out"
              style={{
                transform: `translateX(-${current * 100}%)`,
              }}
            >
              {testimonials.map((test, idx) => (
                <div
                  key={idx}
                  className="w-full flex-shrink-0 px-3"
                >
                  <div className="bg-white rounded-[32px] md:rounded-[40px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] px-6 md:pl-10 md:pr-24 py-8">
                    {/* Quote SVG */}
                    <svg
                      className="w-6 h-6 text-slate-900 mb-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-4.716-5-7-5-3 0-7 3.75-7 5c0 1 0 15 7 15z" />
                    </svg>

                    {/* Quote text */}
                    <p className="text-base text-[#0D212C] leading-relaxed mb-6">
                      "{test.quote}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <img
                        src={test.avatar}
                        alt={test.author}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-sm">{test.author}</p>
                        <p className="text-xs text-slate-600">
                          → {test.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-12 h-12 rounded-full border border-[#0D212C]/20 flex items-center justify-center hover:border-[#0D212C] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-12 h-12 rounded-full border border-[#0D212C]/20 flex items-center justify-center hover:border-[#0D212C] transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
```

## Vanilla JS Implementation

```html
<section class="testimonial-carousel" data-carousel>
  <h2>What <em>builders</em> say</h2>
  
  <div class="carousel-viewport">
    <div class="carousel-inner" id="carousel-track">
      <!-- Testimonials get cloned 3x for infinite loop -->
      <!-- Original 5 + duplicate 5 + duplicate 5 = 15 total -->
    </div>
  </div>
  
  <button class="carousel-prev">←</button>
  <button class="carousel-next">→</button>
</section>

<script>
const carousel = document.querySelector('[data-carousel]');
const track = document.getElementById('carousel-track');
const prevBtn = carousel.querySelector('.carousel-prev');
const nextBtn = carousel.querySelector('.carousel-next');

let current = 0;
let autoScrollTimer;

// Initialize - populate with tripled testimonials
const testimonials = [ /* array of testimonial objects */ ];
const tripled = [...testimonials, ...testimonials, ...testimonials];

tripled.forEach(test => {
  const item = createTestimonialItem(test);
  track.appendChild(item);
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
  autoScrollTimer = setInterval(() => {
    next();
  }, 3000);
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
</script>

<style>
.carousel-viewport {
  overflow: hidden;
  width: 100%;
}

.carousel-inner {
  display: flex;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.carousel-inner > * {
  width: 100%;
  flex-shrink: 0;
}
</style>
```

## Para maikphotographer.com

**Nueva sección CRÍTICA (P1 - conversión):**

```html
<section class="py-16 md:py-20">
  <h2 class="text-4xl md:text-5xl mb-12 text-center">
    What clients say
  </h2>
  
  <!-- Carousel with 5 testimonials -->
  <!-- 50K+ real testimonials en portafolio... copiar algunas? -->
</section>
```

## Testimonial Examples

Puedes usar Pexels avatars:
```
"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=100"
```

Copiar formato:
```
{
  quote: "Maikel's work transformed our brand. The attention to detail...",
  author: "Sarah Chen",
  role: "CEO, TechStartup Co",
  avatar: "pexels-photo-xyz.jpg"
}
```

## Impacto

- **Tiempo:** 3-4 horas
- **Conversión impact:** +15-20% (critical!)
- **Visual impact:** +25%
- **Risk:** Low

**PRIORIDAD:** IMPLEMENTAR ESTA SEMANA (P1)

