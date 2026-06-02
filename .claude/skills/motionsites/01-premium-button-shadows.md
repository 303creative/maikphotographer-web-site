# Premium Button Shadows — MotionSites Pattern

## La Diferencia: Button Simple vs Button Premium

### Simple Button (Actual maikphotographer)
```css
.btn { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
```
Efecto: Flat, genérico, "web básico"

### Premium Button (Viktor Oddy / MotionSites)
```css
.btn-primary {
  box-shadow: 
    0 1px 2px 0 rgba(5,26,36,0.1),        /* Layer 1: Near */
    0 4px 4px 0 rgba(5,26,36,0.09),       /* Layer 2: Mid */
    0 9px 6px 0 rgba(5,26,36,0.05),       /* Layer 3: Far */
    0 17px 7px 0 rgba(5,26,36,0.01),      /* Layer 4: Very far */
    0 26px 7px 0 rgba(5,26,36,0),         /* Layer 5: Extreme */
    inset 0 2px 8px 0 rgba(255,255,255,0.5); /* Layer 6: Inset highlight */
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 2px 4px 0 rgba(5,26,36,0.12),
    0 6px 8px 0 rgba(5,26,36,0.11),
    0 12px 10px 0 rgba(5,26,36,0.07),
    0 20px 10px 0 rgba(5,26,36,0.02),
    0 30px 10px 0 rgba(5,26,36,0),
    inset 0 2px 8px 0 rgba(255,255,255,0.6);
}
```
Efecto: **FLOATS** — Button se levanta del page

---

## Anatomía de las 6 Capas

```
Layer 1: 0_1px_2px     → Shadow MUY cerca (0px offset)
         Opacity 0.10  → Visible pero sutil
         
Layer 2: 0_4px_4px     → Shadow cercano (4px offset)
         Opacity 0.09  → Casi igual que Layer 1
         
Layer 3: 0_9px_6px     → Shadow medio (9px offset)
         Opacity 0.05  → Más sutil que Layer 2
         
Layer 4: 0_17px_7px    → Shadow lejano (17px offset)
         Opacity 0.01  → Casi invisible
         
Layer 5: 0_26px_7px    → Shadow extremo (26px offset)
         Opacity 0     → Invisible (pero shape importa)
         
Inset:   inset 0_2px_8px → Highlight INTERNO
         Opacity 0.5   → Visible (crea efecto "pulido")
```

**Por qué funciona:**
- Cada capa simula una zona de luz diferentes
- El inset highlight es el toque Apple (luz reflejada)
- La progresión de opacidades es gradual (natural)

---

## Implementación en CSS

```css
:root {
  /* Shadow Colors (match brand primary dark) */
  --shadow-primary: rgba(5, 26, 36, 1);
  --highlight: rgba(255, 255, 255, 1);
}

/* PRIMARY BUTTON */
.btn-primary {
  background: #051A24;
  color: white;
  border-radius: 9999px; /* pill */
  padding: 0.875rem 1.75rem; /* 14px 28px */
  
  /* 6-layer shadow system */
  box-shadow: 
    0 1px 2px 0 rgba(5, 26, 36, 0.1),
    0 4px 4px 0 rgba(5, 26, 36, 0.09),
    0 9px 6px 0 rgba(5, 26, 36, 0.05),
    0 17px 7px 0 rgba(5, 26, 36, 0.01),
    0 26px 7px 0 rgba(5, 26, 36, 0),
    inset 0 2px 8px 0 rgba(255, 255, 255, 0.5);
  
  /* Smooth transitions */
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary:hover {
  /* Lift effect */
  transform: translateY(-2px);
  
  /* Enhanced shadow on hover */
  box-shadow: 
    0 2px 4px 0 rgba(5, 26, 36, 0.12),
    0 6px 8px 0 rgba(5, 26, 36, 0.11),
    0 12px 10px 0 rgba(5, 26, 36, 0.07),
    0 20px 10px 0 rgba(5, 26, 36, 0.02),
    0 30px 10px 0 rgba(5, 26, 36, 0),
    inset 0 2px 8px 0 rgba(255, 255, 255, 0.6);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 
    0 1px 2px 0 rgba(5, 26, 36, 0.15),
    0 4px 4px 0 rgba(5, 26, 36, 0.12),
    0 9px 6px 0 rgba(5, 26, 36, 0.08),
    0 17px 7px 0 rgba(5, 26, 36, 0.02),
    0 26px 7px 0 rgba(5, 26, 36, 0),
    inset 0 2px 8px 0 rgba(255, 255, 255, 0.4);
}

/* SECONDARY BUTTON */
.btn-secondary {
  background: white;
  color: #051A24;
  border: none;
  border-radius: 9999px;
  padding: 0.875rem 1.75rem;
  
  /* Subtle shadow */
  box-shadow: 
    0 0 0 0.5px rgba(0, 0, 0, 0.05),
    0 4px 30px rgba(0, 0, 0, 0.08);
  
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-secondary:hover {
  transform: translateY(-1px);
  box-shadow: 
    0 0 0 0.5px rgba(0, 0, 0, 0.08),
    0 6px 40px rgba(0, 0, 0, 0.12);
}

/* GHOST BUTTON (Transparent) */
.btn-ghost {
  background: transparent;
  color: #051A24;
  border: 1px solid rgba(5, 26, 36, 0.2);
  border-radius: 9999px;
  padding: 0.875rem 1.75rem;
  
  box-shadow: none;
  transition: all 150ms ease-out;
}

.btn-ghost:hover {
  border-color: #FF5722;
  color: #FF5722;
  box-shadow: 0 4px 12px rgba(255, 87, 34, 0.15);
}
```

---

## Importancia del Inset Highlight

El `inset 0 2px 8px 0 rgba(255,255,255,0.5)` es lo que diferencia:

```
SIN inset:      Button se siente plano, 2D
CON inset:      Button se siente pulido, 3D, Apple-like
```

**Por qué Apple usa esto:**
- Simula una curvatura topográfica (el botón no es flat)
- Crea la sensación de "manufactura premium"
- El reflejo interno es lo que nuestro cerebro espera ver en vidrio/cerámica pulida

---

## Checklist de Implementación para maikphotographer.com

- [ ] Actualizar `.btn-primary` con 6-layer shadow
- [ ] Agregar hover transform translateY(-2px)
- [ ] Agregar transición suave 150ms ease-out
- [ ] Testear en dark background (#051A24)
- [ ] Testear en white background
- [ ] Verificar contraste en mobile (shadow visible)
- [ ] Aplicar a "Book a Session" button en hero
- [ ] Aplicar a "View Portfolio" secondary
- [ ] Aplicar a CTA mid-page
- [ ] Aplicar a footer "Start a chat"
- [ ] Aplicar a bottom nav floating button

---

## Impacto Estimado

**Tiempo de implementación:** 15 minutos
**Impacto en percepción de quality:** +30%
**Riesgo:** None (pure CSS)
**Reversibilidad:** 100% (cambio solo visual)

Este pequeño detalle es el que hace que un sitio se sienta "premium" vs. "básico".

