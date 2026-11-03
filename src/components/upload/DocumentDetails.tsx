import React, { useState } from 'react';
import { Search, ChevronDown, Lock, FileText, X } from 'lucide-react';
import { Practitioner } from '../../types/upload';
import { documentCategories, availablePractitioners } from '../../data/uploadData';

export interface UploadMetadata {
  categoryId: string;
  categoryLabel: string;
  doctor: Practitioner | null;
  notes: string;
}

interface DocumentDetailsProps {
  onUploadDocument: (metadata?: UploadMetadata) => void;
  onCancel: () => void;
  disabled?: boolean;
}

export const DocumentDetails: React.FC<DocumentDetailsProps> = ({
  onUploadDocument,
  onCancel,
  disabled = false
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('select');
  const [searchDoctor, setSearchDoctor] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<Practitioner | null>(availablePractitioners[0]); // Dr. Sarah Chen
  const [notes, setNotes] = useState<string>('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [doctorSuggestionsOpen, setDoctorSuggestionsOpen] = useState(false);

  const filteredPractitioners = availablePractitioners.filter(
    (p) =>
      p.name.toLowerCase().includes(searchDoctor.toLowerCase()) ||
      p.specialty.toLowerCase().includes(searchDoctor.toLowerCase())
  );

  const handleUploadClick = () => {
    const categoryLabel =
      documentCategories.find((c) => c.id === selectedCategory)?.label || 'General Health Report';
    onUploadDocument({
      categoryId: selectedCategory === 'select' ? 'general-report' : selectedCategory,
      categoryLabel: selectedCategory === 'select' ? 'General Health Report' : categoryLabel,
      doctor: selectedDoctor,
      notes: notes.trim()
    });
  };

  return (
    <div
      data-testid="document-details-panel"
      className="w-full bg-white rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 lg:p-7 shadow-xs border border-slate-100 flex flex-col gap-5"
    >
      {/* Panel Header */}
      <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-inter">
        Document Details
      </h3>

      {/* Field 1: Document Category */}
      <div className="flex flex-col gap-2 relative">
        <label className="text-xs sm:text-sm font-bold text-slate-700 font-inter">
          Document Category
        </label>
        <button
          type="button"
          onClick={() => setDropdownOpen((prev) => !prev)}
          data-testid="document-category-dropdown"
          className="w-full bg-[#F1F3F7] hover:bg-slate-200/70 rounded-xl px-4 py-3 flex items-center justify-between text-slate-600 text-xs sm:text-sm border border-transparent transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <FileText className="w-4 h-4 text-slate-500 shrink-0" />
            <span className="font-medium text-slate-700">
              {documentCategories.find((c) => c.id === selectedCategory)?.label || 'Select document type'}
            </span>
          </div>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Options Menu */}
        {dropdownOpen && (
          <div className="absolute top-full left-0 w-full mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-30 animate-fade-in">
            {documentCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-xs sm:text-sm flex items-center justify-between hover:bg-purple-50 transition-colors ${
                  selectedCategory === cat.id ? 'font-bold text-[#5C24FF] bg-purple-50/50' : 'text-slate-700'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Field 2: Associated Practitioner */}
      <div className="flex flex-col gap-2 relative">
        <label className="text-xs sm:text-sm font-bold text-slate-700 font-inter">
          Associated Practitioner
        </label>
        <div className="w-full bg-[#F1F3F7] rounded-xl px-4 py-2.5 flex items-center gap-2.5 border border-transparent focus-within:border-purple-400 focus-within:bg-white transition-colors">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchDoctor}
            onFocus={() => setDoctorSuggestionsOpen(true)}
            onChange={(e) => {
              setSearchDoctor(e.target.value);
              setDoctorSuggestionsOpen(true);
            }}
            placeholder="Search doctor name..."
            className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none"
          />
        </div>

        {/* Practitioner Search Dropdown */}
        {(doctorSuggestionsOpen || (!selectedDoctor && searchDoctor.trim().length > 0)) && (
          <div className="w-full bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-20">
            {filteredPractitioners.length === 0 ? (
              <div className="px-4 py-2 text-xs text-slate-400">No matching practitioners found</div>
            ) : (
              filteredPractitioners.map((doc) => (
                <button
                  key={doc.id}
                  type="button"
                  data-testid={`practitioner-option-${doc.id}`}
                  onClick={() => {
                    setSelectedDoctor(doc);
                    setSearchDoctor('');
                    setDoctorSuggestionsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs sm:text-sm flex items-center justify-between hover:bg-purple-50 transition-colors cursor-pointer ${
                    selectedDoctor?.id === doc.id ? 'font-bold text-[#5C24FF] bg-purple-50/50' : 'text-slate-700'
                  }`}
                >
                  <span>{doc.name}</span>
                  <span className="text-[11px] text-slate-400 font-normal">{doc.specialty}</span>
                </button>
              ))
            )}
          </div>
        )}

        {/* Selected Practitioner Chip */}
        {selectedDoctor && (
          <div className="pt-0.5">
            <span
              data-testid="selected-practitioner-chip"
              className="inline-flex items-center gap-1.5 bg-[#5C24FF] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-2xs"
            >
              <span>{selectedDoctor.name}</span>
              <button
                type="button"
                onClick={() => {
                  setSelectedDoctor(null);
                  setDoctorSuggestionsOpen(true);
                }}
                className="hover:bg-white/20 rounded-full p-0.5 transition-colors cursor-pointer"
                aria-label={`Remove ${selectedDoctor.name}`}
              >
                <X className="w-3 h-3 text-white" />
              </button>
            </span>
          </div>
        )}
      </div>

      {/* Field 3: Description / Notes */}
      <div className="flex flex-col gap-2">
        <label className="text-xs sm:text-sm font-bold text-slate-700 font-inter">
          Description / Notes
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Briefly describe the contents of this file..."
          rows={3}
          className="w-full bg-[#F1F3F7] rounded-xl p-3.5 sm:p-4 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 border border-transparent focus:border-purple-400 focus:bg-white outline-none resize-none transition-colors"
        />
      </div>

      {/* Field 4: Security Information Card */}
      <div className="bg-[#F4F1FD] border border-purple-100 rounded-[16px] p-4 flex items-start gap-3">
        <Lock className="w-4 h-4 text-[#7C3AED] shrink-0 mt-0.5" />
        <p className="text-[11px] sm:text-xs text-purple-950/80 leading-relaxed font-normal">
          This document will be encrypted and stored securely. Only authorized healthcare providers will have access based on your consent settings.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2.5 pt-2">
        <button
          type="button"
          onClick={handleUploadClick}
          disabled={disabled}
          data-testid="upload-document-submit-button"
          className="w-full h-[48px] sm:h-[52px] rounded-full bg-[#5C24FF] hover:bg-[#4F1CE6] active:scale-[0.99] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Upload Document
        </button>

        <button
          type="button"
          onClick={onCancel}
          data-testid="cancel-upload-button"
          className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 py-1 transition-colors cursor-pointer text-center"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
