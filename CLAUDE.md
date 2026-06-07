# KLARE — Project Briefing

## Project Overview

**KLARE** is an e-commerce brand importing German DM skincare and baby care products (Balea, Babylove) from Germany to Pakistan, selling online with Cash on Delivery (COD).

## Tech Stack

- **Plain HTML, CSS, and JavaScript only.** No frameworks. No build tools. No npm.
- The site must work as simple static files served from any basic web server.
- No transpilation, no bundlers, no package.json.

## Design

- **Mobile-first** layout (90% of audience is on mobile phones).
- Clean European minimal aesthetic.
- **Brand colours:**
  - Forest green: `#2D5A27`
  - White: `#FFFFFF`
  - Warm grey accent: `#F5F5F0`
- Fast loading optimised for slow mobile internet in Pakistan.
- Brand name displayed as **KLARE**.

## Target Audience

- Pakistani customers, predominantly on mobile phones.
- Content in English with some Urdu words mixed in naturally.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Homepage |
| `products.html` | Product listings |
| `product-balea.html` | Balea brand detail page |
| `product-babylove.html` | Babylove brand detail page |
| `order.html` | COD order form |
| `about.html` | About / trust page |

## Required Elements on Every Page

- Header with KLARE logo and navigation
- WhatsApp button linking to `wa.me/92XXXXXXXXXX` *(phone number to be filled in)*
- Footer

## Order Form Fields

- Full name
- City
- Complete address
- Phone number
- Product selection
- Quantity
- Notes (optional)

## Trust Elements

A dedicated section (prominently on `about.html`, referenced on other pages) showing:
- DM store receipt photo
- German customs document
- EU certification badges

## File Structure

```
/index.html
/products.html
/product-balea.html
/product-babylove.html
/order.html
/about.html
/css/style.css
/js/main.js
/images/               ← empty, images to be added later
/images/products/      ← empty, product images
/images/trust/         ← empty, trust/receipt images
```

## Notes

- All image folders exist but are empty; use placeholder styles until real images are added.
- WhatsApp CTA should be sticky/floating on mobile for easy access.
- COD is the only payment method — no payment gateway integration needed.
