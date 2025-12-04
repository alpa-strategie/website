# Product Context - Alpa Stratégie Website

## Why This Project Exists

The Alpa Stratégie website is the digital home of **Baptiste Leroux**, consultant in digital strategy, IT governance, and performance delivery.

It must:
- Build a credible, differentiated personal brand,
- Present expertise, missions, and approach clearly,
- Support FR/EN audiences,
- **Demonstrate real-world AI capability** via an integrated assistant (**Aïa**) that can replace traditional “scroll & search” navigation for visitors who choose it.

## Problems It Solves

### Business Problems
1. Visibility & Positioning for interim/consulting missions.
2. Clear explanation of complex offerings (PMO, CTO/CPTO, transformation).
3. Demonstration of hands-on AI integration capability.
4. Serving both French and English markets effectively.

### User Problems
1. Need fast understanding of who Baptiste is and what he offers.
2. Need concrete proof of experience (missions, outcomes).
3. Prefer direct Q&A instead of reading long pages.
4. Need easy contact; minimal friction.

## How It Should Work

### User Experience Goals

#### First-Time Visitor
- Immediately understands Baptiste’s positioning.
- Sees **Aïa** as a premium, optional AI guide.
- Can either:
  - Use Aïa to ask questions,
  - Or close Aïa and browse classic pages.

#### Returning Visitor
- Aïa does **not** aggressively re-block; opens minimized as icon.
- Can jump straight into chat or navigate to Missions/Expertise.

### Core User Flows

1. **AI Onboarding (Aïa)**
   - Fullscreen modal on first interaction.
   - Intro text about Baptiste + Aïa.
   - Visitor selects:
     - Role (Recruiter, Client, Partner, etc.)
     - Industry
     - Interest (IT strategy, PMO, SaaS, etc.)
   - Context is stored and sent with all future Aïa prompts.
   - 3 suggested questions displayed to guide first interaction.
   - Chat area in lower third of screen.

2. **Classic Navigation**
   - If user closes Aïa, show normal site (Home, Expertise, Missions, Contact).
   - Persistent bottom-right icon reopens Aïa in fullscreen modal.
   - Tooltip briefly explains they can reopen Aïa anytime.

3. **Knowledge Base**
   - Aïa uses curated content from Notion databases (services, missions, FAQs).
   - All content maintainable through Notion → reduces code changes.

4. **Conversion**
   - Aïa can propose “next steps”: view Missions, download summary, contact Baptiste.
   - Classic CTAs remain visible (Contact, LinkedIn).

## Design Principles

1. **Clarity** – Never confusing or gimmicky.
2. **Professionalism** – Executive-level interface, no noisy bot vibes.
3. **Control** – User can always opt out of fullscreen Aïa.
4. **Performance** – Aïa loads efficiently; no heavy blocking scripts.
5. **Trust** – Transparent about what Aïa can/can’t do; no fake metrics.
6. **Maintainability** – Knowledge managed in Notion; i18n controlled via typed files.

## Success Metrics

- Visitors can get key answers via Aïa within 1–3 messages.
- Recruiters can confirm fit within a single Aïa interaction or one scroll.
- Aïa usage shows engagement without harming bounce/SEO.
- All Aïa answers grounded in Notion/website content.
