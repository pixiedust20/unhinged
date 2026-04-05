export const runtime = 'edge';

export async function POST(request) {
  const { apiKey, companyUrl, companyName, vibe, colorOverrides } = await request.json();

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Missing API key' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const vibeDesign = {
    boardroom: 'Ultra-clean, editorial. Light bg (#FAFAF8). Serif headlines (Playfair Display or EB Garamond). Sans body (Inter or DM Sans). ONE monochromatic accent from company brand. Max whitespace.',
    challenger: 'Bold, high-contrast. Dark bg (#0A0A0B). Heavy display sans headlines (Space Grotesk 700 or Bebas Neue). Sans body (DM Sans). ONE bright accent. Dramatic contrast.',
    showstopper: 'Editorial, brand-matched. Light bg. Distinctive serif headlines (Instrument Serif or Fraunces). Sans body (DM Sans). 2-3 colors from company palette. Elegant, layered.',
    sendhelp: 'Creative chaos. Dark base (#0A0A0B). TWO display fonts — heavy sans + elegant serif. Bold unexpected colors, neon accents, gradients. Glassmorphism welcome.',
  };

  const userPrompt = `Generate a CSS design system for a job application landing page.

STYLE: ${vibeDesign[vibe] || vibeDesign.showstopper}

Company: ${companyName || 'Unknown'}
Company URL: ${companyUrl || 'Not provided'}
${colorOverrides ? 'USER OVERRIDES: ' + JSON.stringify(colorOverrides) : 'Research or infer company brand colors.'}

Return ONLY JSON, no markdown, no backticks. Start with { end with }:

{
  "googleFontsUrl": "Full Google Fonts URL for all fonts",
  "css": "Additional CSS string beyond the :root variables — animations, special utilities, etc. Keep it under 30 lines.",
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
