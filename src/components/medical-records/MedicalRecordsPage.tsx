import React, { useState, useMemo } from 'react';
import { MedicalRecordsHeader } from './MedicalRecordsHeader';
import { MedicalRecordsSearch } from './MedicalRecordsSearch';
import { MedicalRecordsTable } from './MedicalRecordsTable';
import { ConsentPrivacy } from './ConsentPrivacy';
import { RequestCorrection } from './RequestCorrection';
import { RecentRequests } from './RecentRequests';

import {
  initialMedicalRecords,
  initialConsentSettings,
  initialCorrectionRequests,
  MedicalRecordItem,
  RecordCategory
} from '../../data/medicalRecordsData';

interface MedicalRecordsPageProps {
  onBackToDashboard: () => void;
  onNavigateToUpload?: () => void;
  externalRecords?: MedicalRecordItem[];
}

export const MedicalRecordsPage: React.FC<MedicalRecordsPageProps> = ({
  onBackToDashboard,
  onNavigateToUpload,
  externalRecords
}) => {
  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('All Time');
  const [selectedDocType, setSelectedDocType] = useState('All Types');
  const [selectedCategory, setSelectedCategory] = useState<RecordCategory>('All Records');

  // Interactive Records & Consent State
  const records = externalRecords || initialMedicalRecords;
  const [consentSettings, setConsentSettings] = useState(initialConsentSettings);
  const [correctionRequests, setCorrectionRequests] = useState(initialCorrectionRequests);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // Filter records based on category, date range, doc type, and search query
  const filteredRecords = useMemo(() => {
    // Reference anchor date (latest clinical cycle: June 25, 2026)
    const anchorTime = new Date('2026-06-25T23:59:59').getTime();

    return records.filter((rec) => {
      // Category filter
      if (selectedCategory !== 'All Records') {
        if (rec.category !== selectedCategory) return false;
      }

      // Date Range filter
      if (selectedDateRange !== 'All Time') {
        const recDate = new Date(rec.rawDate);
        if (!isNaN(recDate.getTime())) {
          const diffDays = (anchorTime - recDate.getTime()) / (1000 * 60 * 60 * 24);
          if (selectedDateRange === 'Last 30 Days' && diffDays > 31) return false;
          if (selectedDateRange === 'Last 60 Days' && diffDays > 62) return false;
          if (selectedDateRange === 'Last 90 Days' && diffDays > 93) return false;
          if (selectedDateRange === 'This Year' && recDate.getFullYear() < 2026) return false;
        }
      }

      // Document Type filter
      if (selectedDocType !== 'All Types') {
        if (selectedDocType.toUpperCase() !== rec.type.toUpperCase()) return false;
      }

      // Search Query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesTitle = rec.title.toLowerCase().includes(q);
        const matchesSub = rec.subtitle.toLowerCase().includes(q);
        const matchesAi = rec.aiExplanation.toLowerCase().includes(q);
        const matchesType = rec.type.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSub && !matchesAi && !matchesType) return false;
      }

      return true;
    });
  }, [records, selectedCategory, selectedDateRange, selectedDocType, searchQuery]);

  // Handlers
  const handleToggleConsent = (id: string) => {
    setConsentSettings((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextEnabled = !item.enabled;
          let nextStatus: typeof item.status = nextEnabled ? 'ACTIVE' : 'REVOKED';
          if (item.id === 'consent-marketing' && !nextEnabled) {
            nextStatus = 'TOGGLE TO ENABLE';
          }
          showToast(`Updated "${item.title}" to ${nextEnabled ? 'Active' : 'Disabled'}`);
          return {
            ...item,
            enabled: nextEnabled,
            status: nextStatus
          };
        }
        return item;
      })
    );
  };

  const handleCorrectionSubmit = (data: { field: string; description: string }) => {
    const newReqId = `#REQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const todayStr = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });

    const newRequest = {
      id: newReqId,
      field: data.field,
      subtext: data.description.trim() || 'User Submission',
      date: todayStr,
      status: 'PENDING' as const
    };

    setCorrectionRequests((prev) => [newRequest, ...prev]);
    showToast(`Correction request ${newReqId} submitted successfully`);
  };

  return (
    <div className="w-full flex flex-col flex-1">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs sm:text-sm font-medium animate-fade-in flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Page Container constrained to 1440px */}
      <main className="w-full fluid-page-x fluid-page-y flex flex-col fluid-page-gap flex-1">
        {/* Section 1: Header */}
        <MedicalRecordsHeader
          onBackToDashboard={onBackToDashboard}
          onDownloadRecords={() => showToast('Preparing your complete medical records archive...')}
          onUploadFile={onNavigateToUpload || (() => showToast('Opening secure document upload dialog...'))}
          onSwitchProfile={() => showToast('Switched to David Brock (Self) view')}
        />

        {/* Section 2: Search & Filters Bar */}
        <MedicalRecordsSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedDateRange={selectedDateRange}
          onDateRangeChange={setSelectedDateRange}
          selectedDocType={selectedDocType}
          onDocTypeChange={setSelectedDocType}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onUploadDocument={onNavigateToUpload || (() => showToast('Opening mobile document uploader...'))}
        />

        {/* Section 3: Records Table / Cards */}
        <MedicalRecordsTable
          records={filteredRecords}
          onViewRecord={(rec) => showToast(`Opening preview for ${rec.title}`)}
          onDownloadRecord={(rec) => showToast(`Downloading ${rec.downloadFileName} (${rec.fileSize})`)}
        />

        {/* Section 4: Consent & Privacy Settings */}
        <ConsentPrivacy
          settings={consentSettings}
          onToggleSetting={handleToggleConsent}
          onViewDetails={(id) => showToast(`Viewing full legal consent document for ${id}`)}
        />

        {/* Section 5: Bottom Split: Request Correction (~38%) + Recent Requests (~62%) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          {/* Left: Request Correction Form (40% desktop / 5 cols) */}
          <div className="lg:col-span-5 w-full">
            <RequestCorrection onSubmitSuccess={handleCorrectionSubmit} />
          </div>

          {/* Right: Recent Requests Table & Notice (60% desktop / 7 cols) */}
          <div className="lg:col-span-7 w-full">
            <RecentRequests
              requests={correctionRequests}
              onViewFullHistory={() => showToast('Loading all historical correction submissions...')}
              onRequestClick={(req) => showToast(`Viewing details for request ${req.id}`)}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
