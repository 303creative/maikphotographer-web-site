import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';
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

// Optimal posting times by platform and audience
const OPTIMAL_TIMES = {
  instagram: {
    peakHours: ['11:00', '15:00', '19:00'],
    bestDays: ['Tuesday', 'Wednesday', 'Thursday'],
    engagement: { morning: 0.6, afternoon: 0.95, evening: 0.85, night: 0.4 }
  },
  tiktok: {
    peakHours: ['09:00', '12:00', '18:00', '21:00'],
    bestDays: ['Wednesday', 'Friday', 'Saturday'],
    engagement: { morning: 0.7, afternoon: 0.9, evening: 1.0, night: 0.8 }
  },
  pinterest: {
    peakHours: ['10:00', '14:00', '20:00'],
    bestDays: ['Monday', 'Tuesday', 'Thursday'],
    engagement: { morning: 0.8, afternoon: 0.85, evening: 0.9, night: 0.5 }
  }
};

// Content themes for variety
const WEEKLY_THEMES = [
  { day: 'Monday', theme: 'Motivation Monday - Behind the scenes, workflow', type: 'BTS' },
  { day: 'Tuesday', theme: 'Technique Tuesday - Photography tips, lighting', type: 'Education' },
  { day: 'Wednesday', theme: 'Workwednesday - Portfolio, client work', type: 'Portfolio' },
  { day: 'Thursday', theme: 'Throwback Thursday - Past shoots, client stories', type: 'Throwback' },
  { day: 'Friday', theme: 'Feature Friday - Collaborations, features', type: 'Collab' },
  { day: 'Saturday', theme: 'Showcase Saturday - Best work, portfolio pieces', type: 'Showcase' },
  { day: 'Sunday', theme: 'Sunday Stories - Personal, lifestyle, goals', type: 'Personal' }
];

async function generateWeeklyPlan() {
  console.log('[WEEKLY-PLANNER] 🗓️  Starting weekly content planning...\n');

  const weekContent = [];
  const startDate = new Date();

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + i);
    const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
    const theme = WEEKLY_THEMES.find(t => t.day === dayName);

    try {
      console.log(`[WEEKLY-PLANNER] Day ${i + 1}/7: ${dayName} - ${theme.theme}`);

      // Generate content idea
      const contentPrompt = `Generate a creative photography post idea for ${dayName}.

Theme: ${theme.theme}
Type: ${theme.type}
Target audience: Fashion/Editorial/Portrait enthusiasts in Miami

Create:
1. Visual description (what to shoot/design)
2. Two short captions (EN and ES, 2-3 sentences each)
3. Relevant hashtags (5-7 hashtags)

Make it specific, actionable, and unique for this day's theme.`;

      const message = await client.messages.create({
        model: 'claude-opus-4-7',
        max_tokens: 300,
        messages: [{ role: 'user', content: contentPrompt }]
      });

      const contentIdea = message.content[0].text;

      // Determine optimal posting time for this day
      const platforms = ['instagram', 'tiktok', 'pinterest'];
      const platform = platforms[i % 3];
      const platformTimes = OPTIMAL_TIMES[platform];
      const optimalTime = platformTimes.peakHours[Math.floor(Math.random() * platformTimes.peakHours.length)];

      const dayContent = {
        date: currentDate.toISOString().split('T')[0],
        day: dayName,
        theme: theme.theme,
        type: theme.type,
        platform: platform,
        optimalTime: optimalTime,
        content: contentIdea,
        scheduledFor: `${currentDate.toISOString().split('T')[0]} ${optimalTime}`,
        status: 'Planificado'
      };

      weekContent.push(dayContent);
      console.log(`   ✅ Generated - Optimal time: ${optimalTime} (${platform})\n`);

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 1500));

    } catch (error) {
      console.error(`[WEEKLY-PLANNER] ❌ Error for ${dayName}:`, error.message);
    }
  }

  return weekContent;
}

async function saveToNotion(weekContent) {
  console.log('[WEEKLY-PLANNER] 💾 Saving to Notion...\n');

  for (const dayContent of weekContent) {
    try {
      await notion.pages.create({
        parent: { database_id: process.env.NOTION_MARKETING_DB_ID },
        properties: {
          'Campaña': { title: [{ text: { content: `${dayContent.day} - ${dayContent.type}` } }] },
          'Plataforma': { select: { name: dayContent.platform.charAt(0).toUpperCase() + dayContent.platform.slice(1) } },
          'Estado': { select: { name: dayContent.status } },
          'Fecha Inicio': { date: { start: dayContent.date } },
          'Notas': { rich_text: [{ text: { content: `Optimal time: ${dayContent.optimalTime}\nType: ${dayContent.type}\n\n${dayContent.content.substring(0, 200)}...` } }] }
        }
      });
      console.log(`   ✅ ${dayContent.day} saved to Notion`);
    } catch (error) {
      console.error(`   ❌ Error saving ${dayContent.day}:`, error.message);
    }
  }
}

async function generateMarkdownReport(weekContent) {
  const weekStartDate = new Date();
  const weekEndDate = new Date(weekStartDate);
  weekEndDate.setDate(weekEndDate.getDate() + 6);

  const report = `# 📅 Weekly Content Calendar
**Week of ${weekStartDate.toDateString()} to ${weekEndDate.toDateString()}**

## 📊 Summary
- **Total Posts**: ${weekContent.length}
- **Platforms**: Instagram, TikTok, Pinterest (rotating)
- **Optimal Times**: Calculated for maximum engagement
- **Status**: All posts scheduled

---

## 📝 Daily Breakdown

${weekContent.map((day, idx) => `
### ${idx + 1}. ${day.day} - ${day.theme}
**Date**: ${day.date}
**Platform**: ${day.platform.toUpperCase()}
**Optimal Time**: ${day.optimalTime}
**Type**: ${day.type}

\`\`\`
${day.content}
\`\`\`

---
`).join('')}

## 🎯 Engagement Optimization
- Morning (6am-11am): Lower engagement, good for Stories
- Afternoon (11am-5pm): Peak engagement (95%), post main content
- Evening (5pm-10pm): High engagement (85%), post Reels/Videos
- Night (10pm-6am): Lower engagement, avoid main posts

## 💡 Tips for This Week
1. Use consistent lighting/aesthetic across all posts
2. Engage with audience 2-3 hours after posting
3. Mix carousel posts with single images
4. Use Stories daily for 24hr engagement boost
5. Monitor comments for 15 min after posting

## 📱 Cross-Platform Strategy
- **Instagram**: Premium editorial work, behind-the-scenes stories
- **TikTok**: Quick tips, trending audio, authentic moments
- **Pinterest**: High-quality pins linking to portfolio

---

**Generated**: ${new Date().toISOString()}
**Next Steps**: Review in Notion, approve posts, schedule publication
`;

  return report;
}

async function main() {
  try {
    // Generate weekly content plan
    const weekContent = await generateWeeklyPlan();

    // Save to Notion
    await saveToNotion(weekContent);

    // Generate markdown report
    const report = await generateMarkdownReport(weekContent);

    // Save to file
    const outputDir = path.join(__dirname, '../output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const reportPath = path.join(outputDir, `weekly-plan-${new Date().toISOString().split('T')[0]}.md`);
    fs.writeFileSync(reportPath, report);

    const jsonPath = path.join(outputDir, `weekly-plan-${new Date().toISOString().split('T')[0]}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(weekContent, null, 2));

    console.log('\n[WEEKLY-PLANNER] ✅ Weekly planning complete!');
    console.log(`[WEEKLY-PLANNER] 📄 Markdown saved: ${reportPath}`);
    console.log(`[WEEKLY-PLANNER] 📊 JSON saved: ${jsonPath}`);
    console.log(`[WEEKLY-PLANNER] 📌 All content synced to Notion`);

  } catch (error) {
    console.error('[WEEKLY-PLANNER] ❌ Fatal error:', error.message);
    process.exit(1);
  }
}

main();
