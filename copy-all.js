import fs from 'fs';
import path from 'path';

const BASE_SRC = 'C:/Users/maike/Desktop/303 Marketing Agency/maikphotographer-web-site/# Assets para web';
const BASE_DEST = 'C:/Users/maike/Desktop/303 Marketing Agency/maikphotographer-web-site/public/assets';

// Crear todas las carpetas destino
const allDests = [
  path.join(BASE_DEST, 'icons'),
  path.join(BASE_DEST, 'textures'),
  path.join(BASE_DEST, 'overlays'),
  path.join(BASE_DEST, 'portfolio'),
  path.join(BASE_DEST, 'backgrounds'),
  path.join(BASE_DEST, 'videos'),
];
allDests.forEach(d => {
  if (!fs.existsSync(d)) {
    fs.mkdirSync(d, { recursive: true });
    console.log('📁 Creada:', path.relative(process.cwd(), d));
  }
});

let total = 0;

// COPIAR SVG
const svgSrc = path.join(BASE_SRC, 'SVG');
if (fs.existsSync(svgSrc)) {
  fs.readdirSync(svgSrc).forEach(file => {
    if (!file.endsWith('.svg')) return;
    const src = path.join(svgSrc, file);
    const dest = path.join(BASE_DEST, 'icons', file);
    fs.copyFileSync(src, dest);
    console.log('✅ SVG:', file);
    total++;
  });
}

// COPIAR PNG
const pngSrc = path.join(BASE_SRC, 'PNG');
if (fs.existsSync(pngSrc)) {
  fs.readdirSync(pngSrc).forEach(file => {
    if (!file.match(/\.(png|PNG)$/)) return;
    const src = path.join(pngSrc, file);
    const nameLower = file.toLowerCase();
    const isTexture = nameLower.includes('grain') ||
                      nameLower.includes('textura') ||
                      nameLower.includes('papel') ||
                      nameLower.startsWith('22_') ||
                      nameLower.startsWith('30_');
    const destDir = isTexture
      ? path.join(BASE_DEST, 'textures')
      : path.join(BASE_DEST, 'overlays');
    fs.copyFileSync(src, path.join(destDir, file));
    console.log('✅ PNG:', file, '→', isTexture ? 'textures' : 'overlays');
    total++;
  });
}

// COPIAR JPG
const jpgSrc = path.join(BASE_SRC, 'JPG');
if (fs.existsSync(jpgSrc)) {
  fs.readdirSync(jpgSrc).forEach(file => {
    if (!file.match(/\.(jpg|jpeg|JPG|JPEG)$/)) return;
    const src = path.join(jpgSrc, file);
    const nameLower = file.toLowerCase();
    const isPortfolio = nameLower.includes('portafolio') ||
                        nameLower.includes('portfolio') ||
                        nameLower.startsWith('39_');
    const destDir = isPortfolio
      ? path.join(BASE_DEST, 'portfolio')
      : path.join(BASE_DEST, 'backgrounds');
    fs.copyFileSync(src, path.join(destDir, file));
    console.log('✅ JPG:', file, '→', isPortfolio ? 'portfolio' : 'backgrounds');
    total++;
  });
}

// COPIAR MP4
const mp4Src = path.join(BASE_SRC, 'MP4');
if (fs.existsSync(mp4Src)) {
  fs.readdirSync(mp4Src).forEach(file => {
    if (!file.match(/\.(mp4|MP4)$/)) return;
    const src = path.join(mp4Src, file);
    // Limpiar nombre de caracteres especiales
    const cleanName = file
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^\w\d._-]/g, '_')
      .replace(/__+/g, '_');
    const dest = path.join(BASE_DEST, 'videos', cleanName);
    const sizeMB = (fs.statSync(src).size/1024/1024).toFixed(1);
    fs.copyFileSync(src, dest);
    console.log('✅ MP4:', cleanName, '(' + sizeMB + 'MB)');
    total++;
  });
}

console.log('\n══════════════════════════');
console.log('TOTAL COPIADOS:', total, 'archivos');
console.log('══════════════════════════');

// Verificar resultado final
console.log('\n📊 RESULTADO EN REPO:');
allDests.forEach(dir => {
  if (fs.existsSync(dir)) {
    const count = fs.readdirSync(dir).length;
    console.log('  ' + path.basename(dir) + ': ' + count + ' archivos');
  }
});
