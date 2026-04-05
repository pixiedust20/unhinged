'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const VIBES = [
  { id: 'boardroom', name: 'Boardroom', symbol: '\u2014', desc: 'Clean, metrics-forward, executive-ready. McKinsey meets Stripe.', color: '#5A7A6A', bg: '#EDF3F0' },
  { id: 'challenger', name: 'Challenger', symbol: '/', desc: 'Bold, high-contrast, commanding. Nike meets TED talk.', color: '#A8853A', bg: '#F8F3E8' },
  { id: 'showstopper', name: 'Showstopper', symbol: '*', desc: 'Brand-matched, interactive, editorial. Awwwards-quality storytelling.', color: '#6A5A8A', bg: '#F0EDF5' },
  { id: 'sendhelp', name: 'Send Help', symbol: '~', desc: 'Creative chaos. Easter eggs, confetti, glassmorphism. Unforgettable.', color: '#C4654A', bg: '#FAF0ED' },
];

const TONES = [
  { id: 'professional', name: 'Professional', desc: 'Measured, authoritative. Let achievements speak.' },
  { id: 'conversational', name: 'Conversational', desc: 'Warm, approachable. Like a smart friend.' },
  { id: 'bold', name: 'Bold', desc: 'Direct, unapologetic. Short sentences. Strong claims.' },
  { id: 'witty', name: 'Witty', desc: 'Clever, self-aware. Humor that shows intelligence.' },
  { id: 'storyteller', name: 'Storyteller', desc: 'Narrative-driven. A journey the reader feels invested in.' },
];

export default function GeneratePage() {
  const [step, setStep] = useState('loading');
  const [vibe, setVibe] = useState('showstopper');
  const [tonality, setTonality] = useState('conversational');
  const [resume, setResume] = useState('');
  const [resumeSaved, setResumeSaved] = useState(false);
  const [jd, setJd] = useState('');
  const [companyUrl, setCompanyUrl] = useState('');
  const [hiringManager, setHiringManager] = useState('');
  const [roleTitle, setRoleTitle] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [strategy, setStrategy] = useState(null);
  const [editingStrategy, setEditingStrategy] = useState(null);
  const [generatedHTML, setGeneratedHTML] = useState('');
  const iframeRef = useRef(null);

  useEffect(() => {
    const savedResume = localStorage.getItem('unhinged_resume');
    const savedKey = localStorage.getItem('unhinged_api_key');
    if (savedResume) { setResume(savedResume); setResumeSaved(true); }
    if (savedKey) setApiKey(savedKey);
    const params = new URLSearchParams(window.location.search);
    if (params.get('jd')) setJd(decodeURIComponent(params.get('jd')));
    if (params.get('url')) setCompanyUrl(decodeURIComponent(params.get('url')));
    if (params.get('title')) setRoleTitle(decodeURIComponent(params.get('title')));
    setStep(savedResume ? 'input' : 'onboarding');
  }, []);

  function saveResume() {
    if (!resume.trim()) { setError('Paste your resume first.'); return; }
    localStorage.setItem('unhinged_resume', resume);
    setResumeSaved(true); setError(''); setStep('input');
  }

  async function generateStrategy() {
    if (!apiKey) { setError('Add your API key.'); return; }
    if (!jd) { setError('Add the job description.'); return; }
    localStorage.setItem('unhinged_api_key', apiKey);
    setError(''); setLoading(true); setStatus('Analyzing resume and JD...');
    try {
      const res = await fetch('/api/strategy', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey, resume, jd, companyUrl, roleTitle, hiringManager, vibe, tonality }),
      });
      if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Strategy failed'); }
      setStatus('Building your strategy...');
      const data = await res.json();
      setStrategy(data);
      setEditingStrategy(JSON.parse(JSON.stringify(data)));
      setStep('review');
    } catch (e) { setError(e.message); } finally { setLoading(false); setStatus(''); }
  }

  async function buildPage() {
    setError(''); setLoading(true); setStatus('Building your page... this takes 30-90 seconds');
    try {
      const res = await fetch('/api/build', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey, strategy: editingStrategy, vibe }),
      });
      if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Build failed'); }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let html = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        html += decoder.decode(value, { stream: true });
        setStatus('Writing... ' + Math.round(html.length / 80) + ' lines');
      }
      html = html.replace(/^```html?\n?/i, '').replace(/\n?```$/i, '').trim();
      setGeneratedHTML(html); setStep('preview'); setStatus('');
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
        }
      }, 100);
    } catch (e) { setError(e.message); } finally { setLoading(false); }
  }

  function copyHTML() { navigator.clipboard.writeText(generatedHTML); setStatus('Copied!'); setTimeout(() => setStatus(''), 2000); }
  function downloadHTML() { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([generatedHTML], { type: 'text/html' })); a.download = (roleTitle || 'application').toLowerCase().replace(/\s+/g, '-') + '-page.html'; a.click(); }
  function openInTab() { window.open(URL.createObjectURL(new Blob([generatedHTML], { type: 'text/html' })), '_blank'); }

  const input = { width: '100%', padding: '10px 14px', background: '#fff', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontSize: 13, fontFamily: 'var(--font-body)', outline: 'none', fontWeight: 300 };
  const textarea = { ...input, minHeight: 140, resize: 'vertical', fontFamily: 'var(--font-mono)', fontSize: 11, lineHeight: 1.7 };
  const label = { display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 };
  const hint = { fontSize: 11, color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', fontWeight: 300, marginBottom: 10, display: 'block' };
  const btn = (primary) => ({ width: '100%', padding: '13px', background: primary ? 'var(--accent)' : '#fff', color: primary ? '#fff' : 'var(--text)', border: primary ? 'none' : '1px solid var(--border)', borderRadius: 6, cursor: loading ? 'wait' : 'pointer', fontSize: 13, fontWeight: 500, opacity: loading ? 0.6 : 1 });

  // ─── PREVIEW ───
  if (step === 'preview') {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', borderBottom: '1px solid var(--border)' }}>
          <button onClick={() => { setStep('review'); setGeneratedHTML(''); }} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', fontSize: 13, cursor: 'pointer' }}>← Back to strategy</button>
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={copyHTML} style={{ padding: '6px 14px', background: '#fff', border: '1px solid var(--border)', borderRadius: 5, color: 'var(--text-secondary)', fontSize: 11, cursor: 'pointer', fontFamily: 'var(--font-mono)' }}>Copy HTML</button>
            <button onClick={downloadHTML} style={{ padding: '6px 14px', background: '#fff', border: '1px solid var(--border)', borderRadius: 5, color: 'var(--text-secondary)', fontSize: 11, cursor: 'pointer', fontFamily: 'var(--font-mono)' }}>Download</button>
            <button onClick={openInTab} style={{ padding: '6px 14px', background: 'var(--accent)', border: 'none', borderRadius: 5, color: '#fff', fontSize: 11, cursor: 'pointer', fontFamily: 'var(--font-mono)' }}>Open full page</button>
          </div>
        </div>
        {status && <div style={{ padding: '8px 24px', fontSize: 11, color: 'var(--accent)', background: 'var(--accent-light)', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>{status}</div>}
        <iframe ref={iframeRef} style={{ width: '100%', height: 'calc(100vh - 52px)', border: 'none' }} sandbox="allow-scripts allow-same-origin" />
      </div>
    );
  }

  if (step === 'loading') {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-tertiary)' }}>Loading...</span></div>;
  }

  return (
    <div>
      <nav style={{ padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'var(--text)' }}><span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 22 }}>Unhinged</span></Link>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          {['onboarding', 'input', 'review'].map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: step === s ? 'var(--accent)' : ['input', 'review'].indexOf(step) > ['onboarding', 'input', 'review'].indexOf(s) ? 'var(--sage)' : 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: step === s || ['input', 'review'].indexOf(step) > ['onboarding', 'input', 'review'].indexOf(s) ? '#fff' : 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>{i + 1}</div>
              <span style={{ fontSize: 11, color: step === s ? 'var(--text)' : 'var(--text-tertiary)', fontWeight: step === s ? 500 : 300 }}>{['Resume', 'Details', 'Review'][i]}</span>
              {i < 2 && <span style={{ color: 'var(--border)', fontSize: 11 }}>/</span>}
            </div>
          ))}
        </div>
      </nav>

      <div style={{ maxWidth: 620, margin: '0 auto', padding: '36px 24px' }}>

        {/* ─── ONBOARDING ─── */}
        {step === 'onboarding' && (
          <>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 300, marginBottom: 8 }}>{resumeSaved ? 'Update your resume' : 'First, your resume.'}</h1>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 300, marginBottom: 28 }}>Paste it once. Saved locally, used for every page. Never sent anywhere except Claude when you generate.</p>
            <div style={{ marginBottom: 20 }}>
              <label style={label}>Resume</label>
              <textarea value={resume} onChange={e => setResume(e.target.value)} placeholder="Paste your full resume..." style={{ ...textarea, minHeight: 240 }} />
            </div>
            {error && <div style={{ marginBottom: 16, padding: '10px 14px', background: '#FAF0ED', border: '1px solid rgba(196,101,74,0.15)', borderRadius: 6, fontSize: 12, color: '#C4654A', fontFamily: 'var(--font-mono)' }}>{error}</div>}
            <button onClick={saveResume} style={btn(true)}>Save and continue</button>
            {resumeSaved && <button onClick={() => setStep('input')} style={{ ...btn(false), marginTop: 8 }}>Cancel</button>}
          </>
        )}

        {/* ─── INPUT: JD + VIBE + TONALITY ─── */}
        {step === 'input' && (
          <>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 300, marginBottom: 8 }}>Now, the role.</h1>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 300, marginBottom: 24 }}>Add the job description, pick your vibe and tone, and we will generate a strategy for you to review before building.</p>

            {/* Resume chip */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#EDF3F0', borderRadius: 8, marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#5A7A6A', display: 'inline-block' }} />
                <span style={{ fontSize: 12, color: '#5A7A6A', fontWeight: 500 }}>Resume saved</span>
                <span style={{ fontSize: 11, color: '#5A7A6A', fontWeight: 300, opacity: 0.7 }}>({resume.substring(0, 35).trim()}...)</span>
              </div>
              <button onClick={() => setStep('onboarding')} style={{ background: 'none', border: 'none', color: '#5A7A6A', fontSize: 11, cursor: 'pointer', fontFamily: 'var(--font-mono)', textDecoration: 'underline' }}>Edit</button>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={label}>API Key</label>
              <span style={hint}>console.anthropic.com — saved locally, never sent to us</span>
              <input type="password" placeholder="sk-ant-..." value={apiKey} onChange={e => setApiKey(e.target.value)} style={input} />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={label}>Job description *</label>
              <textarea placeholder="Paste the full JD..." value={jd} onChange={e => setJd(e.target.value)} style={{ ...textarea, minHeight: 160 }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              <div><label style={label}>Company URL</label><input placeholder="https://..." value={companyUrl} onChange={e => setCompanyUrl(e.target.value)} style={input} /></div>
              <div><label style={label}>Role title</label><input placeholder="Growth Lead" value={roleTitle} onChange={e => setRoleTitle(e.target.value)} style={input} /></div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={label}>Hiring manager</label>
              <input placeholder="e.g. Aditi, Head of Marketing" value={hiringManager} onChange={e => setHiringManager(e.target.value)} style={input} />
            </div>

            {/* Vibe */}
            <div style={{ marginBottom: 24 }}>
              <label style={label}>Vibe</label>
              <span style={hint}>How should the page look and feel?</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                {VIBES.map(v => (
                  <button key={v.id} onClick={() => setVibe(v.id)} style={{ background: vibe === v.id ? v.bg : '#fff', border: '1.5px solid', borderColor: vibe === v.id ? v.color : 'var(--border)', borderRadius: 6, padding: '12px 14px', cursor: 'pointer', textAlign: 'left', color: 'var(--text)' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: v.color, marginBottom: 2 }}>{v.symbol}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 400, color: vibe === v.id ? v.color : 'var(--text)' }}>{v.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2, fontWeight: 300 }}>{v.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tonality */}
            <div style={{ marginBottom: 28 }}>
              <label style={label}>Tonality</label>
              <span style={hint}>How should the copy sound?</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {TONES.map(t => (
                  <button key={t.id} onClick={() => setTonality(t.id)} style={{ padding: '8px 16px', borderRadius: 20, border: '1.5px solid', borderColor: tonality === t.id ? 'var(--accent)' : 'var(--border)', background: tonality === t.id ? 'var(--accent-light)' : '#fff', color: tonality === t.id ? 'var(--accent)' : 'var(--text-secondary)', fontSize: 12, cursor: 'pointer', fontWeight: tonality === t.id ? 500 : 300 }}>
                    {t.name}
                  </button>
                ))}
              </div>
              {TONES.find(t => t.id === tonality) && (
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 8, fontStyle: 'italic' }}>
                  {TONES.find(t => t.id === tonality).desc}
                </div>
              )}
            </div>

            <button onClick={generateStrategy} disabled={loading} style={{ ...btn(true), opacity: loading ? 0.6 : 1, cursor: loading ? 'wait' : 'pointer' }}>
              {loading ? 'Generating strategy...' : 'Generate strategy preview'}
            </button>

            {loading && status && <div style={{ marginTop: 10, padding: '8px 12px', background: 'var(--accent-light)', borderRadius: 6, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', textAlign: 'center' }}>{status}</div>}
            {error && <div style={{ marginTop: 10, padding: '10px 14px', background: '#FAF0ED', border: '1px solid rgba(196,101,74,0.15)', borderRadius: 6, fontSize: 12, color: '#C4654A', fontFamily: 'var(--font-mono)' }}>{error}</div>}
          </>
        )}

        {/* ─── REVIEW STRATEGY ─── */}
        {step === 'review' && editingStrategy && (
          <>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 300, marginBottom: 8 }}>Review your strategy.</h1>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 300, marginBottom: 28 }}>Edit anything below before building. The more specific you are, the better the page.</p>

            {/* Headline */}
            <div style={{ marginBottom: 20 }}>
              <label style={label}>Hero headline</label>
              <span style={hint}>The first thing the hiring manager sees</span>
              <input value={editingStrategy.headline || ''} onChange={e => setEditingStrategy({ ...editingStrategy, headline: e.target.value })} style={{ ...input, fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 400, padding: '14px' }} />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={label}>Subheadline</label>
              <textarea value={editingStrategy.subheadline || ''} onChange={e => setEditingStrategy({ ...editingStrategy, subheadline: e.target.value })} style={{ ...textarea, minHeight: 60 }} />
            </div>

            {/* Narrative hook */}
            <div style={{ marginBottom: 20 }}>
              <label style={label}>Narrative hook</label>
              <span style={hint}>The core angle that ties your story to this company</span>
              <textarea value={editingStrategy.hook || ''} onChange={e => setEditingStrategy({ ...editingStrategy, hook: e.target.value })} style={{ ...textarea, minHeight: 80 }} />
            </div>

            {/* Color palette */}
            {editingStrategy.colorPalette && (
              <div style={{ marginBottom: 24 }}>
                <label style={label}>Color palette</label>
                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                  {Object.entries(editingStrategy.colorPalette).map(([key, val]) => (
                    <div key={key} style={{ textAlign: 'center' }}>
                      <div style={{ width: 48, height: 48, borderRadius: 8, background: val, border: '1px solid var(--border)', marginBottom: 4 }} />
                      <input value={val} onChange={e => setEditingStrategy({ ...editingStrategy, colorPalette: { ...editingStrategy.colorPalette, [key]: e.target.value } })} style={{ width: 72, fontSize: 10, fontFamily: 'var(--font-mono)', border: '1px solid var(--border)', borderRadius: 4, padding: '3px 6px', textAlign: 'center' }} />
                      <div style={{ fontSize: 9, color: 'var(--text-tertiary)', marginTop: 2 }}>{key}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fonts */}
            {editingStrategy.fonts && (
              <div style={{ marginBottom: 24 }}>
                <label style={label}>Fonts</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                  {Object.entries(editingStrategy.fonts).map(([key, val]) => (
                    <div key={key}>
                      <div style={{ fontSize: 10, color: 'var(--text-tertiary)', marginBottom: 4, textTransform: 'capitalize' }}>{key}</div>
                      <input value={val} onChange={e => setEditingStrategy({ ...editingStrategy, fonts: { ...editingStrategy.fonts, [key]: e.target.value } })} style={{ ...input, fontSize: 12 }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tone sample */}
            <div style={{ marginBottom: 24 }}>
              <label style={label}>Tone sample</label>
              <span style={hint}>This is how the copy will sound on the page</span>
              <div style={{ background: 'var(--bg-warm)', borderRadius: 8, padding: 20, border: '1px solid var(--border)' }}>
                <textarea value={editingStrategy.toneSample || ''} onChange={e => setEditingStrategy({ ...editingStrategy, toneSample: e.target.value })} style={{ ...textarea, minHeight: 80, background: 'transparent', border: 'none', fontFamily: 'var(--font-display)', fontSize: 15, fontStyle: 'italic', color: 'var(--text)' }} />
              </div>
            </div>

            {/* Key metrics */}
            {editingStrategy.metrics && (
              <div style={{ marginBottom: 24 }}>
                <label style={label}>Key metrics</label>
                <span style={hint}>These will be displayed prominently on the page</span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                  {editingStrategy.metrics.map((m, i) => (
                    <div key={i} style={{ background: 'var(--bg-warm)', borderRadius: 8, padding: 14, borderLeft: '3px solid var(--accent)' }}>
                      <input value={m.number} onChange={e => { const newM = [...editingStrategy.metrics]; newM[i] = { ...newM[i], number: e.target.value }; setEditingStrategy({ ...editingStrategy, metrics: newM }); }} style={{ ...input, fontSize: 20, fontFamily: 'var(--font-display)', fontWeight: 400, border: 'none', background: 'transparent', padding: '0 0 4px 0' }} />
                      <input value={m.label} onChange={e => { const newM = [...editingStrategy.metrics]; newM[i] = { ...newM[i], label: e.target.value }; setEditingStrategy({ ...editingStrategy, metrics: newM }); }} style={{ ...input, fontSize: 11, border: 'none', background: 'transparent', padding: 0, color: 'var(--text-tertiary)' }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experience matches */}
            {editingStrategy.experienceMatch && (
              <div style={{ marginBottom: 24 }}>
                <label style={label}>Experience matches</label>
                <span style={hint}>How your experience maps to the JD requirements</span>
                {editingStrategy.experienceMatch.map((m, i) => (
                  <div key={i} style={{ background: '#fff', borderRadius: 8, padding: 14, border: '1px solid var(--border)', marginBottom: 8 }}>
                    <input value={m.requirement} onChange={e => { const n = [...editingStrategy.experienceMatch]; n[i] = { ...n[i], requirement: e.target.value }; setEditingStrategy({ ...editingStrategy, experienceMatch: n }); }} style={{ ...input, fontSize: 12, fontWeight: 500, border: 'none', padding: '0 0 6px 0' }} placeholder="JD requirement" />
                    <textarea value={m.candidateProof} onChange={e => { const n = [...editingStrategy.experienceMatch]; n[i] = { ...n[i], candidateProof: e.target.value }; setEditingStrategy({ ...editingStrategy, experienceMatch: n }); }} style={{ ...textarea, minHeight: 50, fontSize: 12, border: 'none', padding: 0 }} placeholder="Your matching experience" />
                  </div>
                ))}
              </div>
            )}

            {/* 90-day plan */}
            {editingStrategy.ninetyDayPlan && (
              <div style={{ marginBottom: 28 }}>
                <label style={label}>90-day plan</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                  {[{ key: 'days30', label: 'Days 1-30', color: 'var(--sage)' }, { key: 'days60', label: 'Days 31-60', color: 'var(--ochre)' }, { key: 'days90', label: 'Days 61-90', color: 'var(--coral)' }].map(phase => (
                    <div key={phase.key} style={{ background: 'var(--bg-warm)', borderRadius: 8, padding: 14, borderTop: '3px solid ' + phase.color }}>
                      <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: phase.color, marginBottom: 8, fontWeight: 500 }}>{phase.label}</div>
                      <textarea value={(editingStrategy.ninetyDayPlan[phase.key] || []).join('\n')} onChange={e => { const n = { ...editingStrategy.ninetyDayPlan, [phase.key]: e.target.value.split('\n') }; setEditingStrategy({ ...editingStrategy, ninetyDayPlan: n }); }} style={{ ...textarea, minHeight: 100, fontSize: 11, border: 'none', background: 'transparent', padding: 0 }} placeholder="One action per line" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setStep('input')} style={{ ...btn(false), flex: 1 }}>← Back to edit</button>
              <button onClick={buildPage} disabled={loading} style={{ ...btn(true), flex: 2, cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.6 : 1 }}>
                {loading ? 'Building page...' : 'Build my page'}
              </button>
            </div>

            {loading && status && <div style={{ marginTop: 10, padding: '8px 12px', background: 'var(--accent-light)', borderRadius: 6, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', textAlign: 'center' }}>{status}</div>}
            {error && <div style={{ marginTop: 10, padding: '10px 14px', background: '#FAF0ED', border: '1px solid rgba(196,101,74,0.15)', borderRadius: 6, fontSize: 12, color: '#C4654A', fontFamily: 'var(--font-mono)' }}>{error}</div>}
          </>
        )}
      </div>
    </div>
  );
}
