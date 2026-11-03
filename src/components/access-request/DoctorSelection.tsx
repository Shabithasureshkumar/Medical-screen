import React from 'react';
import { DoctorRecipient } from '../../types/accessRequest';

interface DoctorSelectionProps {
  doctors: DoctorRecipient[];
  selectedDoctorIds: string[];
  onToggleDoctor: (id: string) => void;
  showInsideClinicBadge?: boolean;
}

export const DoctorSelection: React.FC<DoctorSelectionProps> = ({
  doctors,
  selectedDoctorIds,
  onToggleDoctor,
  showInsideClinicBadge = true
}) => {
  return (
    <div className="w-full rounded-[20px] sm:rounded-[24px] bg-[#F8FAFC] border border-slate-200/70 p-4 sm:p-5 flex flex-col gap-3.5 shadow-xs">
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm sm:text-base font-bold text-[#0F172A] font-inter">
          Select Recipient
        </h2>
        {showInsideClinicBadge && (
          <span className="px-2.5 py-0.5 rounded-full bg-[#EDE9FE] text-[#6D28D9] text-[10px] sm:text-[11px] font-bold tracking-wider uppercase font-inter">
            Inside Clinic
          </span>
        )}
      </div>

      {/* Doctor Cards */}
      <div className="flex flex-col gap-3">
        {doctors.map((doc) => {
          const isSelected = selectedDoctorIds.includes(doc.id);
          return (
            <div
              key={doc.id}
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={0}
              data-testid={`doctor-recipient-card-${doc.id}`}
              onClick={() => onToggleDoctor(doc.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onToggleDoctor(doc.id);
                }
              }}
              className={`w-full rounded-[16px] sm:rounded-[20px] bg-white border p-3 sm:p-4 shadow-xs flex items-center justify-between gap-3 cursor-pointer transition-all ${
                isSelected
                  ? 'border-[#7C3AED] ring-2 ring-purple-100 shadow-sm'
                  : 'border-slate-200/80 hover:border-slate-300'
              }`}
            >
              {/* Doctor Details */}
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-[14px] overflow-hidden bg-purple-50 ring-1 ring-slate-100 shrink-0">
                  <img
                    src={doc.avatarUrl}
                    alt={doc.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col items-start gap-0.5 min-w-0">
                  <h3 className="text-sm sm:text-base font-semibold text-[#0F172A] truncate">
                    {doc.name}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#F3E8FF] text-[#7C3AED] text-[9.5px] sm:text-[10px] font-bold tracking-wider uppercase whitespace-nowrap">
                    {doc.role}
                  </span>
                  <p className="text-xs text-[#64748B] truncate mt-0.5">
                    {doc.specialty} • {doc.experience}
                  </p>
                </div>
              </div>

              {/* Selection Circle Indicator */}
              <div className="shrink-0 pr-1">
                {isSelected ? (
                  <div className="w-5 h-5 rounded-full border-2 border-[#7C3AED] flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#7C3AED]" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
