# 🚀 How to Add a New Restaurant (Client Setup Guide)

This guide shows you how to onboard a new restaurant, café, snacks shop, or hotel in **under 10 minutes** without touching shared application logic.

---

## 📋 Overview of the Setup Workflow

For each new restaurant client (e.g. ₹999/setup), you only need to:
1. Create a configuration file in `data/restaurants/<slug>.js`
2. Place the restaurant logo and food photos in `assets/restaurants/<slug>/`
3. Include the restaurant script in `index.html` and `qr-generator.html`
4. Test the menu and generate table QR codes

---

## Step 1: Choose a URL Slug

Choose a clean, lowercase URL slug for the restaurant:
- **Hotel Sai** → `sai-hotel`
- **Café Aroma** → `cafe-aroma`
- **Shivraj Snacks** → `shivraj-snacks`
- **Annapurna Veg** → `annapurna-veg`

---

## Step 2: Create the Restaurant Configuration File

Create a new file: `data/restaurants/<slug>.js` (e.g. `data/restaurants/annapurna-veg.js`).

Copy and paste this template:

```javascript
window.RESTAURANTS_MAP = window.RESTAURANTS_MAP || {};

window.RESTAURANTS_MAP['annapurna-veg'] = {
  id: 'annapurna-veg',
  slug: 'annapurna-veg',
  name: 'Annapurna Pure Veg',
  nameMr: 'अन्नपूर्णा भोजनालय',
  tagline: 'Authentic Maharashtrian Thali & Breakfast',
  taglineMr: 'शुध्द शाकाहारी जेवण आणि नाष्टा',
  description: 'Pure vegetarian restaurant serving home-style meals and fresh snacks.',
  
  // Path to logo and optional cover image
  logo: 'assets/restaurants/annapurna-veg/logo.svg',
  coverImage: 'assets/restaurants/annapurna-veg/cover.webp',
  
  // WhatsApp Phone Number (International format with country code, NO '+' or spaces)
  // For India: 91 followed by 10-digit mobile number
  whatsappNumber: '919822001122',
  
  currency: 'INR',
  currencySymbol: '₹',
  locale: 'en-IN',
  
  address: 'Shop 10, Market Yard Road, Pune - 411037',
  fssaiNumber: '21524099000123',
  
  // Order types: 'dine-in', 'takeaway', 'delivery'
  enabledOrderTypes: ['dine-in', 'takeaway'],
  
  // Configured tables for QR code generation & validation
  tables: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  
  // Optional custom branding colors
  branding: {
    primaryColor: '#2d1d4b',
    primaryHover: '#40275f',
    accentColor: '#d2b64f',
    backgroundColor: '#fbf7ee'
  },
  
  // Menu Categories
  categories: [
    { id: 'all', name: 'All', nameMr: 'सर्व', icon: 'sparkle' },
    { id: 'thali', name: 'Special Thali', nameMr: 'थाळी', icon: 'dot' },
    { id: 'snacks', name: 'Snacks', nameMr: 'नाष्टा', icon: 'dot' },
    { id: 'beverages', name: 'Beverages', nameMr: 'पेये', icon: 'coffee' }
  ],
  
  // Menu Items
  menuItems: [
    {
      id: 'special-veg-thali',
      name: 'Special Maharashtrian Thali',
      nameMr: 'स्पेशल व्हेज थाळी',
      description: '2 Sabji, Dal Tadka, 3 Chapatis, Steamed Rice, Sweet Gulab Jamun, Papad and Pickle',
      descriptionMr: '२ भाज्या, डाळ तडका, ३ पोळ्या, भात, १ गुलाबजाम, पापड व लोणचे',
      price: 180,
      categoryId: 'thali',
      image: 'assets/restaurants/annapurna-veg/thali.webp',
      available: true,
      featured: true,
      sortOrder: 1
    },
    {
      id: 'kande-pohe',
      name: 'Dadpe & Kande Pohe',
      nameMr: 'कांदे पोहे',
      description: 'Poha tempered with mustard, curry leaves, crunchy peanuts, fresh coconut and lemon',
      descriptionMr: 'गरमागरम खमंग कांदे पोहे',
      price: 40,
      categoryId: 'snacks',
      image: 'assets/restaurants/annapurna-veg/pohe.webp',
      available: true,
      featured: false,
      sortOrder: 2
    }
  ]
};
```

---

## Step 3: Add Photos and Logo

Create a folder: `assets/restaurants/<slug>/`
1. Add the restaurant's logo (`logo.svg` or `logo.webp`).
2. Add food images corresponding to the `image` paths in your `menuItems` array.
3. If an image is missing or cannot load, the menu automatically displays the graceful shared fallback image (`assets/shared/food-fallback.webp`).

---

## Step 4: Include the File in HTML Pages

Open `index.html` and `qr-generator.html`. Add one line inside the `<script>` imports:

```html
<script src="data/restaurants/annapurna-veg.js"></script>
```

*(Optional for directory path navigation)*:
Create a folder `annapurna-veg/` and add an `index.html` containing:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script>window.location.replace('../index.html?r=annapurna-veg' + (window.location.search ? '&' + window.location.search.slice(1) : ''));</script>
</head>
</html>
```

---

## Step 5: Test the Restaurant Locally

Open Live Server or your local web server:
- Open `http://localhost:8080/index.html?r=annapurna-veg`
- Open table link: `http://localhost:8080/index.html?r=annapurna-veg&table=2`
- Verify that the branding, food items, Marathi names, and prices appear accurately.
- Add an item to the cart, check the subtotal, and tap **Place order on WhatsApp**.

---

## Step 6: Generate & Print Production QR Table Cards

1. Open `http://localhost:8080/qr-generator.html?r=annapurna-veg`
2. Ensure the **Production Base URL** is set to your deployed Cloudflare Pages domain (e.g. `https://my-menu.pages.dev`).
3. Click **🖨️ Print All Table Cards** or **⬇️ Download PNG** to print acrylic stand inserts for tables 1 through 10!
