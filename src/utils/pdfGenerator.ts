import { OverallHealthTrend, RecordsSummary, InsightCardData, RiskCategory, AiRecommendationItem } from '../types/ai-insight';
import { PatientProfile } from '../types/medical';

export interface SummaryReportData {
  patient: PatientProfile;
  trend: OverallHealthTrend;
  records: RecordsSummary;
  insights: InsightCardData[];
  risks: RiskCategory[];
  recommendations: AiRecommendationItem[];
}

export function generateSummaryPdf(data: SummaryReportData): void {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to download the summary report.');
    return;
  }

  const recommendationsHtml = data.recommendations
    .map(
      (rec) => `
      <li style="margin-bottom: 8px; color: ${rec.checked ? '#059669' : '#1E293B'};">
        <span>${rec.checked ? '☑' : '☐'}</span> ${rec.text}
      </li>
    `
    )
    .join('');

  const insightsHtml = data.insights
    .map(
      (ins) => `
      <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px; margin-bottom: 10px; background: #F8FAFC;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <strong style="color: #0F172A; font-size: 14px;">${ins.title}</strong>
          <span style="font-size: 11px; padding: 2px 8px; border-radius: 9999px; background: #EEF2FF; color: #4F46E5; font-weight: 600;">
            ${ins.statusBadge.label}
          </span>
        </div>
        <div style="font-size: 16px; font-weight: bold; color: #1E293B;">
          ${ins.previousValue ? `<span style="text-decoration: line-through; color: #64748B; font-weight: normal; margin-right: 8px;">${ins.previousValue}</span> → ` : ''}
          ${ins.primaryValue || ''}
          ${ins.highlightText ? `<span style="font-size: 13px; font-weight: normal; color: #64748B; margin-left: 4px;">${ins.highlightText}</span>` : ''}
        </div>
        ${ins.targetSubtext ? `<div style="font-size: 12px; color: #64748B; margin-top: 2px;">${ins.targetSubtext}</div>` : ''}
        ${ins.dateSubtext ? `<div style="font-size: 12px; color: #64748B; margin-top: 2px;">${ins.dateSubtext}</div>` : ''}
      </div>
    `
    )
    .join('');

  const risksHtml = data.risks
    .map(
      (risk) => `
      <div style="border: 1px solid #E2E8F0; border-radius: 6px; padding: 10px; text-align: center; flex: 1; background: #FFFFFF;">
        <div style="font-size: 11px; color: #64748B; text-transform: uppercase; font-weight: 600;">${risk.title}</div>
        <div style="font-size: 14px; font-weight: bold; color: ${risk.variant === 'moderate' ? '#6366F1' : '#0F172A'}; margin-top: 4px;">
          ${risk.level}
        </div>
      </div>
    `
    )
    .join('');

  const reportHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>AI Health Insight Summary - ${data.patient.name}</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 32px; color: #1E293B; max-width: 800px; margin: 0 auto; }
          .header { border-bottom: 2px solid #E2E8F0; padding-bottom: 16px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-start; }
          .badge { background: #EEF2FF; color: #4F46E5; padding: 4px 10px; border-radius: 12px; font-weight: 600; font-size: 12px; display: inline-block; }
          .section { margin-bottom: 24px; }
          .section-title { font-size: 14px; font-weight: 700; text-transform: uppercase; color: #64748B; letter-spacing: 0.5px; margin-bottom: 8px; }
          .stats-grid { display: flex; gap: 12px; margin-bottom: 16px; }
          .disclaimer { border-left: 4px solid #818CF8; background: #EEF2FF; padding: 12px 16px; font-size: 12px; font-style: italic; color: #475569; border-radius: 4px; margin-top: 24px; }
          @media print {
            body { padding: 16px; }
            button { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="badge">MEDNEVO AI CLINICAL SUMMARY</div>
            <h1 style="margin: 8px 0 4px; font-size: 24px; color: #0F172A;">AI Health Insight Summary</h1>
            <p style="margin: 0; color: #64748B; font-size: 13px;">Generated on ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • Patient ID: ${data.patient.id}</p>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 18px; font-weight: bold; color: #0F172A;">${data.patient.name}</div>
            <div style="font-size: 12px; color: #64748B;">${data.patient.age} • ${data.patient.gender} • ${data.patient.bloodGroup}</div>
          </div>
        </div>

        <div class="section" style="background: #FAF5FF; border: 1px solid #E9D5FF; border-radius: 8px; padding: 16px;">
          <div class="section-title" style="color: #7E22CE;">Overall Health Trend</div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <span style="font-size: 28px; font-weight: 800; color: #6B21A8;">${data.trend.percentage}</span>
              <span style="font-size: 16px; font-weight: 600; color: #0F172A; margin-left: 8px;">${data.trend.label}</span>
            </div>
            <div style="font-size: 13px; color: #6B21A8; font-weight: 600;">
              ${data.records.totalAnalyzed} Records Analyzed (${data.records.labs} Labs, ${data.records.prescriptions} Prescriptions, ${data.records.vitals} Vitals, ${data.records.consultations} Consults)
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Key Health Findings</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            ${insightsHtml}
          </div>
        </div>

        <div class="section">
          <div class="section-title">Risk Monitoring Overview</div>
          <div class="stats-grid">
            ${risksHtml}
          </div>
        </div>

        <div class="section">
          <div class="section-title">Actionable AI Recommendations</div>
          <ul style="padding-left: 20px; margin: 0; list-style-type: none;">
            ${recommendationsHtml}
          </ul>
        </div>

        <div class="disclaimer">
          This AI summary is for informational purposes only. It is generated based on digital records and should be reviewed with your primary healthcare provider.
        </div>

        <script>
          window.onload = function() {
            setTimeout(() => {
              window.print();
            }, 300);
          };
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(reportHtml);
  printWindow.document.close();
}
