import React, { useState } from 'react';
import { FileEdit, FileText, ChevronDown, Send, CheckCircle2 } from 'lucide-react';
import { correctionDocumentOptions } from '../../data/medicalRecordsData';

interface RequestCorrectionProps {
  onSubmitSuccess: (data: { field: string; description: string }) => void;
}

export const RequestCorrection: React.FC<RequestCorrectionProps> = ({
  onSubmitSuccess
}) => {
  const [selectedField, setSelectedField] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedField) {
      setError('Please select a document type or field to correct.');
      return;
    }
    if (!description.trim()) {
      setError('Please provide details about the error.');
      return;
    }

    setError(null);
    setIsSubmitted(true);
    onSubmitSuccess({ field: selectedField, description: description.trim() });

    setTimeout(() => {
      setSelectedField('');
      setDescription('');
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="w-full bg-[#F8F6FF] border border-[#E9D5FF]/80 rounded-[22px] sm:rounded-[24px] p-5 sm:p-6 shadow-xs flex flex-col justify-between gap-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight">
            Request Correction
          </h3>
          <p className="text-xs text-slate-500 font-normal mt-1 leading-relaxed">
            Noticed an error in your medical records? Submit a formal request for review.
          </p>
        </div>
        <div className="w-9 h-9 rounded-xl bg-purple-100/60 flex items-center justify-center text-purple-400 shrink-0">
          <FileEdit className="w-5 h-5 text-purple-400" />
        </div>
      </div>

      {/* Submission Success State */}
      {isSubmitted ? (
        <div className="py-6 px-4 bg-white rounded-2xl border border-emerald-200 flex flex-col items-center justify-center text-center gap-2 animate-in fade-in duration-300">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
          <span className="text-sm font-bold text-slate-800">
            Correction Request Submitted!
          </span>
          <p className="text-xs text-slate-500 max-w-xs">
            Your request has been logged and queued for administrative review.
          </p>
        </div>
      ) : (
        /* Form */
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Field to Correct */}
          <div className="flex flex-col gap-1.5">
            <label 
              htmlFor="field-to-correct"
              className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1"
            >
              FIELD TO CORRECT
            </label>
            <div className="relative flex items-center">
              <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <select
                id="field-to-correct"
                value={selectedField}
                onChange={(e) => {
                  setSelectedField(e.target.value);
                  if (error) setError(null);
                }}
                className="w-full appearance-none bg-white border border-slate-200 rounded-xl pl-9 pr-8 py-2.5 text-xs text-slate-700 shadow-2xs hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all cursor-pointer"
              >
                <option value="">Select document type</option>
                {correctionDocumentOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 pointer-events-none" />
            </div>
          </div>

          {/* Description of Issue */}
          <div className="flex flex-col gap-1.5">
            <label 
              htmlFor="description-of-issue"
              className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1"
            >
              DESCRIPTION OF ISSUE
            </label>
            <textarea
              id="description-of-issue"
              rows={3}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Please provide specific details about the error and what the correct information should be..."
              className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-700 shadow-2xs placeholder-slate-400 hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-300 resize-none transition-all leading-relaxed"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            data-testid="submit-correction-button"
            className="w-full h-[46px] rounded-full bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] hover:opacity-95 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-purple-500/20 active:scale-[0.99] transition-all cursor-pointer mt-1"
          >
            <span>Submit Correction Request</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      )}
    </div>
  );
};
