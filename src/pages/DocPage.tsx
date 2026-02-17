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
          {doc.related.length > 0 && <RelatedDocs slugs={doc.related} />}
        </article>

        <aside className="doc-sidebar">
          <TableOfContents content={doc.content} />
        </aside>
      </div>
    </div>
  );
}
