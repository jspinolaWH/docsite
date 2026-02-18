interface DiagramItem {
  id: string;
  title: string;
}

interface DiagramTableOfContentsProps {
  diagrams: DiagramItem[];
}

export function DiagramTableOfContents({ diagrams }: DiagramTableOfContentsProps) {
  const scrollToDiagram = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80; // Header height + padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (diagrams.length < 2) return null;

  return (
    <nav className="toc">
      <h3 className="toc-title">On this page</h3>
      <ul>
        {diagrams.map((diagram) => (
          <li key={diagram.id} className="toc-item toc-level-2">
            <a
              href={`#${diagram.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToDiagram(diagram.id);
              }}
            >
              {diagram.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
