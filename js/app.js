/**
 * QR Digital Menu - Application Bootstrap & Orchestration
 */
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Resolve Route from URL
  const route = MenuRouter.resolveRoute();

  // 2. Handle 404 / Unknown Restaurant Slug
  if (route.isUnknown) {
    renderNotFound(route.slug);
    return;
  }

  // 3. Handle Hub / Directory Page
  if (route.isHub) {
    renderRestaurantHub();
    return;
  }

  // 4. Load Valid Restaurant
  const restaurant = RestaurantRegistry.getBySlug(route.slug);
  if (!restaurant) {
    renderNotFound(route.slug);
    return;
  }

  // Apply restaurant metadata, title, and branding
  RestaurantLoader.load(restaurant, route.table, route.isTableValid);

  // Initialize Isolated Cart
  const cart = new RestaurantCart(restaurant, route.table, route.isTableValid);

  // Render Categories
  const categories = restaurant.categories || [];
  MenuRenderer.renderCategories(categories, 'all', (selectedCatId) => {
    SearchFilter.selectCategory(selectedCatId);
  });

  // Render Initial Menu Items
  MenuRenderer.renderMenuItems(restaurant.menuItems, cart);

  // Initialize Search & Filter Controller
  SearchFilter.init(restaurant.menuItems, cart);

  // Listen for Cart Updates to sync item counters
  window.addEventListener('cart:updated', () => {
    MenuRenderer.syncCardQuantities(cart);
  });

  // Handle Demo Restaurant Switcher in Footer
  setupRestaurantSwitcher(route.slug, route.table);
});

/**
 * Render Friendly 404 Unknown Restaurant Page
 * @param {string} slug 
 */
function renderNotFound(slug) {
  document.title = 'Restaurant Not Found — Digital Menu';
  const container = document.getElementById('app-root');
  if (!container) return;

  const all = RestaurantRegistry.getAll();
  const restLinks = all.map(r => `
    <a href="index.html?r=${r.slug}" class="btn-add" style="text-decoration:none; display:inline-flex; margin:4px;">
      🍽️ ${MenuUtils.escapeHtml(r.name)}
    </a>
  `).join('');

  container.innerHTML = `
    <div class="empty-results" style="margin-top: 40px; padding: 40px 20px;">
      <span style="font-size: 3.5rem;">🍽️❓</span>
      <h2 class="restaurant-name" style="font-size: 1.5rem; margin-top: 10px;">Restaurant Not Found</h2>
      <p class="card-description" style="max-width: 400px; margin: 8px auto 20px;">
        We could not find a digital menu for <strong>"${MenuUtils.escapeHtml(slug || 'unknown')}"</strong>. 
        It might have been moved or misspelled.
      </p>
      <div style="margin-bottom: 24px;">
        <p style="font-size: 0.9rem; font-weight: 700; color: var(--color-primary); margin-bottom: 8px;">
          Available Demo Restaurants:
        </p>
        <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:8px;">
          ${restLinks}
        </div>
      </div>
      <a href="index.html" class="btn-reset-filter" style="text-decoration:none;">Go to Home Hub</a>
    </div>
  `;
}

/**
 * Render Hub / Showcase Directory
 */
function renderRestaurantHub() {
  document.title = 'Digital QR Menu Platform — Restaurant Directory';
  const container = document.getElementById('app-root');
  if (!container) return;

  const restaurants = RestaurantRegistry.getAll();
  const cardsHtml = restaurants.map(r => `
    <article class="menu-card" style="margin-bottom: 20px;">
      <div class="card-body">
        <h2 class="card-title">${MenuUtils.escapeHtml(r.name)}</h2>
        ${r.nameMr ? `<div class="card-title-mr marathi-text">${MenuUtils.escapeHtml(r.nameMr)}</div>` : ''}
        <p class="card-description">${MenuUtils.escapeHtml(r.tagline || '')}</p>
        <div style="display: flex; gap: 10px; margin-top: 12px; flex-wrap: wrap;">
          <a href="index.html?r=${r.slug}" class="btn-add" style="text-decoration: none;">
            <span>Open Menu</span>
            <span aria-hidden="true">➔</span>
          </a>
          <a href="qr-generator.html?r=${r.slug}" class="category-pill" style="text-decoration: none;">
            <span>Generate QR Cards</span>
          </a>
        </div>
      </div>
    </article>
  `).join('');

  container.innerHTML = `
    <header class="restaurant-header" style="text-align: center; margin-top: 20px;">
      <h1 class="restaurant-name" style="font-size: 1.8rem;">Digital QR Menu Hub</h1>
      <p class="menu-subtitle">Multi-Restaurant WhatsApp Ordering Platform</p>
    </header>
    <div style="margin-top: 24px;">
      ${cardsHtml}
    </div>
    <div style="text-align: center; margin-top: 30px;">
      <a href="qr-generator.html" class="btn-add" style="text-decoration:none; padding: 12px 28px;">
        <span>🖨️ Open Table QR Studio</span>
      </a>
    </div>
  `;
}

/**
 * Setup Quick Switcher in Footer for easy demoing
 */
function setupRestaurantSwitcher(currentSlug, currentTable) {
  const container = document.getElementById('demo-switcher-wrap');
  if (!container) return;

  const restaurants = RestaurantRegistry.getAll();
  if (restaurants.length <= 1) {
    container.style.display = 'none';
    return;
  }

  const tableSuffix = currentTable ? `&table=${encodeURIComponent(currentTable)}` : '';
  const links = restaurants.map(r => {
    const isCurrent = r.slug === currentSlug;
    if (isCurrent) {
      return `<strong style="color:var(--color-primary);">${MenuUtils.escapeHtml(r.name)}</strong>`;
    }
    return `<a href="index.html?r=${r.slug}${tableSuffix}" class="footer-link">${MenuUtils.escapeHtml(r.name)}</a>`;
  }).join(' · ');

  container.innerHTML = `
    <div style="font-size: 0.82rem; color: var(--color-muted);">
      <span>Switch Restaurant Demo: </span>
      ${links}
      <span> · </span>
      <a href="qr-generator.html?r=${currentSlug}" class="footer-link" style="color:var(--color-accent); font-weight:700;">QR Studio</a>
    </div>
  `;
}
