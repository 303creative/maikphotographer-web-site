/**
 * Scroll Progress Bar Module
 * Barra que indica el progreso de scroll en la página
 * Usa ::before del body
 */

function initScrollProgress() {
  // Verificar si prefers-reduced-motion está activado
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  // Crear pseudo-elemento si no existe
  let progressBar = document.querySelector('body::before');
  if (!progressBar) {
    // El ::before ya está en CSS, solo necesitamos actualizar su scale
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

  // Actualizar progreso en cada scroll
  window.addEventListener(
    'scroll',
    () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

      if (typeof gsap !== 'undefined') {
        gsap.to('body::before, #scroll-progress', {
          '--progress': progress,
          duration: 0.1,
          ease: 'none',
        });

        // Update transform directamente en el elemento
        const element = document.getElementById('scroll-progress');
        if (element) {
          element.style.transform = `scaleX(${progress})`;
        }
      } else {
        // Fallback sin GSAP
        const element = document.getElementById('scroll-progress');
        if (element) {
          element.style.transform = `scaleX(${progress})`;
        }
      }
    },
    { passive: true }
  );

  // Opcional: mostrar label del progreso en porcentaje
  const showLabel = false; // Cambiar a true para ver %

  if (showLabel) {
    const label = document.createElement('div');
    label.id = 'scroll-progress-label';
    label.style.cssText = `
      position: fixed;
      top: 12px;
      right: 20px;
      font-size: 11px;
      color: #c9a97e;
      z-index: 998;
      opacity: 0;
      transition: opacity 0.3s ease;
      font-family: 'Barlow Condensed', sans-serif;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    `;
    document.body.appendChild(label);

    window.addEventListener(
      'scroll',
      () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const percent = Math.round(
          scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0
        );

        label.textContent = `${percent}%`;
        label.style.opacity = scrollTop > 100 ? '0.7' : '0';
      },
      { passive: true }
    );
  }
}

// Exportar para usar en otros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = initScrollProgress;
}
