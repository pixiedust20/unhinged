export const runtime = 'edge';

const REFERENCE_PATTERNS = `
=== HERO PATTERNS THAT WORK ===

PATTERN 1 — "Meta proof" (used for Wispr Flow):
The page itself proves the candidate's skill. Hero headline: "I didn't type a single word of this application." 
- Full-viewport hero with an animated typewriter cycling through dictated phrases
- A floating status bar at bottom: "This page was dictated, not typed — at 152 WPM"
- Candidate stats displayed as a horizontal ribbon below hero: $1.7M pipeline | 1M+ signups | 0 keystrokes
- Key: the APPLICATION IS the proof. The medium is the message.

PATTERN 2 — "Brand number" (used for ElevenLabs):
Structure the entire page around the company's brand number. ElevenLabs = 11 sections.
- Hero: "11 reasons I'm your next growth lead"
- Each section is numbered prominently (01 through 11)
- URL parameter personalization: ?name=Aditi changes "Hi there" to "Hi Aditi"
- A personalization bar at the bottom with input fields for name and role

PATTERN 3 — "The challenger open" (used for Hyperbound):
Open with a provocative statement that shows confidence:
- "I'm probably too much for most companies. Luckily, [Company] isn't most companies."
- Immediately follow with 3-4 bold metric cards proving the claim
- Tone is theatrical but backed by real numbers

PATTERN 4 — "Same space" (used for Clay):
Open by proving you already work in the company's domain:
- "I've spent 4+ years in Clay's exact space: outbound, enrichment, data workflows, revenue operations."
- A side-by-side comparison showing how you've done exactly what the JD describes
- Interactive elements that mimic the company's own product (Clay table, enrichment flow)

PATTERN 5 — "The content proof" (used for Granola):
Make the application itself demonstrate the skill:
- For a content role: the page IS a piece of content (editorial layout, magazine-style)
- For a design role: the page IS a design portfolio piece
- A scrolling ticker at the top with key phrases
- Hero uses a distinctive script/handwriting font for personality

=== METRICS DISPLAY PATTERNS ===

PATTERN A — "Stat ribbon" (horizontal bar with 4 key numbers):
<div style="display:flex;gap:0;border-top:1px solid [border];border-bottom:1px solid [border]">
  <div style="flex:1;padding:24px 28px;border-right:1px solid [border]">
    <div style="font-family:[serif];font-size:32px;font-weight:400;color:[primary]">$1.71M</div>
    <div style="font-size:12px;color:[muted];margin-top:4px">Pipeline attributed</div>
  </div>
  <!-- repeat for each stat -->
</div>

PATTERN B — "Accent-bordered cards" (grid of metric cards with left color bar):
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
  <div style="background:[card-bg];border-radius:12px;padding:24px;border-left:3px solid [accent]">
    <div style="font-family:[serif];font-size:36px;color:[primary]">1M+</div>
    <div style="font-size:13px;color:[muted];margin-top:4px">Product signups</div>
    <div style="font-size:11px;color:[muted];margin-top:8px;line-height:1.5">Drove 90% of traffic through creator advocacy at ~$1 CAC</div>
  </div>
</div>

PATTERN C — "Inline proof" (metrics woven into narrative text):
Instead of cards, use oversized numbers inline with text:
"At Oliv AI, I built a pipeline worth <span style="font-size:48px;font-family:[serif]">$1.71M</span> in attributed revenue..."

=== EXPERIENCE MATCH PATTERNS ===

PATTERN: "Requirement → Proof" cards (2-column grid):
Each card has: the JD requirement as a bold title, the candidate's matching experience below with a specific number, and a subtle colored tag showing the company where they did it.
<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
  <div style="background:[card-bg];border-radius:12px;padding:24px;border:1px solid [border]">
    <div style="font-size:11px;font-family:[mono];color:[accent];letter-spacing:0.08em;text-transform:uppercase;margin-bottom:10px">JD requirement</div>
    <div style="font-size:15px;font-weight:600;margin-bottom:8px">Scale user acquisition channels</div>
    <div style="font-size:13px;color:[muted];line-height:1.7">Built Cohesive AI from 0 to 1M+ signups across influencer, SEO, and community channels — achieving ~$1 CAC vs industry avg of $15-25.</div>
    <div style="margin-top:12px;font-size:11px;font-family:[mono];color:[muted];padding:3px 8px;background:[surface];border-radius:4px;display:inline-block">Cohesive AI · 2022-2023</div>
  </div>
</div>

=== TIMELINE PATTERNS ===

PATTERN: "Career journey" (vertical timeline with alternating cards):
<div style="position:relative;padding-left:40px;border-left:2px solid [border]">
  <div style="margin-bottom:40px;position:relative">
    <div style="position:absolute;left:-49px;width:16px;height:16px;border-radius:50%;background:[accent];border:3px solid [bg]"></div>
    <div style="font-size:11px;font-family:[mono];color:[accent];margin-bottom:6px">2023 — Present</div>
    <div style="font-size:17px;font-weight:600;margin-bottom:4px">Head of Growth · Oliv AI</div>
    <div style="font-size:13px;color:[muted];line-height:1.6">Built the growth function from scratch. $1.71M pipeline, $1M+ closed-won. Managed 4 SDRs.</div>
  </div>
</div>

=== 90-DAY PLAN PATTERN ===

PATTERN: "Three-phase columns" with colored top borders:
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px">
  <div style="background:[card-bg];border-radius:12px;padding:24px;border-top:3px solid [color-1]">
    <div style="font-family:[mono];font-size:11px;color:[color-1];letter-spacing:0.1em;margin-bottom:12px">DAYS 1-30</div>
    <div style="font-size:16px;font-weight:600;margin-bottom:12px">Learn + Audit</div>
    <div style="font-size:13px;color:[muted];line-height:1.8">
      Specific action items here — "Interview 15 users", "Audit current CAC by channel", "Map competitor positioning"
    </div>
  </div>
</div>

=== INTERACTIVE PATTERNS ===

PATTERN: URL parameter personalization:
<script>
const params = new URLSearchParams(window.location.search);
const name = params.get('name');
if (name) {
  document.querySelectorAll('.personalize-name').forEach(el => el.textContent = name);
}
</script>

PATTERN: Scroll-triggered reveals:
<script>
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
</script>
With CSS: .reveal { opacity: 0; transform: translateY(20px); transition: 0.7s cubic-bezier(0.16,1,0.3,1); }
.reveal.visible { opacity: 1; transform: translateY(0); }

PATTERN: Animated number counters:
<script>
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1500;
  const start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
</script>

PATTERN: Confetti on CTA click (for Send Help vibe):
<script>
function confetti(e) {
  for (let i = 0; i < 50; i++) {
    const c = document.createElement('div');
    c.style.cssText = 'position:fixed;width:8px;height:8px;border-radius:50%;pointer-events:none;z-index:9999;';
    c.style.background = ['#FF6B6B','#FFD93D','#6BCB77','#4D96FF','#9B59B6','#FF6B8A'][Math.floor(Math.random()*6)];
    c.style.left = e.clientX + 'px';
    c.style.top = e.clientY + 'px';
    document.body.appendChild(c);
    const angle = Math.random() * Math.PI * 2;
    const velocity = 80 + Math.random() * 200;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity - 100;
    let x = 0, y = 0, opacity = 1;
    function animate() {
      x += vx * 0.016; y += vy * 0.016; vy2 = vy + 600 * 0.016; opacity -= 0.02;
      c.style.transform = 'translate('+x+'px,'+y+'px)';
      c.style.opacity = Math.max(0, opacity);
      if (opacity > 0) requestAnimationFrame(animate); else c.remove();
    }
    let vy2 = vy;
    animate();
  }
}
</script>
`;

const VIBE_BUILD_INSTRUCTIONS = {
  boardroom: `BUILD INSTRUCTIONS — BOARDROOM:
- Background: light (#FAFAF8 or #FFFFFF). Max-width: 720px centered. Single column.
- Typography: Serif headlines (Playfair Display, EB Garamond, or Lora). Sans body (Inter, DM Sans). NO display/decorative fonts.
- Color: Maximum 2 colors — one neutral dark, one subtle accent from the company brand. No gradients.
- Spacing: Extremely generous. 80-120px between sections. 1px horizontal lines as dividers.
- Interactions: NONE. No JavaScript. No animations. No hover effects. Pure static HTML/CSS. Content IS the design.
- Metrics: Use Pattern A (stat ribbon) or Pattern C (inline proof). Never use flashy cards.
- Hero: Clean, understated. Let a single metric or claim lead. Name + title below in small text.
- Overall: If it feels like too much, remove something. Restraint is the entire point.`,

  challenger: `BUILD INSTRUCTIONS — CHALLENGER:
- Background: Dark (#0A0A0B, #111113, or #0F172A). Full-width sections, no max-width constraint on backgrounds.
- Typography: Heavy display sans for headlines at 60-80px (Space Grotesk 700, Archivo Black, or Bebas Neue). Clean sans for body (DM Sans, Inter). ALL CAPS for section labels.
- Color: One bright accent from company brand on dark bg. If unsure, use electric blue (#3B82F6) or hot orange (#FF5C35). High contrast everywhere.
- Spacing: Tight and punchy. Short sections. Rapid-fire information delivery.
- Interactions: Scroll-triggered fade-ups. Animated counters on metrics. Subtle parallax on hero. Nothing more.
- Metrics: Use Pattern B (accent-bordered cards) with large numbers (36-48px). Display metrics early — in the hero or immediately after.
- Hero: Full viewport. Massive headline. 1-2 sentences max. A bold claim, not a greeting.
- Overall: Every sentence should hit. Cut all filler words. If a section has more than 3 sentences, it is too long.`,

  showstopper: `BUILD INSTRUCTIONS — SHOWSTOPPER:
- Background: Light, matching company brand (white, cream, or their light shade). Alternate between full-width colored sections and white sections.
- Typography: Distinctive serif for headlines (Instrument Serif, Fraunces, or Playfair Display italic). Clean sans for body. Use the company fonts if you can identify them.
- Color: Pull 2-3 colors from the company brand. Use accent color for: badges, border-left on cards, section labels, hover states. Never large color fills.
- Spacing: Rich but structured. 60-80px between sections. Cards with 24px padding. Clear visual hierarchy.
- Interactions: Scroll-triggered reveals on EVERY section. Hover lift+shadow on cards. URL parameter personalization (?name=X). Animated counters optional.
- Metrics: Use Pattern B (cards with left border). Include context text below each number.
- Hero: Full viewport with a story-driven headline specific to the company. Include a personalizable greeting. Animated entrance.
- Timeline: MUST include a career journey timeline (use the vertical timeline pattern).
- 90-day plan: MUST include (use the three-column pattern).
- Personalization: MUST include URL param reading and a visible personalization bar.
- Overall: This should feel like someone spent a weekend crafting it specifically for this company. Dense with content but beautifully organized.`,

  sendhelp: `BUILD INSTRUCTIONS — SEND HELP:
- Background: Dark base (#0A0A0B) with unexpected color moments. Gradient sections are welcome. Glassmorphism cards (backdrop-filter:blur + rgba bg) encouraged.
- Typography: TWO display fonts — one heavy sans (Dela Gothic One, Bebas Neue, or Archivo Black) and one elegant serif (Instrument Serif italic, Playfair Display italic). Mix them aggressively. Hero at 80-100px. Some text at slight rotations (1-2deg).
- Color: Bold and unexpected. Neon accent on dark, OR vibrant gradient, OR surprising combo (lime+navy, coral+purple). CSS gradients encouraged. The company brand color should appear but remixed.
- Layout: BREAK CONVENTIONS. Overlapping elements. Diagonal clip-path section dividers. A scrolling marquee/ticker. Cards at slight rotations. Full-bleed sections that surprise.
- Interactions: ALL OF THEM. Custom CSS cursor. Confetti on CTA click. Scroll-triggered reveals with staggered delays. Animated gradient backgrounds. Mouse-reactive elements. At least ONE easter egg (hidden message on element click, or konami code, or something unexpected). Typewriter effect on hero text.
- Metrics: Present in unexpected ways — a faux terminal output, a receipt format, oversized scattered across the page, or animated counters that overshoot then settle.
- Hero: Massive. Theatrical. The headline should make someone laugh or say "holy shit." Include an animated element — typewriter, gradient shift, or parallax.
- Overall: This should be the page someone screenshots and shares in Slack saying "you have to see this application." Every scroll should reveal something unexpected. But it must STILL sell the candidate — chaos without substance is just noise.`,
};

export async function POST(request) {
  const { apiKey, strategy, vibe } = await request.json();

  if (!apiKey || !strategy) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const buildInstructions = VIBE_BUILD_INSTRUCTIONS[vibe] || VIBE_BUILD_INSTRUCTIONS.showstopper;

  const systemPrompt = `You are an elite frontend developer and designer who builds award-winning landing pages. You have won multiple Awwwards and CSS Design Awards. You write beautiful, production-quality HTML/CSS/JS.

${buildInstructions}

REFERENCE LIBRARY — Use these proven patterns:
${REFERENCE_PATTERNS}

TECHNICAL REQUIREMENTS:
1. Return ONLY valid HTML. Start with <!DOCTYPE html>, end with </html>. NO markdown, NO explanation.
2. Everything in ONE file — inline <style> and <script>.
3. Load Google Fonts via <link> in <head>.
4. Must be responsive (clamp() for fonts, flexible grids, media queries for mobile).
5. All animations use transform and opacity ONLY.
6. Define a CSS custom property palette in :root matching the strategy colors.
7. NO external images. Create visuals with CSS (gradients, shapes, borders, clip-paths).
8. The page must feel like a real product, not a template. Every element intentional.
9. Minimum 2000 lines of HTML. This should be a SUBSTANTIAL page with real depth.
10. Every section must have real, specific content from the strategy — never use placeholder text.`;

  const userPrompt = `Build the landing page using this approved creative strategy:

${JSON.stringify(strategy, null, 2)}

USE THE EXACT headline, colors, fonts, metrics, experience matches, and 90-day plan from the strategy above.
USE THE REFERENCE PATTERNS from your instructions for layout and interaction patterns.
DO NOT simplify or skip sections. Build EVERY section listed in the strategy.
The page should be substantial — at minimum: Hero, Metrics, Experience Match (5+ cards), Career Timeline, 90-Day Plan, Why This Company, and CTA.

Return ONLY the HTML. Start with <!DOCTYPE html>.`;

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
