# 🎯 GUÍA COMPLETA: Sistema Automático de Marketing

## Resumen Ejecutivo

Este sistema busca **NEGOCIOS que necesitan fotografía** en Miami y les envía mensajes automáticos por:
1. **WhatsApp** (si tienen número disponible)
2. **Email** (si no tienen WhatsApp)
3. **Manual Instagram DM** (si no tienen nada)

---

## 📋 Prerrequisitos

✅ **Ya tienes:**
- Instagram scraper funcional (Apify)
- Google Maps API
- Gmail configurado
- Claude AI para generar mensajes

⚠️ **Necesitas:**
- Cuenta Twilio (GRATIS, $15 crédito)
- Llenar variables en `.env`

---

## ⚡ SETUP RÁPIDO (10 minutos)

### 1️⃣ Crear Cuenta Twilio

```
🔗 https://www.twilio.com/try-twilio
✉️ Usa: maikelmarshall07@gmail.com
💳 Sin tarjeta requerida
💰 Recibirás $15 USD gratis
```

### 2️⃣ Obtener Credenciales

Una vez en Twilio:

1. Abre https://console.twilio.com
2. Copia **Account SID** de la esquina superior derecha
3. Copia **Auth Token** (click el ícono del ojo)
4. Ve a **Messaging → WhatsApp**
5. Anota el número (ej: `+14155552671`)

### 3️⃣ Actualizar `.env`

Edita el archivo `.env` en la raíz del proyecto:

```bash
# Reemplaza con tus valores de Twilio:
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxx
TWILIO_WHATSAPP_NUMBER=+14155552671
```

### 4️⃣ Verificar Instalaciones

```bash
cd "C:\Users\maike\Desktop\303 Marketing Agency\maikphotographer-web-site"
npm install  # Si no has hecho esto
```

---

## 🚀 Usar el Sistema

### Opción A: AUTOMATIZADO (Recomendado)

Ejecuta TODO en un comando:

```bash
node automation/scripts/run-full-campaign.js
```

Esto hace:
1. 🔍 Busca negocios en Instagram (10 hashtags)
2. 🗺️  Busca negocios en Google Maps (13 búsquedas)
3. 📱 Envía WhatsApp/Email automáticos
4. 📊 Genera reporte

**Tiempo:** ~5 minutos

---

### Opción B: PASO A PASO

Si quieres más control:

#### Paso 1: Buscar Leads

```bash
node automation/scripts/search-leads-businesses.js
```

Genera: `business-leads-today.json` (con 15-30 negocios)

#### Paso 2: Enviar Mensajes

```bash
node automation/scripts/send-hybrid-outreach.js
```

Genera: `outreach-results.json` (reporte de envíos)

---

## 📊 Archivos Generados

### `business-leads-today.json`
```json
[
  {
    "name": "Miami Eats Cafe",
    "username": "miamieats_cafe",
    "source": "Instagram",
    "phone": "+1 (305) 123-4567",
    "message": "Hola! Soy Maikel, fotógrafo profesional en Miami...",
    "sourceUrl": "https://instagram.com/miamieats_cafe"
  },
  ...
]
```

### `outreach-results.json`
```json
{
  "timestamp": "2026-05-30T04:50:00Z",
  "total_processed": 20,
  "whatsapp_sent": 8,
  "email_sent": 10,
  "manual_required": 2,
  "results": [...]
}
```

---

## 📱 Después: Seguimiento Manual

### Para Negocios en Instagram (Envío Manual de DM)

1. Abre `business-leads-today.json`
2. Para cada negocio, copia el campo `"message"`
3. Ve a Instagram → @username
4. Envía el mensaje en DM

**Consejo:** No envíes todos a la vez, spread en 2-3 horas para evitar spam flag.

### Para Negocios por WhatsApp

Si WhatsApp se envió automáticamente (✅ en los logs), simplemente espera respuesta.

### Para Negocios por Email

Si se envió email (✅ en los logs), espera respuesta en 24-48h.

---

## 💬 Mensajes Automatizados

### WhatsApp (Corto y directo)
```
Hola [Nombre]! 👋

Soy Maikel, fotógrafo profesional en Miami. 📸

He visto que tu negocio está en Instagram y necesitas fotos profesionales...

3 paquetes:
• 1 sesión: $150
• Producción: $350
• Mensual: $500

¿Te interesa?
```

### Email (Profesional y detallado)
```html
📸 Fotos Profesionales para tu Negocio

Hola [Nombre],

Soy Maikel Marshall, fotógrafo profesional y director creativo en Miami.

He visto que tu negocio está en Instagram y Google Maps, y creo que fotos 
profesionales podrían ayudarte a atraer más clientes...

[3 paquetes con descripción]
[CTA: Conversa por WhatsApp]
```

---

## 🎯 Métricas de Éxito

Espera estos números:

| Canal | Tasa de Éxito | Respuesta |
|---|---|---|
| **WhatsApp** | 95% enviados | 15-25% responden |
| **Email** | 60% enviados | 5-10% responden |
| **Instagram DM** | 20% leen | 2-5% responden |

**Objetivo:** De 20 leads, espera 3-5 respuestas en primeros 7 días.

---

## ⚙️ Configuración Avanzada

### Cambiar Hashtags de Instagram

Edita `automation/scripts/search-leads-businesses.js`:

```js
const BUSINESS_HASHTAGS = [
  'miamibusiness',      // Cambiar estos
  'miamieats',          // según necesites
  'miamiboutique',
  // Agregar más...
];
```

### Cambiar Búsquedas de Google Maps

```js
const GOOGLE_MAPS_QUERIES = [
  'restaurants in Miami',
  'beauty salon Miami',
  // Agregar más...
];
```

### Cambiar Cantidad de Leads Procesados

En `send-hybrid-outreach.js`:

```js
for (const business of businesses.slice(0, 20)) {  // Cambiar 20
```

---

## 🐛 Troubleshooting

### Error: "Twilio not configured"

**Solución:** 
- Verifica que `.env` tiene `TWILIO_ACCOUNT_SID`
- Si no quieres Twilio, solo usa EMAIL (funciona igual)

### Error: "Invalid credentials"

**Solución:**
- Abre https://console.twilio.com
- Copia de nuevo Account SID y Auth Token
- Verifica que no hay espacios extras

### WhatsApp: "Conversation not started"

**Razón:** El negocio no ha iniciado conversación en Sandbox
**Solución:** El script automáticamente envía EMAIL en su lugar

### Email no se envía

**Verificar:**
- ¿BUSINESS_EMAIL es correcto?
- ¿GMAIL_APP_PASSWORD es correcto?
- ¿Gmail permite apps externas? https://myaccount.google.com/apppasswords

---

## 📅 Automatizar Diariamente

### Con Node-Cron (automático cada mañana)

```bash
node automation/scripts/scheduler-8am.js
```

O agregar a crontab (Linux/Mac):

```bash
0 10 * * * cd /ruta/proyecto && node automation/scripts/run-full-campaign.js
```

---

## 💡 Estrategia de Seguimiento

### Día 1-2: Envío Inicial
```
✓ Ejecuta: run-full-campaign.js
✓ Revisa: outreach-results.json
✓ Nota: Cuáles respondieron
```

### Día 3-5: Primer Seguimiento
```
✓ Para negocios sin respuesta en Instagram:
  "Hola! Vi que no respondiste mi primer mensaje. 
   Tengo una oferta especial para negocios como el tuyo.
   ¿Podemos conversar?"
```

### Día 7-10: Descuento
```
✓ Para negocios interesados pero indecisos:
  "Te doy 10% off en tu primer sesión si booked esta semana"
```

---

## 💰 ROI Calculado

**Inversión:**
- Twilio: $0.01 x 100 negocios = $1
- Tiempo: 30 minutos manual
- **Total: ~$2-5**

**Ganancia esperada:**
- 5 leads calificados x $150 promedio = $750
- **ROI: 150x 🚀**

---

## 🚨 Legal & Ética

✅ **Permitido:**
- Enviar mensajes a negocios públicos
- Usar datos de Google Maps / Instagram público
- Usar Twilio oficial

⚠️ **NO hacer:**
- Spam masivo a mismo negocio
- Usar datos privados
- No respetar "unsubscribe"

**Mejor práctica:** Un mensaje bien dirigido > 100 spam

---

## 📞 Soporte Rápido

Si algo falla:

1. Revisa los logs de error completos
2. Verifica `.env` tiene todas las variables
3. Intenta primero sin Twilio (solo email)
4. Contacta Twilio support: https://support.twilio.com

---

## 🎓 Próximos Pasos

1. ✅ Setup Twilio (10 min)
2. ✅ Llenar `.env` (2 min)
3. ✅ Ejecutar: `run-full-campaign.js` (5 min)
4. ✅ Revisar resultados (2 min)
5. ✅ Hacer seguimiento manual en Instagram (daily)

**Tiempo Total:** ~30 minutos de setup, luego AUTOMÁTICO ⚡

---

**¿Necesitas ayuda? Lee SETUP-TWILIO.md para instrucciones detalladas.**
