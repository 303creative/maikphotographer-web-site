const fs = require('fs');
const path = require('path');

const PROJECT = path.resolve(__dirname, '..');

console.log('\n🔍 QA Check — maikphotographer.com\n');
const checks = [];

// Verificar index.html
const indexPath = path.join(PROJECT, 'public', 'index.html');
if (fs.existsSync(indexPath)) {
  const html = fs.readFileSync(indexPath, 'utf8');
  [
    ['Video hero tag', /<video/i.test(html)],
    ['GSAP cargado', /gsap/i.test(html)],
    ['Lenis cargado', /lenis/i.test(html)],
    ['Bebas Neue font', /bebas.neue/i.test(html)],
    ['Badge disponible', /badge.dot|AVAILABLE/i.test(html)],
    ['Portfolio fotos', /39_portafolio/i.test(html)],
    ['Formulario', /<form/i.test(html)],
    ['Cal.com embed', /cal\.com/i.test(html)],
    ['API lead-capture', /lead.capture/i.test(html)],
    ['OG URL correcto', /maikphotographer\.com/i.test(html)],
    ['Grain texture', /grain/i.test(html)],
    ['Light leak', /light.leak/i.test(html)],
    ['Scroll video', /scroll.cam|scroll-cam/i.test(html)],
    ['WhatsApp link', /wa\.me\/17863329815/i.test(html)],
  ].forEach(([name, pass]) => checks.push({ name, pass }));
} else {
  console.log('❌ index.html no encontrado');
  process.exit(1);
}

// Verificar assets críticos
[
  'assets/portfolio/39_portafolio_1.jpg',
  'assets/portfolio/39_portafolio_9.jpg',
  'assets/textures/22_grain_texture.png',
  'assets/overlays/24_overlay_ligth_leak.png',
  'assets/overlays/28_firma_maikel.png',
  'assets/overlays/29_watermark_mk.png',
  'assets/icons/01_logo_mk_blanco_principal.svg',
  'assets/backgrounds/31_fondo_ia1_oscuro_principal.jpg',
].forEach(asset => {
  const exists = fs.existsSync(path.join(PROJECT, 'public', asset)) ||
                 fs.existsSync(path.join(PROJECT, asset));
  checks.push({ name: asset.split('/').pop(), pass: exists });
});

let passed = 0, failed = 0;
checks.forEach(c => {
  console.log((c.pass ? '✅' : '❌') + ' ' + c.name);
  c.pass ? passed++ : failed++;
});

const score = Math.round((passed / checks.length) * 100);
console.log('\n════════════════════════');
console.log('Score: ' + score + '% (' + passed + '/' + checks.length + ')');
if (score >= 90) console.log('\n🟢 APROBADO — Listo para deploy');
else if (score >= 70) console.log('\n🟡 CONDICIONAL — Revisar items fallidos');
else console.log('\n🔴 RECHAZADO — Demasiados items fallando');
if (failed > 0) process.exit(1);
