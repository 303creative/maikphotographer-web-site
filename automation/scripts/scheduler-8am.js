#!/usr/bin/env node

import 'dotenv/config';
import cron from 'node-cron';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('\n🕐 SCHEDULER - Sistema de leads automático\n');
console.log('═══════════════════════════════════════════');
console.log('⏰ Configurado para ejecutar: 8:00 AM Miami Time (EST)\n');

// Ejecutar cada día a las 8AM Miami Time (EST = UTC-5, CDT = UTC-5)
// Expresión cron: "0 8 * * *" = 8:00 AM cada día
const cronExpression = '0 8 * * *';

cron.schedule(cronExpression, () => {
  const now = new Date();
  console.log(`\n🚀 [${now.toLocaleString('es-MX')}] Iniciando búsqueda de leads...\n`);

  // Ejecutar search-leads-production.js
  const searchLeads = spawn('node', [path.join(__dirname, 'search-leads-production.js')]);

  searchLeads.stdout.on('data', (data) => {
    process.stdout.write(data);
  });

  searchLeads.stderr.on('data', (data) => {
    process.stderr.write(data);
  });

  searchLeads.on('close', (code) => {
    if (code === 0) {
      console.log('\n✅ Búsqueda completada exitosamente');
    } else {
      console.log(`\n❌ Error al ejecutar búsqueda (código: ${code})`);
    }
  });
}, {
  scheduled: true,
  timezone: 'America/New_York' // Miami timezone
});

console.log('✅ Scheduler iniciado');
console.log('📝 El sistema ejecutará automáticamente a las 8:00 AM Miami Time\n');
console.log('Para detener, presiona Ctrl+C\n');

// Mantener el script corriendo
process.on('SIGINT', () => {
  console.log('\n\n🛑 Scheduler detenido');
  process.exit(0);
});
