import { ProductType } from '../types/export';

export interface CategorySuggestion {
  type: ProductType;
  categoryName: string;
  confidence: number; // 0 to 1
  matchedKeywords: string[];
}

const CATEGORY_RULES: {
  type: ProductType;
  categoryName: string;
  keywords: string[];
}[] = [
  {
    type: 'food',
    categoryName: 'Food & Edible Produce',
    keywords: [
      'cashew', 'nut', 'rice', 'basmati', 'spice', 'pepper', 'cardamom', 'turmeric',
      'ginger', 'tea', 'coffee', 'mango', 'fruit', 'vegetable', 'grain', 'wheat',
      'sugar', 'flour', 'honey', 'pickle', 'oil', 'edible', 'sweet', 'snack', 'seed',
      'pulse', 'dal', 'lentil', 'biscuit', 'masala', 'onion', 'garlic', 'chilli'
    ]
  },
  {
    type: 'agriculture',
    categoryName: 'Raw Agriculture & Organic Produce',
    keywords: [
      'cotton', 'jute', 'coir', 'plant', 'flower', 'extract', 'herbal', 'essential oil',
      'tobacco', 'rubber', 'wood', 'timber', 'bamboo', 'hay', 'fodder', 'fertilizer',
      'compost', 'sapling', 'raw leaf', 'biomass', 'seedling'
    ]
  },
  {
    type: 'textile',
    categoryName: 'Textiles & Readymade Garments',
    keywords: [
      'shirt', 't-shirt', 'tshirt', 'garment', 'apparel', 'fabric', 'cloth', 'silk',
      'saree', 'denim', 'jeans', 'towel', 'linen', 'dress', 'knitwear', 'woven',
      'cotton yarn', 'polyester', 'wool', 'shawl', 'curtain', 'bedsheet', 'leather jacket'
    ]
  },
  {
    type: 'electronics',
    categoryName: 'Electronics & Hardware',
    keywords: [
      'phone', 'smartphone', 'mobile', 'charger', 'adapter', 'led', 'bulb', 'laptop',
      'computer', 'cable', 'wire', 'sensor', 'circuit', 'pcb', 'battery', 'inverter',
      'solar', 'display', 'screen', 'audio', 'speaker', 'headphone', 'relay', 'smps',
      'microcontroller', 'chip', 'electronic', 'switchboard'
    ]
  },
  {
    type: 'medicine',
    categoryName: 'Pharmaceuticals & Health Products',
    keywords: [
      'tablet', 'capsule', 'syrup', 'injection', 'pharma', 'medicine', 'drug',
      'vaccine', 'antibiotic', 'paracetamol', 'ointment', 'sanitizer', 'surgical',
      'bandage', 'ayurvedic', 'homeopathic', 'medical', 'ointment', 'dosage', 'iv fluid'
    ]
  }
];

export const categorizationService = {
  /**
   * Intelligently detects the product type and category name from product name
   */
  suggestCategory(productName: string): CategorySuggestion | null {
    if (!productName || productName.trim().length < 2) {
      return null;
    }

    const cleanInput = productName.toLowerCase().trim();
    let bestMatch: CategorySuggestion | null = null;
    let highestScore = 0;

    for (const rule of CATEGORY_RULES) {
      const matched = rule.keywords.filter(keyword => {
        // Regex word boundary or includes
        return cleanInput.includes(keyword);
      });

      if (matched.length > 0) {
        // Longer keyword matches have higher confidence
        const score = matched.reduce((acc, k) => acc + (k.length > 4 ? 2 : 1), 0);
        if (score > highestScore) {
          highestScore = score;
          bestMatch = {
            type: rule.type,
            categoryName: rule.categoryName,
            confidence: Math.min(0.95, 0.4 + matched.length * 0.2),
            matchedKeywords: matched
          };
        }
      }
    }

    return bestMatch;
  },

  detectCategory(productName: string): { category: string; type: ProductType; suggestedHs?: string } | null {
    const suggestion = this.suggestCategory(productName);
    if (!suggestion) return null;
    return {
      category: suggestion.categoryName,
      type: suggestion.type,
      suggestedHs:
        suggestion.type === 'food'
          ? '08013200'
          : suggestion.type === 'textile'
          ? '61091000'
          : suggestion.type === 'agriculture'
          ? '10063010'
          : undefined
    };
  }
};
