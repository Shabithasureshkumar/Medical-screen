import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ReportPdfHeader } from './ReportPdfHeader';
import { ReportDocumentBar } from './ReportDocumentBar';
import { PdfToolbar } from './PdfToolbar';
import { FitMode, PdfCanvasViewer, PdfViewerHandle } from './PdfCanvasViewer';
import { MedicalRecordItem } from '../../data/medicalRecordsData';
import { PatientProfile } from '../../types/medical';
import {
  downloadPdf,
  formatFileSize,
  printPdf,
  registerUploadedDocument,
  resolveReportDocument,
  ReportDocumentSource
} from '../../services/reportDocumentService';

interface ReportPdfViewPageProps {
  record: MedicalRecordItem;
  patient: PatientProfile;
  /** Returns to the Reports listing with its filters/context intact. */
  onClose: () => void;
  onSwitchProfile?: () => void;
  onRecordUpdated?: (recordId: string, patch: Partial<MedicalRecordItem>) => void;
}

const ZOOM_STEPS = [0.5, 0.75, 1, 1.25, 1.5, 2, 3];
const MIN_ZOOM = ZOOM_STEPS[0];
const MAX_ZOOM = ZOOM_STEPS[ZOOM_STEPS.length - 1];

export const ReportPdfViewPage: React.FC<ReportPdfViewPageProps> = ({
  record,
  patient,
  onClose,
  onSwitchProfile,
  onRecordUpdated
}) => {
  const viewerRef = useRef<PdfViewerHandle | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [documentSource, setDocumentSource] = useState<ReportDocumentSource | null>(null);
  const [resolveError, setResolveError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  const [zoom, setZoom] = useState(1);
  const [effectiveZoom, setEffectiveZoom] = useState(1);
  // Narrow screens open fitted to the viewer width so the A4 page is never
  // clipped on first paint; desktop opens at true 100% like the design.
  const [fitMode, setFitMode] = useState<FitMode>(() =>
    typeof window !== 'undefined' && window.innerWidth < 1024 ? 'width' : 'none'
  );
  const [rotation, setRotation] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    window.setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3200);
  }, []);

  /* ---------------- Resolve the selected record's PDF ---------------- */
  useEffect(() => {
    let cancelled = false;
    setDocumentSource(null);
    setResolveError(null);
    setNumPages(0);
    setCurrentPage(1);
    setRotation(0);

    // Deferred a tick so the loading state paints before composition runs.
    const timer = window.setTimeout(() => {
      try {
        const resolved = resolveReportDocument(record, patient);
        if (!cancelled) setDocumentSource(resolved);
      } catch (error) {
        if (cancelled) return;
        setResolveError(
          error instanceof Error ? error.message : 'The document could not be prepared.'
        );
      }
    }, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [record, patient, reloadToken]);

  /* ---------------- Toolbar handlers ---------------- */
  const handleZoomIn = useCallback(() => {
    setFitMode('none');
    setZoom((prev) => {
      const base = fitMode === 'none' ? prev : effectiveZoom;
      const next = ZOOM_STEPS.find((step) => step > base + 0.001);
      return next ?? MAX_ZOOM;
    });
  }, [fitMode, effectiveZoom]);

  const handleZoomOut = useCallback(() => {
    setFitMode('none');
    setZoom((prev) => {
      const base = fitMode === 'none' ? prev : effectiveZoom;
      const next = [...ZOOM_STEPS].reverse().find((step) => step < base - 0.001);
      return next ?? MIN_ZOOM;
    });
  }, [fitMode, effectiveZoom]);

  const handleToggleFit = useCallback(() => {
    setFitMode((prev) => {
      if (prev === 'none') {
        showToast('Fit to width');
        return 'width';
      }
      if (prev === 'width') {
        showToast('Fit to page');
        return 'page';
      }
      showToast('Actual size (100%)');
      setZoom(1);
      return 'none';
    });
  }, [showToast]);

  const handleRotate = useCallback(() => {
    setRotation((prev) => (prev + 90) % 360);
  }, []);

  const handlePreviousPage = useCallback(() => {
    const target = Math.max(currentPage - 1, 1);
    viewerRef.current?.goToPage(target);
  }, [currentPage]);

  const handleNextPage = useCallback(() => {
    const target = Math.min(currentPage + 1, numPages || 1);
    viewerRef.current?.goToPage(target);
  }, [currentPage, numPages]);

  const handleDocumentLoaded = useCallback((pageCount: number) => {
    setNumPages(pageCount);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage((prev) => (prev === page ? prev : page));
  }, []);

  const handleEffectiveZoomChange = useCallback((value: number) => {
    setEffectiveZoom(value);
  }, []);

  /* ---------------- Document actions ---------------- */
  const handleDownload = useCallback(() => {
    if (!documentSource) return;
    downloadPdf(documentSource.bytes, documentSource.fileName);
    showToast(`Downloading ${documentSource.fileName}`);
  }, [documentSource, showToast]);

  const handlePrint = useCallback(() => {
    if (!documentSource) return;
    printPdf(documentSource.bytes)
      .then(() => showToast(`Sent ${documentSource.fileName} to your printer`))
      .catch(() => showToast('Your browser blocked the print dialog. Allow pop-ups and retry.'));
  }, [documentSource, showToast]);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileSelected = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      event.target.value = '';
      if (!file) return;

      const isPdf =
        file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
      if (!isPdf) {
        showToast('Only PDF documents can be previewed here.');
        return;
      }

      try {
        setDocumentSource(null);
        setResolveError(null);
        setNumPages(0);
        setCurrentPage(1);
        setRotation(0);
        const uploaded = await registerUploadedDocument(record.id, file);
        setDocumentSource(uploaded);
        onRecordUpdated?.(record.id, {
          downloadFileName: uploaded.fileName,
          fileSize: formatFileSize(uploaded.byteLength)
        });
        showToast(`${file.name} attached to ${record.title}`);
      } catch {
        setResolveError('The selected file could not be read.');
      }
    },
    [record.id, record.title, onRecordUpdated, showToast]
  );

  const handleRetry = useCallback(() => {
    setReloadToken((prev) => prev + 1);
  }, []);

  /* ---------------- Derived display values ---------------- */
  const zoomPercent = Math.round((fitMode === 'none' ? zoom : effectiveZoom) * 100);
  const fileSizeLabel = documentSource
    ? formatFileSize(documentSource.byteLength)
    : record.fileSize;
  const originLabel = documentSource?.origin === 'uploaded' ? 'Uploaded file' : 'Portal record';
  const actionsDisabled = !documentSource;

  const displayFileName = documentSource?.fileName || record.downloadFileName;

  const viewerBytes = useMemo(() => documentSource?.bytes ?? null, [documentSource]);

  return (
    <div className="w-full flex flex-col flex-1">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs sm:text-sm font-medium animate-fade-in flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf,.pdf"
        onChange={handleFileSelected}
        className="hidden"
        data-testid="report-pdf-file-input"
        aria-hidden="true"
        tabIndex={-1}
      />

      <main className="w-full fluid-page-x fluid-page-y flex flex-col fluid-page-gap flex-1">
        <ReportPdfHeader
          patient={patient}
          onBackToRecords={onClose}
          onDownloadPdf={handleDownload}
          onUploadNewFile={handleUploadClick}
          onSwitchProfile={onSwitchProfile}
          downloadDisabled={actionsDisabled}
        />

        <section
          data-testid="report-pdf-viewer"
          className="w-full bg-white rounded-[20px] border border-slate-200/90 shadow-xs overflow-hidden"
        >
          <ReportDocumentBar
            fileName={displayFileName}
            uploadedDate={record.uploadedDate}
            fileSize={fileSizeLabel}
            originLabel={originLabel}
            onDownload={handleDownload}
            onPrint={handlePrint}
            onClose={onClose}
            actionsDisabled={actionsDisabled}
          />

          <PdfToolbar
            zoomPercent={zoomPercent}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            canZoomIn={zoomPercent < MAX_ZOOM * 100}
            canZoomOut={zoomPercent > MIN_ZOOM * 100}
            currentPage={currentPage}
            numPages={numPages}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
            onRotate={handleRotate}
            fitMode={fitMode}
            onToggleFit={handleToggleFit}
            disabled={actionsDisabled}
          />

          <PdfCanvasViewer
            ref={viewerRef}
            bytes={viewerBytes}
            externalError={resolveError}
            zoom={zoom}
            rotation={rotation}
            fitMode={fitMode}
            onDocumentLoaded={handleDocumentLoaded}
            onPageChange={handlePageChange}
            onEffectiveZoomChange={handleEffectiveZoomChange}
            onRetry={handleRetry}
          />
        </section>
      </main>
    </div>
  );
};
