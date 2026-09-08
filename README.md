# ExportReady — Premium Export Logistics Readiness Platform

> **“India-Ready ➔ Export-Ready ➔ Shipment Ready ➔ Shipment Delivered”**

ExportReady is an advanced SaaS web application designed specifically for Tier-2 and Tier-3 Indian MSMEs to navigate the end-to-end export logistics and customs readiness process.

Built with **React 18 + TypeScript + Vite + Tailwind CSS + Lucide Icons**.

---

## 🌟 Core Product Principle

Every screen in ExportReady clearly answers:
> **“What is done? What is pending? What should I do next?”**

The platform removes international trade complexity and guides first-time and growing exporters through a structured, visual roadmap.

---

## 🚀 Key Modules & Capabilities

1. **Split-Screen Authentication & Role Entry**
   - **Sender** (Indian Exporter sending goods) vs. **Receiver** (Overseas / Domestic Buyer).
   - Animated Canvas trade globe mapping maritime and air trade corridors from India to the world.
   - **Global Multilingual Switcher**: English, हिन्दी (Hindi), ગુજરાતી (Gujarati), मराठी (Marathi), and தமிழ் (Tamil).
   - 3-Step guided Sender registration & streamlined Receiver onboarding.

2. **5-Step Guided Onboarding Stepper**
   - Business Details ➔ Product Selection ➔ Statutory Registrations ➔ Destination Port ➔ Compliance Audit.

3. **Central Dashboard & Export Readiness Gauge**
   - Circular SVG Readiness Gauge (dynamically updates as tasks are resolved).
   - **Interactive 11-Stage Journey Tracker**: Clickable stages with hover tooltips and direct stage navigation.
   - **"Next Best Action" Spotlight**: Highly prominent banner prioritizing incomplete tasks with direct resolution buttons.
   - **Trade Scope Toggle**: 🇮🇳 Domestic trade vs. 🌍 Cross-border international export.

4. **Product Setup & HS Code Intelligence**
   - Comprehensive product catalog manager.
   - **Live DGFT ITC-HS Code Database**: Search across chapters with RoDTEP incentives, GST rates, and statutory export certificate conditions.

5. **Single-Question Export Eligibility Assessment**
   - Step-by-step interactive questionnaire evaluating GSTIN, IEC, AD Code, LUT/Bond, quality certificates, and ISPM-15 compliance.
   - Animated readiness score breakdown by business dimension.

6. **Centralized Document Vault**
   - Complete lifecycle for 11 core trade documents: IEC, Commercial Invoice, Packing List, Shipping Bill, Bill of Entry, B/L / Airway Bill, Certificate of Origin, PAN, GSTIN, Company Registration, Product Quality NOC.
   - Status indicators: ✅ Available, ⚠️ Pending, ❌ Missing.
   - Full upload, preview, download sample templates, replace, and delete capabilities.

7. **AI Document Agent**
   - Interactive conversational assistant for missing documents (e.g., IEC).
   - Explains DGFT requirements, gathers entity information step-by-step, generates a formatted application draft dossier, and pushes directly to the Document Vault.
   - Strictly enforces clear distinction between AI guidance and official government issuance.

8. **Document Consistency Checker**
   - Compares Commercial Invoice vs. Packing List across 6 key trade metrics.
   - Flags discrepancies (weights, quantities, HS codes) with an instant **"Auto-Align & Reconcile"** fix.

9. **Dynamic Packaging & Labelling Engine**
   - Rules automatically adapt to **Product Type** × **Destination Country** (e.g., German LUCID packaging laws & care labels vs. US FDA Prior Notice vs. UAE Arabic bilingual labels).
   - Packaging type selector (Corrugated carton, food-grade pouch, glass, metal, vacuum, EPAL pallet).
   - 🛡 Product Protection checklist (Moisture, shock, temperature, tamper evident).

10. **Importer / Receiver Recommendation**
    - **Mode A (Importer Known)**: Compares Ocean (Ship), Air (Plane), and Multimodal cargo transit days and freight costs.
    - **Mode B (Importer Unknown)**: AI Market Finder recommending top foreign importing markets with trade agreement tariffs and demand sizes.

11. **Export Profitability Simulator & Expert Risk Score**
    - Sliders for foreign price, exchange rate, FOB cost, freight, packaging, and RoDTEP cash back.
    - Computes net profit, margin %, and provides an **Expert Risk Score** (Low / Medium / High with practical MSME advice).

12. **Logistics Planning, Timeline & Cargo Insurance**
    - Visual intermodal movement from factory to destination warehouse.
    - Total Export Cost breakdown visualizer.
    - 8-stage 28-day Export Timeline.
    - Marine Cargo Insurance stage (Institute Cargo Clauses A/B/C).

13. **Final Shipment Review & Live Tracking Hub**
    - Pre-dispatch summary modal with celebration feedback.
    - Live Map-style Route visualizer from India to Europe.
    - 8-milestone live tracking timeline with telemetry (knots, reefer temperature, ETA).
    - Interactive transit station simulator.

14. **Export Terminology Glossary & Help**
    - Searchable dictionary explaining IEC, HS Code, CHA, Bill of Lading, AWB, CoO, AD Code, LUT, ICEGATE, and Incoterms.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS (Custom navy/teal/cyan palette, glassmorphism, responsive breakpoints)
- **Icons**: Lucide React
- **Animations**: Canvas Trade Globe, SVG Gauges, Canvas Confetti

---

## 🏃 Getting Started

```bash
# Clone the repository
git clone https://github.com/Neelkore25/logistic.git

# Navigate into project directory
cd logistic

# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

---

## 📄 License

MIT License © 2026 ExportReady
