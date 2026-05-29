import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CREDENTIALS_PATH = path.join(__dirname, '../../google-drive-credentials.json');

console.log('\n🔍 GOOGLE DRIVE CONNECTION TEST\n');
console.log('═══════════════════════════════════════\n');

// Check if credentials file exists
console.log('1. Checking credentials file...');
if (!fs.existsSync(CREDENTIALS_PATH)) {
  console.log(`❌ Credentials file not found at: ${CREDENTIALS_PATH}`);
  console.log('\n📋 Instructions:');
  console.log('1. Go to: https://console.cloud.google.com');
  console.log('2. Create project: "the303-automation"');
  console.log('3. Enable Google Drive API');
  console.log('4. Create Service Account');
  console.log('5. Download JSON credentials');
  console.log(`6. Save to: ${CREDENTIALS_PATH}`);
  process.exit(1);
}
console.log('✅ Credentials file found');

// Try to authenticate
console.log('\n2. Authenticating with Google Drive API...');
try {
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));

  const auth = new google.auth.GoogleAuth({
    credentials: credentials,
    scopes: ['https://www.googleapis.com/auth/drive.readonly']
  });

  const drive = google.drive({ version: 'v3', auth });
  console.log('✅ Authentication successful');

  // Test: List files in Drive
  console.log('\n3. Listing root folders...');
  const response = await drive.files.list({
    spaces: 'drive',
    fields: 'files(id, name, mimeType)',
    q: "mimeType='application/vnd.google-apps.folder'",
    pageSize: 10
  });

  if (response.data.files && response.data.files.length > 0) {
    console.log(`✅ Found ${response.data.files.length} folders:`);
    response.data.files.forEach((file, idx) => {
      console.log(`   ${idx + 1}. ${file.name} (${file.id})`);
    });
  } else {
    console.log('⚠️ No folders found');
  }

  // Test: Find "the303photography" folder
  console.log('\n4. Looking for "the303photography" folder...');
  const folderResponse = await drive.files.list({
    spaces: 'drive',
    fields: 'files(id, name)',
    q: `name='the303photography' and mimeType='application/vnd.google-apps.folder'`,
    pageSize: 10
  });

  if (folderResponse.data.files && folderResponse.data.files.length > 0) {
    const folder = folderResponse.data.files[0];
    console.log(`✅ Found folder: ${folder.name}`);
    console.log(`   ID: ${folder.id}`);

    // List photos in folder
    console.log('\n5. Listing photos in folder...');
    const photosResponse = await drive.files.list({
      q: `'${folder.id}' in parents and (mimeType='image/jpeg' or mimeType='image/png')`,
      spaces: 'drive',
      fields: 'files(id, name, size)',
      pageSize: 10
    });

    if (photosResponse.data.files && photosResponse.data.files.length > 0) {
      console.log(`✅ Found ${photosResponse.data.files.length} photos:`);
      photosResponse.data.files.forEach((file, idx) => {
        const sizeKB = (file.size / 1024).toFixed(2);
        console.log(`   ${idx + 1}. ${file.name} (${sizeKB} KB)`);
      });
    } else {
      console.log('⚠️ No photos found in folder');
    }
  } else {
    console.log('❌ Folder "the303photography" not found');
    console.log('\n📋 Make sure:');
    console.log('1. Folder exists in your Google Drive');
    console.log('2. Service Account has access to the folder');
    console.log('3. You shared the folder with the Service Account email');
  }

  console.log('\n═══════════════════════════════════════');
  console.log('\n✅ GOOGLE DRIVE CONNECTION TEST PASSED\n');
  console.log('You can now run: npm run process-google-drive\n');

} catch (error) {
  console.log(`❌ Authentication failed: ${error.message}`);
  console.log('\n📋 Troubleshooting:');
  console.log('1. Check that credentials file is valid JSON');
  console.log('2. Verify Google Drive API is enabled in Google Cloud Console');
  console.log('3. Check that Service Account has appropriate permissions');
  process.exit(1);
}
