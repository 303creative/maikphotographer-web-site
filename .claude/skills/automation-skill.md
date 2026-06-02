# Automation Skill — Workflow & Agent Integration

## Objetivo
Guiar agentes en automatizar tareas recurrentes del proyecto.

---

## 1. AGENT ROLES & RESPONSIBILITIES

### DESIGN AGENT
**Purpose**: Improve visual consistency and UX

**Tasks**:
- Audit design for brand compliance (colors, spacing, typography)
- Check responsive design (desktop/tablet/mobile)
- Suggest component improvements
- Review hover states and transitions
- Verify icon/logo usage

**Input**: Design file paths or component descriptions
**Output**: List of design improvements with specific fixes
**Tools**: Read, Grep, Edit (CSS files)

---

### MARKETING AGENT
**Purpose**: Optimize copy and conversion

**Tasks**:
- Audit page copy against tone guidelines
- Remove generic marketing language
- Rewrite CTAs for clarity
- Create social media captions
- Generate email campaign copy
- Build landing page headlines

**Input**: Page content, product/service description
**Output**: Improved copy with brand voice
**Tools**: Read, Edit (HTML files), Write (new content)

---

### PERFORMANCE AGENT
**Purpose**: Optimize speed and efficiency

**Tasks**:
- Audit image sizes and compression
- Check page load times
- Identify JavaScript optimization opportunities
- Suggest asset caching strategies
- Review CSS for unused styles
- Analyze Core Web Vitals

**Input**: URL or file paths
**Output**: Performance report with fixes
**Tools**: Bash (curl, lighthouse), Grep, Read

---

### PHOTOGRAPHY AGENT
**Purpose**: Maintain visual standards

**Tasks**:
- Audit portfolio images for technical quality
- Check editing consistency across batch
- Verify color grading matches brand
- Suggest shot replacements
- Create shot lists for upcoming shoots
- Optimize images for web

**Input**: Image paths or shoot descriptions
**Output**: Quality report and recommendations
**Tools**: Read, Bash (identify, jpegoptim)

---

### CONTENT AGENT
**Purpose**: Keep content fresh and engaging

**Tasks**:
- Update portfolio descriptions
- Create blog post outlines
- Generate behind-the-scenes captions
- Build service descriptions
- Create email sequences
- Write case study templates

**Input**: Topic or product info
**Output**: Ready-to-publish content
**Tools**: Read, Edit (HTML/MD files), Write

---

## 2. AUTOMATION WORKFLOWS

### Weekly Tasks

**Monday: Content Audit**
```
Agent: MARKETING
Task:  Review homepage copy for outdated references
Input: /public/index.html
Output: List of copy updates needed
```

**Wednesday: Design Consistency Check**
```
Agent: DESIGN
Task:  Audit entire site for design debt
Input: /public/css/main.css + /public/index.html
Output: List of CSS fixes needed
```

**Friday: Performance Report**
```
Agent: PERFORMANCE
Task:  Check page speed and metrics
Input: https://www.maikphotographer.com
Output: Performance score + optimization list
```

---

### Monthly Tasks

**Photography Audit**
```
Agent: PHOTOGRAPHY
Task:  Review portfolio for technical quality
Input: /public/assets/portfolio/
Output: List of images to replace/reedit
```

**Content Calendar Planning**
```
Agent: CONTENT
Task:  Plan next month's social/email content
Input: Marketing calendar + past performance data
Output: Content calendar with post ideas
```

**SEO Optimization**
```
Agent: MARKETING
Task:  Audit meta tags, headings, alt text
Input: All HTML pages
Output: SEO improvements list
```

---

### Project-Based Tasks

**New Portfolio Addition**
```
Agents: PHOTOGRAPHY → DESIGN → MARKETING
Flow:
1. PHOTOGRAPHY validates image quality
2. DESIGN optimizes sizing/placement
3. MARKETING writes caption/description
Output: Portfolio item ready to deploy
```

**Service Description Refresh**
```
Agents: MARKETING → DESIGN
Flow:
1. MARKETING rewrites copy
2. DESIGN ensures visual supports copy
Output: Updated service section
```

**New Project Launch**
```
Agents: CONTENT → MARKETING → DESIGN
Flow:
1. CONTENT creates case study/overview
2. MARKETING optimizes messaging
3. DESIGN ensures visual presentation
Output: Complete project showcase
```

---

## 3. AUTOMATION RULES

### When to Run Agents

**Automatically (Daily)**
```
[ ] Website uptime check
[ ] Analytics data pull (if connected)
[ ] Social media monitoring (if connected)
```

**On Trigger (When file changes)**
```
[ ] CSS changes → DESIGN agent audits
[ ] HTML changes → MARKETING agent reviews copy
[ ] New images → PHOTOGRAPHY agent checks quality
[ ] New text → MARKETING agent checks tone
```

**Scheduled (Weekly/Monthly)**
```
[ ] Monday: Content audit
[ ] Wednesday: Design consistency
[ ] Friday: Performance report
[ ] Month-end: Full site audit
```

---

## 4. QUALITY GATES

### Code Changes
Before merging code:
```
DESIGN AGENT:
✓ CSS follows variable system
✓ Spacing uses scale (no random values)
✓ Colors from palette only
✓ Typography hierarchy correct
✓ Responsive design verified

MARKETING AGENT:
✓ Copy matches brand voice
✓ No generic marketing language
✓ CTAs are clear and action-oriented
✓ Meta tags present and accurate

PERFORMANCE AGENT:
✓ No new images > 2 MB
✓ CSS file size < 50 KB
✓ JS file size < 50 KB
✓ LCP < 2.5s projected
```

### Content Changes
Before publishing content:
```
MARKETING AGENT:
✓ Copy follows brand voice
✓ SEO keywords included
✓ CTAs present
✓ Tone matches audience

DESIGN AGENT:
✓ Layout responsive
✓ Colors accessible (contrast OK)
✓ Spacing consistent

PHOTOGRAPHY AGENT:
✓ Images technical quality OK
✓ Editing consistent
✓ File sizes optimized
```

---

## 5. AGENT PROMPTS LIBRARY

### Design Audit Prompt
```
Audit /public/index.html and /public/css/main.css:
1. Do all colors match brand palette (#0A0A0A, #FF5722, #8A8A8E)?
2. Is spacing consistent (48px+ cards, 96px+ sections)?
3. Are all border-radius values 10-16px (not 2-4px)?
4. Do transitions use smooth easing (150-300ms)?
5. Is typography hierarchy correct (H1/H2/H3/body)?

Report: Color mismatches, spacing violations, typography issues, 
and specific CSS fixes needed.
```

### Marketing Copy Audit Prompt
```
Review this copy against the brand guidelines:
1. Does it match cinematic, authentic, strategic tone?
2. Are there any generic marketing phrases to remove?
3. Are CTAs clear and action-oriented?
4. Does it tell a story vs just listing features?
5. Is the target audience clear?

Report: Rewrite suggestions with improved copy.
```

### Photography Quality Prompt
```
Audit these images for professional standards:
1. Are all images technically sharp (no motion blur)?
2. Is editing consistent across the batch?
3. Do skin tones look warm and natural?
4. Is there proper contrast (no crushed blacks/blown highlights)?
5. Do images match cinematic aesthetic?

Report: Which images to keep/replace with reasons.
```

---

## 6. AGENT COMMUNICATION

### Inputs Agents Accept
```
File paths:        /public/index.html, /public/css/main.css
URLs:              https://www.maikphotographer.com
Descriptions:      "Review portfolio copy", "Optimize images"
Data:              Analytics, performance metrics, audit results
```

### Outputs Agents Produce
```
Lists:             Audit findings, improvement suggestions
Code:              CSS fixes, HTML updates, copy rewrites
Reports:           Performance, quality, compliance
Recommendations:   Next steps, priorities, timelines
```

### Communication Format
```
Agent input:  "Task: [What], File: [Where], Context: [Why]"
Agent output: "Finding: [What], Fix: [How], Priority: [When]"
```

---

## 7. AUTOMATION PRIORITIES

### High Priority (Fix ASAP)
```
Performance issues (LCP > 2.5s)
Accessibility problems (contrast < 4.5:1)
Broken links or missing images
Copy with brand voice mismatches
Image quality issues (soft, blown, crushed)
```

### Medium Priority (Fix This Week)
```
Design debt (spacing, colors, radii)
Copy tone improvements
Image optimization
SEO enhancements
Responsiveness on mobile
```

### Low Priority (Fix This Month)
```
Minor design consistency
Copy refinements
Animation performance
Component refactoring
Documentation updates
```

---

## 8. METRICS TO TRACK

### Performance
```
LCP (Largest Contentful Paint):     < 2.5s
FID (First Input Delay):             < 100ms
CLS (Cumulative Layout Shift):       < 0.1
Page load time:                      < 3s
```

### Quality
```
Design compliance:                   > 95%
Copy brand voice match:              > 90%
Image technical quality:             > 95%
Responsive design:                   100%
```

### User Engagement
```
Bounce rate:                         < 40%
Avg session duration:                > 2 min
Portfolio clicks:                    > 30%
Contact form submissions:            Track weekly
```

---

## 9. MONTHLY AGENT AGENDA

```
Week 1:
  MON - Content audit
  WED - Design consistency
  FRI - Performance report

Week 2:
  MON - Copy tone check
  WED - Image quality audit
  FRI - SEO optimization

Week 3:
  MON - Social media content planning
  WED - Responsive design test
  FRI - Performance trend analysis

Week 4:
  MON - Monthly site audit
  WED - Quality metrics review
  FRI - Next month planning
```

---

## 10. FAILURE HANDLING

### If Agent Finds Issues

```
Low Risk (style/tone):
  Action: Approve and apply immediately
  Review: MARKETING agent
  Timeline: Same day

Medium Risk (performance/SEO):
  Action: Audit deeper before applying
  Review: DESIGN + PERFORMANCE agents
  Timeline: This week

High Risk (accessibility/functionality):
  Action: Manual review + testing
  Review: All agents + human
  Timeline: Immediate
```

---

## 11. AGENT ESCALATION PATH

```
Issue found by AGENT A
  ↓
Attempt fix within skill
  ↓
If risk is HIGH → Escalate to human
If risk is LOW/MEDIUM → Apply with review
  ↓
Document change
  ↓
Schedule next audit
```

---

## 12. AGENT SKILL REQUIREMENTS

### DESIGN AGENT Must Know
- CSS variables and theming
- Responsive design patterns
- Color theory and accessibility
- Typography hierarchy
- Component libraries

### MARKETING AGENT Must Know
- Brand voice and tone
- Copywriting and persuasion
- SEO and keywords
- CTAs and conversion
- Audience segmentation

### PERFORMANCE AGENT Must Know
- Web Core Vitals
- Image optimization
- Caching strategies
- Asset bundling
- Metrics and monitoring

### PHOTOGRAPHY AGENT Must Know
- Technical photography standards
- Editing and color grading
- Composition and framing
- Web image optimization
- Visual storytelling

### CONTENT AGENT Must Know
- Brand storytelling
- Long-form writing
- Social media formats
- Email marketing
- Content calendars

---

**Automation = Consistency + Scale**

Skills files are your agent handbook. Update when brand standards change.
