# ⚡ Setup Twilio para WhatsApp Automático (5 minutos)

## Paso 1: Crear Cuenta Twilio

1. Ve a https://www.twilio.com/try-twilio
2. Regístrate con email (usa maikelmarshall07@gmail.com)
3. Verifica tu email
4. Recibirás **$15 USD de crédito gratis** (suficiente para 1000+ mensajes)

---

## Paso 2: Obtener Credenciales

1. Inicia sesión en https://console.twilio.com/
2. En el dashboard, encontrarás:
   - **ACCOUNT SID**: `ACxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - **AUTH TOKEN**: `xxxxxxxxxxxxxxxxxxxxxxxx`
3. Copia ambos valores

---

## Paso 3: Activar WhatsApp

1. Aún en el dashboard, ve a **Messaging > WhatsApp**
2. Click en **Try it out** o **Develop**
3. Verás un número como: `+14155552671`
4. Este es tu **TWILIO_WHATSAPP_NUMBER**

---

## Paso 4: Agregar Números Permitidos (Sandbox)

**Para TESTING (primero):**
- Ve a **WhatsApp > Sandbox**
- Verás el número de prueba
- Envía un mensaje de prueba

**Para PRODUCCIÓN (después):**
- Necesitas verificar un número real de teléfono
- O comprar un número en Twilio ($1/mes)

---

## Paso 5: Actualizar `.env`

Abre o crea `.env` en la raíz del proyecto:

```bash
# Twilio WhatsApp
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxx
TWILIO_WHATSAPP_NUMBER=+14155552671  # El número de Twilio

# Para envío manual
BUSINESS_PHONE=+1 (786) 332-9815  # Tu número de contacto
```

---

## Paso 6: Test Rápido

Ejecuta esto para verificar que funciona:

```bash
node -e "
import twilio from 'twilio';
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
console.log('✅ Conexión a Twilio exitosa');
"
```

---

## Paso 7: Ejecutar Envío Automático

Primero, genera los leads:
```bash
node automation/scripts/search-leads-businesses.js
```

Luego, envía mensajes automáticos:
```bash
node automation/scripts/send-hybrid-outreach.js
```

---

## 💰 Costos

- **Configuración inicial**: Gratis
- **Por mensaje WhatsApp**: $0.0079 USD (100 leads = $0.79)
- **Por mes**: Probablemente <$5 USD
- **Crédito gratis inicial**: $15 USD (1800+ mensajes)

---

## 🚨 Limitaciones (Sandbox vs Producción)

### Sandbox (GRATIS - Para testing)
- Solo puedes enviar a números que se unan al sandbox
- Máximo 100 mensajes/día
- Perfecto para testing

### Producción (VERIFICADO)
- Envía a cualquier número WhatsApp
- Sin límites diarios
- Requiere número verificado o comprar número

---

## ❓ Si algo no funciona

**Error: "Invalid From Parameter"**
→ Verifica que TWILIO_WHATSAPP_NUMBER sea correcto

**Error: "Conversation not started"**
→ El negocio no ha iniciado conversación en Sandbox. Envía email en su lugar.

**Error: "Invalid credentials"**
→ Verifica ACCOUNT_SID y AUTH_TOKEN en https://console.twilio.com

---

## Alternativa: Solo EMAIL (si no quieres Twilio)

Si no quieres usar Twilio, el script automáticamente:
1. Detecta que TWILIO_ACCOUNT_SID no está configurado
2. Envía todos los mensajes por EMAIL
3. Funciona igual de bien

Simplemente no llenes las variables de Twilio en `.env`
