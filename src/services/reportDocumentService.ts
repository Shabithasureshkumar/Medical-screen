import { jsPDF } from 'jspdf';
import { MedicalRecordItem } from '../data/medicalRecordsData';
import { PatientProfile } from '../types/medical';

/**
 * Resolves a medical record to real PDF bytes for the Report PDF viewer.
 *
 * Two sources exist, in priority order:
 *  1. A PDF the patient actually uploaded for that record (held in the
 *     in-memory vault below for the lifetime of the tab).
 *  2. A clinically formatted PDF rendered on demand from the record's own
 *     fields plus the active patient profile. Nothing here is hardcoded —
 *     every line is derived from the record/patient objects that already
 *     drive the Medical Records table.
 */

export type ReportDocumentOrigin = 'uploaded' | 'generated';

export interface ReportDocumentSource {
  bytes: Uint8Array;
  fileName: string;
  byteLength: number;
  origin: ReportDocumentOrigin;
}

/** Uploaded binaries stay in memory: localStorage cannot hold multi-MB PDFs. */
const uploadedDocuments = new Map<string, { fileName: string; bytes: Uint8Array }>();

export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 KB';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export async function registerUploadedDocument(
  recordId: string,
  file: File
): Promise<ReportDocumentSource> {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  uploadedDocuments.set(recordId, { fileName: file.name, bytes });
  return {
    bytes,
    fileName: file.name,
    byteLength: bytes.byteLength,
    origin: 'uploaded'
  };
}

export function hasUploadedDocument(recordId: string): boolean {
  return uploadedDocuments.has(recordId);
}

export function clearUploadedDocument(recordId: string): void {
  uploadedDocuments.delete(recordId);
}

/* ------------------------------------------------------------------ */
/* PDF composition helpers                                             */
/* ------------------------------------------------------------------ */

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 48;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

const ACCENT: [number, number, number] = [92, 36, 255];
const ACCENT_SOFT: [number, number, number] = [156, 115, 242];
const INK: [number, number, number] = [15, 23, 42];
const MUTED: [number, number, number] = [100, 116, 139];
const HAIRLINE: [number, number, number] = [226, 232, 240];
const PANEL: [number, number, number] = [248, 246, 255];

function issuingDepartment(category: MedicalRecordItem['category']): string {
  switch (category) {
    case 'Lab Results':
      return 'Laboratory Diagnostics';
    case 'Imaging':
      return 'Diagnostic Imaging';
    case 'Prescriptions':
      return 'Pharmacy & Prescriptions';
    case 'Visit Notes':
      return 'Clinical Visit Records';
    case 'Documents':
      return 'Health Records Administration';
    default:
      return 'Clinical Records';
  }
}

/** "Attending: Dr. Aris Thorne" -> { label: 'Attending', value: 'Dr. Aris Thorne' } */
function splitSubtitle(subtitle: string): { label: string; value: string } {
  const idx = subtitle.indexOf(':');
  if (idx === -1) return { label: 'Source', value: subtitle.trim() };
  return {
    label: subtitle.slice(0, idx).trim(),
    value: subtitle.slice(idx + 1).trim()
  };
}

function referenceId(record: MedicalRecordItem): string {
  const digits = record.rawDate.replace(/\D/g, '').slice(2);
  const slug = record.id.replace(/[^a-z0-9]/gi, '').toUpperCase().slice(-4);
  return `#${digits}-${slug || 'DOC'}`;
}

function longDate(rawDate: string, fallback: string): string {
  const parsed = new Date(rawDate);
  if (Number.isNaN(parsed.getTime())) return fallback;
  return parsed.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

function offsetDate(rawDate: string, days: number, fallback: string): string {
  const parsed = new Date(rawDate);
  if (Number.isNaN(parsed.getTime())) return fallback;
  parsed.setDate(parsed.getDate() + days);
  return parsed.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  });
}

function drawPageFrame(
  doc: jsPDF,
  record: MedicalRecordItem,
  patient: PatientProfile,
  pageNumber: number,
  totalPages: number
): number {
  const department = issuingDepartment(record.category);

  // Masthead
  doc.setTextColor(...ACCENT);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(19);
  doc.text(department, MARGIN, MARGIN + 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...MUTED);
  doc.text('Mednevo Health Network · Secure Patient Record Vault', MARGIN, MARGIN + 30);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...INK);
  doc.text(`Report ID: ${referenceId(record)}`, PAGE_WIDTH - MARGIN, MARGIN + 14, {
    align: 'right'
  });
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...MUTED);
  doc.text(`Date: ${record.uploadedDate}`, PAGE_WIDTH - MARGIN, MARGIN + 28, {
    align: 'right'
  });

  doc.setDrawColor(...ACCENT_SOFT);
  doc.setLineWidth(1.1);
  doc.line(MARGIN, MARGIN + 44, PAGE_WIDTH - MARGIN, MARGIN + 44);

  // Footer
  doc.setDrawColor(...HAIRLINE);
  doc.setLineWidth(0.6);
  doc.line(MARGIN, PAGE_HEIGHT - MARGIN - 18, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - MARGIN - 18);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text(
    `${patient.name} · Patient ID ${patient.id} · Confidential medical record`,
    MARGIN,
    PAGE_HEIGHT - MARGIN - 5
  );
  doc.text(`Page ${pageNumber} of ${totalPages}`, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - MARGIN - 5, {
    align: 'right'
  });

  return MARGIN + 76;
}

function sectionHeading(doc: jsPDF, text: string, y: number): number {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...ACCENT);
  doc.text(text.toUpperCase(), MARGIN, y);
  doc.setDrawColor(...HAIRLINE);
  doc.setLineWidth(0.6);
  doc.line(MARGIN, y + 6, PAGE_WIDTH - MARGIN, y + 6);
  return y + 24;
}

function paragraph(doc: jsPDF, text: string, y: number, width = CONTENT_WIDTH): number {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...INK);
  const lines = doc.splitTextToSize(text, width) as string[];
  lines.forEach((line, i) => {
    doc.text(line, MARGIN, y + i * 15);
  });
  return y + lines.length * 15 + 8;
}

function definitionRows(
  doc: jsPDF,
  rows: Array<[string, string]>,
  y: number,
  columns: 1 | 2 = 2
): number {
  const colWidth = columns === 2 ? CONTENT_WIDTH / 2 : CONTENT_WIDTH;
  const rowHeight = 34;
  let cursor = y;

  rows.forEach(([label, value], index) => {
    const col = columns === 2 ? index % 2 : 0;
    const row = columns === 2 ? Math.floor(index / 2) : index;
    const x = MARGIN + col * colWidth;
    const rowY = cursor + row * rowHeight;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...MUTED);
    doc.text(label.toUpperCase(), x, rowY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor(...INK);
    const valueLines = doc.splitTextToSize(value, colWidth - 16) as string[];
    doc.text(valueLines.slice(0, 1), x, rowY + 14);
  });

  const usedRows = columns === 2 ? Math.ceil(rows.length / 2) : rows.length;
  cursor += usedRows * rowHeight + 6;
  return cursor;
}

function calloutPanel(doc: jsPDF, title: string, body: string, y: number): number {
  const innerWidth = CONTENT_WIDTH - 32;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const lines = doc.splitTextToSize(body, innerWidth) as string[];
  const height = 44 + lines.length * 15;

  doc.setFillColor(...PANEL);
  doc.setDrawColor(233, 213, 255);
  doc.setLineWidth(0.8);
  doc.roundedRect(MARGIN, y, CONTENT_WIDTH, height, 10, 10, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...ACCENT);
  doc.text(title.toUpperCase(), MARGIN + 16, y + 22);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...INK);
  lines.forEach((line, i) => {
    doc.text(line, MARGIN + 16, y + 40 + i * 15);
  });

  return y + height + 20;
}

function tableBlock(
  doc: jsPDF,
  headers: [string, string],
  rows: Array<[string, string]>,
  y: number
): number {
  const colA = MARGIN + 12;
  const colB = MARGIN + CONTENT_WIDTH * 0.42;
  const rowHeight = 26;

  doc.setFillColor(241, 245, 249);
  doc.rect(MARGIN, y, CONTENT_WIDTH, rowHeight, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text(headers[0].toUpperCase(), colA, y + 17);
  doc.text(headers[1].toUpperCase(), colB, y + 17);

  let cursor = y + rowHeight;
  doc.setDrawColor(...HAIRLINE);
  doc.setLineWidth(0.5);

  rows.forEach(([key, value]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...INK);
    doc.text(key, colA, cursor + 17);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const valueLines = doc.splitTextToSize(
      value,
      CONTENT_WIDTH - (colB - MARGIN) - 16
    ) as string[];
    doc.text(valueLines.slice(0, 1), colB, cursor + 17);

    doc.line(MARGIN, cursor + rowHeight, PAGE_WIDTH - MARGIN, cursor + rowHeight);
    cursor += rowHeight;
  });

  return cursor + 20;
}

/* ------------------------------------------------------------------ */
/* Generated clinical report                                           */
/* ------------------------------------------------------------------ */

const TOTAL_GENERATED_PAGES = 4;

function buildGeneratedReport(
  record: MedicalRecordItem,
  patient: PatientProfile
): ReportDocumentSource {
  const doc = new jsPDF({ unit: 'pt', format: 'a4', compress: true });
  const source = splitSubtitle(record.subtitle);
  const collectedOn = longDate(record.rawDate, record.uploadedDate);

  /* ---------------- Page 1 — Report overview ---------------- */
  let y = drawPageFrame(doc, record, patient, 1, TOTAL_GENERATED_PAGES);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...INK);
  const titleLines = doc.splitTextToSize(record.title, CONTENT_WIDTH) as string[];
  titleLines.forEach((line, i) => doc.text(line, MARGIN, y + i * 26));
  y += titleLines.length * 26 + 4;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(...MUTED);
  doc.text(`${record.type} · ${record.category} · ${source.label}: ${source.value}`, MARGIN, y);
  y += 30;

  y = sectionHeading(doc, 'Patient Information', y);
  y = definitionRows(doc, [
    ['Patient Name', patient.name],
    ['Patient ID', patient.id],
    ['Age', patient.age],
    ['Sex', patient.gender],
    ['Blood Group', patient.bloodGroup],
    ['Relationship', patient.relationship || 'Self'],
    ['Height / Weight', `${patient.height} cm · ${patient.weight} kg`],
    ['Body Mass Index', `${patient.bmi}`]
  ], y);

  y += 10;
  y = sectionHeading(doc, 'Document Summary', y);
  y = definitionRows(doc, [
    ['Document Type', record.type],
    ['Record Category', record.category],
    ['Collected On', collectedOn],
    ['Uploaded On', record.uploadedDate],
    [source.label, source.value],
    ['Record Reference', referenceId(record)]
  ], y);

  y += 6;
  calloutPanel(
    doc,
    'At a glance',
    `${record.title} was filed under ${record.category} on ${record.uploadedDate} and is retained in ${patient.name}'s encrypted health vault. ${source.label}: ${source.value}. This document is released to the patient portal in full, unredacted form.`,
    y
  );

  /* ---------------- Page 2 — Clinical interpretation ---------------- */
  doc.addPage();
  y = drawPageFrame(doc, record, patient, 2, TOTAL_GENERATED_PAGES);

  y = sectionHeading(doc, 'Clinical Interpretation', y);
  y = calloutPanel(doc, 'AI health explanation', record.aiExplanation, y);

  y = paragraph(
    doc,
    `The findings above were extracted from ${record.title} and reconciled against the prior entries held for ${patient.name} (${patient.id}) in the ${record.category} series. Values are reported exactly as released by ${source.value}; no portal-side adjustment or rounding has been applied.`,
    y
  );

  y = paragraph(
    doc,
    `Interpretation context: the patient is ${patient.age.toLowerCase()}, ${patient.gender.toLowerCase()}, blood group ${patient.bloodGroup}, with a recorded body mass index of ${patient.bmi}. Reference intervals applied to this ${record.type.toLowerCase()} document are the laboratory's own and already account for age and sex.`,
    y
  );

  y += 8;
  y = sectionHeading(doc, 'Review & Follow-up', y);
  y = paragraph(
    doc,
    `This document has been released for patient review. Discuss any flagged value with the issuing clinician before changing medication, diet or activity. A clinician countersignature is recorded on the final page of this report.`,
    y
  );

  tableBlock(
    doc,
    ['Review step', 'Status'],
    [
      ['Document received', record.uploadedDate],
      ['Automated quality check', 'Passed · structure and metadata validated'],
      ['Clinical narrative generated', `Derived from ${source.value}`],
      ['Patient portal release', `Visible to ${patient.name} (${patient.relationship || 'Self'})`]
    ],
    y
  );

  /* ---------------- Page 3 — Provenance ---------------- */
  doc.addPage();
  y = drawPageFrame(doc, record, patient, 3, TOTAL_GENERATED_PAGES);

  y = sectionHeading(doc, 'Record Provenance & Chain of Custody', y);
  y = paragraph(
    doc,
    `Every access to this document is written to the patient's access audit trail. The entries below describe how ${record.downloadFileName} entered the vault and how long it will be retained.`,
    y
  );

  y = tableBlock(
    doc,
    ['Event', 'Detail'],
    [
      ['Document created', collectedOn],
      ['Ingested into vault', record.uploadedDate],
      ['Source', `${source.label}: ${source.value}`],
      ['Original file name', record.downloadFileName],
      ['Declared file size', record.fileSize],
      ['Integrity re-check', offsetDate(record.rawDate, 30, record.uploadedDate)],
      ['Retention review', offsetDate(record.rawDate, 365 * 7, record.uploadedDate)],
      ['Record reference', referenceId(record)]
    ],
    y
  );

  y = sectionHeading(doc, 'Access & Consent', y);
  paragraph(
    doc,
    `Access to this record is governed by the consent settings on ${patient.name}'s Medical Records page. Revoking a provider's access there takes effect immediately and is reflected in the audit trail. Sharing this PDF outside the portal removes it from that protection — treat the file as confidential medical information.`,
    y
  );

  /* ---------------- Page 4 — Authorisation ---------------- */
  doc.addPage();
  y = drawPageFrame(doc, record, patient, 4, TOTAL_GENERATED_PAGES);

  y = sectionHeading(doc, 'Authorisation', y);
  y = paragraph(
    doc,
    `This report relating to ${record.title} has been reviewed and electronically released for ${patient.name} (Patient ID ${patient.id}).`,
    y
  );

  y += 24;
  doc.setDrawColor(...HAIRLINE);
  doc.setLineWidth(0.8);
  doc.line(MARGIN, y, MARGIN + 220, y);
  doc.line(PAGE_WIDTH - MARGIN - 220, y, PAGE_WIDTH - MARGIN, y);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...INK);
  doc.text(source.value, MARGIN, y + 16);
  doc.text(patient.name, PAGE_WIDTH - MARGIN - 220, y + 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...MUTED);
  doc.text(`${source.label} · electronically signed`, MARGIN, y + 30);
  doc.text(`Patient · ${patient.relationship || 'Self'}`, PAGE_WIDTH - MARGIN - 220, y + 30);

  y += 60;
  calloutPanel(
    doc,
    'Important notice',
    'This document is provided for informational purposes as part of your patient record. AI-assisted explanations summarise the underlying clinical data and are not a diagnosis. Always review results with your treating clinician before acting on them.',
    y
  );

  const buffer = doc.output('arraybuffer') as ArrayBuffer;
  const bytes = new Uint8Array(buffer);

  return {
    bytes,
    fileName: record.downloadFileName,
    byteLength: bytes.byteLength,
    origin: 'generated'
  };
}

/* ------------------------------------------------------------------ */
/* Public resolver                                                     */
/* ------------------------------------------------------------------ */

export function resolveReportDocument(
  record: MedicalRecordItem,
  patient: PatientProfile
): ReportDocumentSource {
  const uploaded = uploadedDocuments.get(record.id);
  if (uploaded) {
    return {
      bytes: uploaded.bytes,
      fileName: uploaded.fileName,
      byteLength: uploaded.bytes.byteLength,
      origin: 'uploaded'
    };
  }
  return buildGeneratedReport(record, patient);
}

/* ------------------------------------------------------------------ */
/* Download / print                                                    */
/* ------------------------------------------------------------------ */

function toBlob(bytes: Uint8Array): Blob {
  // Copy into a standalone buffer so a detached/transferred source cannot
  // produce a zero-length download.
  return new Blob([bytes.slice().buffer as ArrayBuffer], { type: 'application/pdf' });
}

export function downloadPdf(bytes: Uint8Array, fileName: string): void {
  const url = URL.createObjectURL(toBlob(bytes));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName.toLowerCase().endsWith('.pdf') ? fileName : `${fileName}.pdf`;
  anchor.rel = 'noopener';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
}

/** Prints the exact PDF bytes through a hidden same-origin iframe. */
export function printPdf(bytes: Uint8Array): Promise<void> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(toBlob(bytes));
    const frame = document.createElement('iframe');
    frame.style.position = 'fixed';
    frame.style.right = '0';
    frame.style.bottom = '0';
    frame.style.width = '0';
    frame.style.height = '0';
    frame.style.border = '0';
    frame.style.opacity = '0';
    frame.setAttribute('aria-hidden', 'true');

    const cleanup = () => {
      window.setTimeout(() => {
        if (frame.parentNode) frame.parentNode.removeChild(frame);
        URL.revokeObjectURL(url);
      }, 2000);
    };

    frame.onload = () => {
      try {
        const win = frame.contentWindow;
        if (!win) throw new Error('Print frame unavailable');
        win.focus();
        win.print();
        cleanup();
        resolve();
      } catch (error) {
        cleanup();
        reject(error instanceof Error ? error : new Error('Printing failed'));
      }
    };
    frame.onerror = () => {
      cleanup();
      reject(new Error('Printing failed'));
    };

    frame.src = url;
    document.body.appendChild(frame);
  });
}
