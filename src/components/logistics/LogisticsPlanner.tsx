import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ExportCostBreakdown } from './ExportCostBreakdown';
import { ExportTimeline } from './ExportTimeline';
import { CargoInsurance } from './CargoInsurance';
import { ShipmentReviewModal } from '../shipment/ShipmentReviewModal';
import {
  Compass,
  ArrowRight,
  Truck,
  Ship,
  Landmark,
  MapPin,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';

export const LogisticsPlanner: React.FC = () => {
  const { selectedProduct, activeShipment, setActiveTab } = useApp();
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Logistics & Shipment Planning
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
              Corridor: JNPT ➔ Hamburg
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Review planned shipment movements, total CIF costs, movement duration, and maritime insurance.
          </p>
        </div>

        <button
          onClick={() => setReviewModalOpen(true)}
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-400 hover:to-sky-500 shadow-glow-teal flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <span>Final Shipment Review</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* SECTION 22: Planned Shipment Movement Visualization */}
      <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/60 shadow-lg space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-teal-500" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Planned Intermodal Cargo Movement
            </h3>
          </div>
          <span className="text-xs font-bold text-teal-600 dark:text-teal-400">
            Carrier: Maersk Line • 20ft FCL Reefer
          </span>
        </div>

        {/* Route Chain Visualizer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850">
            <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold mb-1">
              <Truck className="w-4 h-4" />
              <span>1. Factory Stuffing</span>
            </div>
            <p className="font-bold text-slate-900 dark:text-white">Palghar Agro Processing Hub</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Container stuffing & seal #IND-90214</p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850">
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-bold mb-1">
              <Landmark className="w-4 h-4" />
              <span>2. Origin Port Customs</span>
            </div>
            <p className="font-bold text-slate-900 dark:text-white">JNPT Nhava Sheva (INNSA)</p>
            <p className="text-[11px] text-slate-500 mt-0.5">LEO clearance & vessel loading</p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold mb-1">
              <Ship className="w-4 h-4" />
              <span>3. Ocean Transit</span>
            </div>
            <p className="font-bold text-slate-900 dark:text-white">Port of Hamburg (DEHAM)</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Maritime voyage via Suez Canal</p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold mb-1">
              <MapPin className="w-4 h-4" />
              <span>4. Final Receiver Delivery</span>
            </div>
            <p className="font-bold text-slate-900 dark:text-white">Munich Bavaria Warehouse</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Delivery order acknowledgment</p>
          </div>

        </div>
      </div>

      {/* SECTION 23: Total Export Cost Breakdown */}
      <ExportCostBreakdown />

      {/* SECTION 24: Export Timeline */}
      <ExportTimeline />

      {/* SECTION 25: Cargo Insurance Stage */}
      <CargoInsurance />

      {/* Modal: Final Shipment Review (Section 27) */}
      <ShipmentReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
      />

    </div>
  );
};
