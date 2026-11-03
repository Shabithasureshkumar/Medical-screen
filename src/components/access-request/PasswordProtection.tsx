import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordProtectionProps {
  enabled: boolean;
  onToggle: () => void;
  password?: string;
  confirmPassword?: string;
  onPasswordChange: (val: string) => void;
  onConfirmPasswordChange: (val: string) => void;
}

export const PasswordProtection: React.FC<PasswordProtectionProps> = ({
  enabled,
  onToggle,
  password = '',
  confirmPassword = '',
  onPasswordChange,
  onConfirmPasswordChange
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="w-full rounded-[20px] sm:rounded-[24px] bg-white border border-slate-200/80 p-4 sm:p-5 flex flex-col gap-4 shadow-xs">
      {/* Header with Switch */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h3 className="text-xs sm:text-sm font-bold text-[#0F172A] font-inter">
            Protect with Password
          </h3>
          <span className="text-[11px] text-[#64748B]">
            Recipient must enter key to view
          </span>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          aria-label="Toggle Password Protection"
          data-testid="toggle-password-protection"
          onClick={onToggle}
          className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
            enabled ? 'bg-[#7C3AED]' : 'bg-slate-200'
          }`}
        >
          <span
            className={`block w-5 h-5 rounded-full bg-white shadow-xs transition-transform transform ${
              enabled ? 'translate-x-5.5' : 'translate-x-0.5'
            } top-0.5 absolute`}
          />
        </button>
      </div>

      {/* Password Inputs (shown when enabled) */}
      {enabled && (
        <div className="flex flex-col gap-3 pt-1 border-t border-slate-100">
          {/* Set Password */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="access-set-password"
              className="text-[10px] sm:text-[11px] font-bold text-[#64748B] tracking-wider uppercase font-inter"
            >
              Set Password
            </label>
            <div className="relative w-full">
              <input
                id="access-set-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                placeholder="Enter password"
                data-testid="input-set-password"
                className="w-full pl-4 pr-10 py-2.5 rounded-full bg-white border border-slate-200 focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-purple-100 text-xs sm:text-sm text-slate-800 transition-all font-inter shadow-xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                data-testid="toggle-show-password"
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="access-confirm-password"
              className="text-[10px] sm:text-[11px] font-bold text-[#64748B] tracking-wider uppercase font-inter"
            >
              Confirm Password
            </label>
            <div className="relative w-full">
              <input
                id="access-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => onConfirmPasswordChange(e.target.value)}
                placeholder="Confirm password"
                data-testid="input-confirm-password"
                className="w-full pl-4 pr-10 py-2.5 rounded-full bg-white border border-slate-200 focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-purple-100 text-xs sm:text-sm text-slate-800 transition-all font-inter shadow-xs"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                data-testid="toggle-show-confirm-password"
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showConfirmPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
