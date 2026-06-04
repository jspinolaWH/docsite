import { useRef, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
let mermaidCounter = 0;

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

function CodeBlock({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const isMermaid = Array.isArray(children)
    ? children.some((c: any) => c?.props?.className?.includes('language-mermaid'))
    : (children as any)?.props?.className?.includes('language-mermaid');

  if (isMermaid) return <pre {...props}>{children}</pre>;

  function handleCopy() {
    const text = preRef.current?.textContent ?? '';
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="code-block-wrapper">
      <pre ref={preRef} {...props}>{children}</pre>
      <button className="copy-code-btn" onClick={handleCopy} title="Copy code">
        {copied ? (
          <>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Copied!
          </>
        ) : (
          <>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            Copy
          </>
        )}
      </button>
    </div>
  );
}

export function DocRenderer({ content, highlight }: { content: string; highlight?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  // Lazy-load mermaid and render diagrams after ReactMarkdown finishes
  useEffect(() => {
    if (!ref.current) return;
    const blocks = ref.current.querySelectorAll<HTMLElement>('code.language-mermaid');
    if (blocks.length === 0) return;

    let cancelled = false;
    (async () => {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({ startOnLoad: false, theme: 'neutral', securityLevel: 'loose' });
        for (const block of Array.from(blocks)) {
          if (cancelled) break;
          const code = block.textContent || '';
          const pre = block.parentElement;
          if (!pre) continue;
          const id = `mermaid-${++mermaidCounter}`;
          try {
            const { svg } = await mermaid.render(id, code);
            const wrapper = document.createElement('div');
            wrapper.innerHTML = svg;
            wrapper.style.overflowX = 'auto';
            wrapper.style.margin = '1.5rem 0';
            pre.replaceWith(wrapper);
          } catch {
            // leave as code block on failure
          }
        }
      } catch {
        // mermaid failed to load — leave blocks as-is
      }
    })();
    return () => { cancelled = true; };
  }, [content]);

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
          pre: CodeBlock as any,
          a: ({ href, children, ...props }) => {
            const external = href?.startsWith('http') || href?.endsWith('.html');
            return (
              <a
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                {...props}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
