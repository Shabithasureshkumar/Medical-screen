import React from 'react';
import { Upload, Download, KeyRound, Plus, ChevronRight } from 'lucide-react';
import { PatientProfile } from '../../types/medical';

interface PatientProfileCardProps {
  patient: PatientProfile;
  pendingRequestsCount?: number;
  onUploadFile?: () => void;
  onDownloadRecords?: () => void;
  onAccessRequests?: () => void;
  onNewAppointment?: () => void;
  onViewAppointments?: () => void;
}

export const PatientProfileCard: React.FC<PatientProfileCardProps> = ({
  patient,
  pendingRequestsCount = 3,
  onUploadFile,
  onDownloadRecords,
  onAccessRequests,
  onNewAppointment,
  onViewAppointments
}) => {
  return (
    <div className="w-full min-w-0 lg:w-[46%] xl:w-[45.5%] desktop-patient-fixed flex flex-col gap-2.5 sm:gap-3.5">
      {/* Top 3 Quick Action Buttons */}
      <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-2 xl:gap-[12.36px] w-full min-w-0">
        {/* Upload New File */}
        <button
          type="button"
          onClick={onUploadFile}
          className="w-full h-[38px] sm:h-[44px] md:h-[46px] xl:h-[50px] min-[1380px]:h-[52px] rounded-full bg-gradient-to-b from-[#9C73F2] to-[#5C24FF] hover:opacity-95 text-white font-medium text-[9.5px] xs:text-[10.5px] sm:text-xs lg:text-[10px] xl:text-[12.5px] min-[1380px]:text-[14.42px] px-1 xs:px-1.5 lg:px-1.5 xl:px-3 min-[1380px]:px-4 flex items-center justify-center gap-0.5 xs:gap-1 sm:gap-1.5 md:gap-2 shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap min-w-0"
        >
          <Upload className="w-3 h-3 sm:w-3.5 sm:h-3.5 xl:w-4 xl:h-4 shrink-0" />
          <span className="truncate">Upload New File</span>
        </button>

        {/* Download Records */}
        <button
          type="button"
          onClick={onDownloadRecords}
          className="w-full h-[38px] sm:h-[44px] md:h-[46px] xl:h-[50px] min-[1380px]:h-[52px] rounded-full bg-[hsla(260,64%,53%,0.10)] hover:bg-purple-100 text-purple-700 font-medium text-[9.5px] xs:text-[10.5px] sm:text-xs lg:text-[10px] xl:text-[12.5px] min-[1380px]:text-[14.42px] px-1 xs:px-1.5 lg:px-1.5 xl:px-3 min-[1380px]:px-4 flex items-center justify-center gap-0.5 xs:gap-1 sm:gap-1.5 md:gap-2 transition-all cursor-pointer whitespace-nowrap min-w-0"
        >
          <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 xl:w-4 xl:h-4 text-purple-600 shrink-0" />
          <span className="bg-gradient-to-r from-[#9C73F2] to-[#5C24FF] bg-clip-text text-transparent font-semibold truncate">
            Download Records
          </span>
        </button>

        {/* Access Requests */}
        <div className="relative w-full min-w-0">
          <button
            type="button"
            data-testid="access-requests-button"
            aria-label={`Access Requests: ${pendingRequestsCount} pending review`}
            onClick={onAccessRequests}
            className="w-full h-[38px] sm:h-[44px] md:h-[46px] xl:h-[50px] min-[1380px]:h-[52px] rounded-full bg-gradient-to-r from-[#AA85F6] to-[#5C24FF] hover:opacity-95 text-white font-bold text-[9.5px] xs:text-[10.5px] sm:text-xs lg:text-[10px] xl:text-[13px] min-[1380px]:text-[16.26px] font-manrope px-1 xs:px-1.5 lg:px-1.5 xl:px-3 min-[1380px]:px-4 flex items-center justify-center gap-0.5 xs:gap-1 sm:gap-1.5 md:gap-2 shadow-xs transition-all cursor-pointer whitespace-nowrap min-w-0"
          >
            <KeyRound className="w-3 h-3 sm:w-3.5 sm:h-3.5 xl:w-4 xl:h-4 shrink-0" />
            <span className="truncate">Access Requests</span>
          </button>
          <span className="absolute -top-1.5 right-0.5 sm:-top-2 sm:right-1 bg-white text-[#6B38D4] text-[8px] xs:text-[9px] sm:text-[10px] md:text-[11px] font-bold px-1.5 py-0.2 rounded-full shadow-xs border border-purple-200 pointer-events-none font-outfit">
            {pendingRequestsCount}
          </span>
        </div>
      </div>

      {/* Julian Casablancas Hero Card */}
      <div className="relative w-full min-w-0 h-[205px] sm:h-[254px] rounded-[clamp(20px,3vw,32px)] bg-gradient-to-r from-[#A67CFB] to-[#6A3FE6] p-[clamp(12px,1.8vw,20px)] shadow-xl overflow-hidden flex items-center min-w-0">
        {/* Decorative background curves */}
        <div className="absolute top-0 left-0 w-[clamp(110px,24%,190px)] h-full bg-[#BFA2FB]/20 rounded-r-[clamp(50px,8vw,80px)] pointer-events-none" />

        {/* Inner Two-Column Flex Layout */}
        <div className="relative z-10 flex h-full w-full min-w-0 items-center justify-between gap-[clamp(8px,1.5vw,16px)]">
          {/* Left: Patient Avatar - Authentic Hero Alignment */}
          <div className="relative shrink-0 flex items-end justify-center select-none pointer-events-none self-end -ml-[clamp(12px,1.8vw,20px)] -mb-[clamp(12px,1.8vw,20px)]">
            <img
              src="/assets/avatars/julian-casablancas.png"
              alt={patient.name}
              className="h-[170px] sm:h-[225px] lg:h-[clamp(195px,17.5vw,248px)] min-[1380px]:h-[248px] w-auto object-contain object-bottom filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.2)] select-none pointer-events-none"
            />
          </div>

          {/* Right: Info, Stats & Actions */}
          <div className="flex min-w-0 flex-1 h-full flex-col justify-between text-white py-1 sm:py-1.5 md:py-2">
            {/* Name & Patient ID */}
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 w-full">
              <h2 className="text-[clamp(14px,1.4vw,20px)] sm:text-lg md:text-xl font-bold tracking-tight text-white font-inter truncate">
                {patient.name}
              </h2>
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#6B38D4] text-[#CAB1FF] text-[9px] sm:text-[10px] md:text-[11px] font-normal tracking-wide whitespace-nowrap shrink-0">
                Patient ID {patient.id}
              </span>
            </div>

            {/* Vitals Grid (Age, Gender, Blood Group) - Balanced box height and readable typography */}
            <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-2.5 w-full min-w-0">
              <div className="bg-[#6B38D4] rounded-[6px] py-1 sm:py-2 md:py-2.5 px-1 sm:px-2 text-center flex flex-col justify-center min-w-0">
                <span className="text-[8.5px] sm:text-[9.5px] md:text-[10px] font-medium text-[#B89AF8] tracking-wider uppercase font-inter leading-tight truncate">
                  AGE
                </span>
                <span className="text-[10.5px] sm:text-[12px] md:text-[13px] font-bold text-white font-inter leading-tight truncate mt-0.5">
                  {patient.age}
                </span>
              </div>
              <div className="bg-[#6B38D4] rounded-[6px] py-1 sm:py-2 md:py-2.5 px-1 sm:px-2 text-center flex flex-col justify-center min-w-0">
                <span className="text-[8.5px] sm:text-[9.5px] md:text-[10px] font-medium text-[#B89AF8] tracking-wider uppercase font-inter leading-tight truncate">
                  GENDER
                </span>
                <span className="text-[10.5px] sm:text-[12px] md:text-[13px] font-bold text-white font-inter leading-tight truncate mt-0.5">
                  {patient.gender}
                </span>
              </div>
              <div className="bg-[#6B38D4] rounded-[6px] py-1 sm:py-2 md:py-2.5 px-1 sm:px-2 text-center flex flex-col justify-center min-w-0">
                <span className="text-[8.5px] sm:text-[9.5px] md:text-[10px] font-medium text-[#B89AF8] tracking-wider uppercase font-inter leading-tight truncate">
                  BLOOD
                </span>
                <span className="text-[10.5px] sm:text-[12px] md:text-[13px] font-bold text-white font-inter leading-tight truncate mt-0.5">
                  {patient.bloodGroup}
                </span>
              </div>
            </div>

            {/* Physical Stats Strip (Height, Weight, BMI) */}
            <div className="w-full min-w-0 bg-[#6B38D4] rounded-[6px] sm:rounded-[7px] py-1 sm:py-2 md:py-2.5 px-2 sm:px-3 grid grid-cols-3 divide-x divide-white/20 border-b-[1px] border-b-[#F3F4F6]/80 text-center">
              <div className="flex flex-col items-center justify-center min-w-0">
                <span className="text-[8.5px] sm:text-[9.5px] md:text-[10px] font-semibold text-white/60 uppercase tracking-wider font-inter leading-tight">
                  HEIGHT
                </span>
                <div className="text-[10.5px] sm:text-[12px] md:text-[13px] font-bold text-white font-inter leading-tight mt-0.5">
                  {patient.height} <span className="text-[8px] sm:text-[9px] font-semibold text-white/70">cm</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center min-w-0">
                <span className="text-[8.5px] sm:text-[9.5px] md:text-[10px] font-semibold text-white/60 uppercase tracking-wider font-inter leading-tight">
                  WEIGHT
                </span>
                <div className="text-[10.5px] sm:text-[12px] md:text-[13px] font-bold text-white font-inter leading-tight mt-0.5">
                  {patient.weight} <span className="text-[8px] sm:text-[9px] font-semibold text-white/70">kg</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center min-w-0">
                <span className="text-[8.5px] sm:text-[9.5px] md:text-[10px] font-semibold text-white/60 uppercase tracking-wider font-inter leading-tight">
                  BMI
                </span>
                <div className="text-[10.5px] sm:text-[12px] md:text-[13px] font-bold text-white font-inter leading-tight mt-0.5">
                  {patient.bmi}
                </div>
              </div>
            </div>

            {/* Action Buttons: New Appointment & View Appointments */}
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2.5 md:gap-3 w-full min-w-0">
              <button
                type="button"
                onClick={onNewAppointment}
                className="w-full h-[30px] sm:h-[36px] md:h-[38px] rounded-[7px] sm:rounded-[8px] bg-white hover:bg-slate-50 text-[#6B38D4] text-[10px] sm:text-[11.5px] md:text-[12px] font-semibold flex items-center justify-center gap-1 shadow-xs transition-all cursor-pointer font-inter whitespace-nowrap px-1 min-w-0"
              >
                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#6B38D4] shrink-0" />
                <span className="truncate">New Appointment</span>
              </button>
              <button
                type="button"
                onClick={onViewAppointments}
                className="w-full h-[30px] sm:h-[36px] md:h-[38px] rounded-[7px] sm:rounded-[8px] bg-white/25 hover:bg-white/35 border border-[#E5E7EB]/70 text-white text-[10px] sm:text-[11.5px] md:text-[12px] font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer backdrop-blur-xs font-inter whitespace-nowrap px-1 min-w-0"
              >
                <span className="truncate">Appointments</span>
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/80 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
