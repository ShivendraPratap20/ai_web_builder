import { useState } from 'react';
import {
  Sparkles,
  Check,
  Save,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import BusinessDetails from './FormSteps/BusinessDetails';
import ProjectDetails from './FormSteps/ProjectDetails';
import WebsiteRequirement from './FormSteps/WebsiteRequirement';
import AssessRequirement from './FormSteps/AssetsRequirement';
import WebsiteStylePreferences from './FormSteps/WebsiteStylePreferences';
import FinalReview from './FormSteps/FinalPreview';
import { resetWebsiteCreation } from '../../redux/slice/websiteCreationSlice';
import { useSubmitWebsiteCreation, getReadableErrorMessage } from '../../hooks/useSubmitWebsiteCreation';

const STEPS = [
  { id: 1, title: 'Business Details', shortTitle: 'Business' },
  { id: 2, title: 'Project Details', shortTitle: 'Project' },
  { id: 3, title: 'Website Requirement', shortTitle: 'Requirements' },
  { id: 4, title: 'Assess Requirement', shortTitle: 'Assessment' },
  { id: 5, title: 'Website Style Preferences', shortTitle: 'Style' },
  { id: 6, title: 'Final Review', shortTitle: 'Review' }
];

type FileRegistry = Record<string, File>;


export default function Form() {
  const [currentStep, setCurrentStep] = useState(1);
  const [draftSavedToast, setDraftSavedToast] = useState(false);

  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.websiteCreation);
  const { mutate: submitWebsite, isPending: isSubmitting, error: submitRawError, reset: resetMutationError } = useSubmitWebsiteCreation();

  const [fileRegistry, setFileRegistry] = useState<FileRegistry>({});

  const addFile = (id: string, file: File) => {
    setFileRegistry(prev => ({
      ...prev,
      [id]: file
    }));
  };

  const removeFile = (id: string) => {
    setFileRegistry(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const moveToNextStep = () => {
    if ((currentStep + 1) <= 6)
      setCurrentStep((step) => step + 1);

  };

  const prevStep = () => {
    if ((currentStep - 1) > 0)
      setCurrentStep((step) => step - 1)
  }

  const handleFinalSubmit = () => {
    resetMutationError();
    submitWebsite(
      { formData: data, fileRegistry },
      {
        onSuccess: () => {
          dispatch(resetWebsiteCreation());
          setFileRegistry({});
        },
      }
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <BusinessDetails
            handleNextStep={moveToNextStep}
          />
        );
      case 2:
        return (
          <ProjectDetails
            handleNextStep={moveToNextStep}
            handlePrevStep={prevStep}
          />
        );

      case 3:
        return (
          <WebsiteRequirement
            handleNextStep={moveToNextStep}
            handlePrevStep={prevStep}
          />
        );

      case 4:
        return (
          <AssessRequirement
            handleNextStep={moveToNextStep}
            handlePrevStep={prevStep}
            fileRegistry={fileRegistry}
            addFile={addFile}
            removeFile={removeFile}
          />
        );

      case 5:
        return (
          <WebsiteStylePreferences
            handleNextStep={moveToNextStep}
            handlePrevStep={prevStep}
          />
        );
      case 6:
        return (
          <FinalReview
            handleNextStep={handleFinalSubmit}
            fileRegistry={fileRegistry}
            isSubmitting={isSubmitting}
            submitError={submitRawError ? getReadableErrorMessage(submitRawError) : null}
          />
        );
      default:
        return <div><h1>Step {currentStep}</h1>
          <button onClick={moveToNextStep}>Next</button>
        </div>;
    }
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
              onClick={() => { }}
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
                          className={`h-full transition-all duration-300 ${isCompleted ? 'w-full bg-[#4F46E5]' : 'w-0'
                            }`}
                        />
                      </div>
                    )}

                    {/* Step Circle Badge */}
                    <div className="relative z-10 flex items-center gap-2 mb-2.5">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${isActive
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
                        className={`text-[11px] font-semibold uppercase tracking-wider block ${isActive ? 'text-[#4F46E5]' : 'text-[#94A3B8]'
                          }`}
                      >
                        Step {step.id}
                      </span>
                      <span
                        className={`text-xs font-semibold leading-snug block mt-0.5 ${isActive
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
        <div>
          {
            renderStepContent()
          }
        </div>
      </main>
    </div>
  );
}