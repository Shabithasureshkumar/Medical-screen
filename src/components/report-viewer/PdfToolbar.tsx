import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  RotateCw,
  Scan,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { FitMode } from './PdfCanvasViewer';

interface PdfToolbarProps {
  zoomPercent: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  canZoomIn: boolean;
  canZoomOut: boolean;
  currentPage: number;
  numPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onRotate: () => void;
  fitMode: FitMode;
  onToggleFit: () => void;
  disabled: boolean;
}

export const PdfToolbar: React.FC<PdfToolbarProps> = ({
  zoomPercent,
  onZoomIn,
  onZoomOut,
  canZoomIn,
  canZoomOut,
  currentPage,
  numPages,
  onPreviousPage,
  onNextPage,
  onRotate,
  fitMode,
  onToggleFit,
  disabled
}) => {
  const iconButton =
    'w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-[#5C24FF] hover:bg-purple-50 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-300';

  const fitLabel =
    fitMode === 'width' ? 'Fit to width' : fitMode === 'page' ? 'Fit to page' : 'Actual size';

  return (
    <div
      data-testid="pdf-toolbar"
      className="w-full flex flex-wrap items-center justify-between gap-3 px-3 sm:px-5 lg:px-6 py-3 border-b border-slate-100"
    >
      {/* Left: zoom + page indicator */}
      <div className="flex items-center gap-3 sm:gap-5 min-w-0">
        <div className="flex items-center gap-1 h-10 pl-2 pr-2 rounded-full bg-slate-50 border border-slate-200/80">
          <button
            type="button"
            onClick={onZoomOut}
            disabled={disabled || !canZoomOut}
            className={iconButton}
            title="Zoom out"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span
            data-testid="pdf-zoom-level"
            className="min-w-[58px] text-center text-sm font-semibold text-slate-700 tabular-nums select-none"
          >
            {zoomPercent}%
          </span>
          <button
            type="button"
            onClick={onZoomIn}
            disabled={disabled || !canZoomIn}
            className={iconButton}
            title="Zoom in"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onPreviousPage}
            disabled={disabled || currentPage <= 1}
            className={iconButton}
            title="Previous page"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span
            data-testid="pdf-page-indicator"
            className="text-sm sm:text-base font-semibold text-slate-700 whitespace-nowrap select-none"
          >
            Page {numPages === 0 ? '–' : currentPage} of {numPages === 0 ? '–' : numPages}
          </span>
          <button
            type="button"
            onClick={onNextPage}
            disabled={disabled || currentPage >= numPages}
            className={iconButton}
            title="Next page"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Right: rotate + fit */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 ml-auto">
        <button
          type="button"
          onClick={onRotate}
          disabled={disabled}
          className={iconButton}
          title="Rotate 90° clockwise"
          aria-label="Rotate document 90 degrees clockwise"
        >
          <RotateCw className="w-[18px] h-[18px]" />
        </button>
        <button
          type="button"
          onClick={onToggleFit}
          disabled={disabled}
          className={iconButton}
          title={`${fitLabel} — click to change`}
          aria-label={`Current view: ${fitLabel}. Click to change fit mode.`}
        >
          {fitMode === 'page' ? (
            <Scan className="w-[18px] h-[18px]" />
          ) : (
            <Maximize className="w-[18px] h-[18px]" />
          )}
        </button>
      </div>
    </div>
  );
};
