# Dune Imperium Fansite Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a full-featured Dune Imperium fan-site from scratch on Nuxt with a repository-first data layer and Hybrid rendering.

**Architecture:** Nuxt 3 app with Nuxt UI and Nuxt Content. Pages consume composables, composables depend on repositories, repositories depend on provider contracts. Current provider reads local content; future provider can switch to Supabase/Prisma without breaking UI contracts.

**Tech Stack:** Nuxt 3, Nuxt UI, Nuxt Content, TypeScript, ESLint, Vitest, Vue Test Utils, Playwright.

---

### Task 1: Bootstrap Project and Tooling Baseline

**Files:**
- Create: `package.json` (via `nuxi init`)
- Create: `nuxt.config.ts`
- Create: `tsconfig.json` (generated)
- Create: `eslint.config.mjs`
- Modify: `README.md`

**Step 1: Initialize Nuxt project**

Run:
```bash
npx nuxi@latest init . --packageManager pnpm
```
Expected: Nuxt starter files created.

**Step 2: Install modules and tooling**

Run:
```bash
pnpm add @nuxt/ui @nuxt/content
pnpm add -D @nuxt/eslint vitest @vue/test-utils jsdom @playwright/test
```
Expected: install completes with no peer dependency errors.

**Step 3: Enable Nuxt modules**

Update `nuxt.config.ts`:
```ts
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxt/content', '@nuxt/eslint'],
  css: ['~/assets/css/main.css'],
  typescript: {
    strict: true
  },
  nitro: {
    experimental: {
      openAPI: false
    }
  }
})
```

**Step 4: Add baseline scripts**

Update `package.json` scripts:
```json
{
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "preview": "nuxt preview",
    "typecheck": "nuxt typecheck",
    "lint": "eslint .",
    "test:unit": "vitest run",
    "test:e2e": "playwright test"
  }
}
```

**Step 5: Verify baseline**

Run:
```bash
pnpm lint
pnpm typecheck
```
Expected: both commands pass.

**Step 6: Commit**

```bash
git add .
git commit -m "chore: bootstrap nuxt project with ui content ts eslint"
```

---

### Task 2: Establish Design System and App Shell

**Files:**
- Create: `assets/css/main.css`
- Create: `app.vue`
- Create: `components/app/AppHeader.vue`
- Create: `components/app/AppFooter.vue`
- Create: `layouts/default.vue`
- Test: `tests/component/app-shell.spec.ts`

**Step 1: Write the failing component test**

```ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppHeader from '~/components/app/AppHeader.vue'

describe('AppHeader', () => {
  it('renders primary navigation links', () => {
    const wrapper = mount(AppHeader)
    expect(wrapper.text()).toContain('Главная')
    expect(wrapper.text()).toContain('Карты')
    expect(wrapper.text()).toContain('Рейтинги')
  })
})
```

**Step 2: Run test to verify it fails**

Run:
```bash
pnpm test:unit -- tests/component/app-shell.spec.ts
```
Expected: FAIL (component file missing).

**Step 3: Implement shell + theme**

Use CSS variables and intentional visual style:
```css
:root {
  --sand-50: #f6f1e8;
  --sand-200: #d9c7a6;
  --sand-500: #9f7d45;
  --char-900: #0f1115;
  --char-700: #1d222b;
}
body {
  background: radial-gradient(1200px 700px at 20% -10%, #2a2f38 0%, var(--char-900) 55%);
  color: var(--sand-50);
}
```

**Step 4: Run test to verify it passes**

Run:
```bash
pnpm test:unit -- tests/component/app-shell.spec.ts
```
Expected: PASS.

**Step 5: Commit**

```bash
git add assets/css/main.css app.vue components/app layouts/default.vue tests/component/app-shell.spec.ts
git commit -m "feat: add dune-themed app shell and navigation"
```

---

### Task 3: Define Domain Types and Provider Contracts

**Files:**
- Create: `shared/types/domain.ts`
- Create: `shared/types/providers.ts`
- Create: `server/utils/providers/content-provider.ts`
- Create: `server/utils/providers/index.ts`
- Test: `tests/unit/provider-contract.spec.ts`

**Step 1: Write the failing test**

```ts
import { describe, it, expect } from 'vitest'
import { getDataProvider } from '~/server/utils/providers'

describe('provider contract', () => {
  it('returns provider with required methods', () => {
    const provider = getDataProvider()
    expect(typeof provider.getCards).toBe('function')
    expect(typeof provider.getLeaders).toBe('function')
    expect(typeof provider.getRatings).toBe('function')
  })
})
```

**Step 2: Run test to verify it fails**

Run:
```bash
pnpm test:unit -- tests/unit/provider-contract.spec.ts
```
Expected: FAIL (`getDataProvider` missing).

**Step 3: Implement interfaces**

```ts
export interface DataProvider {
  getCards(): Promise<Card[]>
  getCardBySlug(slug: string): Promise<Card | null>
  getLeaders(): Promise<Leader[]>
  getLeaderBySlug(slug: string): Promise<Leader | null>
  getHouses(): Promise<House[]>
  getHouseBySlug(slug: string): Promise<House | null>
  getFaq(): Promise<FaqEntry[]>
  getRatings(mode: 'imperium' | 'uprising'): Promise<RatingPayload>
}
```

**Step 4: Implement content provider factory**

```ts
export const getDataProvider = (): DataProvider => {
  return contentProvider
}
```

**Step 5: Run test to verify it passes**

Run:
```bash
pnpm test:unit -- tests/unit/provider-contract.spec.ts
```
Expected: PASS.

**Step 6: Commit**

```bash
git add shared/types server/utils/providers tests/unit/provider-contract.spec.ts
git commit -m "feat: add typed provider contract for repository-first architecture"
```

---

### Task 4: Add Content Collections and Sample Data Schema

**Files:**
- Create: `content.config.ts`
- Create: `content/news/welcome.md`
- Create: `content/articles/strategy-basics.md`
- Create: `content/cards/base-sample.json`
- Create: `content/leaders/chani.md`
- Create: `content/houses/dom-atrejdes.md`
- Create: `content/sets/index.md`
- Create: `content/faq/index.md`
- Create: `content/ratings/imperium.json`
- Create: `content/ratings/uprising.json`
- Test: `tests/unit/content-schema.spec.ts`

**Step 1: Write failing schema test**

```ts
import { describe, it, expect } from 'vitest'
import cards from '~/content/cards/base-sample.json'

describe('cards schema', () => {
  it('contains required keys', () => {
    expect(cards[0]).toHaveProperty('slug')
    expect(cards[0]).toHaveProperty('set')
    expect(cards[0]).toHaveProperty('cost')
  })
})
```

**Step 2: Run test to verify it fails**

Run:
```bash
pnpm test:unit -- tests/unit/content-schema.spec.ts
```
Expected: FAIL (missing files/data).

**Step 3: Add content config and sample documents**

Define collection validators in `content.config.ts` with `zod`:
```ts
import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    news: defineCollection({ type: 'page', source: 'news/*.md' }),
    articles: defineCollection({ type: 'page', source: 'articles/*.md' }),
    leaders: defineCollection({ type: 'page', source: 'leaders/*.md' }),
    houses: defineCollection({ type: 'page', source: 'houses/*.md' }),
    faq: defineCollection({ type: 'page', source: 'faq/*.md' })
  }
})
```

**Step 4: Run test to verify it passes**

Run:
```bash
pnpm test:unit -- tests/unit/content-schema.spec.ts
```
Expected: PASS.

**Step 5: Commit**

```bash
git add content content.config.ts tests/unit/content-schema.spec.ts
git commit -m "feat: add content collections and initial domain data skeleton"
```

---

### Task 5: Implement Repositories and Core Composables

**Files:**
- Create: `server/repositories/cards.repository.ts`
- Create: `server/repositories/leaders.repository.ts`
- Create: `server/repositories/houses.repository.ts`
- Create: `server/repositories/ratings.repository.ts`
- Create: `server/api/cards.get.ts`
- Create: `server/api/cards/[slug].get.ts`
- Create: `server/api/leaders.get.ts`
- Create: `server/api/leaders/[slug].get.ts`
- Create: `server/api/houses.get.ts`
- Create: `server/api/houses/[slug].get.ts`
- Create: `composables/useCards.ts`
- Create: `composables/useLeaders.ts`
- Create: `composables/useRatings.ts`
- Test: `tests/unit/cards-repository.spec.ts`

**Step 1: Write failing repository test**

```ts
import { describe, it, expect } from 'vitest'
import { getCardsRepository } from '~/server/repositories/cards.repository'

describe('cards repository', () => {
  it('returns array of cards', async () => {
    const repo = getCardsRepository()
    const cards = await repo.list()
    expect(Array.isArray(cards)).toBe(true)
  })
})
```

**Step 2: Run test to verify it fails**

Run:
```bash
pnpm test:unit -- tests/unit/cards-repository.spec.ts
```
Expected: FAIL (`getCardsRepository` missing).

**Step 3: Implement repository contract**

```ts
export const getCardsRepository = () => ({
  list: async () => provider.getCards(),
  bySlug: async (slug: string) => provider.getCardBySlug(slug)
})
```

**Step 4: Implement read API routes and composables using `useAsyncData`**

```ts
// server/api/cards.get.ts
export default defineEventHandler(async () => {
  const repo = getCardsRepository()
  return repo.list()
})

// composables/useCards.ts
export const useCards = (filters: Ref<CardsFilterState>) =>
  useAsyncData('cards:list', () => $fetch('/api/cards', { params: filters.value }))
```

**Step 5: Run test to verify it passes**

Run:
```bash
pnpm test:unit -- tests/unit/cards-repository.spec.ts
```
Expected: PASS.

**Step 6: Commit**

```bash
git add server/repositories server/api composables tests/unit/cards-repository.spec.ts
git commit -m "feat: add repositories and core data composables"
```

---

### Task 6: Build Home Page and News/Articles Index Pages

**Files:**
- Create: `pages/index.vue`
- Create: `pages/news/index.vue`
- Create: `pages/articles/index.vue`
- Create: `components/sections/HomeHero.vue`
- Create: `components/sections/PostGrid.vue`
- Test: `tests/component/home-page.spec.ts`

**Step 1: Write failing page test**

```ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HomePage from '~/pages/index.vue'

describe('home page', () => {
  it('renders hero and latest posts section', () => {
    const wrapper = mount(HomePage)
    expect(wrapper.text()).toContain('Dune Imperium')
    expect(wrapper.text()).toContain('Последние новости')
  })
})
```

**Step 2: Run test to verify it fails**

Run:
```bash
pnpm test:unit -- tests/component/home-page.spec.ts
```
Expected: FAIL.

**Step 3: Implement pages with repository-backed data**

Set SEO per page:
```ts
useSeoMeta({
  title: 'Dune Imperium Fan Site',
  description: 'Новости, карты, лидеры, рейтинги и гайды по Dune Imperium'
})
```

**Step 4: Run test to verify it passes**

Run:
```bash
pnpm test:unit -- tests/component/home-page.spec.ts
```
Expected: PASS.

**Step 5: Commit**

```bash
git add pages components/sections tests/component/home-page.spec.ts
git commit -m "feat: implement home news and articles listing pages"
```

---

### Task 7: Implement News and Article Detail Pages

**Files:**
- Create: `pages/news/[slug].vue`
- Create: `pages/articles/[slug].vue`
- Create: `components/content/RichContent.vue`
- Test: `tests/component/post-detail.spec.ts`

**Step 1: Write failing test**

```ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RichContent from '~/components/content/RichContent.vue'

describe('RichContent', () => {
  it('renders markdown body container', () => {
    const wrapper = mount(RichContent, { props: { body: '## Test' } })
    expect(wrapper.html()).toContain('Test')
  })
})
```

**Step 2: Run test to verify it fails**

Run:
```bash
pnpm test:unit -- tests/component/post-detail.spec.ts
```
Expected: FAIL.

**Step 3: Implement dynamic slug pages**

```ts
const route = useRoute()
const { data } = await useAsyncData(`news:${route.params.slug}`, () =>
  queryCollection('news').path(`/news/${route.params.slug}`).first()
)
if (!data.value) throw createError({ statusCode: 404, statusMessage: 'Not found' })
```

**Step 4: Run test to verify it passes**

Run:
```bash
pnpm test:unit -- tests/component/post-detail.spec.ts
```
Expected: PASS.

**Step 5: Commit**

```bash
git add pages/news pages/articles components/content tests/component/post-detail.spec.ts
git commit -m "feat: add news and articles detail pages with 404 handling"
```

---

### Task 8: Cards Catalog Filters and Sorting

**Files:**
- Create: `pages/cards/index.vue`
- Create: `components/cards/CardFilters.vue`
- Create: `components/cards/CardGrid.vue`
- Create: `utils/cards-filter.ts`
- Create: `utils/cards-sort.ts`
- Test: `tests/unit/cards-filter.spec.ts`

**Step 1: Write failing tests for filtering/sorting**

```ts
import { describe, it, expect } from 'vitest'
import { applyCardFilters } from '~/utils/cards-filter'
import { sortCards } from '~/utils/cards-sort'

describe('cards filters', () => {
  it('filters by set and faction', () => {
    const items = [
      { set: 'base', faction: ['Император'], cost: 3, title: 'A' },
      { set: 'uprising', faction: ['Фримены'], cost: 2, title: 'B' }
    ]
    const out = applyCardFilters(items as any, { set: 'base', faction: 'Император' } as any)
    expect(out).toHaveLength(1)
  })
})
```

**Step 2: Run test to verify it fails**

Run:
```bash
pnpm test:unit -- tests/unit/cards-filter.spec.ts
```
Expected: FAIL (filter utility missing).

**Step 3: Implement pure filter/sort utils and UI controls**

```ts
export const sortCards = (cards: Card[], mode: 'name' | 'cost') =>
  [...cards].sort((a, b) => mode === 'name'
    ? a.sortName.localeCompare(b.sortName, 'ru')
    : a.sortCost - b.sortCost)
```

**Step 4: Run test to verify it passes**

Run:
```bash
pnpm test:unit -- tests/unit/cards-filter.spec.ts
```
Expected: PASS.

**Step 5: Commit**

```bash
git add pages/cards components/cards utils tests/unit/cards-filter.spec.ts
git commit -m "feat: implement cards catalog filters sorting and reset flow"
```

---

### Task 9: Card, Leader, House Detail and Listing Pages

**Files:**
- Create: `pages/cards/[slug].vue`
- Create: `pages/leaders/index.vue`
- Create: `pages/leaders/[slug].vue`
- Create: `pages/houses/index.vue`
- Create: `pages/houses/[slug].vue`
- Create: `components/leaders/LeaderFilters.vue`
- Create: `utils/leaders-filter.ts`
- Test: `tests/unit/leaders-filter.spec.ts`

**Step 1: Write failing leader filter test**

```ts
import { describe, it, expect } from 'vitest'
import { filterLeaders } from '~/utils/leaders-filter'

describe('leaders filters', () => {
  it('filters by set and difficulty', () => {
    const leaders = [
      { set: 'base', difficulty: 'Легкий' },
      { set: 'uprising', difficulty: 'Сложный' }
    ]
    const out = filterLeaders(leaders as any, { set: 'base', difficulty: 'Легкий' } as any)
    expect(out).toHaveLength(1)
  })
})
```

**Step 2: Run test to verify it fails**

Run:
```bash
pnpm test:unit -- tests/unit/leaders-filter.spec.ts
```
Expected: FAIL.

**Step 3: Implement leader/house pages and utilities**

```ts
const { data: leader } = await useAsyncData(`leader:${slug}`, () => $fetch(`/api/leaders/${slug}`))
```

**Step 4: Run test to verify it passes**

Run:
```bash
pnpm test:unit -- tests/unit/leaders-filter.spec.ts
```
Expected: PASS.

**Step 5: Commit**

```bash
git add pages/leaders pages/houses pages/cards/[slug].vue components/leaders tests/unit/leaders-filter.spec.ts
git commit -m "feat: implement leaders and houses catalogs with detail pages"
```

---

### Task 10: Sets and FAQ Pages

**Files:**
- Create: `pages/sets.vue`
- Create: `pages/faq.vue`
- Create: `components/faq/FaqAccordion.vue`
- Test: `tests/component/faq-page.spec.ts`

**Step 1: Write failing FAQ test**

```ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FaqPage from '~/pages/faq.vue'

describe('faq page', () => {
  it('renders FAQ heading', () => {
    const wrapper = mount(FaqPage)
    expect(wrapper.text()).toContain('FAQ')
  })
})
```

**Step 2: Run test to verify it fails**

Run:
```bash
pnpm test:unit -- tests/component/faq-page.spec.ts
```
Expected: FAIL.

**Step 3: Implement sets showcase and FAQ accordion**

Use Nuxt UI:
```vue
<UAccordion :items="faqItems" />
```

**Step 4: Run test to verify it passes**

Run:
```bash
pnpm test:unit -- tests/component/faq-page.spec.ts
```
Expected: PASS.

**Step 5: Commit**

```bash
git add pages/sets.vue pages/faq.vue components/faq tests/component/faq-page.spec.ts
git commit -m "feat: add sets and faq pages"
```

---

### Task 11: Ratings Page with API Route

**Files:**
- Create: `pages/ratings.vue`
- Create: `server/api/ratings.get.ts`
- Create: `components/ratings/RatingsTabs.vue`
- Create: `components/ratings/RatingsTable.vue`
- Test: `tests/unit/ratings-api.spec.ts`

**Step 1: Write failing API test**

```ts
import { describe, it, expect } from 'vitest'
import handler from '~/server/api/ratings.get'

describe('/api/ratings', () => {
  it('returns imperium mode by default', async () => {
    const result = await handler({ context: { params: {} }, node: {} } as any)
    expect(result.mode).toBe('imperium')
  })
})
```

**Step 2: Run test to verify it fails**

Run:
```bash
pnpm test:unit -- tests/unit/ratings-api.spec.ts
```
Expected: FAIL.

**Step 3: Implement API and UI tabs**

```ts
export default defineEventHandler(async (event) => {
  const mode = getQuery(event).mode === 'uprising' ? 'uprising' : 'imperium'
  const repo = getRatingsRepository()
  return repo.getMode(mode)
})
```

**Step 4: Run test to verify it passes**

Run:
```bash
pnpm test:unit -- tests/unit/ratings-api.spec.ts
```
Expected: PASS.

**Step 5: Commit**

```bash
git add pages/ratings.vue server/api/ratings.get.ts components/ratings tests/unit/ratings-api.spec.ts
git commit -m "feat: add ratings page with mode tabs and server api"
```

---

### Task 12: SEO, Sitemap, Error States, and 404

**Files:**
- Modify: `nuxt.config.ts`
- Create: `app/error.vue`
- Create: `pages/[...slug].vue`
- Create: `server/routes/sitemap.xml.ts` (if needed)
- Test: `tests/e2e/smoke.spec.ts`

**Step 1: Write failing E2E smoke test**

```ts
import { test, expect } from '@playwright/test'

test('core routes load', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('link', { name: 'Карты' })).toBeVisible()
  await page.goto('/cards')
  await expect(page.getByText('Фильтры')).toBeVisible()
  await page.goto('/ratings')
  await expect(page.getByText('Рейтинг')).toBeVisible()
})
```

**Step 2: Run test to verify it fails**

Run:
```bash
pnpm test:e2e -- tests/e2e/smoke.spec.ts
```
Expected: FAIL before polish.

**Step 3: Implement SEO and fallback pages**

Add per-page canonical and OG metadata:
```ts
useSeoMeta({
  ogType: 'website',
  twitterCard: 'summary_large_image'
})
```

**Step 4: Run test to verify it passes**

Run:
```bash
pnpm test:e2e -- tests/e2e/smoke.spec.ts
```
Expected: PASS.

**Step 5: Commit**

```bash
git add nuxt.config.ts app/error.vue pages/[...slug].vue tests/e2e/smoke.spec.ts
git commit -m "feat: add seo sitemap and user-friendly error handling"
```

---

### Task 13: Final Verification Before Completion (@verification-before-completion)

**Files:**
- Modify (if needed): any failing files from checks

**Step 1: Run full verification suite**

Run:
```bash
pnpm lint
pnpm typecheck
pnpm test:unit
pnpm test:e2e
pnpm build
```
Expected: all commands pass.

**Step 2: Manual sanity run**

Run:
```bash
pnpm dev
```
Expected:
- Home renders with hero and navigation
- Cards filters work
- Leader filters work
- Ratings tabs switch modes
- FAQ accordion opens

**Step 3: Final commit**

```bash
git add .
git commit -m "chore: finalize dune imperium fansite v1"
```

---

## Notes for Execution

- Use `@test-driven-development` for all behavior changes (tests before implementation).
- Use `@systematic-debugging` if any test or route behaves unexpectedly.
- Keep commits small and aligned to task boundaries above.
- Do not bypass repository/provider contracts from pages/components.
