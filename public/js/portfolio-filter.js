/* Portfolio Filter — Show/hide items based on category */
document.addEventListener('DOMContentLoaded', function() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.port-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // Filter items
      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
          }, 10);
        } else {
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
});
