import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Building2,
  Phone,
  MapPin,
  Globe,
  Check,
  Save,
  CheckCircle2,
  RotateCcw,
  Edit3,
  Layers,
  Code2
} from 'lucide-react';
import BusinessDetails from './FormSteps/BusinessDetails';

const STEPS = [
  { id: 1, title: 'Business Details', shortTitle: 'Business' },
  { id: 2, title: 'Project Details', shortTitle: 'Project' },
  { id: 3, title: 'Website Requirement', shortTitle: 'Requirements' },
  { id: 4, title: 'Assess Requirement', shortTitle: 'Assessment' },
  { id: 5, title: 'Website Style Preferences', shortTitle: 'Style' },
  { id: 6, title: 'Final Review', shortTitle: 'Review' }
];

const INITIAL_FORM_DATA = {
  businessName: '',
  ownerName: '',
  targetAudience: '',
  email: '',
  contactNumber: '',
  whatsappNumber: '',
  sameAsContact: false,
  address: {
    street: '',
    city: '',
    state: '',
    country: '',
    postalCode: ''
  },
  socialLinks: {
    instagram: '',
    facebook: '',
    youtube: ''
  }
};

export default function Form() {
  const [currentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [draftSavedToast, setDraftSavedToast] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showJsonPreview, setShowJsonPreview] = useState(false);

  // Sync WhatsApp number automatically when 'sameAsContact' is checked
  useEffect(() => {
    if (formData.sameAsContact) {
      setFormData((prev) => ({
        ...prev,
        whatsappNumber: prev.contactNumber
      }));
    }
  }, [formData.contactNumber, formData.sameAsContact]);


  const handleSaveDraft = () => {
    try {
      localStorage.setItem('ai_website_builder_step1_draft', JSON.stringify(formData));
    } catch {
      // Safe fallback if storage is restricted
    }
    setDraftSavedToast(true);
    setTimeout(() => setDraftSavedToast(false), 3000);
  };

 

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setTouched({});
    setIsSubmitted(false);
    setShowJsonPreview(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased flex flex-col">
      {/* 1. Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#FFFFFF] border-b border-[#E2E8F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Mark */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#4F46E5] flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-[#0F172A] block leading-none">
                AI Website Builder
              </span>
              <span className="text-xs text-[#475569] mt-0.5 block">
                Project Onboarding
              </span>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {draftSavedToast && (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-[#4F46E5] bg-[#4F46E5]/10 px-2.5 py-1.5 rounded-md transition-opacity">
                <Check className="w-3.5 h-3.5" />
                Draft saved
              </span>
            )}
            <button
              type="button"
              onClick={handleSaveDraft}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-[#0F172A] bg-[#F8FAFC] hover:bg-slate-100 border border-[#E2E8F0] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20"
            >
              <Save className="w-4 h-4 text-[#475569]" />
              <span>Save Draft</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* 2. Multi-Step Progress Header (6 Steps) */}
        <nav aria-label="Onboarding progress" className="mb-8">
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl p-4 sm:p-6 shadow-xs">
            {/* Mobile Compact Progress Header */}
            <div className="flex items-center justify-between md:hidden mb-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#4F46E5]">
                  Step {currentStep} of {STEPS.length}
                </span>
                <h2 className="text-base font-bold text-[#0F172A]">
                  {STEPS[currentStep - 1].title}
                </h2>
              </div>
              <span className="text-xs font-medium text-[#475569] bg-[#F8FAFC] px-2.5 py-1 rounded-full border border-[#E2E8F0]">
                {Math.round((currentStep / STEPS.length) * 100)}% Complete
              </span>
            </div>

            {/* Mobile Progress Bar */}
            <div className="w-full bg-[#F8FAFC] h-2 rounded-full overflow-hidden border border-[#E2E8F0] md:hidden">
              <div
                className="bg-[#4F46E5] h-full transition-all duration-300 rounded-full"
                style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
              />
            </div>

            {/* Desktop & Tablet 6-Step Stepper */}
            <ol className="hidden md:grid md:grid-cols-6 gap-2">
              {STEPS.map((step, index) => {
                const isActive = step.id === currentStep;
                const isCompleted = step.id < currentStep;
                const isLast = index === STEPS.length - 1;

                return (
                  <li key={step.id} className="relative flex flex-col items-start">
                    {/* Connecting Line */}
                    {!isLast && (
                      <div
                        className="absolute top-4 left-9 right-2 h-[2px] bg-[#E2E8F0]"
                        aria-hidden="true"
                      >
                        <div
                          className={`h-full transition-all duration-300 ${
                            isCompleted ? 'w-full bg-[#4F46E5]' : 'w-0'
                          }`}
                        />
                      </div>
                    )}

                    {/* Step Circle Badge */}
                    <div className="relative z-10 flex items-center gap-2 mb-2.5">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isActive
                            ? 'bg-[#4F46E5] text-white ring-4 ring-[#4F46E5]/15 shadow-xs'
                            : isCompleted
                            ? 'bg-[#4F46E5] text-white'
                            : 'bg-[#F8FAFC] text-[#94A3B8] border border-[#E2E8F0]'
                        }`}
                      >
                        {isCompleted ? <Check className="w-4 h-4" /> : step.id}
                      </div>
                    </div>

                    {/* Step Title */}
                    <div className="pr-2">
                      <span
                        className={`text-[11px] font-semibold uppercase tracking-wider block ${
                          isActive ? 'text-[#4F46E5]' : 'text-[#94A3B8]'
                        }`}
                      >
                        Step {step.id}
                      </span>
                      <span
                        className={`text-xs font-semibold leading-snug block mt-0.5 ${
                          isActive
                            ? 'text-[#0F172A]'
                            : isCompleted
                            ? 'text-[#475569]'
                            : 'text-[#94A3B8]'
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </nav>

        {/* Submission Confirmation Banner & Summary Preview */}
        {isSubmitted ? (
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl shadow-xs overflow-hidden">
            {/* Top Status Banner */}
            <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-6 py-6 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#4F46E5]/10 border border-[#4F46E5]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-6 h-6 text-[#4F46E5]" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4F46E5] uppercase tracking-wider mb-1">
                    Step 1 Completed
                  </div>
                  <h1 className="text-xl font-bold text-[#0F172A]">
                    Business Details Captured Successfully
                  </h1>
                  <p className="text-sm text-[#475569] mt-1">
                    Your business profile is saved. <strong className="font-semibold text-[#0F172A]">Step 2: Project Details</strong> is ready to be built next.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-[#0F172A] bg-[#FFFFFF] hover:bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg transition-colors"
                >
                  <Edit3 className="w-4 h-4 text-[#475569]" />
                  <span>Edit Step 1</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-[#475569] hover:text-[#0F172A] bg-[#F8FAFC] hover:bg-slate-100 border border-[#E2E8F0] rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Captured Summary Grid */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-[#475569]">
                  Captured Step 1 Summary
                </h2>
                <button
                  type="button"
                  onClick={() => setShowJsonPreview((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#4F46E5] hover:text-[#4338CA] transition-colors"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>{showJsonPreview ? 'Show Formatted View' : 'View Raw JSON Payload'}</span>
                </button>
              </div>

              {showJsonPreview ? (
                <pre className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-4 text-xs font-mono text-[#0F172A] overflow-x-auto leading-relaxed">
                  {JSON.stringify(formData, null, 2)}
                </pre>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Identity Summary Card */}
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-4 space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#475569] flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#4F46E5]" />
                      Core Identity
                    </h3>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between gap-2">
                        <dt className="text-[#475569]">Business Name:</dt>
                        <dd className="font-semibold text-[#0F172A] text-right">{formData.businessName}</dd>
                      </div>
                      <div className="flex justify-between gap-2">
                        <dt className="text-[#475569]">Owner Name:</dt>
                        <dd className="font-semibold text-[#0F172A] text-right">{formData.ownerName}</dd>
                      </div>
                      <div className="pt-1 border-t border-[#E2E8F0]">
                        <dt className="text-[#475569] text-xs mb-1">Target Audience:</dt>
                        <dd className="text-[#0F172A] text-xs leading-relaxed">
                          {formData.targetAudience || <span className="text-[#94A3B8] italic">Not specified</span>}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  {/* Contact Summary Card */}
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-4 space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#475569] flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#4F46E5]" />
                      Contact Details
                    </h3>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between gap-2">
                        <dt className="text-[#475569]">Email:</dt>
                        <dd className="font-medium text-[#0F172A] text-right">{formData.email}</dd>
                      </div>
                      <div className="flex justify-between gap-2">
                        <dt className="text-[#475569]">Contact Number:</dt>
                        <dd className="font-medium text-[#0F172A] text-right">{formData.contactNumber}</dd>
                      </div>
                      <div className="flex justify-between gap-2">
                        <dt className="text-[#475569]">WhatsApp:</dt>
                        <dd className="font-medium text-[#0F172A] text-right">
                          {formData.whatsappNumber || <span className="text-[#94A3B8] italic">Not provided</span>}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  {/* Address Summary Card */}
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-4 space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#475569] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#4F46E5]" />
                      Location & Address
                    </h3>
                    <p className="text-sm text-[#0F172A]">
                      {[
                        formData.address.street,
                        formData.address.city,
                        formData.address.state,
                        formData.address.postalCode,
                        formData.address.country
                      ]
                        .filter(Boolean)
                        .join(', ') || <span className="text-[#94A3B8] italic text-xs">No address details entered</span>}
                    </p>
                  </div>

                  {/* Social Links Summary Card */}
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-4 space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#475569] flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-[#4F46E5]" />
                      Social Profiles
                    </h3>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between gap-2">
                        <span className="text-[#475569]">Instagram:</span>
                        <span className="text-[#0F172A] truncate max-w-[220px]">
                          {formData.socialLinks.instagram || <span className="text-[#94A3B8]">—</span>}
                        </span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-[#475569]">Facebook:</span>
                        <span className="text-[#0F172A] truncate max-w-[220px]">
                          {formData.socialLinks.facebook || <span className="text-[#94A3B8]">—</span>}
                        </span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-[#475569]">YouTube:</span>
                        <span className="text-[#0F172A] truncate max-w-[220px]">
                          {formData.socialLinks.youtube || <span className="text-[#94A3B8]">—</span>}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Next Step Prompt Box */}
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#FFFFFF] border border-[#E2E8F0] flex items-center justify-center shrink-0">
                    <Layers className="w-4 h-4 text-[#4F46E5]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0F172A]">
                      Up Next: Step 2 — Project Details
                    </p>
                    <p className="text-xs text-[#475569]">
                      Tell me when you are ready to build the fields for Step 2.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg transition-colors shadow-xs"
                >
                  <span>Back to Step 1 Form</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* 3. Step 1 Form Card ('Business Details') */
        <BusinessDetails/>
        )}
      </main>
    </div>
  );
}