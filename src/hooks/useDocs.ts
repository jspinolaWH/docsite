import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from 'react';
import Fuse from 'fuse.js';
import type { DocEntry } from '../types';
import { CATEGORIES } from '../types';
import { loadDocs } from '../utils/loadDocs';

interface DocsContextValue {
  docs: DocEntry[];
  grouped: Record<string, DocEntry[]>;
  groupedBySubcategory: Record<string, Record<string, DocEntry[]>>;
  getBySlug: (slug: string) => DocEntry | undefined;
  search: (query: string) => DocEntry[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const DocsContext = createContext<DocsContextValue>(null!);

export function useDocsProvider() {
  const [searchQuery, setSearchQuery] = useState('');

  const docs = useMemo(() => loadDocs(), []);

  const grouped = useMemo(() => {
    const groups: Record<string, DocEntry[]> = {};
    for (const catId of Object.keys(CATEGORIES)) {
      groups[catId] = [];
    }
    for (const doc of docs) {
      if (!groups[doc.category]) groups[doc.category] = [];
      groups[doc.category].push(doc);
    }
    return groups;
  }, [docs]);

  const groupedBySubcategory = useMemo(() => {
    const groups: Record<string, Record<string, DocEntry[]>> = {};
    for (const catId of Object.keys(CATEGORIES)) {
      groups[catId] = {};
    }
    for (const doc of docs) {
      if (!groups[doc.category]) groups[doc.category] = {};
      if (doc.subcategory) {
        if (!groups[doc.category][doc.subcategory]) {
          groups[doc.category][doc.subcategory] = [];
        }
        groups[doc.category][doc.subcategory].push(doc);
      } else {
        // Docs without subcategory go in a special "__root__" group
        if (!groups[doc.category]['__root__']) {
          groups[doc.category]['__root__'] = [];
        }
        groups[doc.category]['__root__'].push(doc);
      }
    }
    return groups;
  }, [docs]);

  const slugMap = useMemo(() => {
    const map = new Map<string, DocEntry>();
    for (const doc of docs) {
      map.set(doc.slug, doc);
    }
    return map;
  }, [docs]);

  const getBySlug = useCallback(
    (slug: string) => slugMap.get(slug),
    [slugMap]
  );

  const fuse = useMemo(
    () =>
      new Fuse(docs, {
        keys: [
          { name: 'title', weight: 0.4 },
          { name: 'description', weight: 0.25 },
          { name: 'tags', weight: 0.2 },
          { name: 'content', weight: 0.15 },
        ],
        threshold: 0.4,
        includeScore: true,
        minMatchCharLength: 2,
      }),
    [docs]
  );

  const search = useCallback(
    (query: string) => {
      if (!query.trim()) return docs;
      return fuse.search(query).map((r) => r.item);
    },
    [docs, fuse]
  );

  return { docs, grouped, groupedBySubcategory, getBySlug, search, searchQuery, setSearchQuery };
}

export function useDocs() {
  return useContext(DocsContext);
}
