/* Portfolio Stacking Effect — Scroll-based card animation */
document.addEventListener('DOMContentLoaded', function() {
  const portfolioGrid = document.querySelector('.portfolio-grid');
  const items = document.querySelectorAll('.port-item');

  if (!items.length) return;

  let raf = null;
  const pinTop = 120;
  const itemsArray = Array.from(items);
  const n = itemsArray.length;

  const apply = () => {
    raf = null;
    itemsArray.forEach((item, i) => {
      const rect = item.getBoundingClientRect();
      const target = 1 - (n - 1 - i) * 0.05;
      const prog = Math.min(Math.max((pinTop - rect.top) / (rect.height * 0.7), 0), 1);
      const scale = 1 - (1 - target) * prog;

      item.style.transform = "scale(" + scale.toFixed(4) + ")";
      item.style.filter = "brightness(" + (1 - 0.22 * prog).toFixed(3) + ")";
    });
  };

  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(apply);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  apply();

  // Cleanup
  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    if (raf) cancelAnimationFrame(raf);
  };
});
