#!/usr/bin/env node

import 'dotenv/config';
import { Client } from '@notionhq/client';
import { createTransport } from 'nodemailer';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  notionVersion: '2022-06-28'
});

const LEADS_DB_ID = process.env.NOTION_LEADS_DB_ID;
const CAL_USERNAME = process.env.CAL_USERNAME;

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: '303creativemarketing@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

// ═════════════════════════════════════════════════════════════
// TEMPLATES DE EMAILS - Bilingües
// ═════════════════════════════════════════════════════════════

const emailTemplates = {
  // FORMULARIO WEB - 2 horas
  webForm2h: {
    es: {
      subject: '¿Tienes preguntas sobre tu sesión de fotos? 📸',
      body: `Hola {{name}},

Recibí tu solicitud hace poco. Si tienes alguna pregunta sobre tu sesión de fotos, estoy aquí para ayudarte.

Puedo responder vía WhatsApp si lo prefieres: https://wa.me/17863329815

¡Hablamos pronto!
Maikel`
    },
    en: {
      subject: 'Quick questions about your photo session? 📸',
      body: `Hi {{name}},

I received your request earlier. If you have any questions about your photo session, I'm here to help.

I can respond via WhatsApp if you prefer: https://wa.me/17863329815

Talk soon!
Maikel`
    }
  },

  // FORMULARIO WEB - 24 horas
  webForm24h: {
    es: {
      subject: '¿Aún interesado en tu sesión de fotos? 📷',
      body: `Hola {{name}},

Veo que solicitaste una sesión de {{serviceType}}. Quería asegurarme de que estés realmente interesado antes de reservar tu fecha.

Agendar es fácil: https://cal.com/{{calUsername}}/30min

¿Tienes dudas? Cuéntame más sobre lo que necesitas.
Maikel`
    },
    en: {
      subject: 'Still interested in your photo session? 📷',
      body: `Hi {{name}},

I saw you requested a {{serviceType}} session. I wanted to make sure you're truly interested before booking your date.

Booking is easy: https://cal.com/{{calUsername}}/30min

Any questions? Tell me more about what you need.
Maikel`
    }
  },

  // FORMULARIO WEB - 72 horas (Portfolio)
  webForm72h: {
    es: {
      subject: 'Mira mi portafolio de {{serviceType}} 🎬',
      body: `Hola {{name}},

Como no respondiste aún, quería mostrarte mi trabajo en este tipo de sesiones:

📸 Portfolio: https://maikphotographer-web-site.vercel.app/portfolio
📱 Instagram: @maik_photographer

Vemos si es lo que buscas?
Maikel`
    },
    en: {
      subject: 'Check out my {{serviceType}} portfolio 🎬',
      body: `Hi {{name}},

Since I haven't heard from you yet, I wanted to show you my work in this type of session:

📸 Portfolio: https://maikphotographer-web-site.vercel.app/portfolio
📱 Instagram: @maik_photographer

Does it match what you're looking for?
Maikel`
    }
  },

  // FORMULARIO WEB - 7 días (Oferta)
  webForm7d: {
    es: {
      subject: '🎁 Oferta especial: -10% para ti',
      body: `Hola {{name}},

Para agradecerte el interés, te dejo 10% de descuento si agendas esta semana.

Aplica para cualquier servicio:
✨ Portrait: $135
📺 Editorial: $315
🏢 Brand: $450/mes

Agendar: https://cal.com/{{calUsername}}/30min
Código: MAIKEL10`
    },
    en: {
      subject: '🎁 Special offer: -10% for you',
      body: `Hi {{name}},

To thank you for your interest, I'm giving you 10% off if you book this week.

Applies to any service:
✨ Portrait: $135
📺 Editorial: $315
🏢 Brand: $450/month

Book: https://cal.com/{{calUsername}}/30min
Code: MAIKEL10`
    }
  },

  // FORMULARIO WEB - 14 días (Final)
  webForm14d: {
    es: {
      subject: 'Última oportunidad: ¿Sigues buscando fotógrafo? 🎬',
      body: `Hola {{name}},

Hace dos semanas que vimos tu interés pero parece que decidiste no seguir adelante.

Si cambias de opinión, sigo disponible. Solo contáctame en WhatsApp:
https://wa.me/17863329815

¡Puede ser para otra ocasión!
Maikel`
    },
    en: {
      subject: 'Last chance: Still looking for a photographer? 🎬',
      body: `Hi {{name}},

Two weeks ago we saw your interest but it seems you decided not to move forward.

If you change your mind, I'm still available. Just contact me on WhatsApp:
https://wa.me/17863329815

Maybe another time!
Maikel`
    }
  },

  // OUTREACH - Día 1
  outreach1d: {
    es: {
      subject: '{{messageType}} desde THE303 Photography 📸',
      body: `Hola {{name}},

{{customMessage}}

Puedo ofrecerte lo que necesitas. ¿Hablamos?
WhatsApp: https://wa.me/17863329815

Maikel`
    },
    en: {
      subject: '{{messageType}} from THE303 Photography 📸',
      body: `Hi {{name}},

{{customMessage}}

I can offer exactly what you need. Shall we talk?
WhatsApp: https://wa.me/17863329815

Maikel`
    }
  },

  // OUTREACH - Día 3
  outreach3d: {
    es: {
      subject: '¿Llegó mi mensaje anterior? 📞',
      body: `Hola {{name}},

Vi que no respondiste mi anterior mensaje. Entiendo que estés ocupado.

Solo quería confirmar que viste mi propuesta. Si te interesa, avísame.

Maikel`
    },
    en: {
      subject: 'Did you see my previous message? 📞',
      body: `Hi {{name}},

I noticed you didn't reply to my previous message. I understand you're busy.

Just wanted to confirm you saw my proposal. Let me know if you're interested.

Maikel`
    }
  },

  // OUTREACH - Día 7
  outreach7d: {
    es: {
      subject: 'Tip fotográfico 💡',
      body: `Hola {{name}},

Aunque no respondas, quería compartirte un tip útil:

"La mejor foto es la que te haces cuando dejas de pensar en la cámara"

Por eso mis clientes se sienten cómodos en sesión.

Si algún día necesitas fotos profesionales, yo estoy listo.

Maikel`
    },
    en: {
      subject: 'Photography tip 💡',
      body: `Hi {{name}},

Even if you haven't responded, I wanted to share a useful tip:

"The best photo is the one you take when you stop thinking about the camera"

That's why my clients feel comfortable in session.

If you ever need professional photos, I'm ready.

Maikel`
    }
  },

  // OUTREACH - Día 14
  outreach14d: {
    es: {
      subject: '⏰ Última oportunidad | Oferta limitada',
      body: `Hola {{name}},

Creo que no somos el fit perfecto, pero antes de desaparecer...

Tengo una oferta de {{serviceType}} por {{discountPrice}} válida solo esta semana.

¿Quizás?

Maikel`
    },
    en: {
      subject: '⏰ Last opportunity | Limited offer',
      body: `Hi {{name}},

I think we might not be a perfect fit, but before I disappear...

I have a special offer for {{serviceType}} at {{discountPrice}} valid only this week.

Maybe?

Maikel`
    }
  }
};

// ═════════════════════════════════════════════════════════════
// FUNCIÓN: Obtener leads que necesitan follow-up
// ═════════════════════════════════════════════════════════════

async function getLeadsForFollowup() {
  try {
    const response = await notion.databases.query({
      database_id: LEADS_DB_ID,
      filter: {
        and: [
          {
            property: 'Estado',
            select: {
              is_not: 'Convertido'
            }
          }
        ]
      }
    });

    return response.results;
  } catch (error) {
    console.error('Error fetching leads:', error.message);
    return [];
  }
}

// ═════════════════════════════════════════════════════════════
// FUNCIÓN: Calcular días desde creación
// ═════════════════════════════════════════════════════════════

function getDaysSinceCreation(createdAt) {
  const created = new Date(createdAt);
  const now = new Date();
  return Math.floor((now - created) / (1000 * 60 * 60 * 24));
}

// ═════════════════════════════════════════════════════════════
// FUNCIÓN: Determinar qué follow-up enviar
// ═════════════════════════════════════════════════════════════

function determineFollowupType(lead, daysSince) {
  const channel = lead.properties.Canal?.select?.name;
  const isWebForm = channel === 'Web Form';

  if (isWebForm) {
    if (daysSince === 0) return 'inmediato'; // Confirmación ya enviada
    if (daysSince === 0.08) return 'webForm2h'; // ~2 horas
    if (daysSince === 1) return 'webForm24h';
    if (daysSince === 3) return 'webForm72h';
    if (daysSince === 7) return 'webForm7d';
    if (daysSince === 14) return 'webForm14d';
  } else {
    // Outreach leads
    if (daysSince === 1) return 'outreach1d';
    if (daysSince === 3) return 'outreach3d';
    if (daysSince === 7) return 'outreach7d';
    if (daysSince === 14) return 'outreach14d';
  }

  return null;
}

// ═════════════════════════════════════════════════════════════
// FUNCIÓN: Enviar email de follow-up
// ═════════════════════════════════════════════════════════════

async function sendFollowupEmail(lead, templateType) {
  const name = lead.properties.Nombre?.title?.[0]?.text?.content || 'Lead';
  const email = lead.properties.Email?.email;
  const lang = lead.properties.Idioma?.select?.name || 'es';
  const serviceType = lead.properties['Tipo de Sesión']?.select?.name || 'Session';

  if (!email) {
    console.log(`⏭️  ${name} - Sin email, saltando`);
    return false;
  }

  const template = emailTemplates[templateType];
  if (!template) return false;

  const emailLang = template[lang] || template.en;
  let subject = emailLang.subject;
  let body = emailLang.body;

  // Reemplazar variables
  subject = subject.replace('{{serviceType}}', serviceType);
  body = body
    .replace('{{name}}', name)
    .replace('{{serviceType}}', serviceType)
    .replace('{{calUsername}}', CAL_USERNAME);

  try {
    await transporter.sendMail({
      from: '303creativemarketing@gmail.com',
      to: email,
      subject,
      text: body
    });

    console.log(`✅ Enviado a ${email} (${templateType})`);
    return true;
  } catch (error) {
    console.error(`❌ Error enviando a ${email}:`, error.message);
    return false;
  }
}

// ═════════════════════════════════════════════════════════════
// MAIN: PROCESAR FOLLOW-UPS
// ═════════════════════════════════════════════════════════════

async function main() {
  console.log('\n📧 SECUENCIA DE FOLLOW-UP\n');
  console.log('═══════════════════════════════════════════\n');

  const leads = await getLeadsForFollowup();
  let sent = 0;

  console.log(`Total de leads activos: ${leads.length}\n`);

  for (const lead of leads) {
    const name = lead.properties.Nombre?.title?.[0]?.text?.content || 'Unknown';
    const createdAt = lead.properties['Fecha Creacion']?.created_time || new Date().toISOString();
    const daysSince = getDaysSinceCreation(createdAt);

    const followupType = determineFollowupType(lead, daysSince);

    if (followupType) {
      console.log(`⏳ ${name} (${daysSince}d)`);
      const success = await sendFollowupEmail(lead, followupType);
      if (success) sent++;
    }
  }

  console.log(`\n═══════════════════════════════════════════`);
  console.log(`✅ Follow-ups enviados: ${sent}/${leads.length}`);
  console.log(`═══════════════════════════════════════════\n`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
