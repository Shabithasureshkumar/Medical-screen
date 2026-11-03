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
import { LabImagingPage } from './components/imaging/LabImagingPage';
import { LabTestsPage } from './components/lab-tests/LabTestsPage';
import { MedicalRecordsPage } from './components/medical-records/MedicalRecordsPage';
import { PrescriptionPage } from './components/prescription/PrescriptionPage';
import { UploadMedicalDocumentsPage } from './components/upload/UploadMedicalDocumentsPage';
import { AccessHistoryPage } from './components/access/AccessHistoryPage';
import { AccessRequestPage } from './components/access-request/AccessRequestPage';

import {
  initialPatient,
  familyPatientProfiles,
  initialDoctors,
  initialAuditLogs,
  healthMetrics,
  timelineItems as defaultTimelineItems
} from './data/medicalData';

import {
  initialHealthTrend,
  initialRecordsSummary,
  initialInsightCards,
  riskCategories,
  initialRecommendations
} from './data/aiInsightData';

import {
  initialMedicalRecords,
  MedicalRecordItem
} from './data/medicalRecordsData';

import { TimelineFilter, TimelineItem } from './types/medical';
import {
  loadActivePatientId,
  saveActivePatientId,
  loadPatientPortalState,
  savePatientPortalState,
  fetchPatientPortalStateFromApi
} from './services/storageService';

export type AppPage = 'dashboard' | 'lab-tests' | 'imaging' | 'medical-records' | 'prescription' | 'upload' | 'access-history' | 'access-request';

export const App: React.FC = () => {
  // Check if URL has ?modal=true for test capture
  const [isInsightModalOpen, setIsInsightModalOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('modal') === 'true';
    }
    return false;
  });

  // Navigation State: 'dashboard' | 'lab-tests' | 'imaging' | 'medical-records' | 'prescription' | 'upload'
  const [currentPage, setCurrentPage] = useState<AppPage>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('page') === 'access-request') return 'access-request';
      if (params.get('page') === 'access-history') return 'access-history';
      if (params.get('page') === 'upload') return 'upload';
      if (params.get('page') === 'prescription') return 'prescription';
      if (params.get('page') === 'medical-records') return 'medical-records';
      if (params.get('page') === 'lab-tests') return 'lab-tests';
      if (params.get('page') === 'imaging' || params.has('study') || params.has('signal')) return 'imaging';
      return 'dashboard';
    }
    return 'dashboard';
  });

  const [timelineFilter, setTimelineFilter] = useState<TimelineFilter>('all');
  const [timelineHighlighted, setTimelineHighlighted] = useState(false);

  // Active Patient Profile (supports account switching with isolated storage)
  const [activePatientId, setActivePatientId] = useState<string>(() =>
    loadActivePatientId(initialPatient.id)
  );

  const activePatient =
    familyPatientProfiles.find((p) => p.id === activePatientId) || initialPatient;

  // Load persisted state for the active patient
  const initialPersisted = loadPatientPortalState(activePatient.id, {
    doctors: initialDoctors,
    auditLogs: initialAuditLogs,
    recommendations: initialRecommendations,
    medicalRecords: initialMedicalRecords,
    timelineItems: defaultTimelineItems
  });

  const [doctors, setDoctors] = useState(initialPersisted.doctors);
  const [auditLogs, setAuditLogs] = useState(initialPersisted.auditLogs);
  const [recommendations, setRecommendations] = useState(initialPersisted.recommendations);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecordItem[]>(
    initialPersisted.medicalRecords
  );
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>(
    initialPersisted.timelineItems
  );

  // Sync with backend API on mount / patient switch
  useEffect(() => {
    let cancelled = false;
    void fetchPatientPortalStateFromApi(activePatient.id).then((remote) => {
      if (cancelled || !remote) return;
      if (Array.isArray(remote.doctors)) setDoctors(remote.doctors);
      if (Array.isArray(remote.auditLogs)) setAuditLogs(remote.auditLogs);
      if (Array.isArray(remote.recommendations)) setRecommendations(remote.recommendations);
      if (Array.isArray(remote.medicalRecords)) setMedicalRecords(remote.medicalRecords);
      if (Array.isArray(remote.timelineItems)) setTimelineItems(remote.timelineItems);
    });
    return () => {
      cancelled = true;
    };
  }, [activePatient.id]);

  // Persist whenever state changes
  useEffect(() => {
    savePatientPortalState(activePatient.id, {
      doctors,
      auditLogs,
      recommendations,
      medicalRecords,
      timelineItems
    });
  }, [activePatient.id, doctors, auditLogs, recommendations, medicalRecords, timelineItems]);

  // Derive TopNavigation active tab from currentPage so navigation stays consistent
  const derivedActiveTab =
    currentPage === 'dashboard'
      ? 'Dashboard'
      : currentPage === 'imaging' || currentPage === 'lab-tests'
      ? 'Reports'
      : 'Patient';

  // Toast Notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  }, []);

  // Listen for url change (back/forward navigation)
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      setIsInsightModalOpen(params.get('modal') === 'true');
      const pageParam = params.get('page');
      if (pageParam === 'access-request') {
        setCurrentPage('access-request');
      } else if (pageParam === 'access-history') {
        setCurrentPage('access-history');
      } else if (pageParam === 'upload') {
        setCurrentPage('upload');
      } else if (pageParam === 'prescription') {
        setCurrentPage('prescription');
      } else if (pageParam === 'medical-records') {
        setCurrentPage('medical-records');
      } else if (pageParam === 'lab-tests') {
        setCurrentPage('lab-tests');
      } else if (pageParam === 'imaging' || params.has('study') || params.has('signal')) {
        setCurrentPage('imaging');
      } else {
        setCurrentPage('dashboard');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page: AppPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const url = new URL(window.location.href);
    if (page === 'access-request') {
      url.searchParams.set('page', 'access-request');
      url.searchParams.delete('study');
      url.searchParams.delete('signal');
    } else if (page === 'access-history') {
      url.searchParams.set('page', 'access-history');
      url.searchParams.delete('study');
      url.searchParams.delete('signal');
    } else if (page === 'upload') {
      url.searchParams.set('page', 'upload');
      url.searchParams.delete('study');
      url.searchParams.delete('signal');
    } else if (page === 'lab-tests') {
      url.searchParams.set('page', 'lab-tests');
      url.searchParams.delete('study');
      url.searchParams.delete('signal');
    } else if (page === 'imaging') {
      url.searchParams.set('page', 'imaging');
      url.searchParams.delete('study');
      url.searchParams.delete('signal');
    } else if (page === 'medical-records') {
      url.searchParams.set('page', 'medical-records');
      url.searchParams.delete('study');
      url.searchParams.delete('signal');
    } else if (page === 'prescription') {
      url.searchParams.set('page', 'prescription');
      url.searchParams.delete('study');
      url.searchParams.delete('signal');
    } else {
      url.searchParams.delete('page');
      url.searchParams.delete('study');
      url.searchParams.delete('signal');
    }
    window.history.pushState({}, '', url.toString());
  };

  const handleTabChange = (tab: string) => {
    if (tab === 'Dashboard') {
      handleNavigate('dashboard');
    } else if (tab === 'Reports') {
      handleNavigate('imaging');
    } else if (tab === 'Patient') {
      handleNavigate('medical-records');
    } else {
      showToast(`${tab} module is scheduled for the next portal release.`);
    }
  };

  const handleSwitchPatientProfile = () => {
    const currentIndex = familyPatientProfiles.findIndex((p) => p.id === activePatient.id);
    const nextProfile =
      familyPatientProfiles[(currentIndex + 1) % familyPatientProfiles.length] || initialPatient;
    setActivePatientId(nextProfile.id);
    saveActivePatientId(nextProfile.id);
    const nextState = loadPatientPortalState(nextProfile.id, {
      doctors: initialDoctors,
      auditLogs: initialAuditLogs,
      recommendations: initialRecommendations,
      medicalRecords: initialMedicalRecords,
      timelineItems: defaultTimelineItems
    });
    setDoctors(nextState.doctors);
    setAuditLogs(nextState.auditLogs);
    setRecommendations(nextState.recommendations);
    setMedicalRecords(nextState.medicalRecords);
    setTimelineItems(nextState.timelineItems);
    showToast(`Switched active patient account to ${nextProfile.name} (${nextProfile.id})`);
  };

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
    setDoctors((prev) => prev.filter((d) => d.id !== doctorId));
    setAuditLogs((prev) => [
      {
        id: `log-revoke-${Date.now()}`,
        viewedBy: `${activePatient.name} (Patient)`,
        badgeInitials: activePatient.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase(),
        badgeBg: '#FEF2F2',
        badgeTextColor: '#DC2626',
        timestamp: 'Just now',
        accessPoint: 'Patient Portal Security',
        actionTaken: `Revoked Access (${doc?.name || 'Doctor'})`,
        actionBadgeBg: '#FEF2F2',
        actionTextColor: '#DC2626',
        isSecured: true
      },
      ...prev
    ]);
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
    if (currentPage !== 'dashboard') {
      handleNavigate('dashboard');
    }
    setTimelineHighlighted(true);
    setTimeout(() => {
      const element = document.getElementById('health-timeline');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 120);
    setTimeout(() => {
      setTimelineHighlighted(false);
    }, 2600);
  };

  const handleDocumentUploaded = (
    newRecord: MedicalRecordItem,
    newTimeline: TimelineItem
  ) => {
    setMedicalRecords((prev) => [newRecord, ...prev]);
    setTimelineItems((prev) => [newTimeline, ...prev]);
    setAuditLogs((prev) => [
      {
        id: `log-upload-${Date.now()}`,
        viewedBy: `${activePatient.name} (Patient)`,
        badgeInitials: activePatient.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase(),
        badgeBg: '#F3E8FF',
        badgeTextColor: '#7E22CE',
        timestamp: 'Just now',
        accessPoint: 'Patient Health Vault',
        actionTaken: `Uploaded ${newRecord.title}`,
        actionBadgeBg: '#ECFDF5',
        actionTextColor: '#059669',
        isSecured: true
      },
      ...prev
    ]);
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
      <TopNavigation
        activeTab={derivedActiveTab}
        onTabChange={handleTabChange}
        patientName={activePatient.name}
      />

      {currentPage === 'upload' ? (
        <UploadMedicalDocumentsPage
          onBackToDashboard={() => handleNavigate('dashboard')}
          onCancel={() => handleNavigate('dashboard')}
          onNavigateToMedicalRecords={() => handleNavigate('medical-records')}
          onNavigateToTimeline={handleViewTimelineFromModal}
          onDocumentUploaded={handleDocumentUploaded}
        />
      ) : currentPage === 'lab-tests' ? (
        <LabTestsPage
          onBackToDashboard={() => handleNavigate('dashboard')}
          onNavigateToUpload={() => handleNavigate('upload')}
          onNavigateToShare={() => handleNavigate('access-request')}
          onOpenAiInsight={handleOpenModal}
          patientName={activePatient.name}
          patientId={activePatient.id}
        />
      ) : currentPage === 'imaging' ? (
        <LabImagingPage
          onBackToDashboard={() => handleNavigate('dashboard')}
          onOpenAiInsight={handleOpenModal}
          onNavigateToUpload={() => handleNavigate('upload')}
        />
      ) : currentPage === 'medical-records' ? (
        <MedicalRecordsPage
          onBackToDashboard={() => handleNavigate('dashboard')}
          onNavigateToUpload={() => handleNavigate('upload')}
          externalRecords={medicalRecords}
        />
      ) : currentPage === 'prescription' ? (
        <PrescriptionPage
          onBackToDashboard={() => handleNavigate('dashboard')}
          onOpenAiInsight={handleOpenModal}
          onNavigateToUpload={() => handleNavigate('upload')}
        />
      ) : currentPage === 'access-history' ? (
        <AccessHistoryPage
          onBackToDashboard={() => handleNavigate('dashboard')}
          onNavigateToRecords={() => handleNavigate('medical-records')}
        />
      ) : currentPage === 'access-request' ? (
        <AccessRequestPage
          onBackToDashboard={() => handleNavigate('dashboard')}
          onNavigateToRecords={() => handleNavigate('medical-records')}
        />
      ) : (
        <>
          {/* Critical Alert Result Banner (1369px) */}
          <CriticalResultBanner
            onViewResult={() => {
              showToast('Viewing critical lab result for potassium levels');
              handleOpenModal();
            }}
          />

          {/* Welcome Banner & Switcher (1358px) */}
          <WelcomeSection
            onOpenInsight={handleOpenModal}
            patientName={activePatient.name}
            relationship={activePatient.relationship}
            onSwitchProfile={handleSwitchPatientProfile}
          />

          {/* Main Content Area */}
          <main className="w-full fluid-page-x desktop-main-padding flex flex-col gap-[clamp(1.25rem,2.1vw,29px)] flex-1">
            {/* ROW 1: Left = Patient Profile Card (46% / 618px), Right = 4 Overview Cards (54% / 737px) */}
            <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-3 xl:gap-[13px] min-[1380px]:justify-start min-w-0">
              {/* Left: Quick actions + Patient Profile Card */}
              <PatientProfileCard
                patient={activePatient}
                onUploadFile={() => handleNavigate('upload')}
                onDownloadRecords={() => showToast('Downloading health records archive...')}
                onAccessRequests={() => handleNavigate('access-history')}
                onNewAppointment={() => showToast('Scheduling a new appointment...')}
                onViewAppointments={() => showToast('Displaying patient appointments schedule')}
              />

              {/* Right: 2x2 Overview Metrics Cards */}
              <HealthOverviewCards
                metrics={healthMetrics}
                onViewMetric={(id) => {
                  if (id === 'metric-2') {
                    handleNavigate('lab-tests');
                  } else if (id === 'metric-4') {
                    handleNavigate('imaging');
                  } else if (id === 'metric-1') {
                    handleNavigate('medical-records');
                  } else if (id === 'metric-3') {
                    handleNavigate('prescription');
                  } else {
                    showToast(`Opening metric category ${id}`);
                  }
                }}
              />
            </div>

            {/* ROW 2: Left = Manage Medical Access + Audit Trail (65% / 909px), Right = AI Pattern Detection + Journey Timeline (35% / 452px) */}
            <div className="w-full flex flex-col lg:flex-row items-start lg:items-stretch justify-between gap-4 xl:gap-[10px] min-[1380px]:justify-start min-w-0">
              {/* Left Column: Manage Medical Access + Access Audit Trail */}
              <div className="w-full min-w-0 lg:w-[65%] xl:w-[66%] desktop-row2-left-fixed flex flex-col gap-6">
                {/* Manage Medical Access */}
                <ManageMedicalAccess
                  doctors={doctors}
                  onTogglePermission={handleTogglePermission}
                  onRevokeAccess={handleRevokeDoctorAccess}
                  onViewAndEdit={(id) => showToast(`Editing doctor access rules for ${id}`)}
                  onShareWithNewDoctor={() => handleNavigate('access-request')}
                />
              </div>

              {/* Right Column: AI Pattern Detection + Filters + Journey Timeline */}
              <div className="w-full min-w-0 lg:w-[35%] xl:w-[34%] desktop-row2-right-fixed relative lg:border-l lg:border-slate-300/60 lg:pl-3 xl:pl-4">
                <div className="flex flex-col gap-5 lg:absolute lg:inset-y-0 lg:left-3 xl:left-4 lg:right-0 lg:overflow-y-auto no-scrollbar lg:pr-1">
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
            </div>

            {/* Access Audit Trail (full width) */}
            <div className="w-full min-w-0">
              <AccessAuditTrail
                logs={auditLogs}
                onFullHistory={() => handleNavigate('access-history')}
              />
            </div>
          </main>
        </>
      )}

      {/* AI Insight Summary Modal (Exact Figma Replica) */}
      <AiInsightModal
        isOpen={isInsightModalOpen}
        onClose={handleCloseModal}
        patient={activePatient}
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
