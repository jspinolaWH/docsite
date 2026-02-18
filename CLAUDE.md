# CLAUDE.md - WasteHero 2.0 Documentation Site

This file provides guidance for Claude Code when working on this project.

---

## Project Overview

**WasteHero 2.0 Documentation Site** - A React-based documentation platform for documenting pricing and products information for the WasteHero 2.0 system. The site is deployed to GitHub Pages and auto-deploys on every push to main.

### Purpose
- Document complex pricing models, product types, and waste fractions
- Provide searchable technical documentation for the WasteHero 2.0 system
- Organize docs into categories (concepts, sprint-planning)
- Support development and stakeholder communication

### Tech Stack
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Routing**: React Router 7
- **Markdown**: react-markdown with GFM support
- **Search**: Fuse.js for full-text search
- **Highlighting**: rehype-highlight for code blocks
- **Deployment**: GitHub Actions → GitHub Pages

---

## Primary Focus: Documentation Management

This project's primary use case for Claude is **documentation content updates**. When working on this project:

### Do Proactively
- ✅ Add new markdown documentation files
- ✅ Edit and improve existing documentation content
- ✅ Fix typos, formatting issues, or broken links
- ✅ Update frontmatter (metadata) in docs
- ✅ Reorganize doc structure if it improves clarity
- ✅ Ensure all docs have proper YAML frontmatter
- ✅ Create commits directly to main branch
- ✅ Work independently on documentation tasks

### Ask First
- ⚠️ Modifying `.github/workflows/` files (GitHub Actions)
- ⚠️ Major structural changes to the codebase
- ⚠️ Changes that might break the build or deployment
- ⚠️ Adding new npm dependencies

---

## Documentation Standards

### File Location
All documentation markdown files live in:
```
docs/
├── concepts/          # Technical concepts and reference material
└── sprint-planning/   # Sprint plans and release notes
```

### Required Frontmatter Format
Every markdown file **must** include YAML frontmatter:

```yaml
---
slug: unique-kebab-case-id
title: Human Readable Title
category: concepts
order: 1
description: A brief one-line description of what this doc covers
related:
  - other-doc-slug
  - another-doc-slug
tags:
  - tag1
  - tag2
---
```

**Field Descriptions:**
- `slug`: Unique identifier, kebab-case, used in URLs
- `title`: Display title, shown in navigation and page header
- `category`: Must be `concepts` or `sprint-planning`
- `order`: Sort order within category (lower numbers appear first)
- `description`: Brief summary, shown in search results and cards
- `related`: Array of slugs of related documents
- `tags`: Array of searchable tags

### Content Style
- **Tone**: Technical and professional (match existing docs like `pricing-model-overview.md`)
- **Clarity**: Write clearly and concisely
- **Structure**: Use headers (`##`, `###`) to organize content
- **Examples**: Include code blocks, tables, and examples where helpful
- **Links**: Use relative links to other docs via slug: `/doc/other-slug`

### Markdown Features
Use GitHub Flavored Markdown (GFM):
- Tables
- Code blocks with syntax highlighting
- Task lists
- Strikethrough
- Autolinks

---

## Git Workflow

### Commit Strategy
**Commit directly to main branch** for documentation changes. The site auto-deploys via GitHub Actions.

#### When Creating Commits
1. Make your changes to documentation files
2. Create a descriptive commit message focused on "why" not "what"
3. Include Co-Authored-By line:
   ```
   Add pricing model documentation

   Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
   ```
4. Let GitHub Actions handle deployment automatically

#### Commit Message Style
- Use imperative mood: "Add documentation" not "Added documentation"
- Be concise but descriptive
- Focus on the purpose, not the mechanics
- Examples:
  - "Add waste fractions documentation"
  - "Fix broken links in pricing overview"
  - "Update sprint 3 release notes"

### Do NOT
- ❌ Push to remote without user explicit permission
- ❌ Use `--force` or destructive git commands
- ❌ Amend commits unless explicitly requested
- ❌ Skip hooks with `--no-verify`

---

## Development & Testing

### Local Development
```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# Opens at http://localhost:5173/docsite/

# Build for production
npm run build

# Preview build
npm preview
```

### When to Test
- ✅ After creating new documentation files
- ✅ After complex changes (new categories, restructuring)
- ✅ When adding new features or components
- ⏭️ Simple text edits can skip local testing

### Testing Checklist
When validating changes:
1. Run `npm run dev`
2. Check that new docs appear in sidebar
3. Verify markdown renders correctly
4. Test search functionality includes new content
5. Confirm links work
6. Check table of contents generates properly

---

## Code Guidelines

### When Modifying Code
While the primary focus is documentation, if code changes are needed:

**Follow Existing Patterns**
- Use functional React components
- Keep inline CSS in component files
- Use TypeScript with existing type definitions
- Follow current file structure and naming

**Don't Over-Engineer**
- Only make changes directly requested
- Don't refactor code unnecessarily
- Don't add features beyond the requirement
- Keep solutions simple and focused

---

## Project Structure Reference

```
docsite/
├── .github/
│   └── workflows/
│       └── deploy.yml          # 🔒 GitHub Actions - ask before modifying
├── docs/                       # 📝 Primary work area
│   ├── concepts/              # Technical reference docs
│   └── sprint-planning/       # Sprint and release docs
├── src/
│   ├── components/            # React components
│   │   ├── Layout.tsx
│   │   ├── Sidebar.tsx
│   │   ├── SearchBar.tsx
│   │   ├── DocRenderer.tsx
│   │   └── ...
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── DocPage.tsx
│   │   └── SearchResultsPage.tsx
│   ├── hooks/
│   │   └── useDocs.ts
│   ├── utils/
│   │   └── loadDocs.ts        # Markdown loader
│   ├── types.ts               # Type definitions & categories
│   └── main.tsx
├── package.json               # Dependencies
├── vite.config.ts             # ⚠️ Base path: /docsite/
├── README.md                  # Standard Vite template readme
├── PROJECT_GUIDE.md           # Detailed project documentation
├── CURRENT_STATUS.md          # Project status and setup guide
└── CLAUDE.md                  # This file
```

---

## Categories Configuration

Categories are defined in `src/types.ts`:

### Current Categories
1. **concepts** - Purple
   - Technical concepts and reference material
   - Architecture, models, pricing structures

2. **sprint-planning** - Green
   - Sprint plans and release notes
   - Timeline and delivery tracking

### Adding New Categories
If you need to add a category:
1. Edit `src/types.ts` in the `CATEGORIES` object
2. Add color scheme (light and dark mode colors)
3. Create corresponding folder in `docs/`
4. Test that the category appears in navigation

---

## Common Tasks & Examples

### Adding a New Document

```bash
# 1. Create file in appropriate category
touch docs/concepts/new-feature-doc.md

# 2. Add frontmatter and content
cat > docs/concepts/new-feature-doc.md << 'EOF'
---
slug: new-feature-doc
title: New Feature Documentation
category: concepts
order: 4
description: Overview of the new feature and how it works
related:
  - pricing-model-overview
tags:
  - features
  - concepts
---

# New Feature Documentation

Content goes here...
EOF

# 3. Test locally (for complex changes)
npm run dev

# 4. Commit
git add docs/concepts/new-feature-doc.md
git commit -m "Add new feature documentation

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

### Editing Existing Documentation

```bash
# 1. Read the file first
# 2. Make changes preserving frontmatter
# 3. Test if complex changes
# 4. Commit with descriptive message
git add docs/concepts/existing-doc.md
git commit -m "Update pricing model examples

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

### Fixing Broken Links

```bash
# 1. Identify broken links
# 2. Fix all occurrences
# 3. Commit
git add .
git commit -m "Fix broken links in documentation

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Search Functionality

Documents are indexed by Fuse.js based on:
- Title (weight: 0.4)
- Description (weight: 0.25)
- Tags (weight: 0.2)
- Content (weight: 0.15)

**Optimization Tips:**
- Write descriptive titles and descriptions
- Use relevant tags
- Include key terms in the first few paragraphs

---

## Deployment

### How It Works
1. Push to `main` branch
2. GitHub Actions workflow triggers (`.github/workflows/deploy.yml`)
3. Builds the site with Vite
4. Deploys to GitHub Pages
5. Site updates at: `https://[username].github.io/docsite/`

### Build Configuration
- **Base path**: `/docsite/` (set in `vite.config.ts`)
- **Asset handling**: Markdown files included as assets
- **Output**: `dist/` folder (not committed)

### If Deployment Fails
1. Check GitHub Actions logs in the repository
2. Verify build works locally: `npm run build`
3. Check for TypeScript errors: `npm run lint`
4. Ensure all frontmatter is valid YAML

---

## Troubleshooting

### Document Not Appearing
- ✅ Check frontmatter syntax (valid YAML)
- ✅ Ensure category exists in `CATEGORIES`
- ✅ Verify file is in `docs/` subdirectory
- ✅ Check slug is unique
- ✅ Refresh dev server

### Search Not Finding Document
- ✅ Ensure document has content beyond frontmatter
- ✅ Check that tags and description are populated
- ✅ Verify document loads on the site

### Styling Issues
- ✅ Check markdown syntax
- ✅ Verify code blocks have language specified
- ✅ Test in both light and dark mode

---

## Autonomy & Decision Making

### Autonomous Actions (No Need to Ask)
- Adding/editing markdown documentation
- Fixing typos and formatting
- Updating frontmatter
- Creating commits for documentation changes
- Organizing and restructuring docs
- Adding examples and clarifications

### Confirm First
- Modifying GitHub Actions workflows
- Changing build configuration
- Adding new npm packages
- Significant code refactoring
- Creating new categories
- Deleting existing documentation

### Working Style
**Be Proactive**: Handle full documentation tasks independently. When given a task like "document the new pricing feature":
1. ✅ Read related existing docs
2. ✅ Create new markdown file with proper frontmatter
3. ✅ Write clear, technical content
4. ✅ Add to appropriate category
5. ✅ Test if complex
6. ✅ Commit with descriptive message
7. ✅ Report completion to user

**Don't**: Ask for approval at each step. Work independently and show results.

---

## Working Directory

Default working directory:
```
/mnt/c/Users/drasm/Desktop/price&productsMapping/docsite
```

Note: Directory name contains `&` character. Always quote paths in bash commands:
```bash
cd "/mnt/c/Users/drasm/Desktop/price&productsMapping/docsite"
```

---

## Summary

This is a **documentation-focused project** where Claude should:
- ✅ Proactively manage markdown documentation
- ✅ Commit directly to main for doc updates
- ✅ Follow existing technical writing style
- ✅ Maintain frontmatter standards
- ✅ Work independently and report results
- ⚠️ Be careful with GitHub Actions and build config
- 🚀 Trust judgment but ask when uncertain

**Goal**: Make documentation creation and maintenance effortless while ensuring quality and consistency.
