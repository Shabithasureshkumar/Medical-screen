import React from 'react';
import { ArrowUpRight, Folder, FlaskConical, Pill, Activity } from 'lucide-react';
import { HealthMetric } from '../../types/medical';

interface HealthOverviewCardsProps {
  metrics: HealthMetric[];
  onViewMetric?: (metricId: string) => void;
}

export const HealthOverviewCards: React.FC<HealthOverviewCardsProps> = ({
  metrics,
  onViewMetric
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 w-full">
      {metrics.map((metric) => {
        if (metric.iconType === 'records') {
          return (
            <div
              key={metric.id}
              className="group relative rounded-[21px] p-4 sm:p-5 bg-white/90 border border-white/60 shadow-[0_4px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between min-h-[146px] overflow-hidden backdrop-blur-md"
            >
              {/* Header inside card */}
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-[11px] bg-[#F4ECCD] flex items-center justify-center text-[#986F00] shadow-xs">
                  <Folder className="w-6 h-6 text-[#FEBA00] fill-[#FEBA00]/30" />
                </div>
                <span className="text-[11px] font-semibold text-[#494551] bg-[#F4ECCD]/60 px-2 py-0.5 rounded-full tracking-wide">
                  {metric.badge}
                </span>
              </div>

              {/* Title & View all */}
              <div className="mt-4">
                <h3 className="text-[14px] font-black tracking-wider uppercase bg-gradient-to-r from-[#FEBA00] to-[#986F00] bg-clip-text text-transparent">
                  {metric.title}
                </h3>
                <button
                  type="button"
                  onClick={() => onViewMetric?.(metric.id)}
                  className="mt-1 text-xs font-bold text-[#64748B] hover:text-amber-600 transition-colors cursor-pointer flex items-center gap-1"
                >
                  View all
                </button>
              </div>

              {/* Floating Action Circle */}
              <button
                type="button"
                onClick={() => onViewMetric?.(metric.id)}
                aria-label={`View ${metric.title}`}
                className="absolute right-4 bottom-4 w-10 h-10 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center text-slate-700 group-hover:scale-110 group-hover:text-amber-500 transition-all cursor-pointer"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          );
        }

        if (metric.iconType === 'labs') {
          return (
            <div
              key={metric.id}
              className="group relative rounded-[21px] p-4 sm:p-5 bg-white/90 border border-white/60 shadow-[0_4px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between min-h-[146px] overflow-hidden backdrop-blur-md"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-[11px] bg-purple-100/60 flex items-center justify-center text-[#5C24FF] shadow-xs">
                  <FlaskConical className="w-6 h-6 text-[#9F7CE6]" />
                </div>
                <span className="text-[11px] font-semibold text-purple-900 bg-purple-100 px-2 py-0.5 rounded-full tracking-wide">
                  {metric.badge}
                </span>
              </div>

              <div className="mt-4">
                <h3 className="text-[14px] font-black tracking-wider uppercase bg-gradient-to-b from-[#9F7CE6] to-[#5C24FF] bg-clip-text text-transparent">
                  {metric.title}
                </h3>
                <button
                  type="button"
                  onClick={() => onViewMetric?.(metric.id)}
                  className="mt-1 text-xs font-bold text-[#64748B] hover:text-purple-600 transition-colors cursor-pointer flex items-center gap-1"
                >
                  View all
                </button>
              </div>

              <button
                type="button"
                onClick={() => onViewMetric?.(metric.id)}
                aria-label={`View ${metric.title}`}
                className="absolute right-4 bottom-4 w-10 h-10 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center text-slate-700 group-hover:scale-110 group-hover:text-purple-600 transition-all cursor-pointer"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          );
        }

        if (metric.iconType === 'prescription') {
          return (
            <div
              key={metric.id}
              className="group relative rounded-[21px] p-4 sm:p-5 bg-white/90 border border-white/60 shadow-[0_4px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between min-h-[146px] overflow-hidden backdrop-blur-md"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-[11px] bg-cyan-100/60 flex items-center justify-center text-cyan-600 shadow-xs">
                  <Pill className="w-6 h-6 text-[#04D1FF]" />
                </div>
                <span className="text-[11px] font-semibold text-cyan-900 bg-cyan-100/70 px-2 py-0.5 rounded-full tracking-wide">
                  {metric.badge}
                </span>
              </div>

              <div className="mt-4">
                <h3 className="text-[14px] font-black tracking-wider uppercase bg-gradient-to-r from-[#04D1FF] to-[#0877BC] bg-clip-text text-transparent">
                  {metric.title}
                </h3>
                <button
                  type="button"
                  onClick={() => onViewMetric?.(metric.id)}
                  className="mt-1 text-xs font-bold text-[#64748B] hover:text-cyan-600 transition-colors cursor-pointer flex items-center gap-1"
                >
                  View all
                </button>
              </div>

              <button
                type="button"
                onClick={() => onViewMetric?.(metric.id)}
                aria-label={`View ${metric.title}`}
                className="absolute right-4 bottom-4 w-10 h-10 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center text-slate-700 group-hover:scale-110 group-hover:text-cyan-600 transition-all cursor-pointer"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          );
        }

        // Imaging
        return (
          <div
            key={metric.id}
            className="group relative rounded-[21px] p-4 sm:p-5 bg-white/90 border border-white/60 shadow-[0_4px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between min-h-[146px] overflow-hidden backdrop-blur-md"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-[11px] bg-purple-200/50 flex items-center justify-center text-[#810BFD] shadow-xs">
                <Activity className="w-6 h-6 text-[#810BFD]" />
              </div>
              <span className="text-[11px] font-semibold text-purple-900 bg-purple-100 px-2 py-0.5 rounded-full tracking-wide">
                {metric.badge}
              </span>
            </div>

            <div className="mt-4">
              <h3 className="text-[14px] font-black tracking-wider uppercase bg-gradient-to-r from-[#810BFD] to-[#955CFB] bg-clip-text text-transparent">
                {metric.title}
              </h3>
              <button
                type="button"
                onClick={() => onViewMetric?.(metric.id)}
                className="mt-1 text-xs font-bold text-[#64748B] hover:text-purple-700 transition-colors cursor-pointer flex items-center gap-1"
              >
                View all
              </button>
            </div>

            <button
              type="button"
              onClick={() => onViewMetric?.(metric.id)}
              aria-label={`View ${metric.title}`}
              className="absolute right-4 bottom-4 w-10 h-10 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center text-slate-700 group-hover:scale-110 group-hover:text-purple-600 transition-all cursor-pointer"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
