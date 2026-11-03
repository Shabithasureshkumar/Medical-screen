import React from 'react';
import { 
  Calendar, 
  Briefcase, 
  Clock, 
  RotateCcw, 
  AlertCircle, 
  Download, 
  FileText 
} from 'lucide-react';
import { ActivePrescriptionDetails } from '../../data/prescriptionData';

interface CurrentPrescriptionCardProps {
  prescription: ActivePrescriptionDetails;
  onDownloadPdf: () => void;
}

export const CurrentPrescriptionCard: React.FC<CurrentPrescriptionCardProps> = ({
  prescription,
  onDownloadPdf
}) => {
  return (
    <div className="w-full">
      {/* ========================================================================= */}
      {/* DESKTOP PRESENTATION (Hidden on mobile < 768px, Visible on md:block)       */}
      {/* ========================================================================= */}
      <div className="hidden md:flex flex-col bg-white rounded-[24px] border border-slate-200/90 p-6 sm:p-7 shadow-xs gap-5">
        {/* Top Header Row: Status, Title, Date + Prescribing Physician */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex flex-col gap-1">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#7C3AED] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#7C3AED] animate-pulse" />
              <span>{prescription.status}</span>
            </span>
            <h2 className="text-2xl lg:text-[26px] font-bold text-[#0F172A] tracking-tight font-inter">
              {prescription.condition}
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-normal mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Issued on {prescription.issueDate}</span>
            </div>
          </div>

          {/* Prescribing Physician Section */}
          <div className="flex flex-col items-end shrink-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              PRESCRIBING PHYSICIAN
            </span>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-purple-200 shadow-2xs shrink-0">
                <img
                  src={prescription.doctor.avatarUrl}
                  alt={prescription.doctor.name}
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
              </div>
              <div className="flex flex-col text-right">
                <span className="text-sm font-bold text-[#5C24FF]">
                  {prescription.doctor.name}
                </span>
                <span className="text-xs text-slate-500 font-normal">
                  {prescription.doctor.specialty}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Diagnosis Summary Card */}
        <div className="bg-[#FAF8FE] border border-[#EDE4FE] rounded-[16px] p-4 sm:p-4.5 flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-purple-100 flex items-center justify-center text-[#7C3AED] shrink-0">
              <Briefcase className="w-3.5 h-3.5 text-[#7C3AED]" />
            </div>
            <span className="text-[11px] font-bold text-[#7C3AED] uppercase tracking-wider">
              DIAGNOSIS SUMMARY
            </span>
          </div>
          <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal pl-8">
            {prescription.diagnosisSummary}
          </p>
        </div>

        {/* Prescribed Medicines Section */}
        <div className="bg-[#F5F3F9] rounded-[20px] p-4.5 sm:p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              PRESCRIBED MEDICINES
            </span>
          </div>

          {/* Table Headers */}
          <div className="grid grid-cols-12 gap-2 px-4 text-[10.5px] font-bold text-slate-400 uppercase tracking-wider">
            <span className="col-span-5">MEDICINE NAME</span>
            <span className="col-span-2 text-center">DOSAGE</span>
            <span className="col-span-2 text-center">DURATION</span>
            <span className="col-span-3 text-right">FREQUENCY</span>
          </div>

          {/* Medicines Rows */}
          <div className="flex flex-col gap-2.5">
            {prescription.medicines.map((med) => (
              <div
                key={med.id}
                className="grid grid-cols-12 gap-2 items-center bg-white rounded-[14px] p-3.5 px-4 shadow-2xs border border-slate-100 hover:border-purple-200 transition-colors"
              >
                {/* Name & Formulation */}
                <div className="col-span-5 flex flex-col min-w-0">
                  <span className="text-sm font-bold text-slate-900 truncate">
                    {med.name}
                  </span>
                  <span className="text-xs text-slate-400 font-normal">
                    {med.formulation}
                  </span>
                </div>

                {/* Dosage */}
                <div className="col-span-2 text-center">
                  <span className="text-xs font-bold text-slate-800">
                    {med.dosage}
                  </span>
                </div>

                {/* Duration */}
                <div className="col-span-2 text-center">
                  <span className="text-xs font-medium text-slate-600">
                    {med.duration}
                  </span>
                </div>

                {/* Frequency */}
                <div className="col-span-3 text-right">
                  <span className="text-xs font-bold text-[#5C24FF]">
                    {med.frequencyDesktop}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row: Patient Instructions + Download Button */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pt-1">
          {/* Instructions Callout */}
          <div className="flex items-start gap-2.5 flex-1 min-w-0">
            <div className="w-6 h-6 rounded-full bg-amber-100/80 flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-slate-800">
                Patient Instructions
              </span>
              <p className="text-[11.5px] text-slate-500 font-normal leading-relaxed mt-0.5">
                {prescription.instructionsDesktop}
              </p>
            </div>
          </div>

          {/* Download Action */}
          <button
            type="button"
            onClick={onDownloadPdf}
            data-testid="download-prescription-pdf-button"
            className="h-[42px] px-6 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#5C24FF] hover:opacity-95 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all cursor-pointer shrink-0"
          >
            <Download className="w-4 h-4 text-white shrink-0" />
            <span>Download Prescription (PDF)</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE PRESENTATION (Visible on < 768px, matching mobile Figma 375px)     */}
      {/* ========================================================================= */}
      <div className="md:hidden flex flex-col rounded-[20px] overflow-hidden shadow-xs border border-slate-200/90">
        {/* Purple Gradient Banner */}
        <div className="bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#5C24FF] p-4.5 text-white flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">
            CURRENT PRESCRIPTION
          </span>
          <h2 className="text-xl font-bold leading-tight font-inter">
            {prescription.condition}
          </h2>
        </div>

        {/* Card Body */}
        <div className="bg-white p-4 flex flex-col gap-4">
          {/* Prescribing Physician Row */}
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-purple-200 shrink-0">
                <img
                  src={prescription.doctor.avatarUrl}
                  alt={prescription.doctor.name}
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-slate-900 truncate">
                  {prescription.doctor.name}
                </span>
                <span className="text-[10.5px] text-slate-500 truncate">
                  {prescription.doctor.specialty} • {prescription.doctor.facility}
                </span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[9px] font-bold text-slate-400 block uppercase">
                DATE ISSUED
              </span>
              <span className="text-[11px] font-bold text-[#5C24FF]">
                {prescription.issueDate}
              </span>
            </div>
          </div>

          {/* Diagnosis Pill Card */}
          <div className="bg-[#F6F2FF] border border-[#E9DDFC] rounded-xl p-3 flex items-start gap-2.5">
            <Briefcase className="w-4 h-4 text-[#7C3AED] shrink-0 mt-0.5" />
            <span className="text-xs font-bold text-[#7C3AED] leading-snug">
              {prescription.diagnosisSummary}
            </span>
          </div>

          {/* Prescribed Medications Header */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">
              PRESCRIBED MEDICATIONS
            </span>

            {/* Mobile Medication Cards */}
            <div className="flex flex-col gap-2.5">
              {prescription.medicines.map((med) => (
                <div
                  key={med.id}
                  className="bg-[#F8F9FD] rounded-xl p-3.5 border border-slate-200/80 flex flex-col gap-2 shadow-2xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900">
                        {med.name}
                      </span>
                      <span className="text-xs text-[#5C24FF] font-semibold">
                        {med.dosage} {med.formulation}
                      </span>
                    </div>

                    <span className="bg-slate-200/80 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                      {med.timingBadge}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-500 font-medium pt-1 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{med.frequencyMobile}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {med.duration === 'Continuous' ? (
                        <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                      ) : (
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      )}
                      <span>{med.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Patient Instructions on Mobile */}
          <div className="flex flex-col gap-1 bg-[#FFFBEB]/60 border border-amber-200/60 rounded-xl p-3">
            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
              PATIENT INSTRUCTIONS
            </span>
            <p className="text-[11.5px] text-slate-600 font-normal leading-relaxed">
              "{prescription.instructionsMobile}"
            </p>
          </div>

          {/* Mobile Download CTA Button */}
          <button
            type="button"
            onClick={onDownloadPdf}
            data-testid="mobile-download-prescription-pdf-button"
            className="w-full h-[46px] rounded-full bg-gradient-to-r from-[#7C3AED] to-[#5C24FF] hover:opacity-95 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md shadow-purple-500/20 active:scale-[0.99] transition-all cursor-pointer mt-1"
          >
            <FileText className="w-4 h-4 text-white" />
            <span>DOWNLOAD PRESCRIPTION (PDF)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
