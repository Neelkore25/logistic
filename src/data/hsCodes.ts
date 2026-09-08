export interface HsCodeRecord {
  code: string;
  shortCode: string;
  name: string;
  category: string;
  type: 'agriculture' | 'food' | 'electronics' | 'medicine' | 'textile';
  gstRate: string;
  rodtepRate: string;
  exportPolicy: 'Free' | 'Restricted' | 'Prohibited';
  mandatoryCert: string;
  notes: string;
}

export const HS_CODES_DATABASE: HsCodeRecord[] = [
  {
    code: '08013200',
    shortCode: '0801.32',
    name: 'Cashew nuts, fresh or dried, shelled (W320 / W240)',
    category: 'Cashew & Edible Nuts',
    type: 'food',
    gstRate: '5%',
    rodtepRate: '2.5%',
    exportPolicy: 'Free',
    mandatoryCert: 'FSSAI Export NOC & Phytosanitary Certificate',
    notes: 'Premium demand in EU & USA. Vacuum packing with nitrogen flush required for ocean freight.'
  },
  {
    code: '09041110',
    shortCode: '0904.11',
    name: 'Black Pepper, ungarbled, neither crushed nor ground',
    category: 'Spices & Condiments',
    type: 'agriculture',
    gstRate: '5%',
    rodtepRate: '2.0%',
    exportPolicy: 'Free',
    mandatoryCert: 'Spices Board Registration cum Membership (RCMC)',
    notes: 'Moisture content must be below 11%. Aflatoxin test certificate required for European shipments.'
  },
  {
    code: '10063020',
    shortCode: '1006.30',
    name: 'Basmati Rice, semi-milled or wholly milled, polished or glazed',
    category: 'Cereals & Grains',
    type: 'food',
    gstRate: 'Nil (0%) for export under LUT',
    rodtepRate: 'Nil',
    exportPolicy: 'Free',
    mandatoryCert: 'APEDA Registration & Pesticide Residue Certificate',
    notes: 'Minimum Export Price (MEP) regulations apply. Requires genetic purity and DNA test report.'
  },
  {
    code: '61091000',
    shortCode: '6109.10',
    name: 'T-shirts, singlets and other vests, knitted or crocheted, of cotton',
    category: 'Readymade Garments',
    type: 'textile',
    gstRate: '5%',
    rodtepRate: '4.3%',
    exportPolicy: 'Free',
    mandatoryCert: 'AEPC RCMC, OEKO-TEX Standard 100 (Buyer specific)',
    notes: 'High demand in Germany, UK, USA. Care instructions, fiber content % and wash care symbols mandatory on inner label.'
  },
  {
    code: '62052000',
    shortCode: '6205.20',
    name: "Men's or boys' shirts, woven, of cotton",
    category: 'Woven Apparel',
    type: 'textile',
    gstRate: '5%',
    rodtepRate: '3.8%',
    exportPolicy: 'Free',
    mandatoryCert: 'AEPC RCMC',
    notes: 'Requires export carton box bursting test rating minimum 14 kg/cm².'
  },
  {
    code: '85044090',
    shortCode: '8504.40',
    name: 'Static converters, power adapters, SMPS & inverters',
    category: 'Electronic Components',
    type: 'electronics',
    gstRate: '18%',
    rodtepRate: '1.8%',
    exportPolicy: 'Free',
    mandatoryCert: 'BIS CRS / CE Declaration of Conformity / RoHS',
    notes: 'CE marking and RoHS declaration mandatory for EU shipments; FCC Part 15 for USA.'
  },
  {
    code: '85171300',
    shortCode: '8517.13',
    name: 'Smartphones and handheld wireless communication devices',
    category: 'Telecom Equipment',
    type: 'electronics',
    gstRate: '18%',
    rodtepRate: '2.0%',
    exportPolicy: 'Free',
    mandatoryCert: 'WPC Approval & IMEI Certification',
    notes: 'Lithium battery UN 38.3 transport safety report mandatory for both Air & Sea cargo.'
  },
  {
    code: '30049099',
    shortCode: '3004.90',
    name: 'Medicaments of mixed or unmixed products for therapeutic uses',
    category: 'Pharmaceutical Formulations',
    type: 'medicine',
    gstRate: '12%',
    rodtepRate: '1.5%',
    exportPolicy: 'Free',
    mandatoryCert: 'Pharmexcil RCMC, WHO-GMP Certificate & COPP',
    notes: 'Temperature-controlled reefer container (2°C - 8°C or 15°C - 25°C) with continuous data-logger mandatory.'
  },
  {
    code: '09024020',
    shortCode: '0902.40',
    name: 'Black tea leaf in bulk (Assam / Darjeeling orthodox)',
    category: 'Plantation & Tea',
    type: 'agriculture',
    gstRate: '5%',
    rodtepRate: '1.7%',
    exportPolicy: 'Free',
    mandatoryCert: 'Tea Board of India Export License & FSSAI',
    notes: 'Moisture-proof multiwall paper bags with inner food-grade poly lining required.'
  },
  {
    code: '33012937',
    shortCode: '3301.29',
    name: 'Essential oil of lemongrass and spearmint',
    category: 'Organic Extracts & Cosmetics',
    type: 'agriculture',
    gstRate: '12%',
    rodtepRate: '2.0%',
    exportPolicy: 'Free',
    mandatoryCert: 'MSDS (Material Safety Data Sheet) & CHEMEXCIL RCMC',
    notes: 'Classified as hazardous/DG cargo depending on flash point. DG declaration required for air shipping.'
  }
];
