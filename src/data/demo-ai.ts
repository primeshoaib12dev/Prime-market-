import { AIListing, ListingTone, ProductAnalysis, ProductCategory } from '../types';
import { calculateOpportunityScore } from '../lib/scoring';

export interface AnalyzerInput {
  productName: string;
  category: ProductCategory;
  price: number;
  currency?: string;
  description: string;
  targetAudience?: string;
  features: string[];
}

export interface GeneratorInput {
  productName: string;
  category: ProductCategory;
  features: string[];
  targetCustomer: string;
  tone: ListingTone;
}

export const PRESET_ANALYSIS_EXAMPLES: { label: string; data: AnalyzerInput }[] = [
  {
    label: '🎧 ANC Wireless Headphones',
    data: {
      productName: 'AcousticPulse Pro ANC Headphones',
      category: 'Electronics',
      price: 2499,
      currency: '₹',
      description: 'Over-ear wireless headphones with active noise cancellation, 45-hour battery, custom 40mm graphene drivers, and dual-microphone clear voice capture.',
      targetAudience: 'Daily commuters, remote software engineers, students needing deep focus, and audiophiles on a budget.',
      features: ['40dB Hybrid Active Noise Cancellation', '45-hour battery life with fast charge', 'Bluetooth 5.3 multipoint pairing', 'Ultra-breathable memory foam cushions'],
    },
  },
  {
    label: '⌨️ 75% Mechanical Keyboard',
    data: {
      productName: 'VortexStrike 75% Rapid Trigger Keyboard',
      category: 'Gaming',
      price: 3499,
      currency: '₹',
      description: 'Gasket mounted compact mechanical gaming keyboard with hot-swappable magnetic switches, 8000Hz polling rate, and per-key customizable RGB.',
      targetAudience: 'Competitive FPS players, mechanical keyboard enthusiasts, workspace minimalists.',
      features: ['Hall Effect magnetic switches with 0.1mm actuation', 'Hot-swappable PCB', 'PBT double-shot keycaps', 'Anodized aluminum CNC top plate'],
    },
  },
  {
    label: '🏋️ Quick-Dial Dumbbell Set',
    data: {
      productName: 'FlexCore Rapid Dial Adjustable Dumbbell 24kg',
      category: 'Fitness',
      price: 6999,
      currency: '₹',
      description: 'Space saving home workout dumbbell that switches seamlessly from 2.5kg to 24kg with a single turn of the handle dial.',
      targetAudience: 'Home gym builders, busy professionals working out in apartments, strength trainers.',
      features: ['15 weight increments in one unit', 'High-tensile silicon steel plates', 'Drop-resistant mechanical lock', 'Compact anti-scuff storage dock'],
    },
  },
  {
    label: '🧴 Botanical Niacinamide Serum',
    data: {
      productName: 'AuraGlow 10% Pure Niacinamide + Zinc Serum',
      category: 'Beauty',
      price: 799,
      currency: '₹',
      description: 'Lightweight soothing water-gel facial serum formulated to minimize enlarged pores, reduce blemishes, and strengthen damaged moisture barriers.',
      targetAudience: 'Skincare enthusiasts, people struggling with oily or acne-prone skin, urbanites exposed to pollution.',
      features: ['10% pharmaceutical grade Niacinamide', '1% Zinc PCA sebum control', 'Centella Asiatica soothing extract', 'Fragrance-free & non-comedogenic'],
    },
  },
];

export const PRESET_LISTING_EXAMPLES: { label: string; data: GeneratorInput }[] = [
  {
    label: '⚡ Smart Electric Kettle',
    data: {
      productName: 'ApexFlex Smart Kettle with Precise Temp Control',
      category: 'Home & Kitchen',
      features: ['1.7L capacity', '5 precise temperature presets', 'Strix thermostat', '1200W fast boil', 'Keep-warm for 2 hours'],
      targetCustomer: 'Specialty coffee enthusiasts, tea connoisseurs, modern kitchen owners',
      tone: 'Premium',
    },
  },
  {
    label: '🎮 Wireless Gaming Mouse',
    data: {
      productName: 'HyperGlide Ultralight 49g Gaming Mouse',
      category: 'Gaming',
      features: ['49g ultralight chassis', 'PAW3395 26,000 DPI sensor', '8000Hz polling rate', 'Optical micro-switches', '100H battery life'],
      targetCustomer: 'Competitive esports players, high-sens FPS gamers',
      tone: 'Persuasive',
    },
  },
  {
    label: '🧘 Eco Yoga Mat',
    data: {
      productName: 'ZenAlign Natural Tree Rubber Yoga Mat 6mm',
      category: 'Fitness',
      features: ['100% biodegradable natural tree rubber', 'Laser-etched body alignment lines', 'Non-slip wet grip texture', '6mm high-density joint cushioning'],
      targetCustomer: 'Yoga practitioners, Pilates trainers, eco-conscious fitness enthusiasts',
      tone: 'Friendly',
    },
  },
];

export function generateRealisticAnalysis(input: AnalyzerInput): ProductAnalysis {
  const price = Number(input.price) || 1999;
  const currency = input.currency || '₹';
  const category = input.category || 'Electronics';
  const name = input.productName.trim() || 'New Marketplace Product';

  // Dynamic calculations based on category and pricing
  let demandVal = 85;
  let compVal = 55;
  let growthVal = 38;
  let demandLevel: 'High' | 'Medium' | 'Low' = 'High';
  let competitionLevel: 'High' | 'Medium' | 'Low' = 'Medium';

  if (category === 'Gaming' || category === 'Fitness') {
    demandVal = 92;
    compVal = 48;
    growthVal = 52;
    demandLevel = 'High';
    competitionLevel = 'Medium';
  } else if (category === 'Beauty' || category === 'Fashion') {
    demandVal = 90;
    compVal = 74;
    growthVal = 32;
    demandLevel = 'High';
    competitionLevel = 'High';
  } else if (category === 'Accessories' || category === 'Home & Kitchen') {
    demandVal = 82;
    compVal = 44;
    growthVal = 40;
    demandLevel = 'Medium';
    competitionLevel = 'Low';
  }

  const scoreBreakdown = calculateOpportunityScore({
    demand: demandVal,
    competition: compVal,
    growth: growthVal,
    pricingAlignment: 82,
    rating: 4.6,
  });

  const minRecPrice = Math.round((price * 0.88) / 50) * 50 - 1; // e.g. 1999
  const maxRecPrice = Math.round((price * 1.22) / 50) * 50 - 1; // e.g. 2499
  const optimalPrice = Math.round(((minRecPrice + maxRecPrice) / 2) / 10) * 10 - 1;

  const targetAudienceSegments = [
    {
      segment: 'Core Early Adopters',
      demographics: 'Ages 22-38 • Urban & Semi-Urban Professionals • Tech & Lifestyle Focused',
      painPoints: [
        'Frustrated by cheap alternatives with poor durability',
        'Willing to pay a 15-20% premium for verified build quality',
        'Values minimalist design and hassle-free warranties',
      ],
      buyingMotivation: 'Seeking a dependable daily driver with instant brand credibility and positive review consensus.',
    },
    {
      segment: 'Value-Conscious Upgraders',
      demographics: 'Ages 18-32 • Students, Freelancers, Budget-Smart Consumers',
      painPoints: [
        'Hesitant to purchase Tier-1 luxury brands at exorbitant prices',
        'Desires 90% of flagship performance at 40% of the price',
      ],
      buyingMotivation: 'Compelling price-to-performance ratio and clear feature comparison breakdowns.',
    },
    {
      segment: 'Gifting & Trend Shoppers',
      demographics: 'Ages 25-45 • High disposable income • High search intent during seasonal festivals',
      painPoints: [
        'Need unboxing appeal and giftable, premium retail packaging',
        'Prefers bundles with essential accessories included',
      ],
      buyingMotivation: 'Eye-catching aesthetics, verified star ratings, and fast fulfillment badges.',
    },
  ];

  const strengths = [
    `Strong alignment with trending category search growth (+${growthVal}% YoY search volume).`,
    `Feature set provides clear competitive differentiation over standard entry-level catalog items.`,
    `Target price point (${currency}${price.toLocaleString('en-IN')}) lands right inside the high-conversion sweet spot.`,
    `High perceived value proposition with modular appeal for upsells and accessory cross-sells.`,
  ];

  const weaknesses = [
    `Moderate competitor density requires aggressive SEO keyword indexing and review velocity early on.`,
    `Customer churn risk if initial batch packaging lacks premium tactile unboxing experience.`,
    `Requires strong return-window customer support to preserve 4.5+ star rating threshold.`,
  ];

  const recommendations = [
    {
      id: 'rec-1',
      title: 'Optimize Product Title for Search Algorithms',
      description: `Incorporate high-velocity keywords like "${input.features[0] || 'Premium Quality'}" and category specifics within the first 60 characters for mobile display indexing.`,
      impact: 'High' as const,
      category: 'Listing' as const,
    },
    {
      id: 'rec-2',
      title: `Calibrate Dynamic Price to ${currency}${minRecPrice.toLocaleString('en-IN')} – ${currency}${maxRecPrice.toLocaleString('en-IN')}`,
      description: `Launch introductory pricing at ${currency}${minRecPrice.toLocaleString('en-IN')} to ignite velocity and build initial 50+ reviews, then transition to ${currency}${optimalPrice.toLocaleString('en-IN')} for sustainable gross margins (>55%).`,
      impact: 'High' as const,
      category: 'Pricing' as const,
    },
    {
      id: 'rec-3',
      title: 'Target Niche Audience Sub-segment',
      description: 'Run targeted micro-influencer campaigns focusing on practical problem-solving demonstrations rather than generic promotional banner ads.',
      impact: 'Medium' as const,
      category: 'Audience' as const,
    },
    {
      id: 'rec-4',
      title: 'Enhance Secondary A+ Content & Visual Infographics',
      description: 'Replace generic specification tables with 4 visual feature cards highlighting durability, ease of use, and warranty credentials.',
      impact: 'Medium' as const,
      category: 'Marketing' as const,
    },
    {
      id: 'rec-5',
      title: 'Introduce Essential Bundle Variant',
      description: 'Create a bundled SKU containing complementary accessories (protective case, cleaning kit, or cable) to lift Average Order Value by 24%.',
      impact: 'Low' as const,
      category: 'Feature' as const,
    },
  ];

  return {
    id: `analysis-${Date.now()}`,
    productName: name,
    category,
    originalPrice: price,
    currency,
    description: input.description || 'Modern marketplace product with competitive market positioning.',
    features: input.features && input.features.length > 0 ? input.features : ['Durable construction', 'Modern ergonomic design', 'Long-lasting reliability'],
    opportunityScore: scoreBreakdown,
    marketDemand: demandLevel,
    competitionLevel: competitionLevel,
    recommendedPriceRange: {
      min: minRecPrice,
      max: maxRecPrice,
      optimal: optimalPrice,
      currency,
      marginEstimate: '54% - 62% Estimated Gross Margin',
    },
    productSummary: `The market data demonstrates healthy buyer demand for "${name}" in the ${category} vertical. By pairing a strategic introductory price point with structured bullet highlights and targeted audience positioning, this product can realistically achieve strong sales velocity and maintain a dominant ranking within 60 to 90 days.`,
    targetAudience: targetAudienceSegments,
    strengths,
    weaknesses,
    recommendations,
    analyzedAt: new Date().toISOString(),
  };
}

export function generateRealisticListing(input: GeneratorInput): AIListing {
  const name = input.productName.trim() || 'Premium Quality Product';
  const category = input.category || 'Electronics';
  const tone = input.tone || 'Professional';
  const customer = input.targetCustomer.trim() || 'modern discerning buyers';
  const features = input.features && input.features.length > 0 ? input.features : ['Durable build', 'High efficiency', 'Ergonomic design'];

  let toneDescriptor = 'Engineered with meticulous precision for professionals';
  if (tone === 'Friendly') toneDescriptor = 'Designed to brighten your everyday routine with effortless delight';
  if (tone === 'Premium') toneDescriptor = 'Handcrafted with bespoke materials for those who refuse to compromise';
  if (tone === 'Persuasive') toneDescriptor = 'The ultimate upgrade you have been waiting for—unrivaled performance guaranteed';
  if (tone === 'Minimal') toneDescriptor = 'Pure, stripped-back utility designed for modern spaces';

  const productTitle = `${name} – ${features[0] || 'Ultra Performance'} with ${features[1] || 'Smart Design'}, Designed for ${customer.slice(0, 30)} | Prime Edition`;

  const shortDescription = `${toneDescriptor}. ${name} combines ${features.slice(0, 2).join(' and ')} to deliver an unmatched experience tailored for ${customer}.`;

  const fullDescription = `### Elevate Your Everyday with the ${name}

Are you searching for a solution that combines uncompromising durability, thoughtful design, and effortless reliability? The **${name}** was developed specifically for **${customer}** who demand excellence in their ${category.toLowerCase()} setup.

#### Why Choose the ${name}?

${features.map((feat, idx) => `* **${feat}**: Engineered to give you an intuitive advantage, eliminating daily friction and guaranteeing long-term satisfaction.`).join('\n')}

#### Designed with Purpose
Every contour and component has been rigorously stress-tested. Whether at home, in the workplace, or on the move, enjoy seamless operation without unexpected hiccups.

#### What’s in the Box?
* 1x ${name}
* 1x Quick-Start Setup & Care Guide
* 1x Comprehensive Manufacturer Warranty Card
* Complete accessories kit for immediate out-of-the-box enjoyment

*Backed by our 100% Satisfaction Guarantee and dedicated customer concierge.*`;

  const baseKeywords = [
    name.toLowerCase(),
    `${category.toLowerCase()} bestseller`,
    `${name.toLowerCase()} for ${customer.toLowerCase().slice(0, 20)}`,
    ...features.map(f => f.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim()),
    'best price online',
    'fast shipping',
    'verified reviews',
    'top rated 2026',
  ].filter(Boolean);

  const tags = [
    `#${name.replace(/[^a-zA-Z0-9]/g, '')}`,
    `#${category.replace(/[^a-zA-Z0-9]/g, '')}`,
    '#MarketplaceBestseller',
    '#MustHave',
    '#TrendingNow',
    '#PrimeDeals',
  ];

  const marketingCopy = `🚀 Stop settling for mediocre alternatives. Discover the all-new ${name}! Packed with ${features[0] || 'standout engineering'} and purpose-built for ${customer}. Tap the link to claim early-bird access before inventory runs out! 🔥`;

  return {
    id: `listing-${Date.now()}`,
    productName: name,
    category,
    tone,
    productTitle,
    shortDescription,
    fullDescription,
    seoKeywords: Array.from(new Set(baseKeywords)).slice(0, 10),
    productTags: tags,
    marketingCopy,
    bulletPoints: features.map(f => `✨ ${f}: Superior quality crafted to exceed expectations.`),
    generatedAt: new Date().toISOString(),
  };
}

export const INITIAL_SAVED_ANALYSES: ProductAnalysis[] = [
  generateRealisticAnalysis({
    productName: 'AcousticPulse Pro ANC Headphones',
    category: 'Electronics',
    price: 2499,
    currency: '₹',
    description: 'Over-ear wireless headphones with active noise cancellation and 45-hour battery.',
    features: ['40dB Hybrid ANC', '45H Battery Life', 'Bluetooth 5.3 Multipoint', 'Memory foam ear cushions'],
  }),
  generateRealisticAnalysis({
    productName: 'VortexStrike 75% Mechanical Keyboard',
    category: 'Gaming',
    price: 3499,
    currency: '₹',
    description: 'Gasket-mounted hot-swappable rapid trigger keyboard.',
    features: ['Hall-Effect magnetic switches', 'Hot-swap PCB', 'Double-shot PBT keycaps', '8000Hz polling rate'],
  }),
];
