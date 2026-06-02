import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const IMAGES_TO_OPTIMIZE = [
  { src: 'public/assets/backgrounds/36_foto_camara.jpg', quality: 75 },
  { src: 'public/assets/backgrounds/38_miami_bg.jpg', quality: 75 },
  { src: 'public/assets/backgrounds/31_fondo_ia2_oscuro.jpg', quality: 70 },
  { src: 'public/assets/backgrounds/31_fondo_ia3_oscuro.jpg', quality: 70 },
  { src: 'public/assets/backgrounds/33_textura_metal_oscura.jpg', quality: 70 },
];

async function optimizeImages() {
  console.log('🖼️  Optimizando imágenes...\n');

  for (const img of IMAGES_TO_OPTIMIZE) {
    if (!fs.existsSync(img.src)) {
      console.log('❌ No existe:', img.src);
      continue;
    }

    const sizeBefore = fs.statSync(img.src).size / 1024 / 1024;

    try {
      await sharp(img.src)
        .jpeg({ quality: img.quality, progressive: true })
        .toFile(img.src + '.tmp');

      fs.renameSync(img.src + '.tmp', img.src);

      const sizeAfter = fs.statSync(img.src).size / 1024 / 1024;
      const reduction = (((sizeBefore - sizeAfter) / sizeBefore) * 100).toFixed(0);

      console.log(`✅ ${path.basename(img.src)}`);
      console.log(`   ${sizeBefore.toFixed(2)} MB → ${sizeAfter.toFixed(2)} MB (-${reduction}%)\n`);
    } catch (err) {
      console.log(`❌ Error optimizando ${img.src}:`, err.message);
    }
  }

  console.log('═════════════════════════════════');
  console.log('✅ Optimización completada');
}

optimizeImages();
