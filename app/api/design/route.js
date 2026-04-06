export const runtime = 'edge';

const STYLE_DESIGNS = {
  editorial: {
    description: 'Light, editorial, magazine-feel. Elegant serif headlines with clean sans body. Generous whitespace. Color used sparingly as accent. Inspired by Stripe, Clay, Linear, Granola.',
    instructions: `STYLE: EDITORIAL
- Background: White (#FFFFFF) or very light warm gray (#FAFAF8). Never dark.
- Typography: Elegant serif for headlines — Instrument Serif, Fraunces, or Cormorant Garamond. Light weight (300-400). Clean sans for body — DM Sans, Manrope, or Inter at 300-400 weight. Large headline sizes (clamp 48-72px) but surrounded by generous whitespace.
- Color: Maximum TWO colors. One neutral (near-black text #1A1A1A). One accent pulled from the company brand, used SPARINGLY — only for small labels, badges, border-left accents, and hover states. Never large color fills. If unsure, use a muted sage (#5A7A6A) or steel blue (#3D5A80).
- Layout: Max-width 900px centered. Generous section padding (80-120px). Thin 1px line dividers between sections. Asymmetric two-column layouts where appropriate. Content breathes.
- Spacing: Line-height 1.8 for body text. Letter-spacing -0.02em on headlines. Margin between elements is generous — never cramped.
- Motion: Subtle scroll-triggered fade-ups (opacity + translateY 16px, duration 0.7s). No flashy animations. Hover states are gentle color shifts, not dramatic transforms.
- Details: Numbered sections in monospace (01, 02, 03). Small pill badges for categories. Thin accent borders on cards (border-left: 3px solid accent). Monospace font for labels and metadata.
- Overall feel: Like reading a beautifully typeset magazine. Quiet confidence. Every element has room to breathe. If it feels like too much, remove something.`,
  },

  bold_dark: {
    description: 'Dark backgrounds, heavy display fonts, neon accent, high contrast. Animated counters and gradient highlights. Inspired by Nike, Vercel dark mode, ABTC.',
    instructions: `STYLE: BOLD DARK
- Background: Near-black (#0A0A0B or #0F172A). Cards slightly lighter (#141416 or #1A1A2E).
- Typography: Heavy display sans for headlines — Space Grotesk 700, Bebas Neue, or Archivo Black. Sizes 60-90px using clamp. Clean sans for body — DM Sans or Inter. ALL CAPS for section labels and eyebrows.
- Color: ONE bright accent from company brand on dark background. If unsure use electric blue (#3B82F6), cyan (#00D4FF), or hot orange (#FF5C35). Use for: text highlights, border accents, badge backgrounds, gradient text. CSS gradients welcome for hero elements.
- Layout: Full-width sections, no max-width constraint on backgrounds. Content max-width 1000px. Sections alternate between full-bleed dark and slightly lighter card backgrounds.
- Spacing: Tighter than editorial. Punchy, rapid-fire sections. Short paragraphs (2-3 sentences max).
- Motion: Scroll-triggered fade-ups with staggered delays. Animated number counters on metrics (count up from 0). Subtle gradient shifts on hero backgrounds. Hover lift + glow on cards.
- Details: Glowing accent dots for status indicators. Grid line background overlay (subtle, 0.02 opacity). Gradient text for key phrases (background-clip: text). Stats displayed at 36-48px in stat ribbons.
- Overall feel: Like a Nike campaign landing page. Every sentence hits. High contrast, high confidence. The dark background makes the content pop.`,
  },

  warm_minimal: {
    description: 'Cream/warm white, rounded elements, soft shadows, playful but professional. Inspired by Notion, Figma, indie SaaS, Jaime Wright.',
    instructions: `STYLE: WARM MINIMAL
- Background: Warm cream (#FAF8F5 or #F5F3EE). Cards on white (#FFFFFF) with subtle shadow (0 2px 12px rgba(0,0,0,0.04)).
- Typography: Friendly rounded sans for headlines — Plus Jakarta Sans, Nunito, or Outfit at 600-700 weight. Same or similar font for body at 400 weight. Sizes moderate (36-52px headlines). Nothing extreme.
- Color: Warm, approachable palette. Primary from company brand. Secondary could be a warm complementary — peach, soft purple, warm green. Backgrounds stay cream, colors appear in buttons, tags, icons, and small elements.
- Layout: Max-width 960px. Rounded corners everywhere (12-16px on cards, 8px on buttons, 24px on large containers). Consistent padding. Cards with gentle shadows and borders.
- Spacing: Balanced and comfortable. Not as much whitespace as editorial, but never cramped. Sections at 60-80px padding.
- Motion: Gentle entrance animations (fade + slight scale from 0.98 to 1). Hover states with soft shadow increase. Smooth transitions (0.3s ease). Nothing dramatic.
- Details: Rounded pill badges. Emoji-sized icons or simple SVG line icons. Pastel-tinted background sections. Friendly, approachable button styles with rounded corners.
- Overall feel: Like a well-designed Notion page or a friendly SaaS product. Professional but not cold. You feel welcomed, not intimidated.`,
  },

  creative_studio: {
    description: 'Experimental layouts, mixed typography, asymmetric grids, interactive storytelling. Inspired by Noomo, Persepolis, Awwwards winners.',
    instructions: `STYLE: CREATIVE STUDIO
- Background: Can be light OR dark — choose based on company brand. If light: pure white with bold color blocks for sections. If dark: #0A0A0B with one or two vivid section backgrounds.
- Typography: TWO contrasting display fonts — one heavy geometric sans (Space Grotesk 800, Syne 800) and one elegant serif (Instrument Serif italic, Playfair Display italic). Mix them in the same headline. Body in a clean sans. Sizes go LARGE (80-120px for hero) to small (12px for labels). Extreme hierarchy.
- Color: Bold and intentional. 2-3 colors that create tension — don't be safe. Pull from company brand but push it. Use color blocks for entire sections. Gradient accents for key moments.
- Layout: BREAK THE GRID intentionally. Overlapping elements. Text that bleeds to edges. Asymmetric two-column with unequal widths (60/40 or 70/30). Full-bleed images or color sections alternating with contained text. Scrolling marquee/ticker for key phrases.
- Spacing: Dramatic variation. Some sections ultra-tight, others with massive padding. The rhythm is intentional — it creates visual tension.
- Motion: Scroll-triggered reveals with personality — elements that slide from the side, text that fades up word by word, sections that clip-path reveal. Parallax on hero elements. Hover states that are surprising but not annoying.
- Details: Numbered navigation (01, 02, 03). Text rotated slightly (1-3deg) for personality. Pull quotes in oversized italic serif. A scrolling marquee or ticker somewhere. At least one unconventional layout choice.
- Overall feel: Like a design agency portfolio. Every section is a deliberate creative choice. It should feel like someone with excellent taste built this. NOT chaotic — controlled creativity.`,
  },

  corporate_clean: {
    description: 'Crisp white, structured grid, professional, numbered sections, subtle animation. Inspired by McKinsey, Salesforce, Yango, iventions.',
    instructions: `STYLE: CORPORATE CLEAN
- Background: Pure white (#FFFFFF). Sections alternate with very light gray (#F7F7F5) for contrast. Cards on white with thin 1px borders.
- Typography: Professional sans-serif throughout — one family only. DM Sans, Manrope, or Inter. Headlines at 500-600 weight, 32-48px. Body at 400 weight, 15-16px. Nothing decorative — clarity is the aesthetic.
- Color: Company brand primary as the sole accent. Used for: buttons, section labels, badges, icons, and data highlights. Everything else is grayscale. The accent color should feel like it belongs in a corporate presentation.
- Layout: Structured 12-column grid feeling. Max-width 1100px. Even spacing. Cards in 2-3 column grids with consistent gaps. Everything aligned. No asymmetry, no overlap, no breaking the grid.
- Spacing: Consistent and measured. 64-80px section padding. 24px card padding. 16px gaps in grids. Everything follows a rhythm.
- Motion: Minimal. Fade-up reveals on scroll (0.5s, subtle). Hover state on cards (slight lift, border color change). Counter animations on metrics. Nothing more.
- Details: Section numbering (01 / 02 / 03). Company-style badges and pills. Data tables or structured comparison layouts. Professional iconography (line icons, not emoji). Progress indicators.
- Overall feel: Like a beautifully designed pitch deck or annual report. Professional credibility. The reader trusts this person because the presentation is so polished. Zero flash, maximum substance.`,
};

export async function POST(request) {
  const { apiKey, companyUrl, companyName, style, colorOverrides } = await request.json();

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Missing API key' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const styleConfig = STYLE_DESIGNS[style] || STYLE_DESIGNS.editorial;

  const userPrompt = `Generate a CSS design system for a job application landing page.

${styleConfig.instructions}

Company: ${companyName || 'Unknown'}
Company URL: ${companyUrl || 'Not provided'}
${colorOverrides ? 'USER COLOR OVERRIDES (use these exactly): ' + JSON.stringify(colorOverrides) : 'Research or infer the company brand colors from their name/URL.'}

Return ONLY JSON, no markdown, no backticks. Start with { end with }:

{
  "googleFontsUrl": "Full Google Fonts URL for all needed fonts",
  "css": "Additional CSS beyond :root — animations, utilities. Keep under 40 lines.",
  "palette": { "primary": "#hex", "secondary": "#hex", "accent": "#hex", "background": "#hex", "card": "#hex", "text": "#hex", "muted": "#hex", "border": "#hex" },
  "fonts": { "headline": "Font name", "body": "Font name", "mono": "Font name" }
}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-opus-4-6', max_tokens: 2000, messages: [{ role: 'user', content: userPrompt }] }),
    });
    if (!response.ok) { const err = await response.json(); return new Response(JSON.stringify({ error: err.error?.message || 'Failed' }), { status: response.status, headers: { 'Content-Type': 'application/json' } }); }
    const data = await response.json();
    const text = data.content.filter(b => b.type === 'text').map(b => b.text).join('');
    let cleaned = text.trim().replace(/^```json?\s*/i, '').replace(/\s*```$/i, '').trim();
    const first = cleaned.indexOf('{');
    const last = cleaned.lastIndexOf('}');
    if (first === -1 || last === -1) return new Response(JSON.stringify({ error: 'Invalid design response. Try again.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    cleaned = cleaned.substring(first, last + 1);
    JSON.parse(cleaned);
    return new Response(cleaned, { headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
