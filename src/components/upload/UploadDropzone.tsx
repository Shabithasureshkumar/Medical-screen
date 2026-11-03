import React, { useRef, useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';

interface UploadDropzoneProps {
  onFileSelect: (file: File) => void;
  onValidationError?: (msg: string) => void;
}

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_MIME_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
const ALLOWED_EXTENSIONS = /\.(pdf|jpg|jpeg|png)$/i;

export const UploadDropzone: React.FC<UploadDropzoneProps> = ({
  onFileSelect,
  onValidationError
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateAndSelectFile = (file: File) => {
    setErrorMessage(null);

    const hasValidType =
      ALLOWED_MIME_TYPES.includes(file.type) || ALLOWED_EXTENSIONS.test(file.name);
    if (!hasValidType) {
      const msg = `Unsupported file format "${file.name}". Please upload a PDF, JPG, or PNG file.`;
      setErrorMessage(msg);
      onValidationError?.(msg);
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      const msg = `File "${file.name}" (${sizeMb} MB) exceeds the 10 MB maximum size limit.`;
      setErrorMessage(msg);
      onValidationError?.(msg);
      return;
    }

    onFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSelectFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      e.target.value = '';
      validateAndSelectFile(selectedFile);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      data-testid="upload-dropzone"
      className={`w-full min-h-[260px] sm:min-h-[300px] lg:min-h-[340px] rounded-[24px] sm:rounded-[28px] border-2 border-dashed transition-all flex flex-col items-center justify-center p-6 text-center select-none ${
        isDragging
          ? 'border-[#5C24FF] bg-purple-100/60 scale-[1.005]'
          : 'border-[#7C3AED] bg-[#FCFBFE] hover:bg-[#F9F7FE]'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        data-testid="file-input-hidden"
        onChange={handleFileInputChange}
      />

      {/* Upload Cloud Circle Badge */}
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#EDE9FE] flex items-center justify-center text-[#7C3AED] mb-4 shadow-2xs">
        <Upload className="w-7 h-7 sm:w-8 sm:h-8 text-[#7C3AED]" />
      </div>

      {/* Main Drag Text */}
      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 mb-1.5 font-inter">
        Drag and drop your file here
      </h3>

      {/* File Support Subtitle */}
      <p className="text-xs sm:text-sm text-slate-500 mb-5 font-normal">
        Support for PDF, JPG, PNG up to 10MB
      </p>

      {/* Validation Error Banner */}
      {errorMessage && (
        <div
          role="alert"
          data-testid="upload-validation-error"
          className="mb-4 px-3.5 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2 max-w-md"
        >
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Browse Files Button */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        data-testid="browse-files-button"
        className="h-[42px] sm:h-[46px] px-8 rounded-full bg-[#5C24FF] hover:bg-[#4F1CE6] text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-center"
      >
        Browse Files
      </button>
    </div>
  );
};
