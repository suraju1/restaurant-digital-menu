/**
 * QR Digital Menu - Menu & Category Renderer
 * Renders categories and food cards matching screenshots 1 & 2.
 */
const MenuRenderer = (function () {
  'use strict';

  /**
   * Render category filter pills
   * @param {Array<Object>} categories 
   * @param {string} activeCategoryId 
   * @param {Function} onSelectCategory 
   */
  function renderCategories(categories, activeCategoryId, onSelectCategory) {
    const container = document.getElementById('categories-container');
    if (!container) return;

    container.innerHTML = '';

    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `category-pill ${cat.id === activeCategoryId ? 'active' : ''}`;
      btn.setAttribute('data-category-id', cat.id);
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', cat.id === activeCategoryId ? 'true' : 'false');
      btn.id = `category-tab-${cat.id}`;

      let iconHtml = '';
      if (cat.id === 'all') {
        iconHtml = '<span class="category-icon-star" aria-hidden="true">✱</span>';
      } else if (cat.icon === 'coffee') {
        iconHtml = '<span class="category-icon-emoji" aria-hidden="true">☕</span>';
      } else if (cat.icon === 'gift' || cat.icon === 'combo') {
        iconHtml = '<span class="category-icon-emoji" aria-hidden="true">🍱</span>';
      } else {
        iconHtml = '<span class="category-icon-dot" aria-hidden="true"></span>';
      }

      btn.innerHTML = `${iconHtml}<span>${MenuUtils.escapeHtml(cat.name)}</span>`;

      btn.addEventListener('click', () => {
        if (typeof onSelectCategory === 'function') {
          onSelectCategory(cat.id);
        }
      });

      container.appendChild(btn);
    });
  }

  /**
   * Render list of menu cards
   * @param {Array<Object>} items 
   * @param {Object} cartInstance 
   * @param {string} [activeCategoryName]
   */
  function renderMenuItems(items, cartInstance, activeCategoryName = '') {
    const grid = document.getElementById('menu-items-grid');
    if (!grid) return;

    if (!items || items.length === 0) {
      grid.innerHTML = `
        <div class="empty-results">
          <span class="empty-results-icon" aria-hidden="true">🔍</span>
          <p class="card-title">No items found</p>
          <p class="card-description">Try searching for something else or reset your category filter.</p>
          <button type="button" class="btn-reset-filter" id="btn-reset-search">View All Items</button>
        </div>
      `;
      const resetBtn = document.getElementById('btn-reset-search');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          window.dispatchEvent(new CustomEvent('menu:reset-filter'));
        });
      }
      return;
    }

    grid.innerHTML = '';

    items.forEach(item => {
      const card = createItemCard(item, cartInstance, activeCategoryName);
      grid.appendChild(card);
    });
  }

  /**
   * Create an individual Food Card DOM Element
   */
  function createItemCard(item, cartInstance, activeCategoryName) {
    const card = document.createElement('article');
    card.className = `menu-card ${item.available ? '' : 'unavailable'}`;
    card.id = `item-card-${item.id}`;
    card.setAttribute('data-item-id', item.id);
    card.setAttribute('data-category-id', item.categoryId);

    const formattedPrice = MenuUtils.formatCurrency(item.price);
    const currentQty = cartInstance ? cartInstance.getItemQty(item.id) : 0;
    const displayQty = currentQty > 0 ? currentQty : 1;

    // Category label for the badge
    const categoryLabel = (item.categoryId || 'SPECIAL').toUpperCase();

    card.innerHTML = `
      <div class="card-media">
        <span class="badge-category">${MenuUtils.escapeHtml(categoryLabel)}</span>
        <span class="badge-price">${formattedPrice}</span>
        <img 
          src="${MenuUtils.escapeHtml(item.image)}" 
          alt="${MenuUtils.escapeHtml(item.name)}" 
          class="card-image"
          loading="lazy"
          onerror="this.onerror=null; this.src='assets/shared/food-fallback.webp';"
        />
      </div>
      <div class="card-body">
        <h2 class="card-title">${MenuUtils.escapeHtml(item.name)}</h2>
        ${item.nameMr ? `<div class="card-title-mr marathi-text">${MenuUtils.escapeHtml(item.nameMr)}</div>` : ''}
        <p class="card-description">${MenuUtils.escapeHtml(item.description)}</p>
        
        <div class="card-actions">
          <div class="quantity-pill-group" id="qty-group-${item.id}">
            <button 
              type="button" 
              class="qty-btn btn-minus" 
              data-id="${item.id}"
              aria-label="Decrease quantity of ${MenuUtils.escapeHtml(item.name)}"
              ${!item.available ? 'disabled' : ''}
            >−</button>
            <span class="qty-number" id="qty-val-${item.id}">${displayQty}</span>
            <button 
              type="button" 
              class="qty-btn btn-plus" 
              data-id="${item.id}"
              aria-label="Increase quantity of ${MenuUtils.escapeHtml(item.name)}"
              ${!item.available ? 'disabled' : ''}
            >+</button>
          </div>

          <button 
            type="button" 
            class="btn-add" 
            data-id="${item.id}"
            aria-label="Add ${MenuUtils.escapeHtml(item.name)} to cart"
            ${!item.available ? 'disabled' : ''}
          >
            <span class="btn-add-icon" aria-hidden="true">+</span>
            <span>Add</span>
          </button>
        </div>
      </div>
    `;

    // Attach card event listeners
    const qtySpan = card.querySelector(`#qty-val-${item.id}`);
    const minusBtn = card.querySelector('.btn-minus');
    const plusBtn = card.querySelector('.btn-plus');
    const addBtn = card.querySelector('.btn-add');

    if (item.available) {
      plusBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        let val = parseInt(qtySpan.textContent, 10) || 1;
        val += 1;
        qtySpan.textContent = val;
        if (cartInstance && cartInstance.getItemQty(item.id) > 0) {
          cartInstance.updateQty(item.id, val);
        }
      });

      minusBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        let val = parseInt(qtySpan.textContent, 10) || 1;
        if (val > 1) {
          val -= 1;
          qtySpan.textContent = val;
          if (cartInstance && cartInstance.getItemQty(item.id) > 0) {
            cartInstance.updateQty(item.id, val);
          }
        } else if (val === 1 && cartInstance && cartInstance.getItemQty(item.id) > 0) {
          cartInstance.removeItem(item.id);
          MenuUtils.showToast(`Removed ${item.name} from cart`);
        }
      });

      addBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const selectedQty = parseInt(qtySpan.textContent, 10) || 1;
        if (cartInstance) {
          cartInstance.addItem(item, selectedQty);
          MenuUtils.showToast(`Added ${selectedQty} × ${item.name} to cart`);
        }
      });
    }

    return card;
  }

  /**
   * Synchronize all visible card quantity counters with current cart
   * @param {Object} cartInstance 
   */
  function syncCardQuantities(cartInstance) {
    if (!cartInstance) return;
    const cards = document.querySelectorAll('.menu-card');
    cards.forEach(card => {
      const itemId = card.getAttribute('data-item-id');
      const qty = cartInstance.getItemQty(itemId);
      const qtySpan = card.querySelector(`#qty-val-${itemId}`);
      if (qtySpan) {
        qtySpan.textContent = qty > 0 ? qty : 1;
      }
    });
  }

  return {
    renderCategories,
    renderMenuItems,
    syncCardQuantities
  };
})();
