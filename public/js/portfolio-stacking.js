/* Portfolio Carousel Effect - Smooth fade between groups of 3 */
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

    // Calculate position within all groups
    // Multiply by totalGroups to get float value showing which group we're approaching
    const groupPosition = scrollProgress * totalGroups;
    const currentGroup = Math.floor(groupPosition);
    const groupTransition = groupPosition - currentGroup; // 0 to 1 within current group

    itemsArray.forEach((item, i) => {
      const itemGroup = Math.floor(i / groupSize);
      let opacity = 0;
      let scale = 0.95;

      // If item is in current group
      if (itemGroup === currentGroup) {
        // Fade out as we progress to next group
        opacity = 1 - groupTransition;
        scale = 1 - (groupTransition * 0.05); // Slight scale down as it fades
      }
      // If item is in next group
      else if (itemGroup === currentGroup + 1) {
        // Fade in as we progress
        opacity = groupTransition;
        scale = 0.95 + (groupTransition * 0.05); // Slight scale up as it fades in
      }

      // Apply with easing
      item.style.opacity = Math.max(0, opacity).toFixed(3);
      item.style.transform = `scale(${scale.toFixed(3)})`;
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
