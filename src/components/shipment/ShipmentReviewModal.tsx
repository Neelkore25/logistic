import React from 'react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import {
  X,
  CheckCircle2,
  Ship,
  MapPin,
  Calendar,
  DollarSign,
  ShieldCheck,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface ShipmentReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShipmentReviewModal: React.FC<ShipmentReviewModalProps> = ({ isOpen, onClose }) => {
  const {
    userProfile,
    receiverProfile,
    selectedProduct,
    createNewShipment
  } = useApp();

  if (!isOpen) return null;

  const handleConfirm = () => {
    // Confetti explosion
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore in test environments
    }

    createNewShipment({
      productName: selectedProduct.name,
      quantity: `${selectedProduct.quantity.toLocaleString()} ${selectedProduct.unit}`,
      totalValueInr: selectedProduct.productValue
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-navy-900 rounded-2xl shadow-2xl border border-teal-500/40 overflow-hidden my-8 animate-in zoom-in-95">
        
        {/* SECTION 27: Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-navy-900 via-navy-850 to-teal-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30">
              <Ship className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                Pre-Dispatch Verification
              </span>
              <h3 className="text-lg font-bold text-white">
                Review Shipment & Confirm Booking
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: SECTION 27 Fields */}
        <div className="p-6 space-y-4 text-xs">
          
          {/* Sender & Receiver Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850">
              <span className="text-[10px] font-bold uppercase text-slate-400">Sender (Indian Exporter)</span>
              <p className="font-bold text-slate-900 dark:text-white mt-1 text-sm">{userProfile.businessName}</p>
              <p className="text-slate-500 mt-0.5">{userProfile.location}</p>
              <p className="text-slate-500 mt-0.5">Contact: {userProfile.phone}</p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850">
              <span className="text-[10px] font-bold uppercase text-slate-400">Receiver (Importer / Buyer)</span>
              <p className="font-bold text-slate-900 dark:text-white mt-1 text-sm">{receiverProfile.businessName}</p>
              <p className="text-slate-500 mt-0.5">{receiverProfile.location}</p>
              <p className="text-slate-500 mt-0.5">EORI: {receiverProfile.importerCode}</p>
            </div>
          </div>

          {/* Product Details */}
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-400">Product Specification</span>
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white text-sm">{selectedProduct.name}</span>
              <span className="font-bold text-teal-600 dark:text-teal-400">HS {selectedProduct.hsCode}</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-300 pt-1">
              <span>Quantity: {selectedProduct.quantity.toLocaleString()} {selectedProduct.unit}</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">Value: ₹{selectedProduct.productValue.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Route & Transport */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850">
              <span className="text-[10px] font-bold uppercase text-slate-400">Route Corridor</span>
              <p className="font-bold text-slate-900 dark:text-white mt-1">Palghar ➔ JNPT Mumbai ➔ Port of Hamburg</p>
              <p className="text-slate-500 mt-0.5">Transit via Arabian Sea & Suez Canal</p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850">
              <span className="text-[10px] font-bold uppercase text-slate-400">Logistics & Mode</span>
              <p className="font-bold text-slate-900 dark:text-white mt-1">Ocean Freight (20ft FCL Container)</p>
              <p className="text-slate-500 mt-0.5">Carrier: Maersk Line • Reefer +20°C</p>
            </div>
          </div>

          {/* Insurance & Financials Summary */}
          <div className="p-4 rounded-xl bg-teal-50/60 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-teal-700 dark:text-teal-300">Cargo Insurance</span>
              <p className="font-bold text-slate-900 dark:text-white mt-0.5">
                Marine All-Risk (ICC-A 110%) • Active Policy #NIA-MAR-77391
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase text-teal-700 dark:text-teal-300">Estimated Cost & Timeline</span>
              <p className="font-extrabold text-slate-900 dark:text-white text-sm mt-0.5">
                ₹8,03,000 CIF • 28 Days
              </p>
            </div>
          </div>

        </div>

        {/* Footer with Primary Action: Confirm & Create Shipment */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-navy-850 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-800"
          >
            Modify Details
          </button>

          <button
            onClick={handleConfirm}
            className="px-6 py-3 rounded-xl text-xs font-black text-white bg-gradient-to-r from-teal-500 via-teal-600 to-sky-600 hover:from-teal-400 hover:to-sky-500 shadow-glow-teal flex items-center gap-2 transition-all transform active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Confirm & Create Shipment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
