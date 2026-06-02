# Taste Skill — Design & UX Guidelines

## Filosofía: "Less Slop, Designs Pop"

Evitar lo genérico. Diseño auténtico que refleja propósito.

---

## 1. TIPOGRAFÍA

### Sistema Font
- Primary: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif`
- Headings: `Bebas Neue` (bold, geometric, max 1.0 line-height)
- Body: `Inter` 400-500 (neutral, readable)
- Mono: `JetBrains Mono` (code, technical)

### Jerarquía
```
H1: clamp(56px, 10vw, 140px)  — Hero titles
H2: clamp(36px, 6vw, 80px)    — Section titles
H3: clamp(22px, 3vw, 36px)    — Card titles
Body: 15px (readable)
Small: 13px (secondary)
```

---

## 2. ESPACIADO (Generoso)

### Escala
```
xs:  4px      — icon spacing
sm:  8px      — element gaps
md:  16px     — component padding
lg:  24px     — card padding
xl:  32px     — section margins
2xl: 48px     — hero spacing
3xl: 96px     — section padding
```

### Regla: "Breathe"
- Cards: **mín 48px** padding (no 32px)
- Sections: **mín 96px** padding (no 80px)
- Gaps: **mín 24px** entre elementos

---

## 3. COLORES (Sutileza Apple)

### Paleta
```
Background:    #0A0A0A (no #000000 - más sutil)
Text 1:        #FFFFFF
Text 2:        #8A8A8E (no #888888 - azulado)
Text 3:        #636366
Border:        rgba(255,255,255,0.06) — casi invisible
Border Hover:  rgba(255,255,255,0.12)
Accent:        #FF5722 (naranja cinematográfico)
Accent Hover:  #E64A19
Green:         #00D084 (más vibrante que #22C55E)
```

### Vidrio
```
Background:    rgba(15,15,15,0.7)
Backdrop:      blur(30px)
Mix-blend:     screen o overlay (según contexto)
```

---

## 4. BORDES & RADIOS

### Radio Scale
```
Buttons:       12px (no 4px)
Cards:         16px (no 2px)
Inputs:        10px
Epic:          999px (full-round)
```

### Borders
```
Default:       1px solid rgba(255,255,255,0.06)
Hover:         1px solid rgba(255,255,255,0.12)
Accent:        1px solid rgba(255,87,34,0.4)
Thick:         2px solid rgba(255,255,255,0.25)
```

---

## 5. SOMBRAS (Realismo)

```css
--shadow-sm:  0 2px 8px rgba(0,0,0,0.3);
--shadow-md:  0 8px 32px rgba(0,0,0,0.4);
--shadow-lg:  0 24px 64px rgba(0,0,0,0.5);
```

**Uso:**
- Hover buttons: md
- Cards: sm
- Modals: lg

---

## 6. TRANSICIONES (Fluidas)

### Easing
```css
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);      /* Apple standard */
--ease:        cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Elegante */
--ease-b:      cubic-bezier(0.34, 1.56, 0.64, 1);    /* Bouncy */
```

### Duraciones
```
Hover:    150ms (responsive)
Scroll:   200ms (perceptible)
Modal:    300ms (dramatic)
```

---

## 7. PRINCIPIOS NO-GENÉRICOS

### ❌ NUNCA
- Usar templates default
- Colores fluorescentes
- Espaciado simétrico obligatorio
- Animaciones sin propósito
- Bordes muy agudos (< 8px)
- Transiciones lentas (> 300ms)
- Fuentes sans-serif genéricas

### ✅ SIEMPRE
- Autenticidad visual
- Espaciado asimétrico donde tenga sentido
- Jerarquía clara
- Movimiento natural
- Easing smooth (no lineal)
- Velocidad snappy
- Propósito en cada elemento

---

## 8. COMPONENTES

### Botones
```css
primary:    #FF5722 bg + shadow + hover elevation
ghost:      glass bg + border + hover color shift
border:     12px radius
padding:    14px 28px
transition: 150ms smooth
```

### Cards
```css
padding:       48px (mín)
border:        sutil (0.06 opacity)
border-radius: 16px
hover:         elevate + color shift
```

### Portfolio/Marketing
```css
aspect-ratio:  3/4 portrait, 16/9 landscape
border-radius: 16px
reveal:        scaleX animation
watermark:     opacity 0.15
```

### Forms
```css
padding:       14px
border-radius: 10px
focus:         border accent color
font-size:     16px (prevent iOS zoom)
```

---

## 9. MOVIMIENTO (Motion)

### Scroll
```
Lenis duration: 1.0s
Easing:         smooth Apple-style
Multiplier:     1x (natural pace)
```

### Animations
```
SplitType:  0.9s char delay, 0.015s stagger
Reveal:     1.2s scaleX transform
Stagger:    0.08-0.15s between elements
```

### Micro-interactions
```
Button press:    100ms scale down
Hover:          150ms transition
Focus:          instant border color
```

---

## 10. RESPONSIVE (Mobile-First)

### Breakpoints
```
Mobile:   < 768px   (1 col, hamburger, sticky CTA)
Tablet:   768-1024px (2 col, responsive)
Desktop:  > 1024px  (3 col, full effects)
```

### Consideraciones
- Touch targets: **44x44px mín**
- Form font-size: **16px** (prevent iOS zoom)
- Padding: `clamp(24px, 5vw, 96px)`
- Section padding: `clamp(96px, 14vw, 160px)`

---

## 11. CHECKLIST (No-Slop Verification)

- [ ] Espaciado generoso (mín 48px cards)
- [ ] Tipografía jerarquizada
- [ ] Colores sutiles (no fluorescentes)
- [ ] Bordes suaves (mín 12px)
- [ ] Transiciones rápidas (150-200ms)
- [ ] Movimiento natural (easing smooth)
- [ ] Autenticidad visual (propósito claro)
- [ ] Mobile-first responsive
- [ ] Accesibilidad (contrast, focus states)
- [ ] Performance optimizado

---

## 12. IMPLEMENTACIÓN

Cuando crees componentes:

1. **Primero**: Revisa este documento
2. **Después**: Aplica variables CSS
3. **Luego**: Implementa responsividad
4. **Finalmente**: Verifica checklist

Recuerda: **"Less Slop, Designs Pop"**
