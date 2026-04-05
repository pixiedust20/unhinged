'use client';

import { useState } from 'react';
import Link from 'next/link';

const GALLERY_ITEMS = [
  {
    company: 'Wispr Flow', role: 'India GTM Growth', vibe: 'Showstopper',
    color: 'var(--sage)', colorLight: 'var(--sage-light)',
    description: 'Voice-first dictation app. A macOS Flow simulator, real usage stats, and a typewriter cycling through dictated phrases.',
    hook: 'The meta hook: the entire application was dictated on Flow — not typed.',
    features: ['Live product simulator', 'Real usage data', 'Dictation-as-proof'],
    preview: { headline: "\"I didn't type a single word of this application\"", sections: ['Interactive Flow simulator', 'WPM stats dashboard', 'India GTM 90-day plan', 'Channel-by-channel strategy'] },
  },
  {
    company: 'ElevenLabs', role: 'Growth Lead, Eleven Music', vibe: 'Showstopper',
    color: 'var(--plum)', colorLight: 'var(--plum-light)',
    description: 'Audio AI company. Interactive waveform journey with animated sound bars and personalized greetings via URL parameters.',
    hook: '11 sections matching their brand number. Per-recruiter personalization via URL.',
    features: ['Audio waveforms', 'URL personalization', '90-day plan'],
    preview: { headline: "\"11 reasons I'm your next growth lead\"", sections: ['Animated waveform hero', 'Brand-number structure', 'Career journey timeline', 'Personalized greeting system'] },
  },
  {
    company: 'Hyperbound', role: 'Founding Creative Strategist', vibe: 'Send Help',
    color: 'var(--coral)', colorLight: 'var(--coral-light)',
    description: 'AI roleplay for sales teams. Full-chaos energy with guerrilla marketing concepts and interactive co-founder greetings.',
    hook: 'The most unhinged page on this list. Matched their bold ideas energy exactly.',
    features: ['Co-founder callouts', 'Guerrilla concepts', 'Full chaos'],
    preview: { headline: "\"I'm probably too much for most companies. Luckily, Hyperbound isn't most companies.\"", sections: ['Personalized founder greetings', 'Stunt campaign mockups', 'Field activation playbook', 'Content production portfolio'] },
  },
  {
    company: 'Clay', role: 'Founding Marketer, EMEA', vibe: 'Challenger',
    color: 'var(--ochre)', colorLight: 'var(--ochre-light)',
    description: 'Data enrichment platform. Clean, data-centric aesthetic with pipeline metrics and a direct EMEA market entry plan.',
    hook: "Mirrored Clay's own design language — data-forward, enterprise-ready.",
    features: ['Pipeline metrics', 'EMEA strategy', 'Brand-matched'],
    preview: { headline: "\"Your EMEA pipeline, visualized before day one\"", sections: ['Pipeline metrics cards', 'EMEA market analysis', 'Enterprise positioning', '90-day EMEA plan'] },
  },
  {
    company: 'Granola', role: 'Content Lead', vibe: 'Challenger',
    color: 'var(--plum)', colorLight: 'var(--plum-light)',
    description: 'AI notepad for meetings. Editorial-inspired page showcasing content strategy, distribution expertise, and bold campaign ideas.',
    hook: 'Proved content thinking by making the application itself a piece of content.',
    features: ['Editorial layout', 'Channel strategy', 'Campaign concepts'],
    preview: { headline: "\"Stories are how you get there. Here's mine.\"", sections: ['Content strategy framework', 'Distribution channel map', 'Campaign concepts', 'Organic growth playbook'] },
  },
  {
    company: 'Solve Intelligence', role: 'Growth Lead', vibe: 'Showstopper',
    color: 'var(--accent)', colorLight: 'var(--accent-light)',
    description: 'AI patent drafting. Dark aesthetic framed as a patent filing — with a live AI widget scoring candidate-role fit.',
    hook: 'Domain-specific design that spoke their exact language — patents, claims, prior art.',
    features: ['Patent-filing frame', 'AI analysis widget', 'Legal-tech aesthetic'],
    preview: { headline: "\"Filing: Application for Growth Lead — Exhibit A\"", sections: ['Patent-style claim structure', 'AI fit-score widget', 'Prior art (experience)', 'Claims (90-day plan)'] },
  },
  {
    company: 'Fastlane AI', role: 'Growth Partner', vibe: 'Boardroom',
    color: 'var(--sage)', colorLight: 'var(--sage-light)',
    description: 'AI services firm. Interactive department map with 12 clickable functions, each revealing AI use cases and projected impact.',
    hook: 'Positioned as a partner, not an applicant. The page sold the collaboration.',
    features: ['Interactive dept. map', '12 function drill-downs', 'Partnership framing'],
    preview: { headline: "\"Every executive knows they need AI. Nobody knows where to start.\"", sections: ['12-department interactive map', 'AI readiness scoring', 'Decision overload visualization', 'Partnership value prop'] },
  },
];

function GalleryCard({ item, isFlipped, onFlip }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onClick={onFlip} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ perspective: 1000, cursor: 'pointer', minHeight: 290 }}>
      <div style={{ position: 'relative', width: '100%', minHeight: 290, transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)', transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'none' }}>
        <div style={{ position: isFlipped ? 'absolute' : 'relative', inset: 0, backfaceVisibility: 'hidden', background: hovered && !isFlipped ? item.colorLight : 'var(--bg-card)', border: '1px solid', borderColor: hovered && !isFlipped ? 'var(--border-hover)' : 'var(--border)', borderRadius: 10, padding: '28px 24px', display: 'flex', flexDirection: 'column', transition: 'background 0.3s, border-color 0.3s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 400, letterSpacing: '-0.01em' }}>{item.company}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-tertiary)', marginTop: 3, fontWeight: 300 }}>{item.role}</div>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 400, color: item.color, background: item.colorLight, padding: '4px 10px', borderRadius: 4 }}>{item.vibe}</span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12, fontWeight: 300 }}>{item.description}</p>
          <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6, fontFamily: 'var(--font-display)', fontStyle: 'italic', marginBottom: 16 }}>{item.hook}</p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 'auto' }}>
            {item.features.map((f, j) => (<span key={j} style={{ fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 300, color: 'var(--text-tertiary)', padding: '3px 8px', border: '1px solid var(--border)', borderRadius: 4 }}>{f}</span>))}
          </div>
          <div style={{ marginTop: 16, fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)', fontWeight: 400, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ display: 'inline-block', width: 16, height: 1, background: item.color }} />See page breakdown
          </div>
        </div>
        <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10, padding: '28px 24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: item.color, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>{item.company} — page preview</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontStyle: 'italic', fontWeight: 300, color: 'var(--text)', lineHeight: 1.4, marginBottom: 22 }}>{item.preview.headline}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
            {item.preview.sections.map((s, j) => (<div key={j} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 12px', background: item.colorLight, borderRadius: 6 }}><span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: item.color, minWidth: 18, fontWeight: 400 }}>{'0' + (j + 1)}</span><span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 400 }}>{s}</span></div>))}
          </div>
          <div style={{ marginTop: 16, fontSize: 11, color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', fontWeight: 300, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ display: 'inline-block', width: 16, height: 1, background: 'var(--text-tertiary)' }} />Flip back
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [flippedCards, setFlippedCards] = useState({});
  const toggleCard = (i) => setFlippedCards(prev => ({ ...prev, [i]: !prev[i] }));
  const eyebrow = { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-tertiary)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20, fontWeight: 300 };
  const section = { padding: '80px 40px', maxWidth: 960, margin: '0 auto' };

  return (
    <div>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 22 }}>Unhinged</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <a href="#story" style={{ color: 'var(--text-tertiary)', textDecoration: 'none', fontSize: 12 }}>Why</a>
          <a href="#work" style={{ color: 'var(--text-tertiary)', textDecoration: 'none', fontSize: 12 }}>Work</a>
          <a href="#how" style={{ color: 'var(--text-tertiary)', textDecoration: 'none', fontSize: 12 }}>Process</a>
          <Link href="/generate" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: 12, fontWeight: 500, padding: '7px 18px', border: '1px solid var(--accent)', borderRadius: 6 }}>Build yours</Link>
        </div>
      </nav>

      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '120px 40px 80px', maxWidth: 960, margin: '0 auto' }}>
        <div style={eyebrow}>For marketers who build</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 5.5vw, 66px)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 28 }}>
          Engineers have <span style={{ color: 'var(--sage)' }}>GitHub.</span><br />
          Designers have <span style={{ color: 'var(--plum)' }}>portfolios.</span><br />
          <span style={{ fontStyle: 'italic' }}>What do marketers have?</span>
        </h1>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)', maxWidth: 480, lineHeight: 1.8, marginBottom: 16, fontWeight: 300 }}>
          Not a resume. Not a cover letter. A <em style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 17 }}>page.</em>
        </p>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', maxWidth: 480, lineHeight: 1.8, marginBottom: 44, fontWeight: 300 }}>
          Unhinged turns your resume and a job description into a custom, interactive landing page that matches the company brand and makes your case better than any PDF ever could.
        </p>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/generate" style={{ background: 'var(--accent)', color: '#fff', padding: '12px 28px', borderRadius: 6, textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>Build your page — free</Link>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 300 }}>Takes 60 seconds. Powered by Claude.</span>
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 64, flexWrap: 'wrap' }}>
          {[{ num: '9+', label: 'real pages built', bg: 'var(--sage-light)', color: 'var(--sage)' }, { num: '4', label: 'vibe modes', bg: 'var(--plum-light)', color: 'var(--plum)' }, { num: '60s', label: 'to generate', bg: 'var(--ochre-light)', color: 'var(--ochre)' }, { num: '0', label: 'PDFs sent', bg: 'var(--coral-light)', color: 'var(--coral)' }].map((s, i) => (
            <div key={i} style={{ background: s.bg, padding: '10px 18px', borderRadius: 8, display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 400, color: s.color }}>{s.num}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: s.color, fontWeight: 300 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="story" style={{ ...section, borderTop: '1px solid var(--border)' }}>
        <div style={eyebrow}>The problem</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 300, lineHeight: 1.25, marginBottom: 20 }}>
              When an engineer applies, they send a <span style={{ color: 'var(--sage)' }}>GitHub link.</span> When a designer applies, they send a <span style={{ color: 'var(--plum)' }}>portfolio.</span>
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 300, marginBottom: 14 }}>Both say the same thing: <em style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}>{'"'}Don{"'"}t take my word for it. Look at what I{"'"}ve built.{'"'}</em></p>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 300 }}>Marketers don{"'"}t have that. We send the same PDF as everyone else, then hope someone reads past the first bullet point.</p>
          </div>
          <div style={{ background: 'var(--bg-warm)', borderRadius: 10, padding: 28, border: '1px solid var(--border)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-tertiary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>What if instead of this...</div>
            <div style={{ background: 'var(--bg)', borderRadius: 6, padding: '16px 20px', border: '1px solid var(--border)', marginBottom: 12, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 300, lineHeight: 1.8 }}>resume_final_v3_FINAL.pdf<br />cover_letter_generic.docx</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--coral)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>...you sent this</div>
            <div style={{ background: 'var(--coral-light)', borderRadius: 6, padding: '16px 20px', border: '1px solid rgba(196,101,74,0.15)', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--coral)', fontWeight: 400, lineHeight: 1.8 }}>yourname-x-company.unhinged.so<br /><span style={{ fontWeight: 300, fontSize: 11, opacity: 0.7 }}>Interactive, brand-matched, unforgettable</span></div>
          </div>
        </div>
      </section>

      <section id="how" style={{ ...section, borderTop: '1px solid var(--border)' }}>
        <div style={eyebrow}>Process</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28 }}>
          {[{ step: '01', title: 'Your resume', desc: 'Drop in the text. AI extracts skills, achievements, metrics, and narrative.', color: 'var(--sage)', bg: 'var(--sage-light)' }, { step: '02', title: 'The role + company', desc: 'Paste the JD and company URL. AI maps their brand, positioning, and team.', color: 'var(--plum)', bg: 'var(--plum-light)' }, { step: '03', title: 'Pick a vibe', desc: 'From polished to creative chaos. Four modes, four entirely different outputs.', color: 'var(--ochre)', bg: 'var(--ochre-light)' }, { step: '04', title: 'Your page', desc: 'A complete interactive landing page. Copy, download, or open in a new tab.', color: 'var(--coral)', bg: 'var(--coral-light)' }].map((item, i) => (
            <div key={i}>
              <div style={{ display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: 11, color: item.color, background: item.bg, padding: '4px 10px', borderRadius: 4, marginBottom: 14, fontWeight: 400 }}>{item.step}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 400, marginBottom: 8 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 300 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ ...section, borderTop: '1px solid var(--border)' }}>
        <div style={eyebrow}>The vibe dial</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 300, marginBottom: 44 }}>Same resume. <span style={{ fontStyle: 'italic' }}>Four different pages.</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {[{ name: 'Boardroom', symbol: '\u2014', desc: 'Clean, data-forward, executive summary. Serif fonts, metrics, white space.', color: 'var(--sage)' }, { name: 'Challenger', symbol: '/', desc: 'Bold type, high contrast. Short sentences. Numbers that hit.', color: 'var(--ochre)' }, { name: 'Showstopper', symbol: '*', desc: 'Brand-matched, interactive. Timelines, cards, personalized greetings.', color: 'var(--plum)' }, { name: 'Send Help', symbol: '~', desc: 'Full chaos. Easter eggs, confetti, custom cursors. Memorable or unhinged.', color: 'var(--coral)' }].map((v, i) => (
            <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '24px 20px', borderTop: '3px solid ' + v.color }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color: v.color, marginBottom: 14, fontWeight: 300 }}>{v.symbol}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 400, marginBottom: 8 }}>{v.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 300 }}>{v.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="work" style={{ ...section, borderTop: '1px solid var(--border)' }}>
        <div style={eyebrow}>Selected work</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 300, marginBottom: 8 }}>Pages that got responses.</h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 44, maxWidth: 440, lineHeight: 1.7, fontWeight: 300 }}>Hand-crafted for real applications at real companies. Click any card to see the page breakdown.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
          {GALLERY_ITEMS.map((item, i) => (<GalleryCard key={i} item={item} isFlipped={!!flippedCards[i]} onFlip={() => toggleCard(i)} />))}
        </div>
      </section>

      <section style={{ ...section, borderTop: '1px solid var(--border)' }}>
        <div style={eyebrow}>How it works, practically</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 300, marginBottom: 16, lineHeight: 1.3 }}>Free to use.<br /><span style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>Powered by your Claude API key.</span></h2>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 300, marginBottom: 14 }}>Unhinged uses Claude (by Anthropic) to generate your pages. You bring your own API key — we never store it, and it never leaves your browser.</p>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 300 }}>New to Claude? Sign up at console.anthropic.com — you get $5 in free credits, enough for about 30 pages.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[{ s: '1', t: 'Go to console.anthropic.com', d: 'Create a free account (no credit card needed)' }, { s: '2', t: 'Copy your API key', d: 'Settings \u2192 API Keys \u2192 Create Key' }, { s: '3', t: 'Paste it in Unhinged', d: 'Stays in your browser. We never see it.' }].map((item, i) => (
              <div key={i} style={{ background: 'var(--bg-warm)', borderRadius: 8, padding: '16px 20px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 400, color: 'var(--accent)', minWidth: 24 }}>{item.s}</span>
                <div><div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{item.t}</div><div style={{ fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 300 }}>{item.d}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 40px', maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 300, lineHeight: 1.15, marginBottom: 12 }}>Your next application<br />deserves more than <span style={{ fontStyle: 'italic' }}>a PDF.</span></h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 28, fontWeight: 300 }}>Show them what a marketer can build.</p>
        <Link href="/generate" style={{ display: 'inline-block', background: 'var(--accent)', color: '#fff', padding: '13px 32px', borderRadius: 6, textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>Build your page — free</Link>
      </section>

      <footer style={{ padding: '28px 40px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 300 }}>Built by Cherry Jain</div>
        <div style={{ display: 'flex', gap: 20 }}>
          {[{ l: 'GitHub', h: 'https://github.com/pixiedust20' }, { l: 'LinkedIn', h: 'https://linkedin.com/in/cherryyadvendu' }, { l: 'Twitter', h: 'https://twitter.com/cherryyadvendu' }].map(link => (
            <a key={link.l} href={link.h} target="_blank" rel="noopener" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-tertiary)', textDecoration: 'none', fontWeight: 300 }}>{link.l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
