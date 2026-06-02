import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const src = 'C:/Users/maike/Desktop/303 Marketing Agency/maikphotographer-web-site/# Assets para web/MP4';
const dest = path.join(__dirname, 'public/assets/videos');

if (!fs.existsSync(dest)) {
  fs.mkdirSync(dest, { recursive: true });
  console.log('✅ Carpeta creada:', dest);
}

const videos = fs.readdirSync(src).filter(f => f.endsWith('.mp4'));

videos.forEach(file => {
  const srcPath = path.join(src, file);
  const cleanName = file
    .replace(/[^\w\d._-]/g, '_')
    .replace(/__+/g, '_');
  const destPath = path.join(dest, cleanName);

  const sizeMB = fs.statSync(srcPath).size / 1024 / 1024;
  fs.copyFileSync(srcPath, destPath);
  console.log('✅ Copiado:', cleanName, '(' + sizeMB.toFixed(1) + 'MB)');
});

console.log('\n✅ DONE — Videos copiados:', videos.length);
