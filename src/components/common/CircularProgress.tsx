import React from 'react';

interface CircularProgressProps {
  value: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  className?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 180,
  strokeWidth = 14,
  label,
  sublabel,
  className = ''
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedValue = Math.min(100, Math.max(0, value));
  const strokeDashoffset = circumference - (clampedValue / 100) * circumference;

  // Determine color based on readiness percentage
  const getColorGradient = () => {
    if (clampedValue >= 80) return ['#14b8a6', '#10b981']; // Teal to Emerald
    if (clampedValue >= 50) return ['#0ea5e9', '#38bdf8']; // Blue to Cyan
    return ['#f59e0b', '#ef4444']; // Amber to Red
  };

  const [color1, color2] = getColorGradient();

  return (
    <div className={`relative inline-flex flex-col items-center justify-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id={`gradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color1} />
            <stop offset="100%" stopColor={color2} />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor={color1} floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-200 dark:text-slate-800/80 transition-colors"
          fill="transparent"
        />

        {/* Dynamic Progress Fill */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#gradient-${size})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          filter="url(#glow)"
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      {/* Center percentage label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white transition-colors">
          {clampedValue}%
        </span>
        {label && (
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-teal-300/90 mt-0.5">
            {label}
          </span>
        )}
      </div>

      {sublabel && (
        <span className="mt-3 text-sm text-slate-600 dark:text-slate-300 font-medium">
          {sublabel}
        </span>
      )}
    </div>
  );
};
