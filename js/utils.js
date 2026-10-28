/**
 * QR Digital Menu - Utility Helpers
 * Safe DOM, currency formatting, order reference generation, and storage isolation.
 */
const MenuUtils = (function () {
  'use strict';

  /**
   * Escape HTML entities to prevent XSS injection.
   * @param {string} str 
   * @returns {string}
   */
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Format a numerical rupee amount into Indian currency format (e.g. ₹80, ₹1,250).
   * @param {number} amount 
   * @param {string} [locale='en-IN'] 
   * @param {string} [currency='INR'] 
   * @returns {string}
   */
  function formatCurrency(amount, locale = 'en-IN', currency = 'INR') {
    const num = Math.round(Number(amount) || 0);
    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        maximumFractionDigits: 0
      }).format(num);
    } catch (e) {
      return `₹${num.toLocaleString('en-IN')}`;
    }
  }

  /**
   * Sanitize phone number to strictly digits for WhatsApp click-to-chat.
   * Ensures no +, spaces, brackets, or dashes remain.
   * @param {string|number} phone 
   * @returns {string}
   */
  function cleanPhoneNumber(phone) {
    if (!phone) return '';
    const digits = String(phone).replace(/\D/g, '');
    return digits;
  }

  /**
   * Generate a unique human-friendly order reference code for local identification.
   * Example: "HSAI-20261028-X8K2"
   * @param {string} restaurantSlug 
   * @param {string|number} [tableNumber] 
   * @returns {string}
   */
  function generateOrderRef(restaurantSlug = 'ORD', tableNumber = '') {
    const prefix = (restaurantSlug || 'ORD')
      .replace(/[^a-zA-Z]/g, '')
      .toUpperCase()
      .slice(0, 4)
      .padEnd(4, 'X');
    
    const now = new Date();
    const dateStr = now.getFullYear().toString() +
      String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0');
    
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let randomPart = '';
    for (let i = 0; i < 4; i++) {
      randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const tablePart = tableNumber ? `-T${tableNumber}` : '';
    return `${prefix}-${dateStr}-${randomPart}${tablePart}`;
  }

  /**
   * Scoped Storage to prevent cart pollution across multiple restaurants.
   */
  const scopedStorage = {
    getKey: function (restaurantSlug, suffix) {
      const prefix = (window.APP_CONFIG && window.APP_CONFIG.storagePrefix) || 'qrmenu_';
      return `${prefix}${restaurantSlug}_${suffix}`;
    },
    get: function (restaurantSlug, suffix) {
      try {
        const key = this.getKey(restaurantSlug, suffix);
        const data = localStorage.getItem(key) || sessionStorage.getItem(key);
        return data ? JSON.parse(data) : null;
      } catch (e) {
        console.warn('[scopedStorage] Failed to read storage:', e);
        return null;
      }
    },
    set: function (restaurantSlug, suffix, value) {
      try {
        const key = this.getKey(restaurantSlug, suffix);
        const str = JSON.stringify(value);
        sessionStorage.setItem(key, str);
        localStorage.setItem(key, str);
      } catch (e) {
        console.warn('[scopedStorage] Failed to write storage:', e);
      }
    },
    remove: function (restaurantSlug, suffix) {
      try {
        const key = this.getKey(restaurantSlug, suffix);
        sessionStorage.removeItem(key);
        localStorage.removeItem(key);
      } catch (e) {
        console.warn('[scopedStorage] Failed to remove storage:', e);
      }
    }
  };

  /**
   * Simple non-intrusive Toast Notification
   * @param {string} message 
   * @param {number} [duration=2500] 
   */
  function showToast(message, duration = 2500) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.style.cssText = `
        position: fixed;
        bottom: 84px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 2000;
        display: flex;
        flex-direction: column;
        gap: 8px;
        pointer-events: none;
      `;
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'menu-toast';
    toast.style.cssText = `
      background-color: var(--color-primary, #2d1d4b);
      color: #ffffff;
      padding: 10px 22px;
      border-radius: 999px;
      font-size: 0.92rem;
      font-weight: 700;
      box-shadow: 0 8px 24px rgba(45, 29, 75, 0.35);
      border: 1px solid rgba(255, 255, 255, 0.15);
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    `;
    toast.textContent = message;
    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, duration);
  }

  return {
    escapeHtml,
    formatCurrency,
    cleanPhoneNumber,
    generateOrderRef,
    scopedStorage,
    showToast
  };
})();
