import type { DocEntry } from '../types';
import { CategoryBadge } from './CategoryBadge';

function handleDownload(doc: DocEntry) {
  const blob = new Blob([doc.content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${doc.slug}.md`;
  a.click();
  URL.revokeObjectURL(url);
}

export function DocMeta({ doc }: { doc: DocEntry }) {
  return (
    <div className="doc-meta">
      <div className="doc-meta-header">
        <CategoryBadge category={doc.category} />
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
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
