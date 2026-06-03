/**
 * compress-web-images.js
 * Compresses all web images in-place (JPG -> optimized JPG) and emits WebP siblings.
 * Targets: <= 300 KB per JPG where reasonable, preserving visible quality.
 *
 * Usage:  node scripts/compress-web-images.js
 */
'use strict';

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');

// Folders to process (relative to /public)
const TARGETS = [
  { dir: 'img/toda la galeria', maxW: 1600, jpgQ: [82, 78, 72, 65, 58], target: 300 * 1024 },
  { dir: 'assets/portfolio',    maxW: 1600, jpgQ: [82, 78, 72, 65, 58], target: 300 * 1024 },
  { dir: 'assets/backgrounds',  maxW: 1920, jpgQ: [80, 74, 68, 60],      target: 300 * 1024 },
  { dir: 'assets/overlays',     maxW: 2000, jpgQ: [82, 76, 70, 62],      target: 250 * 1024 },
  { dir: 'assets/textures',     maxW: 2000, jpgQ: [80, 72, 64],          target: 400 * 1024 },
  { dir: 'img/mejores fotos',   maxW: 1600, jpgQ: [82, 78, 72, 65, 58], target: 300 * 1024 },
];

const IS_RASTER = /\.(jpe?g|png)$/i;

function fmtKB(b) { return (b / 1024).toFixed(1) + ' KB'; }

async function compressJPG(absPath, cfg) {
  const before = fs.statSync(absPath).size;
  const buf = fs.readFileSync(absPath);
  const meta = await sharp(buf).metadata();
  const needsResize = meta.width && meta.width > cfg.maxW;

  let bestBuf = null;
  let bestQ = null;
  for (const q of cfg.jpgQ) {
    let pipe = sharp(buf, { failOn: 'none' }).rotate();
    if (needsResize) pipe = pipe.resize({ width: cfg.maxW, withoutEnlargement: true });
    const out = await pipe.jpeg({ quality: q, mozjpeg: true, progressive: true, chromaSubsampling: '4:2:0' }).toBuffer();
    bestBuf = out; bestQ = q;
    if (out.length <= cfg.target) break;
  }

  // Only overwrite if smaller than original
  let after = before;
  let action = 'kept-original';
  if (bestBuf && bestBuf.length < before) {
    fs.writeFileSync(absPath, bestBuf);
    after = bestBuf.length;
    action = `jpg q=${bestQ}${needsResize ? ` w=${cfg.maxW}` : ''}`;
  }

  // Always emit a WebP sibling at q=78
  const webpPath = absPath.replace(/\.(jpe?g|png)$/i, '.webp');
  let webpSize = null;
  try {
    let pipe = sharp(buf, { failOn: 'none' }).rotate();
    if (needsResize) pipe = pipe.resize({ width: cfg.maxW, withoutEnlargement: true });
    const w = await pipe.webp({ quality: 78, effort: 5 }).toBuffer();
    fs.writeFileSync(webpPath, w);
    webpSize = w.length;
  } catch (e) { /* ignore */ }

  return { before, after, action, webp: webpSize };
}

async function compressPNG(absPath, cfg) {
  const before = fs.statSync(absPath).size;
  const buf = fs.readFileSync(absPath);
  const meta = await sharp(buf).metadata();
  const needsResize = meta.width && meta.width > cfg.maxW;

  // Optimize PNG losslessly + palette where possible
  let pipe = sharp(buf, { failOn: 'none' });
  if (needsResize) pipe = pipe.resize({ width: cfg.maxW, withoutEnlargement: true });
  const out = await pipe.png({ compressionLevel: 9, palette: true, quality: 80, effort: 8 }).toBuffer();

  let after = before;
  let action = 'kept-original';
  if (out.length < before) {
    fs.writeFileSync(absPath, out);
    after = out.length;
    action = `png palette${needsResize ? ` w=${cfg.maxW}` : ''}`;
  }

  // WebP sibling
  const webpPath = absPath.replace(/\.(jpe?g|png)$/i, '.webp');
  let webpSize = null;
  try {
    let p = sharp(buf, { failOn: 'none' });
    if (needsResize) p = p.resize({ width: cfg.maxW, withoutEnlargement: true });
    const w = await p.webp({ quality: 80, effort: 5, alphaQuality: 90 }).toBuffer();
    fs.writeFileSync(webpPath, w);
    webpSize = w.length;
  } catch (e) { /* ignore */ }

  return { before, after, action, webp: webpSize };
}

async function processOne(absPath, cfg) {
  try {
    if (/\.png$/i.test(absPath)) return await compressPNG(absPath, cfg);
    return await compressJPG(absPath, cfg);
  } catch (e) {
    return { error: e.message };
  }
}

async function main() {
  const report = [];
  let totalBefore = 0, totalAfter = 0, totalWebp = 0;

  for (const t of TARGETS) {
    const dirAbs = path.join(PUBLIC, t.dir);
    if (!fs.existsSync(dirAbs)) { continue; }
    const files = fs.readdirSync(dirAbs).filter(f => IS_RASTER.test(f));
    console.log(`\n=== ${t.dir} (${files.length} files) ===`);

    // Process in parallel batches of 4 to avoid CPU starvation
    const BATCH = 4;
    for (let i = 0; i < files.length; i += BATCH) {
      const chunk = files.slice(i, i + BATCH);
      const results = await Promise.all(chunk.map(async (f) => {
        const abs = path.join(dirAbs, f);
        const r = await processOne(abs, t);
        return { file: path.join(t.dir, f).replace(/\\/g, '/'), ...r };
      }));
      for (const r of results) {
        if (r.error) {
          console.log(`  ! ${r.file}  ERROR: ${r.error}`);
        } else {
          totalBefore += r.before;
          totalAfter += r.after;
          if (r.webp) totalWebp += r.webp;
          const saved = r.before - r.after;
          const pct = r.before ? ((saved / r.before) * 100).toFixed(0) : '0';
          console.log(`  ${fmtKB(r.before).padStart(10)} -> ${fmtKB(r.after).padStart(10)}  (-${pct}%) [${r.action}]  webp=${r.webp ? fmtKB(r.webp) : 'n/a'}  ${r.file}`);
        }
        report.push(r);
      }
    }
  }

  console.log('\n=== TOTALS ===');
  console.log(`Before:  ${fmtKB(totalBefore)}  (${(totalBefore / 1024 / 1024).toFixed(2)} MB)`);
  console.log(`After:   ${fmtKB(totalAfter)}   (${(totalAfter / 1024 / 1024).toFixed(2)} MB)`);
  console.log(`Saved:   ${fmtKB(totalBefore - totalAfter)} (${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%)`);
  console.log(`WebP total: ${fmtKB(totalWebp)} (${(totalWebp / 1024 / 1024).toFixed(2)} MB)`);

  // Write JSON report
  const reportPath = path.join(ROOT, 'IMAGE-COMPRESSION-REPORT.json');
  fs.writeFileSync(reportPath, JSON.stringify({ totals: { before: totalBefore, after: totalAfter, webp: totalWebp }, files: report }, null, 2));
  console.log(`\nReport: ${reportPath}`);
}

main().catch(e => { console.error(e); process.exit(1); });
