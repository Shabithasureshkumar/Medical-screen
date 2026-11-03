import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
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
import {
  initialInsideClinicDoctors,
  initialOutsideDoctors,
  initialFamilyMembers,
  initialShareRecords,
  defaultSecuritySettings
} from '../../data/accessRequestData';
import { AccessRequestHeader } from './AccessRequestHeader';
import { AccessRequestTabs } from './AccessRequestTabs';
import { RecipientSection } from './RecipientSection';
import { DoctorSelection } from './DoctorSelection';
import { FamilyMemberSelection } from './FamilyMemberSelection';
import { RecordsSelection } from './RecordsSelection';
import { SecuritySettings } from './SecuritySettings';
import { Permissions } from './Permissions';
import { PasswordProtection } from './PasswordProtection';
import { AdditionalMessage } from './AdditionalMessage';
import { AccessRequestMobileView } from './AccessRequestMobileView';

interface AccessRequestPageProps {
  onBackToDashboard: () => void;
  onNavigateToRecords?: () => void;
}

export const AccessRequestPage: React.FC<AccessRequestPageProps> = ({
  onBackToDashboard
}) => {
  // Navigation & category states
  const [clinicType, setClinicType] = useState<ClinicType>('inside');
  const [externalTab, setExternalTab] = useState<ExternalTab>('outside-doctor');

  // Recipient input & data
  const [doctorEmail, setDoctorEmail] = useState('');
  const [insideDoctors] = useState<DoctorRecipient[]>(initialInsideClinicDoctors);
  const [outsideDoctors] = useState<DoctorRecipient[]>(initialOutsideDoctors);
  const [selectedDoctorIds, setSelectedDoctorIds] = useState<string[]>(['doc-inside-1']);

  // Family members
  const [familyMembers, setFamilyMembers] = useState<FamilyMemberRecipient[]>(initialFamilyMembers);
  const [selectedFamilyMemberId, setSelectedFamilyMemberId] = useState<string | null>('fam-3');

  // Records to share
  const [shareRecords, setShareRecords] = useState<ShareRecordItem[]>(initialShareRecords);
  const [selectedRecordIds, setSelectedRecordIds] = useState<string[]>(['rec-1']);

  // Security settings
  const [securitySettings, setSecuritySettings] = useState<SecuritySettingsState>(defaultSecuritySettings);

  // Additional note
  const [additionalMessage, setAdditionalMessage] = useState('');

  // Submission & feedback states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Doctor selection handler
  const handleToggleDoctor = (id: string) => {
    setSelectedDoctorIds((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  // Record selection handler
  const handleToggleRecord = (id: string) => {
    setSelectedRecordIds((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
    setShareRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, selected: !r.selected } : r))
    );
  };

  // Family member request access action
  const handleRequestFamilyAccess = (member: FamilyMemberRecipient) => {
    showToast(`Access authorization requested from ${member.name}`);
    setFamilyMembers((prev) =>
      prev.map((m) =>
        m.id === member.id ? { ...m, accessLevel: 'FULL ACCESS', canRequestAccess: false } : m
      )
    );
  };

  // Add family member
  const handleAddFamilyMember = () => {
    showToast('Add family member dialog opened');
  };

  // Synchronized View Only & Permission handlers
  const handleViewOnlyToggle = () => {
    setSecuritySettings((prev) => {
      const nextViewOnly = !prev.viewOnly;
      return {
        ...prev,
        viewOnly: nextViewOnly,
        permission: nextViewOnly ? 'view_only' : 'view_share_download'
      };
    });
  };

  const handlePermissionChange = (perm: PermissionType) => {
    setSecuritySettings((prev) => ({
      ...prev,
      permission: perm,
      viewOnly: perm === 'view_only'
    }));
  };

  const handleClinicTypeSwitch = (type: ClinicType) => {
    setClinicType(type);
    if (type === 'inside') {
      setSelectedDoctorIds(['doc-inside-1']);
    } else {
      setSelectedDoctorIds(['doc-ext-1']);
    }
  };

  // Form submission validation
  const handleSubmit = () => {
    setErrorMessage(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation 1: Recipient validation
    if (clinicType === 'inside') {
      if (selectedDoctorIds.length === 0 && !doctorEmail.trim()) {
        setErrorMessage('Please select at least one clinic doctor or enter a valid doctor email.');
        return;
      }
      if (doctorEmail.trim() && !emailRegex.test(doctorEmail.trim())) {
        setErrorMessage('Please enter a valid doctor email address.');
        return;
      }
    } else {
      if (externalTab === 'outside-doctor') {
        if (doctorEmail.trim() && !emailRegex.test(doctorEmail.trim())) {
          setErrorMessage('Please enter a valid external doctor email address.');
          return;
        }
        if (selectedDoctorIds.length === 0 && !doctorEmail.trim()) {
          setErrorMessage('Please select an external doctor or enter a valid recipient email address.');
          return;
        }
      } else {
        const selectedMember = familyMembers.find((m) => m.id === selectedFamilyMemberId);
        if (!selectedMember || selectedMember.isSelf || selectedMember.accessLevel === 'LOCKED') {
          setErrorMessage('Please select an unlocked family member to share records with.');
          return;
        }
      }
    }

    // Validation 2: Password match if password protection is enabled
    if (securitySettings.passwordProtected) {
      if (!securitySettings.password || securitySettings.password.trim().length === 0) {
        setErrorMessage('Please set a password to protect your shared records.');
        return;
      }
      if (securitySettings.password !== securitySettings.confirmPassword) {
        setErrorMessage('Passwords do not match. Please ensure both fields are identical.');
        return;
      }
    }

    // Validation 3: Ensure at least one record is selected
    if (selectedRecordIds.length === 0) {
      setErrorMessage('Please select at least one record or report to share.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast('Access request sent successfully with secure encryption!');
    }, 800);
  };

  return (
    <div className="w-full min-h-screen bg-[#FAFAFC] pb-16 font-inter selection:bg-purple-600 selection:text-white">
      {/* Toast Feedback */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          data-testid="access-request-toast"
          className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-4 py-3 rounded-2xl shadow-2xl text-xs sm:text-sm font-medium animate-fade-in flex items-center gap-2.5 border border-slate-700"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Error Alert */}
      {errorMessage && (
        <div
          role="alert"
          data-testid="access-request-error-banner"
          className="fluid-page-x pt-[clamp(0.875rem,1.2vw,1rem)]"
        >
          <div className="w-full p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-semibold flex items-center justify-between">
            <span>{errorMessage}</span>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="text-rose-600 hover:text-rose-900 font-bold px-2 py-0.5 cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* MOBILE VIEW (rendered on small viewports < md) */}
      <div className="block md:hidden">
        <AccessRequestMobileView
          clinicType={clinicType}
          onClinicTypeChange={handleClinicTypeSwitch}
          externalTab={externalTab}
          onExternalTabChange={setExternalTab}
          doctorEmail={doctorEmail}
          onDoctorEmailChange={setDoctorEmail}
          doctors={clinicType === 'inside' ? insideDoctors : outsideDoctors}
          selectedDoctorIds={selectedDoctorIds}
          onToggleDoctor={handleToggleDoctor}
          familyMembers={familyMembers}
          selectedFamilyMemberId={selectedFamilyMemberId}
          onSelectFamilyMember={setSelectedFamilyMemberId}
          onRequestFamilyAccess={handleRequestFamilyAccess}
          records={shareRecords}
          selectedRecordIds={selectedRecordIds}
          onToggleRecord={handleToggleRecord}
          securitySettings={securitySettings}
          onExpirationChange={(exp: LinkExpiration) =>
            setSecuritySettings((prev) => ({ ...prev, expiration: exp }))
          }
          onViewOnlyToggle={handleViewOnlyToggle}
          onNotificationsToggle={() =>
            setSecuritySettings((prev) => ({ ...prev, notifications: !prev.notifications }))
          }
          onPermissionChange={handlePermissionChange}
          onPasswordProtectedToggle={() =>
            setSecuritySettings((prev) => ({
              ...prev,
              passwordProtected: !prev.passwordProtected
            }))
          }
          onPasswordChange={(val) =>
            setSecuritySettings((prev) => ({ ...prev, password: val }))
          }
          onConfirmPasswordChange={(val) =>
            setSecuritySettings((prev) => ({ ...prev, confirmPassword: val }))
          }
          additionalMessage={additionalMessage}
          onAdditionalMessageChange={setAdditionalMessage}
          onBackToDashboard={onBackToDashboard}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>

      {/* DESKTOP VIEW (rendered on viewports >= md) */}
      <div className="hidden md:block w-full fluid-page-x pt-[clamp(1rem,1.5vw,1.5rem)]">
        {/* Header */}
        <AccessRequestHeader
          clinicType={clinicType}
          onClinicTypeChange={handleClinicTypeSwitch}
          onBackToDashboard={onBackToDashboard}
        />

        {/* 2-Column Desktop Layout: Left (approx 65-67%), Right (approx 33-35%) */}
        <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-6 xl:gap-8 mt-4">
          {/* LEFT COLUMN: Main Form Elements */}
          <div className="w-full lg:w-[65%] xl:w-[67%] flex flex-col gap-5 min-w-0">
            {/* Sub-Tabs: Shown when External is selected */}
            {clinicType === 'external' && (
              <AccessRequestTabs
                activeTab={externalTab}
                onTabChange={setExternalTab}
              />
            )}

            {/* Recipient / Doctor / Family Member Section */}
            {clinicType === 'external' && externalTab === 'family-member' ? (
              <FamilyMemberSelection
                familyMembers={familyMembers}
                selectedMemberId={selectedFamilyMemberId}
                onSelectMember={setSelectedFamilyMemberId}
                onRequestAccess={handleRequestFamilyAccess}
                onAddFamilyMember={handleAddFamilyMember}
              />
            ) : (
              <>
                {/* Recipient Email Input */}
                <RecipientSection
                  email={doctorEmail}
                  onEmailChange={setDoctorEmail}
                  placeholder="Doctor's email address"
                />

                {/* Doctor Selection Card */}
                <DoctorSelection
                  doctors={clinicType === 'inside' ? insideDoctors : outsideDoctors}
                  selectedDoctorIds={selectedDoctorIds}
                  onToggleDoctor={handleToggleDoctor}
                  showInsideClinicBadge={clinicType === 'inside'}
                />
              </>
            )}

            {/* Select Records to Share (2x2 Grid) */}
            <RecordsSelection
              records={shareRecords}
              selectedRecordIds={selectedRecordIds}
              onToggleRecord={handleToggleRecord}
            />

            {/* Additional Note Textarea */}
            <AdditionalMessage
              message={additionalMessage}
              onMessageChange={setAdditionalMessage}
            />
          </div>

          {/* RIGHT COLUMN: Security Settings, Permissions, Password Protection, Submit */}
          <div className="w-full lg:w-[35%] xl:w-[33%] flex flex-col gap-4 min-w-0">
            {/* Security Settings (Expiration, View Only, Notifications) */}
            <SecuritySettings
              expiration={securitySettings.expiration}
              onExpirationChange={(exp: LinkExpiration) =>
                setSecuritySettings((prev) => ({ ...prev, expiration: exp }))
              }
              viewOnly={securitySettings.viewOnly}
              onViewOnlyToggle={handleViewOnlyToggle}
              notifications={securitySettings.notifications}
              onNotificationsToggle={() =>
                setSecuritySettings((prev) => ({ ...prev, notifications: !prev.notifications }))
              }
            />

            {/* Permissions Radio Selection */}
            <Permissions
              permission={securitySettings.permission}
              onPermissionChange={handlePermissionChange}
            />

            {/* Protect with Password */}
            <PasswordProtection
              enabled={securitySettings.passwordProtected}
              onToggle={() =>
                setSecuritySettings((prev) => ({
                  ...prev,
                  passwordProtected: !prev.passwordProtected
                }))
              }
              password={securitySettings.password}
              confirmPassword={securitySettings.confirmPassword}
              onPasswordChange={(val) =>
                setSecuritySettings((prev) => ({ ...prev, password: val }))
              }
              onConfirmPasswordChange={(val) =>
                setSecuritySettings((prev) => ({ ...prev, confirmPassword: val }))
              }
            />

            {/* Send Request CTA Button */}
            <div className="w-full flex flex-col items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                data-testid="desktop-send-request-button"
                className="w-full h-[52px] sm:h-[56px] rounded-full bg-gradient-to-r from-[#A075FA] to-[#6320EE] hover:opacity-95 active:scale-[0.99] text-white text-sm sm:text-base font-bold shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5 rotate-45" />
                <span>{isSubmitting ? 'Sending Request...' : 'Send Request'}</span>
              </button>

              <p className="text-[11px] text-center text-[#64748B] leading-tight max-w-xs font-inter">
                Securely encrypted using Azure Shield™ technology. Links expire automatically.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
