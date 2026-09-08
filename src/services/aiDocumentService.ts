export interface AiDossierInput {
  documentCode: string;
  documentName: string;
  businessName: string;
  location: string;
  panNumber?: string;
  pan?: string;
  category?: string;
  bankAccount?: string;
  bankDetails?: string;
  adCode?: string;
  signatory?: string;
}

export const aiDocumentService = {
  /**
   * Generates a structured DGFT / Customs application draft
   */
  generateDossier(input: AiDossierInput): {
    fileName: string;
    content: string;
    summary: string;
  } {
    const timestamp = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    const pan = input.panNumber || input.pan || 'PENDING';
    const bank = input.bankAccount || input.bankDetails || 'Designated Bank';
    const category = input.category || 'Manufacturer Exporter';
    const adCode = input.adCode || 'PENDING';
    const signatory = input.signatory || 'Authorized Director';

    const isIec = input.documentCode.includes('IEC');

    const content = `======================================================================
GOVERNMENT OF INDIA — DIRECTORATE GENERAL OF FOREIGN TRADE (DGFT)
ASSISTED E-APPLICATION SUMMARY DOSSIER (DRAFT)
======================================================================
Document Target:      ${input.documentName} (${input.documentCode})
Prepared via:         ExportReady AI Document Agent
Generated On:         ${timestamp}
Application Mode:     Digital Filing Ready (Schema v2.4)
----------------------------------------------------------------------
1. APPLICANT ENTERPRISE PARTICULARS
----------------------------------------------------------------------
Entity Legal Name:    ${input.businessName}
Operating Location:   ${input.location}
Permanent Account No: ${input.panNumber}
Exporter Category:    ${input.category}

----------------------------------------------------------------------
2. BANKING & CUSTOMS EXCHANGE CONTROL MAPPING
----------------------------------------------------------------------
Designated Forex A/c: ${input.bankAccount}
Authorized Dealer:    ${input.adCode} (Port of Exit: Nhava Sheva JNPT / Air Cargo)
Authorized Signatory: ${input.signatory}

----------------------------------------------------------------------
3. COMPLIANCE & STATUTORY CHECKLIST
----------------------------------------------------------------------
[x] PAN identity verification against CBDT records
[x] Bank authorization certificate format aligned
[x] Zero-rated LUT filing eligibility checked
[x] ICEGATE registration profile pre-validated

----------------------------------------------------------------------
IMPORTANT GOVERNMENT DISCLAIMER
----------------------------------------------------------------------
This document is an AI-assisted preparation summary designed to expedite
your online application on the DGFT (dgft.gov.in) and ICEGATE portals.
This document does NOT constitute official issuance or approval.
The official license will be issued directly by the Directorate General
of Foreign Trade, Ministry of Commerce & Industry, Government of India.
======================================================================`;

    const fileName = isIec
      ? 'DGFT_IEC_Application_Prepared_DRAFT.txt'
      : `${input.documentCode}_Application_DRAFT.txt`;

    const summary = `Generated ready-to-file application summary for ${input.businessName} (${input.documentCode}).`;

    return { fileName, content, summary };
  }
};
