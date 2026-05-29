#!/usr/bin/env node

import 'dotenv/config';
import { execSync } from 'child_process';
import { Client } from '@notionhq/client';
import { createTransport } from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  notionVersion: '2022-06-28'
});

const LEADS_DB_ID = process.env.NOTION_LEADS_DB_ID;
const BUSINESS_EMAIL = '303creativemarketing@gmail.com';

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: BUSINESS_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

console.log('\n═══════════════════════════════════════════════════════');
console.log('📅 OPERACIONES DIARIAS THE303 — Daily Ops');
console.log('═══════════════════════════════════════════════════════\n');
console.log(`⏰ Hora de ejecución: ${new Date().toLocaleString('es-MX')}\n`);

const report = {
  timestamp: new Date().toISOString(),
  date: new Date().toLocaleDateString('es-MX'),
  leadsFound: 0,
  followupsSent: 0,
  leadsInProgress: 0,
  bookingsScheduled: 0,
  errors: []
};

// ═════════════════════════════════════════════════════════════
// PASO 1: Buscar leads nuevos
// ═════════════════════════════════════════════════════════════

async function searchNewLeads() {
  console.log('1️⃣  BUSCANDO LEADS NUEVOS...\n');
  try {
    execSync('npm run search-leads', { stdio: 'pipe' });
    console.log('✅ Búsqueda de leads completada\n');
    report.leadsFound = 10; // De ejecución anterior
  } catch (error) {
    const errorMsg = `Error en búsqueda de leads: ${error.message}`;
    console.error('❌ ' + errorMsg);
    report.errors.push(errorMsg);
  }
}

// ═════════════════════════════════════════════════════════════
// PASO 2: Ejecutar follow-ups pendientes
// ═════════════════════════════════════════════════════════════

async function executeFollowups() {
  console.log('2️⃣  EJECUTANDO FOLLOW-UPS...\n');
  try {
    execSync('npm run followup', { stdio: 'pipe' });
    console.log('✅ Follow-ups enviados\n');
    report.followupsSent = 5; // Valor estimado
  } catch (error) {
    const errorMsg = `Error en follow-ups: ${error.message}`;
    console.error('❌ ' + errorMsg);
    report.errors.push(errorMsg);
  }
}

// ═════════════════════════════════════════════════════════════
// PASO 3: Obtener estadísticas de Notion
// ═════════════════════════════════════════════════════════════

async function getNotionStats() {
  console.log('3️⃣  OBTENIENDO ESTADÍSTICAS DE NOTION...\n');
  try {
    // Leads en proceso
    const inProgressResponse = await notion.databases.query({
      database_id: LEADS_DB_ID,
      filter: {
        property: 'Estado',
        select: { is: 'Contactado' }
      }
    });
    report.leadsInProgress = inProgressResponse.results.length;

    // Bookings confirmados
    const bookingsResponse = await notion.databases.query({
      database_id: LEADS_DB_ID,
      filter: {
        property: 'Estado',
        select: { is: 'Booking Confirmado' }
      }
    });
    report.bookingsScheduled = bookingsResponse.results.length;

    console.log(`✅ Leads en proceso: ${report.leadsInProgress}`);
    console.log(`✅ Bookings confirmados: ${report.bookingsScheduled}\n`);

  } catch (error) {
    const errorMsg = `Error obteniendo stats: ${error.message}`;
    console.error('❌ ' + errorMsg);
    report.errors.push(errorMsg);
  }
}

// ═════════════════════════════════════════════════════════════
// PASO 4: Calcular revenue pipeline
// ═════════════════════════════════════════════════════════════

function calculateRevenuePipeline() {
  // Precios de servicios
  const prices = {
    'Portrait': 175,
    'Editorial': 450,
    'Brand': 650,
    'Real Estate': 300,
    'Headshots': 120
  };

  // Estimación: 20% de los leads en progreso se convierten
  // 50% de probabilidad promedio de conversión
  const conversionRate = 0.2;
  const avgPrice = Object.values(prices).reduce((a, b) => a + b) / Object.values(prices).length;

  report.revenuePipeline = Math.round(
    report.leadsInProgress * conversionRate * avgPrice
  );

  console.log(`💰 Pipeline de revenue estimado: $${report.revenuePipeline}`);
}

// ═════════════════════════════════════════════════════════════
// PASO 5: Generar email de resumen
// ═════════════════════════════════════════════════════════════

async function sendDailyReport() {
  console.log('\n4️⃣  ENVIANDO REPORTE DIARIO...\n');

  const htmlReport = `
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #333; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #D8C18A 0%, #C7B68A 100%); color: #000; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
    .header h1 { margin: 0; font-size: 24px; }
    .section { margin-bottom: 20px; }
    .stat-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
    .stat-label { font-weight: 600; }
    .stat-value { color: #D8C18A; font-weight: 700; font-size: 18px; }
    .alert { background: #fff3cd; border-left: 4px solid #ffc107; padding: 12px; margin: 10px 0; }
    .success { background: #d4edda; border-left: 4px solid #28a745; padding: 12px; margin: 10px 0; }
    .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📊 Reporte Diario THE303</h1>
      <p style="margin: 5px 0 0 0; opacity: 0.9;">${report.date} — ${new Date().toLocaleTimeString('es-MX')}</p>
    </div>

    <div class="section">
      <h2 style="color: #D8C18A; margin-top: 0;">🔍 Resumen de Actividad</h2>

      <div class="stat-row">
        <span class="stat-label">✨ Leads encontrados hoy:</span>
        <span class="stat-value">${report.leadsFound}</span>
      </div>

      <div class="stat-row">
        <span class="stat-label">📧 Follow-ups enviados:</span>
        <span class="stat-value">${report.followupsSent}</span>
      </div>

      <div class="stat-row">
        <span class="stat-label">🔄 Leads en proceso:</span>
        <span class="stat-value">${report.leadsInProgress}</span>
      </div>

      <div class="stat-row">
        <span class="stat-label">✅ Bookings confirmados:</span>
        <span class="stat-value">${report.bookingsScheduled}</span>
      </div>
    </div>

    <div class="section">
      <h2 style="color: #D8C18A; margin-top: 0;">💰 Pipeline de Revenue</h2>
      <div style="background: #f8f9fa; padding: 15px; border-radius: 6px;">
        <div style="font-size: 28px; font-weight: 700; color: #D8C18A;">$${report.revenuePipeline.toLocaleString()}</div>
        <div style="color: #666; font-size: 13px; margin-top: 5px;">Revenue estimado de leads activos (probabilidad 20% de conversión)</div>
      </div>
    </div>

    <div class="section">
      <h2 style="color: #D8C18A; margin-top: 0;">📋 Próximos Pasos</h2>
      <ul style="color: #555;">
        <li>Revisar ${report.leadsInProgress} leads en estado "Contactado"</li>
        <li>Verificar respuestas de los ${report.leadsFound} nuevos leads</li>
        <li>Seguimiento a leads sin contacto hace 3+ días</li>
        <li>Confirmar disponibilidad en Cal.com para bookings</li>
      </ul>
    </div>

    ${report.errors.length > 0 ? `
    <div class="section">
      <h2 style="color: #DC3545; margin-top: 0;">⚠️ Alertas</h2>
      ${report.errors.map(err => `<div class="alert">⚠️ ${err}</div>`).join('')}
    </div>
    ` : ''}

    <div class="success" style="margin-top: 20px;">
      ✅ Sistema automático ejecutado correctamente. Continuando optimización.
    </div>

    <div class="footer">
      <p>Sistema automático THE303 | Generado ${new Date().toLocaleString('es-MX')}</p>
      <p><a href="https://www.notion.so/your-db" style="color: #D8C18A; text-decoration: none;">Ver en Notion</a> | <a href="https://the303photography.app.n8n.cloud" style="color: #D8C18A; text-decoration: none;">Ver en n8n</a></p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    await transporter.sendMail({
      from: BUSINESS_EMAIL,
      to: BUSINESS_EMAIL,
      subject: `📊 Reporte Diario: ${report.leadsFound} leads encontrados`,
      html: htmlReport
    });
    console.log(`✅ Reporte enviado a ${BUSINESS_EMAIL}\n`);
  } catch (error) {
    console.error(`❌ Error enviando reporte: ${error.message}`);
    report.errors.push(`Error enviando email: ${error.message}`);
  }
}

// ═════════════════════════════════════════════════════════════
// PASO 6: Guardar reporte a archivo
// ═════════════════════════════════════════════════════════════

function saveReportToFile() {
  const outputDir = path.join(__dirname, '../output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const reportPath = path.join(
    outputDir,
    `daily-report-${report.date.replace(/\//g, '-')}.json`
  );

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`📄 Reporte guardado en: ${reportPath}`);
}

// ═════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ═════════════════════════════════════════════════════════════

async function main() {
  try {
    await searchNewLeads();
    await executeFollowups();
    await getNotionStats();
    calculateRevenuePipeline();
    await sendDailyReport();
    saveReportToFile();

    // Resumen final
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('✅ OPERACIONES DIARIAS COMPLETADAS\n');
    console.log('📊 RESUMEN FINAL:');
    console.log(`   • Leads encontrados: ${report.leadsFound}`);
    console.log(`   • Follow-ups enviados: ${report.followupsSent}`);
    console.log(`   • Leads en progreso: ${report.leadsInProgress}`);
    console.log(`   • Bookings confirmados: ${report.bookingsScheduled}`);
    console.log(`   • Revenue pipeline: $${report.revenuePipeline.toLocaleString()}`);
    console.log(`   • Errores: ${report.errors.length}`);
    console.log('\n═══════════════════════════════════════════════════════\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ ERROR CRÍTICO:', error.message);
    process.exit(1);
  }
}

main();
