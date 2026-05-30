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

const campaignHistoryFile = path.join(process.cwd(), 'campaign-history.json');

console.log('\n📧 FOLLOW-UP AUTOMATION\n');
console.log('═══════════════════════════════════════════\n');

// Load campaign history
function loadCampaignHistory() {
  if (!fs.existsSync(campaignHistoryFile)) {
    console.log('❌ No campaign history found');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(campaignHistoryFile, 'utf8'));
}

// Determine which follow-up day
function getFollowUpDay(sentDate) {
  const now = new Date();
  const sent = new Date(sentDate);
  const daysElapsed = Math.floor((now - sent) / (1000 * 60 * 60 * 24));

  if (daysElapsed >= 3 && daysElapsed < 7) return 3;
  if (daysElapsed >= 7 && daysElapsed < 14) return 7;
  if (daysElapsed >= 14 && daysElapsed < 21) return 14;
  if (daysElapsed >= 21 && daysElapsed < 30) return 21;
  if (daysElapsed >= 30) return 30;

  return null;
}

// Generate follow-up email
function getFollowUpEmail(lead, followUpDay, language) {
  const followUpScript = SalesScripts.getFollowUpScript(followUpDay, language);

  if (!followUpScript) {
    return null;
  }

  return followUpScript(lead.name);
}

// Send follow-up email
async function sendFollowUp(lead, followUpDay, followUpEmail) {
  try {
    const plainText = `${followUpEmail.subject}\n\n---\n\n${followUpEmail.body}`;

    await emailTransporter.sendMail({
      from: `Maikel Marshall <${process.env.BUSINESS_EMAIL}>`,
      to: lead.email,
      subject: followUpEmail.subject,
      text: plainText,
      replyTo: process.env.BUSINESS_EMAIL,
      headers: {
        'X-Priority': '3',
        'List-Unsubscribe': `<mailto:${process.env.BUSINESS_EMAIL}?subject=unsubscribe>`
      }
    });

    console.log(`✅ Day ${followUpDay} → ${lead.name.padEnd(30)} → ${lead.email}`);
    return { success: true };
  } catch (error) {
    console.log(`❌ Day ${followUpDay} → ${lead.name.padEnd(30)} → Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

// Process follow-ups
async function processFollowUps() {
  const history = loadCampaignHistory();
  const latestCampaign = history.campaigns[history.campaigns.length - 1];

  if (!latestCampaign || !latestCampaign.leads) {
    console.log('❌ No leads found in campaign history');
    process.exit(1);
  }

  const results = [];
  let sentCount = 0;

  console.log(`📊 Procesando ${latestCampaign.leads.length} leads para follow-ups...\n`);

  for (const lead of latestCampaign.leads) {
    const followUpDay = getFollowUpDay(latestCampaign.timestamp);

    if (!followUpDay) {
      continue; // Not time for follow-up yet
    }

    // Check if already sent follow-up for this day
    const alreadySent = results.some(
      r => r.leadName === lead.name && r.followUpDay === followUpDay
    );

    if (alreadySent) {
      continue;
    }

    const followUpEmail = getFollowUpEmail(lead, followUpDay, lead.language || 'EN');

    if (!followUpEmail) {
      continue;
    }

    const result = await sendFollowUp(lead, followUpDay, followUpEmail);

    results.push({
      leadName: lead.name,
      email: lead.email,
      followUpDay,
      status: result.success ? 'sent' : 'failed',
      timestamp: new Date().toISOString()
    });

    if (result.success) {
      sentCount++;
    }

    await new Promise(r => setTimeout(r, 1000));
  }

  return { results, stats: { sentCount } };
}

async function main() {
  try {
    const { results, stats } = await processFollowUps();

    if (results.length === 0) {
      console.log('\n⏳ No follow-ups scheduled for today yet.\n');
      console.log('Follow-ups will be sent automatically on these days:');
      console.log('  • Day 3: First check-in');
      console.log('  • Day 7: Add value (portfolio)');
      console.log('  • Day 14: Limited offer');
      console.log('  • Day 21: Referral angle');
      console.log('  • Day 30: Final attempt\n');
      process.exit(0);
    }

    console.log('\n═══════════════════════════════════════════');
    console.log(`\n✅ FOLLOW-UPS ENVIADOS:\n`);
    console.log(`  📧 Total: ${stats.sentCount}`);
    console.log(`\n📁 Resultado guardado en campaign-history.json\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    process.exit(1);
  }
}

main();
