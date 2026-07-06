(function () {
  const categoryFilter = document.getElementById('bentoCategoryFilter');
  const items = document.querySelectorAll('.bento-award-item[data-category]');

  if (!categoryFilter || !items.length) return;

  function applyFilter() {
    const category = categoryFilter.value;

    items.forEach((item) => {
      item.hidden = category !== 'all' && item.dataset.category !== category;
    });
  }

  categoryFilter.addEventListener('change', applyFilter);
})();
