import { Client } from '@notionhq/client';
import { Resend } from 'resend';
import cron from 'node-cron';
import dotenv from 'dotenv';

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const resend = new Resend(process.env.RESEND_API_KEY);

const followupTemplates = {
  24h: {
    es: {
      subject: 'Sobre tu sesión de fotografía — Maikel Marshall',
      text: 'Hola! ¿Cómo estás? Solo quería confirmar que recibí tu solicitud y vamos a hacer una sesión increíble. 📸'
    },
    en: {
      subject: 'About your photography session — Maikel Marshall',
      text: 'Hey! Just wanted to follow up on your booking request. Let\'s create something amazing together. 📸'
    }
  },
  72h: {
    es: {
      subject: 'Cliente Destacado: Lee lo que dicen mis clientes — Maikel Marshall',
      text: 'Hola! Aquí te muestro qué dicen mis clientes sobre trabajar conmigo. ⭐ Espero poder contar tu historia también.'
    },
    en: {
      subject: 'Client Stories: What my clients say — Maikel Marshall',
      text: 'Hi! Check out what my recent clients say about their sessions. ⭐ Let\'s create your story too.'
    }
  },
  7d: {
    es: {
      subject: '⚡ OFERTA ESPECIAL: 10% OFF en tu primera sesión',
      text: '¡Hola! Te dejo esta oferta especial solo para ti: 10% descuento si confirmas tu sesión antes del domingo. 🎉'
    },
    en: {
      subject: '⚡ SPECIAL OFFER: 10% OFF your first session',
      text: 'Hey! Here\'s a special offer just for you: 10% discount if you confirm your session this week. 🎉'
    }
  },
  30d: {
    es: {
      subject: '¿Cambió de opinión? Estoy aquí para ayudarte — Maikel',
      text: 'No pressure, pero extraño tu sesión. 😊 ¿Hay algo que pueda hacer diferente? Hablemos.'
    },
    en: {
      subject: 'Changed your mind? I\'m here to help — Maikel',
      text: 'No pressure, but I\'d love to work with you! 😊 Is there anything else I can help with?'
    }
  }
};

async function getLeadsNeedingFollowup() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_LEADS_DB_ID,
      filter: {
        and: [
          {
            property: 'Seguimiento',
            checkbox: { equals: false }
          },
          {
            property: 'Estado',
            select: {
              does_not_equal: 'Completado'
            }
          }
        ]
      }
    });

    return response.results;
  } catch (error) {
    console.error('Error querying Notion:', error.message);
    return [];
  }
}

function calculateDaysSinceCreation(pageCreatedTime) {
  const created = new Date(pageCreatedTime);
  const now = new Date();
  return Math.floor((now - created) / (1000 * 60 * 60 * 24));
}

async function sendFollowupEmail(lead, template) {
  try {
    const email = lead.properties.Email.email;
    const name = lead.properties.Nombre.title[0]?.plain_text || 'Cliente';
    const lang = lead.properties.Idioma.select?.name === 'Español' ? 'es' : 'en';

    const emailTemplate = followupTemplates[template][lang];

    const html = `
      <div style="font-family: 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 40px;">
        <h1 style="font-size: 28px; font-weight: 300; letter-spacing: 4px; text-transform: uppercase; border-bottom: 1px solid #333; padding-bottom: 20px;">MAIKEL MARSHALL</h1>
        <p style="font-size: 16px; color: #ccc; margin: 30px 0;">${emailTemplate.text}</p>
        <div style="background: #111; border-left: 3px solid #fff; padding: 20px; margin: 30px 0;">
          <a href="https://wa.me/17863329815" style="color: #fff; text-decoration: none;">
            💬 ${lang === 'es' ? 'Escríbeme en WhatsApp' : 'Message me on WhatsApp'} →
          </a>
        </div>
        <p style="color: #555; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin-top: 40px;">MAIKEL MARSHALL · MIAMI, FL · @maik_photographer</p>
      </div>
    `;

    await resend.emails.send({
      from: 'Maikel Marshall <maikel@maikphotographer.com>',
      to: email,
      subject: emailTemplate.subject,
      html
    });

    return true;
  } catch (error) {
    console.error('Error sending email:', error.message);
    return false;
  }
}

async function updateLeadFollowupStatus(pageId) {
  try {
    await notion.pages.update({
      page_id: pageId,
      properties: {
        'Seguimiento': { checkbox: true }
      }
    });
    return true;
  } catch (error) {
    console.error('Error updating Notion:', error.message);
    return false;
  }
}

async function runFollowupRoutine() {
  console.log(`⏰ [${new Date().toLocaleTimeString()}] Running follow-up scheduler...\n`);

  if (!process.env.NOTION_API_KEY || !process.env.NOTION_LEADS_DB_ID) {
    console.error('❌ Missing Notion configuration');
    return;
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('❌ Missing Resend API key');
    return;
  }

  const leads = await getLeadsNeedingFollowup();

  if (leads.length === 0) {
    console.log('No leads requiring follow-up at this time.\n');
    return;
  }

  for (const lead of leads) {
    const daysSince = calculateDaysSinceCreation(lead.created_time);
    let template = null;

    if (daysSince >= 1 && daysSince < 3) {
      template = '24h';
    } else if (daysSince >= 3 && daysSince < 7) {
      template = '72h';
    } else if (daysSince >= 7 && daysSince < 30) {
      template = '7d';
    } else if (daysSince >= 30) {
      template = '30d';
    }

    if (template) {
      const name = lead.properties.Nombre.title[0]?.plain_text || 'Lead';
      console.log(`📧 Sending ${template} follow-up to: ${name} (${daysSince} days)`);

      const sent = await sendFollowupEmail(lead, template);

      if (sent) {
        const updated = await updateLeadFollowupStatus(lead.id);
        if (updated) {
          console.log(`   ✅ Email sent & Notion updated\n`);
        }
      } else {
        console.log(`   ❌ Failed to send email\n`);
      }
    }
  }

  console.log('✅ Follow-up routine completed\n');
}

// Run every hour
cron.schedule('0 * * * *', () => {
  runFollowupRoutine();
});

console.log('🚀 Follow-up Scheduler started (runs every hour)');
console.log('Press Ctrl+C to stop\n');

// Run immediately on start
runFollowupRoutine();
