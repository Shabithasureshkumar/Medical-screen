import React from 'react';
import { Store, ChevronRight, Cross } from 'lucide-react';
import { ActivePrescriptionDetails } from '../../data/prescriptionData';

interface PrimaryPharmacyProps {
  pharmacy: ActivePrescriptionDetails['pharmacy'];
  onViewPharmacy?: () => void;
}

export const PrimaryPharmacy: React.FC<PrimaryPharmacyProps> = ({
  pharmacy,
  onViewPharmacy
}) => {
  return (
    <div className="w-full">
      {/* Desktop Card */}
      <div 
        onClick={onViewPharmacy}
        className="hidden md:flex flex-col justify-between bg-[#F8F6FF] border border-[#ECE5FB] rounded-[22px] p-5 shadow-xs relative overflow-hidden min-h-[160px] cursor-pointer hover:border-purple-300 transition-colors group"
      >
        {/* Top Header */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#EDE9FE] flex items-center justify-center text-[#7C3AED]">
            <Store className="w-4 h-4 text-[#7C3AED]" />
          </div>
          <span className="text-xs font-bold text-[#7C3AED] uppercase tracking-wider">
            Primary Pharmacy
          </span>
        </div>

        {/* Pharmacy Details */}
        <div className="flex flex-col gap-0.5 z-10">
          <h3 className="text-sm font-bold text-slate-900 group-hover:text-purple-900 transition-colors">
            {pharmacy.nameDesktop}
          </h3>
          <p className="text-xs text-slate-500 font-normal leading-relaxed">
            {pharmacy.address}
          </p>
        </div>

        {/* Status Badge */}
        <div className="flex flex-col gap-0.5 z-10 pt-1">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
            STATUS
          </span>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{pharmacy.status}</span>
          </div>
        </div>

        {/* Decorative Watermark Graphic in Bottom Right */}
        <div className="absolute -right-2 -bottom-2 w-28 h-28 bg-[#EDE9FE]/50 rounded-2xl flex items-center justify-center text-purple-300/40 pointer-events-none select-none">
          <Cross className="w-16 h-16 stroke-[1.5]" />
        </div>
      </div>

      {/* Mobile Card */}
      <div
        onClick={onViewPharmacy}
        className="md:hidden flex items-center justify-between bg-[#F0EEF7] rounded-2xl p-4 shadow-2xs border border-purple-100/60 cursor-pointer active:scale-[0.99] transition-all"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#7C3AED] shadow-2xs shrink-0">
            <Store className="w-5 h-5 text-[#7C3AED]" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
              PRIMARY PHARMACY
            </span>
            <span className="text-xs font-bold text-slate-900 truncate">
              {pharmacy.nameMobile}
            </span>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
      </div>
    </div>
  );
};
