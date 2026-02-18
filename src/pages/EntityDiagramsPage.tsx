import { DiagramViewer } from '../components/DiagramViewer';
import { DiagramTableOfContents } from '../components/DiagramTableOfContents';

const diagrams = [
  {
    id: 'product-pricing-erd',
    title: 'Product Pricing - Entity Relationship Diagram',
    src: '/docsite/diagrams/Product Pricing - ERD.svg',
  },
  {
    id: 'product-pricing-entity-model',
    title: 'Product Pricing Entity Model',
    src: '/docsite/diagrams/productpricingentitymodel.svg',
  },
];

export function EntityDiagramsPage() {
  return (
    <div className="doc-page">
      <div className="doc-layout">
        <article className="doc-article">
          <div style={styles.header}>
            <h1 style={styles.title}>Entity Relationship Diagrams</h1>
            <p style={styles.description}>
              Database schema and entity relationships for the product pricing system.
              These diagrams show how different entities (Price Lists, Products, Zones, etc.) relate to each other.
            </p>
          </div>

          <div style={styles.content}>
            {diagrams.map((diagram) => (
              <div id={diagram.id} key={diagram.id}>
                <DiagramViewer
                  src={diagram.src}
                  title={diagram.title}
                />
              </div>
            ))}
          </div>
        </article>

        <aside className="doc-sidebar">
          <DiagramTableOfContents diagrams={diagrams} />
        </aside>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2.25rem',
    fontWeight: 700,
    color: 'var(--color-text-primary)',
    marginBottom: '0.5rem',
  },
  description: {
    fontSize: '1.125rem',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.6,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
};
