import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useInvoicingDocs } from '../hooks/useInvoicingDocs';
import { DocRenderer } from '../components/DocRenderer';
import { TableOfContents } from '../components/TableOfContents';
import { INVOICING_CATEGORIES } from '../types';
import type { DocEntry } from '../types';

function handleDownload(doc: DocEntry) {
  const blob = new Blob([doc.content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${doc.slug}.md`;
  a.click();
  URL.revokeObjectURL(url);
}

export function InvoicingDocPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const { hash } = useLocation();
  const highlight = searchParams.get('q') ?? undefined;
  const { getBySlug } = useInvoicingDocs();

  const doc = slug ? getBySlug(slug) : undefined;
  const catConfig = doc ? INVOICING_CATEGORIES[doc.category] : undefined;

  useEffect(() => {
    if (highlight) return;
    if (hash) {
      const id = hash.slice(1);
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const offsetPosition = el.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          el.style.transition = 'background-color 0.4s ease';
          el.style.backgroundColor = 'rgba(245, 158, 11, 0.25)';
          setTimeout(() => { el.style.backgroundColor = ''; }, 2500);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [slug, highlight, hash]);

  if (!doc) {
    return (
      <div className="not-found">
        <h1>Document not found</h1>
        <p>The document "{slug}" could not be found.</p>
      </div>
    );
  }

  return (
    <div className="doc-page">
      <nav className="breadcrumb">
        <Link to="/invoicing">Invoicing Home</Link>
        {catConfig && (
          <>
            <span className="breadcrumb-sep">/</span>
            <span style={{ color: catConfig.color }}>{catConfig.label}</span>
          </>
        )}
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">{doc.title}</span>
      </nav>

      <div className="doc-layout">
        <article className="doc-article">
          <div className="doc-meta">
            <div className="doc-meta-header">
              {catConfig && (
                <span
                  className="badge"
                  style={{
                    color: catConfig.color,
                    backgroundColor: catConfig.bgColor,
                    border: `1px solid ${catConfig.borderColor}`,
                  }}
                >
                  {catConfig.label}
                </span>
              )}
              <button
                className="download-btn"
                onClick={() => handleDownload(doc)}
                title="Download markdown file"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download .md
              </button>
            </div>
            <h1 className="doc-title">{doc.title}</h1>
            {doc.description && (
              <p className="doc-description">{doc.description}</p>
            )}
            {doc.tags.length > 0 && (
              <div className="doc-tags">
                {doc.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
          <DocRenderer key={slug} content={doc.content} highlight={highlight} />
        </article>

        <aside className="doc-sidebar">
          <TableOfContents content={doc.content} />
        </aside>
      </div>
    </div>
  );
}
