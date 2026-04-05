export const runtime = 'edge';

const SECTION_PROMPTS = {
  hero_typewriter: {
    name: 'Hero — Typewriter effect',
    instruction: `Build a hero section with a typewriter effect. The hero should:
- Take up the full viewport (min-height: 100vh)
- Have a cycling typewriter that types out 3-4 phrases about the candidate, deletes, and types the next
- Display the candidate name and current title
- Include a punchy headline SPECIFIC to this company (never generic)
- Show 3-4 key stats in a horizontal ribbon below
- Include a subtle animated background element (gradient orbs, particles, or waveforms)
- The typewriter cursor should blink. Use a monospace font for the typed text.
REFERENCE CODE for typewriter:
let phrases = ["phrase 1", "phrase 2"]; let idx=0, char=0;
function type() { if(char<=phrases[idx].length) { el.innerHTML=phrases[idx].slice(0,char)+'<span class="cursor">|</span>'; char++; setTimeout(type,30+Math.random()*30); } else { setTimeout(()=>{char=0;idx=(idx+1)%phrases.length;setTimeout(type,400)},3000); } }`,
  },
  hero_bold: {
    name: 'Hero — Bold statement',
    instruction: `Build a hero section with a massive bold statement. The hero should:
- Take up the full viewport (min-height: 100vh)
- Have a HUGE headline (60-100px using clamp) that makes a specific claim about why this candidate belongs at this company
- Mixed typography — combine serif and sans, use italic for emphasis
- 3-4 stat pills or cards below with key metrics
- Candidate name and title in smaller text
- Scroll-triggered entrance animation (fade up with staggered delays)
- A subtle accent line or shape as a design element`,
  },
  hero_meta: {
    name: 'Hero — Meta proof',
    instruction: `Build a hero section where the page itself IS the proof. The hero should:
- Take up the full viewport
- Headline references the APPLICATION ITSELF as proof of skill
- Include a floating status bar or ribbon reinforcing the meta concept
- Show a simulated product interface (macOS window, terminal, app UI) related to the company product
- Include candidate stats in the simulated interface
- Feel like a product demo, not a resume`,
  },
  hero_story: {
    name: 'Hero — Story opener',
    instruction: `Build a hero section that opens with a narrative hook. The hero should:
- Take up the full viewport
- Open with a provocative question or statement in elegant serif italic (32-48px)
- Follow with 1-2 setup sentences
- Reveal candidate name and title with subtle animation
- Generous whitespace — editorial, magazine-style
- A single accent element and a "scroll to explore" indicator at bottom`,
  },
  metrics_cards: {
    name: 'Metrics — Accent cards',
    instruction: `Build a metrics section with accent-bordered cards:
- Grid of 4-6 cards (2-3 columns)
- Each card: large number (32-40px serif), label, optional context line
- Left border (3px) in accent color
- Subtle card background
- Numbers animate from 0 on scroll using IntersectionObserver
COUNTER CODE: function animateCounter(el){const t=parseFloat(el.dataset.target);const d=1500;const s=performance.now();function u(n){const p=Math.min((n-s)/d,1);const e=1-Math.pow(1-p,3);el.textContent=(el.dataset.prefix||'')+Math.round(t*e).toLocaleString()+(el.dataset.suffix||'');if(p<1)requestAnimationFrame(u);}requestAnimationFrame(u);}`,
  },
  metrics_ribbon: {
    name: 'Metrics — Stat ribbon',
    instruction: `Build a horizontal metrics ribbon:
- Full-width bar with 4 stats side by side, separated by thin vertical lines
- Each stat: large number (serif, 28-36px) + small label (mono, 11px)
- Subtle background color
- Numbers animate on scroll`,
  },
  metrics_inline: {
    name: 'Metrics — Inline narrative',
    instruction: `Build metrics woven into narrative text:
- 2-3 short paragraphs where key numbers display at 36-48px inline in serif
- Text flows naturally but numbers pop visually
- Accent color for the large numbers`,
  },
  experience_cards: {
    name: 'Experience — Requirement cards',
    instruction: `Build experience match cards:
- 2-column grid (single on mobile)
- Each card: colored "JD REQUIREMENT" label, requirement as bold title, candidate proof with SPECIFIC metric, company tag
- Hover effects (lift + shadow)
- Scroll-triggered reveal with staggered 100ms delays`,
  },
  experience_table: {
    name: 'Experience — Comparison table',
    instruction: `Build an interactive comparison table:
- Two columns: "What you need" (JD) and "What I bring" (resume)
- Alternating row backgrounds
- Row highlights on hover
- Match checkmark per row
- Summary at bottom: "X of Y requirements matched"`,
  },
  timeline: {
    name: 'Career timeline',
    instruction: `Build a vertical career timeline:
- Vertical 2px line on the left
- Each stop: colored dot, date (mono), company + role (bold), ONE achievement with metric
- Most recent at top with pulsing "current" indicator
- Scroll-triggered fade-in with 150ms stagger
CODE: <div style="position:relative;padding-left:40px;border-left:2px solid var(--border)"><div class="reveal" style="margin-bottom:40px;position:relative"><div style="position:absolute;left:-49px;width:16px;height:16px;border-radius:50%;background:var(--accent);border:3px solid var(--bg)"></div>...</div></div>`,
  },
  plan: {
    name: '90-day plan',
    instruction: `Build a 30/60/90 day plan:
- Three columns (stacked mobile): Days 1-30, 31-60, 61-90
- Colored top border per phase (green/amber/coral)
- Phase label (mono), bold title, 3-5 SPECIFIC actions
- Scroll-triggered reveal with staggered columns`,
  },
  why_company: {
    name: 'Why this company',
    instruction: `Build a "Why this company" section:
- Compelling headline showing genuine understanding
- 2-3 paragraphs referencing specific things about the company (product, mission, market)
- NOT generic flattery — cite specifics
- Serif headline, clean body (line-height 1.8)
- Optional pull quote in larger italic`,
  },
  interactive_simulator: {
    name: 'Interactive — Product simulator',
    instruction: `Build an interactive product simulator:
- macOS window frame (three colored dots, title bar, rounded corners)
- Simplified simulation of the company's product
- For data tools: table that "enriches" rows on button click with loading spinners
- For content tools: text editor with writing simulation
- For sales tools: conversation or pipeline UI
- For voice tools: waveform with play/pause
- FUNCTIONAL: buttons trigger animations, populate data, show state changes
- Company brand colors in the simulator`,
  },
  interactive_before_after: {
    name: 'Interactive — Before/After slider',
    instruction: `Build a before/after comparison:
- Two panels: "Before" (generic approach) and "After" (candidate's approach)
- Range slider morphing between views
- "Before" = boring template resume/pitch
- "After" = candidate's actual approach with metrics
- Smooth transitions as slider moves`,
  },
  interactive_tabs: {
    name: 'Interactive — Tabbed resume',
    instruction: `Build a tabbed interface:
- 3-5 tabs (by company, skill area, or achievement type)
- Each tab reveals different content panel
- Active/inactive states with accent color
- Smooth panel transitions (fade or slide)
- Rich content per panel: metrics, descriptions, highlights
- Feel like a product dashboard`,
  },
  cta: {
    name: 'CTA — Contact',
    instruction: `Build a CTA section:
- Headline creating urgency or excitement, specific to the role
- Email as clickable mailto link
- LinkedIn link
- Optional: phone, website, Substack
- Design element (gradient bg, accent border, visual flourish)
- Confident not desperate — "I'd love to talk" not "Please hire me"
- Keep it short`,
  },
  personal: {
    name: 'Personal touch',
    instruction: `Build a personal/human section:
- Brief section showing the candidate beyond work
- Interests, hobbies, side projects
- Visual presentation — small cards or tags, not paragraphs
- 3-5 items max, genuinely interesting
- Lighter background to differentiate
- "I'd enjoy working with this person" energy`,
  },
};

export async function POST(request) {
  const { apiKey, sectionType, resume, jd, companyUrl, companyName, roleTitle, hiringManager, designSystem, tonality } = await request.json();

  if (!apiKey || !sectionType || !resume || !jd) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const section = SECTION_PROMPTS[sectionType];
  if (!section) {
    return new Response(JSON.stringify({ error: 'Unknown section: ' + sectionType }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const toneGuide = {
    professional: 'Measured, authoritative. No humor. Let achievements speak.',
    conversational: 'Warm, approachable, like a smart friend.',
    bold: 'Confident, direct. Short sentences. Every sentence hits.',
    witty: 'Clever, self-aware. Smart humor showing intelligence.',
    storyteller: 'Narrative-driven. Build tension, reveal payoff.',
  };

  const systemPrompt = `You are an elite frontend developer who wins design awards. Build ONE section of a landing page.

${section.instruction}

TONALITY: ${toneGuide[tonality] || toneGuide.conversational}

DESIGN SYSTEM (use these CSS variables — already defined in :root):
${designSystem ? `--primary: ${designSystem.palette?.primary}
--accent: ${designSystem.palette?.accent}
--bg: ${designSystem.palette?.background}
--bg-card: ${designSystem.palette?.card}
--text: ${designSystem.palette?.text}
--text-muted: ${designSystem.palette?.muted}
--border: ${designSystem.palette?.border}
--font-headline: '${designSystem.fonts?.headline}'
--font-body: '${designSystem.fonts?.body}'
--font-mono: '${designSystem.fonts?.mono}'` : 'Use clean defaults.'}

RULES:
1. Return ONLY a single <section> (or <div>). No <!DOCTYPE>, no <html>, no <head>.
2. Inline <style> inside section for animations/keyframes. Prefix classes with section type.
3. Use var() for all colors and fonts.
4. Include <script> in IIFE for interactivity.
5. Add class="reveal" on elements for scroll animation.
6. Responsive: clamp() fonts, flexible grids, media queries.
7. Use REAL content from resume and JD — never placeholders.
8. Make it BEAUTIFUL. Every pixel matters.`;

  const userPrompt = `Build "${section.name}" using:

RESUME: ${resume}

JD: ${jd}

Company: ${companyName || 'the company'}
${companyUrl ? 'URL: ' + companyUrl : ''}
${roleTitle ? 'Role: ' + roleTitle : ''}
${hiringManager ? 'Manager: ' + hiringManager : ''}

Return ONLY the HTML section.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-opus-4-6', max_tokens: 8000, stream: true, system: systemPrompt, messages: [{ role: 'user', content: userPrompt }] }),
    });

    if (!response.ok) {
      const err = await response.json();
      return new Response(JSON.stringify({ error: err.error?.message || 'Failed' }), { status: response.status, headers: { 'Content-Type': 'application/json' } });
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
              try { const p = JSON.parse(data); if (p.type === 'content_block_delta' && p.delta?.text) controller.enqueue(encoder.encode(p.delta.text)); } catch(e) {}
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
