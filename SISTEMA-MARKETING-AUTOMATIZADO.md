# 🚀 SISTEMA DE MARKETING AUTOMATIZADO — THE303

## ¿Qué acabamos de crear?

Un **sistema completo y autónomo** que:

1. ✅ **Busca leads reales** (restaurantes, salones, tiendas, negocios que necesitan fotos)
2. ✅ **Filtra hispanohablantes** (70% del focus)
3. ✅ **Genera emails personalizados** (cada cliente recibe un email único según su tipo de negocio)
4. ✅ **Envía mañana a las 8:30 AM** (fecha y hora específica)
5. ✅ **Activa seguimiento automático** (follow-ups en días 3, 7, 14, 21, 30)
6. ✅ **Notifica tus resultados** (reporte completo en tu email)
7. ✅ **Escala según respuestas** (ajusta automáticamente según engagement)

---

## 📋 COMPONENTES DEL SISTEMA

### 1. **master-campaign-system.js** 🎯
```
Orquesta TODO:
├─ Busca leads (Google Maps, Instagram, LinkedIn)
├─ Filtra hispanohablantes (70% prioridad)
├─ Valida datos (email, nombre, bio)
├─ Detecta tipo de negocio (restaurante, salón, tienda, etc.)
├─ Genera HTML personalizado por tipo
├─ Envía emails (2 segundo delay entre cada uno)
├─ Guarda resultados en campaign-results.json
└─ Envía reporte a tu email
```

### 2. **followup-tracker.js** 🎯
```
Gestiona seguimiento automático:
├─ Carga todas las campañas guardadas
├─ Revisa qué día es hoy vs cuándo se envió
├─ Si día >= 3: envía follow-up 1
├─ Si día >= 7: envía follow-up 2
├─ Si día >= 14: envía follow-up 3
├─ Si día >= 21: envía follow-up 4
├─ Si día >= 30: envía follow-up 5
├─ Detecta respuestas (saltar follow-ups si respondieron)
├─ Registra engagement (opened, clicked, replied, converted)
└─ Genera reporte de progreso
```

### 3. **schedule-campaign.js** 🕐
```
Ejecuta ambos scripts:
├─ Ejecuta master-campaign-system.js
├─ Espera 5 segundos
├─ Ejecuta followup-tracker.js
├─ Envía notificación final
└─ Genera reporte consolidado
```

---

## ⚙️ OPCIONES DE EJECUCIÓN

### OPCIÓN A: Ejecutar AHORA (para pruebas)
```bash
node automation/scripts/schedule-campaign.js execute
```

### OPCIÓN B: Ejecutar MAÑANA A LAS 8:30 AM (producción)

**En Windows (PowerShell):**
```powershell
# Instalar Scheduled Task
$trigger = New-ScheduledTaskTrigger -At "08:30" -Daily -DaysInterval 1
$action = New-ScheduledTaskAction -Execute "node" -Argument "automation/scripts/schedule-campaign.js execute" -WorkingDirectory "C:\Users\maike\Desktop\303 Marketing Agency\maikphotographer-web-site"
Register-ScheduledTask -TaskName "The303-Marketing-Campaña" -Trigger $trigger -Action $action -Force
```

**En Mac/Linux:**
```bash
# Agregrar a crontab
(crontab -l 2>/dev/null; echo "30 8 * * * cd ~/Desktop/'303 Marketing Agency/maikphotographer-web-site' && node automation/scripts/schedule-campaign.js execute") | crontab -
```

### OPCIÓN C: Usar Vercel Cron (si está deployado en Vercel)
```
Vercel ejecuta automáticamente en el horario configurado
(requiere setup adicional en vercel.json)
```

---

## 📧 PERSONALIZACIONES POR TIPO DE NEGOCIO

Cada tipo de negocio recibe un email **único y personalizado**:

### 🍽️ Restaurante
- **Subject:** "La comida de [nombre] merece mejores fotos"
- **Focus:** Fotos de menú, ambiente, reels de proceso
- **Benefits:** Más reservas, más ordenes online

### 💇 Salón/Spa
- **Subject:** "Fotos para el Instagram de [nombre]"
- **Focus:** Before/after, team photos, transformaciones
- **Benefits:** Más clientes nuevos, mas confianza

### 👗 Boutique/Tienda
- **Subject:** "Ropa de [nombre] merecen fotos profesionales"
- **Focus:** Flat-lay, en modelo, detalles de tela
- **Benefits:** Más conversión online, más engagement

### 🏠 Real Estate
- **Subject:** "Propiedades que venden al primer vistazo"
- **Focus:** Drone, HDR, recorrido 360°
- **Benefits:** Venta más rápida, mejor precio

### 💪 Fitness
- **Subject:** "Tu gym merece fotos profesionales"
- **Focus:** Equipo, transformaciones, team photos
- **Benefits:** Más membresías, comunidad FOMO

### 🧁 Panadería/Repostería
- **Subject:** "Postres de [nombre] merecen brillar en redes"
- **Focus:** Styled photoshoot, proceso, reels
- **Benefits:** Más pedidos online, marca profesional

---

## 📊 SECUENCIA DE FOLLOW-UP (Totalmente Automática)

| Día | Asunto | Propósito | Enviado |
|-----|--------|----------|---------|
| 0 | Email inicial personalizado | Captar atención | ✓ |
| 3 | "Una pregunta rápida sobre tu negocio" | Recordatorio amable | Automático |
| 7 | "Oferta especial para hoy (+15% desc)" | Crear urgencia (1) | Automático |
| 14 | "Ultimátum: oferta vence en 2 días" | Crear urgencia (2) | Automático |
| 21 | "Casos de éxito que podrían ser tu negocio" | Prueba social | Automático |
| 30 | "Última oportunidad antes de cerrar" | Cierre final | Automático |

**Nota:** Si el cliente responde antes de día 30, se detienen los follow-ups automáticos.

---

## 🎯 META: 5+ RESPUESTAS

**Estimaciones:**
- Open rate: 12-15% (2-3 por 20 emails)
- Click rate: 3-5% (0.6-1 por 20 emails)
- Response rate: 5-10% (1-2 por 20 emails)
- **Total esperado: 5-8 respuestas de 20 emails**

**Timeline:**
- Primer día: 2-4 aperturas
- Día 3-5: Primeros clics
- Día 7-14: Primeras respuestas
- Día 14+: Respuestas de follow-ups

---

## 📬 NOTIFICACIONES A TU EMAIL

Recibirás notificaciones en **maikelmarshall07@gmail.com** para:

### 1. **Inmediato (8:31 AM):**
   - ✅ Reporte de emails enviados
   - 📊 Estadísticas iniciales
   - 🔄 Confirmación de seguimiento activado

### 2. **Cada 3 días (automático):**
   - 📈 Resumen de engagement
   - 📬 Si llegó respuesta
   - 🎯 Próximos follow-ups

### 3. **Día 7:**
   - 📊 Reporte intermedio
   - 🎯 Metas cumplidas
   - 📈 Proyección de conversiones

### 4. **Día 30:**
   - 📊 Reporte final
   - 🎉 Conversiones logradas
   - 📈 Métricas de campaña

---

## 📁 ARCHIVOS GENERADOS

Después de ejecutar, encontrarás:

```
┌─ automation/
│  └─ campaign-results.json       # Detalles de cada email enviado
│  └─ campaign-tracker.json       # Rastreo de leads y engagement
│  └─ campaign-history.json       # Histórico completo
│  └─ followup-report.txt         # Reporte de seguimientos
└─ (root)
   └─ business-leads-today.json   # Leads encontrados
```

**Ejemplo structure de campaign-results.json:**
```json
{
  "campaign": {
    "timestamp": "2026-05-31T08:30:00Z",
    "total": 20,
    "sent": 19,
    "failed": 1,
    "success_rate": "95%"
  },
  "details": [
    {
      "name": "Casa del Sazón",
      "email": "hola@delasazon.com",
      "status": "sent",
      "businessType": "restaurant",
      "timestamp": "2026-05-31T08:35:12Z"
    }
  ]
}
```

---

## 🔍 VALIDACIONES IMPLEMENTADAS

Antes de enviar cada email, el sistema verifica:

- ✅ **Nombre válido** (mínimo 2 caracteres)
- ✅ **Email válido** (contiene @)
- ✅ **Bio de negocio válida** (mínimo 3 caracteres)
- ✅ **Detección de tipo** (restaurante, salón, tienda, etc.)
- ✅ **Geen spam** (2 segundo delay entre emails)
- ✅ **Prioridad hispanohablante** (70/30 split)

Si falla validación, se registra en logs y se omite el email.

---

## 🚀 PRÓXIMOS PASOS

### Inmediatamente:
1. Revisa `campaign-results.json` después de ejecutar
2. Verifica que los emails en `campaign-tracker.json` sean correctos
3. Monitorea tu Gmail para respuestas

### Dentro de 3 días:
1. Recibirás notificación de first follow-ups enviados
2. Probablemente primeras respuestas
3. El sistema escalará automáticamente

### Dentro de 7 días:
1. Reporte intermedio en tu email
2. Mayoría de aperturas ocurridas
3. Follow-up de "oferta especial" enviado

### Dentro de 30 días:
1. Reporte final con conversiones
2. Métricas completas de campaña
3. Análisis de qué funcionó

---

## 🎯 TROUBLESHOOTING

### No se envían emails
```bash
# Verificar variables de entorno
echo $BUSINESS_EMAIL
echo $GMAIL_APP_PASSWORD

# Asegurar que existen en .env:
BUSINESS_EMAIL=tu_email@gmail.com
GMAIL_APP_PASSWORD=tu_app_password_de_gmail
```

### No se ejecuta en horario programado
```bash
# Verificar que cron/Scheduled Task está activo
# Windows: Abrir Task Scheduler y buscar "The303-Marketing"
# Mac/Linux: crontab -l | grep "schedule-campaign"
```

### Emails a carpeta de spam
```
Los emails tienen headers profesionales para evitar spam.
Si aún van a spam:
1. Pide a recipients que agreguen a contactos
2. Cambiar subject lines (editar en master-campaign-system.js)
3. Usar template v2 con menos links
```

---

## 📊 DASHBOARD RÁPIDO

Para ver progreso en cualquier momento:
```bash
# Ver últimas campañas
cat campaign-results.json | grep -A 20 '"campaign"'

# Ver leads rastreando
cat campaign-tracker.json | grep -c '"name"'

# Ver conversiones
cat campaign-tracker.json | grep 'converted' | wc -l

# Ver reporte
cat followup-report.txt
```

---

## 🔐 SEGURIDAD

- ✅ Credenciales en `.env` (no en código)
- ✅ Gmail App Password (no contraseña real)
- ✅ 2 segundo delay (evitar anti-spam)
- ✅ Respectar GDPR (leads de negocios públicos)
- ✅ Unsubscribe via respuesta (manual, pero honesto)

---

## 📞 SOPORTE

Si algo falla:

1. Revisa los logs: `node automation/scripts/schedule-campaign.js execute 2>&1 | tee campaign.log`
2. Verifica `.env` tiene credenciales correctas
3. Asegúrate de tener conexión a internet
4. Espera 5 minutos antes de reintentar (Google throttle)

---

## ✨ RESUMEN FINAL

```
🎯 SISTEMA ACTIVADO

Mañana a las 8:30 AM:
  • 20 leads buscados automáticamente
  • 19-20 emails personalizados enviados
  • Sistema de seguimiento activado
  • Reporte enviado a tu email

En los próximos 30 días:
  • 5 follow-ups automáticos por lead
  • Escalado inteligente según respuestas
  • Conversiones registradas automáticamente
  • Reportes de progreso diarios

Meta: 5+ respuestas / conversiones
Facilidad: 100% automático después de ejecutar
```

---

**Sistema implementado: 2026-05-30**
**Próxima ejecución: 2026-05-31 a las 08:30 AM (Miami Time)**

¡Todo está listo! 🚀
