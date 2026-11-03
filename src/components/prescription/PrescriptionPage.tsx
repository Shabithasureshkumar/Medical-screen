import React, { useState, useMemo } from 'react';
import { PrescriptionHeader } from './PrescriptionHeader';
import { CurrentPrescriptionCard } from './CurrentPrescriptionCard';
import { PrimaryPharmacy } from './PrimaryPharmacy';
import { PrescriptionQuestions } from './PrescriptionQuestions';
import { PrescriptionQuickActions } from './PrescriptionQuickActions';
import { PrescriptionRecords } from './PrescriptionRecords';

import {
  activePrescriptionData,
  prescriptionRecordsData,
  PrescriptionFilter,
  PrescriptionRecord
} from '../../data/prescriptionData';
import { generatePrescriptionPdf } from '../../utils/pdfGenerator';

interface PrescriptionPageProps {
  onBackToDashboard: () => void;
  onOpenAiInsight?: () => void;
  onNavigateToUpload?: () => void;
}

export const PrescriptionPage: React.FC<PrescriptionPageProps> = ({
  onBackToDashboard,
  onOpenAiInsight,
  onNavigateToUpload
}) => {
  const [activeFilter, setActiveFilter] = useState<PrescriptionFilter>('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // Filtered prescription records
  const filteredRecords = useMemo(() => {
    if (activeFilter === 'All') return prescriptionRecordsData;
    return prescriptionRecordsData.filter((r) => r.status === activeFilter);
  }, [activeFilter]);

  const handleDownloadActivePdf = () => {
    showToast('Preparing clinical prescription PDF for download...');
    generatePrescriptionPdf({
      condition: activePrescriptionData.condition,
      issueDate: activePrescriptionData.issueDate,
      expiryDate: activePrescriptionData.expiryDate,
      doctor: activePrescriptionData.doctor,
      diagnosisSummary: activePrescriptionData.diagnosisSummary,
      instructions: activePrescriptionData.instructionsDesktop,
      medicines: activePrescriptionData.medicines,
      pharmacy: activePrescriptionData.pharmacy
    });
  };

  const handleRequestRefill = (conditionName: string) => {
    showToast(`Refill request submitted for ${conditionName}. Processing with pharmacy.`);
  };

  const handleShareWithCareTeam = () => {
    showToast('Prescription order securely shared with Dr. Sarah Chen & care team.');
  };

  const handleMessageDoctor = () => {
    showToast(`Opening direct consultation message thread with ${activePrescriptionData.doctor.name}...`);
  };

  const handleDownloadRecord = (rec: PrescriptionRecord) => {
    showToast(`Downloading prescription record for ${rec.condition}...`);
  };

  const handleViewRecord = (rec: PrescriptionRecord) => {
    showToast(`Viewing clinical details for ${rec.condition}`);
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
        <PrescriptionHeader
          onBackToDashboard={onBackToDashboard}
          onDownloadPrescriptions={handleDownloadActivePdf}
          onViewPrescription={() => showToast('Displaying active prescription clinical details...')}
          onUploadFile={onNavigateToUpload || (() => showToast('Opening secure document upload dialog...'))}
          onSwitchProfile={() => showToast('Switched to David Brock (Self) view')}
        />

        {/* Section 2: Two-Column Main Area (Desktop side-by-side, Mobile stacked) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          {/* Left Column (~65% desktop / 8 cols): Current Prescription Card */}
          <div className="w-full lg:col-span-8">
            <CurrentPrescriptionCard
              prescription={activePrescriptionData}
              onDownloadPdf={handleDownloadActivePdf}
            />
          </div>

          {/* Right Column (~35% desktop / 4 cols): Pharmacy, Questions, Quick Actions */}
          <div className="w-full lg:col-span-4 flex flex-col gap-4 sm:gap-5">
            <PrimaryPharmacy
              pharmacy={activePrescriptionData.pharmacy}
              onViewPharmacy={() => showToast(`Connecting to ${activePrescriptionData.pharmacy.nameDesktop}...`)}
            />

            <PrescriptionQuestions
              questions={activePrescriptionData.questions}
              onMessageCareTeam={() => showToast('Direct message queued for clinical care team')}
              onCallOffice={() => showToast(`Initiating call to ${activePrescriptionData.questions.officePhone}`)}
              onMessageDoctor={handleMessageDoctor}
            />

            <PrescriptionQuickActions
              doctorName={activePrescriptionData.doctor.name}
              onRequestRefill={() => handleRequestRefill(activePrescriptionData.condition)}
              onShareWithCareTeam={handleShareWithCareTeam}
              onMessageDoctor={handleMessageDoctor}
              onAskAiAssistant={() => {
                if (onOpenAiInsight) {
                  onOpenAiInsight();
                } else {
                  showToast('Launching AI Prescription Intelligence Assistant...');
                }
              }}
            />
          </div>
        </div>

        {/* Section 3: Bottom Section - My Prescription Records */}
        <div className="w-full">
          <PrescriptionRecords
            records={filteredRecords}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            onViewDetails={handleViewRecord}
            onDownloadRecord={handleDownloadRecord}
            onRequestRefill={(rec) => handleRequestRefill(rec.condition)}
          />
        </div>
      </main>
    </div>
  );
};
