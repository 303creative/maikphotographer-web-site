import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const CONTENT_CALENDAR = {
  monday: 'Behind the scenes',
  wednesday: 'Portfolio highlight',
  friday: 'Client feature/testimonial',
  sunday: 'Session availability'
};

const MIAMI_HASHTAGS = [
  '#maikphotographer',
  '#miamiphotographer',
  '#miamiportrait',
  '#editorialmiami',
  '#fashionmiami',
  '#cinematicportrait',
  '#miamimodel',
  '#portraitphotographer',
  '#miamicreator',
  '#brickellmiami',
  '#wynwoodmiami',
  '#miamistudio',
  '#portraitlove',
  '#editorialfeature',
  '#miamiphotography'
];

async function generateContentCaption(dayTheme, language = 'en') {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 300,
      messages: [
        {
          role: 'user',
          content: `You are a Miami-based luxury photographer's Instagram content strategist. Generate a SINGLE caption for an Instagram post about: "${dayTheme}"

Requirements:
- Language: ${language === 'es' ? 'Spanish' : 'English'}
- Keep it under 200 characters for the main caption
- Include 1-2 emojis max
- Professional but authentic tone
- Suitable for luxury photography brand
- End with a soft CTA (like "📸 DM for bookings" or "Bookings open for [season]")

Format the response as:
CAPTION: [your caption here]
CTA: [call to action]`
        }
      ]
    });

    return message.content[0].type === 'text' ? message.content[0].text : '';
  } catch (error) {
    console.error('Claude error:', error.message);
    return `CAPTION: ${dayTheme} 📸\nCTA: Book a session`;
  }
}

async function generateWeeklyContent() {
  try {
    console.log('📱 Generating weekly content calendar...\n');

    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('❌ ANTHROPIC_API_KEY not found in .env');
    }

    const weekContent = {};
    const days = Object.keys(CONTENT_CALENDAR);

    for (const day of days) {
      const theme = CONTENT_CALENDAR[day];
      console.log(`📝 ${day.toUpperCase()}: "${theme}"`);

      const captionES = await generateContentCaption(theme, 'es');
      const captionEN = await generateContentCaption(theme, 'en');

      weekContent[day] = {
        theme,
        captionES: captionES.split('\n')[0].replace('CAPTION: ', ''),
        captionEN: captionEN.split('\n')[0].replace('CAPTION: ', ''),
        cta: captionEN.split('\n')[1]?.replace('CTA: ', '') || 'DM for bookings',
        hashtags: MIAMI_HASHTAGS,
        bestTime: ['09:00', '18:00'][Math.floor(Math.random() * 2)], // 9 AM or 6 PM
        storyIdea: `Story template for ${theme}`
      };

      console.log(`   EN: ${weekContent[day].captionEN.substring(0, 60)}...`);
      console.log(`   ES: ${weekContent[day].captionES.substring(0, 60)}...\n`);
    }

    // Write to markdown file
    const date = new Date();
    const weekStart = new Date(date.setDate(date.getDate() - date.getDay()));
    const filename = `content-calendar-week-${weekStart.toISOString().split('T')[0]}.md`;
    const filepath = path.resolve('automation/content-calendars', filename);

    // Create directory if it doesn't exist
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    let markdown = `# 📱 Weekly Content Calendar\n\n`;
    markdown += `**Week of:** ${weekStart.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}\n\n`;

    Object.entries(weekContent).forEach(([day, content]) => {
      markdown += `## ${day.charAt(0).toUpperCase() + day.slice(1)}\n`;
      markdown += `**Theme:** ${content.theme}\n\n`;
      markdown += `### Captions\n`;
      markdown += `**EN:** ${content.captionEN}\n`;
      markdown += `**ES:** ${content.captionES}\n\n`;
      markdown += `**Best Time to Post:** ${content.bestTime}\n\n`;
      markdown += `### Hashtags (pick top 15)\n`;
      markdown += `${content.hashtags.join(' ')}\n\n`;
      markdown += `### Story Idea\n`;
      markdown += `${content.storyIdea}\n\n`;
      markdown += `---\n\n`;
    });

    fs.writeFileSync(filepath, markdown);

    console.log('═══════════════════════════════════════════════════════');
    console.log('✅ WEEKLY CONTENT CALENDAR GENERATED');
    console.log('═══════════════════════════════════════════════════════');
    console.log(`📄 Saved to: ${filepath}`);
    console.log('\n📊 STATS:');
    console.log(`Posts scheduled: 4`);
    console.log(`Languages: English + Spanish`);
    console.log(`Total hashtags available: ${MIAMI_HASHTAGS.length}`);
    console.log(`AI-generated captions: ${days.length * 2}\n`);

  } catch (error) {
    console.error('❌ Content generation failed:', error.message);
    process.exit(1);
  }
}

generateWeeklyContent();
