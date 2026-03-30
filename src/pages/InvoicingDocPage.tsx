import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useInvoicingDocs } from '../hooks/useInvoicingDocs';
import { DocRenderer } from '../components/DocRenderer';
import { TableOfContents } from '../components/TableOfContents';
import { INVOICING_CATEGORIES } from '../types';

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
          <DocRenderer content={doc.content} highlight={highlight} />
        </article>

        <aside className="doc-sidebar">
          <TableOfContents content={doc.content} />
        </aside>
      </div>
    </div>
  );
}
