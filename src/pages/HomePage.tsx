import { Link } from 'react-router-dom';
import { useDocs } from '../hooks/useDocs';
import { CATEGORIES } from '../types';

export function HomePage() {
  const { grouped } = useDocs();

  return (
    <div className="home-page">
      <div className="home-hero">
        <h1>WasteHero 2.0 Documentation</h1>
        <p>Products &amp; Pricing documentation hub</p>
      </div>

      <div className="category-cards">
        {Object.entries(CATEGORIES).map(([catId, config]) => {
          const catDocs = grouped[catId] || [];
          return (
            <div
              key={catId}
              className="category-card"
              style={{ borderTopColor: config.color }}
            >
              <h2 style={{ color: config.color }}>{config.label}</h2>
              <p className="category-count">{catDocs.length} documents</p>
              <ul>
                {catDocs.map((doc) => (
                  <li key={doc.slug}>
                    <Link to={`/doc/${doc.slug}`}>{doc.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
