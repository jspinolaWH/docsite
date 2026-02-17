import { useMemo } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ content }: { content: string }) {
  const headings = useMemo(() => {
    const items: TocItem[] = [];
    const regex = /^(#{2,4})\s+(.+)$/gm;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const text = match[2].replace(/[*`]/g, '').trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      items.push({ id, text, level: match[1].length });
    }
    return items;
  }, [content]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (headings.length < 3) return null;

  return (
    <nav className="toc">
      <h3 className="toc-title">On this page</h3>
      <ul>
        {headings.map((h) => (
          <li key={h.id} className={`toc-item toc-level-${h.level}`}>
            <a
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToHeading(h.id);
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
