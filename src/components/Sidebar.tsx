import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDocs } from '../hooks/useDocs';
import { useInvoicingDocs } from '../hooks/useInvoicingDocs';
import { useTheme } from '../hooks/useTheme';
import { CATEGORIES, INVOICING_CATEGORIES, DIAGRAM_LINKS } from '../types';

const ExternalIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" style={{ marginLeft: '6px', verticalAlign: 'middle', flexShrink: 0 }}>
    <path d="M10 1H7M10 1V4M10 1L5 6M4 2H2v8h8V8" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

function MiskaDocsSection() {
  const [open, setOpen] = useState(true);
  const { pathname } = useLocation();
  const color = '#7c3aed';

  return (
    <div className="sidebar-category">
      <button
        className="sidebar-category-header"
        onClick={() => setOpen((p) => !p)}
        style={{ borderLeftColor: color }}
      >
        <span className="sidebar-category-label" style={{ color }}>
          Miska Docs
        </span>
        <span className={`sidebar-chevron ${open ? 'open' : ''}`}>
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </span>
      </button>

      {open && (
        <ul className="sidebar-docs">
          <li>
            <NavLink
              to="/miska/transcripts"
              className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
            >
              Transcripts
            </NavLink>
          </li>
          <li>
            <a
              href="/docsite/miska/GenericProductsMockup.html"
              target="_blank"
              rel="noopener noreferrer"
              className={`sidebar-link${pathname === '/__never__' ? ' active' : ''}`}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              Generic Products Mockup
              <ExternalIcon />
            </a>
          </li>
          <li>
            <NavLink
              to="/miska/requirements"
              className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
            >
              Requirements Compliance
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
}

function SectionSwitcher() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isInvoicing = pathname.startsWith('/invoicing');

  return (
    <div style={{
      display: 'flex',
      gap: '4px',
      padding: '10px 12px 8px',
      borderBottom: '1px solid var(--border)',
      marginBottom: '4px',
    }}>
      <button
        onClick={() => navigate('/')}
        style={{
          flex: 1,
          padding: '5px 8px',
          fontSize: '0.72rem',
          fontWeight: 600,
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
          transition: 'background 0.15s, color 0.15s',
          background: !isInvoicing ? '#7c3aed' : 'transparent',
          color: !isInvoicing ? '#fff' : 'var(--text-muted)',
          outline: !isInvoicing ? 'none' : '1px solid var(--border)',
        }}
      >
        P&amp;P
      </button>
      <button
        onClick={() => navigate('/invoicing')}
        style={{
          flex: 1,
          padding: '5px 8px',
          fontSize: '0.72rem',
          fontWeight: 600,
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
          transition: 'background 0.15s, color 0.15s',
          background: isInvoicing ? '#0369a1' : 'transparent',
          color: isInvoicing ? '#fff' : 'var(--text-muted)',
          outline: isInvoicing ? 'none' : '1px solid var(--border)',
        }}
      >
        Invoicing
      </button>
    </div>
  );
}

function PPSidebarContent() {
  const { grouped } = useDocs();
  const { theme } = useTheme();
  const [localCollapsed, setLocalCollapsed] = useState<Record<string, boolean>>({});

  const toggle = (key: string) =>
    setLocalCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <>
      <NavLink to="/" className="sidebar-home" end>
        Home
      </NavLink>

      <NavLink to="/cycles" className="sidebar-home">
        Cycles
      </NavLink>

      <a
        href="https://jspinolawh.github.io/ProductsPricing/Mockup.html"
        className="sidebar-home"
        target="_blank"
        rel="noopener noreferrer"
      >
        Mockup
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          style={{ marginLeft: '6px', verticalAlign: 'middle' }}
        >
          <path
            d="M10 1H7M10 1V4M10 1L5 6M4 2H2v8h8V8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </a>

      <MiskaDocsSection />

      {Object.entries(CATEGORIES).map(([catId, config]) => {
        const isCollapsed = localCollapsed[catId] ?? false;
        const categoryColor = theme === 'dark' ? config.darkColor : config.color;

        if (catId === 'diagrams') {
          return (
            <div key={catId} className="sidebar-category">
              <button
                className="sidebar-category-header"
                onClick={() => toggle(catId)}
                style={{ borderLeftColor: categoryColor }}
              >
                <span className="sidebar-category-label" style={{ color: categoryColor }}>
                  {config.label}
                </span>
                <span className={`sidebar-chevron ${isCollapsed ? '' : 'open'}`}>
                  <svg width="12" height="12" viewBox="0 0 12 12">
                    <path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </span>
              </button>

              {!isCollapsed && (
                <ul className="sidebar-docs">
                  {DIAGRAM_LINKS.map((link) => (
                    <li key={link.slug}>
                      <NavLink
                        to={`/diagrams/${link.slug}`}
                        className={({ isActive }) =>
                          `sidebar-link${isActive ? ' active' : ''}`
                        }
                      >
                        {link.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        }

        const docs = grouped[catId] || [];
        return (
          <div key={catId} className="sidebar-category">
            <button
              className="sidebar-category-header"
              onClick={() => toggle(catId)}
              style={{ borderLeftColor: categoryColor }}
            >
              <span className="sidebar-category-label" style={{ color: categoryColor }}>
                {config.label}
              </span>
              <span className={`sidebar-chevron ${isCollapsed ? '' : 'open'}`}>
                <svg width="12" height="12" viewBox="0 0 12 12">
                  <path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </span>
            </button>

            {!isCollapsed && (
              <ul className="sidebar-docs">
                {docs.map((doc) => (
                  <li key={doc.slug}>
                    <NavLink
                      to={`/doc/${doc.slug}`}
                      className={({ isActive }) =>
                        `sidebar-link${isActive ? ' active' : ''}`
                      }
                    >
                      {doc.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </>
  );
}

function InvoicingSidebarContent() {
  const { grouped } = useInvoicingDocs();
  const { theme } = useTheme();
  const [localCollapsed, setLocalCollapsed] = useState<Record<string, boolean>>({});

  const toggle = (key: string) =>
    setLocalCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <>
      <NavLink to="/invoicing" className="sidebar-home" end>
        Home
      </NavLink>

      <div className="sidebar-category">
        <button
          className="sidebar-category-header"
          onClick={() => toggle('inv-diagrams')}
          style={{ borderLeftColor: '#0369a1' }}
        >
          <span className="sidebar-category-label" style={{ color: '#0369a1' }}>
            Diagrams
          </span>
          <span className={`sidebar-chevron ${localCollapsed['inv-diagrams'] ? '' : 'open'}`}>
            <svg width="12" height="12" viewBox="0 0 12 12">
              <path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>
        </button>

        {!localCollapsed['inv-diagrams'] && (
          <ul className="sidebar-docs">
            <li>
              <NavLink
                to="/invoicing/diagrams/flow-diagrams"
                className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
              >
                Flow Diagrams
              </NavLink>
            </li>
          </ul>
        )}
      </div>

      {Object.entries(INVOICING_CATEGORIES).map(([catId, config]) => {
        const isCollapsed = localCollapsed[catId] ?? false;
        const categoryColor = theme === 'dark' ? config.darkColor : config.color;
        const docs = grouped[catId] || [];

        return (
          <div key={catId} className="sidebar-category">
            <button
              className="sidebar-category-header"
              onClick={() => toggle(catId)}
              style={{ borderLeftColor: categoryColor }}
            >
              <span className="sidebar-category-label" style={{ color: categoryColor }}>
                {config.label}
              </span>
              <span className={`sidebar-chevron ${isCollapsed ? '' : 'open'}`}>
                <svg width="12" height="12" viewBox="0 0 12 12">
                  <path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </span>
            </button>

            {!isCollapsed && (
              <ul className="sidebar-docs">
                {docs.length === 0 ? (
                  <li style={{ padding: '4px 12px', opacity: 0.45, fontStyle: 'italic', fontSize: '0.8rem' }}>
                    No documents yet
                  </li>
                ) : (
                  docs.map((doc) => (
                    <li key={doc.slug}>
                      <NavLink
                        to={`/invoicing/doc/${doc.slug}`}
                        className={({ isActive }) =>
                          `sidebar-link${isActive ? ' active' : ''}`
                        }
                      >
                        {doc.title}
                      </NavLink>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        );
      })}
    </>
  );
}

export function Sidebar({ collapsed: sidebarCollapsed = false }: { collapsed?: boolean }) {
  const { pathname } = useLocation();
  const isInvoicing = pathname.startsWith('/invoicing');

  return (
    <aside className={`sidebar${sidebarCollapsed ? ' sidebar-hidden' : ''}`}>
      <SectionSwitcher />
      <nav>
        {isInvoicing ? (
          <InvoicingSidebarContent />
        ) : (
          <PPSidebarContent />
        )}
      </nav>
    </aside>
  );
}
