export interface BloodMetric {
  id: string;
  name: string;
  value: string;
  unit: string;
  statusBadge: string;
  statusType: 'optimal' | 'healthy' | 'near-limit' | 'warning';
  trendText: string;
  trendDirection?: 'up' | 'down' | 'stable';
  trendColor?: string;
}

export interface AiLabInsight {
  id: string;
  category: string;
  title: string;
  status: string;
  statusType: 'good' | 'strong' | 'elevated';
  iconType: 'heart' | 'immunity' | 'metabolism';
}

export interface HistoricalTestRecord {
  id: string;
  name: string;
  dateOrExpected: string;
  status?: string;
  statusType?: 'completed' | 'abnormal' | 'pending';
  category: 'labs' | 'imaging';
  group: 'pending' | 'june2026' | 'may2026' | 'april2026';
}

export interface MarkerBreakdownRow {
  id: string;
  marker: string;
  result: string;
  refRange: string;
  flag: 'Borderline' | 'High' | 'Normal';
  isHighlighted?: boolean;
}

export interface ImagingCardData {
  id: string;
  category: string;
  categoryColor: string;
  title: string;
  modality?: string;
  bodyPart?: string;
  date?: string;
  facility?: string;
  provider?: string;
  status?: string;
  description: string;
  badge: string;
  badgeBg: string;
  badgeColor: string;
  imageSrc: string;
  detailImageSrc?: string;
  ctaText: string;
  ctaColor: string;
  findings?: string;
  impression?: string;
  aiPlainLanguageSummary?: string;
  comparison?: {
    studyDate: string;
    note: string;
  };
  hasAiAnnotations?: boolean;
  annotation?: {
    label: string;
    box: {
      xPercent: number;
      yPercent: number;
      widthPercent: number;
      heightPercent: number;
    };
  };
}

export interface RoutineMeasurementItem {
  id: string;
  parameter: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: 'Normal' | 'Abnormal' | 'Borderline';
}

export interface SignalStudyData {
  id: string;
  title: string;
  subtitle: string;
  doctorDate: string;
  date?: string;
  facility?: string;
  provider?: string;
  recordingInfo?: string;
  badgeType?: string;
  statusBadge: string;
  statusColor: string;
  statusDotColor: string;
  waveformType: 'ecg' | 'holter' | 'spirometry';
  aiSummary?: string;
  aiSummaryDisclaimer?: string;
  hasAiAnnotations?: boolean;
  pvcAnnotation?: {
    label: string;
    description: string;
    count: number;
    peakTime: string;
  };
  routineMeasurements?: RoutineMeasurementItem[];
}

export const bloodMetricsData: BloodMetric[] = [
  {
    id: 'glucose',
    name: 'Glucose',
    value: '92',
    unit: 'mg/dL',
    statusBadge: 'OPTIMAL RANGE',
    statusType: 'optimal',
    trendText: 'Stable',
    trendDirection: 'stable',
    trendColor: '#10B981'
  },
  {
    id: 'wbc',
    name: 'WBC (Leukocytes)',
    value: '7.4',
    unit: 'k/uL',
    statusBadge: 'HEALTHY',
    statusType: 'healthy',
    trendText: '+2.1%',
    trendDirection: 'up',
    trendColor: '#6B38D4'
  },
  {
    id: 'hemoglobin',
    name: 'Hemoglobin',
    value: '13.8',
    unit: 'g/dL',
    statusBadge: 'NEAR LIMIT',
    statusType: 'near-limit',
    trendText: 'Constant',
    trendDirection: 'stable',
    trendColor: '#484555'
  },
  {
    id: 'platelets',
    name: 'Platelets',
    value: '245',
    unit: 'k/uL',
    statusBadge: 'OPTIMAL',
    statusType: 'optimal',
    trendText: '-0.8%',
    trendDirection: 'down',
    trendColor: '#10B981'
  }
];

export const aiLabInsightsData: AiLabInsight[] = [
  {
    id: 'heart-health',
    category: 'Heart Health',
    title: 'LDL elevated (135 mg/dL)',
    status: 'ELEVATED',
    statusType: 'elevated',
    iconType: 'heart'
  },
  {
    id: 'immunity',
    category: 'Immunity',
    title: 'T-Cell count optimal',
    status: 'STRONG',
    statusType: 'strong',
    iconType: 'immunity'
  },
  {
    id: 'metabolism',
    category: 'Metabolism',
    title: 'Fasting glucose 92 mg/dL',
    status: 'GOOD',
    statusType: 'good',
    iconType: 'metabolism'
  }
];

export const historicalRecordsData: HistoricalTestRecord[] = [
  {
    id: 'hist-1',
    name: 'CBC with Differential',
    dateOrExpected: 'Expected June 30, 2026',
    category: 'labs',
    group: 'pending'
  },
  {
    id: 'hist-img-1',
    name: 'Chest X-Ray (PA & Lateral)',
    dateOrExpected: 'June 22, 2026',
    status: 'Completed',
    statusType: 'completed',
    category: 'imaging',
    group: 'june2026'
  },
  {
    id: 'hist-2',
    name: 'Lipid Panel',
    dateOrExpected: 'June 15, 2026',
    status: 'Abnormal',
    statusType: 'abnormal',
    category: 'labs',
    group: 'june2026'
  },
  {
    id: 'hist-img-2',
    name: 'Brain MRI (3D Volumetric)',
    dateOrExpected: 'May 19, 2026',
    status: 'Completed',
    statusType: 'completed',
    category: 'imaging',
    group: 'may2026'
  },
  {
    id: 'hist-3',
    name: 'Comprehensive Metabolic',
    dateOrExpected: 'May 12, 2026',
    status: 'Completed',
    statusType: 'completed',
    category: 'labs',
    group: 'may2026'
  },
  {
    id: 'hist-img-3',
    name: 'Abdominal Ultrasound',
    dateOrExpected: 'April 30, 2026',
    status: 'Completed',
    statusType: 'completed',
    category: 'imaging',
    group: 'april2026'
  },
  {
    id: 'hist-4',
    name: 'Hemoglobin A1c',
    dateOrExpected: 'April 16, 2026',
    status: 'Abnormal',
    statusType: 'abnormal',
    category: 'labs',
    group: 'april2026'
  }
];

export const markerBreakdownData: MarkerBreakdownRow[] = [
  {
    id: 'mb-0',
    marker: 'Serum Potassium (K+)',
    result: '6.1 mEq/L',
    refRange: '3.5–5.1',
    flag: 'High',
    isHighlighted: true
  },
  {
    id: 'mb-1',
    marker: 'Total Cholesterol',
    result: '210 mg/dL',
    refRange: '125–200',
    flag: 'Borderline',
    isHighlighted: true
  },
  {
    id: 'mb-2',
    marker: 'LDL Cholesterol',
    result: '135 mg/dL',
    refRange: '< 100',
    flag: 'High',
    isHighlighted: true
  },
  {
    id: 'mb-3',
    marker: 'HDL Cholesterol',
    result: '55 mg/dL',
    refRange: '> 40',
    flag: 'Normal'
  },
  {
    id: 'mb-4',
    marker: 'Triglycerides',
    result: '145 mg/dL',
    refRange: '< 150',
    flag: 'Normal'
  },
  {
    id: 'mb-5',
    marker: 'Non-HDL Cholesterol',
    result: '155 mg/dL',
    refRange: '< 130',
    flag: 'Borderline',
    isHighlighted: true
  },
  {
    id: 'mb-6',
    marker: 'VLDL Cholesterol',
    result: '29 mg/dL',
    refRange: '5–30',
    flag: 'Normal'
  },
  {
    id: 'mb-7',
    marker: 'Fasting Glucose',
    result: '92 mg/dL',
    refRange: '70–99',
    flag: 'Normal'
  },
  {
    id: 'mb-8',
    marker: 'Hemoglobin A1c',
    result: '5.8 %',
    refRange: '< 5.7',
    flag: 'Borderline',
    isHighlighted: true
  },
  {
    id: 'mb-9',
    marker: 'Hemoglobin',
    result: '13.8 g/dL',
    refRange: '13.5–17.5',
    flag: 'Normal'
  },
  {
    id: 'mb-10',
    marker: 'Platelets',
    result: '245 k/uL',
    refRange: '150–450',
    flag: 'Normal'
  },
  {
    id: 'mb-11',
    marker: 'WBC (Leukocytes)',
    result: '7.4 k/uL',
    refRange: '4.5–11.0',
    flag: 'Normal'
  }
];

export const imagingCardsData: ImagingCardData[] = [
  {
    id: 'img-1',
    category: 'RADIOLOGY',
    categoryColor: '#7A7582',
    title: 'Chest X-Ray',
    modality: 'X-Ray',
    bodyPart: 'Chest',
    date: 'June 22, 2026',
    facility: 'HealthBridge Diagnostics',
    provider: 'Dr. Sarah Lin, MD',
    status: 'Completed',
    description: 'Lungs clear. No signs of infection or cardiomegaly.',
    badge: 'CLEAR',
    badgeBg: 'hsla(160, 84%, 39%, 0.90)',
    badgeColor: '#FFFFFF',
    imageSrc: '/assets/imaging/chest-xray.png',
    detailImageSrc: '/assets/imaging/chest-xray.png',
    ctaText: 'Full Report →',
    ctaColor: '#4F8CFF',
    findings: 'Lungs are clear bilaterally without focal consolidation, pneumothorax, or pleural effusion. Cardiomediastinal silhouette and hilar contours are within normal limits. Osseous structures and thoracic soft tissues are unremarkable.',
    impression: 'Normal single-view chest radiograph. No acute cardiopulmonary disease identified.',
    aiPlainLanguageSummary: 'Your chest X-ray shows that your lungs and heart are clear and healthy with no signs of pneumonia, fluid buildup, or abnormal heart enlargement.',
    comparison: {
      studyDate: 'December 10, 2025',
      note: 'Stable clear lung fields with no interval changes compared to previous radiograph.'
    },
    hasAiAnnotations: false
  },
  {
    id: 'img-2',
    category: 'NEURO-IMAGING',
    categoryColor: '#7B61FF',
    title: 'Brain MRI (3D)',
    modality: 'MRI',
    bodyPart: 'Brain',
    date: 'May 19, 2026',
    facility: 'HealthBridge Neuro-Imaging',
    provider: 'Dr. Robert Vance, MD',
    status: 'Completed',
    description: 'Neural density improved by 2% in the prefrontal cortex.',
    badge: 'NEURAL OPTIMAL',
    badgeBg: 'hsla(250, 100%, 69%, 0.90)',
    badgeColor: '#FFFFFF',
    imageSrc: '/assets/imaging/brain-mri.png',
    detailImageSrc: '/assets/imaging/brain-mri.png',
    ctaText: 'Interactive 3D View →',
    ctaColor: '#7B61FF',
    findings: 'Brain parenchyma demonstrates normal signal intensity and morphology. No evidence of acute ischemia, intracranial hemorrhage, or abnormal mass effect. Ventricles and basal cisterns are symmetric and within normal limits for age. Gray-white matter differentiation is preserved.',
    impression: 'Unremarkable 3D volumetric brain MRI. Stable intracranial anatomy without acute intracranial abnormality.',
    aiPlainLanguageSummary: 'Your 3D brain MRI indicates healthy brain tissue with normal circulation and no evidence of stroke, vascular lesions, or swelling. Prefrontal cortical markers show healthy retention.',
    comparison: {
      studyDate: 'October 15, 2024',
      note: 'Neural volume and hippocampal architecture stable with no interval change.'
    },
    hasAiAnnotations: false
  },
  {
    id: 'img-3',
    category: 'SONOGRAPHY',
    categoryColor: '#7A7582',
    title: 'Abdominal Ultrasound',
    modality: 'Ultrasound',
    bodyPart: 'Abdomen',
    date: 'April 30, 2026',
    facility: 'HealthBridge Diagnostics',
    provider: 'Dr. Sarah Lin, MD',
    status: 'Completed',
    description: 'All visceral organs appear healthy and well-defined.',
    badge: 'STABLE',
    badgeBg: 'hsla(217, 91%, 60%, 0.90)',
    badgeColor: '#FFFFFF',
    imageSrc: '/assets/imaging/abdominal-ultrasound.png',
    detailImageSrc: '/assets/imaging/abdominal-scan-clean.png',
    ctaText: 'Full Report →',
    ctaColor: '#4F8CFF',
    findings: 'Liver is normal in size and echogenicity. No focal hepatic lesions. Gallbladder is unremarkable with no evidence of cholelithiasis. Common bile duct measures 4 mm (normal). Spleen is normal in size. Kidneys are symmetric and within normal limits. No free fluid.',
    impression: 'Normal abdominal ultrasound. No acute pathology identified.',
    aiPlainLanguageSummary: 'Your ultrasound shows that your liver, gallbladder, kidneys, and spleen look healthy with no signs of acute issues. A small 8mm nodule was observed, which remains unchanged from prior imaging and requires routine follow-up only.',
    comparison: {
      studyDate: 'March 14, 2025',
      note: 'Nodule size unchanged compared with March 2025.'
    },
    hasAiAnnotations: true,
    annotation: {
      label: 'Possible nodule – 8mm',
      box: {
        xPercent: 53.5,
        yPercent: 37.4,
        widthPercent: 36.4,
        heightPercent: 20.7
      }
    }
  }
];

export const signalStudiesData: SignalStudyData[] = [
  {
    id: 'sig-1',
    title: '12-Lead ECG',
    subtitle: '72 bpm — Normal sinus rhythm',
    doctorDate: 'June 18, 2026 · Dr. Sarah Chen',
    date: 'June 18, 2026',
    facility: 'HealthBridge Cardiology',
    provider: 'Dr. Sarah Chen',
    recordingInfo: '72 bpm — 12-Lead rhythm strip',
    badgeType: 'ECG',
    statusBadge: 'Abnormal',
    statusColor: '#B45309',
    statusDotColor: '#F59E0B',
    waveformType: 'ecg',
    aiSummary: 'Standard 12-lead ECG demonstrates sinus rhythm at 72 bpm with non-specific ST-T wave changes in inferior leads II, III, and aVF. No acute ST elevations or signs of active ischemia.',
    aiSummaryDisclaimer: 'This summary is AI-generated for informational purposes only. Not a medical diagnosis.',
    hasAiAnnotations: false,
    routineMeasurements: [
      { id: 'm-1', parameter: 'Ventricular Rate', value: '72', unit: 'bpm', referenceRange: '60–100', status: 'Normal' },
      { id: 'm-2', parameter: 'PR Interval', value: '162', unit: 'ms', referenceRange: '120–200', status: 'Normal' },
      { id: 'm-3', parameter: 'QRS Duration', value: '88', unit: 'ms', referenceRange: '60–100', status: 'Normal' },
      { id: 'm-4', parameter: 'QTc (Bazett)', value: '418', unit: 'ms', referenceRange: '< 440', status: 'Normal' },
      { id: 'm-5', parameter: 'P-R-T Axes', value: '54 48 32', unit: 'deg', referenceRange: '0–90', status: 'Normal' },
      { id: 'm-6', parameter: 'ST Elevation/Depression', value: '0.04', unit: 'mV', referenceRange: '< 0.10', status: 'Normal' },
      { id: 'm-7', parameter: 'T Wave Morphology', value: 'Borderline flat', unit: 'leads', referenceRange: 'Upright', status: 'Abnormal' }
    ]
  },
  {
    id: 'sig-2',
    title: 'Holter Monitor (24h)',
    subtitle: '68 bpm avg — 24h recording',
    doctorDate: 'May 28, 2026 · Dr. James Patel',
    date: 'May 28, 2026',
    facility: 'HealthBridge Cardiology',
    provider: 'Dr. James Patel',
    recordingInfo: '68 bpm avg — 24h recording',
    badgeType: 'Holter',
    statusBadge: 'Completed',
    statusColor: '#15803D',
    statusDotColor: '#22C55E',
    waveformType: 'holter',
    aiSummary: '24-hour Holter monitoring shows predominantly sinus rhythm. Total of 14 isolated PVCs identified over 24 hours — within normal limits. No sustained arrhythmias. Average heart rate 68 bpm.',
    aiSummaryDisclaimer: 'This summary is AI-generated for informational purposes only. Not a medical diagnosis.',
    hasAiAnnotations: true,
    pvcAnnotation: {
      label: 'Isolated PVC',
      description: 'Premature ventricular contraction — ectopic heartbeat originating in the ventricles, isolated and non-sustained.',
      count: 14,
      peakTime: '7.8s'
    },
    routineMeasurements: [
      { id: 'rm-1', parameter: 'Avg Heart Rate', value: '68', unit: 'bpm', referenceRange: '60–100', status: 'Normal' },
      { id: 'rm-2', parameter: 'Min Heart Rate', value: '52', unit: 'bpm', referenceRange: '> 40', status: 'Normal' },
      { id: 'rm-3', parameter: 'Max Heart Rate', value: '118', unit: 'bpm', referenceRange: '< 180', status: 'Normal' },
      { id: 'rm-4', parameter: 'PVC Count (24h)', value: '14', unit: 'events', referenceRange: '< 200', status: 'Normal' },
      { id: 'rm-5', parameter: 'PAC Count (24h)', value: '3', unit: 'events', referenceRange: '< 100', status: 'Normal' },
      { id: 'rm-6', parameter: 'Longest Pause', value: '1.2', unit: 's', referenceRange: '< 2.0', status: 'Normal' },
      { id: 'rm-7', parameter: 'QTc (avg)', value: '428', unit: 'ms', referenceRange: '< 450', status: 'Normal' }
    ]
  },
  {
    id: 'sig-3',
    title: 'Spirometry',
    subtitle: 'Flow-Volume Loop',
    doctorDate: 'April 22, 2026 · Dr. Michael Ross',
    date: 'April 22, 2026',
    facility: 'HealthBridge Pulmonology',
    provider: 'Dr. Michael Ross',
    recordingInfo: 'Flow-Volume Loop — 3 acceptable maneuvers',
    badgeType: 'Spirometry',
    statusBadge: 'Completed',
    statusColor: '#15803D',
    statusDotColor: '#22C55E',
    waveformType: 'spirometry',
    aiSummary: 'Flow-volume loop maneuvers demonstrate normal ventilatory function with forced expiratory volume in 1 second (FEV1) and forced vital capacity (FVC) both > 95% of predicted. FEV1/FVC ratio is 81%, confirming absence of obstructive defect.',
    aiSummaryDisclaimer: 'This summary is AI-generated for informational purposes only. Not a medical diagnosis.',
    hasAiAnnotations: false,
    routineMeasurements: [
      { id: 'sm-1', parameter: 'FVC', value: '4.20', unit: 'L', referenceRange: '> 3.80', status: 'Normal' },
      { id: 'sm-2', parameter: 'FEV1', value: '3.42', unit: 'L', referenceRange: '> 3.10', status: 'Normal' },
      { id: 'sm-3', parameter: 'FEV1/FVC Ratio', value: '81', unit: '%', referenceRange: '> 70', status: 'Normal' },
      { id: 'sm-4', parameter: 'FEF 25–75%', value: '3.65', unit: 'L/s', referenceRange: '> 2.80', status: 'Normal' },
      { id: 'sm-5', parameter: 'PEF', value: '8.90', unit: 'L/s', referenceRange: '> 7.50', status: 'Normal' },
      { id: 'sm-6', parameter: 'FVC % Predicted', value: '98', unit: '%', referenceRange: '> 80', status: 'Normal' },
      { id: 'sm-7', parameter: 'FEV1 % Predicted', value: '96', unit: '%', referenceRange: '> 80', status: 'Normal' }
    ]
  }
];

export const latestReportsData = [
  {
    id: 'rep-1',
    title: 'Lipid Panel',
    date: 'Oct 12, 2023',
    iconColor: 'hsla(255, 100%, 57%, 0.10)',
  },
  {
    id: 'rep-2',
    title: 'Vitamin D Level',
    date: 'Sep 28, 2023',
    iconColor: 'hsla(255, 100%, 57%, 0.10)',
  },
  {
    id: 'rep-3',
    title: 'Thyroid (TSH)',
    date: 'Sep 15, 2023',
    iconColor: 'hsla(255, 100%, 57%, 0.10)',
  }
];
