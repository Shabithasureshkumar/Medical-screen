import React from 'react';
import { TimelineItem } from '../../types/medical';
import { FlaskConical, Stethoscope, Pill, HeartPulse } from 'lucide-react';

interface JourneyTimelineProps {
  items: TimelineItem[];
  highlighted?: boolean;
}

export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({
  items,
  highlighted
}) => {
  // Group by monthGroup
  const groups: { [key: string]: TimelineItem[] } = {};
  items.forEach((item) => {
    if (!groups[item.monthGroup]) {
      groups[item.monthGroup] = [];
    }
    groups[item.monthGroup].push(item);
  });

  return (
    <div 
      id="health-timeline" 
      className={`w-full flex flex-col gap-6 transition-all duration-500 relative pl-3 sm:pl-3.5 ${
        highlighted ? 'ring-2 ring-purple-500 rounded-2xl p-2 bg-purple-50/30' : ''
      }`}
    >
      {/* Continuous Vertical Timeline Spine (Figma Source of Truth) */}
      <div 
        aria-hidden="true" 
        className="absolute left-0.5 sm:left-1 top-2 bottom-3 w-[2px] bg-gradient-to-b from-[#8B5CF6] via-[#A855F7] to-[#C084FC]/60 rounded-full pointer-events-none" 
      />

      {Object.entries(groups).map(([monthGroup, groupItems]) => (
        <div key={monthGroup} className="flex flex-col gap-3">
          {/* Phase Header */}
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] -ml-[13px] sm:-ml-[15px] ring-2 ring-white" />
            <span>{monthGroup}</span>
          </div>

          {/* Group Items */}
          <div className="flex flex-col gap-3">
            {groupItems.map((item) => {
              // 1. Labs (Purple border)
              if (item.category === 'labs') {
                return (
                  <div
                    key={item.id}
                    className="rounded-[16px] bg-white p-4 shadow-xs border-l-4 border-l-[#A855F7] border border-slate-200/70 flex flex-col gap-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-[#A855F7] shrink-0">
                          <FlaskConical className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                          <h3 className="text-xs sm:text-[14px] font-bold text-[#0F172A] leading-tight">
                            {item.title}
                          </h3>
                          <span className="text-[11px] text-[#424752]">{item.subtitle}</span>
                        </div>
                      </div>
                      {item.tag && (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100/70 text-emerald-700 text-[10px] font-bold shrink-0">
                          {item.tag.label}
                        </span>
                      )}
                    </div>

                    {item.note && (
                      <div className="rounded-[10px] bg-slate-50 p-2.5 text-xs text-[#424752] leading-relaxed border border-slate-100">
                        <strong className="text-[#6366F1] font-bold mr-1">{item.note.highlight}</strong>
                        {item.note.text}
                      </div>
                    )}
                  </div>
                );
              }

              // 2. Consultation (Indigo border)
              if (item.category === 'consultation') {
                return (
                  <div
                    key={item.id}
                    className="rounded-[16px] bg-white p-4 shadow-xs border-l-4 border-l-[#6366F1] border border-slate-200/70 flex flex-col gap-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-[#6366F1] shrink-0">
                          <Stethoscope className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                          <h3 className="text-xs sm:text-[14px] font-bold text-[#0F172A] leading-tight">
                            {item.title}
                          </h3>
                          <span className="text-[11px] text-[#424752]">{item.subtitle}</span>
                        </div>
                      </div>
                      {item.doctorAvatar && (
                        <div className="w-7 h-7 rounded-full overflow-hidden ring-1 ring-slate-200 shrink-0">
                          <img
                            src={item.doctorAvatar}
                            alt={item.doctorName || 'Doctor'}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>

                    {item.description && (
                      <p className="text-xs text-[#191C1E] leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                );
              }

              // 3. Medication (Pink border)
              if (item.category === 'medication') {
                return (
                  <div
                    key={item.id}
                    className="rounded-[16px] bg-white p-4 shadow-xs border-l-4 border-l-[#EC4899] border border-slate-200/70 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center text-[#EC4899] shrink-0">
                        <Pill className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-xs sm:text-[14px] font-bold text-[#0F172A] leading-tight">
                          {item.title}
                        </h3>
                        <span className="text-[11px] text-[#424752]">{item.subtitle}</span>
                      </div>
                    </div>
                    {item.dateBadge && (
                      <span className="text-[10px] font-bold text-[#424752] shrink-0">
                        {item.dateBadge}
                      </span>
                    )}
                  </div>
                );
              }

              // 4. Vitals (Green border)
              return (
                <div
                  key={item.id}
                  className="rounded-[16px] bg-white p-4 shadow-xs border-l-4 border-l-[#22C55E] border border-slate-200/70 flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-[#22C55E] shrink-0">
                        <HeartPulse className="w-4 h-4" />
                      </div>
                      <div className="flex items-center gap-4 sm:gap-6">
                        {item.vitalsData?.map((vital, i) => (
                          <div key={i} className="flex flex-col">
                            <span className="text-[9px] font-bold text-[#424752] uppercase tracking-wider">
                              {vital.label}
                            </span>
                            <div className="text-xs sm:text-[14px] font-bold" style={{ color: vital.color }}>
                              {vital.value} <span className="text-[10px] font-normal">{vital.unit}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {item.dateBadge && (
                      <span className="text-[10px] font-bold text-[#424752] shrink-0">
                        {item.dateBadge}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
