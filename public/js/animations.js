/**
 * 🎬 PREMIUM SCROLL ANIMATIONS — v3 (reescrito 2026-06-10)
 * GSAP + ScrollTrigger. Fixes:
 *  - Guard si GSAP no carga (CDN caído → la página sigue funcionando)
 *  - prefers-reduced-motion: contenido VISIBLE (antes quedaba en opacity:0)
 *  - Carrusel sin drift (el cálculo incluye el gap)
 *  - Parallax conflictivo del portfolio eliminado
 *  - Código muerto eliminado (.section-title, .about-card, cursor sin CSS)
 */

(function () {
  'use strict';

  var PREFERS_REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var HAS_GSAP = typeof gsap !== 'undefined';

  // ═════════════════════════════════════════════════════════════
  // GSAP ANIMATIONS (solo si la librería cargó y el usuario acepta motion)
  // ═════════════════════════════════════════════════════════════
  if (HAS_GSAP && !PREFERS_REDUCED) {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // 1. Hero title se desvanece al hacer scroll
    gsap.to('.hero-title', {
      yPercent: -30,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: '35% top',
        scrub: true
      }
    });

    // 2. Portfolio: cascada de entrada
    gsap.fromTo('.port-item',
      { y: 80, opacity: 0, scale: 0.95 },
      {
        y: 0, opacity: 1, scale: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.portfolio-grid',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 3. Stats counter (cuenta desde 0)
    document.querySelectorAll('.astat-val').forEach(function (el) {
      var match = el.textContent.match(/\d+/);
      if (!match) return;
      var finalValue = parseInt(match[0], 10);
      var suffix = el.textContent.replace(/^\d+/, ''); // "+", "h", etc.

      gsap.to(el, {
        duration: 2.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-stats',
          start: 'top 75%',
          once: true
        },
        onUpdate: function () {
          el.textContent = Math.floor(this.progress() * finalValue) + suffix;
        },
        onComplete: function () {
          el.textContent = finalValue + suffix;
        }
      });
    });

    // 4. Service cards: entrada alternada
    gsap.utils.toArray('.svc-card').forEach(function (el, i) {
      gsap.fromTo(el,
        { x: i % 2 === 0 ? -60 : 60, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // 5. Cortina de revelado en imágenes del portfolio
    gsap.utils.toArray('.port-item').forEach(function (item) {
      var img = item.querySelector('img');
      if (!img) return;
      var mask = document.createElement('div');
      mask.style.cssText = 'position:absolute;inset:0;background:#0C0C0C;transform-origin:left center;z-index:10;pointer-events:none;';
      item.appendChild(mask);
      gsap.to(mask, {
        scaleX: 0,
        duration: 1.2,
        ease: 'power4.inOut',
        scrollTrigger: { trigger: item, start: 'top 80%', once: true }
      });
    });

    // 6. Hero light leak fade-in
    gsap.fromTo('.hero-light-leak',
      { opacity: 0 },
      { opacity: 0.2, duration: 2.5, delay: 0.8, ease: 'power2.out' }
    );

    // 7. Hero title premium con SplitType (si cargó)
    if (typeof SplitType !== 'undefined') {
      var heroTitle = document.querySelector('.hero-title');
      if (heroTitle) {
        var split = new SplitType(heroTitle, { types: 'chars' });
        gsap.fromTo(split.chars,
          { y: 80, opacity: 0, rotateX: -90, transformOrigin: '0% 50% -50px' },
          { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.015, ease: 'power4.out', delay: 0.4 }
        );
      }
    }

    // 8. Feedback de botones (Emil Kowalski press)
    document.querySelectorAll('button, .btn').forEach(function (btn) {
      btn.addEventListener('mousedown', function () {
        gsap.to(btn, { scale: 0.97, duration: 0.1, ease: 'power2.out' });
      });
      ['mouseup', 'mouseleave'].forEach(function (evt) {
        btn.addEventListener(evt, function () {
          gsap.to(btn, { scale: 1, duration: 0.15, ease: 'back.out(2)' });
        });
      });
    });
  }

  // ═════════════════════════════════════════════════════════════
  // REDUCED MOTION: garantizar que TODO el contenido sea visible
  // ═════════════════════════════════════════════════════════════
  if (PREFERS_REDUCED || !HAS_GSAP) {
    document.querySelectorAll('.port-item, .svc-card, .hero-title, .hero-light-leak').forEach(function (el) {
      el.style.opacity = '';
      el.style.transform = '';
    });
  }

  // ═════════════════════════════════════════════════════════════
  // PRELOADER (si existe) — funciona sin GSAP
  // ═════════════════════════════════════════════════════════════
  window.addEventListener('load', function () {
    var preloader = document.getElementById('preloader');
    if (!preloader) return;
    setTimeout(function () {
      preloader.style.transition = 'opacity 0.6s ease';
      preloader.style.opacity = '0';
      setTimeout(function () { preloader.style.display = 'none'; }, 650);
    }, PREFERS_REDUCED ? 0 : 1200);
  });

  // ═════════════════════════════════════════════════════════════
  // CARRUSEL DE TESTIMONIOS — sin drift (incluye el gap en el cálculo)
  // ═════════════════════════════════════════════════════════════
  var carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    var track = document.getElementById('carousel-track');
    var prevBtn = carousel.querySelector('.carousel-prev');
    var nextBtn = carousel.querySelector('.carousel-next');
    var cards = track ? track.children.length : 0;

    if (track && cards > 1) {
      var current = 0;
      var autoScrollTimer = null;

      var updateCarousel = function () {
        var card = track.children[0];
        var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0;
        var step = card.getBoundingClientRect().width + gap;
        track.style.transform = 'translateX(-' + (current * step) + 'px)';
      };

      var next = function () { current = (current + 1) % cards; updateCarousel(); };
      var prev = function () { current = (current - 1 + cards) % cards; updateCarousel(); };

      var startAuto = function () {
        if (PREFERS_REDUCED) return; // sin auto-scroll si el usuario reduce motion
        autoScrollTimer = setInterval(next, 4000);
      };
      var stopAuto = function () { clearInterval(autoScrollTimer); };
      var resetAuto = function () { stopAuto(); startAuto(); };

      if (prevBtn) prevBtn.addEventListener('click', function () { prev(); resetAuto(); });
      if (nextBtn) nextBtn.addEventListener('click', function () { next(); resetAuto(); });
      carousel.addEventListener('mouseenter', stopAuto);
      carousel.addEventListener('mouseleave', startAuto);
      window.addEventListener('resize', updateCarousel);

      startAuto();
    }
  }
})();
