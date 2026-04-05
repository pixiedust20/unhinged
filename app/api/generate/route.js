export const runtime = 'edge';

export async function POST(request) {
  const { apiKey, resume, jd, companyUrl, hiringManager, roleTitle, vibe, vibePrompt } = await request.json();

  if (!apiKey || !resume || !jd) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const systemPrompt = `You are an elite product designer and copywriter who creates extraordinary job application landing pages. Generate complete, self-contained HTML files that are visually stunning, interactive, and strategically crafted to get candidates hired.

CRITICAL RULES:
1. Return ONLY valid HTML — no markdown, no code blocks, no explanation. Start with <!DOCTYPE html> and end with </html>. Nothing else.
2. Everything must be in one file — inline all CSS and JS.
3. Use Google Fonts (loaded via CDN link in <head>).
4. The page must work offline after initial load — no external dependencies except Google Fonts and CDN scripts.
5. Make it genuinely impressive. This is someone's career on the line.
6. All animations must be smooth (use will-change, transform, opacity — never layout-shifting properties).
7. Include the candidate's real achievements and metrics prominently.
8. Map the candidate's experience explicitly to the job requirements.
9. Include a clear CTA section with the candidate's contact info (email, LinkedIn, etc).
10. Add URL parameter personalization: if ?name=X is in the URL, use that name in the greeting.
11. The page must be responsive and work on mobile.
12. Use semantic HTML and proper accessibility attributes.`;

  const userPrompt = `Create a landing page for this job application:

${vibePrompt}

---
CANDIDATE RESUME:
${resume}

---
JOB DESCRIPTION:
${jd}

---
${roleTitle ? 'ROLE APPLYING FOR: ' + roleTitle : ''}
${hiringManager ? 'HIRING MANAGER / TEAM: ' + hiringManager : ''}
${companyUrl ? 'COMPANY URL (match their brand aesthetic): ' + companyUrl : ''}

---
REQUIRED SECTIONS:
1. Hero — Candidate name, current title, a punchy headline matched to the company/role. If ?name=X is in URL, personalize greeting.
2. Why This Company — Show genuine understanding of the company and why the candidate is specifically drawn to them.
3. Experience Match — Map the candidate's specific experience to the JD requirements. Use real metrics and achievements from the resume.
4. Career Journey — Timeline or visual representation of the candidate's career arc.
5. What I'd Do — A specific 30/60/90 day plan or concrete ideas for the role.
6. Proof Points — Key metrics, achievements, and evidence of impact. Use real numbers from the resume.
7. CTA — Contact information and a compelling reason to reach out.

Remember: Return ONLY the HTML. No markdown. No explanation. Start with <!DOCTYPE html>.`;

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
        max_tokens: 16000,
        stream: true,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return new Response(JSON.stringify({ error: errorData.error?.message || 'API request failed' }), { status: response.status, headers: { 'Content-Type': 'application/json' } });
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        let buffer = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6).trim();
              if (data === '[DONE]') continue;
              try {
                const parsed = JSON.parse(data);
                if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
                  controller.enqueue(encoder.encode(parsed.delta.text));
                }
              } catch (e) {}
            }
          }
        }
        controller.close();
      },
    });

    return new Response(stream, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
