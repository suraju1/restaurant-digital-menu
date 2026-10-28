/**
 * QR Digital Menu - Table QR Studio & Card Generator
 * Generates table-specific scannable QR codes and acrylic tent card layouts.
 */
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const selectRestaurant = document.getElementById('select-restaurant');
  const inputBaseUrl = document.getElementById('input-base-url');
  const selectMode = document.getElementById('select-table-mode');
  const singleTableWrap = document.getElementById('single-table-wrap');
  const selectSingleTable = document.getElementById('select-single-table');
  const qrCardsContainer = document.getElementById('qr-cards-container');
  const btnPrintCards = document.getElementById('btn-print-cards');
  const btnDownloadAll = document.getElementById('btn-download-all');
  const urlWarning = document.getElementById('url-warning');

  // Auto-detect live URL if running on production (Cloudflare, domain, etc.)
  let defaultProdUrl = (window.APP_CONFIG && window.APP_CONFIG.productionBaseUrl) || 'https://restaurant-digital-menu.surajubale11.workers.dev';
  if (window.location.origin && window.location.origin.startsWith('http') && !window.location.origin.includes('localhost') && !window.location.origin.includes('127.0.0.1')) {
    defaultProdUrl = window.location.origin;
  }
  inputBaseUrl.value = defaultProdUrl;

  // Populate Restaurant Select
  const allRestaurants = RestaurantRegistry.getAll();
  selectRestaurant.innerHTML = '';
  allRestaurants.forEach(r => {
    const opt = document.createElement('option');
    opt.value = r.slug;
    opt.textContent = `${r.name} (${r.tableCount} tables)`;
    selectRestaurant.appendChild(opt);
  });

  // Check URL query param for default selection
  const urlParams = new URLSearchParams(window.location.search);
  const requestedSlug = urlParams.get('r') || urlParams.get('restaurant');
  if (requestedSlug && RestaurantRegistry.hasSlug(requestedSlug)) {
    selectRestaurant.value = requestedSlug;
  }

  // Event Listeners
  selectRestaurant.addEventListener('change', updateTableDropdownAndCards);
  inputBaseUrl.addEventListener('input', () => {
    checkBaseUrlWarning();
    renderQRCards();
  });
  selectMode.addEventListener('change', () => {
    if (selectMode.value === 'single') {
      singleTableWrap.style.display = 'block';
    } else {
      singleTableWrap.style.display = 'none';
    }
    renderQRCards();
  });
  selectSingleTable.addEventListener('change', renderQRCards);

  if (btnPrintCards) {
    btnPrintCards.addEventListener('click', () => {
      window.print();
    });
  }

  if (btnDownloadAll) {
    btnDownloadAll.addEventListener('click', downloadAllQRs);
  }

  updateTableDropdownAndCards();
  checkBaseUrlWarning();

  function checkBaseUrlWarning() {
    const val = inputBaseUrl.value.trim();
    if (val.includes('YOUR-PROJECT') || val.includes('localhost') || val.includes('127.0.0.1')) {
      urlWarning.style.display = 'block';
    } else {
      urlWarning.style.display = 'none';
    }
  }

  function updateTableDropdownAndCards() {
    const slug = selectRestaurant.value;
    const rest = RestaurantRegistry.getBySlug(slug);
    if (!rest) return;

    selectSingleTable.innerHTML = '';
    (rest.tables || ['1']).forEach(t => {
      const opt = document.createElement('option');
      opt.value = t;
      opt.textContent = `Table ${t}`;
      selectSingleTable.appendChild(opt);
    });

    renderQRCards();
  }

  function renderQRCards() {
    const slug = selectRestaurant.value;
    const rest = RestaurantRegistry.getBySlug(slug);
    if (!rest) return;

    qrCardsContainer.innerHTML = '';

    const baseUrl = inputBaseUrl.value.trim().replace(/\/+$/, '');
    const isSingle = selectMode.value === 'single';
    const tablesToRender = isSingle ? [selectSingleTable.value] : (rest.tables || ['1']);

    tablesToRender.forEach(tableNum => {
      const card = createQRCard(rest, tableNum, baseUrl);
      qrCardsContainer.appendChild(card);
    });
  }

  function createQRCard(rest, tableNum, baseUrl) {
    const card = document.createElement('div');
    card.className = 'qr-stand-card';
    card.id = `qr-card-table-${tableNum}`;

    // Target URL for this specific table
    const targetUrl = `${baseUrl}/index.html?r=${encodeURIComponent(rest.slug)}&table=${encodeURIComponent(tableNum)}`;

    card.innerHTML = `
      <div class="qr-stand-header">
        <h2 style="font-size: 1.45rem; font-weight: 800; color: var(--color-primary); margin-bottom: 2px;">
          ${MenuUtils.escapeHtml(rest.name)}
        </h2>
        ${rest.nameMr ? `<div class="marathi-text" style="font-size: 1rem; color: var(--color-muted); font-weight: 600;">${MenuUtils.escapeHtml(rest.nameMr)}</div>` : ''}
        <div class="table-badge-print" style="margin: 10px auto; display: inline-flex; align-items: center; gap: 6px; background-color: #d2b64f; color: #2d1d4b; font-weight: 800; font-size: 1.15rem; padding: 6px 20px; border-radius: 999px;">
          <span>🪑 Table ${MenuUtils.escapeHtml(tableNum)}</span>
        </div>
      </div>

      <div class="qr-canvas-wrap" id="qr-canvas-table-${tableNum}" style="margin: 14px auto; padding: 12px; background: #ffffff; border-radius: 16px; display: inline-block; box-shadow: 0 4px 14px rgba(45, 29, 75, 0.08); border: 1.5px solid #eae5ea;">
        <!-- QRCode rendered here -->
      </div>

      <div class="qr-scan-instructions" style="margin-top: 6px;">
        <p style="font-size: 1rem; font-weight: 800; color: var(--color-primary); margin-bottom: 4px;">
          Scan with Camera to Order
        </p>
        <p style="font-size: 0.84rem; color: var(--color-muted); line-height: 1.35; max-width: 260px; margin: 0 auto;">
          Browse digital menu &bull; Add items &bull; Order directly on WhatsApp
        </p>
        <p class="marathi-text" style="font-size: 0.8rem; color: #82778c; margin-top: 4px;">
          कॅमेऱ्याने स्कॅन करा आणि व्हाट्सअँपवर ऑर्डर द्या
        </p>
      </div>

      <div class="qr-card-actions no-print" style="margin-top: 16px; display: flex; justify-content: center; gap: 8px;">
        <button type="button" class="btn-download-qr category-pill" data-table="${tableNum}">
          <span>⬇️ Download PNG</span>
        </button>
        <a href="${targetUrl}" target="_blank" rel="noopener" class="category-pill" style="text-decoration:none;">
          <span>↗️ Test URL</span>
        </a>
      </div>
    `;

    // Render QR Code using standalone QRCode.js
    const qrWrap = card.querySelector(`#qr-canvas-table-${tableNum}`);
    try {
      new QRCode(qrWrap, {
        text: targetUrl,
        width: 180,
        height: 180,
        colorDark: "#2d1d4b",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    } catch (e) {
      console.error('[QRGenerator] Failed to render QR:', e);
      qrWrap.innerHTML = `<span style="color:red;">Error generating QR: ${e.message}</span>`;
    }

    // Attach Download listener
    const dlBtn = card.querySelector('.btn-download-qr');
    if (dlBtn) {
      dlBtn.addEventListener('click', () => {
        downloadCardQR(card, rest.slug, tableNum);
      });
    }

    return card;
  }

  function downloadCardQR(cardElement, slug, tableNum) {
    const canvas = cardElement.querySelector('canvas');
    const img = cardElement.querySelector('img');

    let dataUrl = null;
    if (canvas) {
      dataUrl = canvas.toDataURL('image/png');
    } else if (img && img.src) {
      dataUrl = img.src;
    }

    if (!dataUrl) {
      MenuUtils.showToast('Unable to extract QR image.');
      return;
    }

    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `QR_${slug}_table_${tableNum}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function downloadAllQRs() {
    const cards = qrCardsContainer.querySelectorAll('.qr-stand-card');
    if (cards.length === 0) return;

    cards.forEach((card, idx) => {
      setTimeout(() => {
        const btn = card.querySelector('.btn-download-qr');
        if (btn) btn.click();
      }, idx * 300);
    });

    MenuUtils.showToast(`Starting download of ${cards.length} table QR codes...`);
  }
});
