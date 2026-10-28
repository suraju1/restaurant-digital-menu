/**
 * QR Digital Menu - URL Router & Query Resolver
 * Supports both path-based routing (e.g. /sai-hotel/?table=12)
 * and query-parameter routing (e.g. ?r=sai-hotel&table=12).
 */
const MenuRouter = (function () {
  'use strict';

  /**
   * Parse the current location and return { slug, table, isHub, isUnknown }
   */
  function resolveRoute() {
    const params = new URLSearchParams(window.location.search);
    const path = window.location.pathname;

    let slug = params.get('r') || params.get('restaurant');
    const tableParam = params.get('table');

    // If slug not in query, check URL pathname segments
    if (!slug) {
      // Clean path, remove trailing slash and split
      const segments = path.split('/').filter(Boolean);
      
      // If deployed in a subpath or root
      // Example: /sai-hotel or /sai-hotel/
      for (const seg of segments) {
        if (seg !== 'index.html' && seg !== '404.html' && seg !== 'qr-generator.html') {
          if (RestaurantRegistry.hasSlug(seg)) {
            slug = seg;
            break;
          }
        }
      }
    }

    // If still no slug, check if user specifically asked for hub or default
    const isRoot = !slug && (path === '/' || path.endsWith('/index.html') || path === '');
    
    if (isRoot) {
      // By default, if no slug given, we check if APP_CONFIG specifies a default restaurant
      // or if user wants to see the Hub / directory
      const showHub = params.has('hub');
      if (showHub) {
        return {
          slug: null,
          table: null,
          isHub: true,
          isUnknown: false
        };
      }
      
      // Default to primary restaurant (e.g. Hotel Sai)
      slug = (window.APP_CONFIG && window.APP_CONFIG.defaultRestaurantSlug) || 'sai-hotel';
    }

    // Now validate if slug exists in registry
    if (slug && !RestaurantRegistry.hasSlug(slug)) {
      return {
        slug: slug,
        table: tableParam,
        isHub: false,
        isUnknown: true
      };
    }

    // Clean table parameter
    let table = null;
    let isTableValid = false;

    if (tableParam !== null && tableParam !== undefined && tableParam !== '') {
      table = String(tableParam).trim();
      isTableValid = RestaurantRegistry.isValidTable(slug, table);
    }

    return {
      slug: slug,
      table: table,
      isTableValid: isTableValid,
      isHub: false,
      isUnknown: false
    };
  }

  return {
    resolveRoute
  };
})();
