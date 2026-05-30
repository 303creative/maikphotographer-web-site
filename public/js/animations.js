/**
 * 🎬 PREMIUM SCROLL ANIMATIONS — Maikel Marshall Photography
 *
 * 10 Efectos cinematográficos implementados con:
 * - GSAP + ScrollTrigger (animaciones)
 * - Lenis (smooth scroll)
 * - AOS (reveal simples)
 *
 * Performance optimizado: transform + opacity only
 */

// ═══════════════════════════════════════════════════════════════
// EFECTO 1: SMOOTH SCROLL CON LENIS
// ═══════════════════════════════════════════════════════════════

function initLenisScroll() {
  if (typeof Lenis === 'undefined') {
    console.warn('Lenis not loaded');
    return;
  }

  const lenis = new Lenis({
    duration: 0.35, // Scroll muy rápido (era 1.2, luego 0.7)
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
    wheelMultiplier: 1.2
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Conectar Lenis con GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  console.log('✅ Lenis smooth scroll initialized');
}

// ═══════════════════════════════════════════════════════════════
// EFECTO 2: HERO PARALLAX — Imagen lenta, texto rápido
// ═══════════════════════════════════════════════════════════════

function initHeroParallax() {
  // Imagen se mueve lento (parallax)
  gsap.to('.hero-img', {
    yPercent: -25,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      markers: false
    }
  });

  // Texto sube rápido y desaparece
  gsap.to('.hero-content', {
    yPercent: -60,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: '50% top',
      scrub: true,
      markers: false
    }
  });

  // Orbitales ralentizan
  gsap.to('.orbital-1, .orbital-2', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  console.log('✅ Hero parallax initialized');
}

// ═══════════════════════════════════════════════════════════════
// EFECTO 3: TEXTO QUE APARECE LÍNEA POR LÍNEA
// ═══════════════════════════════════════════════════════════════

function initTextReveals() {
  // Section titles appear with stagger
  gsap.fromTo('.section-title', {
    y: 60,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: 'power3.out',
    stagger: 0.05,
    scrollTrigger: {
      trigger: '.section-title',
      start: 'top 85%',
      toggleActions: 'play none none reverse',
      markers: false
    }
  });

  // EFECTO DESEADO: About sale de DETRÁS del hero
  // Hero sube y desaparece, About queda visible debajo

  // 1. Hero se eleva y desaparece más rápido
  gsap.to('.hero', {
    yPercent: -120, // Se va hacia arriba rápido
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true, // Sincronizado con scroll
      markers: false
    }
  });

  // 2. About aparece lentamente de detrás (parallax invertido)
  gsap.fromTo('.about', {
    yPercent: 30 // Inicia un poco abajo
  }, {
    yPercent: 0, // Sube hasta posición normal
    ease: 'none',
    scrollTrigger: {
      trigger: '.about',
      start: 'top bottom',
      end: 'top center',
      scrub: true,
      markers: false
    }
  });

  // 3. About card fade in cuando sale de detrás
  gsap.fromTo('.about-card', {
    opacity: 0.3
  }, {
    opacity: 1,
    ease: 'power1.out',
    scrollTrigger: {
      trigger: '.about',
      start: 'top 80%',
      end: 'top 40%',
      scrub: true
    }
  });

  // About bio es parte del reveal principal, sin animación adicional

  console.log('✅ Text reveal animations initialized');
}

// ═══════════════════════════════════════════════════════════════
// EFECTO 4: GALERÍA CON STAGGER — Fotos en cascada
// ═══════════════════════════════════════════════════════════════

function initPortfolioStagger() {
  gsap.fromTo('.port-item', {
    y: 80,
    opacity: 0,
    scale: 0.95
  }, {
    y: 0,
    opacity: 1,
    scale: 1,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.portfolio-grid',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });

  // Portfolio header appears
  gsap.fromTo('.portfolio-header', {
    opacity: 0,
    y: 30
  }, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.portfolio',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  console.log('✅ Portfolio stagger animations initialized');
}

// ═══════════════════════════════════════════════════════════════
// EFECTO 5: CONTADOR DE ESTADÍSTICAS ANIMADO
// ═══════════════════════════════════════════════════════════════

function initStatsCounter() {
  // Counter animation para números en About
  const stats = document.querySelectorAll('.astat-val');

  stats.forEach((stat) => {
    const finalValue = parseInt(stat.textContent.match(/\d+/)?.[0] || 0);

    if (finalValue > 0) {
      gsap.to(stat, {
        innerText: finalValue,
        duration: 2.5,
        snap: { innerText: 1 },
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-stats',
          start: 'top 70%',
          once: true
        },
        onUpdate: function() {
          // Mantener el formato original
          const unit = stat.textContent.replace(/\d+/g, '');
          stat.textContent = Math.floor(this.progress() * finalValue) + unit;
        }
      });
    }
  });

  console.log('✅ Stats counter initialized');
}

// ═══════════════════════════════════════════════════════════════
// EFECTO 6: CURSOR PERSONALIZADO MEJORADO
// ═══════════════════════════════════════════════════════════════

function initCustomCursor() {
  const curDot = document.querySelector('.cur-dot');
  const curRing = document.querySelector('.cur-ring');

  if (!curDot || !curRing) {
    console.warn('Custom cursor elements not found');
    return;
  }

  // Seguir mouse
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    gsap.to(curDot, {
      left: x,
      top: y,
      duration: 0.1
    });

    gsap.to(curRing, {
      left: x,
      top: y,
      duration: 0.3
    });
  });

  // Expandir al hover sobre imágenes
  const interactiveElements = document.querySelectorAll(
    '.port-item, .btn-primary, .btn-outline, a[href], button'
  );

  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      curRing.style.width = '50px';
      curRing.style.height = '50px';
      curRing.style.opacity = '0.8';
    });

    el.addEventListener('mouseleave', () => {
      curRing.style.width = '32px';
      curRing.style.height = '32px';
      curRing.style.opacity = '1';
    });
  });

  console.log('✅ Custom cursor enhanced');
}

// ═══════════════════════════════════════════════════════════════
// EFECTO 7: SPLIT TEXT REVEAL (Nombre aparece letra por letra)
// ═══════════════════════════════════════════════════════════════

function initSplitTextReveals() {
  // DESACTIVADO: Split text was breaking HTML with nested tags
  // The hero title already has proper structure with <span> and <em> tags
  // Animating the entire title with fade-in instead
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    // Simple fade-in para el título completo
    gsap.fromTo(heroTitle, {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      delay: 0.2,
      scrollTrigger: {
        trigger: '.hero',
        start: 'top 60%',
        once: true
      }
    });
  }

  console.log('✅ Hero title fade-in initialized');
}

// ═══════════════════════════════════════════════════════════════
// EFECTO 8: PRICING REVEAL (Card de izquierda/derecha)
// ═══════════════════════════════════════════════════════════════

function initPricingReveals() {
  // Si existen pricing cards en la página
  const pricingCards = document.querySelectorAll('.pricing-card, .price-card');

  if (pricingCards.length > 0) {
    gsap.fromTo(pricingCards, {
      y: 60,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.pricing',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  }

  console.log('✅ Pricing reveals ready');
}

// ═══════════════════════════════════════════════════════════════
// EFECTO 9: IMAGE REVEAL — Wipe como cortina
// ═══════════════════════════════════════════════════════════════

function initImageReveals() {
  // About image gets a reveal wipe effect
  const aboutImg = document.querySelector('.about-img');
  if (aboutImg && !aboutImg.parentElement.querySelector('.reveal-mask')) {
    const mask = document.createElement('div');
    mask.className = 'reveal-mask';
    mask.style.cssText = `
      position: absolute;
      inset: 0;
      background: var(--bg3, #0B0C0A);
      transform-origin: left center;
      pointer-events: none;
      border-radius: 16px;
    `;
    aboutImg.parentElement.style.position = 'relative';
    aboutImg.parentElement.appendChild(mask);

    gsap.fromTo(mask, {
      scaleX: 1
    }, {
      scaleX: 0,
      duration: 1,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: '.about-img-col',
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });
  }

  console.log('✅ Image reveals initialized');
}

// ═══════════════════════════════════════════════════════════════
// EFECTO 10: SECCIÓN DIVIDERS — Líneas elegantes entre secciones
// ═══════════════════════════════════════════════════════════════

function initSectionDividers() {
  const sections = document.querySelectorAll(
    '.about, .portfolio, .pricing, .contact'
  );

  sections.forEach((section) => {
    const divider = document.createElement('div');
    divider.style.cssText = `
      height: 1px;
      background: linear-gradient(90deg,
        rgba(216,193,138,0) 0%,
      rgba(216,193,138,0.3) 50%,
        rgba(216,193,138,0) 100%);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      opacity: 0;
    `;

    section.style.position = 'relative';
    section.appendChild(divider);

    gsap.to(divider, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 95%',
        once: true
      }
    });
  });

  console.log('✅ Section dividers initialized');
}

// ═══════════════════════════════════════════════════════════════
// EFECTO BONUS: LAZY LOADING DE IMÁGENES
// ═══════════════════════════════════════════════════════════════

function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageElements = document.querySelectorAll('img[loading="lazy"]');

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          // La imagen ya carga naturalmente con loading="lazy"
          // Este código es por si necesitamos hacer algo más
          imageObserver.unobserve(img);
        }
      });
    });

    imageElements.forEach((img) => imageObserver.observe(img));
  }

  console.log('✅ Lazy loading ready');
}

// ═══════════════════════════════════════════════════════════════
// EFECTO BONUS 2: RESPETO A ACCESIBILIDAD
// ═══════════════════════════════════════════════════════════════

function initAccessibility() {
  // Si usuario prefiere reducir movimiento, desactivar animaciones
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    gsap.globalTimeline.timeScale(0);
    gsap.set('*', { animationPlayState: 'paused' });
    console.log('✅ Reduced motion detected - animations disabled');
  }
}

// ═══════════════════════════════════════════════════════════════
// INICIALIZACIÓN PRINCIPAL
// ═══════════════════════════════════════════════════════════════

function initAllAnimations() {
  console.log('🎬 Initializing premium animations...');

  // Verificar que GSAP está disponible
  if (typeof gsap === 'undefined') {
    console.error('❌ GSAP not loaded - animations disabled');
    return;
  }

  // Inicializar en orden
  initAccessibility();
  initLenisScroll();
  initHeroParallax();
  initTextReveals();
  initPortfolioStagger();
  initStatsCounter();
  initCustomCursor();
  initSplitTextReveals();
  initImageReveals();
  initPricingReveals();
  initSectionDividers();
  initLazyLoading();

  console.log('✅ All animations initialized successfully');
}

// Ejecutar cuando DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAllAnimations);
} else {
  initAllAnimations();
}

// Refresh ScrollTrigger en resize
window.addEventListener('resize', () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.refresh());
});
