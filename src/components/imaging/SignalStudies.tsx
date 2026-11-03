import React from 'react';
import { Activity, Sparkles, ArrowRight } from 'lucide-react';
import { signalStudiesData, SignalStudyData } from '../../data/imagingData';

interface SignalStudiesProps {
  onSelectStudy?: (study: SignalStudyData) => void;
  onViewAll?: () => void;
}

export const SignalStudies: React.FC<SignalStudiesProps> = ({
  onSelectStudy,
  onViewAll
}) => {
  const getWaveformImage = (type: 'ecg' | 'holter' | 'spirometry') => {
    switch (type) {
      case 'ecg':
        return '/assets/imaging/ecg-waveform.png';
      case 'holter':
        return '/assets/imaging/holter-waveform.png';
      case 'spirometry':
        return '/assets/imaging/spirometry-waveform.png';
      default:
        return '/assets/imaging/ecg-waveform.png';
    }
  };

  return (
    <section className="w-full space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F5F3FF] border border-[#7B61FF]/20 flex items-center justify-center text-[#6B38D4]">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#1E1B4B]">
              Signal Studies
            </h2>
            <p className="text-xs text-slate-500">
              ECG · Holter · Spirometry
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#7B61FF]/10 border border-[#7B61FF]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#7B61FF]" />
            <span className="text-xs font-semibold text-[#7B61FF]">
              AI Signal Analysis Active
            </span>
          </div>

          <button
            type="button"
            onClick={onViewAll}
            className="text-xs sm:text-sm font-semibold text-[#6B38D4] hover:text-[#5B2BBF] transition-colors"
          >
            View All
          </button>
        </div>
      </div>

      {/* 3 Study Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {signalStudiesData.map((study) => (
          <div
            key={study.id}
            role="button"
            tabIndex={0}
            onClick={() => onSelectStudy?.(study)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectStudy?.(study);
              }
            }}
            aria-label={`Open telemetry for ${study.title}`}
            className="group bg-white/70 backdrop-blur-md rounded-2xl border border-[#7B61FF]/20 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4 min-w-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7B61FF]"
          >
            {/* Top row: Title + Badges */}
            <div className="flex items-start justify-between gap-2 min-w-0">
              <div className="min-w-0 flex-1">
                <h4 className="text-base font-bold text-[#1E1B4B] group-hover:text-[#6B38D4] transition-colors truncate">
                  {study.title}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5 truncate">
                  {study.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-1.5 shrink-0">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide bg-slate-100 text-slate-600 shrink-0">
                  {study.badgeType}
                </span>
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold"
                  style={{
                    backgroundColor: `${study.statusDotColor}15`,
                    color: study.statusColor
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: study.statusDotColor }}
                  />
                  {study.statusBadge}
                </span>
              </div>
            </div>

            {/* Dark container with waveform scan */}
            <div className="w-full h-28 sm:h-32 bg-[#0B0F19] rounded-xl overflow-hidden relative flex items-center justify-center p-2 border border-slate-800">
              {/* Subtle background grid */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'linear-gradient(#6B7280 1px, transparent 1px), linear-gradient(90deg, #6B7280 1px, transparent 1px)',
                  backgroundSize: '16px 16px'
                }}
              />
              <img
                src={getWaveformImage(study.waveformType)}
                alt={`${study.title} waveform`}
                className="relative max-w-full max-h-full object-contain filter contrast-125"
                loading="lazy"
              />
            </div>

            {/* Footer row: Doctor + Date & View Study */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-500 truncate max-w-[65%]">
                {study.doctorDate}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectStudy?.(study);
                }}
                className="inline-flex items-center gap-1 font-semibold text-[#6B38D4] hover:text-[#5B2BBF] transition-colors shrink-0"
              >
                <span>View Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
