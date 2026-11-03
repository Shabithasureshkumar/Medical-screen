import React from 'react';
import { Lock, Eye, History } from 'lucide-react';
import { LinkExpiration } from '../../types/accessRequest';

interface SecuritySettingsProps {
  expiration: LinkExpiration;
  onExpirationChange: (exp: LinkExpiration) => void;
  viewOnly: boolean;
  onViewOnlyToggle: () => void;
  notifications: boolean;
  onNotificationsToggle: () => void;
}

export const SecuritySettings: React.FC<SecuritySettingsProps> = ({
  expiration,
  onExpirationChange,
  viewOnly,
  onViewOnlyToggle,
  notifications,
  onNotificationsToggle
}) => {
  return (
    <div className="w-full rounded-[20px] sm:rounded-[24px] bg-white border border-slate-200/80 p-4 sm:p-5 flex flex-col gap-4 shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-[10px] bg-[#F3E8FF] text-[#7C3AED] flex items-center justify-center">
          <Lock className="w-4 h-4" />
        </div>
        <h3 className="text-sm sm:text-base font-bold text-[#0F172A] font-inter">
          Security Settings
        </h3>
      </div>

      {/* Link Expiration */}
      <div className="flex flex-col gap-2">
        <span className="text-[10px] sm:text-[11px] font-bold text-[#64748B] tracking-wider uppercase font-inter">
          Link Expiration
        </span>
        <div className="grid grid-cols-3 gap-2">
          {(['24h', '7d', '30d'] as LinkExpiration[]).map((exp) => {
            const isSelected = expiration === exp;
            const label = exp === '24h' ? '24h' : exp === '7d' ? '7 Days' : '30 Days';
            return (
              <button
                key={exp}
                type="button"
                data-testid={`expiration-btn-${exp}`}
                onClick={() => onExpirationChange(exp)}
                className={`py-2 rounded-[12px] text-xs font-semibold transition-all cursor-pointer text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
                  isSelected
                    ? 'bg-[#6D28D9] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* View Only Toggle Row */}
      <div className="flex items-center justify-between py-1 border-t border-slate-100 pt-3">
        <div className="flex items-start gap-2.5">
          <Eye className="w-4 h-4 text-slate-600 mt-0.5" />
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-semibold text-[#0F172A]">
              View Only
            </span>
            <span className="text-[11px] text-[#64748B]">
              No download/print
            </span>
          </div>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={viewOnly}
          aria-label="Toggle View Only mode"
          data-testid="toggle-view-only"
          onClick={onViewOnlyToggle}
          className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
            viewOnly ? 'bg-[#7C3AED]' : 'bg-slate-200'
          }`}
        >
          <span
            className={`block w-5 h-5 rounded-full bg-white shadow-xs transition-transform transform ${
              viewOnly ? 'translate-x-5.5' : 'translate-x-0.5'
            } top-0.5 absolute`}
          />
        </button>
      </div>

      {/* Access Notifications Toggle Row */}
      <div className="flex items-center justify-between py-1">
        <div className="flex items-start gap-2.5">
          <History className="w-4 h-4 text-slate-600 mt-0.5" />
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-semibold text-[#0F172A]">
              Access Notifications
            </span>
            <span className="text-[11px] text-[#64748B]">
              Alert when opened
            </span>
          </div>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={notifications}
          aria-label="Toggle Access Notifications"
          data-testid="toggle-access-notifications"
          onClick={onNotificationsToggle}
          className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
            notifications ? 'bg-[#7C3AED]' : 'bg-slate-200'
          }`}
        >
          <span
            className={`block w-5 h-5 rounded-full bg-white shadow-xs transition-transform transform ${
              notifications ? 'translate-x-5.5' : 'translate-x-0.5'
            } top-0.5 absolute`}
          />
        </button>
      </div>
    </div>
  );
};
