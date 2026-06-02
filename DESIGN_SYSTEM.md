# Taste Skill Design System — maikphotographer.com

## Filosofía: "Less Slop, Designs Pop"

Evitar lo genérico. Diseño auténtico que refleja propósito.

---

## 1. TIPOGRAFÍA (No Genérica)

### Sistema Apple-First
```css
--font-b: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif;
```

### Pesos
- H1/H2: Bebas Neue (bold, geometric)
- Body: Inter 400-500 (neutral, legible)
- Mono: JetBrains Mono (code, UI elements)

### Espaciado de Líneas
- H1/H2: 1.0 (compact, powerful)
- Body: 1.6 (readable, breathing room)
- Small: 1.4 (secondary text)

---

## 2. ESPACIADO (Generoso)

### Escala de Padding/Margin
```
xs:  4px   → apenas usado
sm:  8px   → ícono-spacing
md:  16px  → elemento-spacing
lg:  24px  → card-padding
xl:  32px  → section-margin
2xl: 48px  → hero-spacing
3xl: 96px  → section-padding
```

### Regla: "Breathe"
- Cards: mín 48px padding (no 32px)
- Secciones: mín 96px padding (no 80px)
- Gaps: mín 24px entre elementos

---

## 3. COLORES (Sutileza Apple)

### Paleta Principal
- Fondo: #0A0A0A (no #000000)
- Accent: #FF5722 (naranja cinematográfico)
- Texto 1: #FFFFFF
- Texto 2: #8A8A8E (no #888888) — más gris azulado
- Texto 3: #636366
- Border: rgba(255,255,255,0.06) — casi invisible

### Vidrio (Glass-morphism)
- Background: rgba(15,15,15,0.7)
- Backdrop-filter: blur(30px)

---

## 4. BORDES & RADIOS (Suave)

### Radios
- Botones: 12px (no 4px)
- Cards: 16px (no 2px)
- Inputs: 10px (no 2px)
- Épico: 999px (full-round)

### Bordes
- Default: 1px solid rgba(255,255,255,0.06)
- Hover: 1px solid rgba(255,255,255,0.12)
- Accent: rgba(255,87,34,0.4)

---

## 5. SOMBRAS (Realismo)

### Escala
```css
--shadow-sm: 0 2px 8px rgba(0,0,0,0.3);
--shadow-md: 0 8px 32px rgba(0,0,0,0.4);
--shadow-lg: 0 24px 64px rgba(0,0,0,0.5);
```

**Uso:**
- Hover elevación: md
- Modales/overlays: lg
- Cards: sm

---

## 6. TRANSICIONES (Fluidas)

### Easing (No Lineal)
```css
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);  /* Apple-standard */
--ease: cubic-bezier(0.25, 0.46, 0.45, 0.94);  /* Elegante */
--ease-b: cubic-bezier(0.34, 1.56, 0.64, 1);   /* Bouncy */
```

### Duraciones
- Hover: 150ms (rápido, responsivo)
- Scroll: 200ms (perceptible, no lento)
- Modal: 300ms (dramático)

---

## 7. PRINCIPIOS NO-GENÉRICOS

### ❌ NO HACER
- Usar templates default
- Colores fluorescentes
- Espaciado simétrico obligatorio
- Animaciones sin propósito
- Bordes muy agudos
- Transiciones lentas

### ✅ SÍ HACER
- Autenticidad visual
- Espaciado asimétrico donde tenga sentido
- Jerarquía clara
- Movimiento natural
- Bordes suaves
- Velocidad snappy (150-200ms)

---

## 8. COMPONENTES

### Botones
- Primary: FF5722 fondo + sombra + hover elevation
- Ghost: Glass background + border + hover color

### Cards
- Padding mín 48px
- Border sutil
- Hover: elevate + color shift

### Portfolio
- Aspect-ratio consistente
- Border-radius 16px
- Reveal animation suave
- Watermark sutil (opacity 0.15)

### Forms
- Input padding 14px
- Border-radius 10px
- Focus: border accent
- Font-size 16px (prevent iOS zoom)

---

## 9. MOVIMIENTO (Motion)

### Scroll
- Lenis duration: 0.8 (rápido)
- Smooth easing: cubic-bezier(0.4, 0, 0.2, 1)

### Animaciones
- SplitType chars: 0.9s delay
- Portfolio reveal: 1.2s scaleX
- Stagger: 0.08-0.15s entre elementos

### Micro-interactions
- Button press: 100ms scale down
- Hover: 150ms transition
- Focus: instant border color

---

## 10. RESPONSIVE (Mobile-First)

### Breakpoints
- Mobile: <768px (1 col, hamburger, sticky CTA)
- Tablet: 768-1024px (2 col, responsive)
- Desktop: >1024px (3 col, effects enabled)

### Consideraciones
- Touch targets: 44x44px minimum
- Font-size forms: 16px (prevent zoom iOS)
- Padding móvil: clamp(24px, 5vw, 96px)

---

## APLICACIÓN EN CÓDIGO

### CSS Variables (Taste Skill)
```css
:root {
  /* Spacing Scale */
  --pad: clamp(24px, 5vw, 96px);
  --section-pad: clamp(96px, 14vw, 160px);
  
  /* Colors Subtle */
  --text-2: #8A8A8E;  /* not #888888 */
  --border: rgba(255,255,255,0.06);  /* whisper-thin */
  
  /* Easing Smooth */
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Shadows Real */
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.3);
}
```

### Componente Ejemplo
```css
.btn {
  padding: 14px 28px;
  border-radius: 12px;  /* suave */
  transition: all 150ms var(--ease-smooth);  /* rápido */
  backdrop-filter: blur(30px);  /* glass */
}
```

---

## CHECKLIST DE NO-SLOP

- [ ] Espaciado generoso (mín 48px cards)
- [ ] Tipografía jerarquizada (no todas iguales)
- [ ] Colores sutiles (no fluorescentes)
- [ ] Bordes suaves (mín 12px radius)
- [ ] Transiciones rápidas (150-200ms)
- [ ] Movimiento natural (easing, no lineal)
- [ ] Autenticidad visual (propósito claro)
- [ ] Mobile-first (responsive + touch-friendly)
- [ ] Accesibilidad (contrast, focus states)
- [ ] Performance (lazy load, optimize assets)

---

**Tarea**: Aplicar estos principios a CADA componente.
No es un paquete, es una **filosofía de diseño**.
