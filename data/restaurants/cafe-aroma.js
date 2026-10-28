/**
 * Restaurant Data: Café Aroma & Bakery
 * Coffee, Burgers, Sandwiches, Fries, and Desserts.
 */
window.RESTAURANTS_MAP = window.RESTAURANTS_MAP || {};

window.RESTAURANTS_MAP['cafe-aroma'] = {
  id: 'cafe-aroma',
  slug: 'cafe-aroma',
  name: 'Café Aroma & Bakery',
  nameMr: 'कॅफे अरोमा आणि बेकरी',
  tagline: 'Artisanal Coffee · Handcrafted Burgers · Fresh Bakes',
  taglineMr: 'उत्कृष्ट कॉफी · स्वादिष्ट बर्गर · ताजे बेकरी पदार्थ',
  description: 'Relaxed ambient cafe serving freshly brewed beans, artisanal sandwiches, pasta and decadent desserts.',
  logo: 'assets/restaurants/cafe-aroma/logo.svg',
  coverImage: 'assets/restaurants/cafe-aroma/cover.webp',
  
  whatsappNumber: '919146643375',
  
  currency: 'INR',
  currencySymbol: '₹',
  locale: 'en-IN',
  
  address: 'Plot 12, FC Road, Shivaji Nagar, Pune - 411005',
  fssaiNumber: '21524033000541',
  
  enabledOrderTypes: ['dine-in', 'takeaway'],
  tables: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  
  branding: {
    primaryColor: '#3c2415',
    primaryHover: '#523420',
    accentColor: '#dca456',
    backgroundColor: '#faf6f0',
    surfaceColor: '#ffffff'
  },
  
  categories: [
    { id: 'all', name: 'All', nameMr: 'सर्व', icon: 'sparkle' },
    { id: 'coffee', name: 'Coffee', nameMr: 'कॉफी', icon: 'coffee' },
    { id: 'burgers', name: 'Burgers', nameMr: 'बर्गर', icon: 'dot' },
    { id: 'sandwiches', name: 'Sandwiches', nameMr: 'सँडविच', icon: 'dot' },
    { id: 'sides', name: 'Sides & Fries', nameMr: 'फ्राइज', icon: 'dot' },
    { id: 'desserts', name: 'Desserts', nameMr: 'मिठाई', icon: 'gift' }
  ],
  
  menuItems: [
    {
      id: 'cappuccino-classic',
      name: 'Classic Cappuccino',
      nameMr: 'क्लासिक कॅपुचिनो',
      description: 'Rich espresso with steamed milk and a velvety layer of microfoam, dusted with cinnamon',
      descriptionMr: 'एस्प्रेसो, दूध आणि फेसयुक्त क्रीमी कॉफी',
      price: 130,
      categoryId: 'coffee',
      image: 'assets/restaurants/cafe-aroma/cappuccino.webp',
      available: true,
      featured: true,
      sortOrder: 1
    },
    {
      id: 'hazelnut-frappe',
      name: 'Hazelnut Cold Coffee Frappe',
      nameMr: 'हेझलनट कोल्ड कॉफी',
      description: 'Blended arabica cold brew with roasted hazelnut syrup, ice cream and chocolate drizzle',
      descriptionMr: 'थंडगार हेझलनट फ्लेवरची आईस्क्रीमयुक्त कोल्ड कॉफी',
      price: 160,
      categoryId: 'coffee',
      image: 'assets/restaurants/cafe-aroma/cold-coffee.webp',
      available: true,
      featured: true,
      sortOrder: 2
    },
    {
      id: 'cheesy-paneer-burger',
      name: 'Cheesy Paneer Crisp Burger',
      nameMr: 'चीझी पनीर बर्गर',
      description: 'Crispy fried spiced paneer patty with spicy chipotle mayo, melted cheddar, lettuce and tomato',
      descriptionMr: 'कुरकुरीत पनीर पॅटी आणि वितळलेल्या चीजसह चवदार बर्गर',
      price: 175,
      categoryId: 'burgers',
      image: 'assets/restaurants/cafe-aroma/paneer-burger.webp',
      available: true,
      featured: true,
      sortOrder: 3
    },
    {
      id: 'veg-club-sandwich',
      name: 'Grilled Veg Club Sandwich',
      nameMr: 'व्हेज क्लब सँडविच',
      description: 'Triple decker toasted sandwich layered with mint chutney, cucumber, cheese slice and roasted peppers',
      descriptionMr: 'तीन पदरी भाजलेले व्हेज ग्रिल्ड चीज सँडविच',
      price: 140,
      categoryId: 'sandwiches',
      image: 'assets/restaurants/cafe-aroma/club-sandwich.webp',
      available: true,
      featured: false,
      sortOrder: 4
    },
    {
      id: 'peri-peri-fries',
      name: 'Peri Peri Crinkle Fries',
      nameMr: 'पेरी पेरी फ्रेंच फ्राईज',
      description: 'Crispy crinkle-cut golden potatoes tossed in spicy African peri-peri seasoning with garlic dip',
      descriptionMr: 'तिखट पेरी पेरी मसाल्यात टॉस केलेले कुरकुरीत फ्राईज',
      price: 110,
      categoryId: 'sides',
      image: 'assets/restaurants/cafe-aroma/peri-peri-fries.webp',
      available: true,
      featured: false,
      sortOrder: 5
    },
    {
      id: 'fudge-brownie',
      name: 'Sizzling Chocolate Fudge Brownie',
      nameMr: 'चॉकलेट फज ब्राऊनी',
      description: 'Warm walnut dark chocolate brownie served with vanilla bean ice cream and hot chocolate ganache',
      descriptionMr: 'गरम डार्क चॉकलेट ब्राऊनी आणि व्हॅनिला आईस्क्रीम',
      price: 150,
      categoryId: 'desserts',
      image: 'assets/restaurants/cafe-aroma/brownie.webp',
      available: true,
      featured: true,
      sortOrder: 6
    }
  ]
};
