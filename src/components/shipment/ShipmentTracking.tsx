import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Ship,
  MapPin,
  CheckCircle2,
  Clock,
  Navigation,
  Compass,
  DollarSign,
  Layers,
  ArrowRight,
  Sparkles,
  CircleDot,
  Radio
} from 'lucide-react';

export const ShipmentTracking: React.FC = () => {
  const { activeShipment, advanceShipmentMilestone, selectedProduct, userProfile } = useApp();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
            🏁 Delivered
          </span>
        );
      case 'in_transit':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border border-teal-300 animate-pulse">
            🚢 In Transit
          </span>
        );
      case 'dispatched':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border border-sky-300">
            🚚 Dispatched
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300">
            📦 Shipment Created
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      
      {/* SECTION 28: Tracking Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Shipment #{activeShipment.trackingNumber}
            </h1>
            {getStatusBadge(activeShipment.status)}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time intermodal GPS telemetry & port customs milestone tracking.
          </p>
        </div>

        {/* Action: Advance Tracking Simulator */}
        <button
          onClick={advanceShipmentMilestone}
          className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-400 hover:to-sky-500 shadow-glow-teal flex items-center gap-2 cursor-pointer transition-all"
          title="Simulate container moving forward along voyage"
        >
          <Radio className="w-4 h-4 text-emerald-300 animate-pulse" />
          <span>Simulate Next Transit Station</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* SECTION 26: Visual Shipment Journey Corridor (Palghar ➔ Mumbai ➔ International ➔ Receiver) */}
      <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/60 shadow-lg space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Intermodal Transit Route Corridor
          </span>
          <span className="text-xs font-semibold text-teal-600 dark:text-teal-400">
            Container: {activeShipment.containerNo}
          </span>
        </div>

        {/* 4-Node Journey Visualizer (Section 26 requirement) */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-teal-50/60 dark:bg-teal-950/40 border border-teal-300 dark:border-teal-800">
            <span className="text-[10px] font-bold text-teal-700 dark:text-teal-300 uppercase">Origin Facility</span>
            <h4 className="font-bold text-slate-900 dark:text-white mt-1">Palghar (Maharashtra)</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Factory Stuffing Complete</p>
          </div>

          <div className="p-3.5 rounded-xl bg-sky-50/60 dark:bg-sky-950/40 border border-sky-300 dark:border-sky-800">
            <span className="text-[10px] font-bold text-sky-700 dark:text-sky-300 uppercase">Indian Customs Port</span>
            <h4 className="font-bold text-slate-900 dark:text-white mt-1">JNPT Nhava Sheva, Mumbai</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">LEO Cleared & Vessel Loaded</p>
          </div>

          <div className="p-3.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-300 dark:border-indigo-800">
            <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 uppercase">International Port</span>
            <h4 className="font-bold text-slate-900 dark:text-white mt-1">Port of Hamburg, Germany</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">DEHAM Zoll Entry In-Progress</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Destination Receiver</span>
            <h4 className="font-bold text-slate-900 dark:text-white mt-1">Munich Warehouse</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Delivery Order Pending</p>
          </div>
        </div>
      </div>

      {/* SECTION 28: MAP-STYLE ROUTE VISUALIZATION & LIVE TELEMETRY */}
      <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/60 shadow-xl space-y-6">
        
        {/* Map Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <Compass className="w-5 h-5 text-teal-500" />
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                India 🇮🇳 ➔ International Destination Map Route
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Live Vessel: {activeShipment.vesselFlightNo} • Carrier: {activeShipment.carrierName}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold uppercase text-slate-400">Estimated Arrival (ETA)</span>
            <p className="text-sm font-extrabold text-teal-600 dark:text-teal-400">
              {activeShipment.estimatedArrival}
            </p>
          </div>
        </div>

        {/* Interactive Stylized Map Canvas Container */}
        <div className="relative rounded-2xl overflow-hidden bg-slate-950 p-6 min-h-[260px] flex flex-col justify-between border border-slate-800">
          
          {/* Subtle grid pattern & water glow */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e3a63_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
          <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Map Nodes & SVG Arc */}
          <div className="relative z-10 w-full my-auto py-8">
            <svg viewBox="0 0 800 200" className="w-full h-auto drop-shadow-md">
              <defs>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>

              {/* Background Path */}
              <path
                d="M 120 140 Q 300 40 460 90 T 700 70"
                fill="none"
                stroke="rgba(45, 212, 191, 0.25)"
                strokeWidth="3"
                strokeDasharray="6,6"
              />

              {/* Progress Path */}
              <path
                d="M 120 140 Q 300 40 460 90"
                fill="none"
                stroke="url(#routeGradient)"
                strokeWidth="4"
              />

              {/* Origin: India (JNPT) */}
              <circle cx="120" cy="140" r="8" fill="#10b981" />
              <circle cx="120" cy="140" r="14" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.5" className="animate-ping" />
              <text x="90" y="170" fill="#ffffff" fontSize="12" fontWeight="bold">🇮🇳 JNPT Mumbai</text>

              {/* Midpoint: Suez Transit */}
              <circle cx="460" cy="90" r="6" fill="#06b6d4" />
              <text x="430" y="65" fill="#38bdf8" fontSize="11" fontWeight="bold">Suez Convoy 🚢</text>

              {/* Destination: Hamburg */}
              <circle cx="700" cy="70" r="8" fill="#38bdf8" />
              <text x="640" y="100" fill="#ffffff" fontSize="12" fontWeight="bold">🇩🇪 Port of Hamburg</text>
            </svg>
          </div>

          {/* Telemetry Status Bar */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-4 border-t border-slate-800 text-slate-300">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Speed Over Ground</span>
              <p className="font-bold text-white">18.4 Knots (Cruising)</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Reefer Container Temp</span>
              <p className="font-bold text-teal-400">+19.8°C (Optimal)</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Total Insured Value</span>
              <p className="font-bold text-white">₹10,82,400 (110% CIF)</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Next Port of Call</span>
              <p className="font-bold text-sky-400">Port Said (ETA 4d)</p>
            </div>
          </div>

        </div>

        {/* SECTION 28: SHIPMENT TIMELINE MILESTONES */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Shipment Timeline & Milestone Checklist
            </h4>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {activeShipment.milestones.filter(m => m.completed).length} of {activeShipment.milestones.length} Milestones Cleared
            </span>
          </div>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
            {activeShipment.milestones.map((m, idx) => (
              <div key={m.id} className="relative flex items-start gap-3.5 group">
                
                {/* Node icon */}
                <div
                  className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                    m.completed
                      ? 'bg-emerald-500 text-white ring-4 ring-emerald-500/20'
                      : m.current
                      ? 'bg-sky-500 text-white ring-4 ring-sky-500/20 animate-pulse'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  {m.completed ? '✓' : idx + 1}
                </div>

                {/* Milestone Details */}
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h5 className={`text-xs sm:text-sm font-bold ${
                      m.completed ? 'text-slate-900 dark:text-white' : m.current ? 'text-sky-600 dark:text-sky-400 font-extrabold' : 'text-slate-400'
                    }`}>
                      {m.title}
                    </h5>
                    {m.timestamp && (
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                        {m.timestamp}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Location: {m.location} • {m.description}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
