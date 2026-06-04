/* Global Section Fade Effect - Smooth fade in/out for all sections */
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section, .contact, footer');

  if (!sections.length) return;

  const apply = () => {
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const sectionCenter = rect.top + rect.height / 2;
      const distanceFromCenter = sectionCenter - viewportCenter;

      // Normalize distance: -viewportCenter (top of viewport) to +viewportCenter (bottom)
      const normalizedDistance = Math.max(-1, Math.min(1,
        distanceFromCenter / (window.innerHeight / 2)
      ));

      // Calculate opacity:
      // 1 when section center is at viewport center (normalizedDistance = 0)
      // 0 when far from viewport (normalizedDistance = ±1)
      const opacity = Math.max(0, 1 - Math.abs(normalizedDistance));

      // Calculate scale: grows as section approaches viewport center
      const scale = 0.95 + (opacity * 0.05); // 0.95 to 1.0

      // Apply styles with GPU acceleration
      section.style.opacity = opacity.toFixed(3);
      section.style.transform = `scale(${scale.toFixed(3)})`;
      section.style.willChange = 'opacity, transform';
      section.style.transformOrigin = 'center';
    });
  };

  const onScroll = () => {
    requestAnimationFrame(apply);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  apply(); // Initial state

  // Cleanup
  window.addEventListener('unload', () => {
    window.removeEventListener('scroll', onScroll);
  });
});
