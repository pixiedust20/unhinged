'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const VIBES = [
  { id: 'boardroom', symbol: '\u2014', name: 'Boardroom', desc: 'Clean, editorial, data-forward', color: '#5A7A6A', bg: '#EDF3F0' },
  { id: 'challenger', symbol: '/', name: 'Challenger', desc: 'Bold, dark, high-contrast', color: '#A8853A', bg: '#F8F3E8' },
  { id: 'showstopper', symbol: '*', name: 'Showstopper', desc: 'Brand-matched, interactive, rich', color: '#6A5A8A', bg: '#F0EDF5' },
  { id: 'sendhelp', symbol: '~', name: 'Send Help', desc: 'Creative chaos, unforgettable', color: '#C4654A', bg: '#FAF0ED' },
];

const TONES = [
  { id: 'professional', name: 'Professional' },
  { id: 'conversational', name: 'Conversational' },
  { id: 'bold', name: 'Bold' },
  { id: 'witty', name: 'Witty' },
  { id: 'storyteller', name: 'Storyteller' },
];

const SECTIONS = [
  { category: 'Hero', options: [
    { id: 'hero_typewriter', name: 'Typewriter', desc: 'Cycling phrases with blinking cursor', icon: '|>' },
    { id: 'hero_bold', name: 'Bold statement', desc: 'Massive headline with stat pills', icon: 'Aa' },
    { id: 'hero_meta', name: 'Meta proof', desc: 'The page itself is the proof', icon: '{}' },
    { id: 'hero_story', name: 'Story opener', desc: 'Narrative hook in elegant serif', icon: '" "' },
  ]},
  { category: 'Metrics', options: [
    { id: 'metrics_cards', name: 'Accent cards', desc: 'Grid with animated counters', icon: '#' },
    { id: 'metrics_ribbon', name: 'Stat ribbon', desc: 'Horizontal bar with numbers', icon: '---' },
    { id: 'metrics_inline', name: 'Inline narrative', desc: 'Numbers woven into text', icon: 'A1' },
  ]},
  { category: 'Experience', options: [
    { id: 'experience_cards', name: 'Requirement cards', desc: 'JD mapped to your proof', icon: '[ ]' },
    { id: 'experience_table', name: 'Comparison table', desc: 'Side-by-side match view', icon: '||' },
  ]},
  { category: 'Journey', options: [
    { id: 'timeline', name: 'Career timeline', desc: 'Vertical scroll with dots', icon: '. .' },
  ]},
  { category: 'Plan', options: [
    { id: 'plan', name: '90-day plan', desc: 'Three-phase columns', icon: '30' },
  ]},
  { category: 'Interactive', options: [
    { id: 'interactive_simulator', name: 'Product simulator', desc: 'Simulated company product UI', icon: '[ ]' },
    { id: 'interactive_before_after', name: 'Before / After', desc: 'Slider comparing approaches', icon: '<>' },
    { id: 'interactive_tabs', name: 'Tabbed resume', desc: 'Tabbed interface for experience', icon: '__|' },
  ]},
  { category: 'Close', options: [
    { id: 'why_company', name: 'Why this company', desc: 'Genuine connection to their mission', icon: '!' },
    { id: 'personal', name: 'Personal touch', desc: 'Hobbies, interests, human side', icon: ':)' },
    { id: 'cta', name: 'Contact CTA', desc: 'Email, LinkedIn, call to action', icon: '@' },
  ]},
];

const DEFAULT_SELECTED = ['hero_bold', 'metrics_cards', 'experience_cards', 'timeline', 'plan', 'why_company', 'cta'];

export default function GeneratePage() {
  const [step, setStep] = useState('loading');
  const [resume, setResume] = useState('');
  const [resumeSaved, setResumeSaved] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [jd, setJd] = useState('');
  const [companyUrl, setCompanyUrl] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [roleTitle, setRoleTitle] = useState('');
  const [hiringManager, setHiringManager] = useState('');
  const [vibe, setVibe] = useState('showstopper');
  const [tonality, setTonality] = useState('conversational');
  const [selectedSections, setSelectedSections] = useState(DEFAULT_SELECTED);
  const [building, setBuilding] = useState(false);
  const [buildStatus, setBuildStatus] = useState({});
  const [error, setError] = useState('');
  const [generatedHTML, setGeneratedHTML] = useState('');
  const [designSystem, setDesignSystem] = useState(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('unhinged_resume');
    const key = localStorage.getItem('unhinged_api_key');
    if (saved) { setResume(saved); setResumeSaved(true); }
    if (key) setApiKey(key);
    const p = new URLSearchParams(window.location.search);
    if (p.get('jd')) setJd(decodeURIComponent(p.get('jd')));
    if (p.get('url')) setCompanyUrl(decodeURIComponent(p.get('url')));
    if (p.get('title')) setRoleTitle(decodeURIComponent(p.get('title')));
    setStep(saved ? 'input' : 'onboarding');
  }, []);

  function toggleSection(id) {
    setSelectedSections(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  }

  function saveResume() {
    if (!resume.trim()) { setError('Paste your resume.'); return; }
    localStorage.setItem('unhinged_resume', resume);
    setResumeSaved(true); setError(''); setStep('input');
  }

  async function buildAll() {
    if (!apiKey) { setError('Add your API key.'); return; }
    if (!jd) { setError('Add the job description.'); return; }
    if (selectedSections.length === 0) { setError('Select at least one section.'); return; }
    localStorage.setItem('unhinged_api_key', apiKey);
    setError(''); setBuilding(true); setBuildStatus({});

    try {
      // Step 1: Generate design system
      setBuildStatus({ design: 'building' });
      const designRes = await fetch('/api/design', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey, companyUrl, companyName: companyName || roleTitle?.split(' at ')?.[1] || '', vibe }),
      });
      if (!designRes.ok) { const e = await designRes.json(); throw new Error('Design: ' + (e.error || 'failed')); }
      const design = await designRes.json();
      setDesignSystem(design);
      setBuildStatus(prev => ({ ...prev, design: 'done' }));

      // Step 2: Build each section
      const orderedSections = [];
      for (const cat of SECTIONS) {
        for (const opt of cat.options) {
          if (selectedSections.includes(opt.id)) orderedSections.push(opt);
        }
      }

      const builtSections = [];
      for (let i = 0; i < orderedSections.length; i++) {
        const sec = orderedSections[i];
        setBuildStatus(prev => ({ ...prev, [sec.id]: 'building' }));

        const secRes = await fetch('/api/section', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            apiKey, sectionType: sec.id, resume, jd, companyUrl,
            companyName: companyName || '', roleTitle, hiringManager,
            designSystem: design, tonality,
          }),
        });

        if (!secRes.ok) {
          setBuildStatus(prev => ({ ...prev, [sec.id]: 'error' }));
          continue;
        }

        const reader = secRes.body.getReader();
        const decoder = new TextDecoder();
        let html = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          html += decoder.decode(value, { stream: true });
        }
        html = html.replace(/^```html?\n?/i, '').replace(/\n?```$/i, '').trim();
        builtSections.push(html);
        setBuildStatus(prev => ({ ...prev, [sec.id]: 'done' }));
      }

      // Step 3: Assemble
      setBuildStatus(prev => ({ ...prev, assemble: 'building' }));
      const assembleRes = await fetch('/api/assemble', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          designSystem: design, sections: builtSections,
          companyName, roleTitle,
          candidateName: resume.split('\n')[0]?.trim() || 'Candidate',
        }),
      });
      const finalHTML = await assembleRes.text();
      setGeneratedHTML(finalHTML);
      setBuildStatus(prev => ({ ...prev, assemble: 'done' }));
      setStep('preview');

      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src = URL.createObjectURL(new Blob([finalHTML], { type: 'text/html' }));
        }
      }, 150);

    } catch (e) { setError(e.message); } finally { setBuilding(false); }
  }

  function copyHTML() { navigator.clipboard.writeText(generatedHTML); }
  function downloadHTML() { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([generatedHTML], { type: 'text/html' })); a.download = (roleTitle || 'page').toLowerCase().replace(/\s+/g, '-') + '.html'; a.click(); }
  function openInTab() { window.open(URL.createObjectURL(new Blob([generatedHTML], { type: 'text/html' })), '_blank'); }

  const S = {
    input: { width: '100%', padding: '10px 14px', background: '#fff', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontSize: 13, fontFamily: 'var(--font-body)', outline: 'none', fontWeight: 300 },
    textarea: { width: '100%', padding: '10px 14px', background: '#fff', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontSize: 11, fontFamily: 'var(--font-mono)', outline: 'none', fontWeight: 300, lineHeight: 1.7, minHeight: 140, resize: 'vertical' },
    label: { display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 },
    hint: { fontSize: 11, color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', fontWeight: 300, marginBottom: 10, display: 'block' },
  };

  // ─── PREVIEW ───
  if (step === 'preview') {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', borderBottom: '1px solid var(--border)' }}>
          <button onClick={() => { setStep('sections'); setGeneratedHTML(''); }} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', fontSize: 13, cursor: 'pointer' }}>← Back</button>
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={copyHTML} style={{ padding: '6px 14px', background: '#fff', border: '1px solid var(--border)', borderRadius: 5, fontSize: 11, cursor: 'pointer', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>Copy</button>
            <button onClick={downloadHTML} style={{ padding: '6px 14px', background: '#fff', border: '1px solid var(--border)', borderRadius: 5, fontSize: 11, cursor: 'pointer', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>Download</button>
            <button onClick={openInTab} style={{ padding: '6px 14px', background: 'var(--accent)', border: 'none', borderRadius: 5, fontSize: 11, cursor: 'pointer', fontFamily: 'var(--font-mono)', color: '#fff' }}>Open full page</button>
          </div>
        </div>
        <iframe ref={iframeRef} style={{ width: '100%', height: 'calc(100vh - 52px)', border: 'none' }} sandbox="allow-scripts allow-same-origin" />
      </div>
    );
  }

  if (step === 'loading') return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-tertiary)' }}>Loading...</span></div>;

  return (
    <div>
      <nav style={{ padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'var(--text)' }}><span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 22 }}>Unhinged</span></Link>
        <div style={{ display: 'flex', gap: 8 }}>
          {['Resume', 'Details', 'Sections', 'Build'].map((s, i) => {
            const steps = ['onboarding', 'input', 'sections', 'building'];
            const current = steps.indexOf(step);
            const isDone = current > i;
            const isActive = current === i;
            return (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', background: isActive ? 'var(--accent)' : isDone ? 'var(--sage, #5A7A6A)' : 'var(--surface, #F0F0EB)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: isActive || isDone ? '#fff' : 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>{isDone ? '\u2713' : i + 1}</div>
                <span style={{ fontSize: 11, color: isActive ? 'var(--text)' : 'var(--text-tertiary)', fontWeight: isActive ? 500 : 300 }}>{s}</span>
                {i < 3 && <span style={{ color: 'var(--border)', fontSize: 10, marginLeft: 2 }}>/</span>}
              </div>
            );
          })}
        </div>
      </nav>

      <div style={{ maxWidth: 660, margin: '0 auto', padding: '36px 24px' }}>

        {/* ─── ONBOARDING ─── */}
        {step === 'onboarding' && (<>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 300, marginBottom: 8 }}>First, your resume.</h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 300, marginBottom: 28 }}>Paste once. Saved locally. Used for every page.</p>
          <textarea value={resume} onChange={e => setResume(e.target.value)} placeholder="Paste your full resume..." style={{ ...S.textarea, minHeight: 240 }} />
          {error && <div style={{ margin: '12px 0', padding: '10px 14px', background: '#FAF0ED', borderRadius: 6, fontSize: 12, color: '#C4654A', fontFamily: 'var(--font-mono)' }}>{error}</div>}
          <button onClick={saveResume} style={{ width: '100%', padding: 13, background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 500, marginTop: 16 }}>Save and continue</button>
        </>)}

        {/* ─── INPUT ─── */}
        {step === 'input' && (<>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 300, marginBottom: 8 }}>The role.</h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 300, marginBottom: 24 }}>Tell us about the job. We will figure out the rest.</p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#EDF3F0', borderRadius: 6, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#5A7A6A' }} />
              <span style={{ fontSize: 12, color: '#5A7A6A', fontWeight: 500 }}>Resume saved</span>
            </div>
            <button onClick={() => setStep('onboarding')} style={{ background: 'none', border: 'none', color: '#5A7A6A', fontSize: 11, cursor: 'pointer', textDecoration: 'underline', fontFamily: 'var(--font-mono)' }}>Edit</button>
          </div>

          <div style={{ marginBottom: 18 }}><label style={S.label}>API Key</label><span style={S.hint}>console.anthropic.com</span><input type="password" placeholder="sk-ant-..." value={apiKey} onChange={e => setApiKey(e.target.value)} style={S.input} /></div>
          <div style={{ marginBottom: 18 }}><label style={S.label}>Job description *</label><textarea placeholder="Paste the full JD..." value={jd} onChange={e => setJd(e.target.value)} style={{ ...S.textarea, minHeight: 160 }} /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
            <div><label style={S.label}>Company URL</label><input placeholder="https://..." value={companyUrl} onChange={e => setCompanyUrl(e.target.value)} style={S.input} /></div>
            <div><label style={S.label}>Company name</label><input placeholder="Clay, Wispr Flow..." value={companyName} onChange={e => setCompanyName(e.target.value)} style={S.input} /></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
            <div><label style={S.label}>Role title</label><input placeholder="Growth Lead" value={roleTitle} onChange={e => setRoleTitle(e.target.value)} style={S.input} /></div>
            <div><label style={S.label}>Hiring manager</label><input placeholder="e.g. Aditi" value={hiringManager} onChange={e => setHiringManager(e.target.value)} style={S.input} /></div>
          </div>

          {error && <div style={{ marginBottom: 16, padding: '10px 14px', background: '#FAF0ED', borderRadius: 6, fontSize: 12, color: '#C4654A', fontFamily: 'var(--font-mono)' }}>{error}</div>}
          <button onClick={() => { if (!apiKey) { setError('Add API key'); return; } if (!jd) { setError('Add JD'); return; } setError(''); setStep('sections'); }} style={{ width: '100%', padding: 13, background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>Continue to section picker</button>
        </>)}

        {/* ─── SECTIONS ─── */}
        {(step === 'sections' || step === 'building') && (<>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 300, marginBottom: 8 }}>Pick your sections.</h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 300, marginBottom: 24 }}>Choose what goes on your page. Each section is built individually for maximum quality.</p>

          {/* Vibe */}
          <div style={{ marginBottom: 20 }}>
            <label style={S.label}>Vibe</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
              {VIBES.map(v => (
                <button key={v.id} onClick={() => setVibe(v.id)} style={{ background: vibe === v.id ? v.bg : '#fff', border: '1.5px solid', borderColor: vibe === v.id ? v.color : 'var(--border)', borderRadius: 6, padding: '10px', cursor: 'pointer', textAlign: 'center', color: 'var(--text)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: v.color, marginBottom: 2 }}>{v.symbol}</div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: vibe === v.id ? v.color : 'var(--text)' }}>{v.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Tonality */}
          <div style={{ marginBottom: 24 }}>
            <label style={S.label}>Tonality</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {TONES.map(t => (
                <button key={t.id} onClick={() => setTonality(t.id)} style={{ padding: '6px 14px', borderRadius: 16, border: '1.5px solid', borderColor: tonality === t.id ? 'var(--accent)' : 'var(--border)', background: tonality === t.id ? 'var(--accent-light)' : '#fff', color: tonality === t.id ? 'var(--accent)' : 'var(--text-secondary)', fontSize: 12, cursor: 'pointer', fontWeight: tonality === t.id ? 500 : 300 }}>{t.name}</button>
              ))}
            </div>
          </div>

          {/* Section picker */}
          {SECTIONS.map(cat => (
            <div key={cat.category} style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10, fontWeight: 400 }}>{cat.category}</div>
              <div style={{ display: 'grid', gridTemplateColumns: cat.options.length > 2 ? 'repeat(3, 1fr)' : cat.options.length === 1 ? '1fr' : 'repeat(2, 1fr)', gap: 6 }}>
                {cat.options.map(opt => {
                  const selected = selectedSections.includes(opt.id);
                  const status = buildStatus[opt.id];
                  return (
                    <button key={opt.id} onClick={() => !building && toggleSection(opt.id)} style={{
                      background: selected ? 'var(--bg-warm, #F7F6F3)' : '#fff',
                      border: '1.5px solid', borderColor: selected ? 'var(--accent)' : 'var(--border)',
                      borderRadius: 8, padding: '12px', cursor: building ? 'default' : 'pointer',
                      textAlign: 'left', color: 'var(--text)', position: 'relative', transition: 'all 0.2s',
                    }}>
                      {status && (
                        <div style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: '50%', background: status === 'done' ? '#5A7A6A' : status === 'error' ? '#C4654A' : 'var(--accent)', animation: status === 'building' ? 'pulse 1s infinite' : 'none' }} />
                      )}
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: selected ? 'var(--accent)' : 'var(--text-tertiary)', marginBottom: 4, fontWeight: 400 }}>{opt.icon}</div>
                      <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 2 }}>{opt.name}</div>
                      <div style={{ fontSize: 10, color: 'var(--text-tertiary)', fontWeight: 300, lineHeight: 1.4 }}>{opt.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Build status */}
          {building && (
            <div style={{ marginBottom: 16, padding: '14px 16px', background: 'var(--accent-light)', borderRadius: 8 }}>
              <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 500, marginBottom: 8 }}>Building your page...</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {buildStatus.design && (
                  <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', padding: '3px 8px', borderRadius: 4, background: buildStatus.design === 'done' ? '#EDF3F0' : 'var(--accent-light)', color: buildStatus.design === 'done' ? '#5A7A6A' : 'var(--accent)' }}>Design {buildStatus.design === 'done' ? '\u2713' : '...'}</span>
                )}
                {selectedSections.map(id => {
                  const s = buildStatus[id];
                  const name = SECTIONS.flatMap(c => c.options).find(o => o.id === id)?.name || id;
                  return s ? (
                    <span key={id} style={{ fontSize: 10, fontFamily: 'var(--font-mono)', padding: '3px 8px', borderRadius: 4, background: s === 'done' ? '#EDF3F0' : s === 'error' ? '#FAF0ED' : 'var(--accent-light)', color: s === 'done' ? '#5A7A6A' : s === 'error' ? '#C4654A' : 'var(--accent)' }}>{name} {s === 'done' ? '\u2713' : s === 'error' ? '\u2717' : '...'}</span>
                  ) : null;
                })}
                {buildStatus.assemble && (
                  <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', padding: '3px 8px', borderRadius: 4, background: buildStatus.assemble === 'done' ? '#EDF3F0' : 'var(--accent-light)', color: buildStatus.assemble === 'done' ? '#5A7A6A' : 'var(--accent)' }}>Assembly {buildStatus.assemble === 'done' ? '\u2713' : '...'}</span>
                )}
              </div>
            </div>
          )}

          {error && <div style={{ marginBottom: 16, padding: '10px 14px', background: '#FAF0ED', borderRadius: 6, fontSize: 12, color: '#C4654A', fontFamily: 'var(--font-mono)' }}>{error}</div>}

          <style>{`@keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }`}</style>

          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setStep('input')} style={{ flex: 1, padding: 13, background: '#fff', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 300 }}>← Back</button>
            <button onClick={buildAll} disabled={building} style={{ flex: 2, padding: 13, background: building ? 'var(--surface)' : 'var(--accent)', color: building ? 'var(--text-tertiary)' : '#fff', border: 'none', borderRadius: 6, cursor: building ? 'wait' : 'pointer', fontSize: 13, fontWeight: 500 }}>
              {building ? 'Building ' + selectedSections.length + ' sections...' : 'Build my page (' + selectedSections.length + ' sections)'}
            </button>
          </div>

          <div style={{ marginTop: 16, fontSize: 11, color: 'var(--text-tertiary)', textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 300 }}>
            ~{selectedSections.length * 15 + 15}s build time / ~${(selectedSections.length * 0.15 + 0.10).toFixed(2)} API cost
          </div>
        </>)}
      </div>
    </div>
  );
}
