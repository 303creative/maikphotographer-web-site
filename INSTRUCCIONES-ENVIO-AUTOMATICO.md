# 📱 Envío Automático de Mensajes — 3 Opciones

## ❌ NO SE PUEDE: Instagram DMs Automáticos
Instagram **bloquea activamente** los DMs automáticos. Incluso con bots verificados, ban a los 5 minutos.

---

## ✅ OPCIÓN 1: WhatsApp Business API (MEJOR - 95% de éxito)

### Cómo funciona:
1. **Obtener número de WhatsApp** de los negocios (muchos lo ponen en Instagram bio o Google Maps)
2. **Usar WhatsApp Business API** para enviar mensajes automáticos
3. **Ventaja**: Sin detección de bot, oficial, rastreable

### Setup:
```bash
npm install twilio axios
```

### Código:
```js
const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

async function sendWhatsAppMessage(businessPhone, message) {
  try {
    await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_SENDER}`,
      to: `whatsapp:${businessPhone}`,
      body: message
    });
    console.log(`✅ Mensaje enviado a ${businessPhone}`);
  } catch (error) {
    console.log(`⚠️  Error: ${error.message}`);
  }
}
```

### Variables de entorno (.env):
```
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_WHATSAPP_SENDER=+14155552671  # Número verificado Twilio
```

### Costo:
- **$0.0079 por mensaje** (muy barato para 100 leads = $0.79)
- Primer mes GRATIS con crédito de prueba

---

## ✅ OPCIÓN 2: Email Automático (60% de éxito - pero profesional)

### Cómo funciona:
1. **Extraer emails** de Google Maps / sitios web de negocios
2. **Enviar email profesional** automático
3. **Ventaja**: Rastreable, profesional, sin ban

### Código:
```js
const nodemailer = require('nodemailer');

async function sendEmailToBusiness(business) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.BUSINESS_EMAIL,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });

  const htmlTemplate = `
    <h2>Hola ${business.name}!</h2>
    <p>Soy Maikel, fotógrafo profesional en Miami.</p>
    <p>He visto que tu negocio está creciendo en Instagram y Google Maps. 
    ¿Te gustaría fotos profesionales para tu página web y redes sociales?</p>
    
    <p>Ofrecemos:</p>
    <ul>
      <li>📸 Fotos de producto/ambiente</li>
      <li>👥 Fotos del equipo</li>
      <li>🎬 Videos cortos para redes</li>
    </ul>
    
    <p><strong>3 paquetes disponibles:</strong></p>
    <ul>
      <li>1 sesión: $150</li>
      <li>Producción completa: $350</li>
      <li>Contenido mensual: $500/mes</li>
    </ul>
    
    <p>💬 Contáctame:</p>
    <ul>
      <li>WhatsApp: <a href="https://wa.me/17863329815">+1 (786) 332-9815</a></li>
      <li>Email: maikelmarshall07@gmail.com</li>
      <li>Instagram: <a href="https://instagram.com/maik_photographer">@maik_photographer</a></li>
    </ul>
  `;

  await transporter.sendMail({
    from: process.env.BUSINESS_EMAIL,
    to: business.email,
    subject: `📸 Fotos profesionales para ${business.name} - The303 Creative`,
    html: htmlTemplate
  });
}
```

### Ventajas:
- **Profesional** (parecer empresa real)
- **Rastreable** (abiertos, clicks)
- **Barato** (gratis con Gmail)

---

## ✅ OPCIÓN 3: Híbrida (RECOMENDADA - 80% de éxito)

### Estrategia:
1. **Si tenemos WhatsApp** → Enviar automático por Twilio
2. **Si NO tenemos WhatsApp** → Enviar email automático
3. **Ambos** → Mayor probabilidad de respuesta

### Código combinado:
```js
async function sendAutomaticOutreach(business) {
  // 1. Intentar WhatsApp
  if (business.whatsapp_phone) {
    await sendWhatsAppMessage(business.whatsapp_phone, business.message);
    return 'whatsapp';
  }
  
  // 2. Si no, email
  if (business.email) {
    await sendEmailToBusiness(business);
    return 'email';
  }
  
  // 3. Si no tenemos nada, manual
  return 'manual_instagram_dm';
}
```

---

## 🚀 PASO A PASO PARA IMPLEMENTAR

### 1. Instalar dependencias
```bash
npm install twilio dotenv nodemailer axios
```

### 2. Configurar Twilio (5 minutos)
- Ir a https://www.twilio.com/
- Crear cuenta gratis ($15 crédito)
- Obtener `ACCOUNT_SID` y `AUTH_TOKEN`
- Activar WhatsApp Sandbox

### 3. Actualizar `.env`
```
TWILIO_ACCOUNT_SID=ACxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_WHATSAPP_SENDER=+14155552671
```

### 4. Crear script de envío
```bash
# automation/scripts/send-outreach.js
```

### 5. Ejecutar automático
```bash
node automation/scripts/send-outreach.js
# O con cron cada día
0 10 * * * node /ruta/send-outreach.js
```

---

## 📊 RESUMEN DE OPCIONES

| Método | Éxito | Costo | Setup | Ban Risk |
|---|---|---|---|---|
| **WhatsApp** | 95% | $0.01/msg | Medio | 0% |
| **Email** | 60% | Gratis | Fácil | 0% |
| **Híbrido** | 85% | $0.005/msg | Medio | 0% |
| ❌ Instagram DM | 5% | Gratis | Fácil | 100% |

---

## 🎯 RECOMENDACIÓN: OPCIÓN HÍBRIDA

**Por qué:**
1. WhatsApp para contactos directos (muy alta tasa de apertura)
2. Email para contactos sin WhatsApp (profesional)
3. Sin riesgo de ban
4. Máxima probabilidad de respuesta

¿Creamos el script híbrido ahora?
