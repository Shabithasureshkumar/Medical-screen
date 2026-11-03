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
    <div className="w-full min-w-0 lg:w-[54%] xl:w-[54.5%] desktop-overview-fixed grid grid-cols-2 gap-2 sm:gap-3 md:gap-3.5 xl:gap-[17.8px]">
      {metrics.map((metric) => {
        // 1. Medical RECORDS (Warm amber gold)
        if (metric.iconType === 'records') {
          return (
            <div
              key={metric.id}
              onClick={() => onViewMetric?.(metric.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onViewMetric?.(metric.id);
                }
              }}
              data-testid="medical-records-overview-card"
              aria-label="Open Medical Records Intelligence Center"
              className="relative w-full h-[122px] sm:h-[138px] md:h-[156px] rounded-[14px] sm:rounded-[18px] md:rounded-[21.34px] p-2.5 sm:p-3.5 md:p-[21.34px] bg-white border border-white/40 shadow-xs sm:shadow-[0_3.56px_3.56px_rgba(0,0,0,0.06)] hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden backdrop-blur-md cursor-pointer group"
            >
              {/* Decorative organic blob in top-right */}
              <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-[75px] sm:w-[95px] md:w-[120px] h-[58px] sm:h-[75px] md:h-[95px] bg-[#FDF8E8] rounded-bl-[40px] sm:rounded-bl-[55px] flex items-start justify-end p-2 sm:p-3 md:p-5 pt-2 sm:pt-4 pr-2.5 sm:pr-5 pointer-events-none">
                <span className="text-[7.5px] sm:text-[9px] md:text-[10.67px] font-semibold text-[#494551] tracking-tight sm:tracking-[0.53px]">
                  {metric.badge}
                </span>
              </div>

              {/* Icon */}
              <div className="w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] md:w-[51px] md:h-[52px] rounded-[8px] sm:rounded-[10.67px] bg-[#F4ECCD] flex items-center justify-center text-[#986F00] shadow-2xs group-hover:scale-105 transition-transform">
                <Folder className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-6 md:h-6 text-[#FEBA00] fill-[#FEBA00]" />
              </div>

              {/* Title & View all */}
              <div className="mt-auto">
                <h3 className="text-[9.5px] sm:text-xs md:text-[14.23px] font-black tracking-tight sm:tracking-[0.71px] uppercase bg-gradient-to-r from-[#FEBA00] to-[#986F00] bg-clip-text text-transparent truncate">
                  {metric.title}
                </h3>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewMetric?.(metric.id);
                  }}
                  className="text-[9px] sm:text-[11px] md:text-[13.34px] font-bold text-[#64748B] hover:text-amber-600 transition-colors cursor-pointer block mt-0.5"
                >
                  View all
                </button>
              </div>

              {/* Floating Action Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewMetric?.(metric.id);
                }}
                aria-label={`View ${metric.title}`}
                className="absolute right-2 bottom-2 sm:right-3 sm:bottom-3 md:right-4 md:bottom-4 w-[30px] h-[30px] sm:w-[38px] sm:h-[38px] md:w-[50px] md:h-[50px] rounded-full bg-white shadow-xs sm:shadow-[0_4px_25px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center text-slate-700 hover:scale-105 hover:text-amber-600 transition-all cursor-pointer"
              >
                <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-5 md:h-5 stroke-[2.5]" />
              </button>
            </div>
          );
        }

        // 2. LAB REPORTS (Purple / Lavender)
        if (metric.iconType === 'labs') {
          return (
            <div
              key={metric.id}
              onClick={() => onViewMetric?.(metric.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onViewMetric?.(metric.id);
                }
              }}
              data-testid="lab-reports-overview-card"
              aria-label="Open Lab Reports Intelligence Center"
              className="relative w-full h-[122px] sm:h-[138px] md:h-[156px] rounded-[14px] sm:rounded-[18px] md:rounded-[21.34px] p-2.5 sm:p-3.5 md:p-[21.34px] bg-white border border-white/40 shadow-xs sm:shadow-[0_3.56px_8.89px_rgba(0,0,0,0.06)] hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden backdrop-blur-md cursor-pointer group"
            >
              {/* Decorative organic blob in top-right */}
              <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-[80px] sm:w-[100px] md:w-[125px] h-[58px] sm:h-[75px] md:h-[95px] bg-[#BFA2FB] rounded-bl-[40px] sm:rounded-bl-[55px] flex items-start justify-end p-2 sm:p-3 md:p-5 pt-2 sm:pt-4 pr-2.5 sm:pr-5 pointer-events-none">
                <span className="text-[7.5px] sm:text-[9px] md:text-[10.67px] font-semibold text-[#FBFAFE] tracking-tight sm:tracking-[0.53px]">
                  {metric.badge}
                </span>
              </div>

              {/* Icon */}
              <div className="w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] md:w-[43px] md:h-[43px] rounded-[8px] sm:rounded-[10.67px] bg-[hsla(260,58%,75%,0.20)] flex items-center justify-center text-[#5C24FF] group-hover:scale-105 transition-transform">
                <FlaskConical className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#9F7CE6]" />
              </div>

              {/* Title & View all */}
              <div className="mt-auto">
                <h3 className="text-[9.5px] sm:text-xs md:text-[14.23px] font-black tracking-tight sm:tracking-[0.71px] uppercase bg-gradient-to-b from-[#9F7CE6] to-[#5C24FF] bg-clip-text text-transparent truncate">
                  {metric.title}
                </h3>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewMetric?.(metric.id);
                  }}
                  className="text-[9px] sm:text-[11px] md:text-[13.34px] font-bold text-[#64748B] hover:text-purple-600 transition-colors cursor-pointer block mt-0.5"
                >
                  View all
                </button>
              </div>

              {/* Floating Action Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewMetric?.(metric.id);
                }}
                aria-label={`View ${metric.title}`}
                className="absolute right-2 bottom-2 sm:right-3 sm:bottom-3 md:right-4 md:bottom-4 w-[30px] h-[30px] sm:w-[38px] sm:h-[38px] md:w-[50px] md:h-[50px] rounded-full bg-white shadow-xs sm:shadow-[0_4px_25px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center text-slate-700 hover:scale-105 hover:text-purple-600 transition-all cursor-pointer"
              >
                <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-5 md:h-5 stroke-[2.5]" />
              </button>
            </div>
          );
        }

        // 3. Prescription (Cyan / Turquoise)
        if (metric.iconType === 'prescription') {
          return (
            <div
              key={metric.id}
              onClick={() => onViewMetric?.(metric.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onViewMetric?.(metric.id);
                }
              }}
              data-testid="prescription-overview-card"
              aria-label="Open Prescription Intelligence Center"
              className="relative w-full h-[122px] sm:h-[138px] md:h-[156px] rounded-[14px] sm:rounded-[18px] md:rounded-[21.34px] p-2.5 sm:p-3.5 md:p-[21.34px] bg-white border border-white/40 shadow-xs sm:shadow-[0_3.56px_8.89px_rgba(0,0,0,0.06)] hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden backdrop-blur-md cursor-pointer group"
            >
              {/* Decorative organic blob in top-right */}
              <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-[75px] sm:w-[90px] md:w-[110px] h-[58px] sm:h-[75px] md:h-[95px] bg-[#04D1FF]/80 rounded-bl-[40px] sm:rounded-bl-[55px] flex items-start justify-end p-2 sm:p-3 md:p-5 pt-2 sm:pt-4 pr-2.5 sm:pr-5 pointer-events-none">
                <span className="text-[7.5px] sm:text-[9px] md:text-[10.67px] font-semibold text-[#F4FFFE] tracking-tight sm:tracking-[0.53px]">
                  {metric.badge}
                </span>
              </div>

              {/* Icon */}
              <div className="w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] md:w-[59px] md:h-[59px] rounded-[8px] sm:rounded-[14.8px] bg-[hsla(191,82%,70%,0.30)] flex items-center justify-center text-cyan-600 group-hover:scale-105 transition-transform">
                <Pill className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-6 md:h-6 text-[#0877BC]" />
              </div>

              {/* Title & View all */}
              <div className="mt-auto">
                <h3 className="text-[9.5px] sm:text-xs md:text-[14.23px] font-black tracking-tight sm:tracking-[0.71px] uppercase bg-gradient-to-r from-[#04D1FF] to-[#0877BC] bg-clip-text text-transparent truncate">
                  {metric.title}
                </h3>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewMetric?.(metric.id);
                  }}
                  className="text-[9px] sm:text-[11px] md:text-[13.34px] font-bold text-[#64748B] hover:text-cyan-600 transition-colors cursor-pointer block mt-0.5"
                >
                  View all
                </button>
              </div>

              {/* Floating Action Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewMetric?.(metric.id);
                }}
                aria-label={`View ${metric.title}`}
                className="absolute right-2 bottom-2 sm:right-3 sm:bottom-3 md:right-4 md:bottom-4 w-[30px] h-[30px] sm:w-[38px] sm:h-[38px] md:w-[50px] md:h-[50px] rounded-full bg-white shadow-xs sm:shadow-[0_4px_25px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center text-slate-700 hover:scale-105 hover:text-cyan-600 transition-all cursor-pointer"
              >
                <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-5 md:h-5 stroke-[2.5]" />
              </button>
            </div>
          );
        }

        // 4. Imaging (Purple / Violet)
        return (
          <div
            key={metric.id}
            onClick={() => onViewMetric?.(metric.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onViewMetric?.(metric.id);
              }
            }}
            data-testid="imaging-overview-card"
            aria-label="Open Lab & Imaging Intelligence Center"
            className="relative w-full h-[122px] sm:h-[138px] md:h-[156px] rounded-[14px] sm:rounded-[18px] md:rounded-[21.34px] p-2.5 sm:p-3.5 md:p-[21.34px] bg-white border border-white/40 shadow-xs sm:shadow-[0_3.56px_8.89px_rgba(0,0,0,0.06)] hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden backdrop-blur-md cursor-pointer group"
          >
            {/* Decorative organic blob in top-right */}
            <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-[75px] sm:w-[90px] md:w-[110px] h-[58px] sm:h-[75px] md:h-[95px] bg-[#810BFD] rounded-bl-[40px] sm:rounded-bl-[55px] flex items-start justify-end p-2 sm:p-3 md:p-5 pt-2 sm:pt-4 pr-2.5 sm:pr-5 pointer-events-none">
              <span className="text-[7.5px] sm:text-[9px] md:text-[10.67px] font-semibold text-[#F4FFFE] tracking-tight sm:tracking-[0.53px]">
                {metric.badge}
              </span>
            </div>

            {/* Icon */}
            <div className="w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] md:w-[43px] md:h-[43px] rounded-[8px] sm:rounded-[10.67px] bg-[#BFA2FB] flex items-center justify-center text-white">
              <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-purple-900" />
            </div>

            {/* Title & View all */}
            <div className="mt-auto">
              <h3 className="text-[9.5px] sm:text-xs md:text-[14.23px] font-black tracking-tight sm:tracking-[0.71px] uppercase bg-gradient-to-r from-[#810BFD] to-[#955CFB] bg-clip-text text-transparent truncate">
                {metric.title}
              </h3>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewMetric?.(metric.id);
                }}
                className="text-[9px] sm:text-[11px] md:text-[13.34px] font-bold text-[#64748B] hover:text-purple-600 transition-colors cursor-pointer block mt-0.5"
              >
                View all
              </button>
            </div>

            {/* Floating Action Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onViewMetric?.(metric.id);
              }}
              aria-label={`View ${metric.title}`}
              className="absolute right-2 bottom-2 sm:right-3 sm:bottom-3 md:right-4 md:bottom-4 w-[30px] h-[30px] sm:w-[38px] sm:h-[38px] md:w-[50px] md:h-[50px] rounded-full bg-white shadow-xs sm:shadow-[0_4px_25px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center text-slate-700 hover:scale-105 hover:text-purple-600 transition-all cursor-pointer"
            >
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-5 md:h-5 stroke-[2.5]" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
