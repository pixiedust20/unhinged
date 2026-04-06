export const runtime = 'edge';

const STYLE_DESIGNS = {
  editorial: 'Light bg (#FAFAF8). Elegant serif headlines (Instrument Serif/Fraunces/Cormorant). Clean sans body (DM Sans/Manrope) at 300-400 weight. Max TWO colors — near-black text + one sparse accent from company brand. Max-width 900px. Generous whitespace. 1px dividers. Monospace labels. Magazine feel.',
  bold_dark: 'Dark bg (#0A0A0B). Heavy display sans headlines (Space Grotesk 700/Bebas Neue) 60-90px. Clean sans body (DM Sans). ONE bright accent from company brand on dark. Full-width sections. High contrast. Gradient text for hero.',
  warm_minimal: 'Warm cream bg (#FAF8F5). Friendly rounded sans (Plus Jakarta Sans/Outfit) 600-700 weight. Rounded corners (12-16px). Soft shadows. Warm accent colors. Cards on white with gentle shadow.',
  creative_studio: 'Light or dark based on company. TWO contrasting fonts — heavy sans (Syne 800/Space Grotesk 800) + elegant serif italic (Instrument Serif/Playfair Display italic). Bold color blocks. 2-3 colors creating tension.',
  corporate_clean: 'White bg (#FFFFFF). ONE professional sans family (DM Sans/Manrope/Inter). Company accent as sole color. Structured grid. Even spacing. Thin borders. Section numbering.'
};

export async function POST(request) {
  const { apiKey, companyUrl, companyName, style, colorOverrides } = await request.json();

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Missing API key' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  var styleDesc = STYLE_DESIGNS[style] || STYLE_DESIGNS.editorial;

  var userPrompt = 'Generate a CSS design system for a job application landing page.\n\nSTYLE: ' + styleDesc + '\n\nCompany: ' + (companyName || 'Unknown') + '\nCompany URL: ' + (companyUrl || 'Not provided') + '\n' + (colorOverrides ? 'USER COLOR OVERRIDES: ' + JSON.stringify(colorOverrides) : 'Research or infer company brand colors.') + '\n\nReturn ONLY JSON, no markdown, no backticks. Start with { end with }:\n\n{"googleFontsUrl": "Full Google Fonts URL", "css": "Additional CSS beyond :root. Keep under 40 lines.", "palette": {"primary": "#hex", "secondary": "#hex", "accent": "#hex", "background": "#hex", "card": "#hex", "text": "#hex", "muted": "#hex", "border": "#hex"}, "fonts": {"headline": "Font name", "body": "Font name", "mono": "Font name"}}';

  try {
    var response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-opus-4-6', max_tokens: 2000, messages: [{ role: 'user', content: userPrompt }] }),
    });
    if (!response.ok) { var err = await response.json(); return new Response(JSON.stringify({ error: err.error?.message || 'Failed' }), { status: response.status, headers: { 'Content-Type': 'application/json' } }); }
    var data = await response.json();
    var text = data.content.filter(function(b) { return b.type === 'text'; }).map(function(b) { return b.text; }).join('');
    var cleaned = text.trim().replace(/^```json?\s*/i, '').replace(/\s*```$/i, '').trim();
    var first = cleaned.indexOf('{');
    var last = cleaned.lastIndexOf('}');
    if (first === -1 || last === -1) return new Response(JSON.stringify({ error: 'Invalid design response.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    cleaned = cleaned.substring(first, last + 1);
    JSON.parse(cleaned);
    return new Response(cleaned, { headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
