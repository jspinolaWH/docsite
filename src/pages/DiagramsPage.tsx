import { DiagramViewer } from '../components/DiagramViewer';

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

export function DiagramsPage() {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>System Diagrams</h1>
        <p style={styles.description}>
          Interactive diagrams showing the product pricing architecture and entity relationships.
          Scroll to zoom, drag to pan around the diagram.
        </p>
      </div>

      <div style={styles.content}>
        {diagrams.map((diagram) => (
          <DiagramViewer
            key={diagram.id}
            src={diagram.src}
            title={diagram.title}
          />
        ))}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '2rem',
  },
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
