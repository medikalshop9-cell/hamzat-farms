# Hamzat Farms Website

React + Vite + Tailwind CSS website for Hamzat Farms, Kokobiriko, Ashanti, Ghana.

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── App.jsx                    # Root — assembles all sections
├── main.jsx                   # React entry point
├── index.css                  # Tailwind + global styles
├── constants.js               # All brand data, pricing, WhatsApp config
└── components/
    ├── Navbar.jsx             # Sticky nav + mobile hamburger
    ├── Hero.jsx               # Full-screen hero with CTAs
    ├── About.jsx              # Farm story + animated stat counters
    ├── Products.jsx           # Egg & live bird pricing tables
    ├── BookVisit.jsx          # Farm visit booking form (WhatsApp)
    ├── Contact.jsx            # Contact info + Formspree form
    ├── Footer.jsx             # Links, social icons, copyright
    └── WhatsAppFloat.jsx      # Fixed floating WhatsApp button
```

## Configuration

All editable values live in `src/constants.js`:
- WhatsApp number
- Email, Facebook URL, TikTok URL
- Egg pricing (EGG_PRICES array)
- Live bird pricing (BIRD_PRICES array)
- Farm visit time slots (VISIT_SLOTS array)

## TODOs Before Launch

- [ ] Add your logo PNG to `public/assets/hamzat-farms-logo.png`
- [ ] Replace hero background image with real farm photo (update URL in `Hero.jsx`)
- [ ] Replace about section image with a real farm photo
- [ ] Set up Formspree at https://formspree.io and paste your form ID in `Contact.jsx`
- [ ] Add TikTok URL to `constants.js` once available
- [ ] Confirm farm visit days/times and update `VISIT_SLOTS` in `constants.js`
- [ ] Add AI chatbot script (Tidio/Botpress/Crisp) to `index.html`

## Deployment Options

### Vercel (recommended — free)
```bash
npm i -g vercel
vercel deploy
```

### Netlify (free)
```bash
npm run build
# Drag the dist/ folder to https://app.netlify.com/drop
```

### GitHub Pages
```bash
npm run build
# Push dist/ contents to your gh-pages branch
```

## Adding Real Photos

Replace placeholder images with your actual farm photos:
1. Put images in `public/assets/`
2. Reference them as `/assets/your-photo.jpg`
3. Compress to WebP format for performance (target: <200KB per image)

## AI Chatbot Integration

In `index.html`, replace `<!-- AI CHATBOT PLACEHOLDER -->` with your widget script.

**Tidio (easiest):**
```html
<script src="//code.tidio.co/YOUR_KEY.js" async></script>
```

**Crisp:**
```html
<script>
  window.$crisp=[];
  window.CRISP_WEBSITE_ID="YOUR_ID";
  (function(){var d=document;var s=d.createElement("script");
  s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
</script>
```
