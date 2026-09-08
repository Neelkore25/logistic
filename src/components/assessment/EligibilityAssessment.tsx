import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ASSESSMENT_QUESTIONS } from '../../data/assessmentQuestions';
import { CircularProgress } from '../common/CircularProgress';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Check
} from 'lucide-react';

export const EligibilityAssessment: React.FC = () => {
  const { readinessScore, setActiveTab, triggerToast } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'yes' | 'no' | 'not_sure'>>({
    1: 'yes',
    2: 'yes',
    3: 'yes',
    4: 'yes',
    5: 'yes',
    6: 'yes',
    7: 'yes'
  });
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = ASSESSMENT_QUESTIONS[currentIndex];

  const handleSelectOption = (value: 'yes' | 'no' | 'not_sure') => {
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: value
    }));

    if (currentIndex < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
      triggerToast('Assessment Completed', 'Your export readiness score has been calculated.', 'success');
    }
  };

  // Compute breakdown scores
  const businessScore = 95;
  const docsScore = answers[2] === 'yes' ? 88 : 45;
  const productScore = answers[5] === 'yes' ? 90 : 60;
  const packScore = answers[6] === 'yes' ? 85 : 40;
  const destScore = answers[7] === 'yes' ? 80 : 50;

  const totalScore = Math.round(
    (businessScore * 0.2) +
    (docsScore * 0.3) +
    (productScore * 0.2) +
    (packScore * 0.15) +
    (destScore * 0.15)
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Export Eligibility Assessment
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
              Guided Wizard
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Answer simple questions to determine your statutory readiness for international trade.
          </p>
        </div>

        {isCompleted && (
          <button
            onClick={() => {
              setIsCompleted(false);
              setCurrentIndex(0);
            }}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-navy-800 border border-slate-300 dark:border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Assessment</span>
          </button>
        )}
      </div>

      {!isCompleted ? (
        /* WIZARD: Show One Question at a Time (Section 14 requirement) */
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/60 shadow-xl relative overflow-hidden">
          
          {/* Progress Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
              Question {currentIndex + 1} of {ASSESSMENT_QUESTIONS.length}
            </span>
            <div className="flex items-center gap-1">
              {ASSESSMENT_QUESTIONS.map((q, idx) => (
                <div
                  key={q.id}
                  className={`w-5 h-1.5 rounded-full transition-all ${
                    idx === currentIndex
                      ? 'w-8 bg-teal-500'
                      : idx < currentIndex
                      ? 'bg-emerald-500'
                      : 'bg-slate-200 dark:bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Question Body */}
          <div className="py-6 space-y-3">
            <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300">
              Category: {currentQ.category}
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
              {currentQ.question}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {currentQ.explanation}
            </p>
          </div>

          {/* Options: Yes / No / Not Sure */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map(opt => {
              const isChosen = answers[currentQ.id] === opt.value;

              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelectOption(opt.value)}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between group cursor-pointer ${
                    isChosen
                      ? 'border-teal-500 bg-teal-50/40 dark:bg-teal-950/40 shadow-sm ring-2 ring-teal-500/20'
                      : 'border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 bg-white/70 dark:bg-navy-850'
                  }`}
                >
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {opt.label}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {opt.feedback}
                    </div>
                  </div>

                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                    isChosen
                      ? 'bg-teal-500 border-teal-500 text-white'
                      : 'border-slate-300 dark:border-slate-600 group-hover:border-teal-400 text-transparent'
                  }`}>
                    <Check className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Step Footer Navigation */}
          <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(prev => prev - 1)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 disabled:opacity-30"
            >
              Previous Question
            </button>

            <button
              onClick={() => {
                if (currentIndex < ASSESSMENT_QUESTIONS.length - 1) {
                  setCurrentIndex(prev => prev + 1);
                } else {
                  setIsCompleted(true);
                }
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 shadow-md flex items-center gap-1.5"
            >
              <span>{currentIndex === ASSESSMENT_QUESTIONS.length - 1 ? 'View Readiness Score' : 'Next Question'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      ) : (
        /* RESULTS: Export Readiness Score: 82 / 100 with smooth Breakdown */
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/60 shadow-xl space-y-6">
          
          <div className="text-center sm:text-left pb-4 border-b border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
              Assessment Results
            </span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
              Export Readiness Score: {readinessScore} / 100
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Based on your answers, your MSME demonstrates strong foundation for international trade with minor documentation items remaining.
            </p>
          </div>

          {/* Center Gauge and Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Score circle */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-50/70 dark:bg-navy-900/60 rounded-2xl border border-slate-200/60 dark:border-slate-800">
              <CircularProgress
                value={readinessScore}
                size={180}
                strokeWidth={14}
                label="Readiness"
              />
              <span className="mt-3 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                Tier-1 Indian Exporter Ready
              </span>
            </div>

            {/* Breakdown Bars (Section 14 requirement) */}
            <div className="md:col-span-8 space-y-3.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Score Breakdown by Dimension
              </h4>

              {/* Business */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700 dark:text-slate-300">1. Business Legal Setup (PAN, GSTIN, AD Code)</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{businessScore}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${businessScore}%` }} />
                </div>
              </div>

              {/* Documents */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700 dark:text-slate-300">2. Statutory Documents (IEC, LUT, Invoices)</span>
                  <span className="font-bold text-sky-600 dark:text-sky-400">{docsScore}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-sky-500 rounded-full transition-all duration-1000" style={{ width: `${docsScore}%` }} />
                </div>
              </div>

              {/* Product */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700 dark:text-slate-300">3. Product & Quality Certifications (FSSAI/APEDA)</span>
                  <span className="font-bold text-teal-600 dark:text-teal-400">{productScore}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-teal-500 rounded-full transition-all duration-1000" style={{ width: `${productScore}%` }} />
                </div>
              </div>

              {/* Packaging */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700 dark:text-slate-300">4. Packaging & ISPM-15 Protection Standards</span>
                  <span className="font-bold text-amber-500">{packScore}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full transition-all duration-1000" style={{ width: `${packScore}%` }} />
                </div>
              </div>

              {/* Destination */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700 dark:text-slate-300">5. Destination Country Compliance (Germany / EU)</span>
                  <span className="font-bold text-teal-600 dark:text-teal-400">{destScore}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-teal-500 rounded-full transition-all duration-1000" style={{ width: `${destScore}%` }} />
                </div>
              </div>
            </div>

          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Next Step: Upload remaining documents to bring score to 100%.
            </div>
            <button
              onClick={() => setActiveTab('vault')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-400 hover:to-sky-500 shadow-glow-teal flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <span>Go to Document Vault</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
