import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Layers, Plus, X, FileText, ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';
import { WebsiteRequirementSchemaValidation } from '../../../schema/validationSchema';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { setWebsiteRequirements } from '../../../redux/slice/websiteCreationSlice';

export interface PageRequirement {
  id: string;
  name: string;
  purpose: string;
}

export interface WebsiteRequirementData {
  pages: PageRequirement[];
}

interface PropsType {
  handleNextStep?: () => void;
  handlePrevStep?: () => void;
}


const WebsiteRequirement = (props: PropsType) => {
  const [pageInput, setPageInput] = useState('');
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [badgeError, setBadgeError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const savedWebsiteRequirements = useAppSelector((state) => state.websiteCreation.websiteRequirements);

  const formik = useFormik<WebsiteRequirementData>({
    initialValues: savedWebsiteRequirements ?? {
      pages: [
        {
          id: 'home-initial',
          name: 'Home',
          purpose: '',
        },
      ],
    },
    validationSchema: WebsiteRequirementSchemaValidation,
    onSubmit: (values) => {
      dispatch(setWebsiteRequirements(values))
      if (props.handleNextStep) {
        props.handleNextStep();
      }
    },
  });

  const { values, errors, touched, handleSubmit, setFieldValue, setFieldTouched } = formik;

  const activePage =
    values.pages.find((p) => p.id === selectedPageId) || values.pages[0] || null;

  const handleAddPage = () => {
    const trimmedName = pageInput.trim();

    if (!trimmedName) {
      setBadgeError('Enter a page name before clicking Add.');
      return;
    }

    const isDuplicate = values.pages.some(
      (page) => page.name.toLowerCase() === trimmedName.toLowerCase()
    );
    if (isDuplicate) {
      setBadgeError(`"${trimmedName}" has already been added.`);
      return;
    }

    const newPage: PageRequirement = {
      id: `${trimmedName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      name: trimmedName,
      purpose: '',
    };

    const updatedPages = [...values.pages, newPage];
    setFieldValue('pages', updatedPages);
    setFieldTouched('pages', true, false);
    setSelectedPageId(newPage.id);
    setPageInput('');
    setBadgeError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddPage();
    }
  };

  const handleRemovePage = (pageId: string) => {
    const filteredPages = values.pages.filter((page) => page.id !== pageId);
    setFieldValue('pages', filteredPages);
    setFieldTouched('pages', true, false);

    if (selectedPageId === pageId) {
      setSelectedPageId(filteredPages[0]?.id ?? null);
    }
  };

  const handlePurposeChange = (pageId: string, purposeValue: string) => {
    const updatedPages = values.pages.map((page) =>
      page.id === pageId ? { ...page, purpose: purposeValue } : page
    );
    setFieldValue('pages', updatedPages);
    setFieldTouched('pages', true, false);
  };

  const activePageError =
    activePage && Array.isArray(errors.pages)
      ? (errors.pages[values.pages.findIndex((p) => p.id === activePage.id)] as
        | { name?: string; purpose?: string }
        | undefined)
      : undefined;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl shadow-xs overflow-hidden"
    >
      <div className="px-6 py-6 sm:px-8 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4F46E5] mb-1.5">
          <span>Step 3 of 6</span>
          <span className="text-[#94A3B8]">•</span>
          <span>Site Architecture</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
          Website Requirement
        </h1>
        <p className="text-sm text-[#475569] mt-1">
          Add the pages you want generated and describe what each page should accomplish.
        </p>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        <section aria-labelledby="section-pages-to-generate">
          <div className="mb-4">
            <h2
              id="section-pages-to-generate"
              className="text-base font-semibold text-[#0F172A] flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-[#4F46E5]" />
              <span>
                Pages to Generate <span className="text-[#4F46E5]">*</span>
              </span>
            </h2>
            <p className="text-xs text-[#475569] mt-0.5">
              Type a page name and click Add to display it as a badge below, then describe its purpose.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label htmlFor="pageNameInput" className="sr-only">
                Page Name
              </label>
              <input
                id="pageNameInput"
                name="pageNameInput"
                type="text"
                value={pageInput}
                onChange={(e) => {
                  setPageInput(e.target.value);
                  if (badgeError) setBadgeError(null);
                }}
                onKeyDown={handleKeyDown}
                placeholder="e.g., About Us, Services, Pricing, Contact"
                className="block w-full px-3.5 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] bg-[#FFFFFF] rounded-lg border border-[#E2E8F0] transition-colors focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15"
              />
            </div>

            <button
              type="button"
              onClick={handleAddPage}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>

          {badgeError && (
            <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{badgeError}</span>
            </p>
          )}

          <div className="mt-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 sm:p-5 space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#475569]">
                  Added Pages ({values.pages.length})
                </span>
                {values.pages.length > 0 && (
                  <span className="text-xs text-[#94A3B8]">
                    Click a badge to edit its purpose
                  </span>
                )}
              </div>

              {values.pages.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {values.pages.map((page) => {
                    const isSelected = activePage?.id === page.id;

                    return (
                      <div
                        key={page.id}
                        className={`inline-flex items-center gap-1.5 rounded-full border pl-3.5 pr-2 py-1.5 text-xs font-semibold transition-all ${isSelected
                            ? 'bg-[#4F46E5] text-white border-[#4F46E5] shadow-xs'
                            : 'bg-[#FFFFFF] text-[#0F172A] border-[#E2E8F0] hover:border-[#4F46E5]/50'
                          }`}
                      >
                        <button
                          type="button"
                          onClick={() => setSelectedPageId(page.id)}
                          className="focus:outline-none cursor-pointer"
                        >
                          {page.name}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemovePage(page.id)}
                          aria-label={`Remove ${page.name}`}
                          className={`p-0.5 rounded-full transition-colors cursor-pointer ${isSelected
                              ? 'hover:bg-white/20 text-white'
                              : 'hover:bg-slate-100 text-[#475569]'
                            }`}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-[#94A3B8]">
                  No pages added yet. Use the input above to add pages.
                </p>
              )}
            </div>

            {activePage && (
              <div className="pt-4 border-t border-[#E2E8F0]">
                <label
                  htmlFor="pagePurpose"
                  className="text-sm font-medium text-[#0F172A] mb-1.5 flex items-center gap-1.5"
                >
                  <FileText className="w-4 h-4 text-[#4F46E5]" />
                  <span>
                    Purpose of <span className="text-[#4F46E5] font-semibold">{activePage.name}</span> Page{' '}
                    <span className="text-[#4F46E5]">*</span>
                  </span>
                </label>
                <textarea
                  id="pagePurpose"
                  name="pagePurpose"
                  rows={3}
                  value={activePage.purpose}
                  onChange={(e) => handlePurposeChange(activePage.id, e.target.value)}
                  placeholder={`Describe what visitors should find or do on the "${activePage.name}" page...`}
                  className={`block w-full px-3.5 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] bg-[#FFFFFF] rounded-lg border transition-colors focus:outline-none focus:ring-2 resize-y ${touched.pages && activePageError?.purpose
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-500/15'
                      : 'border-[#E2E8F0] focus:border-[#4F46E5] focus:ring-[#4F46E5]/15'
                    }`}
                />
                {touched.pages && activePageError?.purpose && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{activePageError.purpose}</span>
                  </p>
                )}
              </div>
            )}
          </div>

          {touched.pages && typeof errors.pages === 'string' && (
            <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.pages}</span>
            </p>
          )}
        </section>
      </div>

      <div className="bg-[#F8FAFC] border-t border-[#E2E8F0] px-6 py-4 sm:px-8 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <button
          type="button"
          onClick={props.handlePrevStep}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-[#0F172A] bg-[#FFFFFF] hover:bg-slate-100 border border-[#E2E8F0] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20"
        >
          <ChevronLeft className="w-4 h-4 text-[#475569]" />
          <span>Back to Project Details</span>
        </button>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <span className="text-xs text-[#94A3B8] text-center sm:text-right">
            Required fields marked with <span className="text-[#4F46E5] font-semibold">*</span>
          </span>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
          >
            <span>Save & Continue to Assessment</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default WebsiteRequirement;