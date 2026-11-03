import React from 'react';
import { Activity } from 'lucide-react';

export const BiometricTrends: React.FC = () => {
  return (
    <div className="w-full h-full rounded-[22px] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3">
        <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
          <Activity className="w-3.5 h-3.5" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-[#1D1B20] font-inter tracking-tight">
          Biometric Health Trends
        </h3>
      </div>

      <div className="flex flex-col gap-3 sm:gap-3.5 flex-1">
        {/* Row 1: Blood Sugar + Cholesterol (LDL) */}
        <div className="grid grid-cols-2 gap-3 sm:gap-3.5 flex-1">
          {/* Blood Sugar Mini Chart */}
          <div className="bg-white/70 backdrop-blur-[13px] rounded-[16px] border border-[#727783]/20 p-3 sm:p-3.5 flex flex-col justify-between shadow-2xs">
            <div>
              <span className="text-[9px] sm:text-[10px] font-bold text-[#484555] uppercase tracking-wider font-inter block">
                BLOOD SUGAR
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-base sm:text-lg font-bold text-[#1D1B20] font-inter">92</span>
                <span className="text-[9px] sm:text-[10px] text-[#727783] font-medium font-inter">Avg mg/dL</span>
              </div>
            </div>

            {/* Bar Chart Visual */}
            <div className="h-16 sm:h-20 w-full flex items-end justify-between gap-1 pt-2">
              {[40, 55, 48, 70, 60, 52, 85].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center h-full justify-end">
                  <div
                    className={`w-full rounded-t-[3px] transition-all ${
                      i === 6 ? 'bg-[#3B82F6]' : 'bg-[#DBEAFE]'
                    }`}
                    style={{ height: `${val}%` }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Cholesterol (LDL) Mini Chart */}
          <div className="bg-white/70 backdrop-blur-[13px] rounded-[16px] border border-[#727783]/20 p-3 sm:p-3.5 flex flex-col justify-between shadow-2xs">
            <div>
              <span className="text-[9px] sm:text-[10px] font-bold text-[#484555] uppercase tracking-wider font-inter block">
                CHOLESTEROL (LDL)
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-base sm:text-lg font-bold text-[#1D1B20] font-inter">135</span>
                <span className="text-[9px] sm:text-[10px] text-[#727783] font-medium font-inter">Latest mg/dL</span>
              </div>
            </div>

            {/* Smooth Line Chart Visual */}
            <div className="h-16 sm:h-20 w-full flex items-end pt-2 relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 50" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="ldlGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Area Fill */}
                <path
                  d="M 0,35 Q 25,40 50,30 T 100,15 L 100,50 L 0,50 Z"
                  fill="url(#ldlGrad)"
                />
                {/* Line */}
                <path
                  d="M 0,35 Q 25,40 50,30 T 100,15"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Row 2: Blood Pressure Wide Chart */}
        <div className="bg-white/70 backdrop-blur-[13px] rounded-[16px] border border-[#727783]/20 p-3 sm:p-3.5 flex flex-col justify-between shadow-2xs">
          <div>
            <span className="text-[9px] sm:text-[10px] font-bold text-[#484555] uppercase tracking-wider font-inter block">
              BLOOD PRESSURE
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-base sm:text-lg font-bold text-[#1D1B20] font-inter">118/76</span>
              <span className="text-[9px] sm:text-[10px] text-[#727783] font-medium font-inter">Avg mmHg</span>
            </div>
          </div>

          {/* Blood Pressure Range Bars Visual */}
          <div className="h-16 sm:h-20 w-full flex items-end justify-between gap-1.5 sm:gap-2 pt-2">
            {[
              { top: 22, height: 45, bottom: 20 },
              { top: 18, height: 50, bottom: 22 },
              { top: 28, height: 42, bottom: 20 },
              { top: 15, height: 55, bottom: 24 },
              { top: 20, height: 50, bottom: 20 },
              { top: 24, height: 46, bottom: 22 },
              { top: 32, height: 38, bottom: 18 },
              { top: 16, height: 52, bottom: 22 },
              { top: 20, height: 48, bottom: 20 },
            ].map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full">
                {/* Systolic Range Pill */}
                <div
                  className="w-full max-w-[18px] rounded-full bg-gradient-to-b from-[#C4B5FD] to-[#8B5CF6] transition-all"
                  style={{ height: `${col.height}%`, marginBottom: `${col.bottom * 0.2}px` }}
                />
                {/* Diastolic Dot */}
                <div
                  className="w-full max-w-[18px] h-2 rounded-full bg-[#DDD6FE] mt-1"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
