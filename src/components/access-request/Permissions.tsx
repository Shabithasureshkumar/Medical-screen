import React from 'react';
import { Shield } from 'lucide-react';
import { PermissionType } from '../../types/accessRequest';

interface PermissionsProps {
  permission: PermissionType;
  onPermissionChange: (perm: PermissionType) => void;
}

export const Permissions: React.FC<PermissionsProps> = ({
  permission,
  onPermissionChange
}) => {
  return (
    <div className="w-full rounded-[20px] sm:rounded-[24px] bg-white border border-slate-200/80 p-4 sm:p-5 flex flex-col gap-3.5 shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Shield className="w-4 h-4 text-[#7C3AED]" />
        <h3 className="text-sm sm:text-base font-bold text-[#0F172A] font-inter">
          Permissions
        </h3>
      </div>

      {/* Options */}
      <div role="radiogroup" aria-label="Permissions" className="flex flex-col gap-2.5">
        {/* Option 1: View Only */}
        <div
          role="radio"
          aria-checked={permission === 'view_only'}
          tabIndex={0}
          data-testid="permission-option-view-only"
          onClick={() => onPermissionChange('view_only')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onPermissionChange('view_only');
            } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
              e.preventDefault();
              onPermissionChange('view_share_download');
            }
          }}
          className={`w-full rounded-[16px] p-3 sm:p-3.5 flex items-center gap-3 cursor-pointer transition-all border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
            permission === 'view_only'
              ? 'bg-[#F8FAFC] border-[#7C3AED]/40'
              : 'bg-white border-slate-200/70 hover:border-slate-300'
          }`}
        >
          <div className="shrink-0">
            {permission === 'view_only' ? (
              <div className="w-5 h-5 rounded-full border-2 border-[#7C3AED] flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#7C3AED]" />
              </div>
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold text-[#0F172A]">
              View Only
            </span>
            <span className="text-[11px] text-[#64748B]">
              User can see records but not download.
            </span>
          </div>
        </div>

        {/* Option 2: View & Share & Download */}
        <div
          role="radio"
          aria-checked={permission === 'view_share_download'}
          tabIndex={0}
          data-testid="permission-option-view-share-download"
          onClick={() => onPermissionChange('view_share_download')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onPermissionChange('view_share_download');
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
              e.preventDefault();
              onPermissionChange('view_only');
            }
          }}
          className={`w-full rounded-[16px] p-3 sm:p-3.5 flex items-center gap-3 cursor-pointer transition-all border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
            permission === 'view_share_download'
              ? 'bg-[#F8FAFC] border-[#7C3AED]/40'
              : 'bg-white border-slate-200/70 hover:border-slate-300'
          }`}
        >
          <div className="shrink-0">
            {permission === 'view_share_download' ? (
              <div className="w-5 h-5 rounded-full border-2 border-[#7C3AED] flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#7C3AED]" />
              </div>
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold text-[#0F172A]">
              View &amp; Share &amp; Download
            </span>
            <span className="text-[11px] text-[#64748B]">
              Allows saving high-res PDF reports.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
