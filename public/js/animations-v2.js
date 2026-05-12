/**
 * 303 CREATIVE STUDIO — Animation System v2.5
 * Enhanced Edition: Glassmorphism + Ripple + Blur + Progress
 *
 * Stack: Lenis + GSAP 3 + ScrollTrigger
 * Philosophy: Luxury = subtle, intentional, elegant. Never bounce. Never shake.
 *
 * VERSIÓN MEJORADA (Opción B)
 * Incluye: ripple effects, scroll progress, blur effects, glow enhancements
 */

/* ─────────────────────────────────────────
   0. REDUCED MOTION GUARD
   ───────────────────────────────────────── */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─────────────────────────────────────────
   1. GSAP SETUP
   ───────────────────────────────────────── */
gsap.registerPlugin(ScrollTrigger);

gsap.defaults({
  ease: 'power3.out',
  duration: 0.9
});

/* ─────────────────────────────────────────
   2. LENIS SMOOTH SCROLL
   ───────────────────────────────────────── */
let lenis;

function initLenis() {
  if (prefersReduced) return;

  lenis = new Lenis({
    duration: 0.6,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false
  });

  // Integrate Lenis with GSAP ticker
  gsap.ticker.add(time => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Anchor links via Lenis
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -80, duration: 0.8 });
      }
    });
  });
}

/* ─────────────────────────────────────────
   3. HERO ANIMATION
   ───────────────────────────────────────── */
function initHero() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  if (prefersReduced) {
    gsap.set('.hero-line-inner, .hero-tag, .hero-year, .hero-sub, .hero-btns, .hero-stat, .scroll-indicator', {
      autoAlpha: 1, y: 0, x: 0
    });
    return;
  }

  const delay = 1.6;
  const heroTl = gsap.timeline({ delay });

  // Hero tag — slides in from left
  const heroTag = document.querySelector('.hero-tag');
  if (heroTag) {
    gsap.set(heroTag, { autoAlpha: 0, x: -20 });
    heroTl.to(heroTag, { autoAlpha: 1, x: 0, duration: 0.8, ease: 'power3.out' }, 0);
  }

  // Year label — fades in
  const heroYear = document.querySelector('.hero-year');
  if (heroYear) {
    gsap.set(heroYear, { autoAlpha: 0 });
    heroTl.to(heroYear, { autoAlpha: 1, duration: 0.6 }, 0.2);
  }

  // Headline lines — rise up from below
  const lineInners = document.querySelectorAll('.hero-line-inner');
  lineInners.forEach((el, i) => {
    gsap.set(el, { y: 140 });
  });
  if (lineInners.length) {
    heroTl.to(lineInners, {
      y: 0,
      duration: 1.1,
      ease: 'power4.out',
      stagger: 0.15
    }, 0.05);
  }

  // Sub copy
  const heroSub = document.querySelector('.hero-sub');
  if (heroSub) {
    gsap.set(heroSub, { autoAlpha: 0, y: 24 });
    heroTl.to(heroSub, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0.7);
  }

  // CTAs
  const heroBtns = document.querySelector('.hero-btns');
  if (heroBtns) {
    gsap.set(heroBtns, { autoAlpha: 0, y: 18 });
    heroTl.to(heroBtns, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.85);
  }

  // Stats
  const heroStats = document.querySelectorAll('.hero-stat');
  if (heroStats.length) {
    gsap.set(heroStats, { autoAlpha: 0, y: 20 });
    heroTl.to(heroStats, {
      autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out',
      stagger: 0.1
    }, 0.9);
  }

  // Scroll indicator
  const scrollInd = document.querySelector('.scroll-indicator');
  if (scrollInd) {
    gsap.set(scrollInd, { autoAlpha: 0 });
    heroTl.to(scrollInd, { autoAlpha: 1, duration: 0.6 }, 1.4);
  }
}

/* ─────────────────────────────────────────
   4. HERO MOUSE PARALLAX
   ───────────────────────────────────────── */
function initHeroMouseParallax() {
  const layerDeep = document.getElementById('layer-deep');
  const layerMid  = document.getElementById('layer-mid');
  if (!layerDeep && !layerMid) return;

  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!canHover || prefersReduced) return;

  const qDeepX  = layerDeep ? gsap.quickTo(layerDeep, 'x', { duration: 1.8, ease: 'power3.out' }) : null;
  const qDeepY  = layerDeep ? gsap.quickTo(layerDeep, 'y', { duration: 1.8, ease: 'power3.out' }) : null;
  const qMidX   = layerMid  ? gsap.quickTo(layerMid,  'x', { duration: 1.2, ease: 'power3.out' }) : null;
  const qMidY   = layerMid  ? gsap.quickTo(layerMid,  'y', { duration: 1.2, ease: 'power3.out' }) : null;

  document.addEventListener('mousemove', e => {
    if (window.scrollY > window.innerHeight * 0.5) return;

    const dx = (e.clientX - window.innerWidth  / 2) / (window.innerWidth  / 2);
    const dy = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);

    if (qDeepX) qDeepX(dx * -24);
    if (qDeepY) qDeepY(dy * -14);

    if (qMidX) qMidX(dx * 10);
    if (qMidY) qMidY(dy * 6);
  });

  ScrollTrigger.create({
    trigger: '#hero',
    start: 'bottom center',
    onEnter: () => {
      if (layerDeep) gsap.to(layerDeep, { x: 0, y: 0, duration: 1.2 });
      if (layerMid)  gsap.to(layerMid,  { x: 0, y: 0, duration: 0.9 });
    }
  });
}

/* ─────────────────────────────────────────
   5. HERO SCROLL EXIT
   ───────────────────────────────────────── */
function initHeroScrollExit() {
  const heroExit = document.getElementById('hero-exit');
  if (!heroExit || prefersReduced) return;

  setTimeout(() => {
    ScrollTrigger.create({
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.8,
      onUpdate: self => {
        const p = self.progress;
        gsap.set(heroExit, {
          y:       p * 80,
          opacity: 1 - p * 1.4
        });
      }
    });
  }, 2000);
}

/* ─────────────────────────────────────────
   6. HERO BG ZOOM
   ───────────────────────────────────────── */
function initHeroBgScroll() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg || prefersReduced) return;

  gsap.to(heroBg, {
    scale: 1.08,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5
    }
  });
}

/* ─────────────────────────────────────────
   7. CUSTOM CURSOR
   ───────────────────────────────────────── */
function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!canHover) return;

  document.body.classList.add('cursor-active');

  gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

  const dotX  = gsap.quickTo(dot,  'x', { duration: 0.06, ease: 'none' });
  const dotY  = gsap.quickTo(dot,  'y', { duration: 0.06, ease: 'none' });
  const ringX = gsap.quickTo(ring, 'x', { duration: 0.3,  ease: 'power3.out' });
  const ringY = gsap.quickTo(ring, 'y', { duration: 0.3,  ease: 'power3.out' });

  window.addEventListener('mousemove', e => {
    dotX(e.clientX);  dotY(e.clientY);
    ringX(e.clientX); ringY(e.clientY);
  });

  const interactables = 'a, button, [data-cursor], .service-card, .plan, .plan-btn, .problem-item';

  document.addEventListener('mouseover', e => {
    if (e.target.closest(interactables)) {
      gsap.to(dot,  { scale: 2.5, backgroundColor: 'rgba(201,169,126,0.9)', duration: 0.25 });
      gsap.to(ring, { scale: 0.6, borderColor: 'rgba(201,169,126,0.7)',     duration: 0.25 });
    }
  });

  document.addEventListener('mouseout', e => {
    if (e.target.closest(interactables)) {
      gsap.to(dot,  { scale: 1, backgroundColor: '#c9a97e',              duration: 0.3 });
      gsap.to(ring, { scale: 1, borderColor: 'rgba(201,169,126,0.5)',    duration: 0.3 });
    }
  });

  document.addEventListener('mouseleave', () => gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 }));
  document.addEventListener('mouseenter', () => gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2 }));
}

/* ─────────────────────────────────────────
   8. SCROLL REVEALS
   ───────────────────────────────────────── */
function initScrollReveals() {
  if (prefersReduced) {
    gsap.set('.r', { autoAlpha: 1, y: 0 });
    return;
  }

  ScrollTrigger.batch('.r', {
    start: 'top 90%',
    once: true,
    interval: 0.02,
    batchMax: 8,
    onEnter: batch => {
      gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1
      });
    }
  });
}

/* ─────────────────────────────────────────
   9. PARALLAX
   ───────────────────────────────────────── */
function initParallax() {
  if (prefersReduced) return;

  const aboutImg = document.querySelector('.about-visual img');
  if (aboutImg) {
    gsap.to(aboutImg, {
      yPercent: -8,
      ease: 'none',
      scrollTrigger: {
        trigger: '.about-visual',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.8
      }
    });
  }

  document.querySelectorAll('.case-img img').forEach(img => {
    gsap.to(img, {
      yPercent: -6,
      ease: 'none',
      scrollTrigger: {
        trigger: img.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.8
      }
    });
  });
}

/* ─────────────────────────────────────────
   10. COUNTER ANIMATIONS
   ───────────────────────────────────────── */
function initCounters() {
  const els = document.querySelectorAll('[data-target], .after-num, .metric-val');
  if (!els.length) return;

  els.forEach(el => {
    let target, suffix = '', prefix = '', decimals = 0;

    if (el.dataset.target !== undefined) {
      target   = parseFloat(el.dataset.target);
      suffix   = el.dataset.suffix  || '';
      prefix   = el.dataset.prefix  || '';
      decimals = parseInt(el.dataset.decimal || '0', 10);
    } else {
      const raw = el.textContent.trim();
      const hasPercent = raw.includes('%');
      const hasX       = raw.toLowerCase().endsWith('x');
      const numStr     = raw.replace(/,/g, '').replace('%', '').replace(/x/i, '').replace('$', '');
      target   = parseFloat(numStr);
      if (isNaN(target)) return;
      suffix   = hasPercent ? '%' : hasX ? 'x' : '';
      decimals = numStr.includes('.') ? (numStr.split('.')[1] || '').length : 0;
    }

    if (isNaN(target)) return;
    const obj = { v: 0 };

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          v: target,
          duration: prefersReduced ? 0 : 1.8,
          ease: 'power3.out',
          snap: { v: decimals > 0 ? Math.pow(10, -decimals) : 1 },
          onUpdate: () => {
            let display = decimals > 0 ? obj.v.toFixed(decimals) : Math.round(obj.v).toString();
            if (target >= 1000) display = Math.round(obj.v).toLocaleString('en-US');
            el.textContent = prefix + display + suffix;
          }
        });
      }
    });
  });
}

/* ─────────────────────────────────────────
   11. CLIP-PATH REVEALS
   ───────────────────────────────────────── */
function initImageReveals() {
  if (prefersReduced) return;

  const imgs = document.querySelectorAll('.case-img img, .case-images img');
  if (!imgs.length) return;

  gsap.set(imgs, { clipPath: 'inset(100% 0 0 0)', autoAlpha: 1 });

  ScrollTrigger.batch(imgs, {
    start: 'top 88%',
    once: true,
    interval: 0.04,
    batchMax: 6,
    onEnter: batch => {
      gsap.to(batch, {
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.15
      });
    }
  });
}

/* ─────────────────────────────────────────
   12. MAGNETIC BUTTONS
   ───────────────────────────────────────── */
function initMagneticButtons() {
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!canHover || prefersReduced) return;

  const magneticEls = document.querySelectorAll('.btn-gold, .btn-primary, .nav-cta, .plan-btn');

  magneticEls.forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const dx   = (e.clientX - rect.left - rect.width  / 2) * 0.35;
      const dy   = (e.clientY - rect.top  - rect.height / 2) * 0.35;
      gsap.to(el, { x: dx, y: dy, duration: 0.3, ease: 'power3.out', overwrite: 'auto' });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'expo.out', overwrite: 'auto' });
    });
  });
}

/* ─────────────────────────────────────────
   13. NAVBAR SCROLL STATE
   ───────────────────────────────────────── */
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  ScrollTrigger.create({
    start:       'top+=60 top',
    onEnter:     () => nav.classList.add('scrolled'),
    onLeaveBack: () => nav.classList.remove('scrolled')
  });
}

/* ─────────────────────────────────────────
   14. HEADING WORD REVEAL
   ───────────────────────────────────────── */
function initHeadingReveal() {
  if (prefersReduced) return;

  document.querySelectorAll('.sec h2, .section-inner h2').forEach(h2 => {
    const text = h2.innerHTML;
    const wrapped = text.replace(/(<[^>]+>)|([\w,.!?'"À-ɏ$%+]+)/g, (match, tag, word) => {
      if (tag) return tag;
      return '<span class="word-wrap" style="display:inline-block;overflow:hidden;vertical-align:bottom"><span class="word" style="display:inline-block">' + word + '</span></span>';
    });
    h2.innerHTML = wrapped;

    const words = h2.querySelectorAll('.word');
    if (!words.length) return;

    gsap.set(words, { y: '110%', autoAlpha: 0 });

    ScrollTrigger.create({
      trigger: h2,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(words, {
          y: '0%', autoAlpha: 1,
          duration: 0.75, ease: 'power4.out', stagger: 0.04
        });
      }
    });
  });
}

/* ─────────────────────────────────────────
   15. PRICING REVEAL
   ───────────────────────────────────────── */
function initPricingReveal() {
  if (prefersReduced) return;

  const cards = document.querySelectorAll('.plan');
  if (!cards.length) return;

  gsap.set(cards, { autoAlpha: 0, y: 50 });

  ScrollTrigger.create({
    trigger: '.pricing-grid',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.to(cards, {
        autoAlpha: 1, y: 0,
        duration: 0.85, ease: 'power3.out', stagger: 0.14
      });
    }
  });
}

/* ─────────────────────────────────────────
   16. AUDIT REVEALS
   ───────────────────────────────────────── */
function initAuditReveals() {
  if (prefersReduced) {
    gsap.set('.reveal', { autoAlpha: 1, y: 0 });
    return;
  }

  document.querySelectorAll('.reveal').forEach(el => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(el, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out' });
      }
    });
  });
}

/* ─────────────────────────────────────────
   17. GALLERY HOVER
   ───────────────────────────────────────── */
function initGalleryHover() {
  document.querySelectorAll('[style*="overflow:hidden"] img[loading="lazy"]').forEach(img => {
    const wrap = img.parentElement;
    if (!wrap) return;
    wrap.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.05, filter: 'brightness(.95)', duration: 0.8, ease: 'power3.out' });
    });
    wrap.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, filter: 'brightness(.75)', duration: 0.8, ease: 'power3.out' });
    });
  });
}

/* ─────────────────────────────────────────
   NEW: V2 ENHANCEMENTS
   ───────────────────────────────────────── */

// Ripple effect (from lib/ripple.js)
function initRippleEffect() {
  const rippleElements = document.querySelectorAll(
    '.btn-primary, .btn-gold, .nav-cta, .btn-ghost, .btn-outline'
  );

  rippleElements.forEach((el) => {
    el.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';

      this.appendChild(ripple);

      if (typeof gsap !== 'undefined') {
        const size = Math.max(rect.width, rect.height) * 2;

        gsap.set(ripple, {
          width: 0,
          height: 0,
          opacity: 0.8,
        });

        gsap.to(ripple, {
          width: size,
          height: size,
          opacity: 0,
          duration: 0.6,
          ease: 'expo.out',
          onComplete: () => {
            ripple.remove();
          },
        });
      }
    });
  });
}

// Scroll progress bar (from lib/scroll-progress.js)
function initScrollProgress() {
  if (prefersReduced) return;

  let progressBar = document.getElementById('scroll-progress');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(
        90deg,
        #c9a97e 0%,
        #e8cfa0 50%,
        #a07c4f 100%
      );
      transform-origin: left;
      transform: scaleX(0);
      z-index: 999;
      pointer-events: none;
    `;
    document.body.appendChild(progressBar);
  }

  window.addEventListener(
    'scroll',
    () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

      progressBar.style.transform = `scaleX(${progress})`;
    },
    { passive: true }
  );
}

// Blur effects (from lib/blur-effects.js)
function initBlurEffects() {
  if (prefersReduced) return;

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return;
  }

  const heroSub = document.querySelector('.hero-sub');
  if (heroSub) {
    const hero = document.getElementById('hero');
    if (hero) {
      ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: 'bottom center',
        onUpdate: (self) => {
          const progress = self.progress;
          const blur = progress * 8;
          const opacity = 1 - progress * 0.8;

          gsap.set(heroSub, {
            filter: `blur(${blur}px)`,
            opacity: opacity,
          });
        },
      });
    }
  }

  const heroBtns = document.querySelector('.hero-btns');
  if (heroBtns) {
    const hero = document.getElementById('hero');
    if (hero) {
      ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: 'bottom center',
        onUpdate: (self) => {
          const progress = self.progress;
          const opacity = Math.max(0, 1 - progress * 1.2);

          gsap.set(heroBtns, {
            opacity: opacity,
            pointerEvents: opacity < 0.1 ? 'none' : 'auto',
          });
        },
      });
    }
  }
}

/* ─────────────────────────────────────────
   INIT — RUN EVERYTHING
   ───────────────────────────────────────── */
function init() {
  // Original animations
  initLenis();
  initNav();
  initCursor();
  initScrollReveals();
  initAuditReveals();
  initParallax();
  initCounters();
  initImageReveals();
  initMagneticButtons();
  initHeadingReveal();
  initPricingReveal();
  initGalleryHover();

  // Hero-specific
  initHero();
  initHeroMouseParallax();
  initHeroScrollExit();
  initHeroBgScroll();

  // NEW v2 enhancements
  initRippleEffect();
  initScrollProgress();
  initBlurEffects();

  // Loader
  const loader = document.getElementById('loader');
  if (loader) {
    document.body.style.overflow = 'hidden';
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.classList.add('loaded');
        document.body.style.overflow = '';
      }
    });
    tl.fromTo('#loader-logo', { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.8 });
    tl.fromTo('#loader-line', { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: 'expo.out', transformOrigin: 'left center' }, '-=0.2');
    tl.to('#loader-logo', { autoAlpha: 0, y: -12, duration: 0.5 }, '+=0.3');
    tl.to('#loader-line', { scaleX: 0, duration: 0.4, transformOrigin: 'right center' }, '-=0.4');
    tl.to(loader, { autoAlpha: 0, duration: 0.5, onComplete: () => { loader.style.display = 'none'; } }, '-=0.1');
  } else {
    document.body.classList.add('loaded');
  }

  console.log('✨ 303 Creative Studio — Animation System v2.5 initialized');
}

// Wait for DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
