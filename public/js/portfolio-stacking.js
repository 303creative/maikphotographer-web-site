/* Portfolio Carousel Effect - Scroll-based photo rotation */
document.addEventListener('DOMContentLoaded', function() {
  const portfolioSection = document.querySelector('#portfolio');
  const items = document.querySelectorAll('.port-item');

  if (!items.length) return;

  const itemsArray = Array.from(items);
  const totalItems = itemsArray.length;
  const visibleItems = 3;

  const apply = () => {
    // Get portfolio section position
    const sectionRect = portfolioSection.getBoundingClientRect();
    const sectionTop = sectionRect.top;
    const sectionHeight = sectionRect.height;
    const windowHeight = window.innerHeight;

    // Calculate scroll progress through section (0 to 1)
    const scrollProgress = Math.max(0, Math.min(1,
      (windowHeight / 2 - sectionTop) / sectionHeight
    ));

    // Calculate which group of 3 we should show
    // Total groups = (totalItems - visibleItems + 1)
    const maxIndex = totalItems - visibleItems;
    const currentIndex = Math.round(scrollProgress * maxIndex);

    itemsArray.forEach((item, i) => {
      // Check if item is in the visible range
      const isVisible = i >= currentIndex && i < currentIndex + visibleItems;

      if (isVisible) {
        // Calculate position within visible group (0, 1, or 2)
        const positionInGroup = i - currentIndex;

        // Fade in
        item.style.opacity = '1';
        item.style.transform = 'scale(1) translateX(0)';
      } else {
        // Fade out
        item.style.opacity = '0';
        item.style.transform = 'scale(0.95)';
      }
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
