export const runtime = 'edge';

export async function POST(request) {
  const { apiKey, resume, jd, companyUrl, roleTitle, hiringManager, vibe, tonality } = await request.json();

  if (!apiKey || !resume || !jd) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const systemPrompt = `You are a world-class creative director who specializes in job application strategy. Your job is to analyze a candidate's resume and a job description, then create a detailed creative brief for a landing page.

You must respond with ONLY valid JSON — no markdown, no code blocks, no explanation. Just the raw JSON object.

The JSON must have this exact structure:
{
  "headline": "The hero headline for the page (specific to this company, not generic)",
  "subheadline": "1-2 sentences expanding on the headline",
  "hook": "The core narrative angle — what makes this candidate's story compelling for THIS specific role",
  "colorPalette": {
    "primary": "#hex — the dominant brand color (research the company)",
    "secondary": "#hex — complementary accent",
    "background": "#hex — page background",
    "text": "#hex — main text color",
    "muted": "#hex — secondary text"
  },
  "fonts": {
    "headline": "Google Font name for headlines",
    "body": "Google Font name for body text",
    "mono": "Google Font name for labels/code"
  },
  "sections": [
    { "title": "Section name", "purpose": "What this section accomplishes", "keyContent": "Specific content to include" }
  ],
  "metrics": [
    { "number": "$1.71M", "label": "Pipeline attributed", "context": "How this relates to the JD" }
  ],
  "experienceMatch": [
    { "requirement": "JD requirement", "candidateProof": "Matching experience with specific metric" }
  ],
  "ninetyDayPlan": {
    "days30": ["Specific action 1", "Specific action 2", "Specific action 3"],
    "days60": ["Specific action 1", "Specific action 2", "Specific action 3"],
    "days90": ["Specific action 1", "Specific action 2", "Specific action 3"]
  },
  "toneSample": "A 2-3 sentence sample paragraph showing exactly how the copy will sound on the final page"
}`;

  const vibeInstructions = {
    boardroom: 'VIBE: Boardroom — The page should feel like a McKinsey presentation. Clean, minimal, data-forward. Suggest serif + clean sans fonts. Monochromatic colors. The headline should let a metric do the talking. Tone sample should sound authoritative and measured.',
    challenger: 'VIBE: Challenger — The page should feel like a Nike campaign. Bold, high-contrast, commanding. Suggest heavy display fonts. Dark background with one bright accent. The headline should be a punchy, direct statement. Tone sample should sound confident and metric-heavy with short sentences.',
    showstopper: 'VIBE: Showstopper — The page should feel like an Awwwards site. Brand-matched, interactive, editorial. Try to match the company actual fonts and colors. The headline should tell a story specific to the company. Tone sample should be personality-forward but professional.',
    sendhelp: 'VIBE: Send Help — The page should feel like a creative fever dream (but gorgeous). Unexpected font pairings, bold colors, breaking conventions. The headline should be theatrical and witty. Tone sample should be funny and self-aware while still selling skills.',
  };

  const tonalityInstructions = {
    professional: 'TONALITY: Professional — Measured, authoritative, no humor. Let achievements speak.',
    conversational: 'TONALITY: Conversational — Warm, approachable, like talking to a smart friend. Light personality.',
    bold: 'TONALITY: Bold — Confident, direct, unapologetic. Short sentences. Strong claims backed by numbers.',
    witty: 'TONALITY: Witty — Clever, self-aware, slightly theatrical. Humor that shows intelligence, not clowning.',
    storyteller: 'TONALITY: Storyteller — Narrative-driven. Build a journey arc. Make the reader feel invested in the candidate.',
  };

  const userPrompt = `Analyze this resume and job description, then create a creative brief.

${vibeInstructions[vibe] || vibeInstructions.showstopper}
${tonalityInstructions[tonality] || tonalityInstructions.conversational}

CANDIDATE RESUME:
${resume}

JOB DESCRIPTION:
${jd}

${roleTitle ? 'ROLE: ' + roleTitle : ''}
${hiringManager ? 'HIRING MANAGER: ' + hiringManager : ''}
${companyUrl ? 'COMPANY URL (research their brand): ' + companyUrl : ''}

CRITICAL INSTRUCTIONS:
- The headline MUST be specific to this company and role. Never use "Hi, I'm [Name]" — find a clever angle.
- Extract EVERY metric and number from the resume. List them all in the metrics array.
- Map at least 5 JD requirements to specific candidate experiences with real numbers.
- The 90-day plan must have specific, actionable items — not vague goals like "learn the product."
- Research or infer the company's brand colors from their URL/name. Get as close as possible.
- The tone sample should be 2-3 sentences that could appear on the actual page — this is the voice check.

Return ONLY the JSON object. No markdown, no code blocks, no explanation.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return new Response(JSON.stringify({ error: errorData.error?.message || 'API request failed' }), { status: response.status, headers: { 'Content-Type': 'application/json' } });
    }

    const data = await response.json();
    const text = data.content.filter(b => b.type === 'text').map(b => b.text).join('');
    const cleaned = text.replace(/^```json?\n?/i, '').replace(/\n?```$/i, '').trim();

    return new Response(cleaned, { headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
