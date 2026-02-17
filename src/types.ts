export interface DocEntry {
  slug: string;
  title: string;
  category: string;
  order: number;
  description: string;
  related: string[];
  tags: string[];
  content: string;
  filePath: string;
}

export interface CategoryConfig {
  id: string;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  darkColor: string;
  darkBgColor: string;
  darkBorderColor: string;
}

export const CATEGORIES: Record<string, CategoryConfig> = {
  'gap-analysis': {
    id: 'gap-analysis',
    label: 'Gap Analysis',
    color: '#dc2626',
    bgColor: '#fef2f2',
    borderColor: '#fecaca',
    darkColor: '#fca5a5',
    darkBgColor: '#450a0a',
    darkBorderColor: '#7f1d1d',
  },
  concepts: {
    id: 'concepts',
    label: 'Concepts & Reference',
    color: '#7c3aed',
    bgColor: '#f5f3ff',
    borderColor: '#ddd6fe',
    darkColor: '#c4b5fd',
    darkBgColor: '#3b0764',
    darkBorderColor: '#6b21a8',
  },
  'user-guides': {
    id: 'user-guides',
    label: 'User Guides',
    color: '#2563eb',
    bgColor: '#eff6ff',
    borderColor: '#bfdbfe',
    darkColor: '#93c5fd',
    darkBgColor: '#1e3a8a',
    darkBorderColor: '#1e40af',
  },
  'sprint-planning': {
    id: 'sprint-planning',
    label: 'Sprint Planning',
    color: '#16a34a',
    bgColor: '#f0fdf4',
    borderColor: '#bbf7d0',
    darkColor: '#86efac',
    darkBgColor: '#052e16',
    darkBorderColor: '#15803d',
  },
};
