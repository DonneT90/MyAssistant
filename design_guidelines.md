# Design Guidelines: Assistant IA pour Chatteurs OnlyFans

## Design Approach

**Selected Approach**: Design System - Linear/Material Design Hybrid
**Justification**: This is a utility-focused productivity tool requiring efficiency, clarity, and professional aesthetics. The application prioritizes quick access to information, easy copy-paste workflows, and minimal cognitive load during high-pressure client interactions.

**Key Design Principles**:
- Professional minimalism for focused work sessions
- Information density without clutter
- Instant visual feedback for actions
- Dark-first design for extended use comfort
- Zero unnecessary friction in copy-paste workflows

---

## Color Palette

### Dark Mode (Primary)
**Background Colors**:
- Primary Background: 220 15% 8% (deep slate, main canvas)
- Secondary Background: 220 15% 12% (elevated surfaces, cards)
- Tertiary Background: 220 15% 16% (hover states, subtle elevation)

**Text Colors**:
- Primary Text: 220 10% 95% (main content)
- Secondary Text: 220 8% 65% (supporting text, labels)
- Tertiary Text: 220 8% 45% (disabled, timestamps)

**Accent Colors**:
- Primary Accent: 260 100% 65% (vibrant purple for CTAs, active states)
- Success: 142 76% 45% (positive feedback, copy confirmations)
- Warning: 38 92% 50% (phase alerts, important notices)

**Borders & Dividers**:
- Subtle Borders: 220 10% 20% (card outlines, dividers)
- Focus Rings: 260 100% 65% (keyboard navigation)

### Light Mode (Secondary)
**Background Colors**:
- Primary Background: 0 0% 100% (pure white)
- Secondary Background: 220 15% 97% (subtle gray for cards)
- Tertiary Background: 220 15% 94% (hover states)

**Text Colors**:
- Primary Text: 220 15% 15% (main content)
- Secondary Text: 220 10% 40% (supporting text)
- Tertiary Text: 220 8% 60% (disabled states)

---

## Typography

**Font Families**:
- Primary: Inter (via Google Fonts) - for UI elements, body text
- Monospace: JetBrains Mono - for code snippets, technical content

**Type Scale**:
- Hero/Page Title: text-3xl font-semibold (30px)
- Section Headers: text-xl font-semibold (20px)
- Card Titles: text-base font-medium (16px)
- Body Text: text-sm font-normal (14px)
- Small Labels: text-xs font-medium (12px)
- Timestamps: text-xs font-normal (12px)

**Line Heights**:
- Tight: leading-tight (1.25) for headings
- Normal: leading-normal (1.5) for body text
- Relaxed: leading-relaxed (1.625) for long-form content

---

## Layout System

**Spacing Units**: Use Tailwind spacing scale consistently
- Micro spacing: 2, 3 (gaps, padding for compact elements)
- Standard spacing: 4, 6 (component padding, margins)
- Section spacing: 8, 12 (card spacing, major sections)
- Page spacing: 16, 24 (page margins, large separations)

**Grid Structure**:
- Main container: max-w-7xl mx-auto (1280px max width)
- Chat interface: max-w-4xl (768px for optimal readability)
- Sidebar width: w-80 (320px for navigation/context)

**Responsive Breakpoints**:
- Mobile: Base styles (< 640px) - single column, stacked layout
- Tablet: md: (768px+) - introduce sidebar, two-column where appropriate
- Desktop: lg: (1024px+) - full feature set, multi-panel layout

---

## Component Library

### Core Navigation
**Top Navigation Bar**:
- Height: h-16 (64px fixed)
- Background: Secondary background with subtle bottom border
- Content: Logo left, user profile/settings right
- Sticky positioning for persistent access

**Sidebar** (Desktop only):
- Phase indicators (5 phases du chatting)
- Quick access to knowledge base sections
- Client type filters (Nouveau, Ancien, Timewaster, Spender)
- Collapsible on tablet

### Chat Interface Components

**Message Input Area**:
- Large textarea: min-h-24 with auto-expand
- Rounded corners: rounded-xl
- Border: 2px solid with focus state (primary accent)
- Padding: p-4
- Send button: Primary accent background, rounded-lg, px-6 py-3

**AI Response Cards**:
- Background: Secondary background
- Border: 1px subtle border
- Rounded: rounded-lg
- Padding: p-6
- Shadow: Minimal shadow on hover
- Structure:
  - Phase indicator badge (top-left)
  - Main response text (prominent, easy to scan)
  - Emoji suggestions (inline, colorful)
  - Copy button (top-right, always visible)
  - Alternative suggestions (expandable section)

**Suggestion Pills**:
- Inline display: flex flex-wrap gap-2
- Individual pill: px-3 py-1.5, rounded-full
- Background: Tertiary background
- Hover: Subtle scale effect (scale-105)
- Click-to-copy functionality with visual feedback

**Phase Indicator Badges**:
- Small badges: px-2.5 py-1, rounded-md, text-xs
- Colors mapped to phases:
  - Relation: Blue tone (200 70% 55%)
  - Qualification: Green tone (142 60% 50%)
  - Sexualisation: Pink tone (330 75% 55%)
  - Chauffe: Orange tone (25 80% 55%)
  - Script: Purple tone (260 70% 60%)

### Forms & Inputs

**Text Inputs**:
- Height: h-10 for standard inputs
- Padding: px-3 py-2
- Border: 1px with rounded-md
- Dark backgrounds maintained consistently
- Focus: Ring-2 primary accent color

**Select Dropdowns**:
- Custom styled with Heroicons chevron
- Same sizing as text inputs
- Dropdown menu: Secondary background, rounded-lg, shadow-lg

**Buttons**:
- Primary: bg-primary-accent text-white, px-4 py-2, rounded-lg, font-medium
- Secondary: border-2 border-primary-accent text-primary-accent (outline style)
- Ghost: hover:bg-tertiary-background, text-secondary
- Icon buttons: p-2, rounded-md, hover state only
- Copy button: Success color on click, with checkmark icon swap

### Data Display

**Knowledge Base Cards**:
- Grid layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- Card structure:
  - Icon or emoji (top, large size)
  - Title (font-semibold, text-base)
  - Brief description (text-sm, text-secondary)
  - "View Details" link (text-xs, primary accent)
- Hover: Subtle border color change, slight elevation

**Client Type Tags**:
- Small, colored labels: px-2 py-0.5, rounded, text-xs, font-medium
- Nouveau: Blue background (200 70% 40%)
- Ancien: Green background (142 60% 40%)
- Timewaster: Red background (0 70% 45%)
- Spender: Gold background (45 90% 45%)
- Display inline with client context

**Conversation History** (if implemented):
- Timeline layout: border-l-2 on left
- Individual entries: pl-6, pb-6
- Timestamp: Tertiary text, text-xs
- Summary text: text-sm, line-clamp-2

### Overlays & Modals

**Modal Dialogs**:
- Backdrop: bg-black bg-opacity-50 backdrop-blur-sm
- Container: max-w-lg mx-auto, rounded-xl, secondary background
- Padding: p-6
- Header: text-xl font-semibold with close button (top-right)
- Footer: Action buttons right-aligned with gap-3

**Toast Notifications**:
- Position: fixed bottom-4 right-4
- Width: max-w-sm
- Background: Secondary background with border
- Icon left, message center, close button right
- Auto-dismiss after 3 seconds
- Slide-in animation from right

**Loading States**:
- Skeleton loaders: animate-pulse, subtle gray backgrounds
- Spinner: Rotating circle with primary accent color
- Inline: Small spinner next to action buttons when processing

---

## Animations

**Minimal Approach**: Only use animations that provide functional feedback

**Allowed Animations**:
- Copy button: Success checkmark fade-in (200ms)
- Toast notifications: Slide-in from right (300ms ease-out)
- Modal open/close: Fade + scale (200ms)
- Hover states: Subtle opacity/background transitions (150ms)
- Loading spinners: Continuous rotation

**Forbidden**:
- Page transitions
- Scroll-triggered effects
- Decorative animations
- Auto-playing elements

---

## Accessibility & UX

**Dark Mode**:
- Consistent implementation across all inputs and text fields
- Form inputs maintain dark backgrounds with proper contrast
- No white input fields on dark backgrounds

**Keyboard Navigation**:
- All interactive elements keyboard accessible
- Visible focus rings (2px primary accent)
- Tab order follows logical flow
- Escape key closes modals/dropdowns

**Copy-Paste Optimization**:
- Single-click copy on all suggestion elements
- Visual feedback (color change + icon swap)
- Toast confirmation message
- Pre-formatted text (includes emojis exactly as shown)

**Responsive Behavior**:
- Mobile: Single column, full-width chat interface
- Sidebar becomes bottom drawer or hamburger menu
- Touch-friendly targets (min 44px height)
- Optimized text sizes for smaller screens

---

## Special Considerations

**Professional Tone**: Despite the adult industry context, the interface maintains a clean, professional aesthetic suitable for extended work sessions. No provocative imagery or casual design elements.

**Efficiency First**: Every interaction is optimized for speed - large click targets, immediate feedback, minimal confirmation dialogs, quick access to frequently used phrases.

**Contextual Intelligence**: The interface adapts based on:
- Selected client phase
- Client type classification
- Recent conversation patterns
- Time of day (all dark mode for late-night work)

**Privacy**: No logging of actual client conversations, only metadata for suggestions. Clear visual indicators when AI is processing sensitive information.