/**
 * QR Digital Menu - Restaurant Loader
 * Dynamically applies branding, titles, SEO meta tags, and header details.
 */
const RestaurantLoader = (function () {
  'use strict';

  /**
   * Apply restaurant configuration and branding to document
   * @param {Object} restaurant 
   * @param {string|null} tableNumber 
   * @param {boolean} isTableValid 
   */
  function load(restaurant, tableNumber = null, isTableValid = false) {
    if (!restaurant) return;

    // 1. Update Document Title & SEO Meta Tags
    const titleText = `${restaurant.name}${restaurant.nameMr ? ' (' + restaurant.nameMr + ')' : ''} — Digital QR Menu`;
    document.title = titleText;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = restaurant.description || `${restaurant.name} digital QR menu and WhatsApp ordering.`;

    // 2. Apply Custom Branding Tokens if configured
    if (restaurant.branding) {
      const root = document.documentElement;
      if (restaurant.branding.primaryColor) {
        root.style.setProperty('--color-primary', restaurant.branding.primaryColor);
      }
      if (restaurant.branding.primaryHover) {
        root.style.setProperty('--color-primary-hover', restaurant.branding.primaryHover);
      }
      if (restaurant.branding.accentColor) {
        root.style.setProperty('--color-accent', restaurant.branding.accentColor);
        root.style.setProperty('--color-accent-badge', restaurant.branding.accentColor);
      }
      if (restaurant.branding.backgroundColor) {
        root.style.setProperty('--color-background', restaurant.branding.backgroundColor);
      }
    }

    // 3. Render Header Branding
    const headerContainer = document.getElementById('restaurant-header-mount');
    if (headerContainer) {
      let tableBadgeHtml = '';
      if (tableNumber) {
        if (isTableValid) {
          tableBadgeHtml = `
            <div class="table-badge" title="Order linked to Table ${MenuUtils.escapeHtml(tableNumber)}" id="active-table-badge">
              <span class="table-badge-icon" aria-hidden="true">🪑</span>
              <span>Table ${MenuUtils.escapeHtml(tableNumber)}</span>
            </div>
          `;
        } else {
          tableBadgeHtml = `
            <div class="table-badge" style="background-color: #fee2e2; border-color: #ef4444; color: #991b1b;" title="Unrecognized table number" id="active-table-badge">
              <span class="table-badge-icon" aria-hidden="true">⚠️</span>
              <span>Table ${MenuUtils.escapeHtml(tableNumber)} (Unverified)</span>
            </div>
          `;
        }
      }

      headerContainer.innerHTML = `
        <div class="restaurant-top-bar">
          <div class="restaurant-branding">
            <img 
              src="${MenuUtils.escapeHtml(restaurant.logo)}" 
              alt="${MenuUtils.escapeHtml(restaurant.name)} logo" 
              class="restaurant-logo"
              onerror="this.onerror=null; this.src='assets/shared/brand-icon.svg';"
            />
            <div class="restaurant-title-wrap">
              <h1 class="restaurant-name">${MenuUtils.escapeHtml(restaurant.name)}</h1>
              ${restaurant.nameMr ? `<span class="restaurant-name-mr marathi-text">${MenuUtils.escapeHtml(restaurant.nameMr)}</span>` : ''}
            </div>
          </div>
          ${tableBadgeHtml}
        </div>
      `;
    }

    // 4. Update Menu Section Subtitle & Tagline
    const sectionSubtitle = document.getElementById('menu-section-subtitle');
    if (sectionSubtitle && restaurant.tagline) {
      sectionSubtitle.textContent = restaurant.tagline;
    }

    // 5. Update Footer Information
    const footerAddress = document.getElementById('footer-address');
    if (footerAddress && restaurant.address) {
      footerAddress.textContent = restaurant.address;
    }

    const footerFssai = document.getElementById('footer-fssai');
    if (footerFssai) {
      if (restaurant.fssaiNumber) {
        footerFssai.innerHTML = `🛡️ FSSAI Lic. No. <strong>${MenuUtils.escapeHtml(restaurant.fssaiNumber)}</strong>`;
        footerFssai.style.display = 'inline-flex';
      } else {
        footerFssai.style.display = 'none';
      }
    }
  }

  return {
    load
  };
})();
