import React from 'react';
import { Upload, Download, KeyRound, Calendar, ChevronRight } from 'lucide-react';
import { PatientProfile } from '../../types/medical';

interface PatientProfileCardProps {
  patient: PatientProfile;
  onUploadFile?: () => void;
  onDownloadRecords?: () => void;
  onAccessRequests?: () => void;
  onNewAppointment?: () => void;
  onViewAppointments?: () => void;
}

export const PatientProfileCard: React.FC<PatientProfileCardProps> = ({
  patient,
  onUploadFile,
  onDownloadRecords,
  onAccessRequests,
  onNewAppointment,
  onViewAppointments
}) => {
  return (
    <div className="w-full flex flex-col gap-3.5">
      {/* Action Buttons Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 w-full">
        {/* Upload New File */}
        <button
          type="button"
          onClick={onUploadFile}
          className="h-[50px] sm:h-[52px] rounded-full bg-gradient-to-b from-[#9C73F2] to-[#5C24FF] hover:opacity-95 text-white font-medium text-xs sm:text-[14px] px-4 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <Upload className="w-4 h-4" />
          <span>Upload New File</span>
        </button>

        {/* Download Records */}
        <button
          type="button"
          onClick={onDownloadRecords}
          className="h-[50px] sm:h-[52px] rounded-full bg-purple-100/70 hover:bg-purple-100 text-purple-700 font-medium text-xs sm:text-[14px] px-4 flex items-center justify-center gap-2 border border-purple-200/50 transition-all cursor-pointer"
        >
          <Download className="w-4 h-4 text-purple-600" />
          <span className="bg-gradient-to-r from-[#9C73F2] to-[#5C24FF] bg-clip-text text-transparent font-semibold">
            Download Records
          </span>
        </button>

        {/* Access Requests */}
        <div className="relative">
          <button
            type="button"
            onClick={onAccessRequests}
            className="w-full h-[50px] sm:h-[52px] rounded-full bg-gradient-to-r from-[#AA85F6] to-[#5C24FF] hover:opacity-95 text-white font-bold text-xs sm:text-[15px] px-4 flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <KeyRound className="w-4 h-4" />
            <span>Access Requests</span>
          </button>
          <span className="absolute -top-1.5 -right-1 bg-white text-[#6B38D4] text-[11px] font-bold px-2 py-0.5 rounded-full shadow-md border border-purple-200 pointer-events-none font-outfit">
            12+
          </span>
        </div>
      </div>

      {/* Julian Casablancas Hero Card */}
      <div className="w-full min-h-[254px] rounded-[32px] sm:rounded-[40px] bg-gradient-to-r from-[#A67CFB] to-[#6A3FE6] p-4 sm:p-6 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Patient Avatar & Silhouette */}
        <div className="flex items-center justify-center relative shrink-0">
          <div className="w-36 sm:w-44 md:w-48 h-48 sm:h-56 relative flex items-end justify-center">
            <img
              src={patient.avatarUrl}
              alt={patient.name}
              className="w-full h-full object-contain object-bottom select-none pointer-events-none filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.15)]"
            />
          </div>
        </div>

        {/* Right: Info & Stats */}
        <div className="flex-1 flex flex-col gap-3.5 z-10 w-full text-white">
          {/* Name & Patient ID */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h2 className="text-2xl sm:text-[23px] font-bold tracking-tight text-white">{patient.name}</h2>
            <span className="self-start px-2.5 py-0.5 rounded-full bg-[#6B38D4] text-[#CAB1FF] text-[10.5px] font-medium tracking-wide">
              Patient ID {patient.id}
            </span>
          </div>

          {/* Vitals Grid (Age, Gender, Blood Group) */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-[#6B38D4]/90 rounded-[6px] py-1.5 px-2 text-center flex flex-col justify-center">
              <span className="text-[9.5px] font-semibold text-[#B89AF8] tracking-wider uppercase">AGE</span>
              <span className="text-xs sm:text-[12px] font-bold text-white">{patient.age}</span>
            </div>
            <div className="bg-[#6B38D4]/90 rounded-[6px] py-1.5 px-2 text-center flex flex-col justify-center">
              <span className="text-[9.5px] font-semibold text-[#B89AF8] tracking-wider uppercase">GENDER</span>
              <span className="text-xs sm:text-[12px] font-bold text-white">{patient.gender}</span>
            </div>
            <div className="bg-[#6B38D4]/90 rounded-[6px] py-1.5 px-2 text-center flex flex-col justify-center">
              <span className="text-[9.5px] font-semibold text-[#B89AF8] tracking-wider uppercase">BLOOD GROUP</span>
              <span className="text-xs sm:text-[12px] font-bold text-white">{patient.bloodGroup}</span>
            </div>
          </div>

          {/* Physical Stats Strip (Height, Weight, BMI) */}
          <div className="bg-[#6B38D4]/90 rounded-[7px] py-2 px-3 grid grid-cols-3 divide-x divide-white/20 text-center">
            <div className="flex flex-col items-center justify-center">
              <span className="text-[8px] font-bold text-white/60 uppercase tracking-widest">HEIGHT</span>
              <div className="text-xs sm:text-[11.5px] font-bold text-white">
                {patient.height} <span className="text-[8px] font-normal text-white/80">cm</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-[8px] font-bold text-white/60 uppercase tracking-widest">WEIGHT</span>
              <div className="text-xs sm:text-[11.5px] font-bold text-white">
                {patient.weight} <span className="text-[8px] font-normal text-white/80">kg</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-[8px] font-bold text-white/60 uppercase tracking-widest">BMI</span>
              <div className="text-xs sm:text-[11.5px] font-bold text-white">{patient.bmi}</div>
            </div>
          </div>

          {/* Action Buttons: New Appointment & View Appointments */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={onNewAppointment}
              className="h-10 sm:h-11 rounded-[9px] bg-white hover:bg-slate-50 text-[#6B38D4] text-xs sm:text-[13px] font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#6B38D4]" />
              <span>New Appointment</span>
            </button>
            <button
              type="button"
              onClick={onViewAppointments}
              className="h-10 sm:h-11 rounded-[9px] bg-white/25 hover:bg-white/35 border border-white/40 text-white text-xs sm:text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer backdrop-blur-xs"
            >
              <span>View Appointments</span>
              <ChevronRight className="w-3.5 h-3.5 text-white/80" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
