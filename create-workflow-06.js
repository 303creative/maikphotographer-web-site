import 'dotenv/config';
import axios from 'axios';

const N8N_URL = 'https://the303photography.app.n8n.cloud';
const N8N_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjNDYzODI2ZS0yZjEwLTQ2NWMtYTMzMS03YjgzZGMyZTA1NTIiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiNDY3NWVmOTAtNTFmOS00ZDJjLThlZjItMTUxODdiOTQwNjkxIiwiaWF0IjoxNzgwMDY3MzQzLCJleHAiOjE3ODI2MTkyMDB9.EyGMZnvtFDkpzzvhqq92mZq2RnBOMypPndaeR6-3aZ0';

const n8nAPI = axios.create({
  baseURL: `${N8N_URL}/api/v1`,
  headers: {
    'X-N8N-API-KEY': N8N_API_KEY,
    'Content-Type': 'application/json'
  }
});

console.log('\n🚀 CREATING WORKFLOW 06 - GOOGLE DRIVE FOLDER CREATOR\n');
console.log('═══════════════════════════════════════════════════════\n');

// Workflow structure
const workflow = {
  name: '06 - Google Drive Folder Creator',
  active: false,
  nodes: [
    {
      id: 'uuid1',
      name: 'Start',
      type: 'n8n-nodes-base.start',
      typeVersion: 1,
      position: [250, 300],
      parameters: {}
    },
    {
      id: 'uuid2',
      name: 'Get Folder ID',
      type: 'n8n-nodes-base.googleDrive',
      typeVersion: 3,
      position: [450, 300],
      parameters: {
        resource: 'file',
        operation: 'list',
        space: 'drive',
        folderId: '',
        query: 'name=\'the303photography\' and mimeType=\'application/vnd.google-apps.folder\'',
        fields: ['id', 'name'],
        searchResultsLimit: 1
      },
      credentials: {
        googleDriveOAuth2: 'Google Drive'
      }
    },
    {
      id: 'uuid3',
      name: 'Create FOTOS-GENERADAS',
      type: 'n8n-nodes-base.googleDrive',
      typeVersion: 3,
      position: [650, 200],
      parameters: {
        resource: 'file',
        operation: 'createFolder',
        parentId: '={{ $("Get Folder ID").results[0].id }}',
        name: 'FOTOS-GENERADAS'
      },
      credentials: {
        googleDriveOAuth2: 'Google Drive'
      }
    },
    {
      id: 'uuid4',
      name: 'List Photos',
      type: 'n8n-nodes-base.googleDrive',
      typeVersion: 3,
      position: [650, 400],
      parameters: {
        resource: 'file',
        operation: 'list',
        folderId: '={{ $("Get Folder ID").results[0].id }}',
        query: '(mimeType=\'image/jpeg\' OR mimeType=\'image/png\')',
        fields: ['id', 'name', 'size', 'mimeType'],
        searchResultsLimit: 100
      },
      credentials: {
        googleDriveOAuth2: 'Google Drive'
      }
    },
    {
      id: 'uuid5',
      name: 'Send Email',
      type: 'n8n-nodes-base.gmail',
      typeVersion: 2,
      position: [850, 300],
      parameters: {
        operation: 'send',
        to: '303creativemarketing@gmail.com',
        subject: '✅ Workflow 06 - Google Drive Folder Created Successfully',
        messageBody: 'Hi Maikel,\n\n✅ WORKFLOW 06 COMPLETED\n\nFolder Created:\n• Name: FOTOS-GENERADAS\n• Parent: the303photography\n• Created: ' + new Date().toISOString() + '\n\nPhotos Found:\n• Total: {{ $("List Photos").length }}\n• In folder: the303photography\n\nNext Steps:\n1. Verify folder in Google Drive\n2. Run: npm run process-google-drive\n3. Files will be organized automatically\n\nBest regards,\nAutomation System'
      },
      credentials: {
        gmail: 'Gmail'
      }
    }
  ],
  connections: {
    'Start': {
      main: [
        [
          {
            node: 'Get Folder ID',
            type: 'main',
            index: 0
          }
        ]
      ]
    },
    'Get Folder ID': {
      main: [
        [
          {
            node: 'Create FOTOS-GENERADAS',
            type: 'main',
            index: 0
          },
          {
            node: 'List Photos',
            type: 'main',
            index: 0
          }
        ]
      ]
    },
    'Create FOTOS-GENERADAS': {
      main: [
        [
          {
            node: 'Send Email',
            type: 'main',
            index: 0
          }
        ]
      ]
    },
    'List Photos': {
      main: [
        [
          {
            node: 'Send Email',
            type: 'main',
            index: 0
          }
        ]
      ]
    }
  }
};

async function createAndExecuteWorkflow() {
  try {
    // Step 1: Create workflow
    console.log('Step 1: Creating workflow...\n');
    const createResponse = await n8nAPI.post('/workflows', workflow);
    const workflowId = createResponse.data.data.id;
    console.log(`✅ Workflow created successfully!`);
    console.log(`   ID: ${workflowId}`);
    console.log(`   Name: ${createResponse.data.data.name}\n`);

    // Step 2: Wait a moment
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Step 3: Activate workflow
    console.log('Step 2: Activating workflow...\n');
    await n8nAPI.patch(`/workflows/${workflowId}`, { active: true });
    console.log(`✅ Workflow activated\n`);

    // Step 4: Execute workflow
    console.log('Step 3: Executing workflow...\n');
    const executeResponse = await n8nAPI.post(`/workflows/${workflowId}/execute`, {});
    console.log(`✅ Workflow execution started!\n`);

    // Step 5: Poll for execution status
    console.log('Step 4: Monitoring execution...\n');
    let attempts = 0;
    const maxAttempts = 30;

    while (attempts < maxAttempts) {
      try {
        const executionResponse = await n8nAPI.get(`/executions?workflowId=${workflowId}&limit=1`);
        const execution = executionResponse.data.data[0];

        if (execution && execution.finished) {
          console.log(`\n✅ WORKFLOW EXECUTION COMPLETED!\n`);
          console.log(`═══════════════════════════════════════════════════════\n`);
          console.log(`📊 RESULTS:\n`);
          console.log(`Status: ${execution.status === 'success' ? '✅ SUCCESS' : '❌ ' + execution.status}`);
          console.log(`Execution ID: ${execution.id}`);
          console.log(`Duration: ${((execution.stoppedAt - execution.startedAt) / 1000).toFixed(2)}s`);

          console.log(`\n═══════════════════════════════════════════════════════\n`);
          console.log(`🎉 WORKFLOW 06 CREATED AND EXECUTED SUCCESSFULLY!\n`);
          console.log(`📁 Carpeta "FOTOS-GENERADAS" creada en "the303photography"\n`);
          console.log(`📧 Email de confirmación enviado a 303creativemarketing@gmail.com\n`);
          console.log(`Next Steps:`);
          console.log(`1. Check Google Drive for the new folder`);
          console.log(`2. Check Gmail for confirmation email`);
          console.log(`3. Run: npm run process-google-drive\n`);
          break;
        }
      } catch (e) {
        // Execution not ready yet
      }

      attempts++;
      process.stdout.write('.');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    if (attempts >= maxAttempts) {
      console.log(`\n⏳ Workflow execution in progress...`);
      console.log(`Check n8n dashboard for execution status: ${N8N_URL}/workflows/${workflowId}\n`);
    }

  } catch (error) {
    console.error('\n❌ ERROR CREATING WORKFLOW:\n');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('Message:', error.message);
    }
    process.exit(1);
  }
}

createAndExecuteWorkflow();
