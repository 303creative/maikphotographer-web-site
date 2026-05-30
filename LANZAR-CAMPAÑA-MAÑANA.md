# 🚀 LANZAR CAMPAÑA MAÑANA — 31 DE MAYO A LAS 8:30 AM

## ⏰ CRONOGRAMA

**Hoy (30 de mayo):** Sistema configurado ✅
**Mañana (31 de mayo) a las 8:30 AM (Miami Time):** **EJECUTAR ESTO**

---

## 🎯 OPCIÓN 1: Ejecutar MANUALMENTE A LAS 8:30 AM

### En Windows (PowerShell):

```powershell
# Abre PowerShell a las 8:29 AM y ejecuta:
cd "C:\Users\maike\Desktop\303 Marketing Agency\maikphotographer-web-site"
node automation/scripts/schedule-campaign.js execute
```

**Tiempo estimado:** 5-10 minutos
**Notificación:** Recibirás email en maikelmarshall07@gmail.com cuando termine

---

## 🎯 OPCIÓN 2: Programar AUTOMÁTICAMENTE (Recomendado)

### En Windows (Task Scheduler):

1. **Abre Task Scheduler:**
   - Presiona `Win + R`
   - Escribe `taskschd.msc`
   - Click OK

2. **Crea nueva tarea:**
   - Click en "Create Basic Task..."
   - **Name:** `The303-Marketing-31-Mayo`
   - **Description:** "Ejecutar campaña de marketing"
   - Click Next

3. **Establece trigger (cuándo):**
   - Selecciona: `One time`
   - **Date:** 31 de mayo de 2026
   - **Time:** 08:30 AM
   - Click Next

4. **Establece acción (qué ejecutar):**
   - Selecciona: `Start a program`
   - **Program/script:** `node`
   - **Add arguments:** `automation/scripts/schedule-campaign.js execute`
   - **Start in:** `C:\Users\maike\Desktop\303 Marketing Agency\maikphotographer-web-site`
   - Click Next

5. **Finish:**
   - ✅ Marcar: "Open the Properties dialog"
   - Click Finish
   - Click OK

**¡Listo!** Windows ejecutará automáticamente a las 8:30 AM.

---

### En Mac/Linux:

```bash
# Abrir crontab
crontab -e

# Agregar esta línea (ejecuta una sola vez a las 8:30 AM del 31 de mayo):
30 8 31 5 * cd ~/Desktop/'303\ Marketing\ Agency/maikphotographer-web-site' && node automation/scripts/schedule-campaign.js execute

# Guardar y salir
# En nano: Ctrl+X → Y → Enter
```

---

## 🎯 OPCIÓN 3: Programar en Vercel (Si está deployado)

Si tu sitio está en Vercel, puedo configurar serverless cron automático.

**Para hacer esto:**
1. Agregar a `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/campaign",
      "schedule": "30 8 31 5 *"
    }
  ]
}
```

2. Crear `/api/campaign.js`:
```javascript
import { exec } from 'child_process';

export default async (req, res) => {
  exec('node automation/scripts/schedule-campaign.js execute');
  res.status(200).json({ status: 'Campaign started' });
};
```

**Nota:** Esto requiere Vercel Pro o ajustes adicionales.

---

## ✅ VERIFICACIÓN PREVIA

**Antes de las 8:30 AM, verifica:**

### 1. Variables de entorno (.env)
```bash
# Asegúrate de que existen:
BUSINESS_EMAIL=tu_email@gmail.com
GMAIL_APP_PASSWORD=tu_contraseña_app_de_google
GOOGLE_MAPS_API_KEY=tu_api_key
```

**Cómo obtener Gmail App Password:**
1. Ve a: https://myaccount.google.com/security
2. Activa 2-factor authentication
3. Ve a: https://myaccount.google.com/apppasswords
4. Selecciona: Mail → Windows Computer
5. Copia la contraseña → Pégala en `.env`

### 2. Credenciales API
```bash
# Verifica que tienes:
✓ Google Maps API key (habilitado)
✓ Gmail configurado con App Password
✓ .env file en la raíz del proyecto
```

### 3. Prueba rápida (ejecutar ahora)
```bash
# Esto hará una ejecución de prueba:
node automation/scripts/schedule-campaign.js execute

# Si funciona, verás:
# ✅ Leads buscados
# ✅ Emails enviados
# ✅ Reporte enviado a tu email
```

---

## 📊 QUÉ PASARÁ A LAS 8:30 AM

```
8:30:00 — INICIO
  ├─ Buscar leads (Google Maps, Instagram, LinkedIn)
  ├─ Priorizar hispanohablantes (70%)
  ├─ Validar datos
  └─ Tiempo: 2-3 minutos

8:33:00 — ENVÍO
  ├─ Detección de tipo de negocio
  ├─ Generación de emails personalizados
  ├─ Envío con 2 segundos de delay
  └─ Tiempo: 3-5 minutos (20 leads × 2 seg)

8:38:00 — SEGUIMIENTO
  ├─ Activar rastreo automático
  ├─ Programar follow-ups (días 3,7,14,21,30)
  ├─ Guardar campaign-tracker.json
  └─ Tiempo: 1 minuto

8:39:00 — NOTIFICACIÓN
  ├─ Generar reporte
  ├─ Enviar a maikelmarshall07@gmail.com
  └─ **FIN — Sistema activo 24/7**

Total: ~10 minutos
```

---

## 📧 REPORTE ESPERADO EN TU EMAIL

Recibirás un email con:

```
✅ 🎉 CAMPAÑA COMPLETADA EXITOSAMENTE

📊 RESULTADOS INMEDIATOS:
  • Emails enviados: 19/20
  • Tasa de éxito: 95%
  • Leads rastreando: 19

🔄 SISTEMA DE SEGUIMIENTO ACTIVADO:
  ✓ Día 3: Recordatorio ("¿Qué te pareció?")
  ✓ Día 7: Oferta (+15% descuento)
  ✓ Día 14: Urgencia (oferta vence)
  ✓ Día 21: Prueba social (casos de éxito)
  ✓ Día 30: Cierre final

📁 ARCHIVOS GENERADOS:
  1. campaign-results.json
  2. campaign-tracker.json
  3. campaign-history.json
  4. followup-report.txt
```

---

## 🔔 DESPUÉS DE LAS 8:30 AM

**No tienes que hacer nada.** El sistema:

- ✅ Monitoreará Gmail automáticamente
- ✅ Enviará follow-ups en días 3, 7, 14, 21, 30
- ✅ Detectará respuestas y las registrará
- ✅ Te notificará cuando alguien responda
- ✅ Escala automáticamente según engagement

**Solo monitorea tu Gmail para respuestas.**

---

## 🎯 META: 5+ RESPUESTAS

**Estimado:**
- 20 emails enviados
- Open rate: 12-15% (2-3 aperturas)
- Click rate: 3-5% (0.6-1 clicks)
- Response rate: 5-10% (1-2 respuestas directas)
- Follow-up response: +3-5 adicionales

**Total esperado: 5-8 respuestas en 30 días**

**Timeline:**
- Día 1-2: Aperturas iniciales
- Día 3-5: Clics en enlaces
- Día 7-14: Primeras respuestas (follow-up de "oferta")
- Día 21-30: Respuestas tardías (proof social)

---

## 🚨 TROUBLESHOOTING

### Si no ejecuta automáticamente:

**Windows Task Scheduler:**
```
1. Abre Task Scheduler
2. Busca "The303-Marketing-31-Mayo"
3. Click derecho → Run
4. Verifica que inicie correctamente
```

**Mac/Linux cron:**
```bash
# Verifica que cron está activo
crontab -l

# Si no sale nada, agrégalo de nuevo:
crontab -e
```

### Si no llegan emails:

```bash
# 1. Verifica .env
cat .env

# 2. Prueba las credenciales de Gmail
node -e "
const nodemailer = require('nodemailer');
const t = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.BUSINESS_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});
t.verify((err, ok) => console.log(err || ok));
"

# 3. Si falla, regenera Gmail App Password en:
# https://myaccount.google.com/apppasswords
```

### Si no encuentra leads:

```bash
# Verifica Google Maps API
# https://console.cloud.google.com/apis

# Verifica que está habilitada:
- Maps JavaScript API
- Places API
- Geocoding API
```

---

## 💡 TIPS

1. **No cierres sesión de Gmail** en el navegador (facilita monitorear respuestas)

2. **Agrega a favoritos:**
   - `campaign-results.json` (para ver detalles)
   - `campaign-tracker.json` (para ver engagement)

3. **Autorespuesta en Gmail:**
   - Es recomendable NO poner autorespuesta
   - Queremos que respondas personalmente

4. **Si llega mucho volumen:**
   - Puedo crear filtros automáticos en Gmail
   - O sistema de CRM más avanzado

---

## 📞 CONFIRMACIÓN

**Antes de las 8:30 AM, confirma:**

```bash
# Terminal:
echo "Sistema listo: $(date)"

# Debería mostrar hoy la hora actual
# Si la hora es correcta, ¡todo está listo!
```

---

## 🎉 RESUMEN FINAL

| Concepto | Detalles |
|----------|----------|
| **Ejecución** | Mañana 31 de mayo a las 8:30 AM |
| **Qué se envía** | 20 emails personalizados por tipo de negocio |
| **Leads target** | Restaurantes, salones, tiendas, negocios hispanos |
| **Follow-ups** | Automático (días 3,7,14,21,30) |
| **Notificación** | Tu email personal (maikelmarshall07@gmail.com) |
| **Meta** | 5+ respuestas/conversiones |
| **Tu esfuerzo** | Solo ejecutar a las 8:30 AM (¡o programarlo ahora!) |
| **Sistema después** | 100% automático - monitorea solo |

---

## ✨ BOTÓN GRANDE

**EJECUTAR AHORA (para prueba):**
```bash
node automation/scripts/schedule-campaign.js execute
```

**PROGRAMAR PARA MAÑANA (automático):**
- ✅ Windows: Usar Task Scheduler (instrucciones arriba)
- ✅ Mac/Linux: Usar crontab (instrucciones arriba)

---

**¿Listo? Elige tu opción y ¡avisa cuando ejecutes!** 🚀
