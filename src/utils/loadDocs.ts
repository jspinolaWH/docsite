import type { DocEntry } from '../types';

const rawDocs = import.meta.glob('../../docs/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

function parseFrontmatter(raw: string): {
  meta: Record<string, unknown>;
  content: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: raw };

  const yamlBlock = match[1];
  const content = match[2];
  const meta: Record<string, unknown> = {};

  let currentKey = '';
  let inArray = false;
  const arrayValues: string[] = [];

  for (const line of yamlBlock.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (inArray) {
      if (trimmed.startsWith('- ')) {
        arrayValues.push(trimmed.slice(2).replace(/^"|"$/g, ''));
        continue;
      } else {
        meta[currentKey] = [...arrayValues];
        arrayValues.length = 0;
        inArray = false;
      }
    }

    const kvMatch = trimmed.match(/^(\w+):\s*(.*)$/);
    if (kvMatch) {
      const [, key, val] = kvMatch;
      if (val === '' || val === undefined) {
        currentKey = key;
        inArray = true;
      } else if (val === '[]') {
        meta[key] = [];
      } else {
        meta[key] = val.replace(/^"|"$/g, '');
      }
    }
  }

  if (inArray) {
    meta[currentKey] = [...arrayValues];
  }

  return { meta, content };
}

export function loadDocs(): DocEntry[] {
  const docs: DocEntry[] = [];

  for (const [filePath, raw] of Object.entries(rawDocs)) {
    const { meta, content } = parseFrontmatter(raw);

    docs.push({
      slug: (meta.slug as string) || filePath.split('/').pop()?.replace('.md', '') || '',
      title: (meta.title as string) || 'Untitled',
      category: (meta.category as string) || 'uncategorized',
      subcategory: meta.subcategory as string | undefined,
      order: Number(meta.order) || 0,
      description: (meta.description as string) || '',
      related: (meta.related as string[]) || [],
      tags: (meta.tags as string[]) || [],
      content,
      filePath,
      designPreview: meta.designPreview as string | undefined,
    });
  }

  return docs.sort((a, b) => {
    if (a.category !== b.category) return a.category.localeCompare(b.category);
    return a.order - b.order;
  });
}
