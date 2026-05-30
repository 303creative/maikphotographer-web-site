# 📱 Marketing Portfolio Web Section

## Overview

A complete landing page showcasing your **real case studies** from the `/public/img/marketing` folder.

**File**: `/public/marketing.html`

**Features:**
- ✅ 6 real case study cards with images
- ✅ Premium dark theme (matches main site)
- ✅ Mobile-first responsive design
- ✅ Service offerings (photography + marketing)
- ✅ Process explanation (5 steps)
- ✅ Clear CTAs (WhatsApp, Pricing)
- ✅ Professional footer with links

---

## Case Studies Displayed

### 1. D'Homes Group
- **Category**: Real Estate
- **Focus**: Architectural photography
- **Stats**: 14 properties, 40% growth
- **Image**: `/img/marketing/Fotos Corporativas D´Homes Group/`

### 2. Sazón Latino Catering
- **Category**: Catering & Food
- **Focus**: Food photography + Instagram content
- **Stats**: 23 photos, 35% orders increase
- **Image**: `/img/marketing/Fotos de Sazón Latino Catering/`

### 3. Velora Design Studio
- **Category**: Brand Design
- **Focus**: Visual identity + marketing collateral
- **Stats**: 3 design assets, 50% engagement increase
- **Image**: `/img/marketing/Posters Velora (caso de estudio)/`

### 4. Aurelia Residence
- **Category**: Real Estate Marketing
- **Focus**: Residential property marketing
- **Stats**: 6 marketing materials, 60% leads increase
- **Image**: `/img/marketing/Posters Aurelia Residence (caso de estudio)/`

### 5. Good Trip Viajes
- **Category**: Travel & Tourism
- **Focus**: Destination photography
- **Stats**: 7 campaigns, 45% bookings increase
- **Image**: `/img/marketing/Posters de Good Trip Viajes/`

### 6. Monrowelle Magazine
- **Category**: Editorial & Publishing
- **Focus**: Editorial photography + content direction
- **Stats**: 20 features, 8k readers
- **Image**: `/img/marketing/Posters Monrowelle/`

---

## Services Highlighted

### 📸 Professional Photography
Product, food, architecture, team, and lifestyle photography.

### 🎬 Video Content
Reels, TikToks, testimonials, brand stories (short & long-form).

### 📱 Social Strategy
Instagram, TikTok, Facebook optimization. Posts, calendars, audience growth.

### ✨ Brand Design
Logos, posters, social graphics, marketing collateral.

### 📊 Content Strategy
Analytics, growth tracking, optimization, data-driven decisions.

### 🎯 Email Marketing
Professional email templates and personalized campaigns.

---

## The Process (5 Steps)

1. **Discovery** — Learn about your business, goals, and challenges
2. **Strategy** — Custom plan for photography, content, posting, metrics
3. **Production** — Professional shoot, editing, mobile optimization
4. **Launch** — Content goes live with optimal timing and hashtags
5. **Growth** — Monthly reviews, new content, continuous optimization

---

## Design Elements

### Color Palette (Dark Premium)
```css
Background:        #0B0C0A (dark black)
Surface:           #0E0F0D
Accent:            #141512
Gold Primary:      #D8C18A
Gold Secondary:    #C7B68A
Text (White):      #E6E3D8
Text (Muted):      #9B978B
Border:            rgba(216,193,138,.12)
```

### Typography
- **Headlines**: Jost (300-600 weight)
- **Body**: Inter (300-500 weight)
- **Responsive sizing**: clamp() for fluid fonts

### Responsive Breakpoints
- **Desktop**: Full width, optimal readability
- **Tablet (768px)**: 2-column grid
- **Mobile (480px)**: Single column, large touch targets

---

## Layout Sections

### Header
- Logo (left)
- Navigation (Home, Pricing, Sessions, Marketing)
- Language toggle (ES/EN button)
- CTA (Get in Touch)

### Hero
- Headline: "Photography + Strategic Marketing"
- Subheadline: "Professional visuals & content strategy..."
- CTA Button: "See Our Work" → scrolls to case studies

### Stats
- 150+ Businesses Helped
- 8.5k+ Combined Growth
- 98% Client Satisfaction

### Case Studies
- 6 cards in responsive grid
- Each card: image, category, title, description, stats
- Hover effect: scale image, brighten border

### Services (6 items)
- Each with emoji icon
- Hover effect on card background

### Process
- 5 numbered steps
- Description under each
- Clean layout with borders

### Call to Action
- Large section with gradient background
- Headline + description
- 2 buttons: Primary (WhatsApp), Secondary (Pricing)

### Footer
- Links grouped by category (Services, Connect, Location)
- Copyright info
- Responsive footer grid

---

## Navigation Integration

### Where marketing.html is linked:

1. **Header Navigation**
   - Added "Marketing" link in main nav
   - Styled to match "Services", "Pricing", "Sessions"

2. **Sidebar/Mobile Menu**
   - Included in mobile navigation

3. **Other pages**
   - index.html: Could add section about marketing services
   - pricing.html: "Add marketing to your package" CTA
   - sessions.html: "Combine with marketing strategy" option

---

## URL Structure

```
www.maikphotographer.com/
├── /                    ← Home / Index
├── /pricing             ← Pricing packages
├── /sessions            ← Session booking landing
├── /marketing           ← THIS PAGE (case studies + strategy)
└── /img/marketing/      ← Portfolio images folder
    ├── Fotos Corporativas D´Homes Group/
    ├── Fotos de Sazón Latino Catering/
    ├── Posters Aurelia Residence/
    ├── Posters de D´Homes Group/
    ├── Posters de Good Trip Viajes/
    ├── Posters Monrowelle/
    └── Posters Velora/
```

---

## Image Optimization

### Image Paths
All case study images use relative paths:
```html
<img src="/img/marketing/Fotos Corporativas D´Homes Group/photo-1.jpg" 
     alt="D'Homes Group" 
     loading="lazy">
```

### Responsive Images
- **Desktop**: Full width responsive
- **Tablet**: 50% width of container
- **Mobile**: 100% width, optimized height

### Format Recommendations
- **Portfolio images**: WebP with JPG fallback
- **Size**: Optimize to < 500KB per image
- **Aspect ratio**: Maintain 16:9 or 4:3

### Loading Strategy
- `loading="lazy"` on all images below fold
- Images load on scroll (saves bandwidth)
- Mobile users only load images when needed

---

## SEO & Metadata

### Page Meta Tags
```html
<title>Photography + Marketing Services — Maikel Marshall | Miami</title>
<meta name="description" 
      content="Professional photography and social media marketing for restaurants, boutiques, real estate, and more. Real case studies from Miami businesses.">
<meta property="og:title" content="Photography + Marketing Services — Maikel Marshall">
<meta property="og:image" content="/img/marketing/Fotos Corporativas D´Homes Group/photo-1.jpg">
```

### Schema Markup (Recommended)
Add structured data for search engines:
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Maikel Marshall Photography",
  "image": ["https://www.maikphotographer.com/img/marketing/..."],
  "description": "Professional photography and marketing services",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Miami",
    "addressRegion": "FL"
  },
  "telephone": "+1-786-332-9815"
}
```

---

## Performance Metrics

### Page Load Optimization
- Lazy loading images ✅
- CSS inlined (no external requests) ✅
- Minimal JavaScript (cursor + header sticky) ✅
- Mobile-first responsive ✅

### Expected Page Speed
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 3s
- Cumulative Layout Shift: < 0.1

---

## Customization Guide

### Change Case Study Image

1. Replace image path:
```html
<img src="/img/marketing/Fotos Corporativas D´Homes Group/photo-1.jpg" 
     alt="D'Homes Group">
     
<!-- Change to: -->
<img src="/img/marketing/FOLDER_NAME/photo-1.jpg" 
     alt="New Title">
```

2. Update category, title, description, stats

3. Test responsive display

### Add New Case Study

1. Create new `<div class="case-card">` in grid
2. Copy structure from existing card
3. Update: image path, category, title, description, stats
4. Test mobile responsiveness

### Update Statistics

Replace stat values in stats section:
```html
<div class="stat-item">
  <h3>200+</h3>
  <p>New Stat Here</p>
</div>
```

### Change Colors

Edit CSS variables at top of `<style>`:
```css
:root {
  --gold: #D8C18A;      /* Change to new color */
  --bg: #0B0C0A;        /* Change background */
  --white: #E6E3D8;     /* Change text */
}
```

---

## Responsive Testing Checklist

- [ ] Desktop (1440px+) → 2-3 column grid
- [ ] Tablet (768px) → 2 column grid
- [ ] Mobile (480px) → 1 column grid
- [ ] Case cards responsive height
- [ ] Images scale proportionally
- [ ] Text readable on all sizes
- [ ] Buttons touch-friendly (44px+)
- [ ] Header navigation collapses on mobile
- [ ] Footer stacks vertically on mobile

---

## Integration with Email System

The marketing.html portfolio images can be used in **email templates** too:

### Current Email Template Images
- Uses Unsplash images (generic)

### Future Enhancement
- Use real portfolio images from `/public/img/marketing/`
- Example in email: "Check out this real project: [image + link]"
- Convert images to base64 for email embedding

---

## Analytics Recommendation

Add Google Analytics to track:
- Page views
- Click-through rate (on CTA buttons)
- Scroll depth (how far users scroll)
- Device type (mobile vs desktop)
- Traffic source

```html
<!-- Add to <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## Changelog

### v1.0 (2026-05-30)
- ✅ Created marketing.html landing page
- ✅ 6 real case studies integrated
- ✅ Premium dark theme matching main site
- ✅ Mobile-first responsive design
- ✅ Service offerings section
- ✅ Process explanation (5 steps)
- ✅ CTA buttons (WhatsApp + Pricing)
- ✅ Professional footer with navigation

---

**This page is the visual story of your marketing + photography impact.**
