import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const BASE = import.meta.env.BASE_URL;

export function RequirementsCompliancePage() {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${BASE}miska/requirements.md`)
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
        return r.text();
      })
      .then(setContent)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <div className="doc-page">
      <div className="doc-layout">
        <article className="doc-article">
          {error && (
            <p style={{ color: '#ef4444' }}>Failed to load requirements doc: {error}</p>
          )}
          {!content && !error && (
            <p style={{ color: 'var(--color-text-secondary)' }}>Loading…</p>
          )}
          {content && (
            <div className="doc-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
