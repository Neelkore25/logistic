import { AssessmentQuestion } from '../types/export';

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    category: 'business',
    question: 'Do you have a valid GST registration (GSTIN) in India?',
    explanation: 'A regular GSTIN is required to conduct inter-state trade and file export declarations without paying IGST under LUT.',
    options: [
      {
        label: 'Yes, fully active GSTIN',
        value: 'yes',
        score: 15,
        feedback: 'Excellent. Active GST registration allows zero-rated export supply.'
      },
      {
        label: 'No, not registered yet',
        value: 'no',
        score: 0,
        feedback: 'Action needed: Apply for GSTIN immediately on gst.gov.in (mandatory for exporters).'
      },
      {
        label: 'Not sure / Composition scheme',
        value: 'not_sure',
        score: 5,
        feedback: 'Composition dealers cannot export goods. You need a regular GSTIN.'
      }
    ]
  },
  {
    id: 2,
    category: 'documents',
    question: 'Do you hold an active 10-digit Importer Exporter Code (IEC) from DGFT?',
    explanation: 'The IEC is your national passport for foreign trade. Without an active IEC, Indian customs cannot generate a Shipping Bill.',
    options: [
      {
        label: 'Yes, verified on DGFT portal',
        value: 'yes',
        score: 20,
        feedback: 'Great! Ensure your annual online validation is updated.'
      },
      {
        label: 'No, do not have an IEC yet',
        value: 'no',
        score: 0,
        feedback: 'Missing requirement: Use our AI Document Agent to prepare your DGFT application in minutes.'
      },
      {
        label: 'Applied, waiting for DGFT approval',
        value: 'not_sure',
        score: 10,
        feedback: 'Track status with your application reference on dgft.gov.in.'
      }
    ]
  },
  {
    id: 3,
    category: 'business',
    question: 'Have you registered your Bank Authorized Dealer (AD) Code at the exit customs port?',
    explanation: 'Your bank issues a 14-digit AD Code letter which must be mapped on ICEGATE to credit export remittances (e-BRC) directly into your bank account.',
    options: [
      {
        label: 'Yes, registered at JNPT / Air cargo port',
        value: 'yes',
        score: 15,
        feedback: 'Customs port mapping is active; export remittances will flow without hold.'
      },
      {
        label: 'No, haven’t registered yet',
        value: 'no',
        score: 0,
        feedback: 'Obtain an AD Code letter from your authorized forex bank branch and register on ICEGATE.'
      },
      {
        label: 'Not sure what an AD Code is',
        value: 'not_sure',
        score: 5,
        feedback: 'An AD Code is a bank authorization code linking your forex bank account to Indian customs.'
      }
    ]
  },
  {
    id: 4,
    category: 'documents',
    question: 'Have you filed a Letter of Undertaking (LUT) on the GST Portal?',
    explanation: 'Filing form GST RFD-11 (LUT) allows you to export goods without paying 18% or 12% IGST upfront, preserving vital working capital.',
    options: [
      {
        label: 'Yes, LUT filed for current financial year',
        value: 'yes',
        score: 15,
        feedback: 'Cash flow protected. You can export zero-tax goods legally.'
      },
      {
        label: 'No, haven’t filed yet',
        value: 'no',
        score: 0,
        feedback: 'High priority: File LUT online on GST portal; it takes only 5 minutes with Aadhaar OTP.'
      },
      {
        label: 'Not sure',
        value: 'not_sure',
        score: 5,
        feedback: 'Check your GST dashboard under Services > User Services > Furnish Letter of Undertaking.'
      }
    ]
  },
  {
    id: 5,
    category: 'product',
    question: 'Do your products hold the required statutory quality certifications (e.g., FSSAI, APEDA, or BIS)?',
    explanation: 'Agricultural, food, and manufactured items require Export Promotion Council registration and sanitary/technical certificates.',
    options: [
      {
        label: 'Yes, valid certificates available',
        value: 'yes',
        score: 15,
        feedback: 'Product complies with export quality and food/technical safety regulations.'
      },
      {
        label: 'No, testing/certification in progress',
        value: 'no',
        score: 5,
        feedback: 'Ensure lab test reports and council RCMC are in place before booking cargo.'
      },
      {
        label: 'Not sure what applies to my item',
        value: 'not_sure',
        score: 5,
        feedback: 'Use our HS Code lookup tool to identify specific statutory export bodies.'
      }
    ]
  },
  {
    id: 6,
    category: 'packaging',
    question: 'Are your wooden packaging materials treated with certified ISPM-15 heat treatment stamps?',
    explanation: 'International plant protection standards strictly ban untreated raw wood pallets. Wood must have the official IPPC wheat stamp (HT 56°C).',
    options: [
      {
        label: 'Yes, using certified ISPM-15 heat-treated pallets',
        value: 'yes',
        score: 10,
        feedback: 'Compliant pallets prevent costly customs quarantine or re-export at destination port.'
      },
      {
        label: 'Using normal domestic wooden boxes/pallets',
        value: 'no',
        score: 0,
        feedback: 'Warning: Untreated wooden packaging will be rejected by EU/US customs. Switch to ISPM-15 or plastic pallets.'
      },
      {
        label: 'Using corrugated paper cartons / Plastic pallets',
        value: 'yes',
        score: 10,
        feedback: 'Exempt from ISPM-15 rules; clean clearance guaranteed.'
      }
    ]
  },
  {
    id: 7,
    category: 'destination',
    question: 'Do you have an agreed Incoterm (e.g., CIF, FOB) and secure payment mechanism with buyer?',
    explanation: 'Incoterms establish legal transfer of risk and freight liability. Irrevocable LC or 30% advance protects MSMEs from default.',
    options: [
      {
        label: 'Yes, confirmed Purchase Order with CIF/FOB terms',
        value: 'yes',
        score: 10,
        feedback: 'Strong commercial foundation established with international buyer.'
      },
      {
        label: 'Still negotiating terms',
        value: 'not_sure',
        score: 5,
        feedback: 'We recommend starting with CIF or FOB terms for transparent logistics accountability.'
      },
      {
        label: 'Open credit without contract',
        value: 'no',
        score: 0,
        feedback: 'Caution: Unsecured credit carries high non-payment risk. Consider ECGC export credit insurance.'
      }
    ]
  }
];
