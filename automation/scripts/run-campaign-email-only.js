#!/usr/bin/env node

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('\n🎯 CAMPAÑA PROFESIONAL POR EMAIL\n');
console.log('═══════════════════════════════════════════════════\n');

const scripts = [
  {
    name: '1️⃣  BÚSQUEDA: Negocios en Miami',
    script: 'search-leads-businesses.js'
  },
  {
    name: '2️⃣  ENVÍO: Emails PERSONALIZADOS',
    script: 'send-personalized-emails.js'
  },
  {
    name: '3️⃣  FOLLOW-UPS: Automáticos (Día 3, 7, 14, 21, 30)',
    script: 'send-followups.js'
  }
];

async function runScript(scriptFile) {
  return new Promise((resolve, reject) => {
    const child = spawn('node', [path.join(process.cwd(), 'automation', 'scripts', scriptFile)], {
      stdio: 'inherit',
      shell: true
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Script falló con código ${code}`));
      }
    });

    child.on('error', reject);
  });
}

async function runCampaign() {
  try {
    for (const step of scripts) {
      console.log(`\n${'─'.repeat(50)}`);
      console.log(`${step.name}`);
      console.log(`${'─'.repeat(50)}\n`);

      await runScript(step.script);

      console.log(`\n✅ Completado\n`);
    }

    console.log(`\n${'═'.repeat(50)}`);
    console.log('📊 CAMPAÑA FINALIZADA');
    console.log(`${'═'.repeat(50)}\n`);

    const leadsFile = path.join(process.cwd(), 'business-leads-today.json');
    const resultsFile = path.join(process.cwd(), 'email-campaign-results.json');

    if (fs.existsSync(leadsFile)) {
      const leads = JSON.parse(fs.readFileSync(leadsFile, 'utf8'));
      console.log(`📍 Negocios encontrados: ${leads.length}`);
    }

    if (fs.existsSync(resultsFile)) {
      const results = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
      console.log(`✅ Emails enviados: ${results.emails_sent}`);
      console.log(`❌ Emails fallidos: ${results.emails_failed}`);
    }

    console.log(`\n📁 Archivos generados:`);
    console.log(`  • business-leads-today.json`);
    console.log(`  • email-campaign-results.json`);

    console.log(`\n⏳ Próximos pasos:`);
    console.log(`  1. Espera 24-48 horas para respuestas`);
    console.log(`  2. Revisa tu email: ${process.env.BUSINESS_EMAIL}`);
    console.log(`  3. Responde a leads interesados`);
    console.log(`  4. ¡A cerrar deals! 💰\n`);

    process.exit(0);
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    process.exit(1);
  }
}

runCampaign();
