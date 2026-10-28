/**
 * QR Digital Menu - Search and Category Filter Controller
 * Handles live search across English and Marathi names, category selection, and reset.
 */
const SearchFilter = (function () {
  'use strict';

  let currentItems = [];
  let activeCategoryId = 'all';
  let searchQuery = '';
  let cartInstance = null;

  /**
   * Initialize search and filter listeners
   * @param {Array<Object>} items 
   * @param {Object} cart 
   */
  function init(items, cart) {
    currentItems = items || [];
    cartInstance = cart;
    activeCategoryId = 'all';
    searchQuery = '';

    const searchInput = document.getElementById('search-input');
    const searchForm = document.getElementById('search-form');
    const clearBtn = document.getElementById('search-clear-btn');

    if (searchInput) {
      searchInput.value = '';
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        if (clearBtn) {
          if (searchQuery.length > 0) {
            clearBtn.classList.add('visible');
          } else {
            clearBtn.classList.remove('visible');
          }
        }
        applyFilters();
      });
    }

    if (searchForm) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        applyFilters();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          searchInput.focus();
        }
        clearBtn.classList.remove('visible');
        searchQuery = '';
        applyFilters();
      });
    }

    // Custom event to reset filters from empty-state
    window.addEventListener('menu:reset-filter', () => {
      reset();
    });
  }

  /**
   * Select a category filter
   * @param {string} categoryId 
   */
  function selectCategory(categoryId) {
    activeCategoryId = categoryId;

    // Update active class on pills
    const pills = document.querySelectorAll('.category-pill');
    pills.forEach(pill => {
      const isSelected = pill.getAttribute('data-category-id') === categoryId;
      pill.classList.toggle('active', isSelected);
      pill.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });

    applyFilters();
  }

  /**
   * Apply category and search query filters to item list
   */
  function applyFilters() {
    const q = searchQuery.toLowerCase();

    const filtered = currentItems.filter(item => {
      // 1. Category check
      const matchesCategory = activeCategoryId === 'all' || item.categoryId === activeCategoryId;
      if (!matchesCategory) return false;

      // 2. Search query check
      if (!q) return true;

      const nameMatch = item.name && item.name.toLowerCase().includes(q);
      const nameMrMatch = item.nameMr && item.nameMr.toLowerCase().includes(q);
      const descMatch = item.description && item.description.toLowerCase().includes(q);
      const descMrMatch = item.descriptionMr && item.descriptionMr.toLowerCase().includes(q);

      return nameMatch || nameMrMatch || descMatch || descMrMatch;
    });

    MenuRenderer.renderMenuItems(filtered, cartInstance);
  }

  /**
   * Reset all filters to default
   */
  function reset() {
    activeCategoryId = 'all';
    searchQuery = '';
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';
    const clearBtn = document.getElementById('search-clear-btn');
    if (clearBtn) clearBtn.classList.remove('visible');

    const pills = document.querySelectorAll('.category-pill');
    pills.forEach(pill => {
      const isAll = pill.getAttribute('data-category-id') === 'all';
      pill.classList.toggle('active', isAll);
      pill.setAttribute('aria-selected', isAll ? 'true' : 'false');
    });

    applyFilters();
  }

  return {
    init,
    selectCategory,
    applyFilters,
    reset
  };
})();
