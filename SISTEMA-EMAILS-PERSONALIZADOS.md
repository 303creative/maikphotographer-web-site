# 🎯 SISTEMA DE EMAILS PERSONALIZADOS - The303 Photography

## Lo que cambió

### ❌ Antes
- Emails genéricos para todos
- Mismo mensaje para restaurant, boutique, modelo, etc.
- Bajo engagement

### ✅ Ahora
- **Emails 100% personalizados** según tipo de negocio
- **Detección automática** de idioma (ES/EN)
- **Follow-ups inteligentes** en días 3, 7, 14, 21, 30
- **Plain text** (mejor para cold email - 40% más conversión)
- **Psicología comprobada** de sales scripts

---

## 📊 Estrategia Basada en Datos

Hemos implementado principios de cold email comprobados en 2026:

✅ **Emails de 50-125 palabras** (máximo para leer en móvil)  
✅ **Subject lines de 7 palabras** (mejor open rate)  
✅ **UN solo CTA** por email (evita confusion)  
✅ **Plain text format** (más personal que HTML)  
✅ **Personalización automática** (aumenta conversión 6x)  
✅ **Secuencia de 5 follow-ups** (80% de ventas necesitan esto)  
✅ **Delay entre emails** (1.5 segundos - anti-spam)  

---

## 🎯 Categorías de Scripts

El sistema detecta automáticamente el tipo de negocio:

### 1️⃣ Instagram Creators & Models
- **Trigger**: Username en Instagram + bio de creator
- **Mensaje**: Editorial photography opportunity
- **Ángulo**: Elevar marca personal

### 2️⃣ Restaurantes
- **Trigger**: Google Maps + palabras clave (restaurant, cafe, food)
- **Mensaje**: Fotos profesionales = más reservas
- **Ángulo**: 32% más rápido, 3-11% más caro

### 3️⃣ Boutiques & Tiendas
- **Trigger**: Google Maps + keywords (store, boutique, clothing)
- **Mensaje**: Fotos que venden
- **Ángulo**: Más foot traffic + online sales

### 4️⃣ Salones de Belleza
- **Trigger**: Google Maps + keywords (salon, spa, beauty)
- **Mensaje**: Contenido para redes
- **Ángulo**: Cliente ideal con redes activas

### 5️⃣ Real Estate Agents
- **Trigger**: Google Maps + "real estate" / "agent"
- **Mensaje**: Ventas más rápidas y caras
- **Ángulo**: ROI directo (% por venta)

### 6️⃣ Fitness Studios
- **Trigger**: Google Maps + keywords (gym, fitness, studio)
- **Mensaje**: Atrae nuevos miembros
- **Ángulo**: 30+ contenidos por sesión

### 7️⃣ Medical/Dental Practices
- **Trigger**: Google Maps + keywords (doctor, clinic, dental)
- **Mensaje**: Confianza + profesionalismo
- **Ángulo**: Pacientes eligen por confianza

### 8️⃣ LinkedIn Headshots
- **Trigger**: LinkedIn profile + professional
- **Mensaje**: 14x más vistas con headshot
- **Ángulo**: Oportunidades profesionales

---

## 🚀 Cómo Funciona

### Paso 1: Detección Automática

```javascript
// El sistema detecta:
- Idioma (ES/EN) por palabras clave en bio
- Tipo de negocio por keywords
- Plataforma (Instagram/Google Maps/LinkedIn)
```

### Paso 2: Selección de Script

```javascript
// Para un restaurante en Google Maps (español):
restaurantName = "Miami Eats Cafe"
language = "ES"
businessType = "restaurant"

script = RestaurantScripts.emailFirstTouchES(name, neighborhood)
```

### Paso 3: Envío Plain Text

```
Subject: La comida de Miami Eats merece mejores fotos

---

Hola,

Encontré Miami Eats Cafe en Google Maps...
[resto del email]
```

### Paso 4: Seguimiento Automático

```
Día 0: Email inicial ✅
Día 3: ¿Llegó mi mensaje?
Día 7: Agregar valor (portfolio)
Día 14: Oferta limitada (10% off)
Día 21: ¿Conoces a alguien?
Día 30: Último mensaje
```

---

## 📂 Archivos Generados

### 1. `business-leads-today.json`
```json
[
  {
    "name": "Miami Eats Cafe",
    "source": "Google Maps",
    "phone": "+1 (305) 123-4567",
    "website": "miamieats.com",
    "sourceUrl": "https://maps.google.com/..."
  }
]
```

### 2. `personalized-email-campaign.json`
```json
{
  "campaign": {
    "timestamp": "2026-05-30T...",
    "total_processed": 20,
    "emails_sent": 19,
    "success_rate": "95%"
  },
  "details": [
    {
      "name": "Miami Eats Cafe",
      "email": "contact@miamieats.com",
      "businessType": "restaurant",
      "language": "ES",
      "status": "sent",
      "followUpSchedule": {
        "day3": "2026-06-02T...",
        "day7": "2026-06-06T...",
        ...
      }
    }
  ]
}
```

### 3. `campaign-history.json`
```json
{
  "campaigns": [
    {
      "timestamp": "2026-05-30T...",
      "total_sent": 19,
      "leads": [...]
    }
  ]
}
```

---

## ⏱️ Timing Perfecto

### Mejores Horas para Enviar
- **5-6 AM** (6% más aperturas)
- **7-9 PM** (8% más aperturas)

### Mejores Días
- **Martes** (7% más respuestas)
- **Jueves** (6% más respuestas)

El sistema envía automáticamente en horarios óptimos.

---

## 📧 Ejemplo de Email Personalizado

### Restaurante (Español)
```
Subject: La comida de Miami Eats merece mejores fotos

---

Hola,

Encontré Miami Eats Cafe en Google Maps — me encanta lo que hacen en Wynwood.

Lo único: su comida merece fotos mejores que las que tienen.

Ayudo a restaurantes en Miami a atraer más clientes con fotografía profesional.

¿Interesado en una llamada de 15 minutos?

— Maikel
📱 +1 (786) 332-9815
```

### Creator de Instagram (Inglés)
```
Subject: Your Miami content 📸

---

Hey Maria,

Came across your work on Instagram — really like your aesthetic.

I work with Miami creators on editorial photography that takes their brand to the next level.

Worth a quick chat?

— Maikel
📱 maikphotographer.com
```

---

## 🔄 Secuencia de Follow-ups

### Día 3: Primer Follow-up
```
"¿Llegó mi mensaje anterior? ¿Tienes 5 minutos esta semana?"
```
**Propósito**: Recuperar atención, simple check-in

### Día 7: Agregar Valor
```
"Te comparto un proyecto reciente similar a lo que necesitas..."
```
**Propósito**: Demostrar valor, mitigar objeción

### Día 14: Oferta Limitada
```
"Tengo 2 espacios disponibles este mes. Los que responden hoy get 10% off"
```
**Propósito**: Crear urgencia, cerrar venta

### Día 21: Referral
```
"¿Conoces a alguien que pueda necesitar fotos? Te doy 25% off"
```
**Propósito**: Estrategia lateral, valor mutuo

### Día 30: Último Contacto
```
"Último mensaje de mi parte. Si algún día necesitas, aquí estoy"
```
**Propósito**: Cierre respetuoso, dejar puerta abierta

---

## 📊 Métricas Esperadas

### Del Envío Inicial
- **Open rate**: 25-35% (más que industry standard)
- **Click rate**: 5-10% (via CTA)
- **Response rate**: 2-5% (leads calificados)

### De Follow-ups
- **Day 3 open**: +15% (reminder effect)
- **Day 7 engagement**: +8% (value added)
- **Day 14 conversion**: 5-15% (limited offer)

### Total Conversión
- De 20 emails → 1-2 conversiones esperadas
- De 100 emails → 5-10 conversiones esperadas

---

## 🎬 EJECUTAR SISTEMA

### Comando Principal
```bash
node automation/scripts/run-campaign-email-only.js
```

Esto ejecuta:
1. 🔍 Búsqueda de negocios
2. ✉️ Envío personalizado
3. 📧 Follow-ups automáticos

### Ejecutar Manualmente Cada Paso

```bash
# Paso 1: Buscar leads
node automation/scripts/search-leads-businesses.js

# Paso 2: Enviar emails personalizados
node automation/scripts/send-personalized-emails.js

# Paso 3: Enviar follow-ups (automático después de Día 3)
node automation/scripts/send-followups.js
```

---

## 🔧 Personalizar Scripts

Edita `/automation/email-templates/sales-scripts.js`:

```javascript
// Cambiar subject lines
emailFirstTouchES: (name) => ({
  subject: `TU CUSTOM SUBJECT`,
  body: `TU CUSTOM BODY`
})

// Agregar nuevas categorías
export const NewCategoryScripts = {
  emailFirstTouch: (name) => ({...})
}
```

---

## 📈 Optimizaciones Futuras

- [ ] A/B testing de subject lines
- [ ] Timing por timezone
- [ ] Dynamic personalization (company size, revenue)
- [ ] Predictive best time to send
- [ ] Sentiment analysis de respuestas
- [ ] Auto-categorize replies (interested/not/maybe)

---

## 💡 Principios Clave

1. **Menos es más** - 50-125 palabras máximo
2. **Personal > Professional** - Plain text, natural language
3. **Valor primero** - Lead con valor, no con pitch
4. **Uno CTA** - Una opción, no distracciones
5. **Persistencia comprobada** - 5 follow-ups necesarios
6. **Timing importa** - Horarios óptimos predefinidos

---

## 🎯 Próximos Pasos

1. Ejecuta: `node automation/scripts/run-campaign-email-only.js`
2. Espera 24-48 horas para respuestas
3. Follow-ups automáticos se envían en días 3, 7, 14, 21, 30
4. Responde a interesados y cierra deals

**Sistema listo. Vamos a generar leads de calidad.**
