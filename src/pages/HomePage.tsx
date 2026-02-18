import { Link } from 'react-router-dom';
import { useDocs } from '../hooks/useDocs';
import { useTheme } from '../hooks/useTheme';
import { CATEGORIES, DIAGRAM_LINKS } from '../types';

export function HomePage() {
  const { grouped } = useDocs();
  const { theme } = useTheme();

  return (
    <div className="home-page">
      <div className="home-hero">
        <h1>WasteHero 2.0 Documentation</h1>
        <p>Products &amp; Pricing documentation hub</p>
      </div>

      <div className="category-cards">
        {Object.entries(CATEGORIES).map(([catId, config]) => {
          const categoryColor =
            theme === 'dark' ? config.darkColor : config.color;

          // Special handling for diagrams category
          if (catId === 'diagrams') {
            return (
              <div
                key={catId}
                className="category-card"
                style={{ borderTopColor: categoryColor }}
              >
                <h2 style={{ color: categoryColor }}>{config.label}</h2>
                <p className="category-count">{DIAGRAM_LINKS.length} diagram types</p>
                <ul>
                  {DIAGRAM_LINKS.map((link) => (
                    <li key={link.slug}>
                      <Link to={`/diagrams/${link.slug}`}>{link.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          }

          // Regular docs categories
          const catDocs = grouped[catId] || [];
          return (
            <div
              key={catId}
              className="category-card"
              style={{ borderTopColor: categoryColor }}
            >
              <h2 style={{ color: categoryColor }}>{config.label}</h2>
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
