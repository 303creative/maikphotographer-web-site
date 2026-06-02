const https = require('https');

const BASE = 'https://www.maikphotographer.com';

const CHECKS = [
  { url: '/', name: 'Home page' },
  { url: '/assets/portfolio/39_portafolio_1.jpg', name: 'Portfolio foto 1' },
  { url: '/assets/portfolio/39_portafolio_9.jpg', name: 'Portfolio foto 9' },
  { url: '/assets/videos/40_hero_camara_loop.mp4', name: 'Hero video' },
  { url: '/assets/textures/22_grain_texture.png', name: 'Grain texture' },
  { url: '/assets/overlays/24_overlay_ligth_leak.png', name: 'Light leak' },
  { url: '/assets/overlays/28_firma_maikel.png', name: 'Firma' },
  { url: '/assets/icons/01_logo_mk_blanco_principal.svg', name: 'Logo MK' },
  { url: '/assets/backgrounds/31_fondo_ia1_oscuro_principal.jpg', name: 'Hero bg' },
  { url: '/assets/backgrounds/34_fondo_about_bokeh_oscuro.jpg', name: 'About bg' },
  { url: '/assets/backgrounds/38_miami_bg.jpg', name: 'Miami bg' },
];

console.log('\n🔍 Verificando producción...\n');
let passed = 0;
let failed = 0;

const check = (item) => new Promise(resolve => {
  https.get(BASE + item.url, res => {
    const ok = res.statusCode === 200;
    if (ok) { console.log('✅ ' + item.name); passed++; }
    else { console.log('❌ ' + item.name + ' (' + res.statusCode + ')'); failed++; }
    resolve();
  }).on('error', () => {
    console.log('❌ ' + item.name + ' (ERROR)');
    failed++; resolve();
  });
});

(async () => {
  for (const item of CHECKS) await check(item);
  console.log('\n════════════════════════');
  console.log('✅ Passed: ' + passed + '/' + CHECKS.length);
  console.log('❌ Failed: ' + failed + '/' + CHECKS.length);
  console.log('════════════════════════\n');
  if (failed === 0) console.log('🚀 Producción verificada — Todo OK');
  else { console.log('⚠️  Hay ' + failed + ' assets fallando'); process.exit(1); }
})();
