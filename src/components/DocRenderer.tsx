import { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';

export function DocRenderer({ content, highlight }: { content: string; highlight?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!highlight || !ref.current) return;
    const q = highlight.trim().toLowerCase();
    if (!q) return;

    // Small delay to ensure markdown has rendered
    const timer = setTimeout(() => {
      if (!ref.current) return;
      const walker = document.createTreeWalker(ref.current, NodeFilter.SHOW_TEXT);
      let node: Node | null;
      while ((node = walker.nextNode())) {
        if (node.textContent?.toLowerCase().includes(q)) {
          // Walk up to the nearest meaningful block element
          let el = node.parentElement;
          while (el && el !== ref.current) {
            const tag = el.tagName;
            if (/^(H[1-6]|P|LI|TR|TD|TH|BLOCKQUOTE|PRE)$/.test(tag)) break;
            el = el.parentElement;
          }
          if (el && el !== ref.current) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.style.transition = 'background-color 0.4s ease';
            el.style.backgroundColor = 'rgba(245, 158, 11, 0.25)';
            setTimeout(() => {
              if (el) el.style.backgroundColor = '';
            }, 2500);
          }
          break;
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [highlight, content]);

  return (
    <div className="markdown-body" ref={ref}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeSlug]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
