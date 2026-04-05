export const runtime = 'edge';

export async function POST(request) {
  const { apiKey, resume, jd, companyUrl, roleTitle, hiringManager, vibe, tonality } = await request.json();

  if (!apiKey || !resume || !jd) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const vibeInstructions = {
    boardroom: 'VIBE: Boardroom — McKinsey presentation feel. Clean, minimal, data-forward. Serif + clean sans fonts. Monochromatic colors. Headline lets a metric do the talking. Tone: authoritative, measured.',
    challenger: 'VIBE: Challenger — Nike campaign feel. Bold, high-contrast, commanding. Heavy display fonts. Dark bg, bright accent. Headline is punchy and direct. Tone: confident, metric-heavy, short sentences.',
    showstopper: 'VIBE: Showstopper — Awwwards site feel. Brand-matched, interactive, editorial. Match company fonts/colors. Headline tells a story. Tone: personality-forward but professional.',
    sendhelp: 'VIBE: Send Help — Creative fever dream (but gorgeous). Unexpected fonts, bold colors. Headline is theatrical and witty. Tone: funny, self-aware, still selling skills.',
  };

  const tonalityInstructions = {
    professional: 'TONALITY: Professional — Measured, authoritative, no humor. Let achievements speak.',
    conversational: 'TONALITY: Conversational — Warm, approachable, like talking to a smart friend.',
    bold: 'TONALITY: Bold — Confident, direct, unapologetic. Short sentences. Strong claims.',
    witty: 'TONALITY: Witty — Clever, self-aware, slightly theatrical. Smart humor.',
    storyteller: 'TONALITY: Storyteller — Narrative-driven. Build a journey arc.',
  };

  const userPrompt = `Analyze this resume and job description. Return a JSON creative brief.

${vibeInstructions[vibe] || vibeInstructions.showstopper}
${tonalityInstructions[tonality] || tonalityInstructions.conversational}

CANDIDATE RESUME:
${resume}

JOB DESCRIPTION:
${jd}

${roleTitle ? 'ROLE: ' + roleTitle : ''}
${hiringManager ? 'HIRING MANAGER: ' + hiringManager : ''}
${companyUrl ? 'COMPANY URL: ' + companyUrl : ''}

Return ONLY this JSON structure, nothing else — no markdown, no backticks, no explanation before or after:

{
  "headline": "A hero headline specific to this company (never generic like Hi I am X)",
  "subheadline": "1-2 sentences expanding on the headline",
  "hook": "The core narrative angle for this candidate at this company",
  "colorPalette": {
    "primary": "#hex from company brand",
    "secondary": "#hex complementary accent",
    "background": "#hex page bg",
    "text": "#hex main text",
    "muted": "#hex secondary text"
  },
  "fonts": {
    "headline": "Google Font name",
    "body": "Google Font name",
    "mono": "Google Font name"
  },
  "sections": [
    {"title": "Section name", "purpose": "What it does", "keyContent": "What goes in it"}
  ],
  "metrics": [
    {"number": "$X", "label": "What it measures", "context": "Why it matters for this JD"}
  ],
  "experienceMatch": [
    {"requirement": "From the JD", "candidateProof": "Matching experience with a specific number"}
  ],
  "ninetyDayPlan": {
    "days30": ["Specific action 1", "Specific action 2", "Specific action 3"],
    "days60": ["Specific action 1", "Specific action 2", "Specific action 3"],
    "days90": ["Specific action 1", "Specific action 2", "Specific action 3"]
  },
  "toneSample": "2-3 sentences showing exactly how the copy will sound"
}

CRITICAL: Return ONLY the raw JSON. No markdown code blocks. No backticks. No text before or after. Start with { and end with }`;

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
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return new Response(JSON.stringify({ error: errorData.error?.message || 'API request failed' }), { status: response.status, headers: { 'Content-Type': 'application/json' } });
    }

    const data = await response.json();
    const text = data.content.filter(b => b.type === 'text').map(b => b.text).join('');

    // Aggressive cleanup — strip markdown fencing, find the JSON object
    let cleaned = text.trim();
    cleaned = cleaned.replace(/^```json?\s*/i, '').replace(/\s*```$/i, '');
    cleaned = cleaned.trim();

    // Find the first { and last } to extract just the JSON
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    if (firstBrace === -1 || lastBrace === -1) {
      return new Response(JSON.stringify({ error: 'AI did not return valid JSON. Please try again.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);

    // Validate it parses
    try {
      JSON.parse(cleaned);
    } catch (e) {
      return new Response(JSON.stringify({ error: 'AI returned malformed JSON. Please try again.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(cleaned, { headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
