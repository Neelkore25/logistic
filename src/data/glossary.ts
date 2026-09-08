import { TermDefinition } from '../types/export';

export const EXPORT_GLOSSARY: TermDefinition[] = [
  {
    term: 'IEC',
    fullName: 'Importer Exporter Code',
    definition: 'A mandatory 10-digit business identification number issued by the Directorate General of Foreign Trade (DGFT), Ministry of Commerce, Government of India. No commercial export or import can be made from India without an active IEC.',
    practicalTip: 'Your IEC is now linked directly with your business PAN card. You must renew/validate it once annually between April and June on the DGFT portal (free of charge).',
    category: 'Government & Tax'
  },
  {
    term: 'HS Code',
    fullName: 'Harmonized System Code (ITC-HS)',
    definition: 'A globally standardized 6-to-8 digit numeric code used worldwide to classify traded goods. India uses 8-digit ITC-HS codes. It determines customs duty rates, export restrictions, and inspection rules.',
    practicalTip: 'Always verify the full 8-digit code matching your exact physical item. An incorrect HS code can delay customs clearance at port or trigger penalty audits.',
    category: 'Trade Standards'
  },
  {
    term: 'CHA',
    fullName: 'Customs House Agent (Customs Broker)',
    definition: 'A licensed professional or agency authorized by Indian Customs to manage the clearance of export/import goods through air and sea ports, filing shipping bills and handling cargo inspection.',
    practicalTip: 'A good CHA saves you days at the port. Provide them with your checklist, Commercial Invoice, Packing List, and LUT upfront.',
    category: 'Shipping & Transport'
  },
  {
    term: 'Bill of Lading (B/L)',
    fullName: 'Ocean Bill of Lading',
    definition: 'A legally binding transport document issued by an ocean carrier (shipping line) acknowledging receipt of cargo for shipment on a specific vessel to a designated foreign port. It acts as a document of title to the goods.',
    practicalTip: 'Your foreign buyer cannot release the cargo at their port without presenting the original Bill of Lading (or an authorized Telex Release).',
    category: 'Shipping & Transport'
  },
  {
    term: 'Airway Bill (AWB)',
    fullName: 'Air Waybill',
    definition: 'A non-negotiable contract between an air cargo carrier and the exporter. It confirms receipt of goods for air transit and provides comprehensive shipment tracking details.',
    practicalTip: 'Unlike a maritime B/L, an AWB is not a document of title; goods are consigned directly to the designated receiver named on the bill.',
    category: 'Shipping & Transport'
  },
  {
    term: 'Certificate of Origin (CoO)',
    fullName: 'Certificate of Origin',
    definition: 'An official document certifying that the goods being exported were wholly manufactured, produced, or processed in a particular country (e.g., India). Issued by designated Export Promotion Councils or Chambers of Commerce.',
    practicalTip: 'Preferential CoO helps your foreign buyer claim reduced or zero import duty under Free Trade Agreements (FTAs like India-UAE CEPA or India-Australia ECTA).',
    category: 'Government & Tax'
  },
  {
    term: 'AD Code',
    fullName: 'Authorized Dealer Code',
    definition: 'A 14-digit numerical code issued by your bank (authorized by RBI) that must be registered with Customs at each specific port (sea port/airport) from where you intend to ship.',
    practicalTip: 'You cannot generate a Shipping Bill on ICEGATE without registering your AD Code at your exit port. One-time bank letter required.',
    category: 'Finance & Customs'
  },
  {
    term: 'LUT',
    fullName: 'Letter of Undertaking (GST RFD-11)',
    definition: 'A facility under Indian GST that allows registered exporters to export goods without paying IGST upfront, freeing up MSME working capital.',
    practicalTip: 'File your LUT online on the GST portal at the start of each financial year. It takes only 5 minutes and saves you from paying and claiming refunds.',
    category: 'Government & Tax'
  },
  {
    term: 'Shipping Bill',
    fullName: 'Customs Shipping Bill',
    definition: 'The primary electronic declaration filed by the exporter (via CHA) on the Indian Customs ICEGATE portal requesting permission for goods to leave India (Let Export Order - LEO).',
    practicalTip: 'Ensure invoice numbers, values, and HS codes on the Shipping Bill match your Commercial Invoice down to the last decimal.',
    category: 'Finance & Customs'
  },
  {
    term: 'Incoterms',
    fullName: 'International Commercial Terms (ICC 2020)',
    definition: 'Pre-defined commercial trade terms defining who pays freight, who bears insurance, and where the risk transfers from seller to buyer (e.g., FOB, CIF, EXW, DDP).',
    practicalTip: 'For new exporters, FOB (Free On Board - Indian port) or CIF (Cost, Insurance & Freight - buyer port) are the most straightforward and secure terms.',
    category: 'Trade Standards'
  },
  {
    term: 'ICEGATE',
    fullName: 'Indian Customs Electronic Gateway',
    definition: 'The national customs portal that facilitates electronic filing of Shipping Bills, Bill of Entry, and real-time tracking of customs clearance status.',
    practicalTip: 'Create an exporter login on ICEGATE to directly monitor your shipment Let Export Order (LEO) and RoDTEP scroll credits.',
    category: 'Finance & Customs'
  }
];
