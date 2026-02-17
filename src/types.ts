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
}

export const CATEGORIES: Record<string, CategoryConfig> = {
  'gap-analysis': {
    id: 'gap-analysis',
    label: 'Gap Analysis',
    color: '#dc2626',
    bgColor: '#fef2f2',
    borderColor: '#fecaca',
  },
  concepts: {
    id: 'concepts',
    label: 'Concepts & Reference',
    color: '#7c3aed',
    bgColor: '#f5f3ff',
    borderColor: '#ddd6fe',
  },
  'user-guides': {
    id: 'user-guides',
    label: 'User Guides',
    color: '#2563eb',
    bgColor: '#eff6ff',
    borderColor: '#bfdbfe',
  },
  'sprint-planning': {
    id: 'sprint-planning',
    label: 'Sprint Planning',
    color: '#16a34a',
    bgColor: '#f0fdf4',
    borderColor: '#bbf7d0',
  },
};
