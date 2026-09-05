import React, { useState, useEffect, useCallback } from 'react';
import { TopNavigation } from './components/layout/TopNavigation';
import { CriticalResultBanner } from './components/layout/CriticalResultBanner';
import { WelcomeSection } from './components/dashboard/WelcomeSection';
import { PatientProfileCard } from './components/dashboard/PatientProfileCard';
import { HealthOverviewCards } from './components/dashboard/HealthOverviewCards';
import { ManageMedicalAccess } from './components/dashboard/ManageMedicalAccess';
import { AccessAuditTrail } from './components/dashboard/AccessAuditTrail';
import { AiPatternCard } from './components/timeline/AiPatternCard';
import { TimelineFilters } from './components/timeline/TimelineFilters';
import { JourneyTimeline } from './components/timeline/JourneyTimeline';
import { AiInsightModal } from './components/modal/AiInsightModal';

import {
  initialPatient,
  initialDoctors,
  initialAuditLogs,
  healthMetrics,
  timelineItems
} from './data/medicalData';

import {
  initialHealthTrend,
  initialRecordsSummary,
  initialInsightCards,
  riskCategories,
  initialRecommendations
} from './data/aiInsightData';

import { TimelineFilter } from './types/medical';

export const App: React.FC = () => {
  // Check if URL has ?modal=true for test capture
  const [isInsightModalOpen, setIsInsightModalOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('modal') === 'true';
    }
    return false;
  });

  const [activeTab, setActiveTab] = useState('Dashboard');
  const [timelineFilter, setTimelineFilter] = useState<TimelineFilter>('all');
  const [timelineHighlighted, setTimelineHighlighted] = useState(false);

  // Editable Doctor Permissions
  const [doctors, setDoctors] = useState(initialDoctors);

  // Editable Recommendations Checkbox State
  const [recommendations, setRecommendations] = useState(initialRecommendations);

  // Toast Notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  }, []);

  // Listen for url change if needed
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      setIsInsightModalOpen(params.get('modal') === 'true');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenModal = () => {
    setIsInsightModalOpen(true);
    const url = new URL(window.location.href);
    url.searchParams.set('modal', 'true');
    window.history.pushState({}, '', url.toString());
  };

  const handleCloseModal = () => {
    setIsInsightModalOpen(false);
    const url = new URL(window.location.href);
    url.searchParams.delete('modal');
    window.history.pushState({}, '', url.toString());
  };

  const handleTogglePermission = (
    doctorId: string,
    permission: 'medicalRecords' | 'laboratoryResults' | 'prescriptions'
  ) => {
    setDoctors((prev) =>
      prev.map((doc) => {
        if (doc.id === doctorId) {
          const updated = {
            ...doc,
            permissions: {
              ...doc.permissions,
              [permission]: !doc.permissions[permission]
            }
          };
          showToast(`Updated ${permission} permission for ${doc.name}`);
          return updated;
        }
        return doc;
      })
    );
  };

  const handleRevokeDoctorAccess = (doctorId: string) => {
    const doc = doctors.find((d) => d.id === doctorId);
    showToast(`Access revoked for ${doc?.name || 'Doctor'}`);
  };

  const handleToggleRecommendation = (id: string) => {
    setRecommendations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleViewTimelineFromModal = () => {
    handleCloseModal();
    setTimelineHighlighted(true);
    const element = document.getElementById('health-timeline');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setTimeout(() => {
      setTimelineHighlighted(false);
    }, 2500);
  };

  // Filtered Timeline Items
  const filteredTimelineItems = timelineItems.filter((item) => {
    if (timelineFilter === 'all') return true;
    if (timelineFilter === 'labs') return item.category === 'labs';
    if (timelineFilter === 'prescriptions') return item.category === 'medication';
    if (timelineFilter === 'vitals') return item.category === 'vitals';
    return true;
  });

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-inter selection:bg-purple-600 selection:text-white pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs sm:text-sm font-medium animate-fade-in flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Navigation (1380px) */}
      <TopNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Critical Alert Result Banner (1369px) */}
      <CriticalResultBanner
        onViewResult={() => {
          showToast('Viewing critical lab result for potassium levels');
          handleOpenModal();
        }}
      />

      {/* Welcome Banner & Switcher (1358px) */}
      <WelcomeSection onOpenInsight={handleOpenModal} />

      {/* Main Content Area (1369px max width matching Figma Frame 2147226973) */}
      <main className="w-full max-w-[1369px] mx-auto px-3 sm:px-4 lg:px-0 flex flex-col gap-[29px] flex-1">
        {/* ROW 1: Left = Julian Casablancas (618px), Right = 4 Overview Cards (737px) */}
        <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-[13px]">
          {/* Left 618px: Quick actions + Julian Card */}
          <PatientProfileCard
            patient={initialPatient}
            onUploadFile={() => showToast('Opening file upload dialog...')}
            onDownloadRecords={() => showToast('Downloading health records archive...')}
            onAccessRequests={() => showToast('12 access requests pending review')}
            onNewAppointment={() => showToast('Scheduling a new appointment...')}
            onViewAppointments={() => showToast('Displaying patient appointments schedule')}
          />

          {/* Right 737px: 2x2 Overview Metrics Cards */}
          <HealthOverviewCards
            metrics={healthMetrics}
            onViewMetric={(id) => showToast(`Opening metric category ${id}`)}
          />
        </div>

        {/* ROW 2: Left = Manage Medical Access + Audit Trail (909px), Right = AI Pattern Detection + Journey Timeline (452px) */}
        <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-[10px]">
          {/* Left Column (909px): Manage Medical Access + Access Audit Trail */}
          <div className="w-full lg:w-[909px] flex flex-col gap-6 shrink-0">
            {/* Manage Medical Access */}
            <ManageMedicalAccess
              doctors={doctors}
              onTogglePermission={handleTogglePermission}
              onRevokeAccess={handleRevokeDoctorAccess}
              onViewAndEdit={(id) => showToast(`Editing doctor access rules for ${id}`)}
              onShareWithNewDoctor={() => showToast('Inviting new healthcare provider...')}
            />

            {/* Access Audit Trail Table */}
            <AccessAuditTrail
              logs={initialAuditLogs}
              onFullHistory={() => showToast('Loading full encrypted audit log...')}
            />
          </div>

          {/* Right Column (452px): AI Pattern Detection + Filters + Journey Timeline */}
          <div className="w-full lg:w-[452px] flex flex-col gap-5 shrink-0 lg:border-l lg:border-slate-300/60 lg:pl-4">
            {/* AI Pattern Detection Highlight Card */}
            <AiPatternCard onViewInsight={handleOpenModal} />

            {/* Timeline Filter Pills */}
            <TimelineFilters
              currentFilter={timelineFilter}
              onFilterChange={setTimelineFilter}
            />

            {/* Vertical Robust Journey Timeline */}
            <JourneyTimeline
              items={filteredTimelineItems}
              highlighted={timelineHighlighted}
            />
          </div>
        </div>
      </main>

      {/* AI Insight Summary Modal (Exact Figma Replica) */}
      <AiInsightModal
        isOpen={isInsightModalOpen}
        onClose={handleCloseModal}
        patient={initialPatient}
        trend={initialHealthTrend}
        recordsSummary={initialRecordsSummary}
        insights={initialInsightCards}
        risks={riskCategories}
        recommendations={recommendations}
        onToggleRecommendation={handleToggleRecommendation}
        onViewTimeline={handleViewTimelineFromModal}
      />
    </div>
  );
};

export default App;
