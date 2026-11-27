import { useFormik } from 'formik';
import { FolderKanban, LayoutGrid, FileText, ExternalLink, ChevronRight, ChevronLeft, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { WEBSITE_TYPES } from '../../../constants/projectFormData';
import { ProjectDetailsSchemaValidation } from '../../../schema/validationSchema';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { setProjectDetails } from '../../../redux/slice/websiteCreationSlice';

export interface ProjectDetailsData {
    websiteType: string;
    customWebsiteType: string;
    websiteDescription: string;
    referenceWebsite: string;
}

interface PropsType {
    handleNextStep?: () => void;
    handlePrevStep?: () => void;
}

const ProjectDetails = (props: PropsType) => {

    const dispatch = useAppDispatch();
    const savedProjectDetails = useAppSelector((state) => state.websiteCreation.projectDetails);

    const formik = useFormik<ProjectDetailsData>({
        initialValues: savedProjectDetails ?? {
            websiteType: '',
            customWebsiteType: '',
            websiteDescription: '',
            referenceWebsite: '',
        },

        enableReinitialize: true,
        validationSchema: ProjectDetailsSchemaValidation,
        onSubmit: (values) => {
            const payload: ProjectDetailsData = {
                ...values,
                customWebsiteType: values.websiteType === 'custom' ? values.customWebsiteType : '',
            };
            dispatch(setProjectDetails(payload));
            if (props.handleNextStep) props.handleNextStep();
        },
    });

    const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, setFieldTouched } = formik;

    const handleSelectWebsiteType = (typeId: string) => {
        setFieldValue('websiteType', typeId);
        setFieldTouched('websiteType', true, false);
        if (typeId !== 'custom') {
            setFieldValue('customWebsiteType', '');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl shadow-xs overflow-hidden"
        >

            <div className="px-6 py-6 sm:px-8 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4F46E5] mb-1.5">
                    <span>Step 2 of 6</span>
                    <span className="text-[#94A3B8]">•</span>
                    <span>Scope & Vision</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
                    Project Details
                </h1>
                <p className="text-sm text-[#475569] mt-1">
                    Define the category, core purpose, and visual inspiration for your website so our AI can structure the right pages and layout.
                </p>
            </div>


            <div className="p-6 sm:p-8 space-y-8">

                <section aria-labelledby="section-website-type">
                    <div className="mb-4">
                        <h2
                            id="section-website-type"
                            className="text-base font-semibold text-[#0F172A] flex items-center gap-2"
                        >
                            <LayoutGrid className="w-4 h-4 text-[#4F46E5]" />
                            <span>
                                Website Type <span className="text-[#4F46E5]">*</span>
                            </span>
                        </h2>
                        <p className="text-xs text-[#475569] mt-0.5">
                            Choose the category that best matches your primary goal.
                        </p>
                    </div>

                    <div
                        role="radiogroup"
                        aria-labelledby="section-website-type"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5"
                    >
                        {WEBSITE_TYPES.map((type) => {
                            const isSelected = values.websiteType === type.id;

                            return (
                                <button
                                    key={type.id}
                                    type="button"
                                    role="radio"
                                    aria-checked={isSelected}
                                    onClick={() => handleSelectWebsiteType(type.id)}
                                    className={`text-left p-4 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 ${isSelected
                                            ? 'bg-[#4F46E5]/[0.04] border-[#4F46E5] ring-1 ring-[#4F46E5]'
                                            : 'bg-[#FFFFFF] border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-slate-300'
                                        }`}
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <span
                                            className={`text-sm font-semibold ${isSelected ? 'text-[#4F46E5]' : 'text-[#0F172A]'
                                                }`}
                                        >
                                            {type.label}
                                        </span>
                                        <CheckCircle2
                                            className={`w-4 h-4 shrink-0 mt-0.5 transition-opacity ${isSelected ? 'text-[#4F46E5] opacity-100' : 'text-[#94A3B8] opacity-30'
                                                }`}
                                        />
                                    </div>
                                    <p className="text-xs text-[#475569] mt-1.5 leading-relaxed">
                                        {type.description}
                                    </p>
                                </button>
                            );
                        })}
                    </div>

                    {touched.websiteType && errors.websiteType && (
                        <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{errors.websiteType}</span>
                        </p>
                    )}


                    {values.websiteType === 'custom' && (
                        <div className="mt-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 sm:p-5">
                            <label
                                htmlFor="customWebsiteType"
                                className="block text-sm font-medium text-[#0F172A] mb-1.5"
                            >
                                Custom Website Type <span className="text-[#4F46E5]">*</span>
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3.5 flex items-center">
                                    <Sparkles className="h-4 w-4 text-[#4F46E5]" />
                                </div>
                                <input
                                    id="customWebsiteType"
                                    name="customWebsiteType"
                                    type="text"
                                    required
                                    value={values.customWebsiteType}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="e.g., Non-profit Donation Portal, Real Estate Directory, Online Course Hub"
                                    className={`block w-full pl-10 pr-3.5 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] bg-[#FFFFFF] rounded-lg border transition-colors focus:outline-none focus:ring-2 ${touched.customWebsiteType && errors.customWebsiteType
                                            ? 'border-red-400 focus:border-red-500 focus:ring-red-500/15'
                                            : 'border-[#E2E8F0] focus:border-[#4F46E5] focus:ring-[#4F46E5]/15'
                                        }`}
                                />
                            </div>
                            {touched.customWebsiteType && errors.customWebsiteType && (
                                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                    <span>{errors.customWebsiteType}</span>
                                </p>
                            )}
                        </div>
                    )}
                </section>

                <hr className="border-[#E2E8F0]" />


                <section aria-labelledby="section-website-description">
                    <div className="mb-4">
                        <h2
                            id="section-website-description"
                            className="text-base font-semibold text-[#0F172A] flex items-center gap-2"
                        >
                            <FileText className="w-4 h-4 text-[#4F46E5]" />
                            <span>Project Overview</span>
                        </h2>
                        <p className="text-xs text-[#475569] mt-0.5">
                            Summarize what your business offers, key goals for visitors, and any must-have sections.
                        </p>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label
                                htmlFor="websiteDescription"
                                className="block text-sm font-medium text-[#0F172A]"
                            >
                                Website Description <span className="text-[#4F46E5]">*</span>
                            </label>
                            <span className="text-xs text-[#94A3B8]">
                                {values.websiteDescription.length} characters
                            </span>
                        </div>
                        <textarea
                            id="websiteDescription"
                            name="websiteDescription"
                            rows={4}
                            required
                            value={values.websiteDescription}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="e.g., We are a boutique architectural firm looking to showcase residential projects, highlight our design process, and let prospective clients book a discovery consultation..."
                            className={`block w-full px-3.5 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] bg-[#FFFFFF] rounded-lg border transition-colors focus:outline-none focus:ring-2 resize-y ${touched.websiteDescription && errors.websiteDescription
                                    ? 'border-red-400 focus:border-red-500 focus:ring-red-500/15'
                                    : 'border-[#E2E8F0] focus:border-[#4F46E5] focus:ring-[#4F46E5]/15'
                                }`}
                        />
                        {touched.websiteDescription && errors.websiteDescription ? (
                            <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                <span>{errors.websiteDescription}</span>
                            </p>
                        ) : (
                            <p className="mt-1.5 text-xs text-[#94A3B8]">
                                Tip: Mention your primary call-to-action (e.g., &ldquo;Book a Call&rdquo;, &ldquo;Shop Now&rdquo;, or &ldquo;Request a Quote&rdquo;).
                            </p>
                        )}
                    </div>
                </section>

                <hr className="border-[#E2E8F0]" />


                <section aria-labelledby="section-reference-website">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2
                                id="section-reference-website"
                                className="text-base font-semibold text-[#0F172A] flex items-center gap-2"
                            >
                                <FolderKanban className="w-4 h-4 text-[#4F46E5]" />
                                <span>Reference Website</span>
                            </h2>
                            <p className="text-xs text-[#475569] mt-0.5">
                                Share a link or describe a site whose structure, layout, or vibe you admire.
                            </p>
                        </div>
                        <span className="text-xs font-medium text-[#94A3B8] bg-[#F8FAFC] border border-[#E2E8F0] px-2.5 py-1 rounded-md">
                            Optional
                        </span>
                    </div>

                    <div>
                        <label
                            htmlFor="referenceWebsite"
                            className="block text-sm font-medium text-[#0F172A] mb-1.5"
                        >
                            Reference Description or URL
                        </label>
                        <div className="relative">
                            <div className="pointer-events-none absolute top-3 left-3.5 flex items-center">
                                <ExternalLink className="h-4 w-4 text-[#94A3B8]" />
                            </div>
                            <textarea
                                id="referenceWebsite"
                                name="referenceWebsite"
                                rows={3}
                                value={values.referenceWebsite}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="e.g., https://linear.app — Love the clean dark/light contrast, clear hero headline, and structured feature grid."
                                className="block w-full pl-10 pr-3.5 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] bg-[#FFFFFF] rounded-lg border border-[#E2E8F0] transition-colors focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15 resize-y"
                            />
                        </div>
                        <p className="mt-1.5 text-xs text-[#94A3B8]">
                            You can paste one or more URLs, describe what you like about them, or both.
                        </p>
                    </div>
                </section>
            </div>

            <div className="bg-[#F8FAFC] border-t border-[#E2E8F0] px-6 py-4 sm:px-8 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                    type="button"
                    onClick={props.handlePrevStep}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-[#0F172A] bg-[#FFFFFF] hover:bg-slate-100 border border-[#E2E8F0] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20"
                >
                    <ChevronLeft className="w-4 h-4 text-[#475569]" />
                    <span>Back to Business Details</span>
                </button>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <span className="text-xs text-[#94A3B8] text-center sm:text-right">
                        Required fields marked with <span className="text-[#4F46E5] font-semibold">*</span>
                    </span>
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
                    >
                        <span>Save & Continue to Requirements</span>
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ProjectDetails;