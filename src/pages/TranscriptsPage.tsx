import { useState, useEffect } from 'react';

const BASE = import.meta.env.BASE_URL;

interface TranscriptMeta {
  id: string;
  title: string;
  titleEn: string;
  date: string;
  focus: string;
  fiFile: string;
  enFile: string;
}

const TRANSCRIPTS: TranscriptMeta[] = [
  {
    id: 't1',
    title: 'PJH ERP: Tuotteet ja hinnastot — Kyselytunti',
    titleEn: 'PJH ERP: Products and Price Lists — Q&A Session',
    date: 'Feb 6, 2026',
    focus: 'Component math, price lists, palveluvastuu as pricing driver',
    fiFile: `${BASE}miska/transcripts/t1-fi.txt`,
    enFile: `${BASE}miska/transcripts/t1-en.txt`,
  },
  {
    id: 't2',
    title: 'PJH ERP: Tuotteiston rakentaminen ja laaditun excelin läpikäynti',
    titleEn: 'PJH ERP: Building the Product Catalogue & Excel Review',
    date: 'Mar 4, 2026',
    focus: 'Excel review, container handling, contractor pricing',
    fiFile: `${BASE}miska/transcripts/t2-fi.txt`,
    enFile: `${BASE}miska/transcripts/t2-en.txt`,
  },
  {
    id: 't3',
    title: 'Tuote ja hinnastot: PJH:n strategiset linjaukset',
    titleEn: 'Products and Price Lists: PJH Strategic Directions',
    date: 'Mar 18, 2026',
    focus: 'Architecture: components vs attributes, product hierarchy',
    fiFile: `${BASE}miska/transcripts/t3-fi.txt`,
    enFile: `${BASE}miska/transcripts/t3-en.txt`,
  },
];

function TranscriptCard({ meta }: { meta: TranscriptMeta }) {
  const [lang, setLang] = useState<'fi' | 'en'>('fi');
  const [text, setText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const url = lang === 'fi' ? meta.fiFile : meta.enFile;
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
        return r.text();
      })
      .then((t) => { setText(t); setLoading(false); })
      .catch((e) => { setError(e.message); setLoading(false); });
  }, [lang, meta.fiFile, meta.enFile]);

  return (
    <div style={cardStyle}>
      {/* Header */}
      <div style={cardHeaderStyle}>
        <div>
          <h2 style={cardTitleStyle}>{lang === 'fi' ? meta.title : meta.titleEn}</h2>
          <div style={cardMetaStyle}>
            <span style={dateBadge}>{meta.date}</span>
            <span style={focusText}>{meta.focus}</span>
          </div>
        </div>
        <div style={toggleWrapStyle}>
          <button
            onClick={() => setLang('fi')}
            style={{ ...toggleBtn, ...(lang === 'fi' ? toggleActive : {}) }}
          >
            🇫🇮 Finnish
          </button>
          <button
            onClick={() => setLang('en')}
            style={{ ...toggleBtn, ...(lang === 'en' ? toggleActive : {}) }}
          >
            🇬🇧 English
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={transcriptBody}>
        {loading && <p style={statusText}>Loading…</p>}
        {error && <p style={{ ...statusText, color: '#ef4444' }}>Failed to load: {error}</p>}
        {!loading && !error && text && (
          <pre style={preStyle}>{text}</pre>
        )}
      </div>
    </div>
  );
}

export function TranscriptsPage() {
  return (
    <div style={pageWrap}>
      <div style={pageHeader}>
        <h1 style={pageTitleStyle}>Meeting Transcripts</h1>
        <p style={pageDescStyle}>
          Three PJH stakeholder sessions on products &amp; pricing. Toggle each transcript between the original Finnish and an English translation.
        </p>
      </div>
      <div style={cardsWrap}>
        {TRANSCRIPTS.map((m) => (
          <TranscriptCard key={m.id} meta={m} />
        ))}
      </div>
    </div>
  );
}

/* ── styles ── */
const pageWrap: React.CSSProperties = {
  maxWidth: '900px',
  margin: '0 auto',
  padding: '2rem 1.5rem',
};
const pageHeader: React.CSSProperties = { marginBottom: '2rem' };
const pageTitleStyle: React.CSSProperties = {
  fontSize: '2rem',
  fontWeight: 700,
  color: 'var(--color-text-primary)',
  marginBottom: '0.5rem',
};
const pageDescStyle: React.CSSProperties = {
  fontSize: '1rem',
  color: 'var(--color-text-secondary)',
  lineHeight: 1.6,
};
const cardsWrap: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
};
const cardStyle: React.CSSProperties = {
  border: '1px solid var(--color-border)',
  borderRadius: '12px',
  overflow: 'hidden',
  background: 'var(--color-surface)',
};
const cardHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  padding: '1.25rem 1.5rem',
  borderBottom: '1px solid var(--color-border)',
  gap: '1rem',
  flexWrap: 'wrap',
};
const cardTitleStyle: React.CSSProperties = {
  fontSize: '1.05rem',
  fontWeight: 600,
  color: 'var(--color-text-primary)',
  marginBottom: '0.4rem',
};
const cardMetaStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  flexWrap: 'wrap',
};
const dateBadge: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 600,
  background: 'var(--color-accent-bg, #eff6ff)',
  color: 'var(--color-accent, #2563eb)',
  padding: '2px 8px',
  borderRadius: '99px',
};
const focusText: React.CSSProperties = {
  fontSize: '0.8rem',
  color: 'var(--color-text-secondary)',
  fontStyle: 'italic',
};
const toggleWrapStyle: React.CSSProperties = {
  display: 'flex',
  gap: '4px',
  flexShrink: 0,
};
const toggleBtn: React.CSSProperties = {
  padding: '6px 14px',
  borderRadius: '8px',
  border: '1px solid var(--color-border)',
  background: 'var(--color-bg)',
  color: 'var(--color-text-secondary)',
  fontSize: '0.8rem',
  cursor: 'pointer',
  fontWeight: 500,
  transition: 'all 0.15s',
};
const toggleActive: React.CSSProperties = {
  background: '#2563eb',
  color: '#fff',
  borderColor: '#2563eb',
};
const transcriptBody: React.CSSProperties = {
  maxHeight: '520px',
  overflowY: 'auto',
  padding: '1rem 1.5rem',
};
const preStyle: React.CSSProperties = {
  margin: 0,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  fontFamily: 'var(--font-mono, monospace)',
  fontSize: '0.82rem',
  lineHeight: 1.7,
  color: 'var(--color-text-primary)',
};
const statusText: React.CSSProperties = {
  color: 'var(--color-text-secondary)',
  fontSize: '0.9rem',
};
