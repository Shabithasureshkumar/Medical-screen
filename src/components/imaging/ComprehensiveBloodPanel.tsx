import React from 'react';
import { bloodMetricsData } from '../../data/imagingData';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export const ComprehensiveBloodPanel: React.FC = () => {
  return (
    <div className="w-full h-full bg-white/70 backdrop-blur-[20px] rounded-[24px] border border-white/40 shadow-sm p-4 sm:p-6 lg:p-7 flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-col gap-1 pb-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg sm:text-xl lg:text-[22px] font-bold text-[#191C1E] tracking-tight font-inter">
            Comprehensive Blood Panel
          </h2>
          <span className="px-3 py-1 rounded-full bg-[#DCFCE7] text-[#15803D] text-xs font-bold font-inter tracking-wide shrink-0">
            Completed
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#484555] font-normal font-inter">
          Collected: Oct 24, 2023 • Ordered by Dr. Patel
        </p>
      </div>

      {/* 2x2 Metric Cards Grid */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 md:gap-4">
        {bloodMetricsData.map((metric) => {
          return (
            <div
              key={metric.id}
              className="bg-white/50 backdrop-blur-[12px] rounded-[18px] sm:rounded-[20px] border border-[hsla(260,64%,53%,0.20)] p-3.5 sm:p-4 lg:p-5 shadow-[0px_8px_32px_rgba(79,140,255,0.05)] flex flex-col justify-between transition-all hover:shadow-md"
            >
              {/* Row 1: Metric Name & Trend */}
              <div className="flex items-start justify-between gap-1">
                <span className="text-xs sm:text-sm font-medium text-[#484555] font-inter truncate">
                  {metric.name}
                </span>
                <div className="flex items-center gap-0.5 shrink-0" style={{ color: metric.trendColor }}>
                  {metric.trendDirection === 'up' && <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />}
                  {metric.trendDirection === 'down' && <ArrowDownRight className="w-3 h-3 stroke-[2.5]" />}
                  {metric.trendDirection === 'stable' && <Minus className="w-3 h-3 stroke-[2.5]" />}
                  <span className="text-[10px] font-bold font-inter">{metric.trendText}</span>
                </div>
              </div>

              {/* Row 2: Value & Unit */}
              <div className="flex items-baseline gap-1.5 my-2">
                <span className="text-2xl sm:text-3xl font-bold text-[#191C1E] font-inter tracking-tight leading-none">
                  {metric.value}
                </span>
                <span className="text-xs font-normal text-[#484555] font-inter">
                  {metric.unit}
                </span>
              </div>

              {/* Row 3: Status Badge */}
              <div className="self-start">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-[10px] sm:text-[11px] font-bold font-inter tracking-wider ${
                    metric.statusType === 'near-limit'
                      ? 'bg-[#FFFBEB] text-[#D97706]'
                      : 'bg-[#ECFDF5] text-[#059669]'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      metric.statusType === 'near-limit' ? 'bg-[#D97706]' : 'bg-[#059669]'
                    }`}
                  />
                  {metric.statusBadge}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
