import React from 'react';
import { FlaskConical, Video, Megaphone } from 'lucide-react';
import { ConsentSettingItem } from '../../data/medicalRecordsData';

interface ConsentPrivacyProps {
  settings: ConsentSettingItem[];
  onToggleSetting: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

export const ConsentPrivacy: React.FC<ConsentPrivacyProps> = ({
  settings,
  onToggleSetting,
  onViewDetails
}) => {
  const renderIcon = (type: ConsentSettingItem['iconType']) => {
    switch (type) {
      case 'research':
        return <FlaskConical className="w-5 h-5 text-[#7C3AED]" />;
      case 'telemedicine':
        return <Video className="w-5 h-5 text-[#7C3AED]" />;
      case 'marketing':
      default:
        return <Megaphone className="w-5 h-5 text-[#7C3AED]" />;
    }
  };

  return (
    <section className="w-full flex flex-col gap-4 py-2">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
          Consent &amp; Privacy Settings
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1 leading-relaxed">
          Manage your digital footprint and medical data permissions. You have full control over how your health information is used and shared.
        </p>
      </div>

      {/* 3 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5 w-full">
        {settings.map((item) => {
          return (
            <div
              key={item.id}
              className="bg-white rounded-[20px] border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between gap-5"
            >
              {/* Top: Icon, Title, Description */}
              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-[12px] bg-[#EDE9FE] flex items-center justify-center shrink-0">
                  {renderIcon(item.iconType)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0F172A]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-normal leading-relaxed mt-1.5">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Middle: Status Badge + Functional Switch */}
              <div className="flex items-center justify-between pt-1">
                {/* Status indicator */}
                {item.status === 'ACTIVE' && (
                  <span className="bg-[#7C3AED] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    ACTIVE
                  </span>
                )}
                {item.status === 'REVOKED' && (
                  <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    REVOKED
                  </span>
                )}
                {item.status === 'TOGGLE TO ENABLE' && (
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                    TOGGLE TO ENABLE
                  </span>
                )}

                {/* Switch Toggle */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={item.enabled}
                  onClick={() => onToggleSetting(item.id)}
                  aria-label={`Toggle ${item.title}`}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                    item.enabled ? 'bg-[#7C3AED]' : 'bg-slate-200'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out mt-0.5 ${
                      item.enabled ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Bottom: Footer Info / Action */}
              <div className="pt-2 border-t border-slate-100">
                {item.footerIsAction ? (
                  <button
                    type="button"
                    onClick={() => onViewDetails?.(item.id)}
                    className="text-xs font-semibold text-[#7C3AED] hover:text-[#5C24FF] transition-colors cursor-pointer"
                  >
                    {item.footerText}
                  </button>
                ) : (
                  <span className="text-[11px] text-slate-400 font-normal">
                    {item.footerText}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
