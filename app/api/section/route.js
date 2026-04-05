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
- The headline should use mixed typography — combine the serif and sans fonts, or use italic for emphasis
- Display 3-4 stat pills or cards below the headline with key metrics
- Candidate name and title in smaller text above or below the headline
- Scroll-triggered entrance animation (fade up with staggered delays)
- A subtle accent line or shape as a design element`,
  },

  hero_meta: {
    name: 'Hero — Meta proof',
    instruction: `Build a hero section where the page itself IS the proof. The hero should:
- Take up the full viewport
- The headline should reference the APPLICATION ITSELF as proof of skill. Examples: "I didn't type a single word of this application" (for voice tools), "This page is my first campaign for [company]" (for marketing roles), "I built this in 4 hours — imagine what I'd do with 90 days" (for builder roles)
- Include a floating status bar or ribbon that reinforces the meta concept
- Show a simulated product interface (macOS window, terminal, app screenshot) that relates to the company's product
- Include candidate stats in the simulated interface
- The entire section should feel like a product demo, not a resume`,
  },

  hero_story: {
    name: 'Hero — Story opener',
    instruction: `Build a hero section that opens with a narrative hook. The hero should:
- Take up the full viewport
- Open with a provocative question or statement in elegant serif italic (32-48px)
- Follow with 1-2 sentences that set up the candidate's story
- Then reveal the candidate's name and title with a subtle animation
- Use generous whitespace — this is editorial, magazine-style
- Include a single accent element (a colored line, a dot, a subtle shape) for visual interest
- A "scroll to explore" indicator at the bottom`,
  },

  metrics_cards: {
    name: 'Metrics — Accent cards',
    instruction: `Build a metrics section with accent-bordered cards. Must include:
- A grid of 4-6 metric cards (2-3 columns)
- Each card has: a large number (32-40px, serif font), a label below, and optionally a one-line context
- Each card has a left border (3px) in the accent color
- Cards have a subtle background (slightly different from page bg)
- Numbers should animate up from 0 when scrolled into view using IntersectionObserver
REFERENCE for counter animation:
function animateCounter(el){const t=parseFloat(el.dataset.target);const d=1500;const s=performance.now();function u(n){const p=Math.min((n-s)/d,1);const e=1-Math.pow(1-p,3);el.textContent=(el.dataset.prefix||'')+Math.round(t*e).toLocaleString()+(el.dataset.suffix||'');if(p<1)requestAnimationFrame(u);}requestAnimationFrame(u);}`,
  },

  metrics_ribbon: {
    name: 'Metrics — Stat ribbon',
    instruction: `Build a horizontal metrics ribbon. Must include:
- A full-width bar with 4 stats side by side, separated by thin vertical lines
- Each stat: large number (serif, 28-36px) + small label below (mono, 11px)
- The ribbon should have a subtle background color different from the page
- Clean, minimal, no cards — just the numbers breathing in a row
- Numbers animate on scroll`,
  },

  metrics_inline: {
    name: 'Metrics — Inline narrative',
    instruction: `Build a metrics section that weaves numbers into narrative text. Instead of cards:
- Write 2-3 short paragraphs where key numbers are displayed INLINE at 36-48px in the serif font
- The text flows naturally but the numbers pop out visually
- Example: "At Oliv AI, I built a pipeline worth <span style='font-size:48px;font-family:serif'>$1.71M</span> in attributed revenue, managing a team of <span style='font-size:48px;font-family:serif'>4</span> SDRs..."
- Use the accent color for the large numbers`,
  },

  experience_cards: {
    name: 'Experience — Requirement cards',
    instruction: `Build an experience match section with requirement-to-proof cards. Must include:
- A 2-column grid of cards (single column on mobile)
- Each card maps ONE JD requirement to the candidate's matching experience
- Card structure: small colored label "JD REQUIREMENT" at top, the requirement as bold title, then the candidate's proof below with a SPECIFIC metric, then a small tag showing which company they did it at
- Cards should have hover effects (subtle lift + shadow transition)
- Include scroll-triggered reveal animations (stagger each card by 100ms)
- Use the accent color for the requirement label`,
  },

  experience_table: {
    name: 'Experience — Comparison table',
    instruction: `Build an experience match as an interactive comparison table. Must include:
- A two-column layout: left column "What you need" (from JD), right column "What I bring" (from resume)
- Each row maps one requirement to one proof point
- Rows alternate background colors slightly
- When hovered, a row highlights with the accent color
- Include a "match score" or checkmark on each row
- At the bottom, a summary: "X of Y requirements matched with direct experience"
- Make it feel like a product comparison page, not a resume`,
  },

  timeline: {
    name: 'Career timeline',
    instruction: `Build a vertical career timeline. Must include:
- A vertical line (2px) running down the left side
- Each career stop has: a colored dot on the line, date range (mono font), company name + role (bold), and ONE key achievement with a metric
- Entries are connected by the vertical line
- Scroll-triggered reveal: each entry fades in and slides up as you scroll to it
- The most recent role should be at the top with a pulsing "current" indicator
- Use staggered animation delays (each entry 150ms after the previous)
REFERENCE:
<div style="position:relative;padding-left:40px;border-left:2px solid var(--border)">
  <div style="margin-bottom:40px;position:relative" class="reveal">
    <div style="position:absolute;left:-49px;width:16px;height:16px;border-radius:50%;background:var(--accent);border:3px solid var(--bg)"></div>
    <div style="font-size:11px;font-family:var(--font-mono);color:var(--accent)">2023 — Present</div>
    <div style="font-size:17px;font-weight:600">Head of Growth · Oliv AI</div>
    <div style="font-size:13px;color:var(--text-muted)">Built growth from scratch. $1.71M pipeline.</div>
  </div>
</div>`,
  },

  plan: {
    name: '90-day plan',
    instruction: `Build a 30/60/90 day plan section. Must include:
- Three columns (stacked on mobile) for Days 1-30, Days 31-60, Days 61-90
- Each column has: a colored top border (different color per phase — green/amber/coral), phase label in mono font, a bold phase title (Learn/Build/Scale or similar), and 3-5 specific action items
- Action items must be SPECIFIC ("Interview 15 users and map their activation journey") not vague ("Learn the product")
- Include subtle icons or numbers for each action item
- Scroll-triggered reveal with staggered column entrance`,
  },

  why_company: {
    name: 'Why this company',
    instruction: `Build a "Why this company" section. Must include:
- A compelling headline that shows genuine understanding of the company
- 2-3 paragraphs explaining WHY the candidate is specifically drawn to this company — referencing their product, mission, recent news, or market position
- This should NOT be generic flattery. It should reference specific things about the company
- Use elegant typography — serif for the headline, clean body text with good line-height (1.8)
- Optional: a pull quote or highlighted sentence in larger italic text
- Keep it personal and authentic in tone`,
  },

  interactive_simulator: {
    name: 'Interactive — Product simulator',
    instruction: `Build an interactive element that simulates the company's product. Must include:
- A macOS-style window frame (three dots: red/yellow/green, title bar, rounded corners)
- Inside: a simplified simulation of what the company's product does
- For data/enrichment tools: a table that "enriches" rows with a button click, loading spinners, then populated cells
- For content tools: a text editor interface that shows writing/editing
- For sales tools: a conversation or pipeline interface
- For voice tools: a waveform visualization with play/pause
- Make it FUNCTIONAL — clicking buttons should trigger animations, populate data, show state changes
- Use the company's actual brand colors in the simulator`,
  },

  interactive_before_after: {
    name: 'Interactive — Before/After slider',
    instruction: `Build a before/after comparison slider. Must include:
- Two panels: "Before" (generic/old approach) and "After" (the candidate's approach)
- A range slider that morphs between the two views
- The "Before" shows a generic, boring version (template resume, basic pitch)
- The "After" shows the candidate's actual approach (specific metrics, tailored positioning)
- Labels on each end of the slider
- Smooth transitions as the slider moves
- This demonstrates the candidate's strategic thinking visually`,
  },

  interactive_tabs: {
    name: 'Interactive — Tabbed resume',
    instruction: `Build a tabbed interface for the candidate's experience. Must include:
- 3-5 tabs across the top (e.g., by company, by skill area, or by achievement type)
- Each tab reveals a different content panel below
- Tabs should have active/inactive states with the accent color
- Content panels should transition smoothly (fade or slide)
- Each panel has rich content: metrics, descriptions, project highlights
- Make it feel like a product dashboard, not a document`,
  },

  cta: {
    name: 'CTA — Contact',
    instruction: `Build a compelling CTA section. Must include:
- A headline that creates urgency or excitement ("Let's build something" or "Ready when you are" — specific to the role)
- The candidate's email as a clickable link (mailto:)
- LinkedIn profile link
- Optional: phone number, personal website, Substack
- A subtle design element (gradient background, accent border, or visual flourish)
- The tone should be confident but not desperate — "I'd love to talk" not "Please hire me"
- Keep it short — this is the close, not another section`,
  },

  personal: {
    name: 'Personal touch',
    instruction: `Build a "beyond work" or personal section. Must include:
- A brief section showing the candidate as a human, not just a resume
- Interests, hobbies, side projects, or personal philosophy
- Present it visually — small cards or tags, not a paragraph
- Keep it short (3-5 items max) and genuinely interesting
- This should make the reader think "I'd enjoy working with this person"
- Use a lighter background to differentiate from the professional sections`,
  },
};

export async function POST(request) {
  const { apiKey, sectionType, resume, jd, companyUrl, companyName, roleTitle, hiringManager, designSystem, tonality } = await request.json();

  if (!apiKey || !sectionType || !resume || !jd) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const section = SECTION_PROMPTS[sectionType];
  if (!section) {
    return new Response(JSON.stringify({ error: 'Unknown section type: ' + sectionType }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const tonalityGuide = {
    professional: 'Write in a measured, authoritative tone. No humor. Let achievements speak. Short, precise sentences.',
    conversational: 'Write warmly and approachably, like a smart friend explaining their work. Light personality.',
    bold: 'Write with confidence. Short sentences. Strong claims. Every sentence should hit. Cut all filler.',
    witty: 'Write with clever self-awareness. Smart humor that shows intelligence. "I know this is unusual — that is the point."',
    storyteller: 'Write as a narrative. Build tension, reveal the payoff. Make the reader feel invested in the journey.',
  };

  const systemPrompt = `You are an elite frontend developer building ONE section of a landing page. You write production-quality HTML with inline styles.

${section.instruction}

TONALITY: ${tonalityGuide[tonality] || tonalityGuide.conversational}

DESIGN SYSTEM — use these CSS variables (they are already defined in :root):
${designSystem ? '- Primary: ' + designSystem.palette?.primary + '\n- Accent: ' + designSystem.palette?.accent + '\n- Background: ' + designSystem.palette?.background + '\n- Text: ' + designSystem.palette?.text + '\n- Muted: ' + designSystem.palette?.muted + '\n- Border: ' + designSystem.palette?.border + '\n- Card bg: ' + designSystem.palette?.card + '\n- Headline font: ' + designSystem.fonts?.headline + '\n- Body font: ' + designSystem.fonts?.body + '\n- Mono font: ' + designSystem.fonts?.mono : 'Use clean defaults.'}

Use var(--primary), var(--accent), var(--bg), var(--bg-card), var(--text), var(--text-muted), var(--border), var(--font-headline), var(--font-body), var(--font-mono) in your styles.

RULES:
1. Return ONLY the HTML for this ONE section — a single <section> element (or <div> for ribbons). No <!DOCTYPE>, no <html>, no <head>, no <body>.
2. Use inline <style> tags INSIDE the section if needed for animations/keyframes. Prefix all class names with the section type to avoid conflicts (e.g., .hero-typewriter-cursor, .metrics-card).
3. Use var() CSS variables for all colors and fonts — the design system is already loaded.
4. Include <script> tags inside the section for any interactivity (typewriter, counters, etc). Wrap in an IIFE to avoid global scope pollution.
5. Add class="reveal" to elements that should animate on scroll (the observer is already set up).
6. Make it responsive — use clamp() for font sizes, flexible grids, and include a media query if needed.
7. This must be BEAUTIFUL. You are building a portfolio piece, not a template. Every pixel matters.
8. Use REAL content from the resume and JD — never placeholder text.`;

  const userPrompt = `Build the "${section.name}" section using this data:

CANDIDATE RESUME:
${resume}

JOB DESCRIPTION:
${jd}

Company: ${companyName || 'the company'}
${companyUrl ? 'Company URL: ' + companyUrl : ''}
${roleTitle ? 'Role: ' + roleTitle : ''}
${hiringManager ? 'Hiring manager: ' + hiringManager : ''}

Return ONLY the HTML section. No explanation. Start with <section or <div.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 4000, stream: true, system: systemPrompt, messages: [{ role: 'user', content: userPrompt }] }),
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
