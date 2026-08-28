# Prime Market — AI Marketplace Intelligence SaaS

> **Prime Market** is a production-grade AI-powered marketplace intelligence and listing generation platform engineered for e-commerce entrepreneurs, Amazon/Flipkart/Shopify sellers, and digital brand builders.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb?logo=react)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Gemini API](https://img.shields.io/badge/Gemini%202.5%20Flash-AI%20Powered-8e75ff?logo=google)](https://ai.google.dev/)
[![Vitest](https://img.shields.io/badge/Tested%20with-Vitest-yellow?logo=vitest)](https://vitest.dev/)

---

## 🚀 Key Modules & Capabilities

### 1. 📊 Executive Marketplace Dashboard
- **Real-Time KPIs**: Total products analyzed, AI listings generated, high-opportunity niches identified, and portfolio average score.
- **Interactive Visualizations**:
  - Category growth & demand velocity bar charts.
  - Multi-category demand vs. competition comparison.
  - 6-month historical trajectory line charts using **Recharts**.
- **Recent Intelligence Feed**: Quick review of recently evaluated items with instant re-audit triggers.

### 2. ⚡ AI Product Analyzer
- **Opportunity Score (0–100)**: Multi-factor weighted algorithmic rating assessing market demand, competitor density, margin safety, search velocity, and category fit.
- **Smart Recommendations**: Granular, categorized suggestions (Pricing, Listing, Marketing, Audience) prioritized by business impact.
- **Market Dynamics Matrix**: SWOT analysis (Strengths & Weaknesses breakdown), Target Customer Personas, and Optimal Pricing bands with projected profit margins.
- **Save to Portfolio**: Save complete audits into `localStorage` with a single click.

### 3. ✨ AI Listing Generator
- **Conversion-Focused Copywriting**: Generates SEO-optimized marketplace titles, concise hook descriptions, feature bullet points, and complete markdown listing narratives.
- **5 Custom Tones**: *Professional*, *Premium*, *Persuasive*, *Friendly*, and *Minimalist*.
- **Keyword & Tag Extraction**: Ranked search keywords for algorithmic search placement and social hashtag packs.
- **One-Click Actions**: Individual or bulk copy-to-clipboard with visual confirmation toasts.

### 4. 📈 Market Trends Explorer
- **Category Momentum Index**: Track seasonal shifts and search interest across *Electronics, Gaming, Fitness, Fashion, Beauty, and Home*.
- **Trending Search Queries**: Uncover high-growth customer search queries before competitors.
- **Breakout Products Table**: Real-time tracker for rapidly accelerating niche products with direct links into the AI Analyzer.

### 5. 🔍 Product Database & Advanced Search
- **Multi-Parameter Filtering**: Filter by category, brand, price slider, customer rating, demand level, and competition level.
- **Flexible Sorting**: Sort by Opportunity Score, Market Demand, Low Competition, Growth %, Price, and Ratings.
- **Instant Audit Trigger**: Inspect any database item with the AI Analyzer in a single click.

### 6. 📁 Saved Analyses & Export Portfolio
- **Zero Friction / No Login Required**: Persistent portfolio backed by browser `localStorage`.
- **Export & Backup**: Export individual or collective analyses as structured JSON files.
- **Print & PDF Support**: Clean, print-friendly media styles for executive presentations.
- **Listing Bridge**: Transfer saved product specs straight into the AI Listing Generator.

---

## 🛠️ Architecture & Security

```
├── client/ (React 18 + Vite SPA)
│   ├── src/components/
│   │   ├── analyzer/       # Product analysis engine & results
│   │   ├── dashboard/      # Metrics, KPIs, Recharts charts
│   │   ├── generator/      # AI listing copywriter
│   │   ├── landing/        # Startup landing page
│   │   ├── saved/          # Saved portfolio & export hub
│   │   ├── search/         # Database search & filter matrix
│   │   ├── trends/         # Market trends & breakout products
│   │   └── ui/             # Reusable UI primitives & badges
│   ├── src/hooks/          # Custom state & storage hooks
│   └── src/lib/            # Scoring algorithms, utils & AI client
│
└── server/ (Node.js + Express)
    ├── server.ts           # Server-side Gemini API proxy (zero client key exposure)
    ├── /api/analyze        # Structured Gemini 2.5 Flash product audit
    └── /api/generate-listing # Structured Gemini 2.5 Flash copywriting
```

- **API Key Security**: The Gemini API key remains strictly on the Node.js/Express server (`process.env.GEMINI_API_KEY`), never exposed to client-side bundles.
- **Offline / Demo Fallback**: When an API key is not configured, the platform seamlessly activates an intelligent local algorithmic engine, guaranteeing the app works immediately out of the box.

---

## 🧪 Testing

The codebase includes a comprehensive suite of unit tests written in **Vitest**:

```bash
# Run tests
npm test

# Run tests in watch mode
npx vitest
```

---

## ⚙️ Development Setup

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and provide GEMINI_API_KEY (optional for live AI generation)

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 📄 License
Apache-2.0
