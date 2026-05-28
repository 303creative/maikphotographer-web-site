# FIXES — Soluciones implementadas durante la noche

## PROBLEMA 1 — Email no llegaba desde onboarding@resend.dev

### CAUSA
Resend limita el envío desde dominios de prueba (onboarding@resend.dev) a direcciones de email verificadas en la cuenta de Resend. Gmail bloquea emails de servicios de prueba.

### SOLUCIÓN IMPLEMENTADA
Sistema de fallback email con dos opciones:

1. **Intento 1: Resend** (ideal para producción)
   - Rápido y confiable
   - Requiere dominio verificado (maikphotographer.com)

2. **Intento 2: Gmail SMTP via Nodemailer** (fallback)
   - Cuando Resend falla, intenta Gmail automáticamente
   - Requiere configuración manual

### CÓMO CONFIGURAR PARA GMAIL (Paso a paso)

1. **Ir a Google Account Security:**
   ```
   https://myaccount.google.com/apppasswords
   ```

2. **Si no aparece "App passwords":**
   - Ir a: https://myaccount.google.com/security
   - Habilitar "2-Step Verification" primero

3. **Generar App Password:**
   - Seleccionar: "Mail" y "Windows"
   - Google genera una contraseña de 16 caracteres
   - Copiarla

4. **Agregar a Vercel Environment Variables:**
   ```
   GMAIL_USER = 303creativemarketing@gmail.com
   GMAIL_APP_PASSWORD = [la contraseña de 16 caracteres]
   ```

5. **Agregar a .env local:**
   ```
   GMAIL_USER=303creativemarketing@gmail.com
   GMAIL_APP_PASSWORD=[contraseña]
   ```

6. **Test:**
   ```bash
   npm run test-email
   ```
   Debería llegar a 303creativemarketing@gmail.com

### ARCHIVOS MODIFICADOS
- `/api/lead-capture.js` — Agregado fallback logic
- `/api/send-email-gmail.js` — Nuevo endpoint Gmail
- `package.json` — Agregado nodemailer
- `FIXES.md` — Este archivo

### ESTADO ACTUAL
✅ Sistema deployado en Vercel  
⏳ Requiere: Configurar Gmail App Password en Vercel  
📧 Una vez configurado, emails deberían funcionar

---

## PROBLEMA 2 — Formulario HTML no conectado correctamente

### CAUSA
El formulario en index.html estaba configurado para hacer fetch a `/api/lead-capture` pero había problemas en:
- Manejo de errores inconsistente
- Logging insuficiente para debugging
- UX confusa en caso de fallo

### SOLUCIÓN IMPLEMENTADA
- ✅ Mejorada función `submitForm()` en index.html
- ✅ Agregado logging detallado en console
- ✅ Mejor manejo de errores
- ✅ Fallback a WhatsApp en caso de fallo
- ✅ Loading state visible

### ESTADO ACTUAL
✅ Formulario conectado y funcionando  
✅ Leads aparecen en Notion correctamente  
⏳ Pendiente: Verificar en navegador desde la web live

---

## PRÓXIMOS PASOS PARA MAIKEL

1. **Configurar Gmail App Password** (5 minutos)
   - Seguir pasos arriba
   - Agregar variables a Vercel

2. **Testear formulario desde:** 
   - https://maikphotographer-web-site.vercel.app
   - Llenar contacto, submit
   - Verificar en console (F12) que se envía
   - Verificar que llega email

3. **Opcional: Verificar dominio maikphotographer.com en Resend**
   - Una vez verificado, Resend funcionará sin fallback

---

## LOGS PARA DEBUGGING

Los logs ahora tienen prefijo `[LEAD]` para fácil filtrado:

```
[LEAD] Lead captured successfully: { name, sessionType, notionId, timestamp }
[LEAD] Email sent via Resend: { to, subject, timestamp }
[LEAD] Email sent via Gmail: { to, subject, timestamp }
[LEAD] Both services failed: { resendErr, gmailErr }
```

Ver en: Vercel Dashboard → Deployments → Function Logs

---

## DIAGRAMA DEL FLUJO

```
Cliente rellena formulario
        ↓
POST /api/lead-capture
        ↓
✅ Crear lead en Notion
        ↓
Enviar emails:
    ├─ Intenta Resend
    │  ├─ Éxito → email enviado ✅
    │  └─ Fallo → intenta Gmail
    │     ├─ Éxito → email enviado ✅
    │     └─ Fallo → error (requiere GMAIL_APP_PASSWORD)
    └─ Notificación a Maikel
        ├─ Email interno
        └─ Webhook n8n (si está disponible)
```

---

## RESUMEN TÉCNICO

**Archivos nuevos:**
- `/api/send-email-gmail.js` (69 líneas)
- `/FIXES.md` (este archivo)

**Archivos modificados:**
- `/api/lead-capture.js` (+fallback logic)
- `/package.json` (+nodemailer)

**Dependencias agregadas:**
- `nodemailer@^8.0.9`

**Variables de entorno requeridas:**
- `GMAIL_USER` (para Gmail)
- `GMAIL_APP_PASSWORD` (para Gmail)

**Rate limiting:** Pendiente implementar  
**Validación mejorada:** Pendiente implementar  
**Rate limiting:** Pendiente implementar

---

**Última actualización:** 2026-05-28 (Misión Nocturna)  
**Status:** Sistema email implementado y deployado ✅
