import { HTMLDiagramViewer } from '../components/HTMLDiagramViewer';

const diagrams = [
  {
    id: '01-pricing-calculation',
    title: 'Scenario 1: Complete Pricing Calculation Flow',
    src: '/docsite/diagrams/html/01-pricing-calculation-flow.html',
  },
  {
    id: '02-fallback-pricing',
    title: 'Scenario 2: Fallback Pricing (No Perfect Match)',
    src: '/docsite/diagrams/html/02-fallback-pricing.html',
  },
  {
    id: '03-automatic-service',
    title: 'Scenario 3: Automatic Additional Service',
    src: '/docsite/diagrams/html/03-automatic-additional-service.html',
  },
  {
    id: '04-driver-initiated',
    title: 'Scenario 4: Driver-Initiated Additional Service',
    src: '/docsite/diagrams/html/04-driver-initiated-service.html',
  },
  {
    id: '05-bulk-update',
    title: 'Scenario 5: Bulk Price Update',
    src: '/docsite/diagrams/html/05-bulk-price-update.html',
  },
  {
    id: '06-scheduled-increase',
    title: 'Scenario 6: Scheduled Price Increase',
    src: '/docsite/diagrams/html/06-scheduled-price-increase.html',
  },
  {
    id: '07-multiple-surcharges',
    title: 'Scenario 7: Multiple Surcharges Stack',
    src: '/docsite/diagrams/html/07-multiple-surcharges.html',
  },
  {
    id: '08-time-based',
    title: 'Scenario 8: Time-Based Pricing (Per Hour)',
    src: '/docsite/diagrams/html/08-time-based-pricing.html',
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
