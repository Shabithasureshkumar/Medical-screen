import { OverallHealthTrend, RecordsSummary, InsightCardData, RiskCategory, AiRecommendationItem } from '../types/ai-insight';
import { PatientProfile } from '../types/medical';

export function escapeHtml(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

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
  printWindow.opener = null;

  const recommendationsHtml = data.recommendations
    .map(
      (rec) => `
      <li style="margin-bottom: 8px; color: ${rec.checked ? '#059669' : '#1E293B'};">
        <span>${rec.checked ? '☑' : '☐'}</span> ${escapeHtml(rec.text)}
      </li>
    `
    )
    .join('');

  const insightsHtml = data.insights
    .map(
      (ins) => `
      <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px; margin-bottom: 10px; background: #F8FAFC;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <strong style="color: #0F172A; font-size: 14px;">${escapeHtml(ins.title)}</strong>
          <span style="font-size: 11px; padding: 2px 8px; border-radius: 9999px; background: #EEF2FF; color: #4F46E5; font-weight: 600;">
            ${escapeHtml(ins.statusBadge.label)}
          </span>
        </div>
        <div style="font-size: 16px; font-weight: bold; color: #1E293B;">
          ${ins.previousValue ? `<span style="text-decoration: line-through; color: #64748B; font-weight: normal; margin-right: 8px;">${escapeHtml(ins.previousValue)}</span> → ` : ''}
          ${escapeHtml(ins.primaryValue || '')}
          ${ins.highlightText ? `<span style="font-size: 13px; font-weight: normal; color: #64748B; margin-left: 4px;">${escapeHtml(ins.highlightText)}</span>` : ''}
        </div>
        ${ins.targetSubtext ? `<div style="font-size: 12px; color: #64748B; margin-top: 2px;">${escapeHtml(ins.targetSubtext)}</div>` : ''}
        ${ins.dateSubtext ? `<div style="font-size: 12px; color: #64748B; margin-top: 2px;">${escapeHtml(ins.dateSubtext)}</div>` : ''}
      </div>
    `
    )
    .join('');

  const risksHtml = data.risks
    .map(
      (risk) => `
      <div style="border: 1px solid #E2E8F0; border-radius: 6px; padding: 10px; text-align: center; flex: 1; background: #FFFFFF;">
        <div style="font-size: 11px; color: #64748B; text-transform: uppercase; font-weight: 600;">${escapeHtml(risk.title)}</div>
        <div style="font-size: 14px; font-weight: bold; color: ${risk.variant === 'moderate' ? '#6366F1' : '#0F172A'}; margin-top: 4px;">
          ${escapeHtml(risk.level)}
        </div>
      </div>
    `
    )
    .join('');

  const reportHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>AI Health Insight Summary - ${escapeHtml(data.patient.name)}</title>
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
            <p style="margin: 0; color: #64748B; font-size: 13px;">Generated on ${escapeHtml(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }))} • Patient ID: ${escapeHtml(data.patient.id)}</p>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 18px; font-weight: bold; color: #0F172A;">${escapeHtml(data.patient.name)}</div>
            <div style="font-size: 12px; color: #64748B;">${escapeHtml(data.patient.age)} • ${escapeHtml(data.patient.gender)} • ${escapeHtml(data.patient.bloodGroup)}</div>
          </div>
        </div>

        <div class="section" style="background: #FAF5FF; border: 1px solid #E9D5FF; border-radius: 8px; padding: 16px;">
          <div class="section-title" style="color: #7E22CE;">Overall Health Trend</div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <span style="font-size: 28px; font-weight: 800; color: #6B21A8;">${escapeHtml(data.trend.percentage)}</span>
              <span style="font-size: 16px; font-weight: 600; color: #0F172A; margin-left: 8px;">${escapeHtml(data.trend.label)}</span>
            </div>
            <div style="font-size: 13px; color: #6B21A8; font-weight: 600;">
              ${escapeHtml(data.records.totalAnalyzed)} Records Analyzed (${escapeHtml(data.records.labs)} Labs, ${escapeHtml(data.records.prescriptions)} Prescriptions, ${escapeHtml(data.records.vitals)} Vitals, ${escapeHtml(data.records.consultations)} Consults)
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

export function generatePrescriptionPdf(prescription: {
  condition: string;
  issueDate: string;
  expiryDate: string;
  doctor: { name: string; specialty: string; facility: string };
  diagnosisSummary: string;
  instructions: string;
  medicines: Array<{ name: string; formulation: string; dosage: string; duration: string; frequencyDesktop: string }>;
  pharmacy: { nameDesktop: string; address: string; phone: string };
}): void {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to download the prescription document.');
    return;
  }
  printWindow.opener = null;

  const medicinesRows = prescription.medicines
    .map(
      (med) => `
      <tr style="border-bottom: 1px solid #E2E8F0;">
        <td style="padding: 12px 16px; font-weight: 600; color: #0F172A;">
          ${escapeHtml(med.name)}
          <div style="font-size: 11px; color: #64748B; font-weight: normal;">${escapeHtml(med.formulation)}</div>
        </td>
        <td style="padding: 12px 16px; color: #1E293B; font-weight: bold;">${escapeHtml(med.dosage)}</td>
        <td style="padding: 12px 16px; color: #475569;">${escapeHtml(med.duration)}</td>
        <td style="padding: 12px 16px; color: #5C24FF; font-weight: 600;">${escapeHtml(med.frequencyDesktop)}</td>
      </tr>
    `
    )
    .join('');

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Prescription - ${escapeHtml(prescription.condition)}</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #1E293B; max-width: 840px; margin: 0 auto; }
          .header { border-bottom: 2px solid #5C24FF; padding-bottom: 20px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-start; }
          .badge { background: #EEF2FF; color: #5C24FF; padding: 4px 12px; border-radius: 9999px; font-weight: bold; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
          .rx-symbol { font-size: 32px; font-weight: 900; color: #5C24FF; font-family: serif; margin-bottom: 8px; }
          .card { border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px; margin-bottom: 20px; background: #FAF8FE; }
          table { width: 100%; border-collapse: collapse; margin-top: 12px; }
          th { background: #F1F5F9; padding: 10px 16px; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #475569; }
          .footer { margin-top: 32px; border-top: 1px dashed #CBD5E1; padding-top: 20px; display: flex; justify-content: space-between; font-size: 12px; color: #64748B; }
          @media print { body { padding: 16px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="badge">CLINICAL PRESCRIPTION ORDER</div>
            <h1 style="margin: 8px 0 4px; font-size: 26px; color: #0F172A;">${escapeHtml(prescription.condition)}</h1>
            <p style="margin: 0; color: #64748B; font-size: 13px;">Issued: ${escapeHtml(prescription.issueDate)} • Valid Until: ${escapeHtml(prescription.expiryDate)}</p>
          </div>
          <div style="text-align: right;">
            <div class="rx-symbol">℞</div>
            <div style="font-size: 15px; font-weight: bold; color: #0F172A;">${escapeHtml(prescription.doctor.name)}</div>
            <div style="font-size: 12px; color: #64748B;">${escapeHtml(prescription.doctor.specialty)} • ${escapeHtml(prescription.doctor.facility)}</div>
          </div>
        </div>

        <div class="card">
          <div style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #7C3AED; margin-bottom: 4px;">DIAGNOSIS SUMMARY</div>
          <div style="font-size: 13px; color: #334155; line-height: 1.5;">${escapeHtml(prescription.diagnosisSummary)}</div>
        </div>

        <div style="margin-bottom: 24px;">
          <div style="font-size: 13px; font-weight: bold; text-transform: uppercase; color: #0F172A; letter-spacing: 0.5px; margin-bottom: 8px;">PRESCRIBED MEDICINES</div>
          <table>
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Dosage</th>
                <th>Duration</th>
                <th>Frequency</th>
              </tr>
            </thead>
            <tbody>
              ${medicinesRows}
            </tbody>
          </table>
        </div>

        <div class="card" style="background: #FFFBEB; border-color: #FDE68A;">
          <div style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #B45309; margin-bottom: 4px;">PATIENT INSTRUCTIONS</div>
          <div style="font-size: 13px; color: #78350F; line-height: 1.5;">${escapeHtml(prescription.instructions)}</div>
        </div>

        <div class="footer">
          <div>
            <strong>Fulfillment Pharmacy:</strong><br />
            ${escapeHtml(prescription.pharmacy.nameDesktop)}<br />
            ${escapeHtml(prescription.pharmacy.address)} • Tel: ${escapeHtml(prescription.pharmacy.phone)}
          </div>
          <div style="text-align: right;">
            <strong>Physician Signature:</strong><br />
            <span style="font-family: cursive; font-size: 18px; color: #5C24FF;">${escapeHtml(prescription.doctor.name)}</span><br />
            Electronically Signed • DEA Verified
          </div>
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

  printWindow.document.write(html);
  printWindow.document.close();
}

export interface AccessAuditPdfItem {
  timestamp: string;
  title: string;
  description: string;
  isVerified?: boolean;
  actor?: string;
  ip?: string;
  sessionDuration?: string;
  scopeBadge?: string;
  doctor?: {
    name: string;
    specialty: string;
    hospital: string;
  };
}

export function generateAccessAuditPdf(
  logs: AccessAuditPdfItem[],
  patientName: string = 'David Brock',
  patientId: string = '#4432-6TH',
  summaryCounts: { active: number; pending: number; rejected: number } = { active: 4, pending: 3, rejected: 3 }
): void {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to download the access audit log.');
    return;
  }
  printWindow.opener = null;

  const rows = logs
    .map(
      (log) => `
      <tr>
        <td style="font-family: monospace; font-size: 11px; white-space: nowrap; vertical-align: top; color: #64748B;">
          ${escapeHtml(log.timestamp)}
        </td>
        <td style="vertical-align: top;">
          <div style="font-weight: bold; color: #0F172A; font-size: 13px;">${escapeHtml(log.title)}</div>
          <div style="color: #475569; font-size: 12px; margin-top: 2px;">${escapeHtml(log.description)}</div>
          ${
            log.doctor
              ? `<div style="font-size: 11px; color: #6B21A8; background: #FAF5FF; padding: 4px 8px; border-radius: 4px; margin-top: 4px; display: inline-block;">
                  Provider: <strong>${escapeHtml(log.doctor.name)}</strong> (${escapeHtml(log.doctor.specialty)} • ${escapeHtml(log.doctor.hospital)})
                </div>`
              : ''
          }
        </td>
        <td style="vertical-align: top; font-size: 11px; color: #475569;">
          ${log.isVerified ? '<span style="background: #ECFDF5; color: #059669; padding: 2px 6px; border-radius: 4px; font-weight: 600;">VERIFIED</span><br/>' : ''}
          ${log.scopeBadge ? `<span style="background: #FEF3C7; color: #B45309; padding: 2px 6px; border-radius: 4px; font-weight: 600;">${escapeHtml(log.scopeBadge)}</span><br/>` : ''}
          ${log.ip ? `<span>IP: ${escapeHtml(log.ip)}</span><br/>` : ''}
          ${log.sessionDuration ? `<span>Duration: ${escapeHtml(log.sessionDuration)}</span>` : ''}
        </td>
      </tr>
    `
    )
    .join('');

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Access Audit Log - ${escapeHtml(patientName)}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 32px; color: #0F172A; max-width: 900px; margin: 0 auto; }
          .header { border-bottom: 2px solid #E2E8F0; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-start; }
          .badge { background: #F3E8FF; color: #6B21A8; padding: 4px 10px; border-radius: 6px; font-weight: 700; font-size: 11px; letter-spacing: 0.5px; display: inline-block; }
          .summary-bar { display: flex; gap: 16px; margin-bottom: 24px; background: #F8FAFC; padding: 16px; border-radius: 8px; border: 1px solid #E2E8F0; }
          .summary-item { flex: 1; text-align: center; }
          .summary-item .num { font-size: 24px; font-weight: bold; color: #0F172A; }
          .summary-item .label { font-size: 11px; font-weight: 600; text-transform: uppercase; color: #64748B; margin-top: 2px; }
          table { width: 100%; border-collapse: collapse; margin-top: 12px; }
          th { text-align: left; padding: 10px 12px; background: #F1F5F9; color: #475569; font-size: 11px; text-transform: uppercase; font-weight: 600; border-bottom: 1px solid #CBD5E1; }
          td { padding: 12px; border-bottom: 1px solid #E2E8F0; }
          .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #E2E8F0; font-size: 11px; color: #94A3B8; text-align: center; }
          @media print {
            body { padding: 16px; }
            button { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="badge">HEALTH VAULT SECURITY AUDIT</div>
            <h1 style="margin: 8px 0 4px; font-size: 24px; color: #0F172A;">Access History & Requests Audit Log</h1>
            <p style="margin: 0; color: #64748B; font-size: 12px;">Generated on ${escapeHtml(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }))} • Patient ID: ${escapeHtml(patientId)}</p>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 16px; font-weight: bold; color: #0F172A;">${escapeHtml(patientName)}</div>
            <div style="font-size: 12px; color: #64748B;">Audit Scope: All Permission Activities</div>
          </div>
        </div>

        <div class="summary-bar">
          <div class="summary-item">
            <div class="num">${escapeHtml(summaryCounts.active)}</div>
            <div class="label">Active Access Grants</div>
          </div>
          <div class="summary-item">
            <div class="num">${escapeHtml(summaryCounts.pending)}</div>
            <div class="label">Pending Review</div>
          </div>
          <div class="summary-item">
            <div class="num">${escapeHtml(summaryCounts.rejected)}</div>
            <div class="label">Rejected Requests</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th style="width: 140px;">Timestamp</th>
              <th>Activity & Details</th>
              <th style="width: 180px;">Metadata</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>

        <div class="footer">
          Confidential Medical Record Audit Log • Compliant with HIPAA & Clinical Data Access Standards • MedNevo Health Vault System
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

  printWindow.document.write(html);
  printWindow.document.close();
}

export function generateLabTestsPdf(
  tests: Array<{
    title: string;
    badgeLabel: string;
    doctor: string;
    facility: string;
    date: string;
    summary: string;
  }>,
  patientName: string = 'David Brock',
  patientId: string = '#4432-6TH'
): void {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to download the laboratory results report.');
    return;
  }
  printWindow.opener = null;

  const rows = tests
    .map(
      (t) => `
      <tr>
        <td style="font-weight: 700; color: #0F172A; font-size: 13px;">${escapeHtml(t.title)}</td>
        <td style="font-size: 11px; font-weight: 700; color: #6D28D9;">${escapeHtml(t.badgeLabel)}</td>
        <td style="font-size: 12px; color: #475569;">${escapeHtml(t.doctor)} • ${escapeHtml(t.facility)}</td>
        <td style="font-size: 12px; color: #64748B; white-space: nowrap;">${escapeHtml(t.date)}</td>
        <td style="font-size: 12px; color: #334155;">${escapeHtml(t.summary)}</td>
      </tr>
    `
    )
    .join('');

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Laboratory Results Report - ${escapeHtml(patientName)}</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 32px; color: #0F172A; max-width: 900px; margin: 0 auto; }
          .header { border-bottom: 2px solid #E2E8F0; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-start; }
          .badge { background: #F3E8FF; color: #6B21A8; padding: 4px 10px; border-radius: 9999px; font-weight: 700; font-size: 11px; display: inline-block; }
          table { width: 100%; border-collapse: collapse; margin-top: 16px; }
          th { text-align: left; padding: 10px 12px; background: #F8FAFC; color: #475569; font-size: 11px; text-transform: uppercase; border-bottom: 1px solid #CBD5E1; }
          td { padding: 12px; border-bottom: 1px solid #E2E8F0; vertical-align: top; }
          .footer { margin-top: 28px; padding-top: 14px; border-top: 1px solid #E2E8F0; font-size: 11px; color: #94A3B8; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="badge">LABORATORY DIAGNOSTICS ARCHIVE</div>
            <h1 style="margin: 8px 0 4px; font-size: 24px;">Lab Tests Summary Report</h1>
            <p style="margin: 0; color: #64748B; font-size: 12px;">Patient ID: ${escapeHtml(patientId)} • Total Tests: ${escapeHtml(tests.length)}</p>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 16px; font-weight: bold;">${escapeHtml(patientName)}</div>
            <div style="font-size: 12px; color: #64748B;">Last Updated: May 26, 2026</div>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Test Name</th>
              <th>Status</th>
              <th>Provider & Lab</th>
              <th>Date</th>
              <th>Clinical Summary</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
        <div class="footer">
          Informational Patient Portal Export • HIPAA Encrypted Health Vault • Review all laboratory findings with your ordering physician.
        </div>
        <script>
          window.onload = function() {
            setTimeout(() => { window.print(); }, 300);
          };
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}

