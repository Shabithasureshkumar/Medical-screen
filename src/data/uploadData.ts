import {
  QueuedFile,
  RecentUploadItem,
  DocumentCategory,
  Practitioner,
  ProcessingStep,
  SuccessStatusItem
} from '../types/upload';

export const initialQueuedFile: QueuedFile = {
  id: 'queue-1',
  fileName: 'annual_physical_2026.pdf',
  fileSize: '2.4 MB',
  status: 'Ready to process',
  fileType: 'application/pdf'
};

export const initialRecentUploads: RecentUploadItem[] = [
  {
    id: 'recent-1',
    title: 'Chest X-Ray',
    date: 'May 24, 2026',
    fileSize: '2.4 MB',
    thumbnailUrl: '/assets/upload/thumb-chest-xray.png',
    verified: true
  },
  {
    id: 'recent-2',
    title: 'Blood Work',
    date: 'May 20, 2026',
    fileSize: '1.1 MB',
    thumbnailUrl: '/assets/upload/thumb-blood-work.png',
    verified: true
  },
  {
    id: 'recent-3',
    title: 'Insurance Card',
    date: 'Apr 12, 2026',
    fileSize: '0.8 MB',
    thumbnailUrl: '/assets/upload/thumb-insurance-card.png',
    verified: true
  }
];

export const documentCategories: DocumentCategory[] = [
  { id: 'select', label: 'Select document type' },
  { id: 'general-report', label: 'General Health Report' },
  { id: 'lab-results', label: 'Blood & Laboratory Results' },
  { id: 'imaging-scan', label: 'Radiology & Imaging Scan' },
  { id: 'prescription', label: 'Prescription & Medication Order' },
  { id: 'insurance-document', label: 'Insurance & Coverage Card' },
  { id: 'clinical-note', label: 'Clinical Consultation Note' }
];

export const availablePractitioners: Practitioner[] = [
  {
    id: 'doc-1',
    name: 'Dr. Sarah Chen',
    specialty: 'Cardiology Specialist',
    avatarUrl: '/assets/avatars/dr-sarah-jenkins.png'
  },
  {
    id: 'doc-2',
    name: 'Dr. Marcus Thorne',
    specialty: 'Endocrinologist',
    avatarUrl: '/assets/avatars/dr-patel.png'
  },
  {
    id: 'doc-3',
    name: 'Dr. Emily Watson',
    specialty: 'Pulmonologist',
    avatarUrl: '/assets/avatars/dr-sarah-jenkins.png'
  }
];

export const initialProcessingSteps: ProcessingStep[] = [
  { id: 'step-1', label: 'Reading PDF Data', status: 'completed' },
  { id: 'step-2', label: 'Detecting Provider', status: 'completed' },
  { id: 'step-3', label: 'Extracting Biomarkers', status: 'active' },
  { id: 'step-4', label: 'Synthesizing Summary', status: 'pending' }
];

export const successStatusRows: SuccessStatusItem[] = [
  { id: 'stat-1', title: 'Medical Record Added', iconName: 'record' },
  { id: 'stat-2', title: 'Timeline Updated', iconName: 'timeline' },
  { id: 'stat-3', title: 'Lab Results Saved', iconName: 'lab' },
  { id: 'stat-4', title: 'AI Insights Generated', iconName: 'insight' }
];
