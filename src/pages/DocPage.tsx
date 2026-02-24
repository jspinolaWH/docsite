import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDocs } from '../hooks/useDocs';
import { BreadCrumb } from '../components/BreadCrumb';
import { DocMeta } from '../components/DocMeta';
import { DocRenderer } from '../components/DocRenderer';
import { TableOfContents } from '../components/TableOfContents';
import { RelatedDocs } from '../components/RelatedDocs';

export function DocPage() {
  const { slug } = useParams<{ slug: string }>();
  const { getBySlug } = useDocs();

  const doc = slug ? getBySlug(slug) : undefined;

  // Scroll to top when document changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

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
      <BreadCrumb category={doc.category} title={doc.title} />

      <div className="doc-layout">
        <article className="doc-article">
          <DocMeta doc={doc} />
          <DocRenderer content={doc.content} />
          {doc.designPreview && (
            <div className="design-preview-section">
              <h2 className="design-preview-title">Design Preview</h2>
              <p className="design-preview-subtitle">Interactive prototype — click to open in Figma.</p>
              <a
                href={doc.designPreview}
                target="_blank"
                rel="noopener noreferrer"
                className="design-preview-link"
              >
                <span className="design-preview-link-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </span>
                Open design in Figma
              </a>
            </div>
          )}
          {doc.related.length > 0 && <RelatedDocs slugs={doc.related} />}
        </article>

        <aside className="doc-sidebar">
          <TableOfContents content={doc.content} />
        </aside>
      </div>
    </div>
  );
}
