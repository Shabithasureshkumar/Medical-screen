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
    <div className="w-full lg:w-[737px] grid grid-cols-1 sm:grid-cols-2 gap-[17.8px] shrink-0">
      {metrics.map((metric) => {
        // 1. Medical RECORDS (Warm amber gold)
        if (metric.iconType === 'records') {
          return (
            <div
              key={metric.id}
              className="relative w-full h-[156px] rounded-[21.34px] p-[21.34px] bg-white border border-white/40 shadow-[0_3.56px_3.56px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between overflow-hidden backdrop-blur-[17.8px]"
            >
              {/* Decorative organic blob in top-right */}
              <div className="absolute -top-3 -right-3 w-[120px] h-[95px] bg-[#FDF8E8] rounded-bl-[55px] flex items-start justify-end p-5 pt-4 pr-5 pointer-events-none">
                <span className="text-[10.67px] font-semibold text-[#494551] tracking-[0.53px]">
                  {metric.badge}
                </span>
              </div>

              {/* Icon */}
              <div className="w-[51px] h-[52px] rounded-[10.67px] bg-[#F4ECCD] flex items-center justify-center text-[#986F00] shadow-xs">
                <Folder className="w-6 h-6 text-[#FEBA00] fill-[#FEBA00]" />
              </div>

              {/* Title & View all */}
              <div className="mt-auto">
                <h3 className="text-[14.23px] font-black tracking-[0.71px] uppercase bg-gradient-to-r from-[#FEBA00] to-[#986F00] bg-clip-text text-transparent">
                  {metric.title}
                </h3>
                <button
                  type="button"
                  onClick={() => onViewMetric?.(metric.id)}
                  className="text-[13.34px] font-bold text-[#64748B] hover:text-amber-600 transition-colors cursor-pointer block mt-0.5"
                >
                  View all
                </button>
              </div>

              {/* Floating Action Button */}
              <button
                type="button"
                onClick={() => onViewMetric?.(metric.id)}
                aria-label={`View ${metric.title}`}
                className="absolute right-4 bottom-4 w-[50px] h-[50px] rounded-full bg-white shadow-[0_4px_25px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center text-slate-700 hover:scale-105 hover:text-amber-600 transition-all cursor-pointer"
              >
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          );
        }

        // 2. LAB REPORTS (Purple / Lavender)
        if (metric.iconType === 'labs') {
          return (
            <div
              key={metric.id}
              className="relative w-full h-[156px] rounded-[21.34px] p-[21.34px] bg-white border border-white/40 shadow-[0_3.56px_8.89px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between overflow-hidden backdrop-blur-[17.8px]"
            >
              {/* Decorative organic blob in top-right */}
              <div className="absolute -top-3 -right-3 w-[125px] h-[95px] bg-[#BFA2FB] rounded-bl-[55px] flex items-start justify-end p-5 pt-4 pr-5 pointer-events-none">
                <span className="text-[10.67px] font-semibold text-[#FBFAFE] tracking-[0.53px]">
                  {metric.badge}
                </span>
              </div>

              {/* Icon */}
              <div className="w-[43px] h-[43px] rounded-[10.67px] bg-[hsla(260,58%,75%,0.20)] flex items-center justify-center text-[#5C24FF]">
                <FlaskConical className="w-5 h-5 text-[#9F7CE6]" />
              </div>

              {/* Title & View all */}
              <div className="mt-auto">
                <h3 className="text-[14.23px] font-black tracking-[0.71px] uppercase bg-gradient-to-b from-[#9F7CE6] to-[#5C24FF] bg-clip-text text-transparent">
                  {metric.title}
                </h3>
                <button
                  type="button"
                  onClick={() => onViewMetric?.(metric.id)}
                  className="text-[13.34px] font-bold text-[#64748B] hover:text-purple-600 transition-colors cursor-pointer block mt-0.5"
                >
                  View all
                </button>
              </div>

              {/* Floating Action Button */}
              <button
                type="button"
                onClick={() => onViewMetric?.(metric.id)}
                aria-label={`View ${metric.title}`}
                className="absolute right-4 bottom-4 w-[50px] h-[50px] rounded-full bg-white shadow-[0_4px_25px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center text-slate-700 hover:scale-105 hover:text-purple-600 transition-all cursor-pointer"
              >
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          );
        }

        // 3. Prescription (Cyan / Turquoise)
        if (metric.iconType === 'prescription') {
          return (
            <div
              key={metric.id}
              className="relative w-full h-[156px] rounded-[21.34px] p-[21.34px] bg-white border border-white/40 shadow-[0_3.56px_8.89px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between overflow-hidden backdrop-blur-[17.8px]"
            >
              {/* Decorative organic blob in top-right */}
              <div className="absolute -top-3 -right-3 w-[110px] h-[95px] bg-[#04D1FF]/80 rounded-bl-[55px] flex items-start justify-end p-5 pt-4 pr-5 pointer-events-none">
                <span className="text-[10.67px] font-semibold text-[#F4FFFE] tracking-[0.53px]">
                  {metric.badge}
                </span>
              </div>

              {/* Icon */}
              <div className="w-[59px] h-[59px] rounded-[14.8px] bg-[hsla(191,82%,70%,0.30)] flex items-center justify-center text-cyan-600">
                <Pill className="w-6 h-6 text-[#0877BC]" />
              </div>

              {/* Title & View all */}
              <div className="mt-auto">
                <h3 className="text-[14.23px] font-black tracking-[0.71px] uppercase bg-gradient-to-r from-[#04D1FF] to-[#0877BC] bg-clip-text text-transparent">
                  {metric.title}
                </h3>
                <button
                  type="button"
                  onClick={() => onViewMetric?.(metric.id)}
                  className="text-[13.34px] font-bold text-[#64748B] hover:text-cyan-600 transition-colors cursor-pointer block mt-0.5"
                >
                  View all
                </button>
              </div>

              {/* Floating Action Button */}
              <button
                type="button"
                onClick={() => onViewMetric?.(metric.id)}
                aria-label={`View ${metric.title}`}
                className="absolute right-4 bottom-4 w-[50px] h-[50px] rounded-full bg-white shadow-[0_4px_25px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center text-slate-700 hover:scale-105 hover:text-cyan-600 transition-all cursor-pointer"
              >
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          );
        }

        // 4. Imaging (Purple / Violet)
        return (
          <div
            key={metric.id}
            className="relative w-full h-[156px] rounded-[21.34px] p-[21.34px] bg-white border border-white/40 shadow-[0_3.56px_8.89px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between overflow-hidden backdrop-blur-[17.8px]"
          >
            {/* Decorative organic blob in top-right */}
            <div className="absolute -top-3 -right-3 w-[110px] h-[95px] bg-[#810BFD] rounded-bl-[55px] flex items-start justify-end p-5 pt-4 pr-5 pointer-events-none">
              <span className="text-[10.67px] font-semibold text-[#F4FFFE] tracking-[0.53px]">
                {metric.badge}
              </span>
            </div>

            {/* Icon */}
            <div className="w-[43px] h-[43px] rounded-[10.67px] bg-[#BFA2FB] flex items-center justify-center text-white">
              <Activity className="w-5 h-5 text-purple-900" />
            </div>

            {/* Title & View all */}
            <div className="mt-auto">
              <h3 className="text-[14.23px] font-black tracking-[0.71px] uppercase bg-gradient-to-r from-[#810BFD] to-[#955CFB] bg-clip-text text-transparent">
                {metric.title}
              </h3>
              <button
                type="button"
                onClick={() => onViewMetric?.(metric.id)}
                className="text-[13.34px] font-bold text-[#64748B] hover:text-purple-600 transition-colors cursor-pointer block mt-0.5"
              >
                View all
              </button>
            </div>

            {/* Floating Action Button */}
            <button
              type="button"
              onClick={() => onViewMetric?.(metric.id)}
              aria-label={`View ${metric.title}`}
              className="absolute right-4 bottom-4 w-[50px] h-[50px] rounded-full bg-white shadow-[0_4px_25px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center text-slate-700 hover:scale-105 hover:text-purple-600 transition-all cursor-pointer"
            >
              <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
