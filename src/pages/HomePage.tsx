import { Link } from 'react-router-dom';
import { useDocs } from '../hooks/useDocs';
import { CATEGORIES } from '../types';
import type { DocEntry } from '../types';

function RelationshipGraph({ docs }: { docs: DocEntry[] }) {
  const nodeRadius = 6;
  const width = 700;
  const height = 320;
  const centerX = width / 2;
  const centerY = height / 2;

  const positions = new Map<string, { x: number; y: number }>();
  const angleStep = (2 * Math.PI) / docs.length;

  docs.forEach((doc, i) => {
    const angle = angleStep * i - Math.PI / 2;
    const rx = width * 0.38;
    const ry = height * 0.38;
    positions.set(doc.slug, {
      x: centerX + rx * Math.cos(angle),
      y: centerY + ry * Math.sin(angle),
    });
  });

  const edges: { from: string; to: string }[] = [];
  for (const doc of docs) {
    for (const rel of doc.related) {
      if (positions.has(rel) && doc.slug < rel) {
        edges.push({ from: doc.slug, to: rel });
      }
    }
  }

  return (
    <div className="relationship-graph">
      <h2>Document Relationships</h2>
      <svg viewBox={`0 0 ${width} ${height}`} className="graph-svg">
        {edges.map((e) => {
          const from = positions.get(e.from)!;
          const to = positions.get(e.to)!;
          return (
            <line
              key={`${e.from}-${e.to}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="#d1d5db"
              strokeWidth="1.5"
            />
          );
        })}
        {docs.map((doc) => {
          const pos = positions.get(doc.slug)!;
          const cat = CATEGORIES[doc.category];
          return (
            <Link key={doc.slug} to={`/doc/${doc.slug}`}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={nodeRadius}
                fill={cat?.color || '#6b7280'}
              />
              <text
                x={pos.x}
                y={pos.y + nodeRadius + 14}
                textAnchor="middle"
                className="graph-label"
                fontSize="10"
              >
                {doc.title.length > 25
                  ? doc.title.slice(0, 22) + '...'
                  : doc.title}
              </text>
            </Link>
          );
        })}
      </svg>
    </div>
  );
}

export function HomePage() {
  const { grouped, docs } = useDocs();

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

      <RelationshipGraph docs={docs} />
    </div>
  );
}
