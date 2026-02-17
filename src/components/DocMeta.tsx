import type { DocEntry } from '../types';
import { CategoryBadge } from './CategoryBadge';

export function DocMeta({ doc }: { doc: DocEntry }) {
  return (
    <div className="doc-meta">
      <CategoryBadge category={doc.category} />
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
