export const runtime = 'edge';

export async function POST(request) {
  const { apiKey, companyUrl, companyName, vibe, colorOverrides } = await request.json();

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Missing API key' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const vibeDesign = {
    boardroom: 'STYLE: Ultra-clean, editorial. Light background (#FAFAF8 or #FFFFFF). Serif headlines (Playfair Display, EB Garamond, or Lora). Clean sans body (Inter or DM Sans). Monochromatic — ONE accent color from company brand. Maximum whitespace. 1px line dividers. No gradients, no shadows, no decorative elements.',
    challenger: 'STYLE: Bold, high-contrast. Dark background (#0A0A0B or #0F172A). Heavy display sans headlines (Space Grotesk 700, Bebas Neue, or Archivo Black). Clean sans body (DM Sans). ONE bright accent from company brand on dark. If unsure use #3B82F6 or #FF5C35. Dramatic contrast everywhere.',
    showstopper: 'STYLE: Editorial, brand-matched. Light background matching company brand (white, cream, or their light shade). Distinctive serif headlines (Instrument Serif, Fraunces italic, or Playfair Display). Clean sans body (DM Sans, Manrope). 2-3 colors from company palette. Elegant, layered, rich.',
    sendhelp: 'STYLE: Creative chaos but gorgeous. Dark base (#0A0A0B). TWO display fonts — one heavy sans (Dela Gothic One, Bebas Neue) and one elegant serif (Instrument Serif italic). Bold unexpected colors — neon accents, gradients welcome. Glassmorphism (backdrop-filter:blur + rgba). The design itself should surprise.',
  };

  const userPrompt = `Generate a CSS design system for a job application landing page.

${vibeDesign[vibe] || vibeDesign.showstopper}

Company: ${companyName || 'Unknown'}
Company URL: ${companyUrl || 'Not provided'}
${colorOverrides ? 'USER COLOR OVERRIDES (use these instead of guessing): ' + JSON.stringify(colorOverrides) : 'Research or infer the company brand colors from their name/URL.'}

Return ONLY a JSON object with this structure, no markdown, no backticks, no explanation:

{
  "googleFontsUrl": "The full Google Fonts URL to load all needed fonts",
  "css": "Complete CSS string with :root variables, base styles, utility classes for .reveal animations, responsive media queries. Include: --primary, --secondary, --accent, --bg, --bg-card, --text, --text-muted, --border, --font-headline, --font-body, --font-mono. Include .reveal class (opacity:0, translateY:20px, transition:0.7s) and .reveal.visible (opacity:1, translateY:0). Include responsive breakpoints.",
  "palette": {
    "primary": "#hex",
    "secondary": "#hex",
    "accent": "#hex",
    "background": "#hex",
    "card": "#hex",
    "text": "#hex",
    "muted": "#hex",
    "border": "#hex"
  },
  "fonts": {
    "headline": "Font name",
    "body": "Font name",
    "mono": "Font name"
  }
}

Start with { and end with }. Nothing else.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 3000, messages: [{ role: 'user', content: userPrompt }] }),
    });

    if (!response.ok) {
      const err = await response.json();
      return new Response(JSON.stringify({ error: err.error?.message || 'Failed' }), { status: response.status, headers: { 'Content-Type': 'application/json' } });
    }

    const data = await response.json();
    const text = data.content.filter(b => b.type === 'text').map(b => b.text).join('');
    let cleaned = text.trim().replace(/^```json?\s*/i, '').replace(/\s*```$/i, '').trim();
    const first = cleaned.indexOf('{');
    const last = cleaned.lastIndexOf('}');
    if (first === -1 || last === -1) {
      return new Response(JSON.stringify({ error: 'Invalid design response' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
    cleaned = cleaned.substring(first, last + 1);
    JSON.parse(cleaned); // validate
    return new Response(cleaned, { headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
