# 🍽️ QR Digital Menu & WhatsApp Ordering Platform

A production-ready, reusable static web platform designed for selling customized digital menus to independent Indian restaurants, cafes, hotels, and food businesses for **₹999 per setup** with zero ongoing server costs.

Inspired directly by modern food app design aesthetics, featuring a warm cream background, deep royal purple controls, golden yellow accents, English and Marathi dual typography, and one-tap WhatsApp ordering.

---

## 🌟 Visual References & Design System

The visual design recreates the target mobile app screenshots:

- **Warm Cream Background:** `#fbf7ee`
- **Deep Royal Purple:** `#2d1d4b` (Primary buttons, active category pills, header text)
- **Golden Yellow Accent:** `#d2b64f` (Price badges, category dot icons, star icons, cart count badges)
- **Rounded Surfaces:** `28px` card radii with soft shadows
- **Floating Cart Button:** Dark purple pill with golden bag icon and yellow counter badge
- **Dual Language Support:** Crisp English headings with Marathi (मराठी) subtitles

---

## 🚀 Key Features

1. **Multi-Restaurant Architecture:** Single repository and static build supporting multiple client restaurants via URL query parameter (`?r=sai-hotel`) or path routing (`/sai-hotel/`).
2. **Table-Specific QR Ordering:** Deep links (`?table=12`) display a verified table badge in the header, prefill table numbers in checkout, and lock table data into the WhatsApp message.
3. **Live Search & Category Filtering:** Interactive search across English names, Marathi names, and item descriptions, combined with active category pill filters.
4. **Client-Side Cart & Subtotals:** Real-time quantity adjustments, per-item calculation (`₹80 × 4 = ₹320`), accurate grand total, and restaurant-isolated browser storage.
5. **WhatsApp Click-to-Chat Dispatch:** Formats a structured order receipt with reference number, table number, order type, items, and grand total into a standard `https://wa.me/` link.
6. **Built-in Table QR Code Studio:** Generate, preview, and batch-print high-resolution scannable QR cards with acrylic stand layouts via `qr-generator.html`.
7. **Zero-Cost Hosting:** Runs 100% statically on **Cloudflare Pages Free** or GitHub Pages with no backend servers, databases, or monthly bills.

---

## 📁 Repository Structure

```text
Restaurant Digital Menu/
├── index.html                   # Core Digital Menu application & Restaurant Hub
├── qr-generator.html            # Table QR Code Studio & Print Generator
├── 404.html                     # Friendly error page with demo restaurant recovery
├── _redirects                   # Cloudflare Pages SPA rewrite configuration
├── css/
│   ├── variables.css            # Design system tokens (colors, radii, shadows)
│   ├── base.css                 # Reset, typography, accessibility focus states
│   ├── layout.css               # App shell, header, search bar, footer
│   ├── components.css           # Search pill, category pills, food cards, cart modal
│   ├── responsive.css           # Viewport rules (320px to 1440px)
│   └── print.css                # Print styles for acrylic table QR stands
├── js/
│   ├── config.js                # Production base URL and global configuration
│   ├── utils.js                 # HTML escape, currency formatting, order refs
│   ├── router.js                # Restaurant slug and table number resolver
│   ├── restaurant-loader.js     # Dynamic branding, SEO tags, header renderer
│   ├── menu-renderer.js         # Category pills and food card renderer
│   ├── search-filter.js         # Live search across English & Marathi names
│   ├── cart.js                  # Isolated cart state, calculations, checkout UI
│   ├── whatsapp.js              # WhatsApp message builder & transparent feedback
│   ├── qr-generator.js          # QR code canvas renderer and download manager
│   ├── app.js                   # Main application orchestration script
│   └── lib/
│       └── qrcode.min.js        # Offline standalone pure JS QR library (19 KB)
├── data/
│   ├── registry.js              # Central restaurant directory & schema validator
│   └── restaurants/
│       ├── sai-hotel.js         # Hotel Sai (Pure Veg South Indian & Snacks)
│       ├── cafe-aroma.js        # Café Aroma & Bakery (Burgers, Coffee, Fries)
│       └── shivraj-snacks.js    # Shivraj Snacks (Misal Pav, Vada Pav, Chai)
├── assets/
│   ├── shared/                  # Fallback food image and shared icons
│   └── restaurants/             # Restaurant logos, banners, and food photography
└── docs/
    ├── NEW_RESTAURANT_SETUP.md  # 10-minute guide to add a new client restaurant
    ├── DEPLOYMENT.md            # Cloudflare Pages & GitHub free deployment guide
    └── TESTING.md               # QA report across viewports and business logic
```

---

## ⚡ Quick Start (Local Development)

1. Open the project folder in **VS Code**.
2. If you have the **Live Server** extension:
   - Right-click `index.html` > **Open with Live Server**.
3. Or using Python:
   ```bash
   python -m http.server 8080
   ```
4. Open in your browser:
   - **Hotel Sai (Table 12):** `http://localhost:8080/index.html?r=sai-hotel&table=12`
   - **Café Aroma (Table 3):** `http://localhost:8080/index.html?r=cafe-aroma&table=3`
   - **Shivraj Snacks:** `http://localhost:8080/index.html?r=shivraj-snacks`
   - **QR Studio:** `http://localhost:8080/qr-generator.html`

---

## 📦 Third-Party Dependencies

This project deliberately avoids npm packages, frameworks, or bundlers:

| Dependency | Purpose | How it is included |
| :--- | :--- | :--- |
| **QRCode.js** | Generates offline high-contrast canvas QR codes | Standalone script in `js/lib/qrcode.min.js` (19 KB) |
| **Google Fonts** (`Outfit`, `Mukta`) | Modern typography with native Devanagari / Marathi support | CSS `@import` in `css/base.css` |

---

## 💡 How to Add a New Client Restaurant

To sell this template to a new restaurant for ₹999:
1. Create `data/restaurants/<new-slug>.js` from the template.
2. Put the restaurant's logo and food photos into `assets/restaurants/<new-slug>/`.
3. Add `<script src="data/restaurants/<new-slug>.js"></script>` to `index.html`.
4. Open `qr-generator.html?r=<new-slug>` and print their acrylic table stands!

👉 Full step-by-step instructions: [docs/NEW_RESTAURANT_SETUP.md](docs/NEW_RESTAURANT_SETUP.md).

---

## ⚠️ Known Technical Limitations (By Design)

Because this product is built as a zero-cost static web application without a central server or database:
- **No Automatic Delivery Confirmation:** Clicking the WhatsApp button opens WhatsApp with the order prefilled. The customer must tap "Send" in WhatsApp, and the restaurant staff confirms the order in chat.
- **Client-Side Cart Storage:** Cart items are stored temporarily in browser storage (`sessionStorage` / `localStorage`) scoped to the specific restaurant. They are not stored in a persistent database.
- **Menu Updates:** Updating prices or dishes requires editing the restaurant's JavaScript file and redeploying to Cloudflare Pages (which takes under 30 seconds).

---

## 📄 Documentation Links

- [New Restaurant Client Setup Guide](docs/NEW_RESTAURANT_SETUP.md)
- [Cloudflare Pages & GitHub Free Hosting Guide](docs/DEPLOYMENT.md)
- [Comprehensive Testing & QA Report](docs/TESTING.md)
