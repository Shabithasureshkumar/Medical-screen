import React, { useState } from 'react';
import { UploadHeader } from './UploadHeader';
import { UploadDropzone } from './UploadDropzone';
import { QueuedUpload } from './QueuedUpload';
import { RecentUploads } from './RecentUploads';
import { DocumentDetails, UploadMetadata } from './DocumentDetails';
import { AiConsentCard } from './AiConsentCard';
import { AiProcessingModal } from './AiProcessingModal';
import { DocumentSuccessModal } from './DocumentSuccessModal';

import { UploadFlowState, QueuedFile, RecentUploadItem } from '../../types/upload';
import { initialQueuedFile, initialRecentUploads, availablePractitioners } from '../../data/uploadData';
import { MedicalRecordItem } from '../../data/medicalRecordsData';
import { TimelineItem } from '../../types/medical';

interface UploadMedicalDocumentsPageProps {
  onBackToDashboard: () => void;
  onCancel?: () => void;
  onNavigateToMedicalRecords?: () => void;
  onNavigateToTimeline?: () => void;
  onDocumentUploaded?: (record: MedicalRecordItem, timelineItem: TimelineItem) => void;
}

export const UploadMedicalDocumentsPage: React.FC<UploadMedicalDocumentsPageProps> = ({
  onBackToDashboard,
  onCancel,
  onNavigateToMedicalRecords,
  onNavigateToTimeline,
  onDocumentUploaded
}) => {
  const [flowState, setFlowState] = useState<UploadFlowState>('initial');
  const [queuedFile, setQueuedFile] = useState<QueuedFile | null>(initialQueuedFile);
  const [recentUploads, setRecentUploads] = useState<RecentUploadItem[]>(initialRecentUploads);
  const [uploadMetadata, setUploadMetadata] = useState<UploadMetadata>({
    categoryId: 'general-report',
    categoryLabel: 'General Health Report',
    doctor: availablePractitioners[0],
    notes: ''
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // Handle file selection from dropzone or browse
  const handleFileSelect = (file: File) => {
    const sizeMb = Math.max(0.1, file.size / (1024 * 1024)).toFixed(1);
    const newFile: QueuedFile = {
      id: `queue-${Date.now()}`,
      fileName: file.name,
      fileSize: `${sizeMb} MB`,
      status: 'Ready to process',
      fileType: file.type
    };
    setQueuedFile(newFile);
    setFlowState('uploaded');
    showToast(`File "${file.name}" uploaded successfully. Ready for AI analysis.`);
  };

  // Upload Document click in right details panel
  const handleUploadDocumentClick = (metadata?: UploadMetadata) => {
    if (!queuedFile) {
      showToast('Please select or drop a file to upload first.');
      return;
    }
    if (metadata) {
      setUploadMetadata(metadata);
    }
    if (flowState === 'initial') {
      setFlowState('uploaded');
      showToast('Document uploaded successfully. Review AI document analysis options.');
    } else {
      setFlowState('analyzing');
    }
  };

  // Remove queued file
  const handleRemoveQueuedFile = () => {
    setQueuedFile(null);
    if (flowState === 'uploaded') {
      setFlowState('initial');
    }
    showToast('Queued file removed.');
  };

  // "Yes, Analyze Document" click
  const handleAnalyzeDocument = () => {
    setFlowState('analyzing');
  };

  const commitUploadedDocument = () => {
    if (!queuedFile) return;

    const cleanTitle = queuedFile.fileName.replace(/\.[^/.]+$/, '');
    const doctorName = uploadMetadata.doctor?.name || 'Dr. Sarah Chen';
    const categoryLabel = uploadMetadata.categoryLabel || 'General Health Report';

    const newRecent: RecentUploadItem = {
      id: `recent-${Date.now()}`,
      title: `${cleanTitle} (${categoryLabel})`,
      date: 'Today',
      fileSize: queuedFile.fileSize,
      thumbnailUrl:
        uploadMetadata.categoryId === 'lab-results'
          ? '/assets/upload/thumb-blood-work.png'
          : uploadMetadata.categoryId === 'insurance-document'
          ? '/assets/upload/thumb-insurance-card.png'
          : '/assets/upload/thumb-chest-xray.png',
      verified: true
    };
    setRecentUploads((prev) => [newRecent, ...prev]);

    if (onDocumentUploaded) {
      const recordCategory =
        uploadMetadata.categoryId === 'lab-results'
          ? 'Lab Results'
          : uploadMetadata.categoryId === 'imaging-scan'
          ? 'Imaging'
          : uploadMetadata.categoryId === 'prescription'
          ? 'Prescriptions'
          : 'Documents';

      const nowIso = new Date().toISOString().slice(0, 10);
      const formattedDate = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      });

      const newMedicalRecord: MedicalRecordItem = {
        id: `rec-upload-${Date.now()}`,
        title: cleanTitle,
        subtitle: `Attending: ${doctorName}`,
        category: recordCategory,
        type:
          recordCategory === 'Lab Results'
            ? 'LAB RESULT'
            : recordCategory === 'Imaging'
            ? 'IMAGING'
            : recordCategory === 'Prescriptions'
            ? 'PRESCRIPTION'
            : 'SUMMARY',
        badgeTheme: recordCategory === 'Imaging' || recordCategory === 'Documents' ? 'blue' : 'purple',
        uploadedDate: formattedDate,
        rawDate: nowIso,
        aiExplanation:
          uploadMetadata.notes ||
          `Uploaded ${categoryLabel.toLowerCase()} associated with ${doctorName}. Verified and indexed in your encrypted Health Vault.`,
        iconType:
          recordCategory === 'Lab Results'
            ? 'lab'
            : recordCategory === 'Imaging'
            ? 'imaging'
            : recordCategory === 'Prescriptions'
            ? 'heart'
            : 'document',
        downloadFileName: queuedFile.fileName,
        fileSize: queuedFile.fileSize
      };

      const newTimelineItem: TimelineItem = {
        id: `tl-upload-${Date.now()}`,
        monthGroup: 'MAY 2026 • MANAGEMENT PHASE',
        category:
          recordCategory === 'Lab Results'
            ? 'labs'
            : recordCategory === 'Prescriptions'
            ? 'medication'
            : 'vitals',
        title: cleanTitle,
        subtitle: `${categoryLabel} • ${doctorName}`,
        tag: {
          label: 'STABLE',
          variant: 'stable'
        },
        description:
          uploadMetadata.notes ||
          `${categoryLabel} uploaded and linked to ${doctorName}.`,
        dateBadge: 'Just now'
      };

      onDocumentUploaded(newMedicalRecord, newTimelineItem);
    }
  };

  // "Skip for Now" click
  const handleSkipForNow = () => {
    commitUploadedDocument();
    setFlowState('initial');
    showToast('AI analysis skipped. File saved to your secure health vault.');
  };

  // When AI analysis completes
  const handleAnalysisComplete = () => {
    setFlowState('success');
  };

  // Done from Success Modal
  const handleDone = () => {
    commitUploadedDocument();
    setFlowState('initial');
    showToast('Document successfully integrated into your Health Vault.');
  };

  const handleViewTimeline = () => {
    commitUploadedDocument();
    setFlowState('initial');
    if (onNavigateToTimeline) {
      onNavigateToTimeline();
    } else {
      onBackToDashboard();
    }
  };

  const handleViewRecord = () => {
    commitUploadedDocument();
    setFlowState('initial');
    if (onNavigateToMedicalRecords) {
      onNavigateToMedicalRecords();
    } else {
      onBackToDashboard();
    }
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
        <UploadHeader
          onBackToDashboard={onBackToDashboard}
          onDownloadPdf={() => showToast('Preparing vault documents PDF archive for download...')}
          onUploadNewFile={() => {
            setFlowState('initial');
            showToast('Ready to upload a new document.');
          }}
          onSwitchProfile={() => showToast('Switched to David Brock (Self) view')}
        />

        {/* Section 2: Two-Column Main Layout (Left 65% / Right 35%) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          {/* Left Column (~65% / 8 cols): Dropzone / AI Consent + Queued + Recent Uploads */}
          <div className="w-full lg:col-span-8 flex flex-col gap-5 sm:gap-6 min-w-0">
            {/* Top Area: Dropzone (State 1) OR Upload Success + AI Consent (State 2) */}
            {flowState === 'uploaded' && queuedFile ? (
              <AiConsentCard
                file={queuedFile}
                onAnalyzeDocument={handleAnalyzeDocument}
                onSkipForNow={handleSkipForNow}
              />
            ) : (
              <UploadDropzone
                onFileSelect={handleFileSelect}
                onValidationError={(msg) => showToast(msg)}
              />
            )}

            {/* Queued For Upload Card */}
            <QueuedUpload
              file={queuedFile}
              onRemove={handleRemoveQueuedFile}
            />

            {/* Recent Uploads Section */}
            <RecentUploads
              uploads={recentUploads}
              onViewAll={() => showToast('Showing all archived uploaded documents.')}
              onDownloadItem={(item) => showToast(`Downloading ${item.title}...`)}
              onShareItem={(item) => showToast(`Sharing ${item.title} with care team...`)}
              onDeleteItem={(item) => {
                setRecentUploads((prev) => prev.filter((i) => i.id !== item.id));
                showToast(`Removed ${item.title}.`);
              }}
            />
          </div>

          {/* Right Column (~35% / 4 cols): Document Details Form */}
          <div className="w-full lg:col-span-4 min-w-0">
            <DocumentDetails
              onUploadDocument={handleUploadDocumentClick}
              onCancel={onCancel || onBackToDashboard}
              disabled={!queuedFile}
            />
          </div>
        </div>
      </main>

      {/* State 3: AI Document Analysis Modal */}
      <AiProcessingModal
        isOpen={flowState === 'analyzing'}
        onComplete={handleAnalysisComplete}
        onClose={() => setFlowState('uploaded')}
      />

      {/* State 4: Document Successfully Processed Modal */}
      <DocumentSuccessModal
        isOpen={flowState === 'success'}
        onDone={handleDone}
        onViewTimeline={handleViewTimeline}
        onViewRecord={handleViewRecord}
        onClose={handleDone}
      />
    </div>
  );
};
