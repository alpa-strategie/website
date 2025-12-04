# Project Brief - Alpa Stratégie Website

## Project Identity
- **Name**: Alpa Stratégie – Baptiste Leroux
- **Type**: Personal Consulting / Portfolio Website with AI-driven CX
- **Repository**: git@github.com:alpa-strategie/website.git
- **Primary Language**: TypeScript/React
- **Framework**: Next.js with App Router

## Core Purpose
Build a professional, bilingual (FR/EN) personal website for **Baptiste Leroux**, founder of **Alpa Stratégie**, to:
- Present his expertise in digital transformation, IT governance, and performance management,
- Showcase key missions, case studies, and achievements,
- Reinforce credibility for interim management / consulting roles (PMO / CTO / CPTO),
- Generate qualified contacts from recruiters, executives, and partners,
- **Demonstrate AI capabilities** through an integrated intelligent agent (**Aïa**) that can guide visitors through all relevant information.

## Key Requirements

### Functional Requirements
1. **Multi-language Support**: FR / EN with lightweight i18n.
2. **Core Pages**:
   - Home – positioning, Aïa entry, main value prop
   - Profile/About – biography, philosophy, credentials
   - Expertise – PMO, CTO/CPTO, Digital Factory, Transformation
   - Missions – selected case studies
   - Contact – email / LinkedIn / form CTA
   - Landing pages – targeted offers when needed
3. **AI Assistant (Aïa)**:
   - Fullscreen onboarding on first meaningful interaction
   - Collects visitor context (role, industry, interest)
   - Uses Notion-stored knowledge as primary source of truth
   - Provides guided suggested questions
   - Can be reopened via bottom-right chat icon
4. **Responsive Design**: Mobile-first, premium UX.
5. **Type Safety**: Full TypeScript.
6. **Modern Architecture**: Next.js App Router conventions.

### Technical Requirements
1. **Framework**: Next.js (latest) with App Router.
2. **Styling**: Tailwind CSS + Alpa Stratégie brand palette.
3. **i18n**: Custom translation system or light library; locale-based routing.
4. **AI Agent**:
   - Backend route for Aïa (e.g. `/api/aia`)
   - Integration with LLM + Notion knowledge base
   - Context injection from visitor selections
5. **Tooling**: ESLint + Prettier; Cline AI + MCP servers support.

### Non-Functional Requirements
1. **Performance**: fast load, streaming where relevant.
2. **SEO**: strong metadata, OG tags, schema (Person + Organization).
3. **Maintainability**: modular components, typed content, Notion-syncable.
4. **Accessibility**: keyboard navigation, ARIA for modal/chat.

## Project Scope

### In Scope
- Bilingual website (FR / EN)
- AI-driven onboarding via Aïa
- Fullscreen Aïa modal + persistent chat icon
- Notion-based knowledge content integration
- Responsive navigation and classic pages as fallback
- SEO-ready structure

### Out of Scope (Current Phase)
- Complex auth
- Full CMS beyond Notion KB integration
- E-commerce

## Success Criteria
1. Clear positioning for Digital Strategy & IT Governance.
2. Fully responsive and bilingual.
3. Aïa delivers accurate, contextual answers from Notion content.
4. Recruiters & clients can either:
   - Get answers via Aïa in < 3 interactions, **or**
   - Reach key pages in ≤ 2 clicks.
5. Site and Aïa experience clearly showcase Baptiste’s AI maturity.

## Project Constraints
- Must highlight **Baptiste Leroux** as core persona.
- Must follow Next.js App Router + TS best practices.
- Must leverage Notion as primary knowledge base where possible.
- Must visually align with Alpa Stratégie brand and Aïa identity.
