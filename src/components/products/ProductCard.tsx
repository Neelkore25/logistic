import React from 'react';
import { ProductItem } from '../../types/export';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Award, Package, ArrowRight, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: ProductItem;
  isSelected: boolean;
  onSelect: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, isSelected, onSelect }) => {
  const getBadgeColor = (score: number) => {
    if (score >= 80) return 'text-emerald-700 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300';
    if (score >= 60) return 'text-sky-700 bg-sky-100 dark:bg-sky-950 dark:text-sky-300 border-sky-300';
    return 'text-amber-700 bg-amber-100 dark:bg-amber-950 dark:text-amber-300 border-amber-300';
  };

  return (
    <div
      onClick={onSelect}
      className={`p-5 rounded-2xl border cursor-pointer transition-all relative overflow-hidden flex flex-col justify-between ${
        isSelected
          ? 'border-teal-500 bg-teal-50/20 dark:bg-teal-950/20 shadow-glow-teal ring-2 ring-teal-500/20'
          : 'glass-card border-slate-200 dark:border-slate-700/60 hover:border-slate-300 dark:hover:border-slate-600'
      }`}
    >
      <div>
        {/* Top bar: Category & Status */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {product.category}
          </span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getBadgeColor(
              product.readinessScore
            )}`}
          >
            Export Ready {product.readinessScore}%
          </span>
        </div>

        {/* Product Name */}
        <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
          {product.name}
        </h4>

        {/* HS Code */}
        <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-navy-800 text-xs font-mono font-semibold text-teal-600 dark:text-teal-400">
          <span>HS Code: {product.hsCode}</span>
        </div>

        {/* Description snippet */}
        <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Key Metrics */}
        <div className="mt-4 grid grid-cols-2 gap-2 pt-3 border-t border-slate-200/70 dark:border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 text-[11px]">Quantity & Unit</span>
            <p className="font-bold text-slate-800 dark:text-slate-200">
              {product.quantity.toLocaleString()} {product.unit}
            </p>
          </div>
          <div>
            <span className="text-slate-400 text-[11px]">Product Value</span>
            <p className="font-bold text-emerald-600 dark:text-emerald-400">
              ₹{product.productValue.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </div>

      {/* Footer / Active Selection State */}
      <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-between text-xs">
        <span className="text-slate-500 dark:text-slate-400">
          Origin: {product.origin.split(',')[0]}
        </span>
        {isSelected ? (
          <span className="inline-flex items-center gap-1 text-teal-600 dark:text-teal-400 font-bold">
            <CheckCircle2 className="w-4 h-4" /> Active for Shipment
          </span>
        ) : (
          <span className="text-slate-400 group-hover:text-slate-200 font-medium flex items-center gap-1">
            Select Product ➔
          </span>
        )}
      </div>
    </div>
  );
};
