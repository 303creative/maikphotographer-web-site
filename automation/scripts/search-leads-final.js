#!/usr/bin/env node

import dotenv from 'dotenv';
dotenv.config();

import Anthropic from '@anthropic-ai/sdk';
import { Client } from '@notionhq/client';
import { ApifyClient } from 'apify-client';
import { createTransport } from 'nodemailer';
import fs from 'fs';
import path from 'path';

const claude = new Anthropic();
const apifyClient = new ApifyClient({ token: process.env.APIFY_API_TOKEN });
const notion = new Client({ auth: process.env.NOTION_API_KEY, notionVersion: '2022-06-28' });

const LEADS_DB_ID = process.env.NOTION_LEADS_DB_ID;
const BUSINESS_EMAIL = '303creativemarketing@gmail.com';

const transporter = createTransport({
  service: 'gmail',
  auth: { user: BUSINESS_EMAIL, pass: process.env.GMAIL_APP_PASSWORD }
});

const leadsFile = path.join(process.cwd(), 'leads-today.json');

console.log('\n🔥 SEARCH LEADS - VERSIÓN FINAL\n');
console.log('═══════════════════════════════════════════\n');

async function scrapeInstagramHashtags() {
  const hashtags = ['miamiphotographer', 'miamimodel', 'wynwoodmiami', 'brickellmiami', 'miamiinfluencer', 'miamibeauty', 'miamiboutique'];
  console.log(`📸 Scrapeando Instagram (${hashtags.length} hashtags relevantes)...\n`);

  const globalUserMap = new Map();

  for (const hashtag of hashtags) {
    try {
      console.log(`🔍 #${hashtag}...`);

      const run = await apifyClient.actor('apify/instagram-hashtag-scraper').call({
        hashtags: [hashtag],
        resultsLimit: 15
      });

      const { items } = await apifyClient.dataset(run.defaultDatasetId).listItems();
      let hashtagUsers = 0;

      items.forEach(post => {
        if (post.ownerUsername && !globalUserMap.has(post.ownerUsername)) {
          globalUserMap.set(post.ownerUsername, {
            username: post.ownerUsername,
            name: post.ownerFullName || post.ownerUsername,
            bio: post.ownerBio || '',
            followers: post.ownerFollowers || 0,
            source: 'Instagram Hashtag',
            sourceUrl: `https://instagram.com/${post.ownerUsername}`,
            type: 'Creator/Model'
          });
          hashtagUsers++;
        }
      });

      console.log(`✅ ${hashtagUsers} usuarios nuevos (total: ${globalUserMap.size})\n`);
      await new Promise(r => setTimeout(r, 1000));
    } catch (error) {
      console.log(`⚠️  Error #${hashtag}: ${error.message}`);
    }
  }

  const allLeads = Array.from(globalUserMap.values());
  console.log(`📊 Total leads únicos: ${allLeads.length}\n`);
  return allLeads;
}

async function generateDM(lead) {
  try {
    const response = await claude.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 100,
      messages: [{
        role: 'user',
        content: `DM corto (1-2 líneas) para @${lead.username} en Instagram. Soy Maikel, fotógrafo editorial Miami. Devuelve SOLO el mensaje.`
      }]
    });

    return response.content[0].text.trim();
  } catch (error) {
    return `Hola ${lead.name.split(' ')[0]}! 👋 Me encanta tu trabajo en Instagram. Soy Maikel, fotógrafo editorial en Miami. ¿Te interesaría ver mi portfolio? 📸`;
  }
}

async function saveLeads(leads) {
  const processed = [];

  for (const lead of leads.slice(0, 10)) {
    try {
      const dm = await generateDM(lead);

      processed.push({
        ...lead,
        dm: dm,
        timestamp: new Date().toISOString(),
        status: 'Nuevo Lead',
        saved: false
      });

      // Intentar guardar en Notion
      try {
        if (LEADS_DB_ID) {
          await notion.pages.create({
            parent: { database_id: LEADS_DB_ID },
            properties: {
              Nombre: { title: [{ text: { content: lead.name } }] },
              Email: { email: lead.username + '@instagram.com' || null },
              Canal: { select: { name: 'Instagram' } },
              Notas: { rich_text: [{ text: { content: `DM: ${dm}` } }] }
            }
          });
          processed[processed.length - 1].saved = true;
          console.log(`✅ ${lead.name} → Notion`);
        }
      } catch (notionError) {
        console.log(`⚠️  ${lead.name} → JSON only (${notionError.message})`);
      }

      await new Promise(r => setTimeout(r, 500));
    } catch (error) {
      console.log(`❌ Error ${lead.name}: ${error.message}`);
    }
  }

  // Guardar JSON backup
  fs.writeFileSync(leadsFile, JSON.stringify(processed, null, 2));
  console.log(`\n💾 Guardados en JSON: ${leadsFile}`);

  return processed;
}

async function sendDailyEmail(leads) {
  const savedCount = leads.filter(l => l.saved).length;
  const totalCount = leads.length;

  const htmlBody = `
<h2>🔥 ${totalCount} LEADS REALES ENCONTRADOS</h2>
<p><strong>${new Date().toLocaleDateString('es-MX')}</strong></p>

<h3>📸 Top Leads:</h3>
<table border="1" cellpadding="10">
<tr style="background-color: #f0f0f0;">
  <th>Nombre</th>
  <th>Username</th>
  <th>DM Listo</th>
</tr>
${leads.map(l => `
<tr>
  <td><strong>${l.name}</strong></td>
  <td><a href="${l.sourceUrl}">@${l.username}</a></td>
  <td><code>${l.dm}</code></td>
</tr>
`).join('')}
</table>

<h3>Acción:</h3>
<ol>
  <li>Abre leads-today.json</li>
  <li>Copia el DM</li>
  <li>Envía en Instagram DM a cada usuario</li>
  <li>Marca como "Contactado"</li>
</ol>

<p style="color: #999; font-size: 12px;">Sistema THE303 | ${new Date().toLocaleString('es-MX')}</p>
  `;

  try {
    await transporter.sendMail({
      from: BUSINESS_EMAIL,
      to: BUSINESS_EMAIL,
      subject: `🔥 ${totalCount} leads REALES — ${new Date().toLocaleDateString()}`,
      html: htmlBody
    });
    console.log(`✅ Email enviado a ${BUSINESS_EMAIL}`);
  } catch (error) {
    console.log(`⚠️  Email fallido: ${error.message}`);
  }
}

async function main() {
  try {
    const instagramLeads = await scrapeInstagramHashtags();
    const processedLeads = await saveLeads(instagramLeads);

    await sendDailyEmail(processedLeads);

    console.log('\n═══════════════════════════════════════════');
    console.log(`✅ COMPLETADO: ${processedLeads.length} leads procesados\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ ERROR FATAL:', error.message);
    process.exit(1);
  }
}

main();
