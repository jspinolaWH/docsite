import { HTMLDiagramViewer } from '../components/HTMLDiagramViewer';

const diagrams = [
  {
    id: 'pricing-flow',
    title: 'WasteHero 2.0 - Pricing Calculation Flow',
    src: '/docsite/diagrams/html/wh2_pricing_flow_6.html',
  },
];

export function FlowDiagramsPage() {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Flow & Activity Diagrams</h1>
        <p style={styles.description}>
          Interactive flowcharts showing how the pricing system processes customer orders
          and calculates final prices through various decision points and conditions.
        </p>
      </div>

      <div style={styles.content}>
        {diagrams.map((diagram) => (
          <HTMLDiagramViewer
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
