'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const VIBES = [
  { id: 'boardroom', name: 'Boardroom', symbol: '\u2014', desc: 'Clean, metrics-forward, executive-ready', color: '#5A7A6A', bg: '#EDF3F0' },
  { id: 'challenger', name: 'Challenger', symbol: '/', desc: 'Bold, punchy, high-contrast', color: '#A8853A', bg: '#F8F3E8' },
  { id: 'showstopper', name: 'Showstopper', symbol: '*', desc: 'Brand-matched, interactive, animated', color: '#6A5A8A', bg: '#F0EDF5' },
  { id: 'sendhelp', name: 'Send Help', symbol: '~', desc: 'Full chaos. Easter eggs. Unhinged.', color: '#C4654A', bg: '#FAF0ED' },
];

const VIBE_PROMPTS = {
  boardroom: 'Design: Ultra-clean, editorial, minimal. Refined serif headings, clean sans body. Monochromatic palette from company brand. Single column, data-forward, professional authority. No interactive elements beyond smooth scroll.',
  challenger: 'Design: Bold, high-contrast. Heavy display sans headlines, huge sizes, all-caps labels. Dark bg with sharp accent colors. Asymmetric, grid-breaking layout. Direct, punchy, metric-heavy. Scroll-triggered animations, counter animations.',
  showstopper: 'Design: Brand-matched editorial with rich interactivity. Match company fonts/colors. Timeline, cards, hover effects. Storytelling + 90-day plan. URL param personalization (?name=X).',
  sendhelp: 'Design: MAXIMUM CHAOS but gorgeous. Two unexpected fonts. Giant type. Gradients, glassmorphism. Overlapping text, diagonal sections. Confetti, easter eggs, custom cursor, parallax.',
};

export default function GeneratePage() {
  const [step, setStep] = useState('loading');
  const [vibe, setVibe] = useState('showstopper');
  const [resume, setResume] = useState('');
  const [resumeSaved, setResumeSaved] = useState(false);
  const [jd, setJd] = useState('');
  const [companyUrl, setCompanyUrl] = useState('');
  const [hiringManager, setHiringManager] = useState('');
  const [roleTitle, setRoleTitle] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [generating, setGenerating] = useState(false);
  const [status, setStatus] = useState('');
  const [generatedHTML, setGeneratedHTML] = useState('');
  const [error, setError] = useState('');
  const iframeRef = useRef(null);

  useEffect(() => {
    const savedResume = localStorage.getItem('unhinged_resume');
    const savedKey = localStorage.getItem('unhinged_api_key');
    if (savedResume) { setResume(savedResume); setResumeSaved(true); }
    if (savedKey) { setApiKey(savedKey); }

    const params = new URLSearchParams(window.location.search);
    const jdParam = params.get('jd');
    const urlParam = params.get('url');
    const titleParam = params.get('title');
    if (jdParam) setJd(decodeURIComponent(jdParam));
    if (urlParam) setCompanyUrl(decodeURIComponent(urlParam));
    if (titleParam) setRoleTitle(decodeURIComponent(titleParam));

    setStep(savedResume ? 'generate' : 'onboarding');
  }, []);

  function saveResume() {
    if (!resume.trim()) { setError('Paste your resume first.'); return; }
    localStorage.setItem('unhinged_resume', resume);
    setResumeSaved(true);
    setError('');
    setStep('generate');
  }

  async function handleGenerate() {
    if (!apiKey) { setError('Add your Anthropic API key.'); return; }
    if (!resume) { setError('Your resume is missing.'); return; }
    if (!jd) { setError('Add the job description.'); return; }
    localStorage.setItem('unhinged_api_key', apiKey);
    setError('');
    setGenerating(true);
    setGeneratedHTML('');
    setStatus('Analyzing resume and role...');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey, resume, jd, companyUrl, hiringManager, roleTitle, vibe, vibePrompt: VIBE_PROMPTS[vibe] }),
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Generation failed');
      }
      setStatus('Building your page...');
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let html = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        html += decoder.decode(value, { stream: true });
        setStatus('Writing... ' + Math.round(html.length / 80) + ' lines');
      }
      html = html.replace(/^```html?\n?/i, '').replace(/\n?```$/i, '').trim();
      setGeneratedHTML(html);
      setStep('preview');
      setStatus('');
      setTimeout(() => {
        if (iframeRef.current) {
          const blob = new Blob([html], { type: 'text/html' });
          iframeRef.current.src = URL.createObjectURL(blob);
        }
      }, 100);
    } catch (err) {
      setError(err.message);
    } finally {
      setGenerating(false);
    }
  }

  function copyHTML() { navigator.clipboard.writeText(generatedHTML); setStatus('Copied!'); setTimeout(() => setStatus(''), 2000); }
  function openInTab() { const blob = new Blob([generatedHTML], { type: 'text/html' }); window.open(URL.createObjectURL(blob), '_blank'); }
  function downloadHTML() { const blob = new Blob([generatedHTML], { type: 'text/html' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = (roleTitle || 'application').toLowerCase().replace(/\s+/g, '-') + '-page.html'; a.click(); }

  const bookmarkletCode = "javascript:void(function(){var t=document.title,b=document.body.innerText.substring(0,8000),u=encodeURIComponent(window.location.href),j=encodeURIComponent(b),n=encodeURIComponent(t);window.open('" + (typeof window !== 'undefined' ? window.location.origin : '') + "/generate?jd='+j+'&url='+u+'&title='+n,'_blank')}())";

  const input = { width: '100%', padding: '10px 14px', background: '#fff', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontSize: 13, fontFamily: 'var(--font-body)', outline: 'none', fontWeight: 300 };
  const textarea = { ...input, minHeight: 140, resize: 'vertical', fontFamily: 'var(--font-mono)', fontSize: 11, lineHeight: 1.7 };
  const label = { display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 };
  const hint = { fontSize: 11, color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', fontWeight: 300, marginBottom: 10, display: 'block' };

  if (step === 'preview' && generatedHTML) {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', borderBottom: '1px solid var(--border)' }}>
          <button onClick={() => { setStep('generate'); setGeneratedHTML(''); }} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>← Back</button>
          <div style={{ display: 'flex', gap: 6 }}>
            {[{ l: 'Copy HTML', fn: copyHTML }, { l: 'Download', fn: downloadHTML }, { l: 'Open full page', fn: openInTab, p: true }].map(btn => (
              <button key={btn.l} onClick={btn.fn} style={{ padding: '6px 14px', background: btn.p ? 'var(--accent)' : '#fff', border: '1px solid', borderColor: btn.p ? 'var(--accent)' : 'var(--border)', borderRadius: 5, color: btn.p ? '#fff' : 'var(--text-secondary)', fontSize: 11, cursor: 'pointer', fontFamily: 'var(--font-mono)', fontWeight: 300 }}>{btn.l}</button>
            ))}
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
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 300 }}>{step === 'onboarding' ? 'Setup' : 'Generator'}</span>
      </nav>

      <div style={{ maxWidth: 580, margin: '0 auto', padding: '36px 24px' }}>
        {step === 'onboarding' && (
          <>
            <div style={{ marginBottom: 32 }}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 300, marginBottom: 8 }}>{resumeSaved ? 'Update your resume' : 'First, your resume.'}</h1>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 300 }}>Paste it once. Saved locally in your browser and used for every page you generate. Never sent anywhere except to Claude when you hit generate.</p>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={label}>Resume</label>
              <span style={hint}>Paste the full text — skills, experience, education, everything</span>
              <textarea value={resume} onChange={e => setResume(e.target.value)} placeholder="Paste your full resume here..." style={{ ...textarea, minHeight: 240 }} />
            </div>
            {error && <div style={{ marginBottom: 16, padding: '10px 14px', background: '#FAF0ED', border: '1px solid rgba(196,101,74,0.15)', borderRadius: 6, fontSize: 12, color: '#C4654A', fontFamily: 'var(--font-mono)' }}>{error}</div>}
            <button onClick={saveResume} style={{ width: '100%', padding: '13px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>Save and continue</button>
            {resumeSaved && <button onClick={() => setStep('generate')} style={{ width: '100%', padding: '12px', background: 'none', color: 'var(--text-tertiary)', border: '1px solid var(--border)', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 300, marginTop: 8 }}>Cancel — keep existing resume</button>}
          </>
        )}

        {step === 'generate' && (
          <>
            <div style={{ marginBottom: 28 }}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 300, marginBottom: 8 }}>Now, the role.</h1>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 300 }}>Paste the job description, pick your vibe, and generate.</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#EDF3F0', borderRadius: 8, marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#5A7A6A', display: 'inline-block' }} />
                <span style={{ fontSize: 12, color: '#5A7A6A', fontWeight: 500 }}>Resume saved</span>
                <span style={{ fontSize: 11, color: '#5A7A6A', fontWeight: 300, opacity: 0.7 }}>({resume.substring(0, 40).trim()}...)</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setStep('onboarding')} style={{ background: 'none', border: 'none', color: '#5A7A6A', fontSize: 11, cursor: 'pointer', fontFamily: 'var(--font-mono)', textDecoration: 'underline' }}>Edit</button>
                <button onClick={() => { localStorage.removeItem('unhinged_resume'); setResume(''); setResumeSaved(false); setStep('onboarding'); }} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', fontSize: 11, cursor: 'pointer', fontFamily: 'var(--font-mono)' }}>Clear</button>
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={label}>API Key</label>
              <span style={hint}>console.anthropic.com — free $5 credit, saved locally</span>
              <input type="password" placeholder="sk-ant-..." value={apiKey} onChange={e => setApiKey(e.target.value)} style={input} />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={label}>Job description *</label>
              <span style={hint}>Paste the full JD, or use the bookmarklet below to auto-capture</span>
              <textarea placeholder="Paste the full job description..." value={jd} onChange={e => setJd(e.target.value)} style={{ ...textarea, minHeight: 160 }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              <div><label style={label}>Company URL</label><input placeholder="https://..." value={companyUrl} onChange={e => setCompanyUrl(e.target.value)} style={input} /></div>
              <div><label style={label}>Role title</label><input placeholder="Growth Lead" value={roleTitle} onChange={e => setRoleTitle(e.target.value)} style={input} /></div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={label}>Hiring manager</label>
              <input placeholder="e.g. Aditi, Head of Marketing" value={hiringManager} onChange={e => setHiringManager(e.target.value)} style={input} />
            </div>

            <div style={{ marginBottom: 28 }}>
              <label style={label}>Vibe</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginTop: 8 }}>
                {VIBES.map(v => (
                  <button key={v.id} onClick={() => setVibe(v.id)} style={{ background: vibe === v.id ? v.bg : '#fff', border: '1.5px solid', borderColor: vibe === v.id ? v.color : 'var(--border)', borderRadius: 6, padding: '12px 14px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', color: 'var(--text)' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: v.color, marginBottom: 2, fontWeight: 300 }}>{v.symbol}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 400, color: vibe === v.id ? v.color : 'var(--text)' }}>{v.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2, fontWeight: 300 }}>{v.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleGenerate} disabled={generating} style={{ width: '100%', padding: '13px', background: generating ? '#F0F0EB' : 'var(--accent)', color: generating ? 'var(--text-tertiary)' : '#fff', border: 'none', borderRadius: 6, cursor: generating ? 'wait' : 'pointer', fontSize: 13, fontWeight: 500 }}>
              {generating ? 'Generating...' : 'Generate my page'}
            </button>

            {generating && status && <div style={{ marginTop: 10, padding: '8px 12px', background: 'var(--accent-light)', borderRadius: 6, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', fontWeight: 300, textAlign: 'center' }}>{status}</div>}
            {error && <div style={{ marginTop: 10, padding: '10px 14px', background: '#FAF0ED', border: '1px solid rgba(196,101,74,0.15)', borderRadius: 6, fontSize: 12, color: '#C4654A', fontFamily: 'var(--font-mono)', fontWeight: 300 }}>{error}</div>}

            <div style={{ marginTop: 32, padding: 20, background: 'var(--bg-warm)', borderRadius: 8, border: '1px solid var(--border)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 400, marginBottom: 8 }}>Auto-capture JDs</div>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 300, marginBottom: 14 }}>Drag the button below to your bookmarks bar. When you are on any job listing (LinkedIn, Lever, Greenhouse), click it — the JD gets captured and Unhinged opens with everything pre-filled.</p>
              <a href={bookmarkletCode} onClick={e => e.preventDefault()} draggable="true" style={{ display: 'inline-block', padding: '8px 16px', background: 'var(--accent)', color: '#fff', borderRadius: 6, fontSize: 12, fontWeight: 500, textDecoration: 'none', cursor: 'grab' }}>Unhinged It</a>
              <p style={{ fontSize: 10, color: 'var(--text-tertiary)', marginTop: 8, fontFamily: 'var(--font-mono)', fontWeight: 300 }}>Drag this link to your bookmarks bar. On Chrome: Ctrl/Cmd + Shift + B to show it.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
