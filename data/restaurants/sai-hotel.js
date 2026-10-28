/**
 * Restaurant Data: Hotel Sai (Pure Veg South Indian & Snacks)
 * Matches the reference design screenshots.
 */
window.RESTAURANTS_MAP = window.RESTAURANTS_MAP || {};

window.RESTAURANTS_MAP['sai-hotel'] = {
  id: 'sai-hotel',
  slug: 'sai-hotel',
  name: 'Hotel Sai',
  nameMr: 'हॉटेल साई',
  tagline: 'Freshly made · Served with chutney & sambar',
  taglineMr: 'ताजे आणि चवदार · चटणी आणि सांबार सोबत',
  description: 'Authentic South Indian & Maharashtrian delicacies prepared fresh daily with pure ingredients.',
  logo: 'assets/restaurants/sai-hotel/logo.svg',
  coverImage: 'assets/restaurants/sai-hotel/cover.webp',
  
  // WhatsApp phone number in international format without leading + or symbols
  // Example: '919146643375' for India (+91)
  whatsappNumber: '919146643375',
  
  currency: 'INR',
  currencySymbol: '₹',
  locale: 'en-IN',
  
  address: 'Shop 4, Station Road, Near Sai Mandir, Pune - 411001',
  fssaiNumber: '21524021000892',
  
  // Supported order types: 'dine-in', 'takeaway', 'delivery'
  enabledOrderTypes: ['dine-in', 'takeaway'],
  
  // Valid tables configured for QR scanning & verification
  tables: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '15', '16'],
  
  branding: {
    primaryColor: '#2d1d4b',
    primaryHover: '#40275f',
    accentColor: '#d2b64f',
    backgroundColor: '#fbf7ee',
    surfaceColor: '#ffffff'
  },
  
  categories: [
    { id: 'all', name: 'All', nameMr: 'सर्व', icon: 'sparkle' },
    { id: 'dosa', name: 'Dosa', nameMr: 'डोसा', icon: 'dot' },
    { id: 'uttapam', name: 'Uttapam', nameMr: 'उत्तपम', icon: 'dot' },
    { id: 'idli', name: 'Idli', nameMr: 'इडली', icon: 'dot' },
    { id: 'beverages', name: 'Beverages', nameMr: 'पेये', icon: 'coffee' },
    { id: 'combos', name: 'Combos', nameMr: 'कॉम्बो', icon: 'gift' }
  ],
  
  menuItems: [
    {
      id: 'plain-dosa',
      name: 'Plain Dosa',
      nameMr: 'साधा डोसा',
      description: 'Crispy golden dosa with chutney & sambar',
      descriptionMr: 'कुरकुरीत सोनेरी डोसा, नारळ चटणी आणि गरमागरम सांबार',
      price: 80,
      categoryId: 'dosa',
      image: 'assets/restaurants/sai-hotel/plain-dosa.webp',
      available: true,
      featured: true,
      sortOrder: 1
    },
    {
      id: 'masala-dosa',
      name: 'Masala Dosa',
      nameMr: 'मसाला डोसा',
      description: 'Golden crispy dosa stuffed with mildly spiced potato masala, served with 2 chutneys & sambar',
      descriptionMr: 'मसालेदार बटाटा भाजीने भरलेला कुरकुरीत डोसा, दोन चटण्या आणि सांबार',
      price: 110,
      categoryId: 'dosa',
      image: 'assets/restaurants/sai-hotel/masala-dosa.webp',
      available: true,
      featured: true,
      sortOrder: 2
    },
    {
      id: 'mysore-masala-dosa',
      name: 'Mysore Masala Dosa',
      nameMr: 'म्हैसूर मसाला डोसा',
      description: 'Layered with fiery red garlic chutney & butter, filled with spiced aloo',
      descriptionMr: 'तूप आणि लसूण लाल चटणीचा लेप, चवदार बटाटा मसाला',
      price: 130,
      categoryId: 'dosa',
      image: 'assets/restaurants/sai-hotel/mysore-masala-dosa.webp',
      available: true,
      featured: true,
      sortOrder: 3
    },
    {
      id: 'onion-uttapam',
      name: 'Onion Uttapam',
      nameMr: 'कांदा उत्तपम',
      description: 'Fluffy thick fermented rice pancake topped with crunchy onions and green chilies',
      descriptionMr: 'कांदा आणि हिरवी मिरची घालून भाजलेला मऊ जाडसर उत्तपम',
      price: 95,
      categoryId: 'uttapam',
      image: 'assets/restaurants/sai-hotel/onion-uttapam.webp',
      available: true,
      featured: false,
      sortOrder: 4
    },
    {
      id: 'tomato-onion-uttapam',
      name: 'Tomato Onion Uttapam',
      nameMr: 'टोमॅटो कांदा उत्तपम',
      description: 'Thick soft uttapam studded with fresh juicy tomatoes, onions, and curry leaves',
      descriptionMr: 'टोमॅटो, कांदा आणि कोथिंबीर युक्त चवदार उत्तपम',
      price: 105,
      categoryId: 'uttapam',
      image: 'assets/restaurants/sai-hotel/tomato-onion-uttapam.webp',
      available: true,
      featured: false,
      sortOrder: 5
    },
    {
      id: 'steamed-idli',
      name: 'Steamed Idli Sambar (2 pcs)',
      nameMr: 'इडली सांबार (२ नग)',
      description: 'Soft steamed rice cakes served with aromatic lentil sambar and fresh coconut chutney',
      descriptionMr: 'मऊ लुसलुशीत वाफवलेली इडली, सांबार आणि खोबऱ्याची चटणी',
      price: 60,
      categoryId: 'idli',
      image: 'assets/restaurants/sai-hotel/idli.webp',
      available: true,
      featured: false,
      sortOrder: 6
    },
    {
      id: 'medu-vada',
      name: 'Medu Vada (2 pcs)',
      nameMr: 'मेदू वडा (२ नग)',
      description: 'Crispy fried urad dal donuts served hot with sambar and spicy red chutney',
      descriptionMr: 'कुरकुरीत मेदू वडे, गरम सांबार आणि चटणी',
      price: 75,
      categoryId: 'idli',
      image: 'assets/restaurants/sai-hotel/medu-vada.webp',
      available: true,
      featured: false,
      sortOrder: 7
    },
    {
      id: 'filter-coffee',
      name: 'South Indian Filter Coffee',
      nameMr: 'फिल्टर कॉफी',
      description: 'Traditional frothed chicory blended strong filter coffee served in dabara set',
      descriptionMr: 'गरमागरम पारंपारिक फेसाळलेली दक्षिण भारतीय फिल्टर कॉफी',
      price: 40,
      categoryId: 'beverages',
      image: 'assets/restaurants/sai-hotel/filter-coffee.webp',
      available: true,
      featured: false,
      sortOrder: 8
    },
    {
      id: 'masala-buttermilk',
      name: 'Masala Chaas (Spiced Buttermilk)',
      nameMr: 'मसाला ताक',
      description: 'Chilled churning yogurt infused with roasted cumin, ginger, mint and rock salt',
      descriptionMr: 'जिरे, पुदिना आणि आल्याचे थंडगार पाचक ताक',
      price: 35,
      categoryId: 'beverages',
      image: 'assets/restaurants/sai-hotel/chaas.webp',
      available: true,
      featured: false,
      sortOrder: 9
    },
    {
      id: 'sai-south-combo',
      name: 'Sai South Indian Super Combo',
      nameMr: 'साई सुपर कॉम्बो',
      description: '1 Mini Masala Dosa + 1 Steamed Idli + 1 Medu Vada + 1 Filter Coffee',
      descriptionMr: '१ मिनी मसाला डोसा + १ इडली + १ मेदू वडा + १ फिल्टर कॉफी',
      price: 160,
      categoryId: 'combos',
      image: 'assets/restaurants/sai-hotel/south-combo.webp',
      available: true,
      featured: true,
      sortOrder: 10
    }
  ]
};
