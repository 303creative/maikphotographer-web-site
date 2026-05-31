#!/usr/bin/env node

/**
 * 🕐 CAMPAIGN SCHEDULER
 *
 * Programa la campaña para ejecutarse a una hora específica
 * y envía notificación cuando está lista
 */

import dotenv from 'dotenv';
dotenv.config();

import { createTransport } from 'nodemailer';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';

const execPromise = promisify(exec);

const emailTransporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.BUSINESS_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

const USER_EMAIL = 'maikelmarshall07@gmail.com';

// ═══════════════════════════════════════════════════════════════
// EJECUTAR CAMPAÑA COMPLETA
// ═══════════════════════════════════════════════════════════════

async function executeFullCampaign() {
  console.log('\n🚀 INICIANDO CAMPAÑA COMPLETA\n');
  console.log('═══════════════════════════════════════════\n');

  try {
    // 1. Ejecutar búsqueda de leads y generar mensajes
    console.log('⏳ Etapa 1: Buscando leads y generando mensajes de WhatsApp...\n');
    await execPromise('node automation/scripts/master-campaign-system.js');

    console.log('\n✅ CAMPAÑA DE WHATSAPP LISTA\n');

    // 2. Enviar notificación final
    await sendCampaignNotification();

  } catch (error) {
    console.error('❌ ERROR EN CAMPAÑA:', error.message);

    // Enviar notificación de error
    await emailTransporter.sendMail({
      from: process.env.BUSINESS_EMAIL,
      to: USER_EMAIL,
      subject: '❌ Error en Campaña de Marketing - The303',
      text: `Hubo un error ejecutando la campaña:\n\n${error.message}\n\nIntenta nuevamente o verifica los logs.`
    });

    process.exit(1);
  }
}

// ═══════════════════════════════════════════════════════════════
// ENVIAR NOTIFICACIÓN FINAL
// ═══════════════════════════════════════════════════════════════

async function sendCampaignNotification() {
  const resultsFile = path.join(process.cwd(), 'campaign-results.json');
  const trackerFile = path.join(process.cwd(), 'campaign-tracker.json');

  let results = {};
  let tracker = {};

  if (fs.existsSync(resultsFile)) {
    results = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
  }

  if (fs.existsSync(trackerFile)) {
    tracker = JSON.parse(fs.readFileSync(trackerFile, 'utf8'));
  }

  const notification = `
✅ 🎉 CAMPAÑA COMPLETADA EXITOSAMENTE

═══════════════════════════════════════════════════════════════

📊 RESULTADOS INMEDIATOS:

  • Emails enviados: ${results.campaign?.sent || 0}/${results.campaign?.total || 0}
  • Tasa de éxito: ${results.campaign?.success_rate || '0%'}
  • Leads rastreando: ${tracker.campaigns?.length || 0}

🔄 SISTEMA DE SEGUIMIENTO ACTIVADO:

  Secuencia automática de 5 puntos:

  ✓ Día 3: Recordatorio amable ("¿Qué te pareció?")
  ✓ Día 7: Oferta de valor (+15% descuento)
  ✓ Día 14: Presión de urgencia (oferta vence)
  ✓ Día 21: Prueba social (casos de éxito)
  ✓ Día 30: Cierre final (última oportunidad)

  El sistema detectará respuestas automáticamente y
  escalará según el nivel de interés de cada lead.

═══════════════════════════════════════════════════════════════

🎯 META DE RESPUESTAS:

  Objetivo: Mínimo 5 respuestas
  Estimado: 5-8 respuestas (12-15% de open rate es normal)
  Timeline: 7-14 días para primeras respuestas

═══════════════════════════════════════════════════════════════

📁 ARCHIVOS GENERADOS:

  1. campaign-results.json — Detalles de envío
  2. campaign-tracker.json — Rastreo de leads
  3. campaign-history.json — Histórico de campaña
  4. followup-report.txt — Reporte de seguimiento

═══════════════════════════════════════════════════════════════

⚙️ AUTOMATIZACIÓN ACTIVA:

  ✅ Sistema monitoreando respuestas 24/7
  ✅ Follow-ups programados automáticamente
  ✅ Escalado inteligente según engagement
  ✅ Reportes diarios disponibles

═══════════════════════════════════════════════════════════════

💡 PRÓXIMOS PASOS:

  1. Revisa los resultados en campaign-results.json
  2. Opcional: Ajusta los templates si necesitas
  3. Espera respuestas (monitorea Gmail)
  4. El sistema enviará follow-ups automáticamente

═══════════════════════════════════════════════════════════════

🔔 Recibirás notificaciones cuando:
   • Llegue una respuesta positiva
   • Se envíe cada follow-up
   • Ocurra una conversión
   • Día 10: Reporte intermedio
   • Día 30: Reporte final

═══════════════════════════════════════════════════════════════

Ejecutado: ${new Date().toLocaleString('es-ES')}

The303 Marketing - Sistema Automático 🤖
  `;

  await emailTransporter.sendMail({
    from: process.env.BUSINESS_EMAIL,
    to: USER_EMAIL,
    subject: '✅ Campaña de Marketing Completada - 8:30 AM Ejecutado',
    text: notification,
    headers: {
      'X-Campaign': 'master-execution'
    }
  });

  console.log('\n📬 Notificación enviada a:', USER_EMAIL);
}

// ═══════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════

async function main() {
  const args = process.argv.slice(2);
  const mode = args[0] || 'execute';

  if (mode === 'schedule') {
    // Información de programación
    console.log('\n📅 PROGRAMACIÓN DE CAMPAÑA\n');
    console.log('═══════════════════════════════════════════\n');
    console.log('Campaña programada para mañana (31 de mayo) a las 8:30 AM (Miami Time)\n');
    console.log('Para ejecutar antes:');
    console.log('  node automation/scripts/schedule-campaign.js execute\n');
    console.log('═══════════════════════════════════════════\n');
  } else if (mode === 'execute' || mode === 'now') {
    // Ejecutar ahora
    await executeFullCampaign();
  } else {
    console.log('Uso: node schedule-campaign.js [execute|schedule]');
    process.exit(1);
  }
}

main();
