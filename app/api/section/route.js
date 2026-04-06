export const runtime = 'edge';

var STYLE_INSTRUCTIONS = {};
STYLE_INSTRUCTIONS.editorial = 'STYLE: Editorial — Light bg, elegant serif headlines, clean sans body. Max-width 900px centered. Generous whitespace (80-120px sections). Color as sparse accent only. Thin 1px dividers. Monospace labels. Subtle fade-up reveals. Magazine feel.';
STYLE_INSTRUCTIONS.bold_dark = 'STYLE: Bold Dark — Dark bg (#0A0A0B), heavy display sans headlines at 60-90px. ONE bright accent. ALL CAPS labels. Full-width sections. Animated counters. Gradient text. High contrast, high confidence.';
STYLE_INSTRUCTIONS.warm_minimal = 'STYLE: Warm Minimal — Cream bg (#FAF8F5), friendly rounded sans. Rounded corners everywhere (12-16px). Soft shadows. Warm accents. Gentle hover animations. Pill badges. Professional but friendly.';
STYLE_INSTRUCTIONS.creative_studio = 'STYLE: Creative Studio — TWO contrasting fonts (heavy sans + elegant serif italic). Break the grid. Overlapping elements. Extreme size hierarchy. Bold color blocks. Scrolling marquee. Controlled creativity.';
STYLE_INSTRUCTIONS.corporate_clean = 'STYLE: Corporate Clean — White bg, ONE sans family throughout. Structured grid. Company accent as sole color. Even spacing. Thin borders. Section numbering (01/02/03). Zero flash, maximum substance.';

var SECTION_PROMPTS = {};

SECTION_PROMPTS.hero_typewriter = {
  name: 'Hero — Typewriter',
  instruction: 'Build a HERO with typewriter effect. Full viewport (min-height:100vh). Cycling typewriter types 3-4 phrases about candidate, pauses, erases, types next. Blinking cursor in mono font. Candidate name + title. Punchy headline SPECIFIC to company. 3-4 stat pills below. Subtle bg element (gradient orb or grid lines). TYPEWRITER JS: (function(){var el=document.getElementById("typer");var phrases=["phrase1","phrase2","phrase3"];var i=0,c=0;function type(){if(c<=phrases[i].length){el.innerHTML=phrases[i].slice(0,c)+"<span style=\\"color:var(--accent);animation:blink .7s step-end infinite\\">|</span>";c++;setTimeout(type,30+Math.random()*30)}else{setTimeout(function(){c=0;i=(i+1)%phrases.length;el.innerHTML="<span style=\\"color:var(--accent);animation:blink .7s step-end infinite\\">|</span>";setTimeout(type,400)},3000)}}setTimeout(type,800)})();'
};

SECTION_PROMPTS.hero_bold = {
  name: 'Hero — Bold statement',
  instruction: 'Build a HERO with massive bold statement. Full viewport. HUGE headline (60-100px clamp) making a specific claim about why this candidate belongs at THIS company. Mix serif + sans or use italic for emphasis. 3-4 stat cards or pills with key metrics. Candidate name + title smaller. Staggered entrance animation. One accent design element.'
};

SECTION_PROMPTS.hero_meta = {
  name: 'Hero — Meta proof',
  instruction: 'Build a HERO where the page itself IS proof. Full viewport. Headline references the APPLICATION as proof of skill. Floating status bar reinforcing the concept. Simulated product UI (macOS window with dots, or terminal). Candidate stats in the simulated UI. Feels like a product demo.'
};

SECTION_PROMPTS.hero_story = {
  name: 'Hero — Story opener',
  instruction: 'Build a HERO with narrative hook. Full viewport. Opens with provocative question in serif italic (32-48px). 1-2 setup sentences. Candidate name revealed with animation. Generous whitespace. Single accent element. Scroll indicator at bottom.'
};

SECTION_PROMPTS.metrics_cards = {
  name: 'Metrics — Accent cards',
  instruction: 'Build COMPACT METRICS with accent-bordered cards. Section header: small eyebrow + ONE-LINE headline (max 60 chars). Grid of 4-6 cards in 3 columns (2 on mobile). Each card: number at 28-32px (NOT larger), label in mono 10px, ONE line of context. Left border 3px accent. Numbers animate on scroll. Cards have max-width and consistent height. Section max-height 70vh. DO NOT use oversized numbers. COUNTER: function animateCounter(el){var t=parseFloat(el.dataset.target),d=1500,s=performance.now();function u(n){var p=Math.min((n-s)/d,1),e=1-Math.pow(1-p,3);el.textContent=(el.dataset.prefix||"")+Math.round(t*e).toLocaleString()+(el.dataset.suffix||"");if(p<1)requestAnimationFrame(u)}requestAnimationFrame(u)}'
};

SECTION_PROMPTS.metrics_ribbon = {
  name: 'Metrics — Stat ribbon',
  instruction: 'Build horizontal METRICS ribbon. Full-width bar with 4 stats side by side separated by thin lines. Each: large number (headline font 28-36px) + small label (mono 11px). Subtle background. Numbers animate on scroll.'
};

SECTION_PROMPTS.metrics_inline = {
  name: 'Metrics — Inline narrative',
  instruction: 'Build METRICS woven into narrative. 2-3 SHORT paragraphs (3-4 sentences each) where key numbers are styled in accent color and slightly larger (1.2em, NOT 36-48px). Numbers stay inline with text flow — same line height. Body text at 18-22px serif. Keep the section under 60vh. Do NOT make numbers tower over surrounding text.'
};

SECTION_PROMPTS.experience_cards = {
  name: 'Experience — Requirement cards',
  instruction: 'Build EXPERIENCE MATCH with cards. Section header: small eyebrow + short headline. 2-column grid (single mobile). Pick 5-6 STRONGEST matches only. Each card: colored category label (mono 10px), requirement as bold title (14px, max 2 lines), proof with ONE metric (13px body), company tag. Cards have consistent height. Card padding 20px. Hover lift. Scroll reveal staggered.'
};

SECTION_PROMPTS.experience_table = {
  name: 'Experience — Comparison table',
  instruction: 'Build EXPERIENCE as comparison table. Two columns: What you need vs What I bring. MAXIMUM 6 rows (pick the 6 strongest matches). Each row: compact — requirement title (bold, 14px) on left, metric badge + 1-2 sentence proof on right. Row padding 16px. Alternating backgrounds. Checkmarks. Summary at bottom. The ENTIRE table should fit in 2 scrolls max on desktop. If the JD has more than 6 requirements, merge similar ones.'
};

SECTION_PROMPTS.timeline = {
  name: 'Career timeline',
  instruction: 'Build vertical CAREER TIMELINE. 2px line on left. Include ALL roles from the resume (typically 3-4 + education). Each stop: colored dot, date (mono 11px), company name (headline font 20-24px, NOT larger), role (body 14px), ONE achievement sentence with metric. Achievement in a compact card (padding 16px). NO skill tags under each role — keep it clean. Most recent has pulsing current indicator. Scroll reveal. The entire timeline should fit in 2-3 scrolls.'
};

SECTION_PROMPTS.plan = {
  name: '90-day plan',
  instruction: 'Build 30/60/90 DAY PLAN. Three columns (stacked mobile). Each: colored top border (different per phase), mono phase label, bold title (Learn/Build/Scale), 3-5 SPECIFIC actions. Actions must be specific like "Interview 15 users" not vague like "Learn the product". Scroll reveal with stagger.'
};

SECTION_PROMPTS.why_company = {
  name: 'Why this company',
  instruction: 'Build WHY THIS COMPANY section. Short headline (1 line). TWO paragraphs max (4-5 sentences each). Reference SPECIFIC things about the company. NOT generic flattery. One optional pull quote. Serif headline, clean body. Section should fit in 1-1.5 scrolls. Do NOT write an essay — this is a love letter, not a thesis.'
};

SECTION_PROMPTS.interactive_simulator = {
  name: 'Interactive — Product simulator',
  instruction: 'Build INTERACTIVE product simulator. macOS window frame (three dots, title bar, rounded corners, shadow). Inside: simplified simulation of company product. For data tools: table that enriches rows on button click. For content tools: text editor. For sales tools: pipeline UI. MUST BE FUNCTIONAL: buttons trigger animations and state changes.'
};

SECTION_PROMPTS.interactive_before_after = {
  name: 'Interactive — Before/After',
  instruction: 'Build BEFORE/AFTER comparison. Two panels. Before: generic approach (boring resume, template). After: candidate approach (specific metrics, tailored strategy). Range slider morphing between views. Labels on each end. Demonstrates strategic thinking.'
};

SECTION_PROMPTS.interactive_tabs = {
  name: 'Interactive — Tabbed resume',
  instruction: 'Build TABBED INTERFACE. 3-5 tabs (by company, skill, or achievement type). Active tab has accent styling. Each panel: rich content with metrics and descriptions. Smooth fade transitions. Feels like a product dashboard.'
};

SECTION_PROMPTS.cta = {
  name: 'CTA — Contact',
  instruction: 'Build CTA section. ONE punchy headline (2 lines max). Email mailto link + LinkedIn link side by side. Optional one-line tagline. No stat ribbons, no proof points — those were in earlier sections. The CTA should fit in ONE viewport. Confident, minimal, done.'
};

SECTION_PROMPTS.personal = {
  name: 'Personal touch',
  instruction: 'Build PERSONAL section. 3-4 items max. Each item: emoji or icon + title (14px bold) + ONE sentence description (13px). Use a horizontal grid (3-4 columns on desktop). Different background. Section max-height 40vh. Keep it light and quick — the reader should spend 5 seconds here, not 30.'
};

export async function POST(request) {
  var body = await request.json();
  var apiKey = body.apiKey;
  var sectionType = body.sectionType;
  var resume = body.resume;
  var jd = body.jd;
  var companyUrl = body.companyUrl;
  var companyName = body.companyName;
  var roleTitle = body.roleTitle;
  var hiringManager = body.hiringManager;
  var designSystem = body.designSystem;
  var tonality = body.tonality;
  var style = body.style;

  if (!apiKey || !sectionType || !resume || !jd) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  var section = SECTION_PROMPTS[sectionType];
  if (!section) {
    return new Response(JSON.stringify({ error: 'Unknown section: ' + sectionType }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  var styleGuide = STYLE_INSTRUCTIONS[style] || STYLE_INSTRUCTIONS.editorial;

  var toneGuides = {};
  toneGuides.professional = 'Tone: Measured, authoritative. No humor. Precise.';
  toneGuides.conversational = 'Tone: Warm, approachable. Like a smart friend.';
  toneGuides.bold = 'Tone: Confident, direct. Short sentences. Cut filler.';
  toneGuides.witty = 'Tone: Clever, self-aware. Smart humor.';
  toneGuides.storyteller = 'Tone: Narrative-driven. Build tension, reveal payoff.';

  var toneGuide = toneGuides[tonality] || toneGuides.conversational;

  var dsInfo = 'Use clean defaults.';
  if (designSystem && designSystem.palette) {
    dsInfo = 'Colors: --primary:' + designSystem.palette.primary + '; --accent:' + designSystem.palette.accent + '; --bg:' + designSystem.palette.background + '; --bg-card:' + designSystem.palette.card + '; --text:' + designSystem.palette.text + '; --text-muted:' + designSystem.palette.muted + '; --border:' + designSystem.palette.border + '; Fonts: --font-headline:' + designSystem.fonts.headline + '; --font-body:' + designSystem.fonts.body + '; --font-mono:' + designSystem.fonts.mono;
  }

  var systemPrompt = 'You are an elite frontend developer and designer. Build ONE section of a landing page. Your work wins design awards.\n\n' + section.instruction + '\n\n' + styleGuide + '\n\n' + toneGuide + '\n\nDESIGN SYSTEM (use these CSS variables already in :root):\n' + dsInfo + '\n\nRULES:\n1. Return ONLY a single <section> or <div>. No <!DOCTYPE>, <html>, <head>, <body>.\n2. Inline <style> inside section for animations. PREFIX all class names with section type.\n3. Use var() for ALL colors and fonts.\n4. Include <script> wrapped in IIFE: (function(){ ... })();\n5. ALWAYS close all <script> tags. Unclosed scripts break the page.\n6. Add class="reveal" on elements for scroll animation.\n7. Responsive: clamp() fonts, flexible grids, @media (max-width:768px).\n8. Use REAL content from resume and JD. Never placeholder text.\n9. Make it BEAUTIFUL. Every detail matters.\n10. COMPACTNESS: Section padding max 60px vertical. No section should exceed 80vh on desktop. Reduce whitespace between elements. Use 2-column layouts to reduce scroll height. If showing metrics, use a compact ribbon or inline format — never oversized numbers that dominate the page.\n11. AVOID REPETITION: Do NOT repeat metrics or achievements that appear in other sections. Each section shows DIFFERENT content. If the hero already showed $1.71M pipeline, the metrics section must show DIFFERENT numbers.\n12. RESPONSIVE DENSITY: Body text 14-16px max. Card padding 16-24px max. Section gaps 40-60px max. Headings should never exceed 2 lines on desktop.';

  var userPrompt = 'Build the "' + section.name + '" section.\n\nRESUME:\n' + resume + '\n\nJOB DESCRIPTION:\n' + jd + '\n\nCompany: ' + (companyName || 'the company') + '\n' + (companyUrl ? 'URL: ' + companyUrl : '') + '\n' + (roleTitle ? 'Role: ' + roleTitle : '') + '\n' + (hiringManager ? 'Manager: ' + hiringManager : '') + '\n\nReturn ONLY the HTML section. Start with <section or <div. CLOSE ALL SCRIPT TAGS.';

  try {
    var response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-opus-4-6', max_tokens: 8000, stream: true, system: systemPrompt, messages: [{ role: 'user', content: userPrompt }] }),
    });

    if (!response.ok) {
      var errData = await response.json();
      return new Response(JSON.stringify({ error: errData.error?.message || 'Failed' }), { status: response.status, headers: { 'Content-Type': 'application/json' } });
    }

    var reader = response.body.getReader();
    var decoder = new TextDecoder();
    var stream = new ReadableStream({
      async start(controller) {
        var encoder = new TextEncoder();
        var buffer = '';
        while (true) {
          var result = await reader.read();
          if (result.done) break;
          buffer += decoder.decode(result.value, { stream: true });
          var lines = buffer.split('\n');
          buffer = lines.pop() || '';
          for (var k = 0; k < lines.length; k++) {
            if (lines[k].startsWith('data: ')) {
              var d = lines[k].slice(6).trim();
              if (d === '[DONE]') continue;
              try { var p = JSON.parse(d); if (p.type === 'content_block_delta' && p.delta && p.delta.text) controller.enqueue(encoder.encode(p.delta.text)); } catch(e) {}
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
