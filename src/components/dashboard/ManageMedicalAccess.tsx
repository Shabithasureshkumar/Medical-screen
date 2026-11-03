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
    <section className="w-full flex flex-col gap-3 sm:gap-3.5">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
        <div className="flex flex-col gap-0.5 sm:gap-1">
          <h2 className="text-lg sm:text-xl md:text-[24.37px] font-bold text-black tracking-[-0.35px] font-inter">
            Manage Medical Access
          </h2>
          <p className="text-xs sm:text-[12.37px] text-[#424754] font-inter max-w-xl leading-relaxed">
            Control who can view your health information. You can revoke or modify permissions at any time.
          </p>
        </div>

        <button
          type="button"
          onClick={onShareWithNewDoctor}
          data-testid="share-with-new-doctor-button"
          aria-label="Share with New Doctor"
          className="self-start sm:self-auto px-4 sm:px-5 h-[42px] sm:h-[52px] md:h-[58px] rounded-full bg-gradient-to-b from-[#9E33FD] to-[#5C24FF] hover:opacity-95 text-white text-xs sm:text-sm md:text-[16px] font-semibold shadow-xs flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer shrink-0 whitespace-nowrap"
        >
          <UserPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Share with New Doctor</span>
        </button>
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-[20px] w-full">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="w-full rounded-[12px] sm:rounded-[14px] md:rounded-[9.84px] bg-white border border-[#D4D2D7]/80 p-3 sm:p-4 md:p-5 shadow-xs flex flex-col justify-between gap-2.5 sm:gap-3.5"
          >
            {/* Top Doctor Row */}
            <div className="flex items-start gap-2.5 sm:gap-3.5">
              <div className="w-[64px] h-[64px] sm:w-[78px] sm:h-[78px] md:w-[93px] md:h-[93px] rounded-[14px] sm:rounded-[18px] overflow-hidden bg-purple-50 ring-1 ring-white/50 shrink-0">
                <img
                  src={doctor.avatarUrl}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 flex flex-col gap-0.5 sm:gap-1 min-w-0">
                <div className="flex flex-col items-start gap-0.5">
                  <h3 className="text-sm sm:text-base md:text-[17.35px] font-semibold text-[#1D1A23] leading-snug tracking-[-0.20px] font-inter truncate">
                    {doctor.name}
                  </h3>
                  <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-[hsla(199,98%,62%,0.20)] text-[#00668A] text-[7.5px] sm:text-[8.61px] font-bold tracking-[0.86px] uppercase font-inter whitespace-nowrap">
                    {doctor.role}
                  </span>
                </div>
                <div className="text-[9.5px] sm:text-[10.56px] text-[#475569] font-medium font-inter truncate">
                  {doctor.specialty}
                </div>
                <div className="flex items-center gap-1 mt-0.5 text-xs">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-[#1E293B] text-[9.5px] sm:text-[10.56px] ml-0.5 sm:ml-1 font-inter">{doctor.rating}</span>
                  <span className="text-[#64748B] text-[9.5px] sm:text-[10.56px] font-inter">({doctor.reviewCount})</span>
                </div>
              </div>

              {/* Action Buttons on Right */}
              <div className="flex flex-col gap-1 sm:gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => onRevokeAccess?.(doctor.id)}
                  className="w-[72px] sm:w-[82px] md:w-[92px] h-[30px] sm:h-[36px] md:h-[44px] rounded-[8px] sm:rounded-[10.33px] border border-[hsla(0,75%,42%,0.20)] text-[#BA1A1A] hover:bg-red-50 text-[9px] sm:text-[10.33px] font-semibold transition-colors cursor-pointer flex items-center justify-center font-inter whitespace-nowrap"
                >
                  Revoke Access
                </button>
                <button
                  type="button"
                  onClick={() => onViewAndEdit?.(doctor.id)}
                  className="w-[72px] sm:w-[82px] md:w-[92px] h-[30px] sm:h-[36px] md:h-[44px] rounded-[8px] sm:rounded-[10.33px] bg-gradient-to-b from-[#A075FA] to-[#5C24FF] hover:opacity-95 text-white text-[9px] sm:text-[10.33px] font-semibold transition-all shadow-xs cursor-pointer flex items-center justify-center font-inter whitespace-nowrap"
                >
                  View & Edit
                </button>
              </div>
            </div>

            {/* Permissions Box */}
            <div className="rounded-[10px] sm:rounded-[13.44px] bg-[hsla(262,90%,46%,0.05)] p-2.5 sm:p-3.5 md:p-4 border border-purple-100/50 flex flex-col gap-2 sm:gap-2.5">
              <h4 className="text-[9px] sm:text-[10.08px] font-bold text-[#424754] tracking-[1.01px] uppercase font-inter">
                PERMISSIONS
              </h4>

              {/* Permission 1 */}
              <div className="flex items-center justify-between text-xs py-0.5">
                <div className="flex items-center gap-1.5 sm:gap-2 text-[#191C1E] font-medium text-[10.5px] sm:text-[11.76px] font-inter">
                  <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-600" />
                  <span>Medical Records</span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-label={`Toggle Medical Records access for ${doctor.name}`}
                  aria-checked={doctor.permissions.medicalRecords}
                  onClick={() => onTogglePermission?.(doctor.id, 'medicalRecords')}
                  className={`w-8 sm:w-9 h-4.5 sm:h-5 rounded-full transition-colors relative cursor-pointer focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:outline-none ${
                    doctor.permissions.medicalRecords ? 'bg-[#6B38D4]' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`block w-3.5 sm:w-4 h-3.5 sm:h-4 rounded-full bg-white shadow-xs transition-transform transform ${
                      doctor.permissions.medicalRecords ? 'translate-x-3.5 sm:translate-x-4' : 'translate-x-0.5'
                    } top-0.5 absolute`}
                  />
                </button>
              </div>

              {/* Permission 2 */}
              <div className="flex items-center justify-between text-xs py-0.5">
                <div className="flex items-center gap-1.5 sm:gap-2 text-[#191C1E] font-medium text-[10.5px] sm:text-[11.76px] font-inter">
                  <FlaskConical className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-600" />
                  <span>Laboratory Results</span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-label={`Toggle Laboratory Results access for ${doctor.name}`}
                  aria-checked={doctor.permissions.laboratoryResults}
                  onClick={() => onTogglePermission?.(doctor.id, 'laboratoryResults')}
                  className={`w-8 sm:w-9 h-4.5 sm:h-5 rounded-full transition-colors relative cursor-pointer focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:outline-none ${
                    doctor.permissions.laboratoryResults ? 'bg-[#6B38D4]' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`block w-3.5 sm:w-4 h-3.5 sm:h-4 rounded-full bg-white shadow-xs transition-transform transform ${
                      doctor.permissions.laboratoryResults ? 'translate-x-3.5 sm:translate-x-4' : 'translate-x-0.5'
                    } top-0.5 absolute`}
                  />
                </button>
              </div>

              {/* Permission 3 */}
              <div className="flex items-center justify-between text-xs py-0.5">
                <div className="flex items-center gap-1.5 sm:gap-2 text-[#191C1E] font-medium text-[10.5px] sm:text-[11.76px] font-inter">
                  <Pill className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-600" />
                  <span>Prescriptions & Medications</span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-label={`Toggle Prescriptions access for ${doctor.name}`}
                  aria-checked={doctor.permissions.prescriptions}
                  onClick={() => onTogglePermission?.(doctor.id, 'prescriptions')}
                  className={`w-8 sm:w-9 h-4.5 sm:h-5 rounded-full transition-colors relative cursor-pointer focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:outline-none ${
                    doctor.permissions.prescriptions ? 'bg-[#6B38D4]' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`block w-3.5 sm:w-4 h-3.5 sm:h-4 rounded-full bg-white shadow-xs transition-transform transform ${
                      doctor.permissions.prescriptions ? 'translate-x-3.5 sm:translate-x-4' : 'translate-x-0.5'
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
