/* ═══ MAIN.JS — maikphotographer.com ═══ */
'use strict';

gsap.registerPlugin(ScrollTrigger);

/* ─── PRELOADER ─── */
(function() {
  const pre = document.getElementById('preloader');
  if (!pre) return;
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    pre.classList.add('done');
    setTimeout(() => {
      pre.remove();
      document.body.style.overflow = '';
      ScrollTrigger.refresh();
      initAnimations();
    }, 650);
  }, 1800);
})();

/* ─── CURSOR ─── */
(function() {
  if (window.innerWidth <= 768) return;
  const cur = document.querySelector('.cursor');
  const fol = document.querySelector('.cursor-follower');
  if (!cur || !fol) return;

  document.addEventListener('mousemove', e => {
    cur.style.left = e.clientX + 'px';
    cur.style.top = e.clientY + 'px';
    fol.style.left = e.clientX + 'px';
    fol.style.top = e.clientY + 'px';
  });

  document.querySelectorAll('a, button, .btn, img, .port-item').forEach(el => {
    el.addEventListener('mouseenter', () =>
      fol.classList.add('hovered'));
    el.addEventListener('mouseleave', () =>
      fol.classList.remove('hovered'));
  });
})();

/* ─── NAV HAMBURGER ─── */
(function() {
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.getElementById('nav-mobile');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    mobileMenu.setAttribute('aria-hidden', !isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });
})();

/* ─── NAV HIDE ON SCROLL ─── */
(function() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > lastY && y > 150) {
      nav.classList.add('scrolled-down');
    } else {
      nav.classList.remove('scrolled-down');
    }
    lastY = y;
  }, { passive: true });
})();

/* ─── LENIS SMOOTH SCROLL (Fluido, sin lag) ─── */
let lenis;
(function() {
  if (typeof Lenis === 'undefined') return;
  lenis = new Lenis({
    duration: 1.0,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothTouch: false,
    wheelMultiplier: 1,
    touchMultiplier: 1.5
  });
  gsap.ticker.add(time => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.on('scroll', ScrollTrigger.update);
})();

/* ─── PORTFOLIO FILTER ─── */
(function() {
  const filters = document.querySelectorAll('.port-filter');
  const items = document.querySelectorAll('.port-item');
  if (!filters.length) return;

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      items.forEach(item => {
        const show = filter === 'all' || item.dataset.cat === filter;
        gsap.to(item, {
          opacity: show ? 1 : 0.15,
          scale: show ? 1 : 0.95,
          duration: 0.35,
          ease: 'power2.out'
        });
        item.style.pointerEvents = show ? 'auto' : 'none';
      });
    });
  });
})();

/* ─── FORMULARIO ─── */
(function() {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        form.style.display = 'none';
        if (success) success.style.display = 'block';
      } else {
        throw new Error('Server error');
      }
    } catch(err) {
      console.error(err);
      btn.textContent = 'Error — try WhatsApp';
      btn.disabled = false;
      setTimeout(() => {
        btn.textContent = originalText;
      }, 3000);
    }
  });
})();

/* ─── ANIMACIONES (después del preloader) ─── */
function initAnimations() {

  /* Hero title letra por letra */
  if (typeof SplitType !== 'undefined') {
    const ht = document.querySelector('.hero-title');
    if (ht) {
      const split = new SplitType(ht, { types: 'chars' });
      gsap.fromTo(split.chars,
        { y: 80, opacity: 0, rotateX: -90, transformOrigin: '0 50% -30px' },
        { y: 0, opacity: 1, rotateX: 0,
          duration: 0.9, stagger: 0.015,
          ease: 'power4.out', delay: 0.1 }
      );
    }
  }

  /* Hero badge y sub */
  gsap.fromTo('.hero-badge',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6,
      ease: 'power3.out', delay: 0.2 }
  );
  gsap.fromTo('.hero-sub, .hero-ctas, .hero-proof',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6,
      stagger: 0.1, ease: 'power3.out', delay: 0.8 }
  );

  /* Hero parallax */
  gsap.to('.hero-title', {
    yPercent: -30, opacity: 0, ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: '35% top',
      scrub: true
    }
  });

  /* Scroll video 3D */
  const sv = document.getElementById('scroll-cam');
  if (sv) {
    const initScrub = () => {
      gsap.to(sv, {
        currentTime: sv.duration,
        ease: 'none',
        scrollTrigger: {
          trigger: '.scroll-vid-section',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5
        }
      });
    };
    sv.readyState >= 1
      ? initScrub()
      : sv.addEventListener('loadedmetadata', initScrub);
  }

  /* Títulos H2 letra por letra */
  if (typeof SplitType !== 'undefined') {
    document.querySelectorAll('h2').forEach(el => {
      const s = new SplitType(el, { types: 'chars' });
      gsap.fromTo(s.chars,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1,
          duration: 0.6, stagger: 0.018,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el, start: 'top 88%'
          }
        }
      );
    });
  }

  /* Portfolio reveal (cortina) */
  gsap.utils.toArray('.port-reveal').forEach(mask => {
    gsap.to(mask, {
      scaleX: 0,
      duration: 1.2,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: mask.closest('.port-item'),
        start: 'top 82%', once: true
      }
    });
  });

  /* Portfolio stagger */
  gsap.fromTo('.port-item',
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1,
      duration: 0.8, stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.port-grid', start: 'top 80%'
      }
    }
  );

  /* Stats counter */
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.count);
    const obj = { n: 0 };
    gsap.to(obj, {
      n: target, duration: 2.5, ease: 'power2.out',
      onUpdate: () => { el.textContent = Math.round(obj.n); },
      scrollTrigger: {
        trigger: el, start: 'top 85%', once: true
      }
    });
  });

  /* About firma */
  const firma = document.querySelector('.about-firma img');
  if (firma) {
    gsap.fromTo(firma,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 0.6,
        duration: 1.2, ease: 'power3.out',
        scrollTrigger: {
          trigger: firma, start: 'top 85%'
        }
      }
    );
  }

  /* Servicios stagger */
  gsap.fromTo('.svc-card',
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1,
      duration: 0.8, stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.svc-grid', start: 'top 80%'
      }
    }
  );

  /* Button press */
  document.querySelectorAll('.btn, button').forEach(btn => {
    btn.addEventListener('mousedown', () =>
      gsap.to(btn, {
        scale: 0.97, duration: 0.08, ease: 'power2.out'
      }));
    ['mouseup','mouseleave'].forEach(e =>
      btn.addEventListener(e, () =>
        gsap.to(btn, {
          scale: 1, duration: 0.15, ease: 'back.out(2)'
        })));
  });

  /* Magnetic buttons */
  if (window.innerWidth > 768) {
    document.querySelectorAll('.btn-primary').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        gsap.to(btn, {
          x: (e.clientX - r.left - r.width/2) * 0.25,
          y: (e.clientY - r.top - r.height/2) * 0.25,
          duration: 0.4, ease: 'power2.out'
        });
      });
      btn.addEventListener('mouseleave', () =>
        gsap.to(btn, {
          x: 0, y: 0, duration: 0.5,
          ease: 'elastic.out(1, 0.5)'
        })
      );
    });
  }

  ScrollTrigger.refresh();
}

/* Si no hay preloader, iniciar de inmediato */
if (!document.getElementById('preloader')) {
  initAnimations();
}
