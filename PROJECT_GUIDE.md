# WasteHero 2.0 Documentation Site

A React-based documentation website for WasteHero 2.0 Products & Pricing releases, deployable to GitHub Pages.

## Features

- 📝 **Markdown-based**: Write documentation in simple markdown with YAML frontmatter
- 🔍 **Full-text search**: Fast search powered by Fuse.js
- 🎨 **Category organization**: Four distinct categories with color coding
- 🔗 **Document relationships**: Visual graph showing how docs relate
- 📱 **Responsive design**: Works on desktop and mobile
- 🚀 **Auto-deployment**: Push to main branch to auto-deploy via GitHub Actions
- ⚡ **Fast**: Built with Vite for lightning-fast development

## Project Structure

```
docsite/
├── docs/                      # Markdown documentation files
│   ├── concepts/             # Conceptual & reference docs
│   ├── user-guides/          # How-to guides
│   ├── gap-analysis/         # Gap analysis docs
│   └── sprint-planning/      # Sprint planning & releases
├── src/
│   ├── components/           # React components
│   │   ├── Layout.tsx       # Main layout wrapper
│   │   ├── Sidebar.tsx      # Navigation sidebar
│   │   ├── SearchBar.tsx    # Search component
│   │   ├── DocRenderer.tsx  # Markdown renderer
│   │   └── ...
│   ├── pages/               # Page components
│   │   ├── HomePage.tsx     # Homepage with categories
│   │   ├── DocPage.tsx      # Individual doc viewer
│   │   └── SearchResultsPage.tsx
│   ├── hooks/               # Custom React hooks
│   │   └── useDocs.ts       # Document management hook
│   ├── utils/               # Utility functions
│   │   └── loadDocs.ts      # Markdown loader & parser
│   ├── types.ts             # TypeScript definitions
│   └── main.tsx             # App entry point
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions deployment
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:5173/docsite/
```

### Building

```bash
# Build for production
npm run build

# Preview production build
npm preview
```

## Adding Documentation

### 1. Create a new markdown file

Create a file in the appropriate `docs/` subdirectory:

```bash
# Example: creating a new concept doc
touch docs/concepts/my-new-doc.md
```

### 2. Add frontmatter and content

```markdown
---
slug: my-new-doc
title: My New Documentation
category: concepts
order: 3
description: Brief description of what this doc covers
related:
  - pricing-overview
  - product-mapping
tags:
  - concepts
  - reference
---

# My New Documentation

Your markdown content here...
```

### 3. Test locally

The new document will appear automatically when you refresh the dev server.

### 4. Commit and push

```bash
git add docs/concepts/my-new-doc.md
git commit -m "Add my new documentation"
git push origin main
```

GitHub Actions will automatically build and deploy the updated site.

## Document Categories

| Category | ID | Description | Color |
|----------|----|----|-------|
| Concepts & Reference | `concepts` | Architecture, models, technical reference | Purple |
| User Guides | `user-guides` | Step-by-step how-to guides | Blue |
| Gap Analysis | `gap-analysis` | Current vs. desired state analysis | Red |
| Sprint Planning | `sprint-planning` | Sprint plans and release notes | Green |

## Deployment

### GitHub Pages Setup

1. **Initialize git repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create GitHub repository**:
   - Go to GitHub and create a new repository named `docsite`
   - Don't initialize with README (you already have one)

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/docsite.git
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: GitHub Actions
   - The workflow will run automatically on push

5. **Access your site**:
   - URL: `https://YOUR-USERNAME.github.io/docsite/`

### Configuration

The site is configured for GitHub Pages in `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/docsite/', // Match your repository name
  // ...
})
```

If your repository has a different name, update the `base` path.

## Technology Stack

- **Framework**: React 19
- **Build Tool**: Vite 7
- **Language**: TypeScript
- **Routing**: React Router 7
- **Markdown**: react-markdown with plugins
- **Search**: Fuse.js
- **Syntax Highlighting**: rehype-highlight
- **Deployment**: GitHub Actions + GitHub Pages

## Markdown Features

All GitHub Flavored Markdown (GFM) is supported:

- Tables
- Task lists
- Strikethrough
- Autolinks
- Code blocks with syntax highlighting
- And more...

### Code Blocks

````markdown
```typescript
const greeting: string = "Hello, World!";
console.log(greeting);
```
````

### Tables

```markdown
| Column 1 | Column 2 |
|----------|----------|
| Data 1   | Data 2   |
```

### Task Lists

```markdown
- [x] Completed task
- [ ] Pending task
```

## Customization

### Adding New Categories

Edit `src/types.ts`:

```typescript
export const CATEGORIES: Record<string, CategoryConfig> = {
  'my-category': {
    id: 'my-category',
    label: 'My Category',
    color: '#8b5cf6',
    bgColor: '#f5f3ff',
    borderColor: '#e9d5ff',
  },
  // ... existing categories
};
```

### Styling

The app uses CSS with custom properties for theming. Main styles are in component files using standard CSS.

### Search Configuration

Modify search weights in `src/hooks/useDocs.ts`:

```typescript
keys: [
  { name: 'title', weight: 0.4 },
  { name: 'description', weight: 0.25 },
  { name: 'tags', weight: 0.2 },
  { name: 'content', weight: 0.15 },
],
```

## Troubleshooting

### Documents not showing up
- Check frontmatter syntax (must be valid YAML)
- Ensure file is in `docs/` directory
- Verify the category exists in `CATEGORIES`

### Search not working
- Documents need content to be searchable
- Check browser console for errors

### Deployment fails
- Verify `base` path in `vite.config.ts` matches repository name
- Check GitHub Actions logs for build errors
- Ensure GitHub Pages is enabled in repository settings

## Contributing

When adding documentation:
1. Follow the frontmatter format exactly
2. Use descriptive titles and descriptions
3. Link related documents
4. Test locally before pushing
5. Write clear, concise content

## License

MIT
