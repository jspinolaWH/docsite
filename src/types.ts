export interface DocEntry {
  slug: string;
  title: string;
  category: string;
  subcategory?: string; // Optional subcategory for nested organization
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

export interface DiagramLink {
  slug: string;
  title: string;
}

export const CATEGORIES: Record<string, CategoryConfig> = {
  diagrams: {
    id: 'diagrams',
    label: 'Diagrams',
    color: '#0891b2',
    bgColor: '#ecfeff',
    borderColor: '#a5f3fc',
    darkColor: '#67e8f9',
    darkBgColor: '#083344',
    darkBorderColor: '#0e7490',
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

// Static diagram links (not loaded from markdown files)
export const DIAGRAM_LINKS: DiagramLink[] = [
  { slug: 'entity-diagrams', title: 'Entity Diagrams' },
  { slug: 'flow-diagrams', title: 'Flow Diagrams' },
];

// Subcategories for sprint-planning
export const SPRINT_SUBCATEGORIES: Record<string, string> = {
  'sprint-1': 'Sprint 1',
  'sprint-2': 'Sprint 2',
  'sprint-3': 'Sprint 3',
  'sprint-4': 'Sprint 4',
  'sprint-5': 'Sprint 5',
  'sprint-6': 'Sprint 6',
};
