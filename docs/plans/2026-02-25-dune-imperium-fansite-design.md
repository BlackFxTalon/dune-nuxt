# Dune Imperium Fansite Design

**Date:** 2026-02-25  
**Project:** Fan-site "Dune: Imperium" (Nuxt + Nuxt UI + TS + ESLint)  
**Reference:** https://dune-imperium.ru/

---

## 1. Product Scope (Approved)

- Build a full-featured v1 close to the reference site structure:
  - Home
  - News
  - Articles
  - Cards (with filters + sorting)
  - Leaders
  - Ratings
  - Sets
  - Houses
  - FAQ
- Content-first launch with manual initial import.
- Ratings in v1 are updated manually in content files.
- Visual style is original "Dune-inspired", not a visual clone.
- Rendering mode: Hybrid (SSG-friendly pages + SSR/API for dynamic parts).

## 2. Architecture (Approved: Repository-first)

### High-level

- Frontend: Nuxt 3 + Nuxt UI + TypeScript.
- Content storage v1: Nuxt Content (`content/**/*.md|json`).
- Data access: repository/provider layer (single contract).
- API layer: Nitro routes for dynamic reads (`server/api/*`), starting with ratings.

### Why repository-first

- Pages/components never depend on storage details.
- In v1, repositories read Nuxt Content.
- In v2+, repositories switch to Supabase/Prisma provider with minimal UI changes.

## 3. Information Architecture / Routes

- `/`
- `/news`, `/news/[slug]`
- `/articles`, `/articles/[slug]`
- `/cards`, `/cards/[slug]`
- `/leaders`, `/leaders/[slug]`
- `/ratings`
- `/sets`
- `/houses`, `/houses/[slug]`
- `/faq`

## 4. Data Model

### Cards

- `id`
- `slug`
- `title`
- `image`
- `set`
- `fanSet`
- `faction[]`
- `agentSlots[]`
- `tags[]`
- `cost`
- `sortName`
- `sortCost`
- `relatedSlugs[]`

### Leaders

- `id`
- `slug`
- `title`
- `difficulty`
- `set`
- `image`
- `summary`
- `content`

### Houses

- `id`
- `slug`
- `title`
- `crestImage`
- `traits[]`
- `summary`
- `content`

### Ratings

- `mode` (`imperium` | `uprising`)
- `updatedAt`
- `players[]`
- `leaderStats[]`

### Content folders

- `content/news/*.md`
- `content/articles/*.md`
- `content/cards/*.json`
- `content/leaders/*.md`
- `content/houses/*.md`
- `content/sets/*.md`
- `content/faq/*.md`
- `content/ratings/*.json`

## 5. UI/UX

- Keep reference-level navigation and section structure.
- Custom visual system:
  - Sand/charcoal palette
  - Distinct typography
  - Subtle cinematic gradients and texture
  - Clean card-focused layouts
- Required page behavior:
  - Cards: multi-filter + sorting + reset
  - Leaders: difficulty/set filters
  - Ratings: tab switch (`Imperium` / `Uprising`) and tables
  - FAQ: grouped sections with readable anchors

## 6. Data Flow

- Page -> composable (`useCards`, `useLeaders`, `useRatings`)
- Composable -> repository
- Repository -> current provider (`contentProvider`)
- Future: `backendProvider` via same interface

## 7. Non-functional Requirements

- ESLint + strict TypeScript checks.
- Unit tests for filtering/sorting/mappers.
- Component tests for key widgets.
- E2E smoke flow for core pages.
- SEO metadata on all index/detail pages.
- Sitemap generation.
- Friendly empty/error states.

## 8. Migration Path to Supabase/Prisma

- Keep provider interface stable from day one.
- Move storage and query logic into backend provider implementation.
- Keep UI contracts unchanged.
- Use runtime feature flag to switch provider in non-breaking steps.

## 9. Release Phases

- M1: Project skeleton + theme + layout + navigation.
- M2: Content schemas + repositories + initial import.
- M3: Cards + leaders + houses + sets pages.
- M4: Ratings and dynamic API.
- M5: SEO, tests, performance, release hardening.

