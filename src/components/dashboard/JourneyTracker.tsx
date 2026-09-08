import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { JourneyStage, StageStatus } from '../../types/export';
import {
  Building2,
  ShieldCheck,
  FileText,
  Award,
  PackageCheck,
  Users,
  Truck,
  Landmark,
  ShieldAlert,
  Ship,
  MapPin,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Circle,
  ArrowRight,
  Info
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  ShieldCheck,
  FileText,
  Award,
  PackageCheck,
  Users,
  Truck,
  Landmark,
  ShieldAlert,
  Ship,
  MapPin
};

export const JourneyTracker: React.FC = () => {
  const { journeyStages, jumpToJourneyStage } = useApp();
  const [hoveredStage, setHoveredStage] = useState<JourneyStage | null>(null);

  const getStatusBadge = (status: StageStatus) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Completed
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-600 dark:text-sky-400">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
            In Progress
          </span>
        );
      case 'action_required':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Action Required
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 dark:text-slate-500">
            <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"></span>
            Not Started
          </span>
        );
    }
  };

  const getStatusBorder = (status: StageStatus) => {
    switch (status) {
      case 'completed':
        return 'border-emerald-400/50 bg-emerald-50/20 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400';
      case 'in_progress':
        return 'border-sky-400/50 bg-sky-50/20 dark:bg-sky-950/20 text-sky-600 dark:text-sky-400';
      case 'action_required':
        return 'border-amber-400/60 bg-amber-50/20 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400';
      default:
        return 'border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500';
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/60 shadow-lg">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Export Journey Tracker
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
              11 Stages
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Click any stage to inspect compliance, upload documents, or execute logistics. Hover for instant guidance.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex-wrap">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Completed</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sky-500"></span> In Progress</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Action Required</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-400"></span> Not Started</span>
        </div>
      </div>

      {/* Interactive Horizontal / Responsive Stepper Grid */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11 gap-2.5">
        {journeyStages.map((stage, idx) => {
          const Icon = ICON_MAP[stage.iconName] || Circle;
          const isHovered = hoveredStage?.id === stage.id;

          return (
            <div
              key={stage.id}
              onMouseEnter={() => setHoveredStage(stage)}
              onMouseLeave={() => setHoveredStage(null)}
              onClick={() => jumpToJourneyStage(stage.id)}
              className={`p-3 rounded-xl border text-left cursor-pointer transition-all relative flex flex-col justify-between group ${getStatusBorder(stage.status)} ${
                isHovered ? 'scale-105 shadow-md ring-2 ring-teal-500/30' : 'hover:scale-[1.02]'
              }`}
            >
              {/* Top: Step number & Icon */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold opacity-60">
                  #{idx + 1}
                </span>
                <div className="p-1.5 rounded-lg bg-white/60 dark:bg-navy-900/60 shadow-xs">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              {/* Title & subtitle */}
              <div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-snug group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-1">
                  {stage.title}
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {stage.subtitle}
                </p>
              </div>

              {/* Status Indicator */}
              <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
                {getStatusBadge(stage.status)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Hovered / Focused Stage Explanation Drawer */}
      <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-navy-900/70 border border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Stage Guidance: {hoveredStage ? hoveredStage.title : journeyStages[2].title}
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-200 dark:bg-navy-800 text-slate-600 dark:text-slate-300">
                {hoveredStage ? hoveredStage.subtitle : journeyStages[2].subtitle}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              {hoveredStage ? hoveredStage.explanation : journeyStages[2].explanation}
            </p>
          </div>
        </div>

        <button
          onClick={() => jumpToJourneyStage(hoveredStage ? hoveredStage.id : 'documents')}
          className="shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>Open Stage Workarea</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
