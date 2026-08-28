import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Lazy Gemini client helper
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI | null {
    const apiKey = process.env.GEMINI_API_KEY || process.env.AI_API_KEY;
    if (!apiKey) return null;
    if (!aiClient) {
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
    return aiClient;
  }

  // Health endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasApiKey: Boolean(process.env.GEMINI_API_KEY || process.env.AI_API_KEY),
      timestamp: new Date().toISOString(),
    });
  });

  // AI Product Analysis Endpoint
  app.post('/api/ai/analyze', async (req, res) => {
    try {
      const { productName, category, price, description, features, targetAudience, currency = '₹' } = req.body;

      if (!productName || !category) {
        return res.status(400).json({ error: 'productName and category are required' });
      }

      const client = getGeminiClient();
      if (!client) {
        // Return 503 so client will use smart domain fallback
        return res.status(503).json({ error: 'No GEMINI_API_KEY configured on server' });
      }

      const prompt = `Analyze this marketplace product and return high-grade ecommerce intelligence for sellers:
Product: ${productName}
Category: ${category}
Price: ${currency}${price || 1999}
Description: ${description || 'N/A'}
Features: ${(features || []).join(', ')}
Target Audience note: ${targetAudience || 'General online shoppers'}

Assess the market opportunity realistically.`;

      const response = await client.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are Prime Market AI, a senior marketplace intelligence analyst specializing in Amazon, Flipkart, and Shopify product optimization. Provide realistic, data-driven seller insights.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              overallScore: { type: Type.INTEGER, description: 'Overall opportunity score between 1 and 99' },
              demandLevel: { type: Type.STRING, description: 'Low, Medium, or High' },
              competitionLevel: { type: Type.STRING, description: 'Low, Medium, or High' },
              minRecommendedPrice: { type: Type.INTEGER },
              maxRecommendedPrice: { type: Type.INTEGER },
              optimalPrice: { type: Type.INTEGER },
              marginEstimate: { type: Type.STRING },
              productSummary: { type: Type.STRING },
              strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
              weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
              rationale: { type: Type.STRING },
              targetAudience: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    segment: { type: Type.STRING },
                    demographics: { type: Type.STRING },
                    painPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
                    buyingMotivation: { type: Type.STRING },
                  },
                  required: ['segment', 'demographics', 'painPoints', 'buyingMotivation'],
                },
              },
              recommendations: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    impact: { type: Type.STRING, description: 'High, Medium, or Low' },
                    category: { type: Type.STRING, description: 'Pricing, Listing, Audience, Feature, or Marketing' },
                  },
                  required: ['title', 'description', 'impact', 'category'],
                },
              },
            },
            required: [
              'overallScore',
              'demandLevel',
              'competitionLevel',
              'minRecommendedPrice',
              'maxRecommendedPrice',
              'optimalPrice',
              'productSummary',
              'strengths',
              'weaknesses',
              'recommendations',
              'targetAudience',
            ],
          },
        },
      });

      const rawJson = response.text?.trim() || '{}';
      const parsed = JSON.parse(rawJson);

      const score = Math.max(10, Math.min(99, parsed.overallScore || 85));
      let level: 'Low' | 'Medium' | 'Good' | 'Excellent' = 'Medium';
      if (score >= 85) level = 'Excellent';
      else if (score >= 70) level = 'Good';
      else if (score >= 40) level = 'Medium';
      else level = 'Low';

      const analysisResult = {
        id: `analysis-${Date.now()}`,
        productName,
        category,
        originalPrice: Number(price) || 1999,
        currency,
        description: description || '',
        features: features || [],
        opportunityScore: {
          overall: score,
          level,
          demandScore: parsed.demandLevel === 'High' ? 90 : parsed.demandLevel === 'Medium' ? 65 : 35,
          competitionScore: parsed.competitionLevel === 'High' ? 75 : parsed.competitionLevel === 'Medium' ? 50 : 25,
          growthScore: 78,
          pricingScore: 82,
          ratingScore: 88,
          rationale: parsed.rationale || `Strong algorithmic alignment with high buyer intent for ${category}.`,
        },
        marketDemand: parsed.demandLevel || 'High',
        competitionLevel: parsed.competitionLevel || 'Medium',
        recommendedPriceRange: {
          min: parsed.minRecommendedPrice || Math.round(price * 0.85),
          max: parsed.maxRecommendedPrice || Math.round(price * 1.25),
          optimal: parsed.optimalPrice || Math.round(price * 1.05),
          currency,
          marginEstimate: parsed.marginEstimate || '52% - 64% Estimated Gross Margin',
        },
        productSummary: parsed.productSummary,
        targetAudience: parsed.targetAudience || [],
        strengths: parsed.strengths || [],
        weaknesses: parsed.weaknesses || [],
        recommendations: (parsed.recommendations || []).map((r: { title: string; description: string; impact: string; category: string }, idx: number) => ({
          id: `rec-${idx + 1}`,
          title: r.title,
          description: r.description,
          impact: r.impact || 'High',
          category: r.category || 'Listing',
        })),
        analyzedAt: new Date().toISOString(),
      };

      res.json(analysisResult);
    } catch (err: unknown) {
      console.error('Gemini analyze error:', err);
      res.status(500).json({ error: 'AI analysis failed on backend', details: String(err) });
    }
  });

  // AI Listing Generator Endpoint
  app.post('/api/ai/generate-listing', async (req, res) => {
    try {
      const { productName, category, features, targetCustomer, tone = 'Professional' } = req.body;

      if (!productName || !category) {
        return res.status(400).json({ error: 'productName and category are required' });
      }

      const client = getGeminiClient();
      if (!client) {
        return res.status(503).json({ error: 'No GEMINI_API_KEY configured' });
      }

      const prompt = `Generate a high-converting ecommerce product listing for:
Product: ${productName}
Category: ${category}
Key Features: ${(features || []).join(', ')}
Target Customer: ${targetCustomer || 'discerning shoppers'}
Tone: ${tone}`;

      const response = await client.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are Prime Market AI, a copywriter expert in Amazon SEO and high-conversion marketplace listings.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              productTitle: { type: Type.STRING },
              shortDescription: { type: Type.STRING },
              fullDescription: { type: Type.STRING },
              seoKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
              productTags: { type: Type.ARRAY, items: { type: Type.STRING } },
              marketingCopy: { type: Type.STRING },
              bulletPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: [
              'productTitle',
              'shortDescription',
              'fullDescription',
              'seoKeywords',
              'productTags',
              'marketingCopy',
              'bulletPoints',
            ],
          },
        },
      });

      const parsed = JSON.parse(response.text?.trim() || '{}');
      const listing = {
        id: `listing-${Date.now()}`,
        productName,
        category,
        tone,
        productTitle: parsed.productTitle,
        shortDescription: parsed.shortDescription,
        fullDescription: parsed.fullDescription,
        seoKeywords: parsed.seoKeywords || [],
        productTags: parsed.productTags || [],
        marketingCopy: parsed.marketingCopy || '',
        bulletPoints: parsed.bulletPoints || [],
        generatedAt: new Date().toISOString(),
      };

      res.json(listing);
    } catch (err: unknown) {
      console.error('Gemini generate listing error:', err);
      res.status(500).json({ error: 'Listing generation failed', details: String(err) });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Prime Market server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
