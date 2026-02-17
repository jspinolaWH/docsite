import { Link } from 'react-router-dom';
import { useDocs } from '../hooks/useDocs';
import { CategoryBadge } from '../components/CategoryBadge';

export function SearchResultsPage() {
  const { searchQuery, search } = useDocs();
  const results = search(searchQuery);

  return (
    <div className="search-results-page">
      <h1>
        {searchQuery
          ? `Search results for "${searchQuery}"`
          : 'Search documents'}
      </h1>

      {searchQuery && (
        <p className="results-count">
          {results.length} {results.length === 1 ? 'result' : 'results'} found
        </p>
      )}

      <div className="results-list">
        {results.map((doc) => (
          <Link
            key={doc.slug}
            to={`/doc/${doc.slug}`}
            className="result-card"
          >
            <div className="result-header">
              <CategoryBadge category={doc.category} />
              <h3>{doc.title}</h3>
            </div>
            <p>{doc.description}</p>
            {doc.tags.length > 0 && (
              <div className="result-tags">
                {doc.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
