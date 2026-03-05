import { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';

// Skip linkifying inside these node types
const SKIP = new Set(['code', 'inlineCode', 'link', 'linkReference', 'image']);

function transformNode(node: any): any[] {
  if (SKIP.has(node.type)) return [node];

  if (node.type === 'text' && /PD-\d+/.test(node.value)) {
    const pattern = /PD-(\d+)/g;
    const nodes: any[] = [];
    let last = 0;
    let match;
    while ((match = pattern.exec(node.value)) !== null) {
      if (match.index > last) {
        nodes.push({ type: 'text', value: node.value.slice(last, match.index) });
      }
      nodes.push({
        type: 'link',
        url: `https://ioteelab.atlassian.net/browse/${match[0]}`,
        title: null,
        children: [{ type: 'text', value: match[0] }],
      });
      last = match.index + match[0].length;
    }
    if (last < node.value.length) {
      nodes.push({ type: 'text', value: node.value.slice(last) });
    }
    return nodes;
  }

  if (node.children) {
    node.children = node.children.flatMap(transformNode);
  }
  return [node];
}

function remarkLinkPdTasks() {
  return (tree: any) => {
    tree.children = tree.children.flatMap(transformNode);
  };
}

export function DocRenderer({ content, highlight }: { content: string; highlight?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!highlight || !ref.current) return;
    const q = highlight.trim().toLowerCase();
    if (!q) return;

    const timer = setTimeout(() => {
      if (!ref.current) return;
      const walker = document.createTreeWalker(ref.current, NodeFilter.SHOW_TEXT);
      let node: Node | null;
      while ((node = walker.nextNode())) {
        if (node.textContent?.toLowerCase().includes(q)) {
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
        remarkPlugins={[remarkGfm, remarkLinkPdTasks]}
        rehypePlugins={[rehypeHighlight, rehypeSlug]}
        components={{
          a: ({ href, children, ...props }) => (
            <a
              href={href}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              {...props}
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
