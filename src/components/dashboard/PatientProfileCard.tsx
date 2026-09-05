import React from 'react';
import { Upload, Download, KeyRound, Plus, ChevronRight } from 'lucide-react';
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
    <div className="w-full lg:w-[618px] flex flex-col gap-3.5 shrink-0">
      {/* Top 3 Quick Action Buttons */}
      <div className="flex items-center gap-[12.36px] w-full">
        {/* Upload New File */}
        <button
          type="button"
          onClick={onUploadFile}
          className="flex-1 h-[52px] rounded-full bg-gradient-to-b from-[#9C73F2] to-[#5C24FF] hover:opacity-95 text-white font-medium text-[14.42px] px-4 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <Upload className="w-4 h-4" />
          <span>Upload New File</span>
        </button>

        {/* Download Records */}
        <button
          type="button"
          onClick={onDownloadRecords}
          className="flex-1 h-[52px] rounded-full bg-[hsla(260,64%,53%,0.10)] hover:bg-purple-100 text-purple-700 font-medium text-[14.42px] px-4 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Download className="w-4 h-4 text-purple-600" />
          <span className="bg-gradient-to-r from-[#9C73F2] to-[#5C24FF] bg-clip-text text-transparent font-semibold">
            Download Records
          </span>
        </button>

        {/* Access Requests */}
        <div className="relative flex-1">
          <button
            type="button"
            onClick={onAccessRequests}
            className="w-full h-[52px] rounded-full bg-gradient-to-r from-[#AA85F6] to-[#5C24FF] hover:opacity-95 text-white font-bold text-[16.26px] font-manrope px-4 flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <KeyRound className="w-4 h-4" />
            <span>Access Requests</span>
          </button>
          <span className="absolute -top-2 -right-1 bg-white text-[#6B38D4] text-[11px] font-bold px-2 py-0.5 rounded-full shadow-md border border-purple-200 pointer-events-none font-outfit">
            12+
          </span>
        </div>
      </div>

      {/* Julian Casablancas Hero Card */}
      <div className="w-full h-[254px] rounded-[40.22px] bg-gradient-to-r from-[#A67CFB] to-[#6A3FE6] p-5 sm:p-6 shadow-xl relative overflow-hidden flex items-center justify-between">
        {/* Decorative background curves */}
        <div className="absolute top-0 left-0 w-[240px] h-full bg-[#BFA2FB]/20 rounded-r-[90px] pointer-events-none" />

        {/* Left: Patient Avatar */}
        <div className="relative z-10 w-[150px] sm:w-[170px] h-[240px] -mb-4 flex items-end justify-center shrink-0">
          <img
            src="/assets/avatars/julian-casablancas.png"
            alt={patient.name}
            className="w-full h-full object-contain object-bottom select-none pointer-events-none filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.2)]"
          />
        </div>

        {/* Right: Info & Stats */}
        <div className="relative z-10 flex-1 flex flex-col gap-2.5 pl-2 sm:pl-4 text-white">
          {/* Name & Patient ID */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h2 className="text-xl sm:text-[23.03px] font-bold tracking-tight text-white font-inter">
              {patient.name}
            </h2>
            <span className="self-start px-2.5 py-0.5 rounded-full bg-[#6B38D4] text-[#CAB1FF] text-[10.63px] font-normal tracking-wide">
              Patient ID {patient.id}
            </span>
          </div>

          {/* Vitals Grid (Age, Gender, Blood Group) */}
          <div className="grid grid-cols-3 gap-2 w-full max-w-[340px]">
            <div className="bg-[#6B38D4] rounded-[5px] py-1.5 px-2 text-center flex flex-col justify-center">
              <span className="text-[9.93px] font-semibold text-[#B89AF8] tracking-wider uppercase font-inter">
                AGE
              </span>
              <span className="text-xs sm:text-[11.58px] font-bold text-white font-inter">
                {patient.age}
              </span>
            </div>
            <div className="bg-[#6B38D4] rounded-[5px] py-1.5 px-2 text-center flex flex-col justify-center">
              <span className="text-[9.93px] font-semibold text-[#B89AF8] tracking-wider uppercase font-inter">
                GENDER
              </span>
              <span className="text-xs sm:text-[11.58px] font-bold text-white font-inter">
                {patient.gender}
              </span>
            </div>
            <div className="bg-[#6B38D4] rounded-[5px] py-1.5 px-2 text-center flex flex-col justify-center">
              <span className="text-[9.93px] font-semibold text-[#B89AF8] tracking-wider uppercase font-inter">
                BLOOD GROUP
              </span>
              <span className="text-xs sm:text-[11.58px] font-bold text-white font-inter">
                {patient.bloodGroup}
              </span>
            </div>
          </div>

          {/* Physical Stats Strip (Height, Weight, BMI) */}
          <div className="w-full max-w-[340px] bg-[#6B38D4] rounded-[6.92px] py-1.5 px-3 grid grid-cols-3 divide-x divide-white/20 border-b-[1.44px] border-b-[#F3F4F6] text-center">
            <div className="flex flex-col items-center justify-center">
              <span className="text-[6.92px] font-bold text-white/50 uppercase tracking-widest font-inter">
                HEIGHT
              </span>
              <div className="text-xs sm:text-[11.07px] font-bold text-white font-inter">
                {patient.height} <span className="text-[6.92px] font-bold">cm</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-[6.92px] font-bold text-white/50 uppercase tracking-widest font-inter">
                WEIGHT
              </span>
              <div className="text-xs sm:text-[11.07px] font-bold text-white font-inter">
                {patient.weight} <span className="text-[6.92px] font-bold">kg</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-[6.92px] font-bold text-white/50 uppercase tracking-widest font-inter">
                BMI
              </span>
              <div className="text-xs sm:text-[11.07px] font-bold text-white font-inter">
                {patient.bmi}
              </div>
            </div>
          </div>

          {/* Action Buttons: New Appointment & View Appointments */}
          <div className="flex items-center gap-2 pt-1 w-full max-w-[340px]">
            <button
              type="button"
              onClick={onNewAppointment}
              className="flex-1 h-[38px] sm:h-[42px] rounded-[8.78px] bg-white hover:bg-slate-50 text-[#6B38D4] text-xs sm:text-[13.02px] font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer font-inter"
            >
              <Plus className="w-4 h-4 text-[#6B38D4]" />
              <span>New Appointment</span>
            </button>
            <button
              type="button"
              onClick={onViewAppointments}
              className="flex-1 h-[38px] sm:h-[42px] rounded-[8.78px] bg-white/25 hover:bg-white/35 border border-[#E5E7EB]/70 text-white text-xs sm:text-[12.38px] font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer backdrop-blur-xs font-inter"
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
