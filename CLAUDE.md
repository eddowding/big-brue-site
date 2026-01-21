# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Big Brue is an ideas festival website built with Astro 5 and Tailwind CSS 4. The event runs **13-14 June 2026** at Hauser & Wirth Somerset, Bruton. The site handles speaker showcasing, programme display, ticket sales, and practical visitor information.

**Deployment:** Netlify (https://big-brue.netlify.app/)
**Note:** The `/mockup` folder is a static HTML prototype - do NOT edit that, edit this Astro site.

## Commands

```bash
# Development
npm run dev          # Start dev server at localhost:4321

# Build
npm run build        # Build to ./dist/
npm run preview      # Preview production build locally
```

## Architecture

### Content Management
- **Decap CMS** (formerly Netlify CMS) at `/admin` for non-technical content editing
- Content collections in `src/content/` with Zod schemas defined in `src/content.config.ts`
- CMS config at `public/admin/config.yml` - keep in sync with content schemas

### Content Collections
| Collection | Purpose | Schema highlights |
|------------|---------|-------------------|
| `speakers` | Festival speakers with bios | `featured`, `order`, talk details |
| `programme` | Schedule events | `date`, `startTime`, `endTime`, `venue` |
| `tickets` | Ticket tiers | `price`, `earlybirdPrice`, `variant` |
| `faq` | FAQ items | `category`, `order` |

### Key Data Files
- `src/data/settings.json` - Site-wide config (dates, venue, earlybird status, countdown)

### Brand Colors (Tailwind 4 @theme)
Defined in `src/styles/global.css`:
- `sludge` (#2D5048) - Primary dark green
- `blush` (#F5D5D5) - Hero background pink
- `bright` (#00D9A5) - CTA accent green
- `stone` (#EDEAE5) - Page background
- `warm-black` (#2A2A28) - Body text

### Fonts
- DM Sans (sans-serif) - Body text
- Playfair Display (serif) - Decorative headers

### Pages Structure
Routes are file-based in `src/pages/`:
- `/speakers/[slug].astro` - Dynamic speaker detail pages
- `/speakers/index.astro` - Speaker listing
- Main pages: `index`, `about`, `programme`, `tickets`, `hub`, `info`, `faq`, `privacy`, `terms`

### Component Pattern
Astro components with TypeScript frontmatter:
```astro
---
import { getCollection } from 'astro:content';
const speakers = await getCollection('speakers');
---
<section>...</section>
```

## Integration Notes

- **Netlify Identity** - Auth for CMS (script in Layout.astro)
- **PostHog** - Analytics (configured in Layout.astro)
- Images served from `/public/images/speakers/`

## Reference Documents

Project specs in parent directory:
- `01-BRIEF.md` - Original requirements and business goals
- `02-WIREFRAMES.md` - Page structure and component specs
- `03-CMS-SPEC.md` - CMS field definitions
