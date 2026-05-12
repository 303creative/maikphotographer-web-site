/**
 * Ripple Effect Module
 * Crea efecto ripple (onda) al clickear en botones
 * Compatible con GSAP
 */

function initRippleEffect() {
  const rippleElements = document.querySelectorAll(
    '.btn-primary, .btn-gold, .nav-cta, .btn-ghost, .btn-outline'
  );

  rippleElements.forEach((el) => {
    el.addEventListener('click', function (e) {
      // Obtener posición del click relativa al elemento
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Crear elemento ripple
      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';

      // Agregar al botón
      this.appendChild(ripple);

      // Animar con GSAP si está disponible
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
      } else {
        // Fallback CSS animation si GSAP no está disponible
        ripple.style.width = Math.max(rect.width, rect.height) * 2 + 'px';
        ripple.style.height = Math.max(rect.width, rect.height) * 2 + 'px';
        ripple.style.animation = 'rippleKeyframe 0.6s ease-out forwards';

        setTimeout(() => ripple.remove(), 600);
      }
    });
  });

  // También agregar ripple al enter de teclado (accesibilidad)
  rippleElements.forEach((el) => {
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        const event = new MouseEvent('click', {
          bubbles: true,
          clientX: el.getBoundingClientRect().left + el.offsetWidth / 2,
          clientY: el.getBoundingClientRect().top + el.offsetHeight / 2,
        });
        this.dispatchEvent(event);
      }
    });
  });
}

// Exportar para usar en otros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = initRippleEffect;
}
