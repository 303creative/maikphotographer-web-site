# Skills Directory — Agent Guidelines

This directory contains skill modules that guide specialized agents working on the maikphotographer.com project.

## Available Skills

### 1. **taste-skill.md** — Design & UX
Use when working on visual design, layout, spacing, typography, or component styling.

**Covers:**
- Taste Skill philosophy ("Less Slop, Designs Pop")
- Color palette and theming
- Typography hierarchy and scaling
- Spacing system and patterns
- Responsive design breakpoints
- Component design standards
- Transition and motion guidelines

**When to use:** Any design task, audit, or component improvement

---

### 2. **marketing-skill.md** — Content & Strategy
Use when writing copy, optimizing messaging, or improving conversion.

**Covers:**
- Brand voice and tone of voice
- Copywriting templates by section
- Value propositions
- Audience segmentation
- Social proof elements
- Conversion optimization
- Marketing calendar ideas
- Tool and platform strategy

**When to use:** Copy review, content creation, SEO optimization, messaging improvement

---

### 3. **photography-skill.md** — Visual Standards
Use when auditing images, reviewing quality, or optimizing visual assets.

**Covers:**
- Photography style guide (cinematic aesthetic)
- Editing standards and color grading
- Portfolio curation rules
- Web image specifications
- Lighting setups
- Lens choices and composition
- Technical shooting checklist
- Common issues and fixes

**When to use:** Image audit, quality control, photography direction

---

### 4. **branding-skill.md** — Visual Identity
Use when maintaining brand consistency across all assets and touchpoints.

**Covers:**
- Brand identity and pillars
- Color palette usage rules
- Typography system
- Spacing system
- Component patterns
- Logo usage guidelines
- Imagery style
- Interaction design
- Consistency checklist

**When to use:** Brand compliance audit, component design, visual consistency check

---

### 5. **automation-skill.md** — Workflows & Integration
Use when planning automated tasks, setting up agent workflows, or defining quality gates.

**Covers:**
- Agent roles and responsibilities
- Automation workflows (weekly/monthly)
- Quality gates for code and content
- Agent prompts library
- Communication formats
- Priority levels
- Monthly agent agenda
- Metrics to track
- Failure handling

**When to use:** Planning agent tasks, setting up automation, defining workflows

---

## How to Use These Skills

### For Design Work
1. Read **taste-skill.md** completely
2. Use color palette exactly as specified
3. Follow spacing scale (48px+ cards, 96px+ sections)
4. Apply typography hierarchy
5. Verify responsive design
6. Check transition durations and easing
7. Cross-reference **branding-skill.md** for component patterns

### For Marketing/Copy Work
1. Read **marketing-skill.md** completely
2. Review brand voice rules
3. Use copywriting templates
4. Remove generic marketing language
5. Verify CTAs are clear and action-oriented
6. Check audience alignment
7. Cross-reference **automation-skill.md** for content calendars

### For Photography/Image Work
1. Read **photography-skill.md** completely
2. Audit technical quality (sharpness, exposure, composition)
3. Verify editing consistency
4. Check color grading matches brand
5. Confirm web image specs (size, format, quality)
6. Review portfolio curation rules
7. Cross-reference **branding-skill.md** for visual identity

### For Quality Audits
1. Read **automation-skill.md** completely
2. Run appropriate quality gates
3. Document findings
4. Prioritize issues (high/medium/low)
5. Create task list for fixes
6. Cross-reference specific skills for fixes

---

## Agent Workflow Example

**Scenario**: New portfolio image added

```
1. PHOTOGRAPHY AGENT reads photography-skill.md
   → Audits image quality, editing, specs
   → Reports findings

2. DESIGN AGENT reads branding-skill.md + taste-skill.md
   → Verifies layout, spacing, responsive design
   → Suggests CSS changes if needed

3. MARKETING AGENT reads marketing-skill.md
   → Writes image caption/description
   → Ensures SEO optimization

4. Automation happens:
   → CSS changes reviewed by DESIGN
   → Copy approved by brand voice rules
   → Image specs confirmed
   → Item deployed
```

---

## Priority Reference

### High Priority (Fix immediately)
- Performance issues (LCP > 2.5s)
- Accessibility problems (contrast < 4.5:1)
- Broken links or missing images
- Brand voice violations
- Image quality issues

### Medium Priority (Fix this week)
- Design debt
- Copy tone improvements
- Image optimization
- SEO enhancements
- Responsive design issues

### Low Priority (Fix this month)
- Minor consistency issues
- Copy refinements
- Animation tweaks
- Documentation updates

---

## Quality Gates

### Before Deploying Code
```
DESIGN:       Colors, spacing, typography, responsiveness
MARKETING:    Copy tone, SEO, CTAs
PERFORMANCE:  File sizes, load times, metrics
```

### Before Publishing Content
```
MARKETING:    Brand voice, keywords, CTAs
DESIGN:       Layout, accessibility, spacing
PHOTOGRAPHY:  Image quality, sizing, consistency
```

---

## Monthly Agent Tasks

**Week 1:**
- Content audit (MARKETING)
- Design consistency (DESIGN)
- Performance report (PERFORMANCE)

**Week 2:**
- Copy tone check (MARKETING)
- Image quality audit (PHOTOGRAPHY)
- SEO optimization (MARKETING)

**Week 3:**
- Social content planning (CONTENT)
- Responsive design test (DESIGN)
- Performance trends (PERFORMANCE)

**Week 4:**
- Full site audit (ALL)
- Quality metrics review (ALL)
- Next month planning (ALL)

---

## Contact & Escalation

**If a skill is ambiguous:**
- Refer to the specific skill file section
- Cross-reference with other skills if needed
- Document the ambiguity for future updates

**If multiple skills conflict:**
- BRANDING-SKILL takes precedence (brand identity is non-negotiable)
- AUTOMATION-SKILL provides workflow context
- Others provide tactical guidance

**If something is truly unclear:**
- Flag for human review
- Document the edge case
- Update skills if this becomes recurring

---

## Updating Skills

Skills are living documents. Update when:
- Brand standards change
- New workflows are defined
- New agents join the team
- Lessons learned from audits

**Update format:**
1. Note what changed and why
2. Update the relevant skill file
3. Communicate change to team
4. Archive old version

---

**These skills are your agents' handbook. Keep them up-to-date and refer to them constantly.**

Good luck! 🚀
