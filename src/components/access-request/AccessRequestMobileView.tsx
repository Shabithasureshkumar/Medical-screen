import React, { useState } from 'react';
import {
  Search,
  X,
  Check,
  Lock,
  Eye,
  EyeOff,
  History,
  Shield,
  Send,
  FileText,
  FlaskConical,
  ArrowLeft,
  Key
} from 'lucide-react';
import {
  ClinicType,
  ExternalTab,
  DoctorRecipient,
  FamilyMemberRecipient,
  ShareRecordItem,
  SecuritySettingsState,
  LinkExpiration,
  PermissionType
} from '../../types/accessRequest';

interface AccessRequestMobileViewProps {
  clinicType: ClinicType;
  onClinicTypeChange: (type: ClinicType) => void;
  externalTab: ExternalTab;
  onExternalTabChange: (tab: ExternalTab) => void;
  doctorEmail: string;
  onDoctorEmailChange: (email: string) => void;
  doctors: DoctorRecipient[];
  selectedDoctorIds: string[];
  onToggleDoctor: (id: string) => void;
  familyMembers: FamilyMemberRecipient[];
  selectedFamilyMemberId: string | null;
  onSelectFamilyMember: (id: string) => void;
  onRequestFamilyAccess: (member: FamilyMemberRecipient) => void;
  records: ShareRecordItem[];
  selectedRecordIds: string[];
  onToggleRecord: (id: string) => void;
  securitySettings: SecuritySettingsState;
  onExpirationChange: (exp: LinkExpiration) => void;
  onViewOnlyToggle: () => void;
  onNotificationsToggle: () => void;
  onPermissionChange: (perm: PermissionType) => void;
  onPasswordProtectedToggle: () => void;
  onPasswordChange: (val: string) => void;
  onConfirmPasswordChange: (val: string) => void;
  additionalMessage: string;
  onAdditionalMessageChange: (val: string) => void;
  onBackToDashboard: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export const AccessRequestMobileView: React.FC<AccessRequestMobileViewProps> = ({
  clinicType,
  onClinicTypeChange,
  externalTab,
  onExternalTabChange,
  doctorEmail,
  onDoctorEmailChange,
  doctors,
  selectedDoctorIds,
  onToggleDoctor,
  familyMembers,
  selectedFamilyMemberId,
  onSelectFamilyMember,
  onRequestFamilyAccess,
  records,
  selectedRecordIds,
  onToggleRecord,
  securitySettings,
  onExpirationChange,
  onViewOnlyToggle,
  onNotificationsToggle,
  onPermissionChange,
  onPasswordProtectedToggle,
  onPasswordChange,
  onConfirmPasswordChange,
  additionalMessage,
  onAdditionalMessageChange,
  onBackToDashboard,
  onSubmit,
  isSubmitting = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const selectedDoctors = doctors.filter((d) => selectedDoctorIds.includes(d.id));

  const filteredDoctors = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-[430px] mx-auto bg-[#FAFAFC] min-h-screen flex flex-col font-inter pb-10 text-slate-900">
      {/* Main Content Area */}
      <div className="p-4 flex flex-col gap-4">
        {/* Back to Dashboard Breadcrumb */}
        <div>
          <button
            type="button"
            onClick={onBackToDashboard}
            data-testid="mobile-back-to-dashboard"
            aria-label="Back to Dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7C3AED] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </button>
        </div>

        {/* Title & Description */}
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold text-[#0F172A] tracking-tight font-inter">
            Access Request
          </h1>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Securely share your medical history and clinical reports with healthcare professionals. Control exactly what they see and for how long.
          </p>
        </div>

        {/* Segmented Switch: Inside Clinic vs External */}
        <div
          role="tablist"
          aria-label="Clinic selection mode"
          className="w-full grid grid-cols-2 p-1 rounded-full border-2 border-[#7C3AED] bg-white shadow-xs"
        >
          <button
            type="button"
            role="tab"
            aria-selected={clinicType === 'inside'}
            data-testid="mobile-toggle-inside-clinic"
            onClick={() => onClinicTypeChange('inside')}
            className={`py-2 rounded-full text-xs font-semibold transition-all cursor-pointer text-center ${
              clinicType === 'inside'
                ? 'bg-[#7C3AED] text-white shadow-sm'
                : 'bg-transparent text-[#7C3AED]'
            }`}
          >
            Inside Clinic
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={clinicType === 'external'}
            data-testid="mobile-toggle-external"
            onClick={() => onClinicTypeChange('external')}
            className={`py-2 rounded-full text-xs font-semibold transition-all cursor-pointer text-center ${
              clinicType === 'external'
                ? 'bg-[#7C3AED] text-white shadow-sm'
                : 'bg-transparent text-[#7C3AED]'
            }`}
          >
            External
          </button>
        </div>

        {/* External Sub-Tabs: Outside Doctor vs Family Member */}
        {clinicType === 'external' && (
          <div
            role="tablist"
            aria-label="External recipient type"
            className="w-full grid grid-cols-2 gap-2 p-1 rounded-2xl bg-slate-100"
          >
            <button
              type="button"
              role="tab"
              aria-selected={externalTab === 'outside-doctor'}
              onClick={() => onExternalTabChange('outside-doctor')}
              className={`py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                externalTab === 'outside-doctor'
                  ? 'bg-white text-[#7C3AED] shadow-xs'
                  : 'text-slate-600'
              }`}
            >
              Outside Doctor
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={externalTab === 'family-member'}
              onClick={() => onExternalTabChange('family-member')}
              className={`py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                externalTab === 'family-member'
                  ? 'bg-white text-[#7C3AED] shadow-xs'
                  : 'text-slate-600'
              }`}
            >
              Family Member
            </button>
          </div>
        )}

        {clinicType === 'external' && externalTab === 'family-member' ? (
          /* FAMILY MEMBER SELECTION ON MOBILE */
          <div className="w-full rounded-[20px] bg-white border border-slate-200/80 p-3.5 flex flex-col gap-2.5 shadow-xs">
            <span className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase font-inter">
              Select Family Member
            </span>
            <div role="radiogroup" aria-label="Select Family Member" className="flex flex-col gap-2">
              {familyMembers
                .filter((m) => !m.isSelf)
                .map((member) => {
                  const isLocked = member.accessLevel === 'LOCKED';
                  const isSelected = !isLocked && selectedFamilyMemberId === member.id;
                  return (
                    <div
                      key={member.id}
                      role="radio"
                      aria-checked={isSelected}
                      aria-disabled={isLocked}
                      tabIndex={isLocked ? -1 : 0}
                      onClick={() => {
                        if (!isLocked) onSelectFamilyMember(member.id);
                      }}
                      onKeyDown={(e) => {
                        if (!isLocked && (e.key === 'Enter' || e.key === ' ')) {
                          e.preventDefault();
                          onSelectFamilyMember(member.id);
                        }
                      }}
                      className={`p-2.5 rounded-[14px] border flex items-center justify-between gap-2 ${
                        isLocked
                          ? 'bg-slate-50 border-slate-200 opacity-85 cursor-not-allowed'
                          : isSelected
                          ? 'bg-purple-50/50 border-[#7C3AED] cursor-pointer'
                          : 'bg-white border-slate-200 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={member.avatarUrl}
                          alt={member.name}
                          className="w-9 h-9 rounded-full object-cover shrink-0"
                        />
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-bold text-[#0F172A] truncate">
                            {member.name}
                          </span>
                          <span className="text-[10px] font-semibold text-[#7C3AED] uppercase">
                            {member.relationship} • {member.accessLevel}
                          </span>
                        </div>
                      </div>
                      {member.canRequestAccess ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRequestFamilyAccess(member);
                          }}
                          className="px-2.5 py-1 rounded-full bg-[#7C3AED] text-white text-[10px] font-semibold flex items-center gap-1 shrink-0 cursor-pointer"
                        >
                          <Key className="w-3 h-3" />
                          <span>Unlock</span>
                        </button>
                      ) : isSelected ? (
                        <span className="w-5 h-5 rounded-full bg-[#7C3AED] text-white flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      ) : null}
                    </div>
                  );
                })}
            </div>
          </div>
        ) : (
          <>
            {/* SELECTED DOCTORS CHIPS */}
            {selectedDoctors.length > 0 && (
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase font-inter">
                  Selected Doctors ({selectedDoctors.length})
                </span>
                <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
                  {selectedDoctors.map((doc) => (
                    <div
                      key={doc.id}
                      className="inline-flex items-center gap-1.5 pl-1.5 pr-2 py-1 rounded-full border border-purple-300 bg-[#F5F3FF] text-[#6D28D9] text-xs font-semibold shrink-0"
                    >
                      <img
                        src={doc.avatarUrl}
                        alt={doc.name}
                        className="w-4 h-4 rounded-full object-cover"
                      />
                      <span>{doc.name}</span>
                      <Check className="w-3 h-3 stroke-[3]" />
                      <button
                        type="button"
                        onClick={() => onToggleDoctor(doc.id)}
                        aria-label={`Remove ${doc.name}`}
                        className="p-0.5 hover:text-purple-900 cursor-pointer"
                      >
                        <X className="w-3 h-3 stroke-[2.5]" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* External Doctor Email Input */}
            {clinicType === 'external' && (
              <div className="w-full rounded-[20px] bg-white border border-slate-200/80 p-3.5 flex flex-col gap-2 shadow-xs">
                <label
                  htmlFor="mobile-doctor-email"
                  className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase font-inter"
                >
                  Recipient Email
                </label>
                <input
                  id="mobile-doctor-email"
                  type="email"
                  value={doctorEmail}
                  onChange={(e) => onDoctorEmailChange(e.target.value)}
                  placeholder="Doctor's email address"
                  className="w-full px-3.5 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#7C3AED]"
                />
              </div>
            )}

            {/* FIND DOCTOR CARD */}
            <div className="w-full rounded-[20px] bg-white border border-slate-200/80 p-3.5 flex flex-col gap-3 shadow-xs">
              <span className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase font-inter">
                Find Doctor
              </span>

              {/* Search Input */}
              <div className="relative w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or email..."
                  aria-label="Search doctors by name or email"
                  data-testid="mobile-doctor-search-input"
                  className="w-full pl-9 pr-3 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#7C3AED]"
                />
              </div>

              {/* Doctor Row Items */}
              <div className="flex flex-col gap-2.5">
                {filteredDoctors.map((doc) => {
                  const isSelected = selectedDoctorIds.includes(doc.id);
                  return (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between gap-2 py-1 border-b border-slate-50 last:border-0"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={doc.avatarUrl}
                          alt={doc.name}
                          className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-slate-100"
                        />
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-bold text-[#0F172A] truncate">
                            {doc.name}
                          </span>
                          <span className="text-[10px] text-[#64748B] truncate">
                            {doc.hospital} • {doc.email}
                          </span>
                        </div>
                      </div>

                      {isSelected ? (
                        <button
                          type="button"
                          onClick={() => onToggleDoctor(doc.id)}
                          className="px-2.5 py-1 rounded-full bg-[#EDE9FE] text-[#6D28D9] text-[11px] font-semibold flex items-center gap-1 shrink-0 cursor-pointer"
                        >
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>Selected</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onToggleDoctor(doc.id)}
                          className="px-3 py-1 rounded-full bg-[#7C3AED] text-white text-[11px] font-semibold hover:opacity-95 shrink-0 cursor-pointer"
                        >
                          + Add
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* SELECT REPORTS */}
        <div className="w-full rounded-[20px] bg-white border border-slate-200/80 p-3.5 flex flex-col gap-2.5 shadow-xs">
          <span className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase font-inter">
            Select Reports
          </span>

          {records.map((rec) => {
            const isChecked = selectedRecordIds.includes(rec.id);
            return (
              <label
                key={rec.id}
                className="flex items-center justify-between p-2.5 rounded-[14px] bg-slate-50 border border-slate-200/70 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleRecord(rec.id)}
                    className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 border-slate-300"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#0F172A]">{rec.title}</span>
                    <span className="text-[10px] text-[#64748B]">
                      {rec.date} • {rec.fileType}
                    </span>
                  </div>
                </div>
                {rec.iconType === 'flask' ? (
                  <FlaskConical className="w-4 h-4 text-[#7C3AED]" />
                ) : (
                  <FileText className="w-4 h-4 text-[#7C3AED]" />
                )}
              </label>
            );
          })}
        </div>

        {/* ACCESS SETTINGS HEADER */}
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#6D28D9] tracking-wider uppercase pt-1">
          <Lock className="w-3.5 h-3.5" />
          <span>Access Settings</span>
        </div>

        {/* LINK EXPIRATION & TOGGLES CARD */}
        <div className="w-full rounded-[20px] bg-white border border-slate-200/80 p-3.5 flex flex-col gap-3.5 shadow-xs">
          {/* Expiration */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-[#64748B] uppercase">Link Expiration</span>
            <div className="grid grid-cols-3 gap-2">
              {(['24h', '7d', '30d'] as LinkExpiration[]).map((exp) => (
                <button
                  key={exp}
                  type="button"
                  onClick={() => onExpirationChange(exp)}
                  className={`py-1.5 rounded-full text-xs font-semibold cursor-pointer text-center ${
                    securitySettings.expiration === exp
                      ? 'bg-[#7C3AED] text-white'
                      : 'bg-white border border-slate-200 text-slate-700'
                  }`}
                >
                  {exp === '24h' ? '24h' : exp === '7d' ? '7 Days' : '30 Days'}
                </button>
              ))}
            </div>
          </div>

          {/* View Only Toggle */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex items-start gap-2">
              <Eye className="w-4 h-4 text-slate-600 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[#0F172A]">View Only</span>
                <span className="text-[10px] text-[#64748B]">Recipient cannot download or print</span>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={securitySettings.viewOnly}
              aria-label="View Only"
              onClick={onViewOnlyToggle}
              className={`w-10 h-5.5 rounded-full transition-colors relative cursor-pointer ${
                securitySettings.viewOnly ? 'bg-[#7C3AED]' : 'bg-slate-200'
              }`}
            >
              <span
                className={`block w-4.5 h-4.5 rounded-full bg-white shadow-xs transition-transform transform ${
                  securitySettings.viewOnly ? 'translate-x-5' : 'translate-x-0.5'
                } top-0.5 absolute`}
              />
            </button>
          </div>

          {/* Access Notifications Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-2">
              <History className="w-4 h-4 text-slate-600 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[#0F172A]">Access Notifications</span>
                <span className="text-[10px] text-[#64748B]">Alert me when link is opened</span>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={securitySettings.notifications}
              aria-label="Access Notifications"
              onClick={onNotificationsToggle}
              className={`w-10 h-5.5 rounded-full transition-colors relative cursor-pointer ${
                securitySettings.notifications ? 'bg-[#7C3AED]' : 'bg-slate-200'
              }`}
            >
              <span
                className={`block w-4.5 h-4.5 rounded-full bg-white shadow-xs transition-transform transform ${
                  securitySettings.notifications ? 'translate-x-5' : 'translate-x-0.5'
                } top-0.5 absolute`}
              />
            </button>
          </div>
        </div>

        {/* PERMISSIONS CARD */}
        <div
          role="radiogroup"
          aria-label="Permissions"
          className="w-full rounded-[20px] bg-white border border-slate-200/80 p-3.5 flex flex-col gap-2.5 shadow-xs"
        >
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F172A]">
            <Shield className="w-4 h-4 text-[#7C3AED]" />
            <span>Permissions</span>
          </div>

          <div
            role="radio"
            aria-checked={securitySettings.permission === 'view_only'}
            tabIndex={0}
            onClick={() => onPermissionChange('view_only')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onPermissionChange('view_only');
              }
            }}
            className={`p-2.5 rounded-[14px] flex items-center gap-2.5 cursor-pointer border ${
              securitySettings.permission === 'view_only'
                ? 'bg-slate-50 border-purple-300'
                : 'bg-white border-slate-200'
            }`}
          >
            <div className="w-4 h-4 rounded-full border-2 border-[#7C3AED] flex items-center justify-center shrink-0">
              {securitySettings.permission === 'view_only' && (
                <div className="w-2 h-2 rounded-full bg-[#7C3AED]" />
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#0F172A]">View Only</span>
              <span className="text-[10px] text-[#64748B]">User can see records but not download.</span>
            </div>
          </div>

          <div
            role="radio"
            aria-checked={securitySettings.permission === 'view_share_download'}
            tabIndex={0}
            onClick={() => onPermissionChange('view_share_download')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onPermissionChange('view_share_download');
              }
            }}
            className={`p-2.5 rounded-[14px] flex items-center gap-2.5 cursor-pointer border ${
              securitySettings.permission === 'view_share_download'
                ? 'bg-slate-50 border-purple-300'
                : 'bg-white border-slate-200'
            }`}
          >
            <div className="w-4 h-4 rounded-full border-2 border-slate-300 flex items-center justify-center shrink-0">
              {securitySettings.permission === 'view_share_download' && (
                <div className="w-2 h-2 rounded-full bg-[#7C3AED]" />
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#0F172A]">View &amp; Share &amp; Download</span>
              <span className="text-[10px] text-[#64748B]">Allows saving high-res PDF reports.</span>
            </div>
          </div>
        </div>

        {/* PROTECT WITH PASSWORD CARD */}
        <div className="w-full rounded-[20px] bg-white border border-slate-200/80 p-3.5 flex flex-col gap-3 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#0F172A]">Protect with Password</span>
              <span className="text-[10px] text-[#64748B]">Recipient must enter key to view</span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={securitySettings.passwordProtected}
              aria-label="Protect with Password"
              onClick={onPasswordProtectedToggle}
              className={`w-10 h-5.5 rounded-full transition-colors relative cursor-pointer ${
                securitySettings.passwordProtected ? 'bg-[#7C3AED]' : 'bg-slate-200'
              }`}
            >
              <span
                className={`block w-4.5 h-4.5 rounded-full bg-white shadow-xs transition-transform transform ${
                  securitySettings.passwordProtected ? 'translate-x-5' : 'translate-x-0.5'
                } top-0.5 absolute`}
              />
            </button>
          </div>

          {securitySettings.passwordProtected && (
            <div className="flex flex-col gap-2 pt-1 border-t border-slate-100">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="mobile-set-password"
                  className="text-[10px] font-bold text-[#64748B] uppercase"
                >
                  Set Password
                </label>
                <div className="relative">
                  <input
                    id="mobile-set-password"
                    type={showPassword ? 'text' : 'password'}
                    value={securitySettings.password}
                    onChange={(e) => onPasswordChange(e.target.value)}
                    placeholder="Enter password"
                    className="w-full px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-800"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showPassword ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="mobile-confirm-password"
                  className="text-[10px] font-bold text-[#64748B] uppercase"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="mobile-confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={securitySettings.confirmPassword}
                    onChange={(e) => onConfirmPasswordChange(e.target.value)}
                    placeholder="Confirm password"
                    className="w-full px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-800"
                  />
                  <button
                    type="button"
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showConfirmPassword ? (
                      <Eye className="w-3.5 h-3.5" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ADD MESSAGE CARD */}
        <div className="w-full rounded-[20px] bg-white border border-slate-200/80 p-3.5 flex flex-col gap-2 shadow-xs">
          <label
            htmlFor="mobile-additional-message"
            className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase font-inter"
          >
            Add Message...
          </label>
          <textarea
            id="mobile-additional-message"
            rows={2}
            value={additionalMessage}
            onChange={(e) => onAdditionalMessageChange(e.target.value)}
            placeholder="Add message..."
            className="w-full rounded-[14px] bg-slate-50 border border-slate-200 p-2.5 text-xs text-slate-800 placeholder-purple-400 resize-none focus:outline-none focus:border-purple-400"
          />
        </div>

        {/* SEND REQUEST BUTTON */}
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          data-testid="mobile-send-request-button"
          className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] hover:opacity-95 text-white text-sm font-semibold shadow-md flex items-center justify-center gap-2 cursor-pointer transition-opacity disabled:opacity-50"
        >
          <span>{isSubmitting ? 'Sending...' : 'Send Request'}</span>
          <Send className="w-4 h-4 rotate-45" />
        </button>
      </div>
    </div>
  );
};
