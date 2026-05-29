import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';
import axios from 'axios';
import { Client } from '@notionhq/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const client = new Anthropic();
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  notionVersion: '2022-06-28'
});

const MUAPI_API_KEY = process.env.MUAPI_API_KEY;
const MUAPI_BASE_URL = 'https://api.muapi.ai/v1';

// Hashtags bank (10 rotating groups)
const hashtagsBank = [
  ['#MiamiPhotographer', '#CinematicPortrait', '#EditorialPhotography', '#MiamiArt'],
  ['#PortraitSession', '#FashionPhotography', '#LookbookCreator', '#BrandPhotography'],
  ['#MiamiContentCreator', '#PhotographyStudio', '#ModelPhotography', '#ProfessionalPhotos'],
  ['#VisualStorytelling', '#CinematicContent', '#IndiePhotographer', '#MiamiMadeCreative'],
  ['#PhotoshootReady', '#PortfolioBuilder', '#CreativeDirection', '#BrandAesthetic'],
  ['#MiamiLifestyle', '#UrbanPhotography', '#ArchitectureShots', '#EnvironmentalPortrait'],
  ['#FilmPhotography', '#AnalogVibe', '#LightingMastery', '#CompositionSkills'],
  ['#ContentCalendar', '#SocialMediaReady', '#EngagementBooster', '#CreativeStrategy'],
  ['#TalentPhotography', '#CastingPortraits', '#HeadshotSpecialist', '#BeautyPhotography'],
  ['#DocumentaryStyle', '#StorytellingThroughArt', '#RealMoments', '#AuthenticContent']
];

async function generateContentPrompt(index) {
  const hashtagIndex = index % hashtagsBank.length;
  const hashtags = hashtagsBank[hashtagIndex];
  const platforms = ['Instagram Reel', 'Instagram Story', 'TikTok', 'Pinterest'];
  const platform = platforms[index % platforms.length];

  const prompt = `Generate a creative visual content prompt for a Miami-based cinematic photographer (Maikel Marshall).

Platform: ${platform}
Hashtags: ${hashtags.join(' ')}

Create a prompt that:
1. Describes a visually striking scene or mood that would appeal to fashion/editorial/portrait audiences
2. Includes specific lighting, colors, and atmosphere details
3. Mentions the mood: cinematic, moody, professional, artistic
4. References Miami aesthetic or urban environment
5. Suggests props, styling, or composition elements

Format as a single paragraph image generation prompt (max 150 words).
Keep it specific enough for AI image generation but artistic in tone.`;

  const message = await client.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 200,
    messages: [{ role: 'user', content: prompt }]
  });

  return message.content[0].text;
}

async function generateImageWithMUAPI(prompt) {
  try {
    console.log('[MUAPI] Generating image with prompt:', prompt.substring(0, 100) + '...');

    const response = await axios.post(
      `${MUAPI_BASE_URL}/images/generations`,
      {
        prompt: prompt,
        model: 'flux-pro',
        width: 1080,
        height: 1080,
        num_images: 1,
        quality: 'hd'
      },
      {
        headers: {
          'Authorization': `Bearer ${MUAPI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data.data && response.data.data.length > 0) {
      const imageUrl = response.data.data[0].url;
      console.log('[MUAPI] ✅ Image generated successfully:', imageUrl);
      return imageUrl;
    } else {
      throw new Error('No image data in response');
    }
  } catch (error) {
    console.error('[MUAPI] ❌ Image generation failed:', error.response?.data || error.message);
    return null;
  }
}

async function generateCaption(sessionType, lang = 'en') {
  const prompt = `Write a short, engaging ${lang === 'es' ? 'Spanish' : 'English'} caption for a portrait/editorial photography post.

Session Type: ${sessionType}
Tone: Professional, artistic, slightly cinematic
Length: 2-3 sentences
Include a call-to-action (booking, inquiry, etc.)

${lang === 'es' ? 'Escribe en español:' : 'Write in English:'}`;

  const message = await client.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 150,
    messages: [{ role: 'user', content: prompt }]
  });

  return message.content[0].text;
}

async function saveToNotion(contentData) {
  try {
    const page = await notion.pages.create({
      parent: { database_id: process.env.NOTION_MARKETING_DB_ID },
      properties: {
        'Campaña': { title: [{ text: { content: contentData.title } }] },
        'Plataforma': { select: { name: contentData.platform } },
        'Estado': { select: { name: 'Generado' } },
        'Fecha Inicio': { date: { start: new Date().toISOString().split('T')[0] } },
        'Notas': { rich_text: [{ text: { content: `Type: ${contentData.type}\n\nImage: ${contentData.imageUrl}\n\nEN: ${contentData.captionEN}\n\nES: ${contentData.captionES}\n\nHashtags: ${contentData.hashtags.join(' ')}` } }] }
      }
    });

    console.log('[NOTION] ✅ Content saved to Notion:', page.id);
    return page.id;
  } catch (error) {
    console.error('[NOTION] ❌ Failed to save to Notion:', error.message);
    return null;
  }
}

async function generateWeeklyContent(count = 5) {
  console.log('[MUAPI-GENERATOR] Starting content generation for', count, 'items');

  const outputDir = path.join(__dirname, '../output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const generatedContent = [];
  const sessionTypes = ['Portrait Session', 'Editorial Shoot', 'Fashion Lookbook', 'Brand Photography', 'Event Coverage'];

  for (let i = 0; i < count; i++) {
    try {
      console.log(`\n[MUAPI-GENERATOR] Generating content ${i + 1}/${count}...`);

      const sessionType = sessionTypes[i % sessionTypes.length];
      const hashtagIndex = i % hashtagsBank.length;
      const hashtags = hashtagsBank[hashtagIndex];

      // Generate prompt
      console.log('[MUAPI-GENERATOR] Creating visual prompt...');
      const visualPrompt = await generateContentPrompt(i);

      // Generate image
      console.log('[MUAPI-GENERATOR] Generating image from MUAPI...');
      const imageUrl = await generateImageWithMUAPI(visualPrompt);

      // Generate captions
      console.log('[MUAPI-GENERATOR] Creating captions...');
      const captionEN = await generateCaption(sessionType, 'en');
      const captionES = await generateCaption(sessionType, 'es');

      const contentData = {
        title: `AI Generated - ${sessionType} ${i + 1}`,
        type: 'AI Generated',
        platform: ['Instagram Reel', 'Instagram Story', 'TikTok', 'Pinterest'][i % 4],
        imageUrl: imageUrl || 'https://via.placeholder.com/1080x1080?text=Image+Pending',
        captionEN,
        captionES,
        hashtags,
        visualPrompt
      };

      // Save to Notion
      console.log('[MUAPI-GENERATOR] Saving to Notion...');
      const notionId = await saveToNotion(contentData);

      generatedContent.push({
        ...contentData,
        notionId,
        generatedAt: new Date().toISOString()
      });

      console.log(`[MUAPI-GENERATOR] ✅ Content ${i + 1} completed`);

      // Rate limiting - wait 2 seconds between generations
      if (i < count - 1) {
        console.log('[MUAPI-GENERATOR] Waiting 2 seconds before next generation...');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

    } catch (error) {
      console.error(`[MUAPI-GENERATOR] ❌ Error generating content ${i + 1}:`, error.message);
    }
  }

  // Save summary to file
  const summaryPath = path.join(outputDir, `muapi-content-${new Date().toISOString().split('T')[0]}.json`);
  fs.writeFileSync(summaryPath, JSON.stringify(generatedContent, null, 2));
  console.log('\n[MUAPI-GENERATOR] ✅ Content generation complete!');
  console.log(`[MUAPI-GENERATOR] Summary saved to: ${summaryPath}`);
  console.log(`[MUAPI-GENERATOR] Generated ${generatedContent.length} content pieces`);

  return generatedContent;
}

// Run if called directly
const count = parseInt(process.argv[2]) || 5;
generateWeeklyContent(count).catch(console.error);
