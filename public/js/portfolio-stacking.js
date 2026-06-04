/* Portfolio Scroll-Triggered Appearance Effect */
document.addEventListener('DOMContentLoaded', function() {
  const items = document.querySelectorAll('.port-item');

  if (!items.length) return;

  let raf = null;
  const itemsArray = Array.from(items);
  const itemsPerGroup = 3;
  const totalGroups = Math.ceil(itemsArray.length / itemsPerGroup);

  const apply = () => {
    raf = null;

    itemsArray.forEach((item, i) => {
      const rect = item.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const distanceFromCenter = rect.top - viewportCenter;

      // Range: -viewportCenter (fully above) to +viewportCenter (fully below)
      // We want items visible when in viewport
      const normalizedDistance = Math.max(-1, Math.min(1, distanceFromCenter / (window.innerHeight / 2)));

      // Calculate opacity:
      // 1 when at center (normalizedDistance = 0)
      // 0 when off screen (normalizedDistance = ±1)
      const opacity = 1 - Math.abs(normalizedDistance);

      // Calculate scale: grows as it approaches center
      const scale = 0.8 + (1 - Math.abs(normalizedDistance)) * 0.2;

      item.style.opacity = opacity.toFixed(3);
      item.style.transform = `scale(${scale.toFixed(3)})`;
    });
  };

  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(apply);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  apply();

  // Cleanup on unload
  window.addEventListener('unload', () => {
    window.removeEventListener('scroll', onScroll);
    if (raf) cancelAnimationFrame(raf);
  });
});
