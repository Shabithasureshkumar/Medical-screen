import * as pdfjsLib from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

/**
 * Single place where PDF.js is configured for the app bundle.
 * The worker ships with pdfjs-dist and is emitted by Vite; the standard font
 * data is served from /pdfjs/standard_fonts/ by the plugin in vite.config.ts,
 * which keeps PDF.js from falling back (and warning) on Helvetica/Times.
 */
pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

export const STANDARD_FONT_DATA_URL = '/pdfjs/standard_fonts/';

export { pdfjsLib };
