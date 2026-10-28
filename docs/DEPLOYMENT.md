# 🌐 Deployment Guide: GitHub & Cloudflare Pages (Free Hosting)

This guide walks you through deploying your Digital QR Menu platform to **Cloudflare Pages** for 100% free, high-speed global static hosting with zero server maintenance.

---

## 🛠️ Prerequisites

- A free [GitHub Account](https://github.com)
- A free [Cloudflare Account](https://cloudflare.com)
- Visual Studio Code installed locally

---

## Step 1: Open and Test in VS Code with Live Server

1. Open VS Code.
2. Select **File > Open Folder...** and choose `d:/suraj/digital menu card/Restaurant Digital Menu`.
3. If you have the **Live Server** extension installed in VS Code:
   - Right-click `index.html` and select **"Open with Live Server"**.
   - Your browser will open `http://127.0.0.1:5500/index.html`.

---

## Step 2: Initialize Git and Push to GitHub

Open the integrated terminal in VS Code (`Ctrl + ~`) and run:

```bash
# 1. Initialize git repository
git init

# 2. Stage all files
git add .

# 3. Create initial commit
git commit -m "Initial commit: Reusable QR Digital Menu and WhatsApp Ordering Platform"

# 4. Set default branch to main
git branch -M main

# 5. Create a new repository on github.com (e.g. 'restaurant-digital-menu')
# Then link your local repository and push:
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/restaurant-digital-menu.git
git push -u origin main
```

---

## Step 3: Connect to Cloudflare Pages (Free)

1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com).
2. On the left sidebar, click **Compute (Workers & Pages)** > **Create application** > **Pages** tab.
3. Click **"Connect to Git"**.
4. Select your GitHub repository: `restaurant-digital-menu`.
5. Set the build configuration:
   - **Project Name:** `my-digital-menu` (or your chosen name)
   - **Production Branch:** `main`
   - **Framework Preset:** `None` (Static HTML/JS)
   - **Build command:** *(leave empty)*
   - **Build output directory:** `.` (root directory)
6. Click **Save and Deploy**.

Cloudflare will deploy your site in ~15 seconds and provide you with a production URL:
`https://my-digital-menu.pages.dev`

---

## Step 4: Configure the Production Base URL

Once your Cloudflare URL is assigned:

1. Open `js/config.js` in VS Code.
2. Update `productionBaseUrl` with your actual deployed URL:
   ```javascript
   const APP_CONFIG = {
     productionBaseUrl: 'https://my-digital-menu.pages.dev',
     // ...
   };
   ```
3. Commit and push the update:
   ```bash
   git add js/config.js
   git commit -m "Set production base URL"
   git push
   ```
Cloudflare Pages will automatically redeploy within seconds!

---

## Step 5: Test Restaurant URLs & QR Codes

Your site is now live globally! Test the following URLs:

- **Hotel Sai:** `https://my-digital-menu.pages.dev/?r=sai-hotel`
- **Hotel Sai Table 12:** `https://my-digital-menu.pages.dev/?r=sai-hotel&table=12`
- **Café Aroma Table 4:** `https://my-digital-menu.pages.dev/?r=cafe-aroma&table=4`
- **Shivraj Snacks Table 1:** `https://my-digital-menu.pages.dev/?r=shivraj-snacks&table=1`
- **Table QR Code Studio:** `https://my-digital-menu.pages.dev/qr-generator.html`

Open `qr-generator.html`, verify that the production URL matches, and print the table cards for your client!

---

## 🔒 Custom Domain Setup (Optional)

If your client wants their own custom domain (e.g. `menu.hotelsai.in`):
1. In Cloudflare Pages, go to **Custom Domains** > **Set up a domain**.
2. Enter the domain or subdomain and follow the automatic DNS prompt.
3. SSL certificates are automatically provisioned at no cost.
