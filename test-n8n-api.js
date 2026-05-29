import axios from 'axios';

const N8N_URL = 'https://the303photography.app.n8n.cloud';
const N8N_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjNDYzODI2ZS0yZjEwLTQ2NWMtYTMzMS03YjgzZGMyZTA1NTIiLCJpc3MiOiJuOG4iLCJhdWQiOiJtY3Atc2VydmVyLWFwaSIsImp0aSI6IjVmZjg4NzQ3LTVlM2EtNGQzNC1iOTA0LTZlMmZhZjY3NTljMCIsImlhdCI6MTc4MDA2NzQ5OH0.m43Mw9IfILWn9IEar0C63LBlQFoZg1aPIJ22LBIIWmk';

console.log('🔍 N8N API DIAGNOSTIC TEST\n');
console.log('═══════════════════════════════════════════\n');

const n8nAPI = axios.create({
  baseURL: `${N8N_URL}/api/v1`,
  headers: {
    'X-N8N-API-KEY': N8N_API_KEY,
    'Content-Type': 'application/json'
  }
});

async function testConnection() {
  try {
    console.log('1️⃣  Testing basic connectivity...');
    const response = await n8nAPI.get('/workflows');
    console.log('✅ API Connection successful\n');

    const workflows = response.data.data || [];
    console.log(`2️⃣  Found ${workflows.length} workflows:`);
    workflows.forEach((w, i) => {
      console.log(`   ${i + 1}. ${w.name} (ID: ${w.id}, Active: ${w.active ? '✅' : '❌'})`);
    });

    console.log('\n3️⃣  API Key Status: ✅ VALID\n');
    console.log('The API key is working correctly!');

  } catch (error) {
    console.error('❌ API Connection failed\n');
    console.error('Status:', error.response?.status);
    console.error('Error:', error.response?.data);
    console.error('\nDiagnostics:');
    console.error('- Check if API key is valid');
    console.error('- Check if account is active');
    console.error('- Check if URL is correct: ' + N8N_URL);
    console.error('- Verify API key format');
  }
}

testConnection();
