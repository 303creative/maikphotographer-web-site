#!/usr/bin/env node

import dotenv from 'dotenv';
dotenv.config();

import { createTransport } from 'nodemailer';
import fs from 'fs';
import path from 'path';
import * as HTMLTemplates from '../email-templates/html-templates.js';

const emailTransporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.BUSINESS_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

const leadsFile = path.join(process.cwd(), 'business-leads-today.json');
const campaignHistoryFile = path.join(process.cwd(), 'campaign-history.json');

console.log('\n🎨 PROFESSIONAL HTML EMAIL CAMPAIGN\n');
console.log('═══════════════════════════════════════════\n');

// Load leads
function loadLeads() {
  if (!fs.existsSync(leadsFile)) {
    console.log('❌ No se encontró business-leads-today.json');
    console.log('Ejecuta primero: node search-leads-businesses.js\n');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(leadsFile, 'utf8'));
}

// Detect business type
function detectBusinessType(bio = '', source = '') {
  const bioLower = bio.toLowerCase();

  if (bioLower.includes('restaurant') || bioLower.includes('cafe') || bioLower.includes('food')) return 'restaurant';
  if (bioLower.includes('salon') || bioLower.includes('spa') || bioLower.includes('beauty')) return 'salon';
  if (bioLower.includes('bakery') || bioLower.includes('dulce') || bioLower.includes('pastry') || bioLower.includes('reposteria')) return 'bakery';
  if (bioLower.includes('boutique') || bioLower.includes('store') || bioLower.includes('shop')) return 'boutique';
  if (bioLower.includes('real estate') || bioLower.includes('property')) return 'real_estate';

  return 'restaurant'; // default
}

// Extract email
function extractEmail(business) {
  if (business.email && business.email.includes('@')) {
    return business.email;
  }

  if (business.website && business.website.includes('.')) {
    const domain = business.website
      .replace(/https?:\/\//i, '')
      .replace(/www\./i, '')
      .split('/')[0];
    return `contact@${domain}`;
  }

  return null;
}

// Send HTML email
async function sendHTMLEmail(business) {
  try {
    const email = extractEmail(business);

    if (!email) {
      console.log(`⚠️  ${business.name.padEnd(35)} → Sin email`);
      return { success: false, reason: 'no_email' };
    }

    const businessType = detectBusinessType(business.bio, business.source);
    const neighborhood = business.address?.split(',')[0] || 'Miami';

    // Get HTML template based on business type
    const htmlContent = HTMLTemplates.getHTMLEmailByType(businessType, business.name, neighborhood);

    // Get subject line based on type
    let subject = '';
    if (businessType === 'restaurant') {
      subject = `La comida de ${business.name} merece mejores fotos`;
    } else if (businessType === 'bakery') {
      subject = `Fotos profesionales para ${business.name}`;
    } else if (businessType === 'salon') {
      subject = `Fotos para el Instagram de ${business.name}`;
    } else if (businessType === 'boutique') {
      subject = `Idea para Instagram de ${business.name}`;
    } else {
      subject = `Fotos profesionales para ${business.name}`;
    }

    await emailTransporter.sendMail({
      from: `Maikel Marshall <${process.env.BUSINESS_EMAIL}>`,
      to: email,
      subject: subject,
      html: htmlContent,
      replyTo: process.env.BUSINESS_EMAIL,
      headers: {
        'X-Priority': '3'
      }
    });

    console.log(`✅ ${business.name.padEnd(35)} → ${email}`);
    return { success: true, email, businessType };
  } catch (error) {
    console.log(`❌ ${business.name.padEnd(35)} → ${error.message}`);
    return { success: false, error: error.message };
  }
}

// Process campaign
async function processCampaign(businesses) {
  const results = [];
  let sentCount = 0;
  let failCount = 0;

  console.log('Enviando emails HTML profesionales...\n');

  for (const business of businesses.slice(0, 20)) {
    const result = await sendHTMLEmail(business);

    results.push({
      name: business.name,
      email: result.email || 'N/A',
      source: business.source,
      businessType: result.businessType || 'unknown',
      status: result.success ? 'sent' : 'failed',
      timestamp: new Date().toISOString()
    });

    if (result.success) {
      sentCount++;
    } else {
      failCount++;
    }

    // Delay para no ser detectado como spam
    await new Promise(r => setTimeout(r, 2000));
  }

  return { results, stats: { sentCount, failCount } };
}

async function main() {
  try {
    const leads = loadLeads();
    console.log(`📊 Cargados ${leads.length} leads\n`);

    const { results, stats } = await processCampaign(leads);

    // Save report
    const reportFile = path.join(process.cwd(), 'html-email-campaign.json');
    fs.writeFileSync(reportFile, JSON.stringify({
      campaign: {
        timestamp: new Date().toISOString(),
        total_processed: results.length,
        emails_sent: stats.sentCount,
        emails_failed: stats.failCount,
        format: 'HTML Professional',
        success_rate: `${Math.round((stats.sentCount / results.length) * 100)}%`
      },
      details: results
    }, null, 2));

    console.log('\n═══════════════════════════════════════════');
    console.log(`\n✅ CAMPAÑA HTML COMPLETADA:\n`);
    console.log(`  🎨 Emails HTML enviados: ${stats.sentCount}`);
    console.log(`  ❌ Emails fallidos: ${stats.failCount}`);
    console.log(`  📊 Éxito: ${Math.round((stats.sentCount / results.length) * 100)}%`);
    console.log(`\n📁 Archivos generados:`);
    console.log(`  • html-email-campaign.json`);
    console.log(`\n✨ Cada email incluye:`);
    console.log(`  • Diseño profesional`);
    console.log(`  • Hero image`);
    console.log(`  • Portfolio de ejemplos`);
    console.log(`  • CTAs interactivos (WhatsApp, Web)`);
    console.log(`  • Estadísticas y datos`);
    console.log(`  • Paquetes de precios`);
    console.log(`  • Footer con links sociales`);
    console.log(`\n📧 Espera respuestas en 24-48 horas\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    process.exit(1);
  }
}

main();
