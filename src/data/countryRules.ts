import { ChecklistItem, ImporterRecommendationOption, ProductType } from '../types/export';

export interface DestinationCountryInfo {
  code: string;
  name: string;
  flag: string;
  region: string;
  currency: string;
  languageRequirement: string;
  standardPort: string;
  customsAuthority: string;
  palletStandard: string;
}

export const DESTINATION_COUNTRIES: DestinationCountryInfo[] = [
  {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    region: 'European Union (EU)',
    currency: 'EUR (€)',
    languageRequirement: 'German (mandatory for consumer-facing labels; English permitted for B2B wholesale)',
    standardPort: 'Port of Hamburg / Bremerhaven (DEHAM)',
    customsAuthority: 'German Customs (Zoll / EU Union Customs Code)',
    palletStandard: 'EPAL / EUR-1 Standard (1200 x 800 mm) heat-treated ISPM-15'
  },
  {
    code: 'US',
    name: 'United States of America',
    flag: '🇺🇸',
    region: 'North America',
    currency: 'USD ($)',
    languageRequirement: 'English (US customary units & Metric dual declaration)',
    standardPort: 'Port of New York & New Jersey / Port of Los Angeles',
    customsAuthority: 'U.S. Customs and Border Protection (CBP) / FDA',
    palletStandard: 'GMA Standard 48 x 40 inches (1219 x 1016 mm) ISPM-15'
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    region: 'Middle East (GCC)',
    currency: 'AED (د.إ)',
    languageRequirement: 'Arabic & English bilingual label mandatory',
    standardPort: 'Jebel Ali Port, Dubai (AEJEA)',
    customsAuthority: 'Dubai Customs / ESMA (MoIAT)',
    palletStandard: 'Standard 1200 x 1000 mm ISPM-15 fumigated pallet'
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    region: 'Europe (Post-Brexit UK)',
    currency: 'GBP (£)',
    languageRequirement: 'English (UKCA mark replacing CE for UK market)',
    standardPort: 'Port of Felixstowe / Southampton (GBFXT)',
    customsAuthority: 'HM Revenue & Customs (HMRC)',
    palletStandard: 'Standard 1200 x 1000 mm or EPAL 1200 x 800 mm ISPM-15'
  },
  {
    code: 'JP',
    name: 'Japan',
    flag: '🇯🇵',
    region: 'East Asia',
    currency: 'JPY (¥)',
    languageRequirement: 'Japanese mandatory for consumer food & cosmetic items',
    standardPort: 'Port of Yokohama / Port of Tokyo',
    customsAuthority: 'Japan Customs (Ministry of Finance)',
    palletStandard: 'JIS T11 Standard (1100 x 1100 mm)'
  }
];

export const MARKET_RECOMMENDATIONS: Record<string, ImporterRecommendationOption[]> = {
  cashew: [
    {
      countryCode: 'DE',
      countryName: 'Germany',
      flag: '🇩🇪',
      demandIndex: 'Very High',
      avgTariffRate: '0% under GSP / Indo-German trade',
      marketSizeUsd: '$340M Annual Cashew Imports',
      recommendedTransport: 'Ocean (FCL)',
      transitDays: 24,
      freightCostEstInr: 165000,
      topBuyerSegments: ['Organic Snack Packagers', 'Bio-Supermarket Chains', 'Confectionery Ingredients'],
      keyRegulations: ['EU Regulation 1881/2006 on Aflatoxins', 'Vacuum packed with Nitrogen flush', 'Phytosanitary Certificate']
    },
    {
      countryCode: 'AE',
      countryName: 'United Arab Emirates',
      flag: '🇦🇪',
      demandIndex: 'Very High',
      avgTariffRate: '0% duty under India-UAE CEPA Agreement',
      marketSizeUsd: '$280M Annual Cashew Imports',
      recommendedTransport: 'Ocean (FCL)',
      transitDays: 4,
      freightCostEstInr: 62000,
      topBuyerSegments: ['Dry Fruits Wholesalers (Al Ras Market)', 'HORECA Sector', 'GCC Re-exporters'],
      keyRegulations: ['Halal Compliance Declaration', 'Bilingual Arabic/English label', 'FSSAI Export Certificate']
    },
    {
      countryCode: 'US',
      countryName: 'United States',
      flag: '🇺🇸',
      demandIndex: 'High',
      avgTariffRate: 'Free (0%)',
      marketSizeUsd: '$1.1B Nut Market',
      recommendedTransport: 'Ocean (FCL)',
      transitDays: 32,
      freightCostEstInr: 210000,
      topBuyerSegments: ['Specialty Grocery Retailers', 'Wholesale Nut Roasters'],
      keyRegulations: ['FDA Prior Notice & Bioterrorism Act registration', 'FSMA Foreign Supplier Verification']
    }
  ],
  textile: [
    {
      countryCode: 'DE',
      countryName: 'Germany',
      flag: '🇩🇪',
      demandIndex: 'Very High',
      avgTariffRate: '9.6% (Duty drawback applicable in India)',
      marketSizeUsd: '$820M Cotton Apparel',
      recommendedTransport: 'Ocean (FCL)',
      transitDays: 22,
      freightCostEstInr: 155000,
      topBuyerSegments: ['Department Store Fashion Lines', 'Eco-Cotton Sustainable Labels'],
      keyRegulations: ['EU REACH Compliance (Azo dyes free)', 'German Packaging Act (LUCID)', 'OEKO-TEX Standard 100']
    },
    {
      countryCode: 'US',
      countryName: 'United States',
      flag: '🇺🇸',
      demandIndex: 'Very High',
      avgTariffRate: '16.5% standard (Drawback + RoDTEP refund 4.3%)',
      marketSizeUsd: '$4.2B Indian Garment Imports',
      recommendedTransport: 'Air Cargo',
      transitDays: 3,
      freightCostEstInr: 285000,
      topBuyerSegments: ['Retail Fashion Brands', 'E-commerce Marketplaces (FBA)'],
      keyRegulations: ['FTC Care Labelling Rule', 'Flammable Fabrics Act (FFA)', 'Country of Origin Woven Tag']
    }
  ]
};

export function getDynamicPackagingChecklist(productType: ProductType, destinationCountryCode: string): ChecklistItem[] {
  const isGermany = destinationCountryCode === 'DE';
  const isUSA = destinationCountryCode === 'US';
  const isUAE = destinationCountryCode === 'AE';

  const baseItems: ChecklistItem[] = [
    {
      id: 'chk-origin',
      label: 'Country of Origin Declaration ("Made in India")',
      category: 'labelling',
      description: 'Must be permanently marked on both primary product label and master shipping carton.',
      isMandatory: true,
      checked: true
    },
    {
      id: 'chk-shipper',
      label: 'Exporter & Importer Complete Address & GSTIN/IEC',
      category: 'labelling',
      description: 'Full legal trade name, registered corporate address, contact details, and IEC number.',
      isMandatory: true,
      checked: true
    },
    {
      id: 'chk-netwt',
      label: 'Net Quantity & Gross Weight',
      category: 'labelling',
      description: 'Accurate weight matching the Commercial Invoice and Packing List exactly.',
      isMandatory: true,
      checked: true
    },
    {
      id: 'chk-batch',
      label: 'Batch / Lot Number & Date of Manufacture',
      category: 'compliance',
      description: 'Essential for traceability and rapid customs quarantine verification.',
      isMandatory: true,
      checked: false
    },
    {
      id: 'chk-pallet',
      label: 'ISPM-15 Heat Treated Wooden Pallets (HT / MB Stamp)',
      category: 'handling',
      description: 'All wooden packaging materials must bear the official IPPC wheat-stamp showing heat treatment (56°C for 30 min). Non-compliant wood will be quarantined or rejected at destination port.',
      isMandatory: true,
      checked: false
    }
  ];

  // Dynamic additions based on Product Type
  if (productType === 'food' || productType === 'agriculture') {
    baseItems.push(
      {
        id: 'chk-food-expiry',
        label: 'Best Before / Expiry Date & Storage Conditions',
        category: 'labelling',
        description: 'Store in cool dry place, away from direct sunlight (DD/MM/YYYY format).',
        isMandatory: true,
        checked: false,
        productSpecific: 'Food & Agriculture'
      },
      {
        id: 'chk-food-allergens',
        label: 'Allergen Advisory (e.g. "Contains Tree Nuts")',
        category: 'labelling',
        description: 'Mandatory bold allergen warning on front and back packaging.',
        isMandatory: true,
        checked: false,
        productSpecific: 'Food & Agriculture'
      },
      {
        id: 'chk-food-vacuum',
        label: 'Nitrogen Flushed 4-Ply Barrier Vacuum Pouches',
        category: 'protection',
        description: 'Prevents oxidation, rancidity, and insect infestation during extended maritime transit.',
        isMandatory: true,
        checked: false,
        productSpecific: 'Food & Agriculture'
      },
      {
        id: 'chk-food-fssai',
        label: 'FSSAI License Number & Green Veg/Non-Veg Dot Logo',
        category: 'compliance',
        description: 'Indian food safety authority registration display requirement.',
        isMandatory: true,
        checked: true,
        productSpecific: 'Food & Agriculture'
      }
    );
  } else if (productType === 'textile') {
    baseItems.push(
      {
        id: 'chk-tex-comp',
        label: 'Fiber Composition & Material Percentage (e.g. 100% Organic Cotton)',
        category: 'labelling',
        description: 'Strict European & US truth-in-advertising fiber content disclosure.',
        isMandatory: true,
        checked: false,
        productSpecific: 'Textile'
      },
      {
        id: 'chk-tex-care',
        label: 'Standard Wash & Care Symbols (ISO 3758 / ASTM D5489)',
        category: 'labelling',
        description: 'Washing, bleaching, drying, ironing, and professional dry cleaning icons.',
        isMandatory: true,
        checked: false,
        productSpecific: 'Textile'
      },
      {
        id: 'chk-tex-desiccant',
        label: 'Silica Gel Desiccant Pouches (Anti-Mold / Anti-Humidity)',
        category: 'protection',
        description: 'Minimum 2g silica pouch per polybag to prevent sea freight container rain condensation.',
        isMandatory: true,
        checked: false,
        productSpecific: 'Textile'
      }
    );
  } else if (productType === 'electronics') {
    baseItems.push(
      {
        id: 'chk-elec-volt',
        label: 'Voltage, Frequency (V/Hz) & Power Rating Plate',
        category: 'labelling',
        description: 'Must align with destination electrical grid standards (e.g. 230V 50Hz in EU, 120V 60Hz in US).',
        isMandatory: true,
        checked: false,
        productSpecific: 'Electronics'
      },
      {
        id: 'chk-elec-esd',
        label: 'ESD Anti-Static Shielding Packaging & Bubble Cushioning',
        category: 'protection',
        description: 'Protection against electrostatic discharge and shock vibrations during transit.',
        isMandatory: true,
        checked: false,
        productSpecific: 'Electronics'
      },
      {
        id: 'chk-elec-battery',
        label: 'UN 38.3 Lithium Battery Warning Label (if applicable)',
        category: 'compliance',
        description: 'Mandatory dangerous goods transport diamond for air & ocean shipping.',
        isMandatory: false,
        checked: false,
        productSpecific: 'Electronics'
      }
    );
  } else if (productType === 'medicine') {
    baseItems.push(
      {
        id: 'chk-med-temp',
        label: 'Cold Chain Temperature Logger & Range Indicator (2°C - 8°C)',
        category: 'protection',
        description: 'Active single-use USB or Bluetooth temperature data-logger placed in center carton.',
        isMandatory: true,
        checked: false,
        productSpecific: 'Pharma'
      },
      {
        id: 'chk-med-gmp',
        label: 'Schedule M / WHO-GMP License & Drug Batch Release Certificate',
        category: 'compliance',
        description: 'Official drug release test protocol attached with master invoice.',
        isMandatory: true,
        checked: false,
        productSpecific: 'Pharma'
      }
    );
  }

  // Dynamic additions based on Destination Country
  if (isGermany) {
    baseItems.push(
      {
        id: 'chk-dest-de-lang',
        label: 'German Language Translations on Outer & Retail Pack',
        category: 'labelling',
        description: 'Product name, ingredients/materials, and manufacturer address in German (EU Consumer Rights Directive).',
        isMandatory: true,
        checked: false,
        destinationSpecific: 'Germany (EU)'
      },
      {
        id: 'chk-dest-de-lucid',
        label: 'German VerpackG (LUCID) Packaging Recycling Registration Number',
        category: 'compliance',
        description: 'Mandatory dual system recycling fee registration before goods enter German territory.',
        isMandatory: true,
        checked: false,
        destinationSpecific: 'Germany (EU)'
      },
      {
        id: 'chk-dest-de-ce',
        label: 'CE Mark & EU Authorized Representative (EC-REP) details',
        category: 'compliance',
        description: 'Required if electrical, medical, or toy goods are imported into the EU Single Market.',
        isMandatory: false,
        checked: false,
        destinationSpecific: 'Germany (EU)'
      }
    );
  } else if (isUSA) {
    baseItems.push(
      {
        id: 'chk-dest-us-fda',
        label: 'FDA Prior Notice Confirmation Number (PNC #) on Shipping Documents',
        category: 'compliance',
        description: 'Filing must be submitted to US Customs & Border Protection at least 8 hours before vessel departure.',
        isMandatory: true,
        checked: false,
        destinationSpecific: 'United States'
      },
      {
        id: 'chk-dest-us-units',
        label: 'Dual Measurement Units (Ounces/Lbs AND Grams/Kg)',
        category: 'labelling',
        description: 'US Fair Packaging and Labeling Act (FPLA) requires customary avoirdupois units first.',
        isMandatory: true,
        checked: false,
        destinationSpecific: 'United States'
      }
    );
  } else if (isUAE) {
    baseItems.push(
      {
        id: 'chk-dest-ae-arabic',
        label: 'Bilingual Arabic & English Primary Packaging Label',
        category: 'labelling',
        description: 'Arabic text must be of equal size and visibility as English (GSO 9/2013 standard).',
        isMandatory: true,
        checked: false,
        destinationSpecific: 'UAE (GCC)'
      },
      {
        id: 'chk-dest-ae-halal',
        label: 'Halal Certification by MOIAT / ESMA Accredited Body (for food items)',
        category: 'compliance',
        description: 'Required for entry through UAE ports and Gulf Cooperation Council countries.',
        isMandatory: true,
        checked: false,
        destinationSpecific: 'UAE (GCC)'
      }
    );
  }

  return baseItems;
}
