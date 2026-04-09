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
  designPreview?: string; // Optional path to an interactive HTML design preview
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
  'planning-strategy': {
    id: 'planning-strategy',
    label: 'Planning & Strategy',
    color: '#d97706',
    bgColor: '#fffbeb',
    borderColor: '#fde68a',
    darkColor: '#fcd34d',
    darkBgColor: '#3b1a00',
    darkBorderColor: '#b45309',
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
  'pm-signoff': {
    id: 'pm-signoff',
    label: 'PM Sign-off',
    color: '#db2777',
    bgColor: '#fdf2f8',
    borderColor: '#fbcfe8',
    darkColor: '#f9a8d4',
    darkBgColor: '#500724',
    darkBorderColor: '#9d174d',
  },
  'oliver-docs': {
    id: 'oliver-docs',
    label: 'Oliver Docs',
    color: '#0369a1',
    bgColor: '#f0f9ff',
    borderColor: '#bae6fd',
    darkColor: '#38bdf8',
    darkBgColor: '#082f49',
    darkBorderColor: '#0369a1',
  },
  requirements: {
    id: 'requirements',
    label: 'All Requirements',
    color: '#b45309',
    bgColor: '#fffbeb',
    borderColor: '#fcd34d',
    darkColor: '#fbbf24',
    darkBgColor: '#2d1a00',
    darkBorderColor: '#92400e',
  },
  releases: {
    id: 'releases',
    label: 'Releases',
    color: '#0f766e',
    bgColor: '#f0fdfa',
    borderColor: '#99f6e4',
    darkColor: '#2dd4bf',
    darkBgColor: '#042f2e',
    darkBorderColor: '#0f766e',
  },
};

// Static diagram links (not loaded from markdown files)
export const DIAGRAM_LINKS: DiagramLink[] = [
  { slug: 'entity-diagrams', title: 'Entity Diagrams' },
  { slug: 'flow-diagrams', title: 'Flow Diagrams' },
];

// Categories for the Invoicing section
export const INVOICING_CATEGORIES: Record<string, CategoryConfig> = {
  'inv-overview': {
    id: 'inv-overview',
    label: 'Overview & Concepts',
    color: '#7c3aed',
    bgColor: '#f5f3ff',
    borderColor: '#ddd6fe',
    darkColor: '#c4b5fd',
    darkBgColor: '#3b0764',
    darkBorderColor: '#6b21a8',
  },
  'inv-billing': {
    id: 'inv-billing',
    label: 'Billing Events & FINVOICE',
    color: '#0369a1',
    bgColor: '#f0f9ff',
    borderColor: '#bae6fd',
    darkColor: '#38bdf8',
    darkBgColor: '#082f49',
    darkBorderColor: '#0369a1',
  },
  'inv-configuration': {
    id: 'inv-configuration',
    label: 'Configuration & Cycles',
    color: '#d97706',
    bgColor: '#fffbeb',
    borderColor: '#fde68a',
    darkColor: '#fcd34d',
    darkBgColor: '#3b1a00',
    darkBorderColor: '#b45309',
  },
  'inv-advanced': {
    id: 'inv-advanced',
    label: 'Integration & Advanced',
    color: '#0f766e',
    bgColor: '#f0fdfa',
    borderColor: '#99f6e4',
    darkColor: '#2dd4bf',
    darkBgColor: '#042f2e',
    darkBorderColor: '#0f766e',
  },
  'inv-structure': {
    id: 'inv-structure',
    label: 'Structure Breakdown',
    color: '#be185d',
    bgColor: '#fdf2f8',
    borderColor: '#fbcfe8',
    darkColor: '#f9a8d4',
    darkBgColor: '#4a0520',
    darkBorderColor: '#9d174d',
  },
  'inv-mvp-mapping': {
    id: 'inv-mvp-mapping',
    label: 'MVP Mapping',
    color: '#16a34a',
    bgColor: '#f0fdf4',
    borderColor: '#bbf7d0',
    darkColor: '#86efac',
    darkBgColor: '#052e16',
    darkBorderColor: '#15803d',
  },
};

// Subcategories for sprint-planning
export const SPRINT_SUBCATEGORIES: Record<string, string> = {
  'sprint-1': 'Sprint 1',
  'sprint-2': 'Sprint 2',
  'sprint-3': 'Sprint 3',
  'sprint-4': 'Sprint 4',
  'sprint-5': 'Sprint 5',
  'sprint-6': 'Sprint 6',
};
