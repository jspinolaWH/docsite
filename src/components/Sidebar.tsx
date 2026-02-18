import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDocs } from '../hooks/useDocs';
import { useTheme } from '../hooks/useTheme';
import { CATEGORIES, DIAGRAM_LINKS } from '../types';

export function Sidebar() {
  const { grouped } = useDocs();
  const { theme } = useTheme();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggle = (cat: string) =>
    setCollapsed((prev) => ({ ...prev, [cat]: !prev[cat] }));

  return (
    <aside className="sidebar">
      <nav>
        <NavLink to="/" className="sidebar-home" end>
          Home
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

        {Object.entries(CATEGORIES).map(([catId, config]) => {
          const isCollapsed = collapsed[catId] ?? false;
          const categoryColor =
            theme === 'dark' ? config.darkColor : config.color;

          // Special handling for diagrams category (uses static links)
          if (catId === 'diagrams') {
            return (
              <div key={catId} className="sidebar-category">
                <button
                  className="sidebar-category-header"
                  onClick={() => toggle(catId)}
                  style={{ borderLeftColor: categoryColor }}
                >
                  <span
                    className="sidebar-category-label"
                    style={{ color: categoryColor }}
                  >
                    {config.label}
                  </span>
                  <span
                    className={`sidebar-chevron ${isCollapsed ? '' : 'open'}`}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12">
                      <path
                        d="M4 2l4 4-4 4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
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

          // Regular docs categories
          const docs = grouped[catId] || [];
          return (
            <div key={catId} className="sidebar-category">
              <button
                className="sidebar-category-header"
                onClick={() => toggle(catId)}
                style={{ borderLeftColor: categoryColor }}
              >
                <span
                  className="sidebar-category-label"
                  style={{ color: categoryColor }}
                >
                  {config.label}
                </span>
                <span
                  className={`sidebar-chevron ${isCollapsed ? '' : 'open'}`}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12">
                    <path
                      d="M4 2l4 4-4 4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
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
      </nav>
    </aside>
  );
}
