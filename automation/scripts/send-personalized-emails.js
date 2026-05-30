#!/usr/bin/env node

import dotenv from 'dotenv';
dotenv.config();

import { createTransport } from 'nodemailer';
import fs from 'fs';
import path from 'path';
import * as SalesScripts from '../email-templates/sales-scripts.js';

const emailTransporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.BUSINESS_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

const leadsFile = path.join(process.cwd(), 'business-leads-today.json');
const campaignHistoryFile = path.join(process.cwd(), 'campaign-history.json');

console.log('\n🎯 PERSONALIZED EMAIL CAMPAIGN\n');
console.log('═══════════════════════════════════════════\n');

// Load leads from JSON
function loadLeads() {
  if (!fs.existsSync(leadsFile)) {
    console.log('❌ No se encontró business-leads-today.json');
    console.log('Ejecuta primero: node search-leads-businesses.js\n');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(leadsFile, 'utf8'));
}

// Load campaign history (para follow-ups)
function loadCampaignHistory() {
  if (!fs.existsSync(campaignHistoryFile)) {
    return { campaigns: [] };
  }
  return JSON.parse(fs.readFileSync(campaignHistoryFile, 'utf8'));
}

// Detectar idioma basado en bio
function detectLanguage(bio = '') {
  const spanishWords = ['español', 'miami', 'café', 'restaurante', 'tienda', 'salón'];
  const hasSpanish = spanishWords.some(word => bio.toLowerCase().includes(word));
  return hasSpanish ? 'ES' : 'EN';
}

// Detectar tipo de negocio
function detectBusinessType(bio = '', source = '') {
  const bioLower = bio.toLowerCase();

  if (bioLower.includes('restaurant') || bioLower.includes('cafe') || bioLower.includes('food') || bioLower.includes('eats')) {
    return 'restaurant';
  }
  if (bioLower.includes('salon') || bioLower.includes('spa') || bioLower.includes('beauty') || bioLower.includes('hair')) {
    return 'salon';
  }
  if (bioLower.includes('boutique') || bioLower.includes('store') || bioLower.includes('shop') || bioLower.includes('clothing')) {
    return 'boutique';
  }
  if (bioLower.includes('real estate') || bioLower.includes('property') || bioLower.includes('agent')) {
    return 'real_estate';
  }
  if (bioLower.includes('fitness') || bioLower.includes('gym') || bioLower.includes('studio') || bioLower.includes('trainer')) {
    return 'fitness';
  }
  if (bioLower.includes('doctor') || bioLower.includes('medical') || bioLower.includes('clinic') || bioLower.includes('dental')) {
    return 'medical';
  }
  if (source === 'Instagram' && !bioLower.includes('business')) {
    return 'instagram_creator';
  }

  return 'general';
}

// Get personalized script
function getPersonalizedScript(business) {
  const lang = detectLanguage(business.bio);
  const type = detectBusinessType(business.bio, business.source);

  const scripts = SalesScripts.getScriptByCategory(type, lang);

  // Get first email based on type
  let script;

  if (type === 'instagram_creator' || type === 'instagram_model') {
    script = lang === 'ES'
      ? scripts.emailFirstTouchES(business.name)
      : scripts.emailFirstTouchEN(business.name);
  } else if (type === 'restaurant') {
    const neighborhood = business.address?.split(',')[0] || 'Miami';
    script = lang === 'ES'
      ? scripts.emailFirstTouchES(business.name, neighborhood)
      : scripts.emailFirstTouchEN(business.name, neighborhood);
  } else if (type === 'salon') {
    script = lang === 'ES'
      ? scripts.emailFirstTouchES(business.name)
      : scripts.emailFirstTouchEN(business.name);
  } else if (type === 'boutique') {
    const neighborhood = business.address?.split(',')[0] || 'Miami';
    script = lang === 'ES'
      ? scripts.emailFirstTouchES(business.name, neighborhood)
      : scripts.emailFirstTouchEN(business.name, neighborhood);
  } else if (type === 'real_estate') {
    script = lang === 'ES'
      ? scripts.emailFirstTouchES(business.name)
      : scripts.emailFirstTouchEN(business.name);
  } else if (type === 'fitness') {
    script = lang === 'ES'
      ? scripts.emailFirstTouchES(business.name)
      : scripts.emailFirstTouchEN(business.name);
  } else if (type === 'medical') {
    const doctorName = business.name?.split(' ')[0] || 'there';
    script = lang === 'ES'
      ? scripts.emailFirstTouchES(doctorName, business.name)
      : scripts.emailFirstTouchEN(doctorName, business.name);
  } else {
    script = lang === 'ES'
      ? scripts.emailFirstTouchES(business.name)
      : scripts.emailFirstTouchEN(business.name);
  }

  return {
    script,
    language: lang,
    businessType: type
  };
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

// Generate HTML email (pretty but will send as plain text alternative)
function generatePlainTextEmail(script) {
  return `${script.subject}\n\n---\n\n${script.body}`;
}

// Send email
async function sendPersonalizedEmail(business, script) {
  try {
    const email = extractEmail(business);

    if (!email) {
      console.log(`⚠️  ${business.name.padEnd(35)} → Sin email`);
      return { success: false, reason: 'no_email' };
    }

    // Plain text format (better for cold email)
    const plainText = generatePlainTextEmail(script.script);

    await emailTransporter.sendMail({
      from: `Maikel Marshall <${process.env.BUSINESS_EMAIL}>`,
      to: email,
      subject: script.script.subject,
      text: plainText, // Plain text is key for cold email
      replyTo: process.env.BUSINESS_EMAIL,
      headers: {
        'X-Priority': '3',
        'List-Unsubscribe': `<mailto:${process.env.BUSINESS_EMAIL}?subject=unsubscribe>`
      }
    });

    console.log(`✅ ${business.name.padEnd(35)} → ${email}`);
    return { success: true, email, script: script.script };
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

  console.log('Enviando emails personalizados...\n');

  for (const business of businesses.slice(0, 20)) {
    const { script, language, businessType } = getPersonalizedScript(business);
    const result = await sendPersonalizedEmail(business, { script, language, businessType });

    results.push({
      name: business.name,
      email: result.email || 'N/A',
      source: business.source,
      businessType: businessType || 'unknown',
      language: language || 'EN',
      status: result.success ? 'sent' : 'failed',
      reason: result.reason || result.error || null,
      timestamp: new Date().toISOString(),
      followUpSchedule: result.success ? {
        day3: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        day7: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        day14: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        day21: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
        day30: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      } : null
    });

    if (result.success) {
      sentCount++;
    } else {
      failCount++;
    }

    // 1.5 seconds delay between emails
    await new Promise(r => setTimeout(r, 1500));
  }

  return { results, stats: { sentCount, failCount } };
}

async function main() {
  try {
    const leads = loadLeads();
    console.log(`📊 Cargados ${leads.length} leads\n`);

    const { results, stats } = await processCampaign(leads);

    // Guardar reporte
    const reportFile = path.join(process.cwd(), 'personalized-email-campaign.json');
    fs.writeFileSync(reportFile, JSON.stringify({
      campaign: {
        timestamp: new Date().toISOString(),
        total_processed: results.length,
        emails_sent: stats.sentCount,
        emails_failed: stats.failCount,
        success_rate: `${Math.round((stats.sentCount / results.length) * 100)}%`
      },
      details: results
    }, null, 2));

    // Guardar historia para follow-ups
    const history = loadCampaignHistory();
    history.campaigns.push({
      timestamp: new Date().toISOString(),
      total_sent: stats.sentCount,
      leads: results.filter(r => r.status === 'sent')
    });
    fs.writeFileSync(campaignHistoryFile, JSON.stringify(history, null, 2));

    console.log('\n═══════════════════════════════════════════');
    console.log(`\n✅ CAMPAÑA PERSONALIZADA COMPLETADA:\n`);
    console.log(`  ✉️  Emails enviados: ${stats.sentCount}`);
    console.log(`  ❌ Emails fallidos: ${stats.failCount}`);
    console.log(`  📊 Éxito: ${Math.round((stats.sentCount / results.length) * 100)}%`);
    console.log(`\n📁 Archivos generados:`);
    console.log(`  • personalized-email-campaign.json`);
    console.log(`  • campaign-history.json`);
    console.log(`\n⏳ Follow-ups automáticos programados para:`);
    console.log(`  • Día 3, 7, 14, 21, 30`);
    console.log(`\n📧 Espera respuestas en 24-48 horas\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    process.exit(1);
  }
}

main();
