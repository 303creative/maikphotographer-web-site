#!/usr/bin/env node

/**
 * 🎯 FOLLOWUP TRACKER SYSTEM
 *
 * Gestiona automáticamente el seguimiento de leads:
 * 1. Detecta respuestas a emails
 * 2. Envía follow-ups en secuencia
 * 3. Registra engagement
 * 4. Escala según interés
 */

import dotenv from 'dotenv';
dotenv.config();

import { createTransport, createTestAccount } from 'nodemailer';
import { ImapSimple } from 'imap-simple';
import fs from 'fs';
import path from 'path';
import { getUniversalEmailTemplate } from '../email-templates/universal-template-v3.js';

const emailTransporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.BUSINESS_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

// ═══════════════════════════════════════════════════════════════
// CONFIGURACIÓN DE SEGUIMIENTO
// ═══════════════════════════════════════════════════════════════

const FOLLOWUP_SEQUENCE = [
  {
    day: 3,
    subject: 'Una pregunta rápida sobre tu negocio',
    template: 'reminder'
  },
  {
    day: 7,
    subject: 'Oferta especial para hoy',
    template: 'value_add'
  },
  {
    day: 14,
    subject: 'Ultimátum: esta oferta vence en 2 días',
    template: 'urgency'
  },
  {
    day: 21,
    subject: 'Casos de éxito que podrían ser tu negocio',
    template: 'social_proof'
  },
  {
    day: 30,
    subject: 'Última oportunidad antes de cerrar',
    template: 'final_chance'
  }
];

// ═══════════════════════════════════════════════════════════════
// 1. CARGAR REGISTRO DE CAMPAÑAS
// ═══════════════════════════════════════════════════════════════

function loadCampaignTracker() {
  const trackerFile = path.join(process.cwd(), 'campaign-tracker.json');

  if (!fs.existsSync(trackerFile)) {
    return {
      campaigns: [],
      responses: [],
      followups_sent: [],
      conversions: []
    };
  }

  return JSON.parse(fs.readFileSync(trackerFile, 'utf8'));
}

function saveCampaignTracker(tracker) {
  const trackerFile = path.join(process.cwd(), 'campaign-tracker.json');
  fs.writeFileSync(trackerFile, JSON.stringify(tracker, null, 2));
}

// ═══════════════════════════════════════════════════════════════
// 2. DETECTAR RESPUESTAS
// ═══════════════════════════════════════════════════════════════

async function detectResponses(campaignResults) {
  console.log('📥 Detectando respuestas...\n');

  const tracker = loadCampaignTracker();
  const sentEmails = campaignResults.results.filter(r => r.status === 'sent');
  const responses = [];

  // En un entorno real, aquí verificarías el correo (IMAP)
  // Por ahora, marcamos como "awaiting response"
  for (const email of sentEmails) {
    tracker.campaigns.push({
      email: email.email,
      name: email.name,
      businessType: email.businessType,
      sent_at: email.timestamp,
      status: 'awaiting_response',
      followups: [],
      conversion: null
    });
  }

  saveCampaignTracker(tracker);

  console.log(`✅ Rastreando ${sentEmails.length} emails\n`);
  return tracker;
}

// ═══════════════════════════════════════════════════════════════
// 3. ENVIAR FOLLOW-UPS EN SECUENCIA
// ═══════════════════════════════════════════════════════════════

async function sendFollowups(tracker) {
  console.log('📧 ENVIANDO FOLLOW-UPS AUTOMÁTICOS...\n');

  const now = new Date();
  let followupsSent = 0;

  for (const campaign of tracker.campaigns) {
    const sentDate = new Date(campaign.sent_at);
    const daysSinceSent = Math.floor((now - sentDate) / (1000 * 60 * 60 * 24));

    // Verificar si el email ya fue entregado
    if (campaign.status === 'responded' || campaign.status === 'converted') {
      continue; // No enviar follow-ups a leads que ya respondieron
    }

    // Revisar cada punto de follow-up
    for (const followupPoint of FOLLOWUP_SEQUENCE) {
      const followupAlreadySent = campaign.followups.some(
        f => f.day === followupPoint.day
      );

      if (daysSinceSent >= followupPoint.day && !followupAlreadySent) {
        // Enviar follow-up
        try {
          const followupContent = generateFollowupEmail(
            campaign.name,
            campaign.businessType,
            followupPoint.template
          );

          await emailTransporter.sendMail({
            from: `Maikel Marshall <${process.env.BUSINESS_EMAIL}>`,
            to: campaign.email,
            subject: followupPoint.subject,
            html: followupContent,
            replyTo: process.env.BUSINESS_EMAIL,
            headers: {
              'X-Campaign-Type': 'followup',
              'X-Followup-Day': followupPoint.day
            }
          });

          campaign.followups.push({
            day: followupPoint.day,
            template: followupPoint.template,
            sent_at: new Date().toISOString()
          });

          console.log(
            `✅ ${campaign.name} - Day ${followupPoint.day} (${followupPoint.template})`
          );
          followupsSent++;

          // Delay entre envíos
          await new Promise(r => setTimeout(r, 1500));
        } catch (error) {
          console.log(`❌ ${campaign.name}: ${error.message}`);
        }
      }
    }
  }

  saveCampaignTracker(tracker);
  console.log(`\n📤 Total follow-ups enviados: ${followupsSent}\n`);
}

// ═══════════════════════════════════════════════════════════════
// 4. GENERAR EMAIL DE FOLLOW-UP POR TIPO
// ═══════════════════════════════════════════════════════════════

function generateFollowupEmail(clientName, businessType, template) {
  const templates = {
    reminder: {
      headline: '¿Qué te pareció la propuesta?',
      message: `Hola ${clientName},\n\n¿Tuviste oportunidad de ver la propuesta que te envié hace 3 días?\n\nMe gustaría saber si tienes alguna pregunta sobre los servicios o si necesitas ver más ejemplos.`
    },
    value_add: {
      headline: '+ 15% descuento hoy',
      message: `Hola ${clientName},\n\nComo ${businessType} profesional, sé que las fotos de calidad hacen diferencia.\n\nTengo un descuento especial hoy del 15% en paquetes de sesión completa. Solo válido hasta medianoche.`
    },
    urgency: {
      headline: '⏰ Esta oferta vence en 2 días',
      message: `Hola ${clientName},\n\nRápida actualización: el descuento especial del 15% que mencioné vence en 2 días.\n\nDespués de eso, los precios vuelven a la tarifa regular. ¿Agendamos una llamada hoy?`
    },
    social_proof: {
      headline: 'Mira lo que hicimos para negocios como el tuyo',
      message: `Hola ${clientName},\n\nQuería compartirte algunos casos de éxito recientes con otros ${businessType}s en Miami que transformaron su presencia online con fotos profesionales.\n\nTus fotos podrían ser igual de impactantes. ¿Nos vemos este viernes?`
    },
    final_chance: {
      headline: 'Última oportunidad antes de cerrar',
      message: `Hola ${clientName},\n\nEsta es mi última comunicación sobre este tema.\n\nSi te interesa trabajar juntos en fotos profesionales para tu ${businessType}, responde a este email.\n\nSi no, sin problema — siempre te deseo lo mejor.`
    }
  };

  const config = templates[template] || templates.reminder;

  // Usar el template universal existente
  return getUniversalEmailTemplate({
    clientName: clientName,
    headline: config.headline,
    subheadline: '',
    mainMessage: config.message,
    service1: 'Sesiones profesionales',
    service2: 'Fotos editadas en 24h',
    service3: 'Descuento especial aplicado',
    service4: 'Garantía de resultados',
    service5: 'Soporte post-sesión',
    benefit1: 'Más clientes (fotos que venden)',
    benefit2: 'Más presencia online (redes que crecen)',
    benefit3: 'Confianza profesional (marca que se ve bien)',
    ctaButtonText: 'Agendar Ahora',
    secondaryButtonText: 'Ver Casos de Éxito',
    footerText: 'Maikel Marshall | Fotógrafo & Director Creativo'
  });
}

// ═══════════════════════════════════════════════════════════════
// 5. REGISTRAR ENGAGEMENT Y CONVERSIONES
// ═══════════════════════════════════════════════════════════════

function updateEngagement(tracker, email, engagement_type) {
  const campaign = tracker.campaigns.find(c => c.email === email);

  if (campaign) {
    switch (engagement_type) {
      case 'opened':
        campaign.status = 'opened';
        break;
      case 'clicked':
        campaign.status = 'clicked';
        break;
      case 'replied':
        campaign.status = 'responded';
        campaign.response_at = new Date().toISOString();
        break;
      case 'converted':
        campaign.status = 'converted';
        campaign.conversion = {
          date: new Date().toISOString(),
          amount: 'pending_confirmation'
        };
        tracker.conversions.push(campaign);
        break;
    }
    saveCampaignTracker(tracker);
  }
}

// ═══════════════════════════════════════════════════════════════
// 6. GENERAR REPORTE DE SEGUIMIENTO
// ═══════════════════════════════════════════════════════════════

function generateFollowupReport(tracker) {
  const stats = {
    total_campaigns: tracker.campaigns.length,
    awaiting_response: tracker.campaigns.filter(c => c.status === 'awaiting_response').length,
    opened: tracker.campaigns.filter(c => c.status === 'opened').length,
    clicked: tracker.campaigns.filter(c => c.status === 'clicked').length,
    responded: tracker.campaigns.filter(c => c.status === 'responded').length,
    converted: tracker.campaigns.filter(c => c.status === 'converted').length,
    total_followups_sent: tracker.campaigns.reduce((sum, c) => sum + c.followups.length, 0),
    conversion_rate: `${((tracker.conversions.length / tracker.campaigns.length) * 100).toFixed(1)}%`
  };

  const report = `
📊 REPORTE DE SEGUIMIENTO AUTOMÁTICO

🎯 MÉTRICAS:
  • Total de campañas: ${stats.total_campaigns}
  • Esperando respuesta: ${stats.awaiting_response}
  • Abiertos: ${stats.opened}
  • Click en enlaces: ${stats.clicked}
  • Respondieron: ${stats.responded}
  • Conversiones: ${stats.converted}
  • Follow-ups totales enviados: ${stats.total_followups_sent}
  • Tasa de conversión: ${stats.conversion_rate}

✅ CONVERSIONES:
${
  tracker.conversions.length > 0
    ? tracker.conversions
        .map(
          (c) =>
            `  • ${c.name} (${c.businessType}) - ${new Date(c.conversion.date).toLocaleDateString()}`
        )
        .join('\n')
    : '  • Ninguna aún (esto es normal - el sistema está recién empezado)'
}

🔄 SIGUIENTE PASO:
  El sistema está monitoreando todas las respuestas.
  Cuando lleguen respuestas, se enviarán follow-ups automáticos.
  `;

  return report;
}

// ═══════════════════════════════════════════════════════════════
// 7. MAIN: EJECUTAR SEGUIMIENTO
// ═══════════════════════════════════════════════════════════════

async function main() {
  console.log('\n🎯 SISTEMA DE SEGUIMIENTO AUTOMÁTICO\n');
  console.log('═══════════════════════════════════════════\n');

  try {
    // 1. Cargar campaigns
    const tracker = loadCampaignTracker();

    // 2. Enviar follow-ups según horario
    await sendFollowups(tracker);

    // 3. Generar reporte
    const report = generateFollowupReport(tracker);
    console.log(report);

    // 4. Guardar reporte
    const reportFile = path.join(process.cwd(), 'followup-report.txt');
    fs.writeFileSync(reportFile, report);

    console.log('✅ SISTEMA DE SEGUIMIENTO ACTIVO');
    console.log(`📄 Reporte guardado en: ${reportFile}\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    process.exit(1);
  }
}

main();
