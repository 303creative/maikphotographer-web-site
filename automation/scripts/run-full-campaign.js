#!/usr/bin/env node

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('\n🎯 CAMPAÑA COMPLETA: BÚSQUEDA + ENVÍO AUTOMÁTICO\n');
console.log('═══════════════════════════════════════════════════\n');

const scripts = [
  {
    name: '📸 Búsqueda de Negocios',
    script: 'search-leads-businesses.js',
    description: 'Scrapeando Instagram + Google Maps...'
  },
  {
    name: '🚀 Envío Automático (WhatsApp + Email)',
    script: 'send-hybrid-outreach.js',
    description: 'Enviando mensajes personalizados...'
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
        reject(new Error(`Script ${scriptFile} failed with code ${code}`));
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
      console.log(`${step.description}`);
      console.log(`${'─'.repeat(50)}\n`);

      await runScript(step.script);

      console.log(`\n✅ ${step.name} completado\n`);
    }

    // Generar reporte final
    console.log(`\n${'═'.repeat(50)}`);
    console.log('📊 CAMPAÑA COMPLETADA');
    console.log(`${'═'.repeat(50)}\n`);

    const leadsFile = path.join(process.cwd(), 'business-leads-today.json');
    const resultsFile = path.join(process.cwd(), 'outreach-results.json');

    if (fs.existsSync(leadsFile)) {
      const leads = JSON.parse(fs.readFileSync(leadsFile, 'utf8'));
      console.log(`📍 Total negocios encontrados: ${leads.length}`);
    }

    if (fs.existsSync(resultsFile)) {
      const results = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
      console.log(`✉️  WhatsApp enviados: ${results.whatsapp_sent}`);
      console.log(`📧 Emails enviados: ${results.email_sent}`);
      console.log(`✍️  Envíos manuales pendientes: ${results.manual_required}`);
    }

    console.log(`\n📁 Archivos generados:`);
    console.log(`  • business-leads-today.json`);
    console.log(`  • outreach-results.json`);
    console.log(`\n✅ LISTO para seguimiento manual en Instagram\n`);

    process.exit(0);
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    process.exit(1);
  }
}

runCampaign();
