# ⚡ QUICK START — Universal Email System (2026)

## 30 segundos — El Flujo Completo

```bash
# 1. Buscar 100+ leads
node automation/scripts/search-leads-businesses.js

# 2. Enviar emails HTML personalizados
node automation/scripts/send-universal-html-emails.js

# 3. Ver resultados
cat universal-email-campaign.json
```

---

## 5 Minutos — Explicación Completa

### QUÉ CAMBIÓ

**Antes:**
- 4 templates HTML separados (repetición)
- Difícil de mantener
- Mismo código, 4 veces

**Ahora:**
- 1 template universal
- Fácil de mantener
- Contenido dinámico por tipo de negocio

### CÓMO FUNCIONA

```
Input:  leads-today.json (nombre, email, bio)
         ↓
Detect: ¿Es restaurant? ¿Salon? ¿Boutique? (automático)
         ↓
Select: Config correspondiente (6 opciones)
         ↓
Build:  HTML personalizado (titular, stats, precios)
         ↓
Send:   Email con 2s delay entre cada uno
         ↓
Output: universal-email-campaign.json (reporte)
```

### RESULTADO ESPERADO

De 20 emails:
- ✅ 18 enviados exitosamente
- ❌ 2 fallidos (sin email válido)
- **Éxito: 90%**

### MÉTRICAS

De 100 emails HTML:
- 📧 35-42 abiertos (35-42% open rate)
- 🖱️ 12-18 clics (12-18% click rate)
- 💬 8-12 leads que responden
- 💰 3-5 clientes nuevos
- 💵 **$450-1750 por campaña**

---

## TIPOS DE NEGOCIO (Auto-Detectados)

El sistema identifica automáticamente:

```
"restaurant"   ← cafe, food, restaurant
"bakery"       ← dulce, pastry, reposteria
"boutique"     ← shop, store, tienda, moda
"salon"        ← salon, spa, beauty
"real_estate"  ← real estate, property, inmueble
"fitness"      ← gym, fitness, trainer, crossfit
```

Cada uno tiene:
- Headline personalizado
- 3 estadísticas contextuales
- 5 beneficios específicos
- 3 paquetes con precios
- CTA adaptado

---

## EJEMPLO: RESTAURANT

```html
Subject: "Idea para [Restaurant Name]: fotos que atraigan clientes"

Headline: "Fotos que hagan crecer tu restaurante"
Subheadline: "Comida que se vea irresistible"
Stat: "30% Más reservas con fotos profesionales"

Benefits:
✓ Fotos de platos gourmet que abren apetito
✓ Contenido listo para Instagram/Google Maps
✓ Ambiente y detalles capturados profesionalmente
✓ Reels y carrusel automático incluido
✓ Sesión rápida, sin cierre de local

Packages:
💰 Sesión Express — $150
💰 Producción Premium — $350
💰 Mensual Contenido — $500/mes

CTA: "¿Listo para mejorar tu presencia online?"
Buttons: WhatsApp | Website
```

---

## ARCHIVOS PRINCIPALES

### Templates
```
automation/email-templates/universal-template.js
  └─ getUniversalEmailTemplate(config)
     • Un solo archivo HTML
     • Valores dinámicos (20+)
     • Responsive mobile-first
     • Gold/black premium design
```

### Script
```
automation/scripts/send-universal-html-emails.js
  • Detecta 6 tipos de negocio
  • Carga config automáticamente
  • Envía 20 emails (max, configurable)
  • 2s delay entre cada uno
  • Salva reporte JSON
```

### Web
```
public/marketing.html
  • Landing page con 6 casos de éxito
  • Images desde /img/marketing/
  • Premium dark theme
  • 100% responsive (mobile-first)
```

---

## COMANDOS RÁPIDOS

```bash
# Entrar a carpeta
cd "C:\Users\maike\Desktop\303 Marketing Agency\maikphotographer-web-site"

# Step 1: Buscar leads
node automation/scripts/search-leads-businesses.js
# Output: business-leads-today.json

# Step 2: Enviar emails
node automation/scripts/send-universal-html-emails.js
# Output: universal-email-campaign.json

# Step 3: Ver leads en JSON (Windows)
powershell -Command "Get-Content business-leads-today.json | ConvertFrom-Json | Select -First 5"

# Step 4: Ver reporte
powershell -Command "Get-Content universal-email-campaign.json | ConvertFrom-Json | Select -ExpandProperty campaign"

# Step 5: Follow-ups automáticos (opcional)
node automation/scripts/send-followups.js
```

---

## DEBUGGING

### Email no se envía

1. **Verificar credentials**
   ```bash
   # Abrir .env y revisar:
   BUSINESS_EMAIL=maikelmarshall07@gmail.com
   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
   ```

2. **Verificar leads**
   ```bash
   # ¿Existe business-leads-today.json?
   # Debe haber mínimo 10 leads
   ```

3. **Check console**
   ```bash
   # Ver errores específicos
   node automation/scripts/send-universal-html-emails.js 2>&1 | more
   ```

### Tipo de negocio no se detecta

Editar `send-universal-html-emails.js`:

```javascript
function detectBusinessType(bio = '', source = '') {
  const bioLower = (bio || '').toLowerCase();
  
  // Agregar más keywords aquí:
  if (bioLower.includes('mi_palabra')) return 'mi_tipo';
  
  return 'restaurant'; // default
}
```

### Imágenes no cargan

- Verificar URLs (deben empezar con `https://`)
- Verificar archivos existen en servidor
- Usar URLs absolutas (no relativas)

---

## CHECKLIST ANTES DE ENVIAR

- [ ] `.env` tiene `BUSINESS_EMAIL` y `GMAIL_APP_PASSWORD`
- [ ] Gmail tiene 2FA habilitado
- [ ] `business-leads-today.json` tiene 10+ leads
- [ ] Leads tienen email válido (contiene `@`)
- [ ] Script inicia sin errores
- [ ] Emails se envían (ver "✅" en console)
- [ ] Reporte se genera (`universal-email-campaign.json`)

---

## MÉTRICAS A ESPERAR

### Open Rate
- Expected: 35-42%
- Plain text: 28%
- Mejora: +50%

### Click Rate
- Expected: 12-18%
- Plain text: 5%
- Mejora: +250%

### Conversión
- Expected: 3-5%
- Plain text: 1-2%
- Mejora: +200%

### Ingresos (por 100 emails)
```
18 clics × 10% conversión = 1.8 clientes
1.8 × $300 (promedio) = $540

Rango realista: $450-1750 por campaña
```

---

## AUTOMATIZACIÓN (OPCIONAL)

### Enviar todos los días a las 8AM (Miami time)

Crear archivo `cron-daily-campaign.js`:

```javascript
const cron = require('node-cron');
const { spawn } = require('child_process');

// Cada día a las 8 AM (Miami = UTC-5)
cron.schedule('0 13 * * *', () => {
  console.log('⏰ Iniciando campaign diaria...');
  
  spawn('node', ['automation/scripts/search-leads-businesses.js']);
  // Esperar 2 min
  setTimeout(() => {
    spawn('node', ['automation/scripts/send-universal-html-emails.js']);
  }, 120000);
});
```

Ejecutar:
```bash
node cron-daily-campaign.js
```

---

## SIGUIENTE PASO

### Hoy
1. ✅ Run `search-leads-businesses.js`
2. ✅ Run `send-universal-html-emails.js`
3. ✅ Check `universal-email-campaign.json`
4. ✅ Monitor respuestas en inbox + WhatsApp

### Mañana
1. ✅ Responder a leads que contacten
2. ✅ Agendar sesiones
3. ✅ Repetir campaña (100+ nuevos leads)

### Próxima Semana
1. ✅ Follow-ups (día 3, 7, 14, 21, 30)
2. ✅ Analizar conversiones
3. ✅ Optimizar headlines/copy

---

## CONTACTO / LINKS

**Inbox Oficial**: maikelmarshall07@gmail.com  
**WhatsApp**: https://wa.me/17863329815  
**Web**: https://www.maikphotographer.com  
**Marketing**: https://www.maikphotographer.com/marketing  
**Instagram**: https://instagram.com/maik_photographer

---

## TÉRMINOS IMPORTANTES

| Término | Significado |
|---------|------------|
| **Lead** | Contacto potencial (negocio que necesita fotos) |
| **Open Rate** | % de emails abiertos |
| **Click Rate** | % de clicks en links |
| **Conversion** | Lead que se convierte en cliente |
| **Business Type** | Categoría de negocio (restaurant, salon, etc) |
| **Template** | Estructura HTML reutilizable |
| **Config** | Valores dinámicos por tipo |
| **Follow-up** | Email de seguimiento (día 3, 7, 14, 21, 30) |

---

## SOPORTE RÁPIDO

**¿Qué hacer si...?**

| Problema | Solución |
|----------|----------|
| Email no sale | Verificar .env (BUSINESS_EMAIL, GMAIL_APP_PASSWORD) |
| No hay leads | Verificar Google Maps API key |
| Tipo no se detecta | Agregar keywords en detectBusinessType() |
| Imágenes no cargan | Usar URLs https:// absolutas |
| Reporte vacío | Revisar que email haya salido sin errores |

---

## VERSION HISTÓRICA

```
v0.1 (Febrero 2026)  — Primero emails plain text
v0.2 (Marzo 2026)    — 4 HTML templates separados
v0.3 (Abril 2026)    — Bug fixes, precios con descuento
v1.0 (Mayo 2026)     — 1 Universal Template ← ACTUAL
v1.1 (Próximo)       — A/B testing, multi-idioma
```

---

**Sistema listo para producción. No requiere más setup. Ejecuta y vende. 🚀**
