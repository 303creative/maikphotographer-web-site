# Branding Skill — Visual & Identity Standards

## Objetivo
Guiar agentes en mantener consistencia visual y de marca en todos los touchpoints.

---

## 1. BRAND IDENTITY: THE303 CREATIVE

### Brand Essence
```
Name:        The303 Creative
Founder:     Maikel Marshall (Photographer + Creative Director)
Location:    Miami, FL
Industry:    Photography, Creative Direction, Marketing
Positioning: Cinematic storyteller for brands & individuals
```

### Brand Pillars
```
1. CINEMATIC  → Film-like quality, visual storytelling
2. AUTHENTIC  → Real stories, no generic marketing
3. CREATIVE   → Direction included, collaboration
4. STRATEGIC  → Marketing angle, not just art
5. RELIABLE   → 48h delivery, professional execution
```

---

## 2. VISUAL IDENTITY

### Color Palette

**Primary**
- Accent Orange: **#FF5722** (cinematic, energetic)
- Dark Background: **#0A0A0A** (premium, not black)

**Secondary**
- Text Primary: **#FFFFFF**
- Text Secondary: **#8A8A8E** (subtle, not harsh)
- Text Tertiary: **#636366**
- Border Light: **rgba(255,255,255,0.06)**
- Border Hover: **rgba(255,255,255,0.12)**

**Accent Green**
- Status/Live: **#00D084** (vibrant for badges)

### Color Usage Rules

```
PRIMARY (Orange #FF5722):
- Use for: Main CTAs, links, highlights
- Avoid: Text on orange background (contrast fail)
- Hover: Darken to #E64A19

DARK BG (#0A0A0A):
- Use for: Page background (premium feel)
- Avoid: Pure black #000000 (too harsh)
- Variation: #0F0F0F, #161616, #1A1A1A for depth

TEXT:
- Primary #FFFFFF: Main copy, headings
- Secondary #8A8A8E: Body text, secondary info
- Tertiary #636366: Captions, footnotes
- Accent: Only for interactive elements

BORDERS:
- Default: rgba(255,255,255,0.06) — barely visible
- Hover: rgba(255,255,255,0.12) — subtle change
- Accent: rgba(255,87,34,0.4) — for accent elements
```

---

## 3. TYPOGRAPHY

### Font Stack
```
Headlines:    Bebas Neue (geometric, bold, max 1.0 line-height)
Body:         -apple-system, BlinkMacSystemFont, Inter, sans-serif
Mono/Code:    JetBrains Mono (technical, consistent-width)
```

### Hierarchy
```
H1: clamp(56px, 10vw, 140px)   — Page hero titles
H2: clamp(36px, 6vw, 80px)     — Section titles
H3: clamp(22px, 3vw, 36px)     — Card/subsection titles
Body: 15px                       — Main copy
Small: 13px                      — Secondary text
Tiny: 10px                       — Labels, tags
```

### Font Weights
```
Bebas Neue:    700 (one weight, always bold)
Inter:         300 (light), 400 (regular), 500 (medium)
JetBrains:     400 (regular, always this weight)
```

### Line Height
```
Headlines:     1.0 (tight, powerful)
Body:          1.6 (readable, breathing)
Small:         1.4 (balanced)
```

---

## 4. SPACING SYSTEM

### Padding Scale
```
xs:  4px      — Icon internal padding
sm:  8px      — Component gaps
md:  16px     — Element padding
lg:  24px     — Card padding minimum
xl:  32px     — Section margin
2xl: 48px     — Hero/large spacing
3xl: 96px     — Section padding minimum
```

### Rules
- Cards: **minimum 48px** padding (not 32px)
- Sections: **minimum 96px** padding
- Gaps between elements: **minimum 24px**
- Buttons: **14px vertical**, **28px horizontal**

---

## 5. COMPONENTS & PATTERNS

### Buttons

**Primary Button**
```
Background:    #FF5722
Padding:       14px 28px
Border-radius: 12px
Font:          Inter 500, 13px, uppercase
Transition:    150ms cubic-bezier(0.4, 0, 0.2, 1)
Hover:         
  - Darken to #E64A19
  - Lift shadow (0 8px 32px rgba(0,0,0,0.4))
  - TranslateY -3px
```

**Ghost Button**
```
Background:    rgba(255,255,255,0.05) + backdrop-filter blur(20px)
Border:        1px solid rgba(255,255,255,0.12)
Padding:       14px 28px
Border-radius: 12px
Font:          Inter 500, 13px, uppercase
Hover:
  - Border to #FF5722
  - Text to #FF5722
  - Background rgba(255,87,34,0.08)
```

### Cards

**Default Card**
```
Background:    #0A0A0A
Border:        1px solid rgba(255,255,255,0.06)
Border-radius: 16px
Padding:       48px minimum
Hover:
  - Border to rgba(255,255,255,0.12)
  - Background shift or elevation
```

**Portfolio Card**
```
Image:         3:4 aspect ratio
Border-radius: 16px
Watermark:     opacity 0.15
Overlay:       Light leak + vignette on hover
Reveal:        scaleX animation (1.2s power4.inOut)
```

---

## 6. LOGO & MARK USAGE

### Logo Files
```
01_logo_mk_blanco_principal.svg    — Primary (white)
01_logo_mk_naranja_secundario.svg  — Secondary (orange)
01_logo_mk_negro.svg                — Dark background
02_logo_horizontal_blanco.svg       — Wide format (footer)
```

### Logo Rules
```
Minimum size:    120px wide (nav), 200px (footer)
Clear space:     1x height on all sides
Backgrounds:     Dark only (#0A0A0A or darker)
Colors:          White, orange, or negative space only
Never:
  - Stretch or compress
  - Add drop shadow
  - Change colors
  - Put on light background
```

---

## 7. IMAGERY STYLE

### Photography
```
✓ Cinematic lighting (golden hour, soft, natural)
✓ Shallow focus (isolated subject, blurred background)
✓ Warm color grading (3200-3800K, film-like)
✓ Intentional composition (rule of thirds, depth)
✓ Professional editing (consistent across series)

✗ Harsh direct sunlight
✗ Flat fluorescent lighting
✗ Deep depth-of-field (everything sharp)
✗ Cold color temperature
✗ Over-processed or artificial look
✗ Generic stock photos
```

### Icons & Graphics
```
Style:           Minimalist, outline-based
Stroke:          1-2px (consistent)
Colors:          White, accent orange, or grays
Border-radius:   2-4px (subtle)
Grid alignment:  24x24px minimum
Never:           Filled, skeuomorphic, or colorful
```

---

## 8. INTERACTION DESIGN

### Transitions
```
Hover:          150ms cubic-bezier(0.4, 0, 0.2, 1)
Active/Click:   100ms scale(0.95)
Modal/Page:     300ms cubic-bezier(0.4, 0, 0.2, 1)
Scroll:         1.0s easing smooth (Lenis)
```

### States
```
Default:        Normal appearance
Hover:          Subtle elevation + color shift
Active:         Darker, more pronounced
Disabled:       Lower opacity (0.5), no hover
Focus:          Border color accent (for keyboard)
Loading:        Spinner or placeholder
Error:          Red/warning color highlight
```

---

## 9. RESPONSIVE DESIGN

### Breakpoints
```
Mobile:   < 768px   (1 column, touch-friendly, large tap targets)
Tablet:   768-1024px (2-3 columns, balanced)
Desktop:  > 1024px  (full experience, all effects enabled)
```

### Spacing Adjustments
```
Mobile:    padding: clamp(20px, 5vw, 48px)
Tablet:    padding: clamp(40px, 8vw, 80px)
Desktop:   padding: clamp(60px, 10vw, 120px)
```

---

## 10. CONSISTENCY CHECKLIST

When reviewing design work:

- [ ] Colors match brand palette exactly
- [ ] Typography follows hierarchy (correct sizes & weights)
- [ ] Spacing uses scale system (no random values)
- [ ] Buttons are primary or ghost (no other styles)
- [ ] Cards have 48px+ padding minimum
- [ ] Border-radius consistent (12-16px for interactive)
- [ ] Transitions use brand easing
- [ ] Logo usage follows guidelines
- [ ] Photography is cinematic, not generic
- [ ] Responsive breakpoints respected
- [ ] No colors from outside palette
- [ ] Icons are minimalist outline style
- [ ] Touch targets 44x44px minimum (mobile)

---

## 11. DESIGN DEBT & TECH DEBT

### Technical Specifications

**CSS Variables (Must Use)**
```css
--bg:            #0A0A0A
--text:          #FFFFFF
--text-2:        #8A8A8E
--accent:        #FF5722
--border:        rgba(255,255,255,0.06)
--ease-smooth:   cubic-bezier(0.4, 0, 0.2, 1)
```

**Asset Specs**
```
Portfolio images: 0.38-0.63 MB (JPG quality 75)
Hero images:      < 2 MB
Icons:            SVG inline (no separate requests)
Videos:           Optimized MP4, poster image included
```

---

## 12. BRAND EXTENSIONS

### Future Services/Products
When expanding brand:

```
Same palette:     Always use #FF5722 + #0A0A0A
Same typography:  Bebas + Inter
Same voice:       Cinematic, authentic, strategic
Same spacing:     Generous (48px+ cards)
Same patterns:    Hover effects, transitions, micro-interactions
```

---

**Consistency builds trust. Every detail matters.**
