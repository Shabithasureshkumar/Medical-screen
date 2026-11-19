import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState
} from 'react';
import { FileWarning, Loader2, RefreshCw } from 'lucide-react';
import { pdfjsLib, STANDARD_FONT_DATA_URL } from '../../services/pdfjs';

type PdfDocument = Awaited<ReturnType<typeof pdfjsLib.getDocument>['promise']>;
type PdfPage = Awaited<ReturnType<PdfDocument['getPage']>>;

export type FitMode = 'none' | 'width' | 'page';

export interface PdfViewerHandle {
  goToPage: (page: number) => void;
}

interface PdfCanvasViewerProps {
  /** Raw PDF bytes. `null` keeps the viewer in its loading state. */
  bytes: Uint8Array | null;
  /** Failure raised before any bytes existed (e.g. the record could not be resolved). */
  externalError?: string | null;
  /** Manual zoom factor, 1 = 100%. Ignored while a fit mode is active. */
  zoom: number;
  rotation: number;
  fitMode: FitMode;
  onDocumentLoaded: (numPages: number) => void;
  onPageChange: (page: number) => void;
  /** Reports the scale actually used, so the toolbar can show a live %. */
  onEffectiveZoomChange: (zoom: number) => void;
  onRetry: () => void;
}

const PAGE_GAP = 28;
const VIEWPORT_PADDING = 32;
const MAX_OUTPUT_SCALE = 2;

/** Renders one page onto its own canvas, cancelling superseded renders. */
const PdfPageCanvas: React.FC<{
  page: PdfPage;
  pageNumber: number;
  scale: number;
  rotation: number;
}> = ({ page, pageNumber, scale, rotation }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const viewport = page.getViewport({ scale, rotation });
  const cssWidth = Math.floor(viewport.width);
  const cssHeight = Math.floor(viewport.height);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const outputScale = Math.min(window.devicePixelRatio || 1, MAX_OUTPUT_SCALE);
    const renderViewport = page.getViewport({ scale, rotation });

    canvas.width = Math.floor(renderViewport.width * outputScale);
    canvas.height = Math.floor(renderViewport.height * outputScale);
    canvas.style.width = `${Math.floor(renderViewport.width)}px`;
    canvas.style.height = `${Math.floor(renderViewport.height)}px`;

    const task = page.render({
      canvas,
      canvasContext: context,
      viewport: renderViewport,
      transform: outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined
    });

    task.promise.catch((error: unknown) => {
      const name = (error as { name?: string } | null)?.name;
      if (name !== 'RenderingCancelledException') {
        // Surfaced to the user by the page-level error state; nothing to do here.
      }
    });

    return () => {
      task.cancel();
    };
  }, [page, scale, rotation]);

  return (
    <div
      data-pdf-page={pageNumber}
      className="relative bg-white rounded-[4px] shadow-[0_10px_34px_-12px_rgba(15,23,42,0.35)] ring-1 ring-slate-900/5"
      style={{ width: cssWidth, height: cssHeight }}
    >
      <canvas ref={canvasRef} className="block rounded-[4px]" aria-label={`Page ${pageNumber}`} />
    </div>
  );
};

export const PdfCanvasViewer = forwardRef<PdfViewerHandle, PdfCanvasViewerProps>(
  (
    {
      bytes,
      externalError = null,
      zoom,
      rotation,
      fitMode,
      onDocumentLoaded,
      onPageChange,
      onEffectiveZoomChange,
      onRetry
    },
    ref
  ) => {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [pages, setPages] = useState<PdfPage[]>([]);
    const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

    /* ---------------- Load the document ---------------- */
    useEffect(() => {
      if (!bytes) {
        setStatus('loading');
        setPages([]);
        return;
      }

      let cancelled = false;
      setStatus('loading');
      setPages([]);

      // PDF.js transfers the buffer it is given, so hand it a private copy.
      const loadingTask = pdfjsLib.getDocument({
        data: bytes.slice(),
        standardFontDataUrl: STANDARD_FONT_DATA_URL
      });

      loadingTask.promise
        .then(async (loaded: PdfDocument) => {
          const loadedPages = await Promise.all(
            Array.from({ length: loaded.numPages }, (_, index) => loaded.getPage(index + 1))
          );
          if (cancelled) return;
          setPages(loadedPages);
          setStatus('ready');
          onDocumentLoaded(loaded.numPages);
          onPageChange(1);
        })
        .catch((error: unknown) => {
          if (cancelled) return;
          const message =
            error instanceof Error && error.message
              ? error.message
              : 'The document could not be decoded.';
          setErrorMessage(message);
          setStatus('error');
        });

      return () => {
        cancelled = true;
        void loadingTask.destroy();
      };
      // onDocumentLoaded / onPageChange are stable callbacks from the page.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bytes]);

    /* ---------------- Track available space ---------------- */
    useLayoutEffect(() => {
      const node = scrollRef.current;
      if (!node) return;

      const measure = () => {
        setContainerSize({ width: node.clientWidth, height: node.clientHeight });
      };
      measure();

      const observer = new ResizeObserver(measure);
      observer.observe(node);
      return () => observer.disconnect();
    }, []);

    /* ---------------- Effective scale ---------------- */
    const firstPage = pages[0];
    let effectiveScale = zoom;

    if (firstPage && fitMode !== 'none' && containerSize.width > 0) {
      const base = firstPage.getViewport({ scale: 1, rotation });
      const availableWidth = Math.max(containerSize.width - VIEWPORT_PADDING * 2, 120);
      const widthScale = availableWidth / base.width;
      if (fitMode === 'width') {
        effectiveScale = widthScale;
      } else {
        const availableHeight = Math.max(containerSize.height - VIEWPORT_PADDING * 2, 160);
        effectiveScale = Math.min(widthScale, availableHeight / base.height);
      }
    }

    effectiveScale = Math.min(Math.max(effectiveScale, 0.25), 4);

    useEffect(() => {
      onEffectiveZoomChange(effectiveScale);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [effectiveScale]);

    /* ---------------- Page tracking on scroll ---------------- */
    const handleScroll = useCallback(() => {
      const node = scrollRef.current;
      if (!node) return;
      const pageNodes = Array.from(
        node.querySelectorAll<HTMLElement>('[data-pdf-page]')
      );
      if (pageNodes.length === 0) return;

      const viewportCentre = node.scrollTop + node.clientHeight / 2;
      let closest = 1;
      let smallestDistance = Number.POSITIVE_INFINITY;

      pageNodes.forEach((pageNode) => {
        const centre = pageNode.offsetTop + pageNode.offsetHeight / 2;
        const distance = Math.abs(centre - viewportCentre);
        if (distance < smallestDistance) {
          smallestDistance = distance;
          closest = Number(pageNode.dataset.pdfPage || '1');
        }
      });

      onPageChange(closest);
    }, [onPageChange]);

    useImperativeHandle(
      ref,
      () => ({
        goToPage: (page: number) => {
          const node = scrollRef.current;
          if (!node) return;
          const target = node.querySelector<HTMLElement>(`[data-pdf-page="${page}"]`);
          if (!target) return;
          node.scrollTo({ top: Math.max(target.offsetTop - VIEWPORT_PADDING, 0), behavior: 'smooth' });
        }
      }),
      []
    );

    const effectiveStatus = externalError ? 'error' : status;
    const effectiveError = externalError || errorMessage;

    return (
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        data-testid="pdf-viewport"
        className="relative w-full h-[clamp(420px,62vh,760px)] overflow-auto bg-[#F1F2F4] rounded-b-[20px]"
      >
        {effectiveStatus === 'loading' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-slate-500">
            <Loader2 className="w-7 h-7 animate-spin text-[#5C24FF]" />
            <p className="text-sm font-medium text-slate-600">Preparing secure document preview…</p>
            <p className="text-xs text-slate-400">Decrypting and rendering pages</p>
          </div>
        )}

        {effectiveStatus === 'error' && (
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center flex flex-col items-center gap-3">
              <span className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center">
                <FileWarning className="w-6 h-6 text-rose-500" />
              </span>
              <h3 className="text-base font-bold text-slate-900">This document could not be opened</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                The file may be corrupted, password protected, or not a valid PDF.
                {effectiveError ? ` (${effectiveError})` : ''}
              </p>
              <button
                type="button"
                onClick={onRetry}
                className="mt-1 inline-flex items-center gap-2 h-10 px-5 rounded-full bg-gradient-to-b from-[#9C73F2] to-[#5C24FF] text-white text-sm font-semibold shadow-xs hover:opacity-95 transition-opacity cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                Try again
              </button>
            </div>
          </div>
        )}

        {effectiveStatus === 'ready' && (
          <div
            className="flex flex-col items-center"
            style={{ gap: PAGE_GAP, paddingTop: VIEWPORT_PADDING, paddingBottom: VIEWPORT_PADDING }}
          >
            {pages.map((page, index) => (
              <PdfPageCanvas
                key={`page-${index + 1}`}
                page={page}
                pageNumber={index + 1}
                scale={effectiveScale}
                rotation={rotation}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

PdfCanvasViewer.displayName = 'PdfCanvasViewer';
