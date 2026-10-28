/**
 * Global Application Configuration
 * Used across the Digital QR Menu platform.
 */
const APP_CONFIG = {
  // Production base URL on Cloudflare Pages or custom domain.
  productionBaseUrl: 'https://restaurant-digital-menu.surajubale11.workers.dev',

  // Fallback default restaurant if no slug is specified in the URL
  defaultRestaurantSlug: 'sai-hotel',

  // Currency formatting
  defaultCurrency: 'INR',
  defaultLocale: 'en-IN',

  // Storage key prefix to prevent collision across restaurants
  storagePrefix: 'qrmenu_',

  // WhatsApp click-to-chat base URL
  whatsappBaseUrl: 'https://wa.me/',

  // App version
  version: '1.0.0'
};

// Freeze to avoid accidental mutations
if (typeof Object.freeze === 'function') {
  Object.freeze(APP_CONFIG);
}
