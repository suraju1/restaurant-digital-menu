/**
 * QR Digital Menu - Shopping Cart & Order Checkout Drawer
 * Manages restaurant-isolated cart state, line calculations, modal interactions,
 * and order preferences matching Screenshot 3.
 */
class RestaurantCart {
  constructor(restaurant, initialTable = null, isTableValid = false) {
    this.restaurant = restaurant;
    this.slug = restaurant.slug;
    this.tableNumber = initialTable;
    this.isTableValid = isTableValid;
    
    // Default order type: if table is present, default to 'dine-in', otherwise 'takeaway'
    const supportedTypes = restaurant.enabledOrderTypes || ['dine-in', 'takeaway'];
    if (this.tableNumber && supportedTypes.includes('dine-in')) {
      this.orderType = 'dine-in';
    } else {
      this.orderType = supportedTypes[0] || 'takeaway';
    }

    // Load persisted cart from restaurant-isolated storage
    this.items = this.loadPersistedCart();

    this.initDom();
    this.updateUI();
  }

  loadPersistedCart() {
    const saved = MenuUtils.scopedStorage.get(this.slug, 'cart');
    if (Array.isArray(saved)) {
      // Validate saved items exist in current restaurant menu
      const validIds = new Map((this.restaurant.menuItems || []).map(i => [i.id, i]));
      return saved
        .filter(entry => validIds.has(entry.id) && validIds.get(entry.id).available)
        .map(entry => {
          const fresh = validIds.get(entry.id);
          return {
            id: fresh.id,
            name: fresh.name,
            nameMr: fresh.nameMr || '',
            price: fresh.price,
            image: fresh.image,
            quantity: Math.max(1, Math.round(Number(entry.quantity) || 1))
          };
        });
    }
    return [];
  }

  save() {
    MenuUtils.scopedStorage.set(this.slug, 'cart', this.items);
    this.updateUI();
    MenuRenderer.syncCardQuantities(this);
    window.dispatchEvent(new CustomEvent('cart:updated', { detail: { count: this.getTotalCount() } }));
  }

  addItem(item, quantity = 1) {
    if (!item || !item.available) return;
    const addQty = Math.max(1, Math.round(Number(quantity) || 1));
    const existing = this.items.find(i => i.id === item.id);

    if (existing) {
      existing.quantity += addQty;
    } else {
      this.items.push({
        id: item.id,
        name: item.name,
        nameMr: item.nameMr || '',
        price: item.price,
        image: item.image,
        quantity: addQty
      });
    }

    this.save();
  }

  updateQty(itemId, quantity) {
    const num = Math.round(Number(quantity) || 0);
    const index = this.items.findIndex(i => i.id === itemId);
    if (index === -1) return;

    if (num <= 0) {
      this.items.splice(index, 1);
    } else {
      this.items[index].quantity = num;
    }

    this.save();
  }

  removeItem(itemId) {
    this.updateQty(itemId, 0);
  }

  clear() {
    this.items = [];
    this.save();
  }

  getItemQty(itemId) {
    const found = this.items.find(i => i.id === itemId);
    return found ? found.quantity : 0;
  }

  getTotalCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  // ================= UI RENDERING & DOM ================= //

  initDom() {
    // Floating cart button
    const floatBtn = document.getElementById('floating-cart-btn');
    if (floatBtn) {
      floatBtn.addEventListener('click', () => this.openModal());
    }

    // Modal close button
    const closeBtn = document.getElementById('cart-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }

    // Modal backdrop click
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
      overlay.addEventListener('click', () => this.closeModal());
    }

    // Keyboard ESC listener
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });

    // Order Type pills
    this.renderOrderTypeSelector();

    // Table input listener
    const tableInput = document.getElementById('table-number-input');
    if (tableInput) {
      if (this.tableNumber) {
        tableInput.value = this.tableNumber;
      }
      tableInput.addEventListener('input', (e) => {
        this.tableNumber = e.target.value.trim();
        this.validateTableInput();
      });
    }

    // WhatsApp Checkout Button
    const checkoutBtn = document.getElementById('btn-whatsapp-order');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => this.handleCheckout());
    }
  }

  renderOrderTypeSelector() {
    const container = document.getElementById('order-types-grid');
    if (!container) return;

    const supported = this.restaurant.enabledOrderTypes || ['dine-in', 'takeaway'];
    container.innerHTML = '';

    const labels = {
      'dine-in': { label: 'Dine-in', icon: '🍽️' },
      'takeaway': { label: 'Takeaway', icon: '🏪' },
      'delivery': { label: 'Delivery', icon: '🚴' }
    };

    supported.forEach(type => {
      const info = labels[type] || { label: type, icon: '📦' };
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `order-type-btn ${this.orderType === type ? 'active' : ''}`;
      btn.setAttribute('data-type', type);
      btn.innerHTML = `<span aria-hidden="true">${info.icon}</span> <span>${info.label}</span>`;

      btn.addEventListener('click', () => {
        this.orderType = type;
        const allBtns = container.querySelectorAll('.order-type-btn');
        allBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-type') === type));
        this.toggleTableSectionVisibility();
      });

      container.appendChild(btn);
    });

    this.toggleTableSectionVisibility();
  }

  toggleTableSectionVisibility() {
    const tableSection = document.getElementById('table-number-section');
    if (tableSection) {
      if (this.orderType === 'dine-in') {
        tableSection.style.display = 'block';
      } else {
        tableSection.style.display = 'none';
      }
    }
  }

  validateTableInput() {
    const helper = document.getElementById('table-helper-text');
    if (!helper) return true;

    if (this.orderType !== 'dine-in') {
      helper.textContent = '';
      helper.className = 'table-helper-text';
      return true;
    }

    if (!this.tableNumber) {
      helper.textContent = 'Please enter your table number for dine-in service.';
      helper.className = 'table-helper-text warning';
      return false;
    }

    const isValid = RestaurantRegistry.isValidTable(this.slug, this.tableNumber);
    if (!isValid && this.restaurant.tables && this.restaurant.tables.length > 0) {
      helper.textContent = `Note: Table "${this.tableNumber}" was not found in restaurant setup (Available: ${this.restaurant.tables.slice(0, 6).join(', ')}...)`;
      helper.className = 'table-helper-text warning';
    } else {
      helper.textContent = 'Verified table number for direct table service.';
      helper.className = 'table-helper-text';
    }
    return true;
  }

  updateUI() {
    // 1. Update Floating Cart Button
    const floatBtn = document.getElementById('floating-cart-btn');
    const countBadge = document.getElementById('floating-cart-count');
    const totalCount = this.getTotalCount();

    if (floatBtn && countBadge) {
      countBadge.textContent = totalCount;
      if (totalCount > 0) {
        floatBtn.classList.remove('hidden');
      } else {
        floatBtn.classList.add('hidden');
      }
    }

    // 2. Update Cart Items List in Modal
    const itemsContainer = document.getElementById('cart-items-container');
    const totalDisplay = document.getElementById('cart-total-amount');

    if (totalDisplay) {
      totalDisplay.textContent = MenuUtils.formatCurrency(this.getSubtotal());
    }

    if (itemsContainer) {
      if (this.items.length === 0) {
        itemsContainer.innerHTML = `
          <div class="cart-empty-state">
            <span class="cart-empty-icon" aria-hidden="true">🛍️</span>
            <p class="cart-empty-text">Your cart is empty</p>
            <p class="cart-empty-subtext">Add delicious dishes from the menu to place your order.</p>
          </div>
        `;
        const checkoutBtn = document.getElementById('btn-whatsapp-order');
        if (checkoutBtn) checkoutBtn.disabled = true;
      } else {
        const checkoutBtn = document.getElementById('btn-whatsapp-order');
        if (checkoutBtn) checkoutBtn.disabled = false;

        itemsContainer.innerHTML = '';
        this.items.forEach(item => {
          const row = document.createElement('div');
          row.className = 'cart-item-card';

          const lineTotal = item.price * item.quantity;
          const calcText = `${MenuUtils.formatCurrency(item.price)} × ${item.quantity} = ${MenuUtils.formatCurrency(lineTotal)}`;

          row.innerHTML = `
            <div class="cart-item-left">
              <img 
                src="${MenuUtils.escapeHtml(item.image)}" 
                alt="${MenuUtils.escapeHtml(item.name)}" 
                class="cart-item-thumb"
                onerror="this.onerror=null; this.src='assets/shared/food-fallback.webp';"
              />
              <div class="cart-item-meta">
                <span class="cart-item-name">${MenuUtils.escapeHtml(item.name)}</span>
                ${item.nameMr ? `<span class="cart-item-name-mr marathi-text">${MenuUtils.escapeHtml(item.nameMr)}</span>` : ''}
                <span class="cart-item-calc">${calcText}</span>
              </div>
            </div>

            <div class="quantity-pill-group">
              <button type="button" class="qty-btn cart-qty-minus" data-id="${item.id}" aria-label="Decrease quantity">−</button>
              <span class="qty-number">${item.quantity}</span>
              <button type="button" class="qty-btn cart-qty-plus" data-id="${item.id}" aria-label="Increase quantity">+</button>
            </div>
          `;

          // Event listeners
          row.querySelector('.cart-qty-plus').addEventListener('click', () => {
            this.updateQty(item.id, item.quantity + 1);
          });

          row.querySelector('.cart-qty-minus').addEventListener('click', () => {
            this.updateQty(item.id, item.quantity - 1);
          });

          itemsContainer.appendChild(row);
        });
      }
    }
  }

  openModal() {
    this.updateUI();
    const overlay = document.getElementById('modal-overlay');
    const modal = document.getElementById('cart-modal');
    if (overlay && modal) {
      overlay.classList.add('active');
      modal.classList.add('active');
      document.body.classList.add('modal-open');
    }
  }

  closeModal() {
    const overlay = document.getElementById('modal-overlay');
    const modal = document.getElementById('cart-modal');
    if (overlay && modal) {
      overlay.classList.remove('active');
      modal.classList.remove('active');
      document.body.classList.remove('modal-open');
    }
  }

  handleCheckout() {
    if (this.items.length === 0) {
      MenuUtils.showToast('Your cart is empty! Please add items first.');
      return;
    }

    if (this.orderType === 'dine-in') {
      const tableInput = document.getElementById('table-number-input');
      const val = tableInput ? tableInput.value.trim() : this.tableNumber;
      if (!val) {
        MenuUtils.showToast('Please enter your table number for Dine-in.');
        if (tableInput) tableInput.focus();
        return;
      }
      this.tableNumber = val;
    }

    WhatsAppOrder.launch({
      restaurant: this.restaurant,
      items: this.items,
      orderType: this.orderType,
      tableNumber: this.tableNumber,
      totalAmount: this.getSubtotal()
    });
  }
}
