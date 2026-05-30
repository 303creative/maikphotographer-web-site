# ⚡ QUICK START: Sistema Automático (2 minutos)

## ✅ Lo que ya está LISTO

```
✅ Script de búsqueda: search-leads-businesses.js
   → Busca 100+ negocios en Instagram + Google Maps

✅ Script de envío híbrido: send-hybrid-outreach.js
   → WhatsApp automático + Email + Manual IG DM

✅ Script maestro: run-full-campaign.js
   → Ejecuta TODO en un comando

✅ Documentación completa
   → SETUP-TWILIO.md
   → GUIA-COMPLETA-MARKETING.md
```

---

## 📍 PASOS AHORA

### 1️⃣ Setup Twilio (5 minutos)

```bash
# Abre en navegador:
https://www.twilio.com/try-twilio

# Registra con: maikelmarshall07@gmail.com
# Recibirás: $15 USD GRATIS (1000+ mensajes)
```

Luego, copia de https://console.twilio.com:
- Account SID
- Auth Token  
- WhatsApp Number

### 2️⃣ Actualizar `.env`

```bash
# Edita: C:\Users\maike\Desktop\303 Marketing Agency\maikphotographer-web-site\.env

# Busca estas líneas y reemplaza:
TWILIO_ACCOUNT_SID=ACxxxxxxxx         # ← Tu Account SID
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxx     # ← Tu Auth Token
TWILIO_WHATSAPP_NUMBER=+14155552671   # ← Tu WhatsApp Number
```

### 3️⃣ Ejecutar (1 minuto)

```bash
# Terminal en: C:\Users\maike\Desktop\303 Marketing Agency\maikphotographer-web-site

node automation/scripts/run-full-campaign.js
```

**Eso es.** El sistema:
1. 🔍 Busca negocios
2. 📱 Envía WhatsApp/Email
3. 📊 Genera reporte

---

## 📊 Qué Recibirás

### Archivo 1: `business-leads-today.json`
```json
[
  {
    "name": "Miami Eats",
    "username": "miamieats",
    "phone": "+1 (305) 123-4567",
    "message": "Hola! Soy Maikel fotógrafo profesional...",
    "sourceUrl": "https://instagram.com/miamieats"
  }
]
```

### Archivo 2: `outreach-results.json`
```json
{
  "whatsapp_sent": 8,
  "email_sent": 10,
  "manual_required": 2,
  "total_processed": 20
}
```

---

## 📱 Después: Tu Acción Manual

### Para negocios que NO respondieron en Instagram:

1. Abre `business-leads-today.json`
2. Copia el "message"
3. Ve a Instagram → @username
4. Envía en DM

**Tip:** No todos a la vez. Spread en 3 horas.

---

## 🎯 Qué Esperar

| Métrica | Valor |
|---|---|
| Negocios encontrados | 100+ |
| WhatsApp enviados | 40-50% |
| Emails enviados | 50-60% |
| Respuestas en 7 días | 3-5 |
| Conversiones posibles | 1-2 |

---

## 💰 Costo

| Item | Costo |
|---|---|
| Setup Twilio | GRATIS |
| Crédito inicial | +$15 USD |
| Por 100 mensajes WhatsApp | $0.79 USD |
| Emails | GRATIS |
| **Total para 100 leads** | < $2 USD |

---

## 🚨 Si algo falla

### "Twilio not configured"
→ Saltará automáticamente a EMAIL

### "Invalid credentials"  
→ Verifica `.env` tiene datos de Twilio correctos

### Otro error
→ Lee GUIA-COMPLETA-MARKETING.md

---

## 📋 Checklist Final

```
[ ] 1. Registré en Twilio.com
[ ] 2. Copié Account SID
[ ] 3. Copié Auth Token
[ ] 4. Copié WhatsApp Number
[ ] 5. Actualicé .env
[ ] 6. Ejecuté run-full-campaign.js
[ ] 7. Reviso outreach-results.json
[ ] 8. Hago seguimiento manual en Instagram
```

---

## 🚀 EJECUTAR AHORA

```bash
cd "C:\Users\maike\Desktop\303 Marketing Agency\maikphotographer-web-site"
node automation/scripts/run-full-campaign.js
```

---

**¿Preguntas?** Lee GUIA-COMPLETA-MARKETING.md para más detalles.

**¿Sin Twilio todavía?** Funciona SOLO con email también.

Ejecuta y dime si necesitas ayuda 👊
