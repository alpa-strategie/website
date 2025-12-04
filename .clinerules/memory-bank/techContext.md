# Tech Context - Alpa Stratégie Website
The Alpa Stratégie Website is a bilingual (FR / EN) personal consulting platform for Baptiste Leroux, built with Next.js (App Router) and TypeScript.
It’s engineered for clarity, performance, and AI-assisted maintainability through Cline AI + Memory Bank and several integrated Model Context Protocol (MCP) servers.

## Technology Stack

### Core Technologies
| Layer           | Tech                     | Purpose                         |
| --------------- | ------------------------ | ------------------------------- |
| Framework       | **Next.js (App Router)** | Hybrid SSG + SSR, SEO friendly  |
| Language        | **TypeScript 5.x**       | Static typing & refactor safety |
| UI Library      | **React 18+**            | Server + Client Components      |
| Styling         | **Tailwind CSS 3.x**     | Utility-first responsive design |
| Package Manager | **npm**                  | Dependency & scripts management |
| Build System    | **Turbopack / Webpack**  | Fast dev + optimized bundles    |

## AI & Aïa Integration

### AI Runtime
- Implement `/api/aia` as Next.js Route Handler.
- Use an LLM provider (e.g. OpenAI) via `OPENAI_API_KEY` (or equivalent).
- Responses grounded with content retrieved from Notion.

### Notion Integration
- Notion used as knowledge base:
  - `NOTION_DB_ID_KNOWLEDGE`
  - `NOTION_DB_ID_MISSIONS`
  - `NOTION_DB_ID_EXPERTISE`
- All read via server-side code or MCP Notion server.
- Future: sync tasks automated by Cline.

### Development Tools
- **IDE**: Visual Studio Code (+ Cline AI extension)
- **Version Control**: Git + GitHub
- **Linting**: ESLint (Next.js preset + Prettier)
- **Type Checking**: TypeScript strict mode
- **Runtime**: Node LTS (v18 +)

### Deployment & Hosting
- **Platform**: Netlify
- **Deployment**: Continuous deployment from GitHub main branch
- **Build Command**: `npm run build`
- **Publish Directory**: `.next`
- **Domain**: alpa-strategie.com
- **Features**: Automatic HTTPS, CDN, instant rollbacks

## Development Setup

### Prerequisites
```bash
- Node.js (LTS version recommended)
- npm (comes with Node.js)
- Git
```

### Installation
```bash
# Clone repository
git clone git@github.com:alpa-strategie/website.git

# Install dependencies
cd website
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Available Scripts
| Script              | Description             |
| ------------------- | ----------------------- |
| `npm run dev`       | Start local dev server  |
| `npm run build`     | Create production build |
| `npm start`         | Run production server   |
| `npm run lint`      | Run ESLint              |
| `npm run typecheck` | Validate TypeScript     |


## Project Configuration

### Key Configuration Files
| File                 | Purpose                                            |
| -------------------- | -------------------------------------------------- |
| `package.json`       | Dependencies & scripts                             |
| `tsconfig.json`      | TS compiler + path aliases                         |
| `next.config.mjs`    | Next.js settings (React Strict Mode, typed routes) |
| `tailwind.config.ts` | Theme extensions & plugins                         |
| `eslint.config.mjs`  | Code quality rules                                 |
| `.env.local`         | Local environment variables                        |

## Dependencies

### Core Dependencies
```json
{
  "next": "latest",
  "react": "^18.x",
  "react-dom": "^18.x",
  "typescript": "^5.x"
}
```

### Development Dependencies
```json
{
  "@types/node": "latest",
  "@types/react": "latest",
  "@types/react-dom": "latest",
  "eslint": "latest",
  "tailwindcss": "^3.x",
  "postcss": "latest",
  "autoprefixer": "latest",
  "prettier": "latest"
}
```

## Technical Constraints

| Metric                 | Goal                                   |
| ---------------------- | -------------------------------------- |
| First Contentful Paint | < 1.5 s                                |
| Time to Interactive    | < 3 s                                  |
| Lighthouse Score       | ≥ 90                                   |
| Supported Browsers     | Chrome, Firefox, Safari, Edge (latest) |
| Rendering Mode         | Static Generation + SSR (i18n)         |

## File Structure Conventions

.tsx → React Components
.ts → Utilities & Types
.mjs → ESM Configs
Tailwind utilities inline in JSX
Global styles → app/globals.css
No CSS Modules

| Element      | Convention       | Example           |
| ------------ | ---------------- | ----------------- |
| Component    | PascalCase       | `Header.tsx`      |
| Hook / Util  | camelCase        | `useT.ts`         |
| Constant     | UPPER_SNAKE_CASE | `DEFAULT_LOCALE`  |
| Route Folder | lowercase        | `/about/page.tsx` |


## Development Workflow

### Local Development
1. Make changes in appropriate files
2. Development server hot-reloads automatically
3. Check TypeScript errors in IDE
4. Test in browser at localhost:3000
5. Run linter before committing

### Git Workflow
- Work on feature branches
- Commit with descriptive messages
- Push to GitHub repository
- Latest commit: `0592a78f3414ad5bbb16c4b792a988d4a8e0c951`

## Environment Variables

### Configuration
- Environment variables in `.env.local` (not tracked in git)
- Access via `process.env.VARIABLE_NAME`
- Currently no environment variables required for basic functionality

## MCP Servers Integration

### Connected Servers

#### github.com/pashpashpash/perplexity-mcp
- **Location**: `/home/baptiste/Documents/Cline/MCP/perplexity-mcp`
- **Purpose**: Research assistant with Perplexity API
- **Environment**: Requires `PERPLEXITY_API_KEY`
- **Tools**: search, get_documentation, find_apis, check_deprecated_code

#### github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking
- **Purpose**: Chain of Thought reasoning
- **Installation**: Via npx

#### github.com/upstash/context7-mcp
- **Purpose**: Library documentation retrieval
- **Installation**: Via npx

## Tool Usage Patterns

### For Development Tasks
1. Use TypeScript for type safety
2. Leverage Next.js App Router features
3. Apply Tailwind utilities for styling
4. Follow React best practices
5. Utilize MCP servers for research and documentation

### For Code Quality
1. ESLint checks before commits
2. TypeScript strict mode enabled
3. Component modularity and reusability
4. Consistent code formatting
