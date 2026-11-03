import React, { useEffect, useState } from 'react';
import { X, ShieldCheck, AlertTriangle, Check } from 'lucide-react';
import { AccessRequestItem } from '../../types/access';

interface AccessDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: AccessRequestItem | null;
  mode?: 'details' | 'permissions' | 'revoke';
  onConfirmAction?: (request: AccessRequestItem, action: string, updatedAccessLevel?: string) => void;
}

export const AccessDetailModal: React.FC<AccessDetailModalProps> = ({
  isOpen,
  onClose,
  request,
  mode = 'details',
  onConfirmAction
}) => {
  const [selectedAccessLevel, setSelectedAccessLevel] = useState<string>('Full Access');
  const [permissions, setPermissions] = useState({
    medicalRecords: true,
    labAndImaging: true,
    prescriptions: true,
    downloadReports: true
  });

  useEffect(() => {
    if (request) {
      setSelectedAccessLevel(request.accessLevel || 'Full Access');
      const isFull = request.accessLevel.toLowerCase().includes('full');
      const canDownload = isFull || request.accessLevel.toLowerCase().includes('download');
      setPermissions({
        medicalRecords: true,
        labAndImaging: true,
        prescriptions: isFull || !request.accessLevel.toLowerCase().includes('emergency'),
        downloadReports: canDownload
      });
    }
  }, [request, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !request) return null;

  const togglePerm = (key: keyof typeof permissions) => {
    setPermissions((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      const activeCount = Object.values(next).filter(Boolean).length;
      if (activeCount === 4) {
        setSelectedAccessLevel('Full Access');
      } else if (next.downloadReports) {
        setSelectedAccessLevel('View & Download');
      } else if (activeCount <= 1) {
        setSelectedAccessLevel('Emergency Only');
      } else {
        setSelectedAccessLevel('View Only');
      }
      return next;
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="access-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white rounded-[24px] shadow-2xl border border-slate-100 p-5 sm:p-7 flex flex-col gap-4 font-inter relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 pr-8">
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
            <img
              src={request.avatarUrl}
              alt={request.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h3 id="access-modal-title" className="text-lg font-bold text-slate-900 leading-tight">
              {mode === 'revoke'
                ? 'Confirm Access Revocation'
                : mode === 'permissions'
                ? 'Manage Permissions'
                : 'Access Request Details'}
            </h3>
            <span className="text-xs text-slate-500 mt-0.5">
              {request.name} ({request.relationship}) • {request.accessLevel}
            </span>
          </div>
        </div>

        {/* Modal Content */}
        {mode === 'revoke' ? (
          <div className="py-2 flex flex-col gap-3">
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-800 text-xs sm:text-sm">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">Immediate Data Revocation</strong>
                This action will immediately terminate {request.name}'s permission to view or manage your clinical records and health timeline.
              </div>
            </div>
            <p className="text-xs text-slate-500">
              You may re-grant permissions at any time through the Family Access directory.
            </p>
          </div>
        ) : mode === 'permissions' ? (
          <div className="flex flex-col gap-3 text-xs sm:text-sm">
            <div className="bg-[#F8F9FD] rounded-xl p-3.5 border border-slate-100 flex items-center justify-between">
              <span className="font-semibold text-slate-600 text-xs uppercase tracking-wider">
                Effective Access Tier
              </span>
              <span
                data-testid="modal-effective-access-level"
                className="bg-[#F3E8FF] text-[#6B21A8] font-bold px-2.5 py-0.5 rounded-full text-xs"
              >
                {selectedAccessLevel}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {[
                {
                  key: 'medicalRecords' as const,
                  label: 'Medical Records & Clinical Notes',
                  desc: 'View consultation notes and longitudinal health history'
                },
                {
                  key: 'labAndImaging' as const,
                  label: 'Lab & Diagnostic Imaging Results',
                  desc: 'View blood panels, lipid trends, and radiology studies'
                },
                {
                  key: 'prescriptions' as const,
                  label: 'Active Prescriptions & Pharmacy',
                  desc: 'View medication schedules and refill reminders'
                },
                {
                  key: 'downloadReports' as const,
                  label: 'Download & Export PDF Reports',
                  desc: 'Allow downloading encrypted PDF medical summaries'
                }
              ].map((perm) => {
                const isChecked = permissions[perm.key];
                return (
                  <button
                    key={perm.key}
                    type="button"
                    role="switch"
                    aria-checked={isChecked}
                    data-testid={`perm-toggle-${perm.key}`}
                    onClick={() => togglePerm(perm.key)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      isChecked
                        ? 'bg-purple-50/50 border-purple-200'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800 text-xs sm:text-sm">
                        {perm.label}
                      </span>
                      <span className="text-[11px] text-slate-500">{perm.desc}</span>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isChecked
                          ? 'bg-[#5C24FF] text-white'
                          : 'bg-slate-100 border border-slate-300 text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 text-slate-500 text-xs pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Changes take effect immediately and are recorded in the HIPAA audit trail.</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 text-xs sm:text-sm">
            <div className="bg-[#F8F9FD] rounded-xl p-3.5 border border-slate-100 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-500 text-xs uppercase tracking-wider">
                  Access Level
                </span>
                <span className="bg-[#F3E8FF] text-[#6B21A8] font-bold px-2.5 py-0.5 rounded-full text-xs">
                  {request.accessLevel}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-500 text-xs uppercase tracking-wider">
                  Validity Duration
                </span>
                <span className="font-semibold text-slate-700">{request.duration}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-500 text-xs uppercase tracking-wider">
                  Requested Date
                </span>
                <span className="font-semibold text-slate-700">{request.requestedDate}</span>
              </div>
              {request.grantedDate && (
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-500 text-xs uppercase tracking-wider">
                    Granted Date
                  </span>
                  <span className="font-semibold text-slate-700">{request.grantedDate}</span>
                </div>
              )}
              {request.expiresDate && (
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-500 text-xs uppercase tracking-wider">
                    Expiration Date
                  </span>
                  <span className="font-semibold text-slate-700">{request.expiresDate}</span>
                </div>
              )}
            </div>

            <div>
              <span className="font-semibold text-slate-700 text-xs uppercase tracking-wider block mb-1">
                Clinical Reason & Purpose
              </span>
              <p className="text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed text-xs">
                {request.rejectionReason
                  ? `Rejection Reason: "${request.rejectionReason}"`
                  : request.reason}
              </p>
            </div>

            <div className="flex items-center gap-2 text-slate-500 text-xs pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>HIPAA privacy & audit logging enabled for this entity.</span>
            </div>
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            Cancel
          </button>
          {mode === 'revoke' ? (
            <button
              type="button"
              onClick={() => {
                onConfirmAction?.(request, 'revoke');
                onClose();
              }}
              className="px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
            >
              Confirm Revocation
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                onConfirmAction?.(request, 'save', selectedAccessLevel);
                onClose();
              }}
              className="px-5 py-2 rounded-full bg-[#5C24FF] hover:bg-[#4C1DE6] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
