export type UploadFlowState = 'initial' | 'uploaded' | 'analyzing' | 'success';

export interface QueuedFile {
  id: string;
  fileName: string;
  fileSize: string;
  status: string;
  fileType?: string;
}

export interface RecentUploadItem {
  id: string;
  title: string;
  date: string;
  fileSize: string;
  thumbnailUrl: string;
  verified: boolean;
}

export interface Practitioner {
  id: string;
  name: string;
  specialty: string;
  avatarUrl?: string;
}

export interface DocumentCategory {
  id: string;
  label: string;
}

export interface ProcessingStep {
  id: string;
  label: string;
  status: 'completed' | 'active' | 'pending';
}

export interface SuccessStatusItem {
  id: string;
  title: string;
  iconName: 'record' | 'timeline' | 'lab' | 'insight';
}
