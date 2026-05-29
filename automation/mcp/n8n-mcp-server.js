#!/usr/bin/env node

import axios from 'axios';

const N8N_URL = process.env.N8N_URL || 'https://the303photography.app.n8n.cloud';
const N8N_API_KEY = process.env.N8N_API_KEY;

if (!N8N_API_KEY) {
  console.error('Error: N8N_API_KEY environment variable not set');
  process.exit(1);
}

const n8nClient = axios.create({
  baseURL: `${N8N_URL}/api/v1`,
  headers: {
    'X-N8N-API-KEY': N8N_API_KEY,
    'Content-Type': 'application/json'
  }
});

// Helper functions for n8n API
async function listWorkflows() {
  try {
    const response = await n8nClient.get('/workflows');
    return response.data.data || [];
  } catch (error) {
    throw new Error(`Failed to list workflows: ${error.message}`);
  }
}

async function getWorkflow(workflowId) {
  try {
    const response = await n8nClient.get(`/workflows/${workflowId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to get workflow: ${error.message}`);
  }
}

async function executeWorkflow(workflowId, input = {}) {
  try {
    const response = await n8nClient.post(`/workflows/${workflowId}/execute`, {
      data: input
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to execute workflow: ${error.message}`);
  }
}

async function createWorkflow(name, nodes, connections, settings = {}) {
  try {
    const response = await n8nClient.post('/workflows', {
      name,
      nodes,
      connections,
      active: settings.active || false,
      settings: settings
    });
    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to create workflow: ${error.message}`);
  }
}

async function updateWorkflow(workflowId, updates) {
  try {
    const response = await n8nClient.patch(`/workflows/${workflowId}`, updates);
    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to update workflow: ${error.message}`);
  }
}

// MCP Protocol Handler
class MCPServer {
  constructor() {
    this.tools = this.initializeTools();
    this.processInput();
  }

  initializeTools() {
    return {
      list_workflows: {
        description: 'List all n8n workflows',
        inputSchema: {
          type: 'object',
          properties: {},
          required: []
        }
      },
      get_workflow: {
        description: 'Get detailed information about a specific workflow',
        inputSchema: {
          type: 'object',
          properties: {
            workflow_id: {
              type: 'string',
              description: 'The ID of the workflow to retrieve'
            }
          },
          required: ['workflow_id']
        }
      },
      execute_workflow: {
        description: 'Execute a specific n8n workflow',
        inputSchema: {
          type: 'object',
          properties: {
            workflow_id: {
              type: 'string',
              description: 'The ID of the workflow to execute'
            },
            input_data: {
              type: 'object',
              description: 'Input data for the workflow execution'
            }
          },
          required: ['workflow_id']
        }
      },
      create_workflow: {
        description: 'Create a new n8n workflow',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Name of the workflow'
            },
            nodes: {
              type: 'array',
              description: 'Workflow nodes configuration'
            },
            connections: {
              type: 'object',
              description: 'Connections between nodes'
            }
          },
          required: ['name', 'nodes', 'connections']
        }
      }
    };
  }

  async processInput() {
    let inputData = '';

    // Read from stdin
    process.stdin.on('data', chunk => {
      inputData += chunk.toString();
    });

    process.stdin.on('end', async () => {
      try {
        const request = JSON.parse(inputData);
        const response = await this.handleRequest(request);
        console.log(JSON.stringify(response));
      } catch (error) {
        console.error(JSON.stringify({
          error: error.message,
          type: 'error'
        }));
      }
    });
  }

  async handleRequest(request) {
    const { method, params = {} } = request;

    switch (method) {
      case 'tools/list':
        return {
          tools: Object.entries(this.tools).map(([name, config]) => ({
            name,
            ...config
          }))
        };

      case 'tools/call':
        return await this.handleToolCall(params);

      default:
        throw new Error(`Unknown method: ${method}`);
    }
  }

  async handleToolCall(params) {
    const { name, arguments: args = {} } = params;

    switch (name) {
      case 'list_workflows': {
        const workflows = await listWorkflows();
        return {
          content: [{
            type: 'text',
            text: `Found ${workflows.length} workflows:\n\n${workflows.map((w, i) =>
              `${i + 1}. ${w.name} (ID: ${w.id})\n   Status: ${w.active ? '✅ Active' : '⏸️ Inactive'}`
            ).join('\n')}`
          }]
        };
      }

      case 'get_workflow': {
        const workflow = await getWorkflow(args.workflow_id);
        return {
          content: [{
            type: 'text',
            text: `Workflow: ${workflow.name}\n\nID: ${workflow.id}\nStatus: ${workflow.active ? 'Active' : 'Inactive'}\nNodes: ${workflow.nodes?.length || 0}`
          }]
        };
      }

      case 'execute_workflow': {
        const result = await executeWorkflow(
          args.workflow_id,
          args.input_data || {}
        );
        return {
          content: [{
            type: 'text',
            text: `Workflow execution initiated:\n\nID: ${args.workflow_id}\nStatus: ${result.status || 'executing'}`
          }]
        };
      }

      case 'create_workflow': {
        const workflow = await createWorkflow(
          args.name,
          args.nodes,
          args.connections,
          args.settings || {}
        );
        return {
          content: [{
            type: 'text',
            text: `Workflow created successfully:\n\nName: ${workflow.name}\nID: ${workflow.id}`
          }]
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  }
}

// Start the MCP server
if (import.meta.url === `file://${process.argv[1]}`) {
  new MCPServer();
}

export { listWorkflows, getWorkflow, executeWorkflow, createWorkflow };
