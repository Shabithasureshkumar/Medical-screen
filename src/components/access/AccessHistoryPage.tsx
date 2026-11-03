import React, { useState, useMemo } from 'react';
import { AccessHeader } from './AccessHeader';
import { AccessSummaryCards } from './AccessSummaryCards';
import { AccessControls } from './AccessControls';
import { AccessRequestCard } from './AccessRequestCard';
import { ActivityLogView } from './ActivityLogView';
import { AccessDetailModal } from './AccessDetailModal';

import {
  AccessType,
  AccessStatusTab,
  AccessRequestItem
} from '../../types/access';

import {
  pendingAccessRequestsData,
  approvedAccessRequestsData,
  rejectedAccessRequestsData,
  activityLogData,
  doctorAccessRequestsData
} from '../../data/accessHistoryData';

import { generateAccessAuditPdf } from '../../utils/pdfGenerator';

interface AccessHistoryPageProps {
  onBackToDashboard: () => void;
  onNavigateToRecords?: () => void;
  initialTab?: AccessStatusTab;
}

export const AccessHistoryPage: React.FC<AccessHistoryPageProps> = ({
  onBackToDashboard,
  onNavigateToRecords,
  initialTab = 'pending'
}) => {
  // Toggle: 'family' | 'doctor'
  const [accessType, setAccessType] = useState<AccessType>('family');

  // Active status tab: 'pending' | 'approved' | 'rejected' | 'history'
  const [activeTab, setActiveTab] = useState<AccessStatusTab>(initialTab);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('All Time');

  // Editable lists for responsive user actions
  const [pendingList, setPendingList] = useState<AccessRequestItem[]>(pendingAccessRequestsData);
  const [approvedList, setApprovedList] = useState<AccessRequestItem[]>(approvedAccessRequestsData);
  const [rejectedList, setRejectedList] = useState<AccessRequestItem[]>(rejectedAccessRequestsData);
  const [doctorList, setDoctorList] = useState<AccessRequestItem[]>(doctorAccessRequestsData);

  const matchesDateRange = (dateStr: string, range: string): boolean => {
    if (range === 'All Time') return true;
    const cleaned = dateStr.replace(/,\s*\d{1,2}:\d{2}\s*(AM|PM)/i, '');
    const parsed = new Date(cleaned);
    if (isNaN(parsed.getTime())) return true;
    const refDate = new Date('2026-06-15T23:59:59');
    const diffDays = (refDate.getTime() - parsed.getTime()) / (1000 * 60 * 60 * 24);
    if (range === 'Last 7 Days') return diffDays <= 7;
    if (range === 'Last 30 Days') return diffDays <= 30;
    if (range === 'Last 90 Days') return diffDays <= 90;
    return true;
  };

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'details' | 'permissions' | 'revoke'>('details');
  const [selectedRequest, setSelectedRequest] = useState<AccessRequestItem | null>(null);

  // Handle Tab Switch
  const handleTabChange = (tab: AccessStatusTab) => {
    setActiveTab(tab);
  };

  // Filtered lists
  const currentFamilyRequests = useMemo(() => {
    let source: AccessRequestItem[] = [];
    if (activeTab === 'pending') source = pendingList;
    else if (activeTab === 'approved') source = approvedList;
    else if (activeTab === 'rejected') source = rejectedList;

    const q = searchQuery.trim().toLowerCase();
    return source.filter((item) => {
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.relationship.toLowerCase().includes(q) ||
        item.reason.toLowerCase().includes(q) ||
        (item.rejectionReason && item.rejectionReason.toLowerCase().includes(q));
      const matchesDate = matchesDateRange(item.requestedDate, selectedDateRange);
      return matchesSearch && matchesDate;
    });
  }, [activeTab, pendingList, approvedList, rejectedList, searchQuery, selectedDateRange]);

  const filteredDoctorRequests = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return doctorList.filter((item) => {
      const matchesStatus = activeTab === 'history' ? true : item.status === activeTab;
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.relationship.toLowerCase().includes(q) ||
        item.reason.toLowerCase().includes(q) ||
        (item.rejectionReason && item.rejectionReason.toLowerCase().includes(q));
      const matchesDate = matchesDateRange(item.requestedDate, selectedDateRange);
      return matchesStatus && matchesSearch && matchesDate;
    });
  }, [doctorList, activeTab, searchQuery, selectedDateRange]);

  const filteredActivityLog = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return activityLogData.filter((item) => {
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.doctor && item.doctor.name.toLowerCase().includes(q));
      const matchesDate = matchesDateRange(item.timestamp, selectedDateRange);
      return matchesSearch && matchesDate;
    });
  }, [searchQuery, selectedDateRange]);

  // Dynamic summary stats
  const stats = useMemo(() => {
    const approvedDoctors = doctorList.filter((d) => d.status === 'approved').length;
    const pendingDoctors = doctorList.filter((d) => d.status === 'pending').length;
    const rejectedDoctors = doctorList.filter((d) => d.status === 'rejected').length;

    return {
      activeAccess: {
        count: approvedList.length + approvedDoctors,
        changeText: '+2 this week'
      },
      pendingRequests: {
        count: pendingList.length + pendingDoctors,
        badgeText: pendingList.length + pendingDoctors > 0 ? 'Needs Review' : 'Up to Date'
      },
      rejectedRequests: {
        count: rejectedList.length + rejectedDoctors,
        periodText: 'Last 30 days'
      }
    };
  }, [approvedList, doctorList, pendingList, rejectedList]);

  // Actions
  const handleSendReminder = (req: AccessRequestItem) => {
    showToast(`Reminder notification sent to ${req.name} (${req.relationship}).`);
  };

  const handleViewDetails = (req: AccessRequestItem) => {
    setSelectedRequest(req);
    setModalMode('details');
    setIsModalOpen(true);
  };

  const handleCancelRequest = (req: AccessRequestItem) => {
    if (req.id.startsWith('doctor-')) {
      setDoctorList((prev) => prev.filter((r) => r.id !== req.id));
    } else {
      setPendingList((prev) => prev.filter((r) => r.id !== req.id));
    }
    showToast(`Access request for ${req.name} has been cancelled.`);
  };

  const handleViewRecords = (req: AccessRequestItem) => {
    if (onNavigateToRecords) {
      onNavigateToRecords();
    } else {
      showToast(`Opening clinical records shared with ${req.name}...`);
    }
  };

  const handleShareWithDoctor = (req: AccessRequestItem) => {
    showToast(`Sharing permissions for ${req.name} initiated with care provider.`);
  };

  const handleRevokeAccess = (req: AccessRequestItem) => {
    setSelectedRequest(req);
    setModalMode('revoke');
    setIsModalOpen(true);
  };

  const handleManagePermission = (req: AccessRequestItem) => {
    setSelectedRequest(req);
    setModalMode('permissions');
    setIsModalOpen(true);
  };

  const handleContactFamily = (req: AccessRequestItem) => {
    showToast(`Opening direct communication channel with ${req.name}...`);
  };

  const handleRequestAgain = (req: AccessRequestItem) => {
    const reRequest: AccessRequestItem = {
      ...req,
      id: req.id.startsWith('doctor-') ? `doctor-rereq-${Date.now()}` : `pending-rereq-${Date.now()}`,
      status: 'pending',
      requestedDate: new Date().toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }),
      timelineSteps: [
        { label: 'Request Sent', status: 'completed' },
        { label: 'Waiting Approval', status: 'current' },
        { label: 'Access Granted', status: 'pending' }
      ]
    };
    if (req.id.startsWith('doctor-')) {
      setDoctorList((prev) => [reRequest, ...prev.filter((r) => r.id !== req.id)]);
    } else {
      setPendingList((prev) => [reRequest, ...prev]);
    }
    setActiveTab('pending');
    showToast(`New access request submitted for ${req.name}.`);
  };

  const handleConfirmModalAction = (
    req: AccessRequestItem,
    action: string,
    updatedAccessLevel?: string
  ) => {
    if (action === 'revoke') {
      const rejectedItem: AccessRequestItem = {
        ...req,
        status: 'rejected',
        rejectionReason: 'Access revoked by patient.',
        rejectedDate: new Date().toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }),
        timelineSteps: [
          { label: 'Request Sent', status: 'completed' },
          { label: 'Reviewed', status: 'completed' },
          { label: 'Rejected', status: 'rejected' }
        ]
      };
      if (req.id.startsWith('doctor-')) {
        setDoctorList((prev) => prev.map((r) => (r.id === req.id ? rejectedItem : r)));
      } else {
        setApprovedList((prev) => prev.filter((r) => r.id !== req.id));
        setRejectedList((prev) => [rejectedItem, ...prev]);
      }
      showToast(`Access revoked for ${req.name}. Record moved to Rejected tab.`);
    } else {
      if (updatedAccessLevel) {
        if (req.id.startsWith('doctor-')) {
          setDoctorList((prev) =>
            prev.map((r) => (r.id === req.id ? { ...r, accessLevel: updatedAccessLevel } : r))
          );
        } else {
          setApprovedList((prev) =>
            prev.map((r) => (r.id === req.id ? { ...r, accessLevel: updatedAccessLevel } : r))
          );
        }
      }
      showToast(`Permission settings updated for ${req.name}${updatedAccessLevel ? ` (${updatedAccessLevel})` : ''}.`);
    }
  };

  const handleDownloadFullAudit = () => {
    showToast('Generating HIPAA-compliant Access Audit Report PDF...');
    generateAccessAuditPdf(
      activityLogData.map((item) => ({
        timestamp: item.timestamp,
        title: item.title,
        description: item.description,
        isVerified: item.isVerified,
        actor: item.actor,
        ip: item.ip,
        sessionDuration: item.sessionDuration,
        scopeBadge: item.scopeBadge,
        doctor: item.doctor
      })),
      'David Brock',
      '#4432-6TH',
      {
        active: stats.activeAccess.count,
        pending: stats.pendingRequests.count,
        rejected: stats.rejectedRequests.count
      }
    );
  };

  return (
    <main className="w-full fluid-page-x fluid-page-y flex flex-col fluid-section-gap min-w-0 overflow-x-hidden">
      {/* 1. Page Header */}
      <AccessHeader
        onBackToDashboard={onBackToDashboard}
        accessType={accessType}
        onToggleAccessType={(type) => {
          setAccessType(type);
          showToast(`Switched view to ${type === 'family' ? 'Family Access' : 'Doctor Access'}`);
        }}
      />

      {/* 2. Three Summary Cards */}
      <AccessSummaryCards stats={stats} />

      {/* 3. Controls: Status Tabs + Search + Date Filter */}
      <AccessControls
        activeTab={activeTab}
        onTabChange={handleTabChange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedDateRange={selectedDateRange}
        onDateRangeChange={(range) => {
          setSelectedDateRange(range);
          showToast(`Filtered activity for: ${range}`);
        }}
      />

      {/* 4. Active Tab Content Area */}
      <section
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className="w-full flex flex-col gap-3.5 sm:gap-4 min-w-0"
      >
        {activeTab === 'history' ? (
          <ActivityLogView
            items={filteredActivityLog}
            onDownloadFullAudit={handleDownloadFullAudit}
            onDoctorClick={(docName) => showToast(`Opening profile for ${docName}...`)}
          />
        ) : accessType === 'doctor' ? (
          <div className="flex flex-col gap-3.5 sm:gap-4">
            {filteredDoctorRequests.length === 0 ? (
              <div className="bg-white rounded-[20px] p-12 text-center text-slate-400 text-sm border border-slate-100 font-inter">
                No doctor access requests match your criteria.
              </div>
            ) : (
              filteredDoctorRequests.map((request) => (
                <AccessRequestCard
                  key={request.id}
                  request={request}
                  onSendReminder={handleSendReminder}
                  onViewDetails={handleViewDetails}
                  onCancelRequest={handleCancelRequest}
                  onViewRecords={handleViewRecords}
                  onShareWithDoctor={handleShareWithDoctor}
                  onRevokeAccess={handleRevokeAccess}
                  onManagePermission={handleManagePermission}
                  onContactFamily={handleContactFamily}
                  onRequestAgain={handleRequestAgain}
                />
              ))
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3.5 sm:gap-4">
            {currentFamilyRequests.length === 0 ? (
              <div className="bg-white rounded-[20px] p-12 text-center text-slate-400 text-sm border border-slate-100 font-inter">
                No {activeTab} access requests found matching your filter.
              </div>
            ) : (
              currentFamilyRequests.map((request) => (
                <AccessRequestCard
                  key={request.id}
                  request={request}
                  onSendReminder={handleSendReminder}
                  onViewDetails={handleViewDetails}
                  onCancelRequest={handleCancelRequest}
                  onViewRecords={handleViewRecords}
                  onShareWithDoctor={handleShareWithDoctor}
                  onRevokeAccess={handleRevokeAccess}
                  onManagePermission={handleManagePermission}
                  onContactFamily={handleContactFamily}
                  onRequestAgain={handleRequestAgain}
                />
              ))
            )}
          </div>
        )}
      </section>

      {/* Modal Dialog */}
      <AccessDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        request={selectedRequest}
        mode={modalMode}
        onConfirmAction={handleConfirmModalAction}
      />

      {/* Floating Action Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 bg-[#1D1B20] text-white px-4 py-2.5 rounded-xl shadow-xl text-xs sm:text-sm font-medium animate-in fade-in slide-in-from-bottom-2 duration-200 border border-white/10"
        >
          {toastMessage}
        </div>
      )}
    </main>
  );
};
