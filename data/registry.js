/**
 * Central Restaurant Registry & Validator
 * Provides lookup, runtime schema validation, and table verification.
 */
const RestaurantRegistry = (function () {
  'use strict';

  /**
   * Validate a restaurant configuration object against business rules.
   * Logs warnings and sanitizes items.
   * @param {Object} data 
   * @returns {Object} { isValid: boolean, errors: string[], sanitized: Object }
   */
  function validate(data) {
    const errors = [];
    if (!data || typeof data !== 'object') {
      return { isValid: false, errors: ['Restaurant data must be a non-null object'], sanitized: null };
    }

    if (!data.id || typeof data.id !== 'string') {
      errors.push('Missing or invalid restaurant id');
    }
    if (!data.slug || typeof data.slug !== 'string') {
      errors.push('Missing or invalid restaurant slug');
    }
    if (!data.name || typeof data.name !== 'string') {
      errors.push('Missing or invalid restaurant name');
    }
    if (!data.whatsappNumber || !/^\d{10,15}$/.test(String(data.whatsappNumber).replace(/\D/g, ''))) {
      errors.push('Invalid WhatsApp phone number. Must be 10-15 digits in international format.');
    }

    // Validate Categories
    const validCategoryIds = new Set();
    if (!Array.isArray(data.categories) || data.categories.length === 0) {
      errors.push('Restaurant must configure at least one category');
    } else {
      data.categories.forEach((cat, idx) => {
        if (!cat.id || !cat.name) {
          errors.push(`Category at index ${idx} is missing id or name`);
        } else {
          validCategoryIds.add(cat.id);
        }
      });
    }

    // Always ensure "all" is available conceptually
    validCategoryIds.add('all');

    // Validate Menu Items
    const seenItemIds = new Set();
    const sanitizedItems = [];

    if (Array.isArray(data.menuItems)) {
      data.menuItems.forEach((item, idx) => {
        if (!item.id || typeof item.id !== 'string') {
          errors.push(`Menu item at index ${idx} has invalid id`);
          return;
        }
        if (seenItemIds.has(item.id)) {
          errors.push(`Duplicate menu item id: "${item.id}"`);
          return;
        }
        seenItemIds.add(item.id);

        if (!item.name || typeof item.name !== 'string') {
          errors.push(`Menu item "${item.id}" is missing name`);
        }

        const price = Number(item.price);
        if (isNaN(price) || price < 0) {
          errors.push(`Menu item "${item.id}" has invalid price (${item.price})`);
        }

        if (item.categoryId && !validCategoryIds.has(item.categoryId)) {
          errors.push(`Menu item "${item.id}" references non-existent category "${item.categoryId}"`);
        }

        // Sanitized clone
        sanitizedItems.push({
          id: String(item.id).trim(),
          name: String(item.name).trim(),
          nameMr: item.nameMr ? String(item.nameMr).trim() : '',
          description: item.description ? String(item.description).trim() : '',
          descriptionMr: item.descriptionMr ? String(item.descriptionMr).trim() : '',
          price: Math.max(0, Math.round(price)),
          categoryId: item.categoryId || 'all',
          image: item.image || 'assets/shared/food-fallback.webp',
          available: item.available !== false,
          featured: Boolean(item.featured),
          sortOrder: typeof item.sortOrder === 'number' ? item.sortOrder : idx + 1
        });
      });
    } else {
      errors.push('Menu items must be an array');
    }

    // Tables validation
    const rawTables = Array.isArray(data.tables) ? data.tables.map(String) : [];

    const sanitized = {
      ...data,
      whatsappNumber: String(data.whatsappNumber).replace(/\D/g, ''),
      currency: data.currency || 'INR',
      currencySymbol: data.currencySymbol || '₹',
      locale: data.locale || 'en-IN',
      enabledOrderTypes: Array.isArray(data.enabledOrderTypes) && data.enabledOrderTypes.length > 0 
        ? data.enabledOrderTypes 
        : ['dine-in', 'takeaway'],
      tables: rawTables,
      categories: data.categories || [],
      menuItems: sanitizedItems
    };

    return {
      isValid: errors.length === 0,
      errors: errors,
      sanitized: sanitized
    };
  }

  /**
   * Get restaurant configuration by slug
   * @param {string} slug 
   * @returns {Object|null}
   */
  function getBySlug(slug) {
    if (!slug) return null;
    const cleanSlug = String(slug).toLowerCase().trim();
    const map = window.RESTAURANTS_MAP || {};
    const raw = map[cleanSlug];
    if (!raw) return null;

    const result = validate(raw);
    if (!result.isValid) {
      console.warn(`[RestaurantRegistry] Validation warnings for "${cleanSlug}":`, result.errors);
    }
    return result.sanitized || raw;
  }

  /**
   * Check if a slug is registered
   * @param {string} slug 
   * @returns {boolean}
   */
  function hasSlug(slug) {
    if (!slug) return false;
    const cleanSlug = String(slug).toLowerCase().trim();
    return Boolean(window.RESTAURANTS_MAP && window.RESTAURANTS_MAP[cleanSlug]);
  }

  /**
   * List all registered restaurants (for the directory / QR generator / demo switcher)
   * @returns {Array<{id: string, slug: string, name: string, tagline: string, logo: string, tableCount: number}>}
   */
  function getAll() {
    const map = window.RESTAURANTS_MAP || {};
    return Object.keys(map).map(slug => {
      const rest = getBySlug(slug);
      return {
        id: rest.id,
        slug: rest.slug,
        name: rest.name,
        nameMr: rest.nameMr || '',
        tagline: rest.tagline || '',
        logo: rest.logo || '',
        tableCount: rest.tables ? rest.tables.length : 0,
        itemCount: rest.menuItems ? rest.menuItems.length : 0,
        whatsappNumber: rest.whatsappNumber
      };
    });
  }

  /**
   * Validate if a table number is recognized for a restaurant
   * @param {string} slug 
   * @param {string|number} tableNumber 
   * @returns {boolean}
   */
  function isValidTable(slug, tableNumber) {
    if (tableNumber === undefined || tableNumber === null || tableNumber === '') return false;
    const rest = getBySlug(slug);
    if (!rest || !Array.isArray(rest.tables) || rest.tables.length === 0) return true; // If no table restrictions configured
    const cleanNum = String(tableNumber).trim();
    return rest.tables.some(t => String(t).trim().toLowerCase() === cleanNum.toLowerCase());
  }

  return {
    validate,
    getBySlug,
    hasSlug,
    getAll,
    isValidTable
  };
})();
