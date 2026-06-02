const baseUrl = 'https://www.maikphotographer.com';
const assetsToCheck = [
  '/assets/videos/40_hero_camara_loop.mp4',
  '/assets/portfolio/39_portafolio_1.jpg',
  '/assets/textures/22_grain_texture.png',
  '/assets/icons/01_logo_mk_blanco_principal.svg',
  '/assets/overlays/24_overlay_ligth_leak.png'
];

async function checkUrl(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    const size = res.headers.get('content-length');
    return { status: res.status, size };
  } catch (err) {
    return { status: 0, error: err.message };
  }
}

async function verifyProduction() {
  console.log('🔍 Verificando assets en producción...\n');
  console.log(`Base URL: ${baseUrl}\n`);

  let allGood = true;

  for (const asset of assetsToCheck) {
    const fullUrl = baseUrl + asset;
    const result = await checkUrl(fullUrl);

    if (result.status === 200) {
      const sizeMB = (result.size / 1024 / 1024).toFixed(2);
      console.log(`✅ ${asset}`);
      console.log(`   Status: ${result.status} | Size: ${sizeMB} MB\n`);
    } else {
      console.log(`❌ ${asset}`);
      console.log(`   Status: ${result.status || 'ERROR'}\n`);
      allGood = false;
    }
  }

  if (allGood) {
    console.log('🎉 ¡TODOS LOS ASSETS ESTÁN LIVE EN PRODUCCIÓN!');
    console.log('\n✅ https://www.maikphotographer.com está listo para usar');
    process.exit(0);
  } else {
    console.log('⚠️  Algunos assets aún no están disponibles.');
    console.log('Espera otros 2-3 minutos y verifica nuevamente.');
    process.exit(1);
  }
}

verifyProduction();
