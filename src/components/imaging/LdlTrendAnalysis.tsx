import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

interface LdlTrendAnalysisProps {
  onPeriodChange?: (period: '1Y' | '5Y' | 'Max') => void;
}

export const LdlTrendAnalysis: React.FC<LdlTrendAnalysisProps> = ({ onPeriodChange }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'1Y' | '5Y' | 'Max'>('1Y');
  const [activePointIndex, setActivePointIndex] = useState<number>(4); // Default to latest (May '26)

  const handlePeriodClick = (period: '1Y' | '5Y' | 'Max') => {
    setSelectedPeriod(period);
    setActivePointIndex(4);
    onPeriodChange?.(period);
  };

  const periodDatasets = {
    '1Y': {
      subtitle: 'LDL-C (mg/dL) — Last 12 Months',
      path: 'M 60 115 C 110 115, 120 108, 165 108 C 215 108, 230 92, 270 92 C 320 92, 340 88, 375 88 C 420 88, 440 80, 480 80',
      commentaryHighlight: 'by 25 points (22.7%) over the last 12 months',
      commentaryDetail:
        'The sharpest rise (+13 mg/dL) occurred between October 2025 and January 2026, followed by a further 5-point increase since March.',
      points: [
        { label: "JUN '25", date: 'Jun 14, 2025', value: 110, x: 60, y: 115, status: 'Elevated' },
        { label: "OCT '25", date: 'Oct 20, 2025', value: 115, x: 165, y: 108, status: 'Elevated' },
        { label: "JAN '26", date: 'Jan 12, 2026', value: 128, x: 270, y: 92, status: 'Borderline' },
        { label: "MAR '26", date: 'Mar 05, 2026', value: 130, x: 375, y: 88, status: 'High' },
        { label: "MAY '26", date: 'May 25, 2026', value: 135, x: 480, y: 80, status: 'High' }
      ]
    },
    '5Y': {
      subtitle: 'LDL-C (mg/dL) — 5-Year Historical View',
      path: 'M 60 134 C 110 134, 120 125, 165 125 C 215 125, 230 117, 270 117 C 320 117, 340 108, 375 108 C 420 108, 440 80, 480 80',
      commentaryHighlight: 'by 39 points (40.6%) over the last 5 years',
      commentaryDetail:
        'Levels remained near the optimal <100 mg/dL threshold in 2022–2023 before trending upward through 2025–2026.',
      points: [
        { label: '2022', date: 'May 18, 2022', value: 96, x: 60, y: 134, status: 'Optimal' },
        { label: '2023', date: 'Jun 09, 2023', value: 102, x: 165, y: 125, status: 'Elevated' },
        { label: '2024', date: 'May 22, 2024', value: 108, x: 270, y: 117, status: 'Elevated' },
        { label: '2025', date: 'Oct 20, 2025', value: 115, x: 375, y: 108, status: 'Elevated' },
        { label: '2026', date: 'May 25, 2026', value: 135, x: 480, y: 80, status: 'High' }
      ]
    },
    Max: {
      subtitle: 'LDL-C (mg/dL) — All-Time Clinical History',
      path: 'M 60 140 C 110 140, 120 135, 165 135 C 215 135, 230 125, 270 125 C 320 125, 340 108, 375 108 C 420 108, 440 80, 480 80',
      commentaryHighlight: 'by 43 points (46.7%) since baseline records in 2020',
      commentaryDetail:
        'Long-term tracking shows optimal readings (92–95 mg/dL) in 2020–2021 followed by gradual progression to 135 mg/dL.',
      points: [
        { label: '2020', date: 'Apr 10, 2020', value: 92, x: 60, y: 140, status: 'Optimal' },
        { label: '2021', date: 'May 14, 2021', value: 95, x: 165, y: 135, status: 'Optimal' },
        { label: '2023', date: 'Jun 09, 2023', value: 102, x: 270, y: 125, status: 'Elevated' },
        { label: '2025', date: 'Oct 20, 2025', value: 115, x: 375, y: 108, status: 'Elevated' },
        { label: '2026', date: 'May 25, 2026', value: 135, x: 480, y: 80, status: 'High' }
      ]
    }
  };

  const currentDataset = periodDatasets[selectedPeriod];
  const points = currentDataset.points;
  const activePoint = points[activePointIndex] || points[points.length - 1];

  return (
    <div className="w-full h-full bg-white/70 backdrop-blur-md rounded-2xl border border-[#7B61FF]/20 shadow-sm p-4 sm:p-6 transition-all duration-300 flex flex-col justify-between">
      {/* Top Group: Header and SVG Chart */}
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#1E1B4B]">
            LDL Trend Analysis
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {currentDataset.subtitle}
          </p>
        </div>

        {/* Period Selector Tabs */}
        <div className="inline-flex p-1 bg-slate-100/80 rounded-xl self-start sm:self-auto border border-slate-200/50">
          {(['1Y', '5Y', 'Max'] as const).map((period) => (
            <button
              key={period}
              type="button"
              onClick={() => handlePeriodClick(period)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                selectedPeriod === period
                  ? 'bg-white text-[#6B38D4] shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Trend Chart */}
      <div className="relative w-full mt-4 pt-2">
        <div className="w-full overflow-x-auto overflow-y-hidden">
          <svg
            viewBox="0 0 540 220"
            className="w-full h-auto min-w-[320px] max-w-full overflow-visible select-none"
          >
            <defs>
              <linearGradient id="optimalGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.02" />
              </linearGradient>
              <linearGradient id="trendStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="70%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EF4444" />
              </linearGradient>
            </defs>

            {/* Optimal Range Background Band (< 100 mg/dL, from y=128 to y=190) */}
            <rect
              x="30"
              y="128"
              width="480"
              height="62"
              fill="url(#optimalGrad)"
              rx="6"
            />
            {/* Dashed optimal threshold line */}
            <line
              x1="30"
              y1="128"
              x2="510"
              y2="128"
              stroke="#10B981"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              strokeOpacity="0.6"
            />
            {/* Optimal Tag */}
            <g transform="translate(36, 134)">
              <rect
                x="0"
                y="0"
                width="100"
                height="18"
                rx="4"
                fill="#ECFDF5"
                stroke="#10B981"
                strokeWidth="0.75"
              />
              <text
                x="50"
                y="12"
                textAnchor="middle"
                fontSize="9"
                fontWeight="700"
                fill="#059669"
                fontFamily="sans-serif"
              >
                OPTIMAL (&lt; 100)
              </text>
            </g>

            {/* Grid horizontal lines */}
            <line x1="30" y1="50" x2="510" y2="50" stroke="#F1F5F9" strokeWidth="1" />
            <line x1="30" y1="88" x2="510" y2="88" stroke="#F1F5F9" strokeWidth="1" />

            {/* Trend Curve */}
            <path
              d={currentDataset.path}
              fill="none"
              stroke="url(#trendStroke)"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Interactive Data Nodes */}
            {points.map((pt, idx) => {
              const isSelected = activePointIndex === idx;
              const isLast = idx === points.length - 1;
              return (
                <g
                  key={pt.label}
                  className="cursor-pointer"
                  onClick={() => setActivePointIndex(idx)}
                >
                  {/* Outer pulse circle if selected */}
                  {isSelected && (
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="12"
                      fill={isLast ? '#EF4444' : '#6366F1'}
                      fillOpacity="0.2"
                      className="animate-pulse"
                    />
                  )}
                  {/* Main dot */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isSelected ? '6' : '4.5'}
                    fill="#FFFFFF"
                    stroke={isLast ? '#EF4444' : '#6366F1'}
                    strokeWidth="3"
                  />
                  {/* Month Label */}
                  <text
                    x={pt.x}
                    y="205"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight={isSelected ? '700' : '500'}
                    fill={isSelected ? '#1E1B4B' : '#94A3B8'}
                    fontFamily="sans-serif"
                  >
                    {pt.label}
                  </text>
                </g>
              );
            })}

            {/* Active Point Tooltip / Floating Card */}
            {activePoint && (
              <g transform={`translate(${Math.max(30, Math.min(410, activePoint.x - 65))}, ${Math.max(10, activePoint.y - 65)})`}>
                <rect
                  x="0"
                  y="0"
                  width="130"
                  height="48"
                  rx="8"
                  fill="#1E1B4B"
                  filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))"
                />
                <text
                  x="65"
                  y="18"
                  textAnchor="middle"
                  fontSize="10"
                  fill="#CBD5E1"
                  fontWeight="500"
                  fontFamily="sans-serif"
                >
                  {activePoint.date}
                </text>
                <text
                  x="65"
                  y="36"
                  textAnchor="middle"
                  fontSize="11"
                  fill="#FFFFFF"
                  fontWeight="700"
                  fontFamily="sans-serif"
                >
                  LDL: {activePoint.value} mg/dL ({activePoint.status})
                </text>
              </g>
            )}
          </svg>
        </div>
      </div>
      </div>

      {/* Trend Commentary Card */}
      <div className="mt-auto pt-4">
        <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/70 flex items-start gap-3">
        <div className="p-1.5 rounded-lg bg-[#F5F3FF] text-[#6B38D4] shrink-0 mt-0.5">
          <TrendingUp className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <span className="text-xs font-bold text-[#1E1B4B] block">
            Trend Commentary
          </span>
          <p className="text-xs text-slate-600 leading-relaxed">
            &ldquo;Your LDL levels have risen{' '}
            <span className="text-[#6B38D4] font-semibold">{currentDataset.commentaryHighlight}</span>
            . {currentDataset.commentaryDetail}&rdquo;
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};
