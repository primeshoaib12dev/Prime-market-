🚀 Prime Market

AI-Powered Marketplace Intelligence & Listing Platform

Prime Market is a modern AI-powered marketplace intelligence platform built for sellers, e-commerce founders, and digital businesses.

It helps users analyze products, discover market opportunities, generate optimized product listings, explore trends, and maintain a personal portfolio of market research — all from one dashboard.

«Built with TypeScript, React, Vite, Tailwind CSS, Node.js, Express & Google Gemini AI.»

---

🌐 Developer

Shoaib — "primeshoaib12dev"

Building modern web applications while learning and experimenting with TypeScript, React, AI, APIs, and full-stack development.

<p align="center"><a href="https://github.com/primeshoaib12dev">
<img src="https://img.shields.io/badge/GitHub-primeshoaib12dev-181717?style=for-the-badge&logo=github" />
</a><a href="https://www.instagram.com/shoaib_learn/">
<img src="https://img.shields.io/badge/Instagram-@shoaib__learn-E4405F?style=for-the-badge&logo=instagram&logoColor=white" />
</a></p>---

✨ Why Prime Market?

Finding a profitable product is often harder than building the store itself.

Prime Market brings multiple parts of the research process into one workflow:

Product
   ↓
Market Analysis
   ↓
Opportunity Score
   ↓
Competition & Demand
   ↓
AI Recommendations
   ↓
Listing Generation
   ↓
Save / Export / Compare

The goal is simple:

«Turn product data into actionable marketplace decisions.»

---

🎯 Core Features

📊 Marketplace Dashboard

A centralized dashboard for understanding marketplace activity.

Includes

- Total products analyzed
- AI listings generated
- High-opportunity products
- Average opportunity score
- Category growth
- Demand velocity
- Competition comparison
- Historical market trends
- Recent analysis activity

---

🧠 AI Product Analyzer

Analyze a product and receive an actionable marketplace report.

Opportunity Score

Products are evaluated using multiple signals including:

- Market demand
- Competition
- Search velocity
- Margin potential
- Category fit
- Market opportunity

The result is converted into an easy-to-understand 0–100 Opportunity Score.

Analysis includes

- 📈 Demand analysis
- 🏆 Competition analysis
- 💰 Pricing opportunity
- 📦 Product positioning
- 👥 Target customer personas
- 💡 Business recommendations
- ⚠️ Potential weaknesses
- 🚀 Growth opportunities
- 📋 SWOT-style analysis

---

✍️ AI Listing Generator

Generate marketplace-ready product copy with AI.

The generator can create:

- SEO-friendly titles
- Product descriptions
- Feature bullets
- Marketing hooks
- Keywords
- Search tags
- Social hashtags
- Complete listing content

Available writing styles

Style| Best For
Professional| Established brands
Premium| Luxury products
Persuasive| High-conversion listings
Friendly| Consumer products
Minimalist| Simple product pages

Generated content can be copied individually or in bulk.

---

📈 Market Trends

Explore emerging marketplace opportunities.

Categories

- Electronics
- Gaming
- Fitness
- Fashion
- Beauty
- Home

Discover

- Trending searches
- Category momentum
- Growing niches
- Breakout products
- Demand changes
- Competition opportunities

---

🔎 Product Search

Search and filter marketplace products using multiple parameters.

Filters

- Category
- Brand
- Price
- Rating
- Demand
- Competition

Sorting

- Opportunity Score
- Market Demand
- Low Competition
- Growth
- Price
- Rating

Products can also be sent directly to the analyzer.

---

💾 Saved Analysis

Keep important research available directly inside the browser.

Prime Market uses browser storage to provide a no-login workflow.

Users can:

- Save analyses
- Review previous research
- Export data
- Print reports
- Generate PDF-style reports
- Send saved products to the Listing Generator

---

🤖 AI Architecture

Prime Market supports Google Gemini for AI-powered analysis and listing generation.

React Frontend
      │
      ▼
Express API
      │
      ▼
Google Gemini
      │
      ▼
Structured AI Response
      │
      ▼
Prime Market UI

The Gemini API key is handled server-side rather than being placed directly into the browser application.

---

🛡️ Demo / Fallback Mode

Prime Market is designed to remain usable even without a Gemini API key.

When live AI credentials are unavailable, the application can use its local/demo intelligence layer so the interface and core workflow remain usable during development.

This makes the project easier to:

- Run locally
- Demonstrate
- Develop offline
- Test UI functionality

---

🧱 Tech Stack

Frontend

- TypeScript
- React
- Vite
- Tailwind CSS
- Recharts
- Lucide React
- Motion

Backend

- Node.js
- Express
- TypeScript
- Google GenAI SDK

Testing

- Vitest

Tooling

- npm
- ESBuild
- TypeScript

---

🏗️ Project Structure

Prime-market/
│
├── assets/
│
├── src/
│   ├── components/
│   │   ├── analyzer/
│   │   ├── dashboard/
│   │   ├── generator/
│   │   ├── landing/
│   │   ├── saved/
│   │   ├── search/
│   │   ├── trends/
│   │   └── ui/
│   │
│   ├── data/
│   ├── hooks/
│   └── lib/
│
├── App.tsx
├── server.ts
├── package.json
├── vite.config.ts
├── tsconfig.json
└── .env.example

---

⚙️ Getting Started

1. Clone

git clone https://github.com/primeshoaib12dev/Prime-market.git

cd Prime-market

2. Install dependencies

npm install

3. Configure environment

Create your local environment file:

cp .env.example .env

Then configure your Gemini API key if you want live AI features:

GEMINI_API_KEY=your_api_key_here

«⚠️ Never commit your real API key to GitHub.»

4. Start development server

npm run dev

5. Production build

npm run build

6. Run tests

npm test

7. Type check

npm run lint

---

🧪 Development & Testing

Prime Market includes automated tests using Vitest.

Run the complete test suite:

npm test

Run TypeScript validation:

npm run lint

Build the application:

npm run build

---

🔐 Security

Prime Market follows a server-side API architecture for AI credentials.

Important development practices

- Keep ".env" out of Git
- Never expose API keys in frontend code
- Never commit private credentials
- Use environment variables for secrets
- Review API permissions before production deployment

---

🗺️ Roadmap

Current

- [x] Marketplace dashboard
- [x] Product analyzer
- [x] AI listing generator
- [x] Market trends
- [x] Product search
- [x] Saved analyses
- [x] Export functionality
- [x] No-login workflow
- [x] Gemini integration
- [x] Demo/fallback intelligence

Planned

- [ ] User authentication
- [ ] Cloud-synced portfolios
- [ ] Product comparison
- [ ] Advanced competitor tracking
- [ ] Real marketplace API integrations
- [ ] Automated price monitoring
- [ ] More AI models
- [ ] Team workspaces
- [ ] Advanced analytics
- [ ] Mobile experience
- [ ] Production deployment

---

💡 What I Learned Building This

This project is also part of my journey into modern full-stack development.

Through Prime Market, I worked with concepts including:

- React component architecture
- TypeScript
- API integration
- AI application development
- Server-side API security
- Data visualization
- State management
- Browser persistence
- Responsive UI
- Automated testing
- Production-oriented project structure

---

🤝 Contributing

Contributions and suggestions are welcome.

# Fork the repository

# Create a feature branch
git checkout -b feature/your-feature

# Make your changes

# Test your changes
npm test

# Commit
git commit -m "feat: improve marketplace analyzer"

# Push
git push origin feature/your-feature

Then open a Pull Request.

---

⭐ Support

If you like Prime Market:

⭐ Star the repository
🍴 Fork the project
🐛 Report bugs
💡 Suggest features
🤝 Contribute

Every contribution helps.

---

👨‍💻 Connect With Me

GitHub

@primeshoaib12dev

https://github.com/primeshoaib12dev

Instagram

@shoaib_learn

https://www.instagram.com/shoaib_learn/

I share my coding journey, projects, experiments, and learning progress on Instagram.

---

📄 License

This project is licensed under the Apache 2.0 License.

---

<p align="center">Built with ❤️, TypeScript & AI

Prime Market — Turning marketplace data into better decisions.

⭐ If this project helped you, consider starring the repository.

</p>
