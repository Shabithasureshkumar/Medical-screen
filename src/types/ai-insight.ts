export interface OverallHealthTrend {
  percentage: string;
  label: string;
  bars: { height: number; opacity: number }[];
}

export interface RecordsSummary {
  totalAnalyzed: number;
  labs: number;
  prescriptions: number;
  vitals: number;
  consultations: number;
}

export interface InsightCardData {
  id: string;
  type: 'blood-pressure' | 'lab-alert' | 'adherence' | 'imaging';
  title: string;
  statusBadge: {
    label: string;
    variant: 'improved' | 'attention' | 'on-track' | 'reviewed';
  };
  primaryValue?: string;
  previousValue?: string;
  targetSubtext?: string;
  highlightText?: string;
  dateSubtext?: string;
}

export interface ConnectionStep {
  id: string;
  label: string;
  iconType: 'medication' | 'lab' | 'consultation' | 'goal';
  isFinal?: boolean;
}

export interface RiskCategory {
  id: string;
  title: string;
  level: string;
  variant: 'low' | 'moderate' | 'high';
}

export interface AiRecommendationItem {
  id: string;
  text: string;
  checked: boolean;
}
