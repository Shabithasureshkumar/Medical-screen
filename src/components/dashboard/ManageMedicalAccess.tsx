import React from 'react';
import { UserPlus, Star, FileText, FlaskConical, Pill } from 'lucide-react';
import { DoctorAccess } from '../../types/medical';

interface ManageMedicalAccessProps {
  doctors: DoctorAccess[];
  onTogglePermission?: (doctorId: string, permission: 'medicalRecords' | 'laboratoryResults' | 'prescriptions') => void;
  onRevokeAccess?: (doctorId: string) => void;
  onViewAndEdit?: (doctorId: string) => void;
  onShareWithNewDoctor?: () => void;
}

export const ManageMedicalAccess: React.FC<ManageMedicalAccessProps> = ({
  doctors,
  onTogglePermission,
  onRevokeAccess,
  onViewAndEdit,
  onShareWithNewDoctor
}) => {
  return (
    <section className="w-full flex flex-col gap-4">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Manage Medical Access
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
            Control who can view your health information. You can revoke or modify permissions at any time.
          </p>
        </div>

        <button
          type="button"
          onClick={onShareWithNewDoctor}
          className="h-11 sm:h-12 px-6 rounded-full bg-gradient-to-r from-[#9E33FD] to-[#5C24FF] hover:opacity-95 text-white text-sm font-semibold shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Share with New Doctor</span>
        </button>
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="rounded-[18px] bg-white border border-slate-200/80 p-4 sm:p-5 shadow-xs flex flex-col gap-4"
          >
            {/* Doctor Info Top */}
            <div className="flex items-start gap-3.5">
              <div className="w-20 sm:w-[90px] h-20 sm:h-[90px] rounded-[18px] overflow-hidden bg-purple-50 ring-1 ring-purple-100 shrink-0">
                <img
                  src={doctor.avatarUrl}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 flex flex-col gap-1 min-w-0">
                <div className="flex flex-col items-start gap-1">
                  <h3 className="text-base sm:text-[17px] font-semibold text-slate-900 leading-tight">
                    {doctor.name}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#00668A]/10 text-[#00668A] text-[9.5px] font-bold tracking-wider uppercase">
                    {doctor.role}
                  </span>
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-medium">
                  {doctor.specialty}
                </div>
                <div className="flex items-center gap-1 mt-0.5 text-xs">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-slate-800 ml-1">{doctor.rating}</span>
                  <span className="text-slate-400 text-[10.5px]">({doctor.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => onRevokeAccess?.(doctor.id)}
                  className="px-3 py-1.5 rounded-[10px] border border-red-200 text-[#BA1A1A] hover:bg-red-50 text-[11px] font-semibold transition-colors cursor-pointer"
                >
                  Revoke Access
                </button>
                <button
                  type="button"
                  onClick={() => onViewAndEdit?.(doctor.id)}
                  className="px-3 py-1.5 rounded-[10px] bg-gradient-to-b from-[#A075FA] to-[#5C24FF] hover:opacity-95 text-white text-[11px] font-semibold transition-all shadow-xs cursor-pointer"
                >
                  View & Edit
                </button>
              </div>
            </div>

            {/* Permissions Box */}
            <div className="rounded-[13px] bg-purple-500/[0.04] p-3 sm:p-4 border border-purple-100/60 flex flex-col gap-2.5">
              <h4 className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">
                Permissions
              </h4>

              {/* Permission 1: Medical Records */}
              <div className="flex items-center justify-between text-xs py-0.5">
                <div className="flex items-center gap-2 text-slate-800 font-medium">
                  <FileText className="w-3.5 h-3.5 text-purple-600" />
                  <span>Medical Records</span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={doctor.permissions.medicalRecords}
                  onClick={() => onTogglePermission?.(doctor.id, 'medicalRecords')}
                  className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                    doctor.permissions.medicalRecords ? 'bg-[#6B38D4]' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white shadow-xs transition-transform transform ${
                      doctor.permissions.medicalRecords ? 'translate-x-4' : 'translate-x-0.5'
                    } top-0.5 absolute`}
                  />
                </button>
              </div>

              {/* Permission 2: Laboratory Results */}
              <div className="flex items-center justify-between text-xs py-0.5">
                <div className="flex items-center gap-2 text-slate-800 font-medium">
                  <FlaskConical className="w-3.5 h-3.5 text-purple-600" />
                  <span>Laboratory Results</span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={doctor.permissions.laboratoryResults}
                  onClick={() => onTogglePermission?.(doctor.id, 'laboratoryResults')}
                  className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                    doctor.permissions.laboratoryResults ? 'bg-[#6B38D4]' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white shadow-xs transition-transform transform ${
                      doctor.permissions.laboratoryResults ? 'translate-x-4' : 'translate-x-0.5'
                    } top-0.5 absolute`}
                  />
                </button>
              </div>

              {/* Permission 3: Prescriptions & Medications */}
              <div className="flex items-center justify-between text-xs py-0.5">
                <div className="flex items-center gap-2 text-slate-800 font-medium">
                  <Pill className="w-3.5 h-3.5 text-purple-600" />
                  <span>Prescriptions & Medications</span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={doctor.permissions.prescriptions}
                  onClick={() => onTogglePermission?.(doctor.id, 'prescriptions')}
                  className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                    doctor.permissions.prescriptions ? 'bg-[#6B38D4]' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white shadow-xs transition-transform transform ${
                      doctor.permissions.prescriptions ? 'translate-x-4' : 'translate-x-0.5'
                    } top-0.5 absolute`}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
