import './globals.css';

export const metadata = {
  title: 'Unhinged — Stop sending a PDF. Send a page.',
  description: 'AI-powered job application landing pages that actually get you hired.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
