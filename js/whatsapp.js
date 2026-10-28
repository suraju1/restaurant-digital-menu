/**
 * QR Digital Menu - WhatsApp Ordering Engine
 * Formats order payload into a professional WhatsApp click-to-chat link
 * and guides the customer with clear, transparent feedback.
 */
const WhatsAppOrder = (function () {
  'use strict';

  /**
   * Build the structured text message for WhatsApp
   * @param {Object} options 
   * @returns {string}
   */
  function buildMessage({ restaurant, items, orderType, tableNumber, totalAmount, orderRef }) {
    const symbol = restaurant.currencySymbol || '\u20B9';
    const lines = [];

    lines.push('\u{1F37D}\uFE0F *NEW ORDER*');
    lines.push(`*Restaurant:* ${restaurant.name}`);
    lines.push(`*Order Reference:* ${orderRef}`);
    
    if (orderType === 'dine-in' && tableNumber) {
      lines.push(`*Table:* ${tableNumber}`);
    }
    
    // Capitalize order type (e.g. Dine-in, Takeaway)
    const formattedType = orderType.charAt(0).toUpperCase() + orderType.slice(1);
    lines.push(`*Order Type:* ${formattedType}`);
    lines.push('');

    // Line items
    items.forEach((item, index) => {
      const lineSubtotal = item.price * item.quantity;
      lines.push(`${index + 1}. *${item.name}*`);
      if (item.nameMr) {
        lines.push(`   _${item.nameMr}_`);
      }
      lines.push(`   Qty: ${item.quantity} x ${symbol}${item.price} = ${symbol}${lineSubtotal}`);
      lines.push('');
    });

    lines.push('------------------------');
    lines.push(`*Total: ${symbol}${totalAmount}*`);
    lines.push('------------------------');
    lines.push('');
    lines.push('\u{1F4AC} _Please reply to confirm this order. Thank you!_');

    return lines.join('\n');
  }

  /**
   * Validate and generate WhatsApp Click-to-Chat URL
   * @param {string} rawPhone 
   * @param {string} message 
   * @returns {string|null}
   */
  function buildWhatsAppUrl(rawPhone, message) {
    const cleanPhone = MenuUtils.cleanPhoneNumber(rawPhone);
    if (!cleanPhone || cleanPhone.length < 10) {
      console.error('[WhatsAppOrder] Invalid phone number:', rawPhone);
      return null;
    }

    const encoded = encodeURIComponent(message);
    const baseUrl = (window.APP_CONFIG && window.APP_CONFIG.whatsappBaseUrl) || 'https://wa.me/';
    return `${baseUrl}${cleanPhone}?text=${encoded}`;
  }

  /**
   * Show honest post-order modal explaining that WhatsApp message must be sent
   * @param {string} whatsappUrl 
   * @param {string} orderRef 
   */
  function showConfirmationDialog(whatsappUrl, orderRef) {
    let dialog = document.getElementById('whatsapp-dispatch-dialog');
    if (!dialog) {
      dialog = document.createElement('div');
      dialog.id = 'whatsapp-dispatch-dialog';
      dialog.className = 'modal-overlay active';
      dialog.style.zIndex = '2100';
      document.body.appendChild(dialog);
    }

    dialog.innerHTML = `
      <div class="cart-modal active" style="text-align: center; max-height: none; padding: 28px 24px;">
        <div style="font-size: 3rem; margin-bottom: 8px;">📲</div>
        <h3 style="font-size: 1.35rem; font-weight: 800; color: var(--color-primary); margin-bottom: 8px;">
          Opening WhatsApp...
        </h3>
        <p style="font-size: 0.95rem; color: var(--color-muted); line-height: 1.5; margin-bottom: 16px;">
          Your order has been composed with reference <strong>#${MenuUtils.escapeHtml(orderRef)}</strong>.
        </p>
        
        <div style="background-color: #f8f5ee; border: 1.5px dashed var(--color-accent); border-radius: 16px; padding: 14px; margin-bottom: 20px; text-align: left;">
          <p style="font-size: 0.88rem; font-weight: 700; color: var(--color-primary); margin-bottom: 4px;">
            ⚠️ Important Step:
          </p>
          <p style="font-size: 0.82rem; color: var(--color-muted); margin: 0;">
            When WhatsApp opens, tap the <strong>Send button (▶)</strong> in the chat to transmit your order. Your order is confirmed only after the restaurant staff acknowledges your message.
          </p>
        </div>

        <a 
          href="${whatsappUrl}" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="btn-whatsapp-order" 
          id="btn-confirm-open-wa"
          style="text-decoration: none;"
        >
          <span>Open WhatsApp Now</span>
          <span aria-hidden="true">➔</span>
        </a>

        <button 
          type="button" 
          id="btn-close-dispatch-dialog" 
          style="margin-top: 14px; font-size: 0.9rem; font-weight: 700; color: var(--color-muted); padding: 8px 16px;"
        >
          Return to Menu
        </button>
      </div>
    `;

    const closeBtn = document.getElementById('btn-close-dispatch-dialog');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        dialog.remove();
      });
    }

    // Auto-trigger WhatsApp link in a safe user-gesture context
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }

  /**
   * Launch the WhatsApp order process
   * @param {Object} payload 
   */
  function launch(payload) {
    const { restaurant, items, orderType, tableNumber, totalAmount } = payload;
    
    if (!restaurant.whatsappNumber) {
      MenuUtils.showToast('Error: This restaurant has not configured a WhatsApp number.');
      return;
    }

    const orderRef = MenuUtils.generateOrderRef(restaurant.slug, tableNumber);
    const message = buildMessage({
      restaurant,
      items,
      orderType,
      tableNumber,
      totalAmount,
      orderRef
    });

    const url = buildWhatsAppUrl(restaurant.whatsappNumber, message);
    if (!url) {
      MenuUtils.showToast('Invalid restaurant phone number format.');
      return;
    }

    showConfirmationDialog(url, orderRef);
  }

  return {
    buildMessage,
    buildWhatsAppUrl,
    launch
  };
})();
