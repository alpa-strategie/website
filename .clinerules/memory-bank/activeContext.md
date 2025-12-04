# Active Context - Alpa Stratégie Website

## Current Session Focus
**Date**: 2025-10-28

### Primary Tasks
1. **Memory Bank Restructuring**: Migrating from single MemoryBank.md to structured memory-bank/ directory with interconnected files
2. **MCP Server Documentation**: Recording perplexity-mcp installation and capabilities

## Recent Changes

### MCP Server Installation (2025-10-28)
- **Action**: Installed perplexity-mcp research assistant server
- **Location**: `/home/baptiste/Documents/Cline/MCP/perplexity-mcp`
- **Configuration**: Added to `cline_mcp_settings.json` with API key
- **Server Name**: `github.com/pashpashpash/perplexity-mcp`
- **Status**: Successfully tested with search query about Next.js 14 App Router

### Memory Bank Structure (2025-10-28)
- **Action**: Created proper memory-bank/ directory structure
- **Files Created**:
  - `projectbrief.md` - Foundation document
  - `productContext.md` - Why and how the project works
  - `systemPatterns.md` - Architecture and design patterns
  - `techContext.md` - Technology stack and tools
  - `activeContext.md` - This file (current work)
  - `progress.md` - Status and completion tracking

## Active Patterns & Preferences

### Code Style
- No unnecessary comments (per .clinerules)
- DRY and SOLID principles enforced
- TypeScript strict mode
- Tailwind utility-first styling

### Development Approach
- Mobile-first responsive design
- Server Components by default (Next.js App Router)
- Custom i18n solution for French/English
- Component modularity and reusability

### MCP Usage
- Use perplexity-mcp for research and documentation lookups
- Use sequential thinking for complex problem-solving
- Use context7-mcp for library documentation

## Next Steps

### Immediate Tasks
1. Create progress.md to track project status
2. Archive old MemoryBank.md file
3. Verify all memory bank files are properly interconnected

### Future Considerations
- Consider content updates for website pages
- Potential performance optimizations
- SEO improvements
- Additional features as requested

## Important Learnings

### Project Insights
- Simple, custom i18n solution works well for bilingual needs
- Next.js App Router provides clean, file-based routing
- Tailwind CSS enables rapid, consistent styling
- TypeScript catches errors early in development

### MCP Integration
- perplexity-mcp provides valuable research capabilities
- Server requires API key in environment variables
- Tools include: search, get_documentation, find_apis, check_deprecated_code
- Successful integration enhances development workflow

## Current Session Focus
**Date**: 2025-11-08

### Primary Tasks
1. Define and implement **Aïa**, the Alpa Intelligent Agent, as an AI-first UX layer.
2. Connect Aïa to Notion-based knowledge for maintainable answers.
3. Ensure fullscreen onboarding + persistent chat icon behavior.
4. Keep classic navigation fully usable as an alternative path.

## Recent Changes
- Memory Bank structured and synced with project realities.
- MCP servers (Sequential Thinking, Context7, Perplexity, Notion) configured for development support.

## Active Patterns & Preferences
- Mobile-first, minimalistic, executive UI.
- Aïa must feel premium, not gimmicky.
- All AI answers grounded in maintained content (Notion + site).

## Next Steps
1. Implement `/api/aia` route.
2. Build `AiaLauncher`, `AiaModal`, `AiaChat` components.
3. Wire context selector + suggested questions.
4. Add localStorage flag to control first-time fullscreen behavior.

## Blockers
- None identified.