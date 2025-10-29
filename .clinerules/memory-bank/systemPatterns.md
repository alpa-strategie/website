# System Patterns - Alpa Stratégie Website

## Architecture Overview

### Next.js App Router Structure
```
/home/baptiste/Documents/website/
├── app/
│   ├── [locale]/                 # Locale segment (fr | en)
│   │   ├── layout.tsx            # Locale-aware layout with I18nProvider
│   │   ├── page.tsx              # Home page
│   │   ├── about/page.tsx        # Profile / About
│   │   ├── expertise/page.tsx    # Expertise & Services
│   │   ├── missions/page.tsx     # Case studies / Missions
│   │   └── contact/page.tsx      # Contact & CTA
│   ├── api/                      # (optional) server routes
│   └── globals.css               # Global Tailwind styles
│
├── components/
│   ├── layout/                   # Shared layout elements
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── LanguageSwitcher.tsx
│   ├── content/                  # Page-specific content blocks
│   │   ├── Hero.tsx
│   │   ├── ValuePillars.tsx
│   │   ├── MissionCard.tsx
│   │   └── ContactCta.tsx
│   └── ui/                       # Small reusable UI primitives (Button, Card, etc.)
│
├── i18n/
│   ├── config.ts                 # Locales & defaultLocale
│   ├── I18nProvider.tsx          # Context provider
│   ├── useT.ts                   # Hook for translations
│   └── messages/                 # Translation files
│       ├── fr/common.ts
│       └── en/common.ts
│
├── data/                         # Typed static content (missions, expertise)
│   ├── profile.ts
│   ├── expertise.ts
│   ├── missions.ts
│   └── navigation.ts
│
├── lib/                          # Utilities & helpers
│   ├── fonts.ts
│   ├── seo.ts
│   ├── url.ts
│   └── analytics.ts (optional)
│
├── public/                       # Static assets
│   ├── logo-alpa-strategie.png
│   ├── og-default.jpg
│   └── favicon.ico
│
├── types/                        # Shared TS interfaces
│   ├── content.ts
│   └── i18n.ts
│
└── middleware.ts                 # Locale detection & redirect to /[locale]
```

## Key Design Patterns

### 1. Internationalization via React Context
- **Pattern**: Context-based translation system
- **Implementation**: I18nProvider provides dictionary and locale to all components
- **Access**: useT() returns the translation object (t.nav.contact, etc.)
- **Benefits**: Minimal dependencies, full control, easy extension
- **Persistence**: Locale stored in URL (/fr/..., /en/...)

### 2. Composable Layout Architecture
- **Pattern**: Nested layout composition (Next.js App Router)
- **Root Layout**: Defines base HTML, font, and global styles
- **Locale Layout**: Wraps each language segment with i18n context
- **Header/Footer**: Shared across all pages
- **Benefit**: Consistent design and minimal repetition

### 3. Typed Data over CMS
- **Pattern**: Static .ts data modules replacing CMS in early phase
- **Files**: /data/profile.ts, /data/missions.ts, /data/expertise.ts
- **Benefit**:
    - Keeps all content version-controlled
    - Allows easy future migration to Notion or headless CMS
    - Perfect for AI-powered auto-updates with Cline

### 4. Tailwind Utility-First Styling
- **Pattern**: Tailwind utility classes for all UI elements
- **Global Styles**: Defined in globals.css
- **Responsive Rules**: Standard Tailwind breakpoints (sm, md, lg, xl)
- **Benefit**: Speed, consistency, and no CSS drift

### 5. SEO as Code
- **Pattern**: Declarative SEO metadata (lib/seo.ts)
- **Usage**: Each page exports metadata for Open Graph & Twitter cards
- **Benefit**: Clean, reusable SEO definitions for LinkedIn sharing

### 6. Component Modularity
- **Pattern**: Atomic, reusable components (UI + content blocks)
- **Hierarchy Example**:
Hero → ValuePillars → ContactCta
        ↓
      MissionCard (reused in Missions page)
- **Benefit**: Predictable, maintainable, easy to enhance

## Component Relationships

```
App (layout.tsx + LanguageProvider)
├── Header (navigation + language switcher)
├── Layout (page wrapper)
│   └── Page Content (home, about, services, packages)
└── Footer (site footer)
```

## Critical Implementation Paths

### Language Switching Flow
1. Middleware detects browser language → redirects to /fr or /en.
2. Header provides manual language switcher.
3. Clicking switch updates locale segment in URL.
4. Next.js re-renders same page with new dictionary.

### Page Navigation Flow
1. Header links route via next/link (/[locale]/expertise).
2. Navigation handled client-side by App Router (no reload).
3. Layout persists → instant transitions.
4. Content updates per locale context.

### Content Update Flow
1. Content lives in /data/*.ts and /i18n/messages/*.
2. Updates are type-safe and tracked in Git.
3. Cline or developer can safely edit text/metadata via structured data.
4. Optional sync with Notion later via API.

## Technical Decisions

| Area                | Decision             | Reason                                            |
| ------------------- | -------------------- | ------------------------------------------------- |
| **Framework**       | Next.js App Router   | Server-first rendering, SEO, and performance      |
| **Language**        | TypeScript           | Type safety + IDE autocompletion                  |
| **i18n**            | Custom React context | Simpler, lighter than `next-intl` for 2 languages |
| **Styling**         | Tailwind CSS         | Speed, scalability, responsive utilities          |
| **Data Management** | Static TS files      | Fast iteration, type-safe, CMS-ready              |
| **Fonts**           | Google Inter         | Modern, readable, fast-loading                    |
| **Deployment**      | Vercel               | Instant preview + global edge CDN                 |

## Code Organization Principles

1. **Separation of Concerns**: Layout, content, UI, and data are isolated.
2. **Single Responsibility**: Each component handles one logical purpose.
3. **DRY Principle**: Reusable components and consistent translation keys.
4. **Type Safety**: Shared interfaces in /types/ for all data and translations.
5. **Predictable Naming**:
- Components → PascalCase
- Functions/hooks → camelCase
- Routes → lowercase
6. **Self-Documentation**: Clear directory names and inline JSDoc where useful.

## System Integrity Patterns
- **Resilience**: No dependency on external CMS or database.
- **Performance**: Static + server components, optimized images.
- **Scalability**: Can later extend to include blog, CMS, or analytics without refactor.
- **Testing**: Future-ready for Playwright/React Testing Library integration.

## Key Principles Summary
| Principle           | Description                                 |
| ------------------- | ------------------------------------------- |
| **Clarity**         | Each component’s role is explicit           |
| **Maintainability** | Easy to update text, layout, or structure   |
| **Performance**     | Lightweight, pre-rendered, responsive       |
| **Bilingual UX**    | Seamless FR/EN experience via App Router    |
| **Extensibility**   | Future CMS or blog support without redesign |
