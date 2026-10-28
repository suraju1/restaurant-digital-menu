/**
 * Restaurant Data: Shivraj Snacks & Fast Food
 * Authentic Street Food, Vada Pav, Misal Pav, Chai & Quick Bites.
 */
window.RESTAURANTS_MAP = window.RESTAURANTS_MAP || {};

window.RESTAURANTS_MAP['shivraj-snacks'] = {
  id: 'shivraj-snacks',
  slug: 'shivraj-snacks',
  name: 'Shivraj Snacks & Fast Food',
  nameMr: 'शिवराज स्नॅक्स आणि फास्ट फूड',
  tagline: 'Garam Garam Vada Pav · Zanzanit Misal · Kadak Chai',
  taglineMr: 'गरमागरम वडापाव · झणझणीत मिसळ · कडक चहा',
  description: 'Famous Maharashtrian breakfast spot known for legendary spicy misal, batata vada and freshly fried snacks.',
  logo: 'assets/restaurants/shivraj-snacks/logo.svg',
  coverImage: 'assets/restaurants/shivraj-snacks/cover.webp',

  whatsappNumber: '919146643375',

  currency: 'INR',
  currencySymbol: '₹',
  locale: 'en-IN',

  address: 'Shop 2, Shivaji Chowk, Kothrud, Pune - 411038',
  fssaiNumber: '21524045001198',

  enabledOrderTypes: ['dine-in', 'takeaway'],
  tables: ['1', '2', '3', '4', '5', '6', '7', '8'],

  branding: {
    primaryColor: '#7b1d1d',
    primaryHover: '#982525',
    accentColor: '#e59e35',
    backgroundColor: '#fffaf3',
    surfaceColor: '#ffffff'
  },

  categories: [
    { id: 'all', name: 'All', nameMr: 'सर्व', icon: 'sparkle' },
    { id: 'misal', name: 'Misal Special', nameMr: 'मिसळ स्पेशल', icon: 'dot' },
    { id: 'vada', name: 'Vada & Bhaji', nameMr: 'वडा आणि भजी', icon: 'dot' },
    { id: 'pavbhaji', name: 'Pav Bhaji', nameMr: 'पावभाजी', icon: 'dot' },
    { id: 'beverages', name: 'Chai & Drinks', nameMr: 'चहा व शीतपेये', icon: 'coffee' }
  ],

  menuItems: [
    {
      id: 'special-puneri-misal',
      name: 'Special Puneri Misal Pav',
      nameMr: 'स्पेशल पुणेरी मिसळ पाव',
      description: 'Zanzanit spiced sprouted moth beans curry topped with farsan, onions, lemon and 2 buttered pav',
      descriptionMr: 'झणझणीत कट, मटकी उसळ, कुरकुरीत फरसाण आणि २ मऊ लादी पाव',
      price: 90,
      categoryId: 'misal',
      image: 'assets/restaurants/shivraj-snacks/misal-pav.webp',
      available: true,
      featured: true,
      sortOrder: 1
    },
    {
      id: 'cheese-misal-pav',
      name: 'Amul Cheese Misal Pav',
      nameMr: 'अमुल चीज मिसळ पाव',
      description: 'Rich spiced misal loaded with generous shredded Amul processed cheese and crunchy farsan',
      descriptionMr: 'खमंग तिखट मिसळवर भरपूर अमूल चीज आणि २ पाव',
      price: 120,
      categoryId: 'misal',
      image: 'assets/restaurants/shivraj-snacks/cheese-misal.webp',
      available: true,
      featured: false,
      sortOrder: 2
    },
    {
      id: 'mumbai-vada-pav',
      name: 'Classic Batata Vada Pav (2 pcs)',
      nameMr: 'गरमागरम बटाटा वडापाव (२ नग)',
      description: 'Golden spiced potato fritters encased in soft pav with dry garlic-peanut chutney and fried green chili',
      descriptionMr: 'लसूण सुकी चटणी, हिरवी मिरची आणि गरमागरम वडापाव',
      price: 50,
      categoryId: 'vada',
      image: 'assets/restaurants/sai-hotel/medu-vada.webp',
      available: true,
      featured: true,
      sortOrder: 3
    },
    {
      id: 'kanda-bhaji',
      name: 'Crispy Kanda Bhaji (Plate)',
      nameMr: 'कुरकुरीत कांदा भजी',
      description: 'Golden fried shredded onion pakoras served with tangy tamarind dip and green chutney',
      descriptionMr: 'गरमागरम कुरकुरीत कांदा भजी आणि तिखट-गोड चटणी',
      price: 60,
      categoryId: 'vada',
      image: 'assets/restaurants/sai-hotel/onion-uttapam.webp',
      available: true,
      featured: false,
      sortOrder: 4
    },
    {
      id: 'special-butter-pavbhaji',
      name: 'Special Butter Pav Bhaji',
      nameMr: 'स्पेशल बटर पावभाजी',
      description: 'Mashed spiced mixed vegetables cooked on flat tawa with generous Amul butter, served with 2 pav',
      descriptionMr: 'मसालेदार चवदार भाजी, भरपूर लोणी आणि भाजलेले २ पाव',
      price: 130,
      categoryId: 'pavbhaji',
      image: 'assets/restaurants/shivraj-snacks/pav-bhaji.webp',
      available: true,
      featured: true,
      sortOrder: 5
    },
    {
      id: 'special-adrak-chai',
      name: 'Special Adrak Elaichi Kadak Chai',
      nameMr: 'स्पेशल आले-वेलची कडक चहा',
      description: 'Slow-brewed strong Assam tea with crushed fresh ginger, cardamom and full cream milk',
      descriptionMr: 'आले आणि वेलचीयुक्त वाफाळलेला कडक चहा',
      price: 25,
      categoryId: 'beverages',
      image: 'assets/restaurants/sai-hotel/filter-coffee.webp',
      available: true,
      featured: false,
      sortOrder: 6
    }
  ]
};
