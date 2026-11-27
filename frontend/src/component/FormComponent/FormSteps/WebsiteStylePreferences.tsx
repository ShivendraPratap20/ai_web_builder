import { useState } from 'react';
import { useFormik } from 'formik';
import { Palette, Layers, Type, Globe, Plus, X, ChevronRight, ChevronLeft, AlertCircle, CheckCircle2 } from 'lucide-react';
import { WebsiteStylePreferencesSchemaValidation } from '../../../schema/validationSchema';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { setWebsiteStylePreferences } from '../../../redux/slice/websiteCreationSlice';

export type VisualStyleOption =
  | 'minimal'
  | 'professional'
  | 'modern'
  | 'creative'
  | 'luxury'
  | 'playful'
  | 'custom';

export type DesignSystemOption =
  | 'material-ui'
  | 'neumorphism'
  | 'claymorphism'
  | 'none';

export interface DesignPreferences {
  visualStyle: VisualStyleOption;
  designSystem?: DesignSystemOption;
  primaryColor?: string;
  secondaryColor?: string;
  fontPreference?: string;
  referenceWebsites?: string[];
}

export interface WebsiteStylePreferencesData {
  design: DesignPreferences;
}

interface PropsType {
  handleNextStep?: () => void;
  handlePrevStep?: () => void;
}

const VISUAL_STYLES: {
  id: VisualStyleOption;
  label: string;
  description: string;
}[] = [
    {
      id: 'minimal',
      label: 'Minimal',
      description: 'Clean whitespace, restrained typography, and uncluttered focus.',
    },
    {
      id: 'professional',
      label: 'Professional',
      description: 'Structured layout, trustworthy hierarchy, and corporate polish.',
    },
    {
      id: 'modern',
      label: 'Modern',
      description: 'Crisp cards, subtle depth, balanced grids, and contemporary UI.',
    },
    {
      id: 'creative',
      label: 'Creative',
      description: 'Expressive layouts, dynamic framing, and bold visual rhythm.',
    },
    {
      id: 'luxury',
      label: 'Luxury',
      description: 'Refined spacing, editorial elegance, and high-craft presentation.',
    },
    {
      id: 'playful',
      label: 'Playful',
      description: 'Friendly rounded geometry, energetic accents, and approachable tone.',
    },
    {
      id: 'custom',
      label: 'Custom',
      description: 'Tailor colors, typography, and references to your own direction.',
    },
  ];

const DESIGN_SYSTEMS: {
  id: DesignSystemOption;
  label: string;
  description: string;
}[] = [
    {
      id: 'material-ui',
      label: 'Material UI',
      description: 'Elevation surfaces, crisp ripples, and structured component patterns.',
    },
    {
      id: 'neumorphism',
      label: 'Neumorphism',
      description: 'Soft extruded shadows blending elements into light surfaces.',
    },
    {
      id: 'claymorphism',
      label: 'Claymorphism',
      description: 'Soft inner/outer highlights and puffed, tactile rounded containers.',
    },
    {
      id: 'none',
      label: 'None',
      description: 'No rigid UI kit aesthetic; use clean custom styling.',
    },
  ];

const FONT_SUGGESTIONS = [
  'Inter',
  'Plus Jakarta Sans',
  'DM Sans',
  'Poppins',
  'Playfair Display',
  'JetBrains Mono',
];

const HEX_COLOR_REGEX = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

export

  const WebsiteStylePreferences = (props: PropsType) => {
    const [urlInput, setUrlInput] = useState('');
    const [urlError, setUrlError] = useState<string | null>(null);

    const dispatch = useAppDispatch();
    const savedStypePreferences = useAppSelector((state) => state.websiteCreation.websiteStylePreferences);


    const formik = useFormik<WebsiteStylePreferencesData>({
      initialValues: savedStypePreferences &&{
        design: {
          visualStyle: 'modern',
          designSystem: 'none',
          primaryColor: '#4F46E5',
          secondaryColor: '#F8FAFC',
          fontPreference: '',
          referenceWebsites: [],
        },
      },
      validationSchema: WebsiteStylePreferencesSchemaValidation,
      onSubmit: (values) => {
        dispatch(setWebsiteStylePreferences(values))
        if (props.handleNextStep) {
          props.handleNextStep();
        }
      },
    });

    const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      setFieldValue,
      setFieldTouched,
    } = formik;

    const designErrors = errors.design as
      | {
        visualStyle?: string;
        designSystem?: string;
        primaryColor?: string;
        secondaryColor?: string;
        fontPreference?: string;
      }
      | undefined;

    const designTouched = touched.design as
      | {
        visualStyle?: boolean;
        designSystem?: boolean;
        primaryColor?: boolean;
        secondaryColor?: boolean;
        fontPreference?: boolean;
      }
      | undefined;

    const referenceList = values.design.referenceWebsites ?? [];

    const handleAddReferenceUrl = () => {
      const trimmed = urlInput.trim();
      if (!trimmed) {
        setUrlError('Enter a website URL before clicking Add.');
        return;
      }

      const normalized = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

      try {
        new URL(normalized);
      } catch {
        setUrlError('Enter a valid URL (e.g., https://example.com).');
        return;
      }

      const isDuplicate = referenceList.some(
        (item) => item.toLowerCase() === normalized.toLowerCase()
      );
      if (isDuplicate) {
        setUrlError('This reference website is already in the list.');
        return;
      }

      setFieldValue('design.referenceWebsites', [...referenceList, normalized]);
      setUrlInput('');
      setUrlError(null);
    };

    const handleRemoveReferenceUrl = (targetUrl: string) => {
      setFieldValue(
        'design.referenceWebsites',
        referenceList.filter((item) => item !== targetUrl)
      );
    };

    const safePrimaryHex = HEX_COLOR_REGEX.test(values.design.primaryColor || '')
      ? (values.design.primaryColor as string)
      : '#4F46E5';

    const safeSecondaryHex = HEX_COLOR_REGEX.test(values.design.secondaryColor || '')
      ? (values.design.secondaryColor as string)
      : '#F8FAFC';

    return (
      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl shadow-xs overflow-hidden"
      >
        {/* Card Header */}
        <div className="px-6 py-6 sm:px-8 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4F46E5] mb-1.5">
            <span>Step 5 of 6</span>
            <span className="text-[#94A3B8]">•</span>
            <span>Visual Direction</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
            Website Style Preferences
          </h1>
          <p className="text-sm text-[#475569] mt-1">
            Choose the visual mood, design system, color palette, typography, and reference sites for your generated website.
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* 1. Visual Style */}
          <section aria-labelledby="section-visual-style">
            <div className="mb-4">
              <h2
                id="section-visual-style"
                className="text-base font-semibold text-[#0F172A] flex items-center gap-2"
              >
                <Palette className="w-4 h-4 text-[#4F46E5]" />
                <span>
                  Visual Style <span className="text-[#4F46E5]">*</span>
                </span>
              </h2>
              <p className="text-xs text-[#475569] mt-0.5">
                Select the overall aesthetic direction for your pages.
              </p>
            </div>

            <div
              role="radiogroup"
              aria-labelledby="section-visual-style"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5"
            >
              {VISUAL_STYLES.map((style) => {
                const isSelected = values.design.visualStyle === style.id;
                return (
                  <button
                    key={style.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => {
                      setFieldValue('design.visualStyle', style.id);
                      setFieldTouched('design.visualStyle', true, false);
                    }}
                    className={`text-left p-4 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 cursor-pointer ${isSelected
                        ? 'bg-[#4F46E5]/[0.04] border-[#4F46E5] ring-1 ring-[#4F46E5]'
                        : 'bg-[#FFFFFF] border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-slate-300'
                      }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span
                        className={`text-sm font-semibold ${isSelected ? 'text-[#4F46E5]' : 'text-[#0F172A]'
                          }`}
                      >
                        {style.label}
                      </span>
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 mt-0.5 transition-opacity ${isSelected
                            ? 'text-[#4F46E5] opacity-100'
                            : 'text-[#94A3B8] opacity-30'
                          }`}
                      />
                    </div>
                    <p className="text-xs text-[#475569] mt-1.5 leading-relaxed">
                      {style.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {designTouched?.visualStyle && designErrors?.visualStyle && (
              <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{designErrors.visualStyle}</span>
              </p>
            )}
          </section>

          <hr className="border-[#E2E8F0]" />

          {/* 2. Design System */}
          <section aria-labelledby="section-design-system">
            <div className="mb-4">
              <h2
                id="section-design-system"
                className="text-base font-semibold text-[#0F172A] flex items-center gap-2"
              >
                <Layers className="w-4 h-4 text-[#4F46E5]" />
                <span>Design System</span>
              </h2>
              <p className="text-xs text-[#475569] mt-0.5">
                Optional surface and component styling treatment.
              </p>
            </div>

            <div
              role="radiogroup"
              aria-labelledby="section-design-system"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5"
            >
              {DESIGN_SYSTEMS.map((system) => {
                const isSelected = (values.design.designSystem ?? 'none') === system.id;
                return (
                  <button
                    key={system.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => {
                      setFieldValue('design.designSystem', system.id);
                      setFieldTouched('design.designSystem', true, false);
                    }}
                    className={`text-left p-4 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 cursor-pointer ${isSelected
                        ? 'bg-[#4F46E5]/[0.04] border-[#4F46E5] ring-1 ring-[#4F46E5]'
                        : 'bg-[#FFFFFF] border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-slate-300'
                      }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span
                        className={`text-sm font-semibold ${isSelected ? 'text-[#4F46E5]' : 'text-[#0F172A]'
                          }`}
                      >
                        {system.label}
                      </span>
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 mt-0.5 transition-opacity ${isSelected
                            ? 'text-[#4F46E5] opacity-100'
                            : 'text-[#94A3B8] opacity-30'
                          }`}
                      />
                    </div>
                    <p className="text-xs text-[#475569] mt-1.5 leading-relaxed">
                      {system.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          <hr className="border-[#E2E8F0]" />

          {/* 3. Colors & Typography */}
          <section aria-labelledby="section-colors-fonts">
            <div className="mb-4">
              <h2
                id="section-colors-fonts"
                className="text-base font-semibold text-[#0F172A] flex items-center gap-2"
              >
                <Type className="w-4 h-4 text-[#4F46E5]" />
                <span>Colors & Typography</span>
              </h2>
              <p className="text-xs text-[#475569] mt-0.5">
                Customize accent and surface colors along with your preferred font family.
              </p>
            </div>

            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 sm:p-5 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Primary Color */}
                <div>
                  <label
                    htmlFor="design.primaryColor"
                    className="block text-sm font-medium text-[#0F172A] mb-1.5"
                  >
                    Primary Color
                  </label>
                  <div className="flex items-center gap-2.5">
                    <input
                      type="color"
                      aria-label="Primary color picker"
                      value={safePrimaryHex}
                      onChange={(e) =>
                        setFieldValue('design.primaryColor', e.target.value.toUpperCase())
                      }
                      className="w-11 h-10 p-1 rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] cursor-pointer shrink-0"
                    />
                    <input
                      id="design.primaryColor"
                      name="design.primaryColor"
                      type="text"
                      value={values.design.primaryColor ?? ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="#4F46E5"
                      className={`block w-full px-3.5 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] bg-[#FFFFFF] rounded-lg border transition-colors focus:outline-none focus:ring-2 ${designTouched?.primaryColor && designErrors?.primaryColor
                          ? 'border-red-400 focus:border-red-500 focus:ring-red-500/15'
                          : 'border-[#E2E8F0] focus:border-[#4F46E5] focus:ring-[#4F46E5]/15'
                        }`}
                    />
                  </div>
                  {designTouched?.primaryColor && designErrors?.primaryColor && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{designErrors.primaryColor}</span>
                    </p>
                  )}
                </div>

                {/* Secondary Color */}
                <div>
                  <label
                    htmlFor="design.secondaryColor"
                    className="block text-sm font-medium text-[#0F172A] mb-1.5"
                  >
                    Secondary Color
                  </label>
                  <div className="flex items-center gap-2.5">
                    <input
                      type="color"
                      aria-label="Secondary color picker"
                      value={safeSecondaryHex}
                      onChange={(e) =>
                        setFieldValue('design.secondaryColor', e.target.value.toUpperCase())
                      }
                      className="w-11 h-10 p-1 rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] cursor-pointer shrink-0"
                    />
                    <input
                      id="design.secondaryColor"
                      name="design.secondaryColor"
                      type="text"
                      value={values.design.secondaryColor ?? ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="#F8FAFC"
                      className={`block w-full px-3.5 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] bg-[#FFFFFF] rounded-lg border transition-colors focus:outline-none focus:ring-2 ${designTouched?.secondaryColor && designErrors?.secondaryColor
                          ? 'border-red-400 focus:border-red-500 focus:ring-red-500/15'
                          : 'border-[#E2E8F0] focus:border-[#4F46E5] focus:ring-[#4F46E5]/15'
                        }`}
                    />
                  </div>
                  {designTouched?.secondaryColor && designErrors?.secondaryColor && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{designErrors.secondaryColor}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Font Preference */}
              <div>
                <label
                  htmlFor="design.fontPreference"
                  className="block text-sm font-medium text-[#0F172A] mb-1.5"
                >
                  Font Preference
                </label>
                <input
                  id="design.fontPreference"
                  name="design.fontPreference"
                  type="text"
                  value={values.design.fontPreference ?? ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g., Inter, Plus Jakarta Sans, or Editorial Serif"
                  className="block w-full px-3.5 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] bg-[#FFFFFF] rounded-lg border border-[#E2E8F0] transition-colors focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15"
                />

                <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                  <span className="text-xs text-[#94A3B8] mr-1">Quick picks:</span>
                  {FONT_SUGGESTIONS.map((font) => {
                    const active = values.design.fontPreference === font;
                    return (
                      <button
                        key={font}
                        type="button"
                        onClick={() => setFieldValue('design.fontPreference', font)}
                        className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer ${active
                            ? 'bg-[#4F46E5] text-white border-[#4F46E5]'
                            : 'bg-[#FFFFFF] text-[#475569] border-[#E2E8F0] hover:bg-slate-100'
                          }`}
                      >
                        {font}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <hr className="border-[#E2E8F0]" />

          {/* 4. Reference Websites */}
          <section aria-labelledby="section-reference-websites-list">
            <div className="mb-4">
              <h2
                id="section-reference-websites-list"
                className="text-base font-semibold text-[#0F172A] flex items-center gap-2"
              >
                <Globe className="w-4 h-4 text-[#4F46E5]" />
                <span>Reference Websites</span>
              </h2>
              <p className="text-xs text-[#475569] mt-0.5">
                Add URLs of websites whose visual styling or layout you want the AI to reference.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label htmlFor="referenceWebsiteUrlInput" className="sr-only">
                  Reference Website URL
                </label>
                <input
                  id="referenceWebsiteUrlInput"
                  type="url"
                  value={urlInput}
                  onChange={(e) => {
                    setUrlInput(e.target.value);
                    if (urlError) setUrlError(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddReferenceUrl();
                    }
                  }}
                  placeholder="https://stripe.com"
                  className="block w-full px-3.5 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] bg-[#FFFFFF] rounded-lg border border-[#E2E8F0] transition-colors focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15"
                />
              </div>

              <button
                type="button"
                onClick={handleAddReferenceUrl}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add URL</span>
              </button>
            </div>

            {urlError && (
              <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{urlError}</span>
              </p>
            )}

            {referenceList.length > 0 && (
              <div className="mt-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 flex flex-wrap gap-2">
                {referenceList.map((siteUrl) => (
                  <span
                    key={siteUrl}
                    className="inline-flex items-center gap-1.5 bg-[#FFFFFF] text-[#0F172A] border border-[#E2E8F0] rounded-full pl-3.5 pr-2 py-1.5 text-xs font-medium"
                  >
                    <span className="truncate max-w-[260px]">{siteUrl}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveReferenceUrl(siteUrl)}
                      aria-label={`Remove ${siteUrl}`}
                      className="p-0.5 rounded-full text-[#475569] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Footer Actions */}
        <div className="bg-[#F8FAFC] border-t border-[#E2E8F0] px-6 py-4 sm:px-8 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <button
            type="button"
            onClick={props.handlePrevStep}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-[#0F172A] bg-[#FFFFFF] hover:bg-slate-100 border border-[#E2E8F0] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20"
          >
            <ChevronLeft className="w-4 h-4 text-[#475569]" />
            <span>Back to Assess Requirement</span>
          </button>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <span className="text-xs text-[#94A3B8] text-center sm:text-right">
              Required fields marked with <span className="text-[#4F46E5] font-semibold">*</span>
            </span>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
            >
              <span>Save & Continue to Final Review</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
    );
  };

export default WebsiteStylePreferences;