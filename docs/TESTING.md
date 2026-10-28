# 🧪 Digital QR Menu Platform — Testing & Quality Assurance Report

This document records the automated and browser verification results across all components, business rules, and device viewports.

---

## 1. Automated & Browser Test Results Summary

| Test Area | Scenario Tested | Result | Verification Notes |
| :--- | :--- | :---: | :--- |
| **Restaurant Routing** | `?r=sai-hotel` loads Hotel Sai branding | **PASS** | Deep purple branding, Marathi tagline, and South Indian menu rendered. |
| **Restaurant Routing** | `?r=cafe-aroma` loads Café Aroma | **PASS** | Brown/amber palette, cafe menu items, burger & cappuccino cards displayed. |
| **Restaurant Routing** | Unknown slug (e.g. `?r=unknown-place`) | **PASS** | Renders friendly 404 page with recovery links to demo restaurants. |
| **Table Resolution** | `?r=sai-hotel&table=12` | **PASS** | Table 12 badge displayed in header; prefilled into cart for Dine-in. |
| **Table Validation** | Table 99 on Sai Hotel (configured 1-16) | **PASS** | Shows unverified table notification and prompts user confirmation. |
| **Search Functionality** | Searching "dosa" | **PASS** | Filters cards in real time to Plain Dosa, Masala Dosa, and Mysore Masala Dosa. |
| **Search Functionality** | Searching in Marathi ("साधा") | **PASS** | Case-insensitive Marathi text match correctly isolates Plain Dosa. |
| **Category Filters** | Category pill click ("Dosa", "Combos") | **PASS** | Active class toggles to dark purple with gold accent; cards filter instantly. |
| **Cart Quantities** | Increase Plain Dosa to 4 and click `+ Add` | **PASS** | Floating cart button appears with `Cart 4` pill badge. |
| **Cart Modal UI** | Open Cart Drawer | **PASS** | Matches Screenshot 3: Thumbnail, title, Marathi text, `₹80 × 4 = ₹320`, `Total ₹320`. |
| **Order Type Toggle** | Switch Dine-in / Takeaway | **PASS** | Table number input automatically hides when Takeaway is selected. |
| **WhatsApp Message** | Click "Place order on WhatsApp" | **PASS** | Generates clean `https://wa.me/919822012345?text=...` with reference code `#HSAI-...` |
| **QR Code Studio** | `qr-generator.html?r=sai-hotel` | **PASS** | Renders 15 high-contrast scannable QR cards with table numbers and download buttons. |
| **Print Layout** | Window print trigger on QR Studio | **PASS** | `@media print` cleanly isolates table cards for acrylic table tent stands. |

---

## 2. Responsive Viewport Testing Matrix

All required viewport widths were tested for layout integrity, touch targets, and horizontal overflow prevention:

| Viewport Width | Device Category | Overflow? | Touch Targets | Status |
| :---: | :--- | :---: | :---: | :---: |
| **320px** | Micro-screen (iPhone SE 1st gen) | None | 44px+ touch targets | **PASS** |
| **360px** | Compact Android (Galaxy S8) | None | Comfortable pill buttons | **PASS** |
| **375px** | Standard iPhone (iPhone 6/7/8/SE) | None | Matches Screenshot 1 & 2 | **PASS** |
| **390px** | iPhone 12/13/14/15 Pro | None | Pixel-aligned with design | **PASS** |
| **430px** | iPhone Pro Max / Plus | None | Generous card padding | **PASS** |
| **600px** | Small Tablet / Foldable | None | Flexible pill row wrap | **PASS** |
| **768px** | iPad Portrait | None | Centered comfortable modal | **PASS** |
| **1024px** | iPad Landscape / Small Laptop | None | 2-column menu grid | **PASS** |
| **1280px** | Desktop / MacBook Air | None | Max-width capped container | **PASS** |
| **1440px** | Large Desktop Monitor | None | Centered cards, no stretch | **PASS** |

---

## 3. Physical Phone Scanning Checklist (For Production Delivery)

Before handing over printed QR table cards to a restaurant owner:

1. [ ] Deploy to Cloudflare Pages and verify your custom domain or `*.pages.dev` URL is live.
2. [ ] Open `qr-generator.html` and confirm the **Production Base URL** contains your live HTTPS domain.
3. [ ] Print a test card on regular paper.
4. [ ] Open the camera app on an iPhone and an Android phone.
5. [ ] Point the camera at the printed QR code from a distance of 20–30 cm.
6. [ ] Confirm the menu opens immediately with the exact table number badge shown in the header.
7. [ ] Add test items, select "Dine-in", and tap "Place order on WhatsApp".
8. [ ] Verify WhatsApp opens the restaurant's chat with the complete prefilled order message.
