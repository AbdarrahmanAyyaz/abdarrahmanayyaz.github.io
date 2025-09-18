# Portfolio Homepage Redesign - Implementation Prompt

## Project Overview
Redesign the homepage of abdarrahman.dev to feature a prominent chat interface alongside condensed hero content. The current design has the chat buried below the fold - we want to make it the star feature.

## Current Site Analysis
- Site: https://abdarrahman.dev
- Current layout: Full-width hero with chat interface below
- Tech stack appears to be React/Next.js with Tailwind CSS
- Dark theme with purple accent colors
- Chat interface exists but needs to be moved and expanded

## Target Layout Design

### Desktop Layout (40/60 split):
```
┌─────────────────────────────────────────────────────────┐
│ Navigation (unchanged)                                   │
├────────────────────┬────────────────────────────────────┤
│ Left Column (40%)  │ Right Column (60%)                 │
│                    │                                    │
│ Hero Content:      │ Chat Interface:                    │
│ • Name/Title       │ • "Chat with AI Abdarrahman 🤖"   │
│ • Tagline          │ • Full chat component             │
│ • Metrics          │ • Expanded height                  │
│ • Action buttons   │ • Better visibility                │
│ • Mini project     │                                    │
│   links            │                                    │
└────────────────────┴────────────────────────────────────┘
```

## Specific Requirements

### Left Column Content (40% width):
1. **Hero Section:**
   - Name: "Abdarrahman Ayyaz"
   - Tagline: "I build AI apps and cut mean-time-to-resolution on OCI."
   - Keep existing metrics: "3 AI demos", "100s+ users helped", "5+ tools shipped"

2. **Action Buttons:**
   - "View Projects" (purple button)
   - "Download Resume" (secondary button)

3. **Mini Featured Projects Section:**
   ```
   Featured Work:
   → Advancely - AI success dashboard
   → TriagedAI - Technical support companion  
   → Multi-Class Tumor Segmentation - Medical ML
   
   View All Projects →
   ```

### Right Column - Chat Interface (60% width):
- Move existing chat component from its current position
- Expand it to fill the right column
- Maintain current functionality and styling
- Ensure it's responsive and prominent

### Responsive Design:
- **Mobile**: Stack chat below hero content (single column)
- **Tablet**: Adjust to 45/55 split if needed
- Maintain existing dark theme and purple accent colors

## Technical Tasks

### 1. Layout Restructure:
- [ ] Create CSS Grid or Flexbox layout for 40/60 split
- [ ] Move hero content to left column container
- [ ] Extract and relocate chat component to right column
- [ ] Ensure proper spacing and alignment

### 2. Hero Content Optimization:
- [ ] Condense hero content to fit 40% width effectively
- [ ] Replace large project cards with compact text links
- [ ] Style mini project links with hover effects
- [ ] Maintain visual hierarchy and readability

### 3. Chat Interface Enhancement:
- [ ] Expand chat component to utilize full right column
- [ ] Ensure chat functionality remains intact after move
- [ ] Optimize chat height and scrolling behavior
- [ ] Test real-time features in new position

### 4. Responsive Implementation:
- [ ] Mobile: Stack layout vertically
- [ ] Tablet: Adjust column ratios appropriately  
- [ ] Test across different screen sizes
- [ ] Ensure touch interactions work on mobile

### 5. Visual Polish:
- [ ] Maintain existing dark theme consistency
- [ ] Ensure proper contrast and accessibility
- [ ] Add subtle hover effects where appropriate
- [ ] Test loading states and animations

## Files Likely to Modify:
- Homepage/index component
- Chat component (extraction and positioning)
- CSS/Tailwind styles for layout
- Any responsive breakpoint configurations

## Success Criteria:
- Chat interface is immediately visible and prominent
- Hero content is condensed but still impactful
- Featured projects are accessible but don't dominate
- Mobile experience remains excellent
- All existing functionality is preserved
- Page loads quickly and smoothly

## Design Reference:
The user provided screenshots showing the current implementation. The goal is to make the chat interface the primary feature while keeping essential information easily accessible.

## Notes:
- Preserve existing branding and color scheme
- Maintain the friendly AI assistant personality in chat
- Keep existing metrics and tagline (they're effective)
- Ensure SEO and accessibility standards are maintained