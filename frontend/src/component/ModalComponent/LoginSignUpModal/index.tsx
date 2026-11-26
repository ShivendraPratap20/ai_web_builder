import React, { useEffect, useState } from 'react';
import LoginTab from './LoginTab';
import SignUpTab from './SignUpTab';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({
  isOpen,
  onClose,
}: LoginModalProps): React.JSX.Element | null {
  const [mode, setMode] = useState<'login' | 'signup'>('login');


  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;


  const switchMode = (nextMode: 'login' | 'signup') => {
    setMode(nextMode);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      onClick={onClose}
    >
      <div
        className="relative max-h-[100vh] rounded-2xl bg-[#FFFFFF] border border-slate-200 shadow-2xl p-6 sm:p-8 overflow-y-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-lg text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-xl bg-[#4F46E5] flex items-center justify-center text-white shadow-sm mb-4">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
              />
            </svg>
          </div>

          <h2 id="auth-modal-title" className="text-2xl font-bold tracking-tight text-[#0F172A]">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="mt-1.5 text-sm text-[#475569]">
            {mode === 'login'
              ? 'Sign in to access your AI-generated sites and exports.'
              : 'Start building responsive React & Tailwind websites in seconds.'}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="mt-6 grid grid-cols-2 p-1 rounded-xl bg-[#F8FAFC] border border-slate-200">
          <button
            type="button"
            onClick={() => switchMode('login')}
            className={`py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer ${mode === 'login'
                ? 'bg-[#FFFFFF] text-[#0F172A] shadow-xs border border-slate-200/70'
                : 'text-[#475569] hover:text-[#0F172A]'
              }`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => switchMode('signup')}
            className={`py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer ${mode === 'signup'
                ? 'bg-[#FFFFFF] text-[#0F172A] shadow-xs border border-slate-200/70'
                : 'text-[#475569] hover:text-[#0F172A]'
              }`}
          >
            Create account
          </button>
        </div>

        {/* OAuth Buttons */}
        <div className="mt-5">
          <button
            type="button"
            className="flex w-100 items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#FFFFFF] hover:bg-[#F8FAFC] border border-slate-200 text-xs sm:text-sm font-medium text-[#0F172A] transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.54-1.14 2.85-2.4 3.72v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.22z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96z"
              />
            </svg>
            <span>Google</span>
          </button>
        </div>

        <div>
              {
          mode == 'login' && (
            <LoginTab onClose={onClose} />
          )
        }
        {
          mode == 'signup' && (
            <SignUpTab onClose={onClose}/>
          )
        }
        </div>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2.5 bg-[#FFFFFF] text-[#94A3B8]">or continue with email</span>
          </div>
        </div>


        {/* Footer Note */}
        <p className="mt-5 text-center text-xs text-[#94A3B8]">
          By continuing, you agree to our{' '}
          <a href="#terms" className="text-[#475569] underline hover:text-[#0F172A]">
            Terms
          </a>{' '}
          and{' '}
          <a href="#privacy" className="text-[#475569] underline hover:text-[#0F172A]">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}