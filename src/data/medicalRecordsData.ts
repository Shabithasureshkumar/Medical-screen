export type RecordCategory = 
  | 'All Records'
  | 'Lab Results'
  | 'Imaging'
  | 'Prescriptions'
  | 'Visit Notes'
  | 'Documents';

export type RecordTypeBadge = 'DIAGNOSTIC' | 'IMAGING' | 'LAB RESULT' | 'SUMMARY' | 'PRESCRIPTION';

export interface MedicalRecordItem {
  id: string;
  title: string;
  subtitle: string;
  category: RecordCategory;
  type: RecordTypeBadge;
  badgeTheme: 'purple' | 'blue';
  uploadedDate: string;
  rawDate: string;
  aiExplanation: string;
  iconType: 'heart' | 'imaging' | 'lab' | 'document';
  downloadFileName: string;
  fileSize: string;
}

export interface ConsentSettingItem {
  id: string;
  title: string;
  description: string;
  status: 'ACTIVE' | 'REVOKED' | 'TOGGLE TO ENABLE';
  enabled: boolean;
  iconType: 'research' | 'telemedicine' | 'marketing';
  footerText: string;
  footerIsAction: boolean;
}

export interface CorrectionRequestItem {
  id: string;
  field: string;
  subtext: string;
  date: string;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
}

export const initialMedicalRecords: MedicalRecordItem[] = [
  {
    id: 'rec-1',
    title: 'Cardiology Report',
    subtitle: 'Attending: Dr. Aris Thorne',
    category: 'Lab Results',
    type: 'DIAGNOSTIC',
    badgeTheme: 'purple',
    uploadedDate: 'Jun 18, 2026',
    rawDate: '2026-06-18',
    aiExplanation: 'Normal Sinus Rhythm with occasional PACs noted. No ischemic changes observed compared to previous baseline.',
    iconType: 'heart',
    downloadFileName: 'Cardiology_Report_Jun2026.pdf',
    fileSize: '1.4 MB'
  },
  {
    id: 'rec-2',
    title: 'Chest X-ray',
    subtitle: 'Facility: Metro Radiology',
    category: 'Imaging',
    type: 'IMAGING',
    badgeTheme: 'blue',
    uploadedDate: 'Jun 22, 2026',
    rawDate: '2026-06-22',
    aiExplanation: 'Clear lung fields bilaterally. Cardiothoracic ratio within normal limits. No acute cardiopulmonary abnormalities.',
    iconType: 'imaging',
    downloadFileName: 'Chest_Xray_Scan_Jun2026.pdf',
    fileSize: '8.7 MB'
  },
  {
    id: 'rec-3',
    title: 'Lab Work - Panel',
    subtitle: 'Status: Finalized',
    category: 'Lab Results',
    type: 'LAB RESULT',
    badgeTheme: 'purple',
    uploadedDate: 'May 25, 2026',
    rawDate: '2026-05-25',
    aiExplanation: 'Lipid profile indicates elevated LDL (135 mg/dL) and serum potassium at 6.1 mEq/L. Fasting glucose optimal at 92 mg/dL.',
    iconType: 'lab',
    downloadFileName: 'Comprehensive_Metabolic_Panel.pdf',
    fileSize: '620 KB'
  },
  {
    id: 'rec-4',
    title: 'Discharge Summary',
    subtitle: 'Admission: May 01, 2026',
    category: 'Visit Notes',
    type: 'SUMMARY',
    badgeTheme: 'purple',
    uploadedDate: 'May 05, 2026',
    rawDate: '2026-05-05',
    aiExplanation: 'Patient discharged following successful routine procedure. Vitals stable. Follow-up scheduled in 2 weeks.',
    iconType: 'document',
    downloadFileName: 'Discharge_Summary_May2026.pdf',
    fileSize: '950 KB'
  },
  {
    id: 'rec-5',
    title: 'Hypertension Regimen (Rx)',
    subtitle: 'Prescriber: Dr. Sarah Chen',
    category: 'Prescriptions',
    type: 'PRESCRIPTION',
    badgeTheme: 'purple',
    uploadedDate: 'Apr 24, 2026',
    rawDate: '2026-04-24',
    aiExplanation: 'Active antihypertensive prescription including Lisinopril 10mg, Hydrochlorothiazide 12.5mg, and Amlodipine 5mg.',
    iconType: 'document',
    downloadFileName: 'Prescription_Hypertension_Apr2026.pdf',
    fileSize: '410 KB'
  },
  {
    id: 'rec-6',
    title: 'Clinical Consent & Insurance Packet',
    subtitle: 'Facility: HealthBridge Portal',
    category: 'Documents',
    type: 'SUMMARY',
    badgeTheme: 'blue',
    uploadedDate: 'Mar 15, 2026',
    rawDate: '2026-03-15',
    aiExplanation: 'Verified patient HIPAA authorization, insurance coverage card, and advance care directive documentation.',
    iconType: 'document',
    downloadFileName: 'Clinical_Consent_Packet_2026.pdf',
    fileSize: '520 KB'
  }
];

export const initialConsentSettings: ConsentSettingItem[] = [
  {
    id: 'consent-research',
    title: 'Data Sharing with Research',
    description: 'Contribute anonymized data to global medical studies to help advance treatment for rare conditions.',
    status: 'ACTIVE',
    enabled: true,
    iconType: 'research',
    footerText: 'View Details →',
    footerIsAction: true
  },
  {
    id: 'consent-telemedicine',
    title: 'Telemedicine Service',
    description: 'Consent for virtual consultations, including audio and video recording for clinical record-keeping.',
    status: 'REVOKED',
    enabled: false,
    iconType: 'telemedicine',
    footerText: 'Last updated Oct 12, 2023',
    footerIsAction: false
  },
  {
    id: 'consent-marketing',
    title: 'Marketing & Newsletter',
    description: 'Stay informed about new wellness programs, facility updates, and health tips tailored for you.',
    status: 'TOGGLE TO ENABLE',
    enabled: false,
    iconType: 'marketing',
    footerText: 'Manage marketing preferences',
    footerIsAction: true
  }
];

export const initialCorrectionRequests: CorrectionRequestItem[] = [
  {
    id: '#REQ-8821',
    field: 'Lab Result Detail',
    subtext: 'Blood Panel Oct 12',
    date: 'Oct 24, 2023',
    status: 'APPROVED'
  },
  {
    id: '#REQ-9014',
    field: 'Home Address',
    subtext: 'Insurance Update',
    date: 'Oct 28, 2023',
    status: 'PENDING'
  },
  {
    id: '#REQ-9102',
    field: 'Birth Date',
    subtext: 'Demographics',
    date: 'Nov 02, 2023',
    status: 'PENDING'
  }
];

export const correctionDocumentOptions = [
  'Cardiology Report',
  'Chest X-ray',
  'Lab Work - Panel',
  'Discharge Summary',
  'Demographics / Personal Info',
  'Insurance / Billing Information',
  'Other Document'
];
