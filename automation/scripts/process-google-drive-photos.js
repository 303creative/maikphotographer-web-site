import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';
import Anthropic from '@anthropic-ai/sdk';
import { Client } from '@notionhq/client';
import nodemailer from 'nodemailer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const client = new Anthropic();
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  notionVersion: '2022-06-28'
});

// Gmail transporter
const gmailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

// Google Drive setup
const CREDENTIALS_PATH = path.join(__dirname, '../../google-drive-credentials.json');
const FOLDER_NAME = 'the303photography';
let driveService;

// Initialize Google Drive
async function initGoogleDrive() {
  try {
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));

    const auth = new google.auth.GoogleAuth({
      credentials: credentials,
      scopes: ['https://www.googleapis.com/auth/drive.readonly']
    });

    driveService = google.drive({ version: 'v3', auth });
    console.log('[GOOGLE-DRIVE] ✅ Authentication successful');
    return true;
  } catch (error) {
    console.error('[GOOGLE-DRIVE] ❌ Authentication failed:', error.message);
    console.log('\n⚠️ Make sure google-drive-credentials.json exists in the project root');
    console.log('Location:', CREDENTIALS_PATH);
    return false;
  }
}

// Find Google Drive folder
async function findFolderId(folderName) {
  try {
    const response = await driveService.files.list({
      spaces: 'drive',
      fields: 'files(id, name)',
      q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      pageSize: 10
    });

    if (response.data.files && response.data.files.length > 0) {
      const folderId = response.data.files[0].id;
      console.log(`[GOOGLE-DRIVE] ✅ Found folder: ${folderName} (ID: ${folderId})`);
      return folderId;
    } else {
      console.log(`[GOOGLE-DRIVE] ❌ Folder not found: ${folderName}`);
      return null;
    }
  } catch (error) {
    console.error('[GOOGLE-DRIVE] ❌ Error finding folder:', error.message);
    return null;
  }
}

// List photos from Google Drive folder
async function listPhotosFromDrive(folderId) {
  try {
    const response = await driveService.files.list({
      q: `'${folderId}' in parents and (mimeType='image/jpeg' or mimeType='image/png') and trashed=false`,
      spaces: 'drive',
      fields: 'files(id, name, webContentLink, mimeType)',
      pageSize: 100
    });

    const files = response.data.files || [];
    console.log(`[GOOGLE-DRIVE] 📸 Found ${files.length} photos`);
    return files;
  } catch (error) {
    console.error('[GOOGLE-DRIVE] ❌ Error listing files:', error.message);
    return [];
  }
}

// Download photo from Google Drive
async function downloadPhotoFromDrive(fileId, fileName) {
  try {
    const tempDir = path.join(__dirname, '../../temp-photos');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const tempPath = path.join(tempDir, fileName);
    const dest = fs.createWriteStream(tempPath);

    await new Promise((resolve, reject) => {
      driveService.files.get(
        { fileId: fileId, alt: 'media' },
        { responseType: 'stream' },
        (err, res) => {
          if (err) reject(err);
          res.data
            .on('end', () => resolve())
            .on('error', reject)
            .pipe(dest);
        }
      );
    });

    console.log(`[DOWNLOAD] ✅ Downloaded: ${fileName}`);
    return tempPath;
  } catch (error) {
    console.error(`[DOWNLOAD] ❌ Failed to download ${fileName}:`, error.message);
    return null;
  }
}

// Analyze photo with Claude Vision
async function analyzePhotoWithVision(imagePath) {
  try {
    const imageData = fs.readFileSync(imagePath);
    const base64Image = imageData.toString('base64');
    const mediaType = imagePath.endsWith('.png') ? 'image/png' : 'image/jpeg';

    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
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
              text: `Analiza esta foto para un portafolio de fotografía editorial Miami.

Proporciona:
1. Descripción breve (50 palabras max)
2. Estilo identificado (editorial, retrato, moda, urbano, etc.)
3. Elementos clave (iluminación, composición, etc.)
4. 5 hashtags relevantes

Formatea como JSON:
{
  "description": "...",
  "style": "...",
  "elements": "...",
  "hashtags": ["#tag1", "#tag2", ...]
}`
            }
          ]
        }
      ]
    });

    const analysisText = response.content[0].text;
    const jsonMatch = analysisText.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return null;
  } catch (error) {
    console.error('[AI-ANALYSIS] ❌ Error:', error.message);
    return null;
  }
}

// Generate captions
async function generateCaptions(analysis) {
  try {
    const prompt = `Basado en este análisis fotográfico, genera captions para redes sociales.

Análisis: ${JSON.stringify(analysis)}

Genera:
1. Caption EN (máximo 280 caracteres, engaging, call-to-action)
2. Caption ES (máximo 280 caracteres, engaging, call-to-action)

Formato JSON:
{
  "captionEN": "...",
  "captionES": "..."
}`;

    const response = await client.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 500,
      messages: [{ role: 'user', content: prompt }]
    });

    const responseText = response.content[0].text;
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return { captionEN: 'Check our portfolio', captionES: 'Revisa nuestro portafolio' };
  } catch (error) {
    console.error('[CAPTION-GEN] ❌ Error:', error.message);
    return { captionEN: 'Editorial photography', captionES: 'Fotografía editorial' };
  }
}

// Save to Notion
async function saveToNotion(photoData) {
  try {
    await notion.pages.create({
      parent: { database_id: process.env.NOTION_MARKETING_DB_ID },
      properties: {
        'Campaña': { title: [{ text: { content: `Google Drive: ${photoData.title}` } }] },
        'Plataforma': { select: { name: photoData.platform || 'Instagram' } },
        'Estado': { select: { name: 'Aprobación Pendiente' } },
        'Fecha Inicio': { date: { start: new Date().toISOString().split('T')[0] } },
        'Notas': { rich_text: [{ text: { content: `Source: Google Drive\nFile: ${photoData.fileName}\n\nStyle: ${photoData.style}\nElements: ${photoData.elements}\n\nEN: ${photoData.captionEN}\n\nES: ${photoData.captionES}\n\nHashtags: ${photoData.hashtags.join(' ')}` } }] }
      }
    });

    console.log('[NOTION] ✅ Saved:', photoData.title);
    return true;
  } catch (error) {
    console.error('[NOTION] ❌ Error saving:', error.message);
    return false;
  }
}

// Send approval email
async function sendApprovalEmail(photoCount) {
  try {
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: '303creativemarketing@gmail.com',
      subject: `✅ Google Drive Photos Processed - ${photoCount} items ready for approval`,
      html: `
        <h2>Google Drive Photos Processing Complete</h2>
        <p><strong>${photoCount} photos</strong> have been analyzed from your Google Drive folder.</p>

        <h3>What's Included:</h3>
        <ul>
          <li>AI Analysis (Claude Vision)</li>
          <li>Captions in English & Spanish</li>
          <li>Auto-generated Hashtags</li>
          <li>Platform Optimization</li>
        </ul>

        <h3>Next Steps:</h3>
        <ol>
          <li>Review photos in Notion MARKETING CAMPAIGNS database</li>
          <li>Approve or edit captions</li>
          <li>Mark as "Listo para Publicar"</li>
          <li>Trigger n8n publishing workflow</li>
        </ol>

        <p><strong>All photos:</strong> Status = "Aprobación Pendiente"</p>

        <hr>
        <p style="color: #666; font-size: 12px;">
          Sistema automatizado de THE303 Photography
        </p>
      `
    };

    await gmailTransporter.sendMail(mailOptions);
    console.log('[EMAIL] ✅ Approval email sent');
  } catch (error) {
    console.error('[EMAIL] ❌ Error sending email:', error.message);
  }
}

// Main processing function
async function processGoogleDrivePhotos() {
  console.log('\n[PROCESSOR] 🚀 Starting Google Drive photo processing...\n');

  // Initialize Google Drive
  const authenticated = await initGoogleDrive();
  if (!authenticated) {
    console.error('[PROCESSOR] ❌ Cannot proceed without Google Drive authentication');
    return;
  }

  // Find folder
  const folderId = await findFolderId(FOLDER_NAME);
  if (!folderId) {
    console.error('[PROCESSOR] ❌ Cannot find folder');
    return;
  }

  // List photos
  const photos = await listPhotosFromDrive(folderId);
  if (photos.length === 0) {
    console.log('[PROCESSOR] ⚠️ No photos found in Google Drive folder');
    return;
  }

  console.log(`\n[PROCESSOR] 📸 Processing ${photos.length} photos...\n`);

  let successCount = 0;
  const processedPhotos = [];

  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];
    console.log(`\n[PROCESSOR] Processing ${i + 1}/${photos.length}: ${photo.name}`);

    try {
      // Download
      console.log('[DOWNLOAD] 📥 Downloading from Google Drive...');
      const tempPath = await downloadPhotoFromDrive(photo.id, photo.name);
      if (!tempPath) continue;

      // Analyze
      console.log('[AI-ANALYSIS] 📷 Analyzing with Claude Vision...');
      const analysis = await analyzePhotoWithVision(tempPath);
      if (!analysis) {
        fs.unlinkSync(tempPath);
        continue;
      }

      // Generate captions
      console.log('[CAPTION-GEN] 🎨 Generating captions...');
      const captions = await generateCaptions(analysis);

      // Prepare data
      const photoData = {
        title: photo.name.replace(/\.[^/.]+$/, ''),
        fileName: photo.name,
        style: analysis.style || 'Editorial',
        elements: analysis.elements || 'Professional photography',
        captionEN: captions.captionEN || 'Featured on our portfolio',
        captionES: captions.captionES || 'Destacado en nuestro portafolio',
        hashtags: analysis.hashtags || ['#MiamiPhotographer', '#EditorialPhotography'],
        platform: 'Instagram',
        photoPath: tempPath,
        googleDriveId: photo.id
      };

      // Save to Notion
      console.log('[NOTION] 💾 Saving to Notion...');
      const saved = await saveToNotion(photoData);
      if (saved) {
        successCount++;
        processedPhotos.push(photoData);
      }

      // Cleanup
      fs.unlinkSync(tempPath);

      // Rate limit
      if (i < photos.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

    } catch (error) {
      console.error(`[PROCESSOR] ❌ Error processing ${photo.name}:`, error.message);
    }
  }

  // Send approval email
  console.log('\n[PROCESSOR] 📧 Sending approval email...');
  await sendApprovalEmail(successCount);

  // Summary
  console.log('\n[PROCESSOR] ✅ Processing complete!');
  console.log(`[PROCESSOR] 📊 Processed: ${successCount}/${photos.length} photos`);
  console.log(`[PROCESSOR] 📁 Temp files cleaned up`);
  console.log(`[PROCESSOR] 📌 All content saved to Notion MARKETING database\n`);
}

// Run
processGoogleDrivePhotos().catch(console.error);
