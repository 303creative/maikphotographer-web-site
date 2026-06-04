/* Portfolio Carousel Effect - Groups of 3 appear/disappear together */
document.addEventListener('DOMContentLoaded', function() {
  const portfolioSection = document.querySelector('#portfolio');
  const items = document.querySelectorAll('.port-item');

  if (!items.length) return;

  const itemsArray = Array.from(items);
  const totalItems = itemsArray.length;
  const groupSize = 3; // Show 3 photos at a time
  const totalGroups = Math.ceil(totalItems / groupSize);

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

    // Calculate which group we're in (0, 1, 2, etc.)
    const currentGroup = Math.floor(scrollProgress * totalGroups);
    const groupStartIndex = currentGroup * groupSize;

    itemsArray.forEach((item, i) => {
      // Check if item is in the current visible group
      const isVisible = i >= groupStartIndex && i < groupStartIndex + groupSize;

      if (isVisible) {
        // Fade in - fully visible
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
      } else {
        // Fade out - hidden
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
