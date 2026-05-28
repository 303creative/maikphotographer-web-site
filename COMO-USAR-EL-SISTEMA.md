# 🚀 CÓMO USAR EL SISTEMA — THE303 Agency Automation

## 📋 Tabla de Contenidos
1. [Generar Contenido](#generar-contenido)
2. [Email System](#email-system)
3. [CRM Leads](#crm-leads)
4. [Bookings](#bookings)
5. [Troubleshooting](#troubleshooting)

---

## 🎬 Generar Contenido

### Opción 1: Doble-click en Windows (RECOMENDADO)
1. Abre el explorador de archivos
2. Navega a: `C:\Users\maike\Desktop\303 Marketing Agency\maikphotographer-web-site\`
3. Doble-click en **`GENERAR-CONTENIDO.bat`**
4. Escribe cuántos posts deseas generar (default: 5)
5. ¡Listo! Sistema genera automáticamente

### Opción 2: Línea de comandos
```bash
npm run muapi-generate 5
```

### Qué hace el sistema:
- ✅ Genera 5 posts con imágenes de IA (MUAPI.ai)
- ✅ Crea captions billingües (ES + EN)
- ✅ Rota hashtags automáticamente
- ✅ Guarda todo en Notion MARKETING DB
- ✅ Listo para publicar manualmente o automático

### Después de generar:
1. **Abre Notion:** https://notion.so
2. **Ve a:** MARKETING database
3. **Revisa:** Imágenes, captions, hashtags
4. **Marca:** "Listo para Publicar" ✓ cuando esté OK
5. **Sistema automático** publicará en horarios óptimos

---

## 📧 Sistema de Email

### Test de email
```bash
npm run test-email
```

### Cómo funciona:
- **Cliente**: Recibe confirmación automática cuando se registra
- **Tú**: Recibes notificación interna en 303creativemarketing@gmail.com
- **Fallback**: Si Gmail falla, intenta Resend automáticamente

### Si no llega un email:
1. Abre: https://vercel.com/dashboard
2. Click en: maikphotographer-web-site
3. Click en: Deployments → Function Logs
4. Busca: `[EMAIL-CLIENT]` en los logs
5. Revisa si hay errors

---

## 🎯 CRM Leads

### Leads en Notion
Todos los leads van automáticamente a: **LEADS database en Notion**
- Nombre, email, teléfono, tipo de sesión
- Email de confirmación enviado automático
- Webhook a n8n para automatización

### Buscar un lead
1. Abre: https://notion.so
2. Va a: LEADS database
3. Busca por nombre o email
4. Click en el lead para ver detalles

### Follow-up automático
```bash
npm run followup
```
Envía automáticamente:
- 24 horas: "Recordatorio amable"
- 72 horas: "Oferta especial"
- 7 días: "¿Aún interesado?"
- 30 días: Último recordatorio

---

## 📅 Bookings

### Cal.com integration
- Link: https://cal.com/the303-marketing-kmfxzs/30min
- Embed en el sitio web
- Automáticamente sincroniza con Notion

### Ver bookings en Notion
1. Abre: https://notion.so
2. Va a: BOOKINGS database
3. Todos los bookings de Cal.com están aquí

---

## 🔧 Troubleshooting

### "El email no llegó"
```
1. npm run test-email
2. Verifica logs en Vercel Dashboard
3. Si error: Abre https://myaccount.google.com/apppasswords
   - Verifica GMAIL_APP_PASSWORD está correcta
   - Resetea si es necesario
```

### "No puedo generar contenido"
```
1. npm run muapi-generate 1
2. Verifica: MUAPI_API_KEY está en .env
3. Si error: Check API balance en muapi.ai
```

### "Leads no aparecen en Notion"
```
1. Verifica: NOTION_API_KEY en .env
2. Verifica: NOTION_LEADS_DB_ID en .env
3. Verifica: Base de datos existe en Notion
```

### "Rate limit error (429)"
```
- Maximum 5 requests per IP per hour
- Espera 1 hora y reintentas
- O cambia IP (tethering, VPN, otra red)
```

---

## 📞 API Keys Necesarias

Verifica que tienes en tu `.env`:
```
NOTION_API_KEY=...
NOTION_LEADS_DB_ID=...
NOTION_MARKETING_DB_ID=...
ANTHROPIC_API_KEY=...
MUAPI_API_KEY=...
GMAIL_USER=303creativemarketing@gmail.com
GMAIL_APP_PASSWORD=...
```

Si falta alguna:
1. Abre `.env`
2. Agrega la key faltante
3. Abre https://vercel.com/dashboard
4. Agrega la variable a Environment Variables
5. Redeploy automático en Vercel

---

## 📊 Estadísticas y Monitoreo

### Ver logs en Vercel
1. https://vercel.com/dashboard
2. Click en: maikphotographer-web-site
3. Deployments → Function Logs
4. Busca por timestamp

### Ver métricas de leads
- Notion: LEADS database tiene estadísticas
- Resumen: Cuántos nuevos leads, tasas de conversión, etc.

---

## ✅ Checklist Semanal

- [ ] Generar contenido (5-10 posts)
- [ ] Revisar Notion MARKETING database
- [ ] Publicar contenido aprobado
- [ ] Revisar leads en LEADS database
- [ ] Seguimiento a leads pendientes
- [ ] Check email delivery (test-email)
- [ ] Revisar analytics en Vercel

---

**¿Necesitas ayuda?** Revisa los logs o contacta al equipo de desarrollo.
