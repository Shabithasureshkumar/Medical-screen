import {
  OverallHealthTrend,
  RecordsSummary,
  InsightCardData,
  ConnectionStep,
  RiskCategory,
  AiRecommendationItem
} from '../types/ai-insight';

export const initialHealthTrend: OverallHealthTrend = {
  percentage: '+12%',
  label: 'Stable Improvement',
  bars: [
    { height: 18, opacity: 0.35 },
    { height: 26, opacity: 0.5 },
    { height: 34, opacity: 0.7 },
    { height: 44, opacity: 0.85 },
    { height: 54, opacity: 0.95 },
    { height: 64, opacity: 1.0 }
  ]
};

export const initialRecordsSummary: RecordsSummary = {
  totalAnalyzed: 24,
  labs: 8,
  prescriptions: 5,
  vitals: 9,
  consultations: 2
};

export const initialInsightCards: InsightCardData[] = [
  {
    id: 'card-1',
    type: 'blood-pressure',
    title: 'Blood Pressure',
    statusBadge: {
      label: 'Improved',
      variant: 'improved'
    },
    previousValue: '124/82',
    primaryValue: '118/78'
  },
  {
    id: 'card-2',
    type: 'lab-alert',
    title: 'Lab Result Alert',
    statusBadge: {
      label: 'Attention',
      variant: 'attention'
    },
    primaryValue: 'LDL 142 mg/dL',
    targetSubtext: 'Above target range (<100)'
  },
  {
    id: 'card-3',
    type: 'adherence',
    title: 'Adherence',
    statusBadge: {
      label: 'On Track',
      variant: 'on-track'
    },
    primaryValue: '95%',
    highlightText: 'Consistency'
  },
  {
    id: 'card-4',
    type: 'imaging',
    title: 'Imaging',
    statusBadge: {
      label: 'Reviewed',
      variant: 'reviewed'
    },
    primaryValue: 'No changes in MRI',
    dateSubtext: 'Last: Oct 12, 2024'
  }
];

export const connectionSteps: ConnectionStep[] = [
  {
    id: 'conn-1',
    label: 'Medication',
    iconType: 'medication'
  },
  {
    id: 'conn-2',
    label: 'Lab Test',
    iconType: 'lab'
  },
  {
    id: 'conn-3',
    label: 'Consultation',
    iconType: 'consultation'
  },
  {
    id: 'conn-4',
    label: 'Goal Met',
    iconType: 'goal',
    isFinal: true
  }
];

export const riskCategories: RiskCategory[] = [
  {
    id: 'risk-1',
    title: 'Heart Health',
    level: 'Low Risk',
    variant: 'low'
  },
  {
    id: 'risk-2',
    title: 'Diabetes',
    level: 'Low Risk',
    variant: 'low'
  },
  {
    id: 'risk-3',
    title: 'Cholesterol',
    level: 'Moderate',
    variant: 'moderate'
  },
  {
    id: 'risk-4',
    title: 'Kidney',
    level: 'Low Risk',
    variant: 'low'
  }
];

export const initialRecommendations: AiRecommendationItem[] = [
  {
    id: 'rec-1',
    text: 'Continue monitoring blood pressure weekly.',
    checked: false
  },
  {
    id: 'rec-2',
    text: 'Maintain medication adherence strictly.',
    checked: false
  },
  {
    id: 'rec-3',
    text: 'Schedule follow-up consultation within 30 days.',
    checked: false
  }
];
