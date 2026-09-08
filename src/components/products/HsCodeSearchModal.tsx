import React, { useState } from 'react';
import { HS_CODES_DATABASE, HsCodeRecord } from '../../data/hsCodes';
import { X, Search, Check, FileCheck, ArrowRight, Sparkles } from 'lucide-react';

interface HsCodeSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (record: HsCodeRecord) => void;
}

export const HsCodeSearchModal: React.FC<HsCodeSearchModalProps> = ({
  isOpen,
  onClose,
  onSelect
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const filteredCodes = HS_CODES_DATABASE.filter(item => {
    const matchesSearch =
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.shortCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || item.type === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white dark:bg-navy-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700/80 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-navy-850 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Search ITC-HS (Harmonized System) Code
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Official Indian DGFT 8-digit tariff code classification with incentive rates
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar & Filters */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 space-y-3 bg-white dark:bg-navy-900">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              autoFocus
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by product name (e.g. Cashew, Cotton, Spices) or code (e.g. 0801, 6109)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 text-[11px] font-semibold">Filter:</span>
            {['all', 'food', 'agriculture', 'textile', 'electronics', 'medicine'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-colors ${
                  selectedCategory === cat
                    ? 'bg-teal-500 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* List of HS codes */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {filteredCodes.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              No matching HS codes found. Try searching for "Cashew", "Cotton", or "Pepper".
            </div>
          ) : (
            filteredCodes.map(record => (
              <div
                key={record.code}
                onClick={() => {
                  onSelect(record);
                  onClose();
                }}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-teal-500/80 bg-slate-50/50 dark:bg-navy-850 hover:bg-teal-50/30 dark:hover:bg-teal-950/20 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono font-bold text-xs sm:text-sm text-teal-600 dark:text-teal-400 px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950/80 border border-teal-200 dark:border-teal-800">
                      {record.code}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      Chapter {record.shortCode}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-navy-800 text-slate-700 dark:text-slate-300">
                      {record.category}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      RoDTEP: {record.rodtepRate}
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {record.name}
                  </h4>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Mandatory: </span>
                    {record.mandatoryCert}
                  </p>

                  <p className="text-[11px] text-slate-400 dark:text-slate-500 italic">
                    {record.notes}
                  </p>
                </div>

                <button
                  type="button"
                  className="shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-100 dark:bg-teal-900/50 group-hover:bg-teal-500 group-hover:text-white transition-all flex items-center justify-center gap-1"
                >
                  <span>Select</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
