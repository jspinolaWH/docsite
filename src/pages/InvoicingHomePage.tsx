import { Link } from 'react-router-dom';
import { useInvoicingDocs } from '../hooks/useInvoicingDocs';
import { useTheme } from '../hooks/useTheme';
import { INVOICING_CATEGORIES } from '../types';

export function InvoicingHomePage() {
  const { grouped } = useInvoicingDocs();
  const { theme } = useTheme();

  return (
    <div className="home-page">
      <div className="home-hero">
        <h1>WasteHero 2.0 Documentation</h1>
        <p>Invoicing documentation hub</p>
      </div>

      <div className="category-cards">
        {Object.entries(INVOICING_CATEGORIES).map(([catId, config]) => {
          const categoryColor =
            theme === 'dark' ? config.darkColor : config.color;
          const catDocs = grouped[catId] || [];

          return (
            <div
              key={catId}
              className="category-card"
              style={{ borderTopColor: categoryColor }}
            >
              <h2 style={{ color: categoryColor }}>{config.label}</h2>
              <p className="category-count">
                {catDocs.length === 0
                  ? 'Coming soon'
                  : `${catDocs.length} document${catDocs.length === 1 ? '' : 's'}`}
              </p>
              <ul>
                {catDocs.map((doc) => (
                  <li key={doc.slug}>
                    <Link to={`/invoicing/doc/${doc.slug}`}>{doc.title}</Link>
                  </li>
                ))}
                {catDocs.length === 0 && (
                  <li style={{ opacity: 0.5, fontStyle: 'italic', fontSize: '0.875rem' }}>
                    No documents yet
                  </li>
                )}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
