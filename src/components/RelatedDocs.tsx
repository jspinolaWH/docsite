import { Link } from 'react-router-dom';
import { useDocs } from '../hooks/useDocs';
import { CategoryBadge } from './CategoryBadge';

export function RelatedDocs({ slugs }: { slugs: string[] }) {
  const { getBySlug } = useDocs();

  const related = slugs
    .map((s) => getBySlug(s))
    .filter((d): d is NonNullable<typeof d> => d != null);

  if (related.length === 0) return null;

  return (
    <div className="related-docs">
      <h3>Related Documents</h3>
      <div className="related-grid">
        {related.map((doc) => (
          <Link
            key={doc.slug}
            to={`/doc/${doc.slug}`}
            className="related-card"
          >
            <CategoryBadge category={doc.category} />
            <h4>{doc.title}</h4>
            <p>{doc.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
