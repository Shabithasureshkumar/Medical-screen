import React, { useState, useEffect } from 'react';
import { LabImagingHeader } from './LabImagingHeader';
import { ComprehensiveBloodPanel } from './ComprehensiveBloodPanel';
import { AiLabInsights } from './AiLabInsights';
import { BiometricTrends } from './BiometricTrends';
import { AiContextualInsight } from './AiContextualInsight';
import { LdlTrendAnalysis } from './LdlTrendAnalysis';
import { HistoricalRecords } from './HistoricalRecords';
import { MarkerBreakdown } from './MarkerBreakdown';
import { ImagingIntelligence } from './ImagingIntelligence';
import { SignalStudies } from './SignalStudies';
import { LatestReports } from './LatestReports';
import { AskLdlAiModal } from './AskLdlAiModal';
import { HeartHealthyDietsModal } from './HeartHealthyDietsModal';
import { HistoricalTestRecord, ImagingCardData, SignalStudyData } from '../../data/imagingData';
import { ImagingStudyDetail } from './detail/ImagingStudyDetail';
import { SignalStudyDetail } from './detail/SignalStudyDetail';

interface LabImagingPageProps {
  onBackToDashboard: () => void;
  onOpenAiInsight?: () => void;
  onNavigateToUpload?: () => void;
  initialStudyId?: string;
  initialSignalId?: string;
}

export const LabImagingPage: React.FC<LabImagingPageProps> = ({
  onBackToDashboard,
  onOpenAiInsight,
  onNavigateToUpload,
  initialStudyId,
  initialSignalId
}) => {
  const [notification, setNotification] = useState<string | null>(null);
  const [isAskLdlModalOpen, setIsAskLdlModalOpen] = useState(false);
  const [isHeartHealthyDietsModalOpen, setIsHeartHealthyDietsModalOpen] = useState(false);

  // Sub-view router: 'landing' | 'imaging-study' | 'signal-study'
  const [currentView, setCurrentView] = useState<'landing' | 'imaging-study' | 'signal-study'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('study')) return 'imaging-study';
      if (params.get('signal')) return 'signal-study';
    }
    return 'landing';
  });

  const [selectedStudyId, setSelectedStudyId] = useState<string>(() => {
    if (initialStudyId) return initialStudyId;
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const s = params.get('study');
      if (s) return s;
    }
    return 'img-3';
  });

  const [selectedSignalId, setSelectedSignalId] = useState<string>(() => {
    if (initialSignalId) return initialSignalId;
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const s = params.get('signal');
      if (s) return s;
    }
    return 'sig-2';
  });

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const studyParam = params.get('study');
      const signalParam = params.get('signal');
      if (studyParam) {
        setSelectedStudyId(studyParam);
        setCurrentView('imaging-study');
      } else if (signalParam) {
        setSelectedSignalId(signalParam);
        setCurrentView('signal-study');
      } else {
        setCurrentView('landing');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const handleDownloadRecords = () => {
    showNotification('Preparing your full medical records package for download...');
  };

  const handleUploadFile = () => {
    if (onNavigateToUpload) {
      onNavigateToUpload();
    } else {
      showNotification('Upload dialog opened: Select DICOM, PDF, or lab results.');
    }
  };

  const handleSelectRecord = (record: HistoricalTestRecord) => {
    showNotification(`Selected record: ${record.name} (${record.dateOrExpected})`);
  };

  const handleSelectImagingCard = (card: ImagingCardData) => {
    setSelectedStudyId(card.id);
    setCurrentView('imaging-study');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('page', 'imaging');
      url.searchParams.set('study', card.id);
      url.searchParams.delete('signal');
      window.history.pushState({}, '', url.toString());
    }
  };

  const handleSelectSignalStudy = (study: SignalStudyData) => {
    setSelectedSignalId(study.id);
    setCurrentView('signal-study');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('page', 'imaging');
      url.searchParams.set('signal', study.id);
      url.searchParams.delete('study');
      window.history.pushState({}, '', url.toString());
    }
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('page', 'imaging');
      url.searchParams.delete('study');
      url.searchParams.delete('signal');
      window.history.pushState({}, '', url.toString());
    }
  };

  const handleSelectReport = (reportId: string) => {
    showNotification(`Downloading report ${reportId}...`);
  };

  // Render detail screen if active
  if (currentView === 'imaging-study') {
    return (
      <ImagingStudyDetail
        initialStudyId={selectedStudyId}
        onBackToDashboard={onBackToDashboard}
        onBackToLanding={handleBackToLanding}
        onSelectStudy={(id) => {
          setSelectedStudyId(id);
          if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            url.searchParams.set('study', id);
            window.history.replaceState({}, '', url.toString());
          }
        }}
      />
    );
  }

  if (currentView === 'signal-study') {
    return (
      <SignalStudyDetail
        initialStudyId={selectedSignalId}
        onBackToDashboard={onBackToDashboard}
        onBackToLanding={handleBackToLanding}
        onSelectStudy={(id) => {
          setSelectedSignalId(id);
          if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            url.searchParams.set('signal', id);
            window.history.replaceState({}, '', url.toString());
          }
        }}
      />
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F8F9FE] text-[#1E1B4B] pb-16 transition-colors duration-300">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md p-4 rounded-xl bg-[#1E1B4B] text-white shadow-xl text-xs sm:text-sm border border-slate-700 flex items-center justify-between gap-3 animate-fade-in">
          <span>{notification}</span>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-slate-400 hover:text-white font-bold ml-2"
          >
            ✕
          </button>
        </div>
      )}

      <div className="fluid-page-x pt-[clamp(0.875rem,1.5vw,1.5rem)] flex flex-col fluid-page-gap">
        {/* Page Header */}
        <LabImagingHeader
          onBackToDashboard={onBackToDashboard}
          onDownloadRecords={handleDownloadRecords}
          onUploadFile={handleUploadFile}
        />

        {/* ============================================================ */}
        {/* ROW 1 — THREE-COLUMN ANALYTICS ROW */}
        {/* Desktop >=1380: Comprehensive Blood Panel (~47%) | AI Lab Insights (~24%) | Biometric Trends (~29%) */}
        {/* Tablet 1024-1379: 2-column wrapping (Blood Panel top col-span-2, Insights & Trends col-span-1 each) */}
        {/* Mobile <1024: 1-column stack */}
        {/* ============================================================ */}
        <section
          aria-label="Blood & Biometric Analytics"
          className="imaging-analytics-row w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch"
        >
          {/* Left: Comprehensive Blood Panel (~46-48%) */}
          <div className="lg:col-span-2 min-w-0 h-full">
            <ComprehensiveBloodPanel />
          </div>

          {/* Center: AI Lab Insights (~23-25%) */}
          <div className="lg:col-span-1 min-w-0 h-full">
            <AiLabInsights
              onViewExplanation={onOpenAiInsight || (() => showNotification('Opening AI Clinical Explanation...'))}
            />
          </div>

          {/* Right: Biometric Health Trends (~27-29%) */}
          <div className="lg:col-span-1 min-w-0 h-full">
            <BiometricTrends />
          </div>
        </section>

        {/* ============================================================ */}
        {/* ROW 2 — TWO-COLUMN INSIGHT/TREND ROW */}
        {/* Desktop >=1380: AI Contextual Insight (~49%) | LDL Trend Analysis (~51%) */}
        {/* Tablet 1024-1379: Side-by-side 49/51 */}
        {/* Mobile <1024: 1-column stack */}
        {/* ============================================================ */}
        <section
          aria-label="AI Contextual Insight & LDL Trend"
          className="imaging-insight-row w-full grid grid-cols-1 lg:grid-cols-[49fr_51fr] gap-6 items-stretch"
        >
          {/* Left: AI Contextual Insight (~49%) */}
          <div className="min-w-0 w-full h-full flex flex-col">
            <AiContextualInsight
              onAskAi={() => setIsAskLdlModalOpen(true)}
              onViewDiets={() => setIsHeartHealthyDietsModalOpen(true)}
            />
          </div>

          {/* Right: LDL Trend Analysis (~51%) */}
          <div className="min-w-0 w-full h-full flex flex-col">
            <LdlTrendAnalysis
              onPeriodChange={(p) => showNotification(`LDL timeline filtered to ${p}`)}
            />
          </div>
        </section>

        {/* ============================================================ */}
        {/* ROW 3 — RECORDS / TABLE ROW */}
        {/* Desktop >=1380: Historical Records (~32%) | Marker Breakdown (~68%) */}
        {/* Tablet 1024-1379: 34fr 66fr */}
        {/* Mobile <1024: 1-column stack */}
        {/* ============================================================ */}
        <section
          aria-label="Historical Records & Marker Breakdown"
          className="imaging-records-row w-full grid grid-cols-1 lg:grid-cols-[34fr_66fr] gap-6 items-stretch"
        >
          {/* Left: Historical Records (~31-33%) */}
          <div className="min-w-0 w-full h-full">
            <HistoricalRecords
              onSelectRecord={handleSelectRecord}
              onViewAll={() => showNotification('Navigating to full historical diagnostic archive...')}
            />
          </div>

          {/* Right: Marker Breakdown (~67-69%) */}
          <div className="min-w-0 w-full h-full">
            <MarkerBreakdown />
          </div>
        </section>

        {/* ============================================================ */}
        {/* ROW 4: IMAGING INTELLIGENCE (Full Width 3 Equal Cards) */}
        {/* ============================================================ */}
        <div className="w-full min-w-0 pt-2">
          <ImagingIntelligence onSelectCard={handleSelectImagingCard} />
        </div>

        {/* ============================================================ */}
        {/* ROW 5: SIGNAL STUDIES (Full Width 3 Equal Cards) */}
        {/* ============================================================ */}
        <div className="w-full min-w-0 pt-2">
          <SignalStudies
            onSelectStudy={handleSelectSignalStudy}
            onViewAll={() => showNotification('Opening All Signal Studies viewer...')}
          />
        </div>

        {/* ============================================================ */}
        {/* MOBILE EXCLUSIVE / BOTTOM: Latest Reports */}
        {/* ============================================================ */}
        <div className="block lg:hidden w-full min-w-0 pt-2">
          <LatestReports onSelectReport={handleSelectReport} />
        </div>
      </div>

      {/* Popups / Modals */}
      <AskLdlAiModal
        isOpen={isAskLdlModalOpen}
        onClose={() => setIsAskLdlModalOpen(false)}
      />

      <HeartHealthyDietsModal
        isOpen={isHeartHealthyDietsModalOpen}
        onClose={() => setIsHeartHealthyDietsModalOpen(false)}
      />
    </div>
  );
};
