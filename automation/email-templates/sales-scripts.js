/**
 * 🚀 SALES SCRIPTS SYSTEM FOR MAIKEL MARSHALL PHOTOGRAPHY
 *
 * Based on proven cold email strategies 2026:
 * - 50-125 words max
 * - Subject lines: 7 words max
 * - ONE call to action only
 * - Plain text converts better than HTML
 * - Personalization increases conversion 6x
 * - 5+ follow-ups needed for 80% of sales
 */

// ═══════════════════════════════════════════════════════════════
// CATEGORÍA 1: INSTAGRAM CREATORS & MODELS
// ═══════════════════════════════════════════════════════════════

export const InstagramCreatorScripts = {
  // DM 1 - Initial Contact (Ultra Short)
  dmInitialES: (name) => `Hola ${name} 👋

Me encanta tu feed.

Soy fotógrafo editorial en Miami. ¿Te interesa colaborar?`,

  dmInitialEN: (name) => `Hey ${name} 👋

Love your content.

Miami-based editorial photographer here.
Open to collaborating?`,

  // Email 1 - First Touch (Español)
  emailFirstTouchES: (name) => ({
    subject: `Tu trabajo en Miami 📸`,
    body: `Hola ${name},

Vi tu contenido en Instagram y me llamó la atención.

Trabajo con creators en Miami creando fotos editoriales que elevan su marca personal.

¿Tienes 5 minutos para ver si puedo ayudarte?

— Maikel
📱 www.maikphotographer.com`,
    wordCount: 42
  }),

  // Email 1 - First Touch (English)
  emailFirstTouchEN: (name) => ({
    subject: `Your Miami content 📸`,
    body: `Hey ${name},

Came across your work on Instagram — really like your aesthetic.

I work with Miami creators on editorial photography that takes their brand to the next level.

Worth a quick chat?

— Maikel
📱 www.maikphotographer.com`,
    wordCount: 45
  }),

  // Follow-up 1 (Day 3) - Checking in
  followUp1ES: (name) => ({
    subject: `¿Viste mi mensaje anterior?`,
    body: `Hola ${name},

Solo quería asegurarme que te llegó mi mensaje anterior.

¿Tienes 5 minutos esta semana? Tengo un proyecto que creo que te encantaría.

— Maikel`,
    wordCount: 35
  }),

  followUp1EN: (name) => ({
    subject: `Just checking in`,
    body: `Hey ${name},

Just making sure my last message got through.

Got 5 min this week? Have something I think you'd love.

— Maikel`,
    wordCount: 30
  }),

  // Follow-up 2 (Day 7) - Add Value
  followUp2ES: (name) => ({
    subject: `Algo que podría ayudarte`,
    body: `Hola ${name},

Te comparto un proyecto reciente que le ayudó a otro creator en tu área:

[VER PORTFOLIO]

¿Algo así te sería útil?

— Maikel`,
    wordCount: 28
  }),

  followUp2EN: (name) => ({
    subject: `Something that might help`,
    body: `Hey ${name},

Sharing a recent project that helped another creator in your space:

[VIEW PORTFOLIO]

Think something like this could work for you?

— Maikel`,
    wordCount: 28
  }),

  // Follow-up 3 (Day 14) - Limited Offer
  followUp3ES: (name) => ({
    subject: `2 espacios disponibles este mes`,
    body: `Hola ${name},

Tengo 2 espacios disponibles este mes para sesiones editoriales.

Primera respuesta gana 20% de descuento.

¿Te interesa uno?

— Maikel`,
    wordCount: 30
  }),

  followUp3EN: (name) => ({
    subject: `2 spots open this month`,
    body: `Hey ${name},

I have 2 editorial spots available this month.

Early response gets 20% off.

Interested?

— Maikel`,
    wordCount: 25
  }),

  // Follow-up 4 (Day 21) - Different Angle
  followUp4ES: (name) => ({
    subject: `¿Conoces a alguien que pueda necesitar fotos?`,
    body: `Hola ${name},

Entiendo que tal vez no es el momento para ti.

¿Conoces a otro creator en Miami que estuviese interesado en fotos profesionales?

Si lo refieres, te doy 25% off para ti.

— Maikel`,
    wordCount: 44
  }),

  followUp4EN: (name) => ({
    subject: `Know someone who might need photos?`,
    body: `Hey ${name},

Totally understand if timing isn't right for you.

Know another creator in Miami who might need professional photos?

Refer them and you get 25% off yourself.

— Maikel`,
    wordCount: 38
  }),

  // Follow-up 5 (Day 30) - Final Attempt
  followUp5ES: (name) => ({
    subject: `Último mensaje de mi parte`,
    body: `Hola ${name},

Este es mi último mensaje. Si en algún momento necesitas fotos profesionales, aquí ando.

Suerte con tu contenido 🎥

— Maikel`,
    wordCount: 30
  }),

  followUp5EN: (name) => ({
    subject: `Last one from me`,
    body: `Hey ${name},

This is my last message. If you ever need professional photos, you know where to find me.

Rooting for your content 🎥

— Maikel`,
    wordCount: 30
  })
};

// ═══════════════════════════════════════════════════════════════
// CATEGORÍA 2: RESTAURANTS & FOOD BUSINESSES
// ═══════════════════════════════════════════════════════════════

export const RestaurantScripts = {
  emailFirstTouchES: (restaurantName, neighborhood) => ({
    subject: `La comida de ${restaurantName} merece mejores fotos`,
    body: `Hola,

Encontré ${restaurantName} en Google Maps — me encanta lo que hacen en ${neighborhood}.

Lo único: su comida merece fotos mejores que las que tienen.

Ayudo a restaurantes en Miami a atraer más clientes con fotografía profesional.

¿Interesado en una llamada de 15 minutos?

— Maikel
📱 +1 (786) 332-9815`,
    wordCount: 62
  }),

  emailFirstTouchEN: (restaurantName, neighborhood) => ({
    subject: `Quick question about ${restaurantName}`,
    body: `Hi there,

Found ${restaurantName} on Google Maps — love what you're doing in ${neighborhood}.

One thing I noticed: your food deserves better photos.

I help Miami restaurants attract more customers through professional photography.

Worth a 15-min call this week?

Maikel Marshall
Miami Food Photographer
📱 +1 (786) 332-9815`,
    wordCount: 60
  }),

  followUp1ES: (restaurantName) => ({
    subject: `Fotos que aumentan ventas`,
    body: `Hola,

Restaurantes con fotos profesionales en Google Maps reciben 30% más reservas.

¿Hablamos esta semana?

— Maikel`,
    wordCount: 22
  }),

  followUp1EN: (restaurantName) => ({
    subject: `Photos that increase sales`,
    body: `Hi,

Restaurants with professional photos on Google get 30% more reservations.

Can we talk this week?

— Maikel`,
    wordCount: 20
  }),

  followUp2ES: (restaurantName) => ({
    subject: `3 restaurantes en Wynwood que crecieron`,
    body: `Hola,

Aquí están 3 restaurantes en Wynwood que aumentaron reservas después de mis fotos:

[VER CASOS]

¿Te gustaría algo similar?

— Maikel`,
    wordCount: 31
  }),

  followUp2EN: (restaurantName) => ({
    subject: `3 Wynwood restaurants that grew`,
    body: `Hi,

Here are 3 restaurants in Wynwood that increased bookings after my photos:

[VIEW CASES]

Want something similar?

— Maikel`,
    wordCount: 28
  })
};

// ═══════════════════════════════════════════════════════════════
// CATEGORÍA 3: BOUTIQUES & RETAIL STORES
// ═══════════════════════════════════════════════════════════════

export const BoutiqueScripts = {
  emailFirstTouchES: (storeName, neighborhood) => ({
    subject: `Idea para Instagram de ${storeName}`,
    body: `Hola,

Encontré ${storeName} en Google Maps — hermosa tienda.

Noté que tu Instagram podría brillar mucho más con fotos profesionales de tus productos.

Especializo en ayudar a boutiques en Miami a crear contenido que vende.

¿Te envío algunos ejemplos?

— Maikel`,
    wordCount: 58
  }),

  emailFirstTouchEN: (storeName, neighborhood) => ({
    subject: `Idea for ${storeName}'s Instagram`,
    body: `Hi,

Came across ${storeName} while exploring ${neighborhood} — beautiful store.

I noticed your Instagram could really shine with professional brand photography.

I specialize in helping Miami boutiques create content that drives sales.

Can I send you a few examples?

Maikel Marshall
📱 www.maikphotographer.com`,
    wordCount: 56
  })
};

// ═══════════════════════════════════════════════════════════════
// CATEGORÍA 4: BEAUTY & SALONS
// ═══════════════════════════════════════════════════════════════

export const BeautyScripts = {
  emailFirstTouchES: (salonName, neighborhood) => ({
    subject: `Fotos para el Instagram de ${salonName}`,
    body: `Hola,

Vi ${salonName} en Google Maps — se ve increíble.

La mayoría de salones en Miami pierden clientes por fotos de mala calidad.

Ayudo a salones como el tuyo con fotos que venden.

¿Hablamos 10 minutos?

— Maikel`,
    wordCount: 48
  }),

  emailFirstTouchEN: (salonName, neighborhood) => ({
    subject: `Professional photos for ${salonName}`,
    body: `Hi,

Found ${salonName} on Google — love the vibe.

Most salons in Miami lose clients because of low-quality photos.

I help salons like yours with photos that sell.

Got 10 minutes to chat?

Maikel`,
    wordCount: 46
  })
};

// ═══════════════════════════════════════════════════════════════
// CATEGORÍA 5: REAL ESTATE AGENTS
// ═══════════════════════════════════════════════════════════════

export const RealEstateScripts = {
  emailFirstTouchES: (agentName) => ({
    subject: `Vende 32% más rápido con mejores fotos`,
    body: `Hola ${agentName},

Dato: Las propiedades con fotos profesionales se venden 32% más rápido y 3-11% más caro.

Eso es dinero en tu bolsillo.

¿Hablamos?

— Maikel
Fotógrafo de Bienes Raíces Miami`,
    wordCount: 46
  }),

  emailFirstTouchEN: (agentName) => ({
    subject: `Sell 32% faster with better photos`,
    body: `Hi ${agentName},

Fact: Properties with professional photos sell 32% faster and 3-11% higher.

That's money in your pocket.

Worth a quick chat?

Maikel
Miami Real Estate Photographer`,
    wordCount: 44
  })
};

// ═══════════════════════════════════════════════════════════════
// CATEGORÍA 6: FITNESS & GYMS
// ═══════════════════════════════════════════════════════════════

export const FitnessScripts = {
  emailFirstTouchES: (gymName) => ({
    subject: `Idea para el contenido de ${gymName}`,
    body: `Hola,

${gymName} tiene una comunidad increíble — se ve en tus redes.

Ayudo a estudios de fitness en Miami a atraer nuevos miembros con contenido visual.

Una sesión = 30+ contenidos para tus canales.

¿Interesado?

— Maikel`,
    wordCount: 47
  }),

  emailFirstTouchEN: (gymName) => ({
    subject: `Content idea for ${gymName}`,
    body: `Hi,

${gymName} has an amazing community — I can tell from your socials.

I help Miami fitness studios attract new members with visual content.

One shoot = 30+ pieces of content for your channels.

Interested?

Maikel`,
    wordCount: 45
  })
};

// ═══════════════════════════════════════════════════════════════
// CATEGORÍA 7: MEDICAL & PROFESSIONAL SERVICES
// ═══════════════════════════════════════════════════════════════

export const MedicalScripts = {
  emailFirstTouchES: (doctorName, practiceName) => ({
    subject: `Fotos profesionales para ${practiceName}`,
    body: `Estimado Dr. ${doctorName},

Las primeras impresiones importan — especialmente en línea.

Ayudo a prácticas médicas en Miami a construir confianza con pacientes mediante fotos profesionales.

¿Estaría abierto a una conversación?

— Maikel
Fotógrafo Profesional Miami`,
    wordCount: 50
  }),

  emailFirstTouchEN: (doctorName, practiceName) => ({
    subject: `Professional photos for ${practiceName}`,
    body: `Hi Dr. ${doctorName},

First impressions matter — especially online.

I help Miami medical practices build trust with patients through professional photography.

Would you be open to a quick conversation?

Maikel Marshall
📱 www.maikphotographer.com`,
    wordCount: 46
  })
};

// ═══════════════════════════════════════════════════════════════
// CATEGORÍA 8: LINKEDIN HEADSHOTS
// ═══════════════════════════════════════════════════════════════

export const LinkedInScripts = {
  connectionMessageES: (name) => `Hola ${name},

Fellow Miami professional here.

Te ayudo con headshots que abren puertas.

Sesiones desde $120.

— Maikel`,

  connectionMessageEN: (name) => `Hey ${name},

Fellow Miami professional here.

I help with headshots that open doors.

Sessions from $120.

— Maikel`,

  emailFirstTouchES: (name) => ({
    subject: `Tu foto de LinkedIn te está costando oportunidades`,
    body: `Hola ${name},

¿Sabías? Los profesionales con headshots profesionales reciben 14x más vistas.

Sesiones de 30 minutos, misma entrega.

¿Interesado?

— Maikel`,
    wordCount: 30
  }),

  emailFirstTouchEN: (name) => ({
    subject: `Your LinkedIn photo is costing you opportunities`,
    body: `Hi ${name},

Did you know? Professionals with headshots get 14x more views.

30-minute sessions, same-day delivery available.

Interested?

— Maikel`,
    wordCount: 28
  })
};

// ═══════════════════════════════════════════════════════════════
// UNIVERSAL FOLLOW-UP SEQUENCES
// ═══════════════════════════════════════════════════════════════

export const UniversalFollowUps = {
  // Day 3 - Simple check-in
  day3ES: (name, leadType) => ({
    subject: `¿Llegó mi mensaje?`,
    body: `Hola ${name},

Solo checando si recibiste mi mensaje anterior.

¿Tienes 5 minutos esta semana?

— Maikel`,
    wordCount: 22
  }),

  day3EN: (name, leadType) => ({
    subject: `Just checking in`,
    body: `Hey ${name},

Just making sure you got my last message.

Got 5 minutes this week?

— Maikel`,
    wordCount: 20
  }),

  // Day 7 - Add value (portfolio/testimonial)
  day7ES: (name) => ({
    subject: `Algo que te podría ayudar`,
    body: `Hola ${name},

Te comparto un proyecto reciente similar a lo que necesitas:

[VER PORTFOLIO]

¿Te sirve?

— Maikel`,
    wordCount: 28
  }),

  day7EN: (name) => ({
    subject: `Something that might help`,
    body: `Hey ${name},

Sharing a recent project similar to what you need:

[VIEW PORTFOLIO]

Think this could work for you?

— Maikel`,
    wordCount: 28
  }),

  // Day 14 - Limited time offer
  day14ES: (name) => ({
    subject: `10% descuento esta semana`,
    body: `Hola ${name},

Tengo disponibilidad limitada esta semana.

Los que respondan hoy reciben 10% de descuento.

¿Te interesa?

— Maikel`,
    wordCount: 28
  }),

  day14EN: (name) => ({
    subject: `10% off this week`,
    body: `Hey ${name},

I have limited availability this week.

Anyone who responds today gets 10% off.

Interested?

— Maikel`,
    wordCount: 26
  }),

  // Day 21 - Referral angle
  day21ES: (name) => ({
    subject: `¿Conoces a alguien que necesite fotos?`,
    body: `Hola ${name},

Si alguien en tu círculo necesita fotos profesionales, refierelos.

Tú ganas 25% off en tu próxima sesión.

— Maikel`,
    wordCount: 28
  }),

  day21EN: (name) => ({
    subject: `Know someone who needs photos?`,
    body: `Hey ${name},

If anyone in your circle needs professional photos, refer them.

You get 25% off your next session.

— Maikel`,
    wordCount: 26
  }),

  // Day 30 - Final attempt
  day30ES: (name) => ({
    subject: `Último mensaje`,
    body: `Hola ${name},

Último mensaje de mi parte. Cuando necesites fotos, aquí estoy.

¡Suerte!

— Maikel`,
    wordCount: 20
  }),

  day30EN: (name) => ({
    subject: `Last one from me`,
    body: `Hey ${name},

Last message from me. When you need photos, you know where to find me.

All the best!

— Maikel`,
    wordCount: 24
  })
};

// ═══════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

export function getScriptByCategory(businessType, language = 'ES', followUpDay = 0) {
  const isSpanish = language === 'ES';

  const categoryMap = {
    'instagram_creator': InstagramCreatorScripts,
    'instagram_model': InstagramCreatorScripts,
    'restaurant': RestaurantScripts,
    'cafe': RestaurantScripts,
    'food_business': RestaurantScripts,
    'boutique': BoutiqueScripts,
    'clothing_store': BoutiqueScripts,
    'salon': BeautyScripts,
    'spa': BeautyScripts,
    'beauty': BeautyScripts,
    'real_estate': RealEstateScripts,
    'fitness': FitnessScripts,
    'gym': FitnessScripts,
    'studio': FitnessScripts,
    'medical': MedicalScripts,
    'dental': MedicalScripts,
    'professional': LinkedInScripts
  };

  return categoryMap[businessType?.toLowerCase()] || InstagramCreatorScripts;
}

export function getFollowUpScript(followUpDay, language = 'ES') {
  const dayKey = `day${followUpDay}${language}`;
  return UniversalFollowUps[dayKey];
}

export function formatEmail(script) {
  return {
    subject: script.subject || '',
    body: script.body || '',
    wordCount: script.wordCount || 0,
    isPlainText: true // Cold emails work better as plain text
  };
}

export default {
  InstagramCreatorScripts,
  RestaurantScripts,
  BoutiqueScripts,
  BeautyScripts,
  RealEstateScripts,
  FitnessScripts,
  MedicalScripts,
  LinkedInScripts,
  UniversalFollowUps,
  getScriptByCategory,
  getFollowUpScript,
  formatEmail
};
