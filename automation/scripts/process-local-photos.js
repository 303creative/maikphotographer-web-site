import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Anthropic from '@anthropic-ai/sdk';
import { Client } from '@notionhq/client';
import nodemailer from 'nodemailer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const client = new Anthropic();
const notion = new Client({ auth: process.env.NOTION_API_KEY });

// Gmail transporter
const gmailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

const PHOTOS_DIR = path.join(process.env.HOME || process.env.USERPROFILE, 'Desktop', '303 Marketing Agency', 'new-photos');

async function getLocalPhotos() {
  console.log('[PHOTOS] 📸 Scanning for local photos...\n');

  if (!fs.existsSync(PHOTOS_DIR)) {
    console.log('[PHOTOS] ℹ️  No photos directory found at:', PHOTOS_DIR);
    return [];
  }

  const files = fs.readdirSync(PHOTOS_DIR);
  const photoExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.heic'];
  const photos = files.filter(f => photoExtensions.includes(path.extname(f).toLowerCase()));

  console.log(`[PHOTOS] ✅ Found ${photos.length} photos`);
  return photos.map(f => ({
    name: f,
    path: path.join(PHOTOS_DIR, f),
    stats: fs.statSync(path.join(PHOTOS_DIR, f))
  }));
}

async function analyzePhotoWithAI(photoPath) {
  console.log('[AI-ANALYSIS] 📷 Analyzing photo with Claude Vision...');

  try {
    const imageBuffer = fs.readFileSync(photoPath);
    const base64Image = imageBuffer.toString('base64');
    const mediaType = photoPath.endsWith('.png') ? 'image/png' : 'image/jpeg';

    const response = await client.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 300,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType,
                data: base64Image
              }
            },
            {
              type: 'text',
              text: `Analyze this photography portfolio image. Provide:
1. Main subject/scene description
2. Photography style (lighting, mood, composition)
3. Suggested Instagram caption (1-2 sentences)
4. Best platform for this image
5. Recommended hashtags (5-7 tags)

Format as JSON-compatible text.`
            }
          ]
        }
      ]
    });

    return response.content[0].text;
  } catch (error) {
    console.error('[AI-ANALYSIS] ❌ Error analyzing photo:', error.message);
    return null;
  }
}

async function generateContentFromPhoto(photo, analysis) {
  console.log('[GENERATOR] 🎨 Creating content from photo...');

  const prompt = `Based on this photo analysis:
${analysis}

Generate professional photography post content:
1. Title (short, punchy)
2. Caption in English (3-4 sentences)
3. Caption in Spanish (3-4 sentences, profesional)
4. 8-10 relevant hashtags for Instagram/TikTok
5. Best posting time recommendation

Format as structured content ready for social media.`;

  const message = await client.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 400,
    messages: [{ role: 'user', content: prompt }]
  });

  return message.content[0].text;
}

async function savePhotoContentToNotion(photoData) {
  console.log('[NOTION] 💾 Saving to Notion MARKETING database...');

  try {
    const page = await notion.pages.create({
      parent: { database_id: process.env.NOTION_MARKETING_DB_ID },
      properties: {
        'Titulo': { title: [{ text: { content: `Local: ${photoData.title}` } }] },
        'Tipo': { select: { name: 'Local Upload' } },
        'Plataforma': { select: { name: photoData.platform || 'Instagram' } },
        'Estado': { select: { name: 'Generado' } },
        'Imagen URL': { url: `file:///${photoData.photoPath.replace(/\\/g, '/')}` },
        'Caption EN': { rich_text: [{ text: { content: photoData.captionEN } }] },
        'Caption ES': { rich_text: [{ text: { content: photoData.captionES } }] },
        'Hashtags': { rich_text: [{ text: { content: photoData.hashtags.join(' ') } }] },
        'Fecha Creacion': { date: { start: new Date().toISOString() } },
        'Listo para Publicar': { checkbox: false }
      }
    });

    console.log('[NOTION] ✅ Saved with ID:', page.id);
    return page.id;

  } catch (error) {
    console.error('[NOTION] ❌ Error saving to Notion:', error.message);
    return null;
  }
}

async function sendApprovalEmail(processedPhotos) {
  console.log('[EMAIL] 📧 Sending approval email...\n');

  const emailContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background: #0B0C0A; color: #E6E3D8; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px; background: #0E0F0D; border-radius: 12px; }
        h1 { color: #D8C18A; font-size: 24px; margin-bottom: 20px; }
        .photo-item { background: #141512; padding: 16px; margin: 12px 0; border-left: 3px solid #D8C18A; border-radius: 4px; }
        .photo-title { color: #D8C18A; font-weight: bold; margin-bottom: 8px; }
        .caption { color: #9B978B; font-size: 13px; margin: 8px 0; }
        .hashtags { color: #D8C18A; font-size: 12px; word-break: break-word; }
        .button {
          display: inline-block;
          background: #D8C18A;
          color: #111;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 4px;
          margin-top: 20px;
          font-weight: bold;
        }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(216,193,138,.12); color: #9B978B; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>✅ Content Generated from Local Photos</h1>
        <p>Hi Maikel,</p>
        <p>Your photos have been processed and content has been generated automatically. Review and approve in your Notion database before publishing.</p>

        <h2 style="color: #D8C18A; margin-top: 30px;">📸 Processed Photos (${processedPhotos.length})</h2>

        ${processedPhotos.map((photo, idx) => `
          <div class="photo-item">
            <div class="photo-title">${idx + 1}. ${photo.title}</div>
            <div class="caption"><strong>EN:</strong> ${photo.captionEN}</div>
            <div class="caption"><strong>ES:</strong> ${photo.captionES}</div>
            <div class="hashtags"><strong>Hashtags:</strong> ${photo.hashtags.join(' ')}</div>
          </div>
        `).join('')}

        <a href="https://notion.so" class="button">Review in Notion →</a>

        <div class="footer">
          <p><strong>Next Steps:</strong></p>
          <ul>
            <li>Review captions in Notion MARKETING database</li>
            <li>Edit hashtags or captions if needed</li>
            <li>Mark "Listo para Publicar" ✓ when ready</li>
            <li>System will publish automatically at optimal times</li>
          </ul>
          <p><em>All photos have been saved to: ${PHOTOS_DIR}</em></p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await gmailTransporter.sendMail({
      from: process.env.GMAIL_USER,
      to: '303creativemarketing@gmail.com',
      subject: `✅ ${processedPhotos.length} Photos Processed - Approval Needed`,
      html: emailContent
    });

    console.log('[EMAIL] ✅ Approval email sent to 303creativemarketing@gmail.com');

  } catch (error) {
    console.error('[EMAIL] ❌ Error sending email:', error.message);
  }
}

async function processAllPhotos() {
  console.log('[PROCESSOR] 🚀 Starting local photo processing...\n');

  const photos = await getLocalPhotos();
  if (photos.length === 0) {
    console.log('[PROCESSOR] ℹ️  No photos to process');
    return;
  }

  const processedPhotos = [];

  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];
    console.log(`\n[PROCESSOR] Processing ${i + 1}/${photos.length}: ${photo.name}`);

    try {
      // Analyze with AI
      const analysis = await analyzePhotoWithAI(photo.path);
      if (!analysis) continue;

      // Generate content
      const content = await generateContentFromPhoto(photo, analysis);

      // Parse content (simple extraction)
      const contentData = {
        title: photo.name.split('.')[0],
        photoPath: photo.path,
        platform: 'Instagram',
        captionEN: content.includes('English') ? content.split('\n')[2] : content.split('\n')[0],
        captionES: content.includes('Spanish') ? content.split('\n')[4] : content.split('\n')[1],
        hashtags: content.match(/#\w+/g) || [],
        notionId: null
      };

      // Save to Notion
      const notionId = await savePhotoContentToNotion(contentData);
      contentData.notionId = notionId;

      processedPhotos.push(contentData);

      console.log(`[PROCESSOR] ✅ Photo ${i + 1}/${photos.length} complete`);

      // Rate limiting
      if (i < photos.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

    } catch (error) {
      console.error(`[PROCESSOR] ❌ Error processing ${photo.name}:`, error.message);
    }
  }

  // Send approval email
  if (processedPhotos.length > 0) {
    console.log(`\n[PROCESSOR] 📧 Sending approval email with ${processedPhotos.length} photos...`);
    await sendApprovalEmail(processedPhotos);
  }

  console.log(`\n[PROCESSOR] ✅ Processing complete! ${processedPhotos.length}/${photos.length} photos processed`);
}

// Run
processAllPhotos().catch(console.error);
