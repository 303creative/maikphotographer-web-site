import { Client } from '@notionhq/client';
import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const HASHTAGS = [
  '#miamiphotographer',
  '#miamimodel',
  '#fotografiamiami',
  '#miamicreator',
  '#modelosenmiami',
  '#miamiinfluencer',
  '#brickellmiami',
  '#wynwoodmiami'
];

async function generatePersonalizedMessage(profile) {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 150,
      messages: [
        {
          role: 'user',
          content: `You are a Miami-based photographer named Maikel Marshall. Generate a SHORT, personalized DM message (max 2 sentences) for this Instagram profile:

Profile: @${profile.username}
Bio: ${profile.bio}
Followers: ${profile.followers}
Content type: ${profile.type}

Message should be in English if profile looks English-speaking, Spanish if bio mentions Spanish. Be authentic and reference something specific about their content.`
        }
      ]
    });

    return message.content[0].type === 'text' ? message.content[0].text : '';
  } catch (error) {
    console.error('Claude API error:', error.message);
    return 'Hey! I love your content. Would be interested in doing a collab?';
  }
}

async function checkIfLeadExists(username) {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_LEADS_DB_ID,
      filter: {
        property: 'Nombre',
        title: {
          contains: username
        }
      }
    });
    return response.results.length > 0;
  } catch (error) {
    console.error('Error checking lead:', error.message);
    return false;
  }
}

async function addLeadToNotion(profile, message) {
  try {
    const pageId = await notion.pages.create({
      parent: { database_id: process.env.NOTION_LEADS_DB_ID },
      properties: {
        'Nombre': { title: [{ text: { content: `@${profile.username}` } }] },
        'Servicio': { select: { name: 'Portfolio Review/Collab' } },
        'Estado': { select: { name: 'Lead Encontrado' } },
        'Canal': { select: { name: 'Instagram DM' } },
        'Idioma': { select: { name: profile.language === 'es' ? 'Español' : 'English' } },
        'Mensaje': { rich_text: [{ text: { content: message } }] },
        'Fecha': { date: { start: new Date().toISOString() } },
        'Notas': {
          rich_text: [{
            text: {
              content: `Followers: ${profile.followers} | Bio: ${profile.bio.substring(0, 100)}`
            }
          }]
        },
        'Seguimiento': { checkbox: false }
      }
    });
    return pageId;
  } catch (error) {
    console.error('Error adding lead to Notion:', error.message);
    return null;
  }
}

async function scrapeLeads() {
  console.log('🔍 Starting lead scraper...\n');

  if (!process.env.NOTION_API_KEY || !process.env.NOTION_LEADS_DB_ID) {
    console.error('❌ Missing NOTION_API_KEY or NOTION_LEADS_DB_ID in .env');
    process.exit(1);
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ Missing ANTHROPIC_API_KEY in .env');
    process.exit(1);
  }

  console.log('⚠️  Note: This is a DEMO scraper.');
  console.log('In production, you would use Instagram Basic Display API or web scraping library.\n');

  // Mock data for demonstration
  const mockProfiles = [
    {
      username: 'miami_model_23',
      followers: 5420,
      bio: 'Fashion model 👗 Miami, FL | Bookings: DM',
      type: 'Model',
      language: 'en'
    },
    {
      username: 'brickell_content_creator',
      followers: 8900,
      bio: '📸 Content Creator | Brickell | Influencer marketing',
      type: 'Creator',
      language: 'en'
    },
    {
      username: 'fotografia_miamense',
      followers: 3200,
      bio: 'Fotógrafa 📷 Retrato + Lifestyle | Miami 🌴',
      type: 'Photographer',
      language: 'es'
    },
    {
      username: 'wynwood_artist_studio',
      followers: 6700,
      bio: 'Artist & content creator | Wynwood, Miami',
      type: 'Artist',
      language: 'en'
    }
  ];

  const foundLeads = [];

  for (const profile of mockProfiles) {
    // Check if already in CRM
    const exists = await checkIfLeadExists(profile.username);

    if (!exists && profile.followers >= 500 && profile.followers <= 100000) {
      console.log(`✅ Potential lead: @${profile.username} (${profile.followers} followers)`);

      const personalizedMessage = await generatePersonalizedMessage(profile);
      const leadId = await addLeadToNotion(profile, personalizedMessage);

      if (leadId) {
        foundLeads.push({
          username: profile.username,
          followers: profile.followers,
          message: personalizedMessage
        });
        console.log(`   ➜ Added to Notion CRM`);
      }
      console.log('');
    }
  }

  // Report
  console.log('═══════════════════════════════════════════════════════');
  console.log(`📊 DAILY LEAD SCRAPER REPORT — ${new Date().toLocaleDateString()}`);
  console.log('═══════════════════════════════════════════════════════');
  console.log(`Total leads checked: ${mockProfiles.length}`);
  console.log(`New leads added: ${foundLeads.length}`);
  console.log('\nTop leads found:');
  foundLeads.slice(0, 10).forEach((lead, i) => {
    console.log(`${i + 1}. @${lead.username} (${lead.followers} followers)`);
    console.log(`   Message: "${lead.message.substring(0, 60)}..."`);
  });
  console.log('═══════════════════════════════════════════════════════\n');
}

scrapeLeads();
