export const runtime = 'edge';

export async function POST(request) {
  const { designSystem, sections, companyName, roleTitle, candidateName } = await request.json();

  const googleFontsUrl = designSystem?.googleFontsUrl || '';
  const css = designSystem?.css || '';
  const palette = designSystem?.palette || {};
  const fonts = designSystem?.fonts || {};

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${candidateName || 'Candidate'} × ${companyName || 'Company'}${roleTitle ? ' — ' + roleTitle : ''}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
${googleFontsUrl ? '<link href="' + googleFontsUrl + '" rel="stylesheet">' : ''}
<style>
:root {
  --primary: ${palette.primary || '#3D5A80'};
  --secondary: ${palette.secondary || '#6A5A8A'};
  --accent: ${palette.accent || '#3D5A80'};
  --bg: ${palette.background || '#FFFFFF'};
  --bg-card: ${palette.card || '#F7F6F3'};
  --text: ${palette.text || '#1A1A1A'};
  --text-muted: ${palette.muted || '#6B6B6B'};
  --border: ${palette.border || '#E2E2DC'};
  --font-headline: '${fonts.headline || 'Playfair Display'}', serif;
  --font-body: '${fonts.body || 'DM Sans'}', sans-serif;
  --font-mono: '${fonts.mono || 'JetBrains Mono'}', monospace;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  line-height: 1.6;
}
::selection { background: var(--accent); color: white; }
img { max-width: 100%; }
a { color: var(--accent); }

.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Responsive base */
@media (max-width: 768px) {
  body { font-size: 14px; }
}

${css}
</style>
</head>
<body>

${sections.join('\n\n<!-- ════════════════════════════════════ -->\n\n')}

<script>
// URL personalization
(function() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name');
  if (name) {
    document.querySelectorAll('[data-personalize]').forEach(function(el) {
      el.textContent = name;
    });
  }
})();

// Scroll reveal observer
(function() {
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(function(el) {
    observer.observe(el);
  });
})();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(function(a) {
  a.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});
</script>

</body>
</html>`;

  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}
