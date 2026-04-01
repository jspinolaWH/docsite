import { HTMLDiagramViewer } from '../components/HTMLDiagramViewer';
import { DiagramTableOfContents } from '../components/DiagramTableOfContents';
import { Link } from 'react-router-dom';

const diagrams = [
  {
    id: 'inv-01-billing-event-lifecycle',
    title: 'Scenario 1: Billing Event Lifecycle',
    src: '/docsite/diagrams/html/invoicing/inv-01-billing-event-lifecycle.html',
    release: 'Release 1',
    releaseSlug: 'inv-release-1-core-billing',
  },
  {
    id: 'inv-02-billing-run-simulation',
    title: 'Scenario 2: Billing Run — Simulation, Validation & Send',
    src: '/docsite/diagrams/html/invoicing/inv-02-billing-run-simulation.html',
    release: 'Release 3',
    releaseSlug: 'inv-release-3-validation-accounting',
  },
  {
    id: 'inv-03-shared-service-invoicing',
    title: 'Scenario 3: Shared Service Invoicing',
    src: '/docsite/diagrams/html/invoicing/inv-03-shared-service-invoicing.html',
    release: 'Release 2',
    releaseSlug: 'inv-release-2-billing-config',
  },
  {
    id: 'inv-04-public-private-law',
    title: 'Scenario 4: Public vs. Private Law Invoicing',
    src: '/docsite/diagrams/html/invoicing/inv-04-public-private-law.html',
    release: 'Release 3',
    releaseSlug: 'inv-release-3-validation-accounting',
  },
  {
    id: 'inv-05-credit-invoice-flow',
    title: 'Scenario 5: Credit Invoice Flow',
    src: '/docsite/diagrams/html/invoicing/inv-05-credit-invoice-flow.html',
    release: 'Release 4',
    releaseSlug: 'inv-release-4-integration-advanced',
  },
  {
    id: 'inv-06-billing-cycles-seasonal-minimum',
    title: 'Scenario 6: Billing Cycles, Seasonal Fees & Minimum Fee',
    src: '/docsite/diagrams/html/invoicing/inv-06-billing-cycles-seasonal-minimum.html',
    release: 'Release 2',
    releaseSlug: 'inv-release-2-billing-config',
  },
  {
    id: 'inv-07-event-correction-transfer',
    title: 'Scenario 7: Event Correction & Transfer',
    src: '/docsite/diagrams/html/invoicing/inv-07-event-correction-transfer.html',
    release: 'Release 2',
    releaseSlug: 'inv-release-2-billing-config',
  },
  {
    id: 'inv-08-einvoice-address-management',
    title: 'Scenario 8: E-Invoice Integration & Billing Address Management',
    src: '/docsite/diagrams/html/invoicing/inv-08-einvoice-address-management.html',
    release: 'Release 4',
    releaseSlug: 'inv-release-4-integration-advanced',
  },
];

export function InvoicingFlowDiagramsPage() {
  return (
    <div className="doc-page">
      <div className="doc-layout">
        <article className="doc-article">
          <div style={styles.header}>
            <h1 style={styles.title}>Invoicing Flow Diagrams</h1>
            <p style={styles.description}>
              Interactive flowcharts showing how the invoicing system processes billing events,
              runs invoice batches, handles corrections, and delivers FINVOICE-compliant output
              across all four releases.
            </p>
          </div>

          <div style={styles.content}>
            {diagrams.map((diagram) => (
              <div id={diagram.id} key={diagram.id}>
                <div style={styles.releaseBadge}>
                  <Link to={`/invoicing/doc/${diagram.releaseSlug}`} style={styles.releaseLink}>
                    {diagram.release}
                  </Link>
                </div>
                <HTMLDiagramViewer
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
  releaseBadge: {
    marginBottom: '0.5rem',
  },
  releaseLink: {
    fontSize: '0.75rem',
    fontWeight: 600,
    color: '#0369a1',
    textDecoration: 'none',
    background: '#e0f2fe',
    padding: '2px 8px',
    borderRadius: '4px',
  },
};
