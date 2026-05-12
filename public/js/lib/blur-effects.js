/**
 * Blur Effects Module
 * Aplica blur y fade effects basados en posición de scroll
 * Principalmente en hero text y elementos que salen del viewport
 */

function initBlurEffects() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('Blur effects require GSAP and ScrollTrigger');
    return;
  }

  // 1. Hero sub text: blur & fade on scroll out
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

  // 2. Hero buttons: fade out on scroll
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

  // 3. Opcionalmente: blur en secciones que se acercan
  // Esto crea un efecto de "las secciones llegan borrosas y se aclaran"
  const blurSections = document.querySelectorAll('.sec, section');
  blurSections.forEach((section) => {
    // Initial state: ligeramente blurrado
    gsap.set(section, {
      filter: 'blur(0px)',
    });

    // Animation on enter
    ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(section, {
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power2.out',
        });
      },
    });
  });

  // 4. Images: blur effect on hover (subtle)
  const images = document.querySelectorAll('.case-img img, .about-visual img');
  images.forEach((img) => {
    img.addEventListener('mouseenter', function () {
      gsap.to(this, {
        filter: 'blur(0px)',
        duration: 0.4,
        ease: 'power2.out',
      });
    });

    img.addEventListener('mouseleave', function () {
      gsap.to(this, {
        filter: 'blur(0px)',
        duration: 0.6,
        ease: 'power2.out',
      });
    });
  });
}

// Exportar para usar en otros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = initBlurEffects;
}
