# Documentation Files

This directory contains all markdown documentation files for the WasteHero 2.0 Products & Pricing documentation site.

## Directory Structure

```
docs/
├── concepts/           # Conceptual and reference documentation
├── user-guides/        # Step-by-step how-to guides
├── gap-analysis/       # Gap analysis documents
└── sprint-planning/    # Sprint planning and release notes
```

## Markdown File Format

Each markdown file must include YAML frontmatter at the top:

```markdown
---
slug: unique-identifier
title: Document Title
category: concepts
order: 1
description: Brief description of the document
related:
  - other-doc-slug
  - another-doc-slug
tags:
  - tag1
  - tag2
---

# Your content here...
```

## Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `slug` | string | Yes | Unique identifier used in URLs |
| `title` | string | Yes | Document title shown in navigation |
| `category` | string | Yes | One of: `concepts`, `user-guides`, `gap-analysis`, `sprint-planning` |
| `order` | number | Yes | Sort order within category (lower numbers first) |
| `description` | string | Yes | Brief summary shown in search and cards |
| `related` | array | No | Array of related document slugs |
| `tags` | array | No | Array of searchable tags |

## Categories

### concepts
Conceptual documentation, architecture overviews, and reference material.
**Color**: Purple

### user-guides
Step-by-step how-to guides and tutorials.
**Color**: Blue

### gap-analysis
Gap analysis documents comparing current vs. desired state.
**Color**: Red

### sprint-planning
Sprint planning documents, release notes, and roadmap items.
**Color**: Green

## Creating Relationships

Use the `related` field to create connections between documents. These relationships will appear:
- In the document relationship graph on the homepage
- In the "Related Documentation" section at the bottom of each document

## Tips for Writing Documentation

1. **Use clear, descriptive titles**: Makes navigation easier
2. **Write good descriptions**: Helps with search and discoverability
3. **Link related docs**: Creates a knowledge web
4. **Use consistent formatting**: Follow markdown best practices
5. **Include code examples**: Use fenced code blocks with syntax highlighting
6. **Add diagrams**: ASCII art or mermaid diagrams work well

## Deploying

After adding or modifying markdown files:
1. Commit changes to git
2. Push to the `main` branch
3. GitHub Actions will automatically build and deploy to GitHub Pages

The site will be available at: `https://[your-username].github.io/docsite/`
