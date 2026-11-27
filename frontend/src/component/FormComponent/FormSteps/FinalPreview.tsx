import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  Building2,
  FolderKanban,
  Layers,
  FolderUp,
  Palette,
  ChevronLeft,
  Sparkles,
  Image as ImageIcon,
  FileText,
  Globe,
  Lock,
} from 'lucide-react';
import { useAppSelector } from '../../../hooks/useRedux';
import { isImageFile } from '../../../utils';

interface PropsType {
  handleNextStep?: () => void;
  handlePrevStep?: () => void;
  fileRegistry?: Record<string, File>;
  isSubmitting?: boolean;
  submitError?: string | null;
}

const formatFileSize = (bytes?: number): string => {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

const ReadOnlyField = ({
  label,
  value,
  fullWidth = false,
}: {
  label: string;
  value?: string | null;
  fullWidth?: boolean;
}) => {
  const displayValue = value && value.trim().length > 0 ? value : 'Not provided';
  const isEmpty = !value || value.trim().length === 0;

  return (
    <div className={fullWidth ? 'md:col-span-2 lg:col-span-3' : ''}>
      <span className="block text-xs font-medium text-[#475569] mb-1">
        {label}
      </span>
      <div
        className={`px-3.5 py-2.5 text-sm rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] break-words ${isEmpty ? 'text-[#94A3B8] italic' : 'text-[#0F172A] font-medium'
          }`}
      >
        {displayValue}
      </div>
    </div>
  );
};

const ColorSwatch = ({ label, hex }: { label: string; hex?: string }) => {
  const validHex = hex && /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex) ? hex : null;

  return (
    <div>
      <span className="block text-xs font-medium text-[#475569] mb-1">
        {label}
      </span>
      <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC]">
        <span
          className="w-5 h-5 rounded-md border border-[#E2E8F0] shrink-0"
          style={{ backgroundColor: validHex ?? '#E2E8F0' }}
        />
        <span
          className={`text-sm ${validHex ? 'text-[#0F172A] font-medium' : 'text-[#94A3B8] italic'
            }`}
        >
          {validHex ? validHex.toUpperCase() : 'Not provided'}
        </span>
      </div>
    </div>
  );
};

const FinalReview = (props: PropsType) => {
  const {
    businessDetails,
    projectDetails,
    websiteRequirements,
    assetsRequirements,
    websiteStylePreferences,
  } = useAppSelector((state) => state.websiteCreation);

  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const logoId = assetsRequirements?.brandLogo?.id;
    const logoFile = logoId && props.fileRegistry ? props.fileRegistry[logoId] : null;

    if (!logoFile || !isImageFile(logoFile)) {
      setLogoPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(logoFile);
    setLogoPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [assetsRequirements?.brandLogo?.id, props.fileRegistry]);

  const effectiveWhatsapp = businessDetails?.sameAsContact
    ? businessDetails.contactNumber
    : businessDetails?.whatsappNumber;

  const formattedAddress = businessDetails?.address
    ? [
      businessDetails.address.street,
      businessDetails.address.city,
      businessDetails.address.state,
      businessDetails.address.postalCode,
      businessDetails.address.country,
    ]
      .filter((part) => part && part.trim().length > 0)
      .join(', ')
    : '';

  const pages = websiteRequirements?.pages ?? [];
  const uploadedAssets = assetsRequirements?.assets ?? [];
  const design = websiteStylePreferences?.design;
  const referenceWebsites = design?.referenceWebsites ?? [];

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (props.handleNextStep) {
      props.handleNextStep();
    }
  };

  return (
    <form
      onSubmit={handleFinalSubmit}
      className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl shadow-xs overflow-hidden"
    >
      {/* Card Header */}
      <div className="px-6 py-6 sm:px-8 border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4F46E5] mb-1.5">
            <span>Step 6 of 6</span>
            <span className="text-[#94A3B8]">•</span>
            <span>Summary & Confirmation</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
            Final Review
          </h1>
          <p className="text-sm text-[#475569] mt-1">
            Review all submitted details below before generating your website. Fields are read-only here—use Back to make any edits.
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 self-start sm:self-center text-xs font-medium text-[#475569] bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-1.5 rounded-full shrink-0">
          <Lock className="w-3.5 h-3.5 text-[#4F46E5]" />
          <span>Read-Only Preview</span>
        </span>
      </div>

      {/* Review Body */}
      <div className="p-6 sm:p-8 space-y-8">
        {/* 1. Business Details */}
        <section aria-labelledby="review-business-details">
          <div className="mb-4">
            <h2
              id="review-business-details"
              className="text-base font-semibold text-[#0F172A] flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-[#4F46E5]" />
              <span>1. Business Details</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ReadOnlyField label="Business Name" value={businessDetails?.businessName} />
            <ReadOnlyField label="Owner Name" value={businessDetails?.ownerName} />
            <ReadOnlyField label="Email Address" value={businessDetails?.email} />
            <ReadOnlyField label="Contact Number" value={businessDetails?.contactNumber} />
            <ReadOnlyField
              label={
                businessDetails?.sameAsContact
                  ? 'WhatsApp Number (Same as Contact)'
                  : 'WhatsApp Number'
              }
              value={effectiveWhatsapp}
            />
            <ReadOnlyField label="Target Audience" value={businessDetails?.targetAudience} />
            <ReadOnlyField label="Full Address" value={formattedAddress} fullWidth />
            <ReadOnlyField label="Instagram" value={businessDetails?.socialLinks?.instagram} />
            <ReadOnlyField label="Facebook" value={businessDetails?.socialLinks?.facebook} />
            <ReadOnlyField label="YouTube" value={businessDetails?.socialLinks?.youtube} />
          </div>
        </section>

        <hr className="border-[#E2E8F0]" />

        {/* 2. Project Details */}
        <section aria-labelledby="review-project-details">
          <div className="mb-4">
            <h2
              id="review-project-details"
              className="text-base font-semibold text-[#0F172A] flex items-center gap-2"
            >
              <FolderKanban className="w-4 h-4 text-[#4F46E5]" />
              <span>2. Project Details</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ReadOnlyField label="Website Type" value={projectDetails?.websiteType} />
            <ReadOnlyField
              label="Custom Website Type"
              value={
                projectDetails?.websiteType === 'custom'
                  ? projectDetails?.customWebsiteType
                  : 'N/A'
              }
            />
            <div className="md:col-span-2">
              <ReadOnlyField
                label="Website Description"
                value={projectDetails?.websiteDescription}
              />
            </div>
            <div className="md:col-span-2">
              <ReadOnlyField
                label="Reference Website (Description or URL)"
                value={projectDetails?.referenceWebsite}
              />
            </div>
          </div>
        </section>

        <hr className="border-[#E2E8F0]" />

        {/* 3. Website Requirement */}
        <section aria-labelledby="review-website-requirement">
          <div className="mb-4">
            <h2
              id="review-website-requirement"
              className="text-base font-semibold text-[#0F172A] flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-[#4F46E5]" />
              <span>3. Website Requirement ({pages.length} {pages.length === 1 ? 'Page' : 'Pages'})</span>
            </h2>
          </div>

          {pages.length > 0 ? (
            <div className="space-y-3">
              {pages.map((page, index) => (
                <div
                  key={page.id || `${page.name}-${index}`}
                  className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#4F46E5]/10 text-[#4F46E5]">
                      {page.name || `Page ${index + 1}`}
                    </span>
                  </div>
                  <p
                    className={`text-sm ${page.purpose?.trim()
                      ? 'text-[#0F172A]'
                      : 'text-[#94A3B8] italic'
                      }`}
                  >
                    {page.purpose?.trim() || 'No page purpose described'}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#94A3B8] italic">No pages added.</p>
          )}
        </section>

        <hr className="border-[#E2E8F0]" />

        {/* 4. Assess Requirement */}
        <section aria-labelledby="review-assess-requirement">
          <div className="mb-4">
            <h2
              id="review-assess-requirement"
              className="text-base font-semibold text-[#0F172A] flex items-center gap-2"
            >
              <FolderUp className="w-4 h-4 text-[#4F46E5]" />
              <span>4. Assess Requirement</span>
            </h2>
          </div>

          <div className="space-y-4">
            {/* Brand Logo */}
            <div>
              <span className="block text-xs font-medium text-[#475569] mb-1.5">
                Brand Logo
              </span>
              {assetsRequirements?.brandLogo ? (
                <div className="flex items-center gap-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
                  {logoPreviewUrl ? (
                    <img
                      src={logoPreviewUrl}
                      alt="Brand logo preview"
                      className="w-12 h-12 rounded-lg object-contain bg-[#FFFFFF] border border-[#E2E8F0] p-1 shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-[#FFFFFF] border border-[#E2E8F0] flex items-center justify-center text-[#4F46E5] shrink-0">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#0F172A] truncate">
                      {assetsRequirements.brandLogo.name}
                    </p>
                    <p className="text-xs text-[#475569]">
                      {formatFileSize(assetsRequirements.brandLogo.size)} •{' '}
                      {assetsRequirements.brandLogo.type || 'Image'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="px-3.5 py-2.5 text-sm text-[#94A3B8] italic rounded-lg border border-[#E2E8F0] bg-[#F8FAFC]">
                  No brand logo uploaded
                </div>
              )}
            </div>

            {/* Supporting Files */}
            <div>
              <span className="block text-xs font-medium text-[#475569] mb-1.5">
                Supporting Assets ({uploadedAssets.length})
              </span>
              {uploadedAssets.length > 0 ? (
                <div className="space-y-2.5">
                  {uploadedAssets.map((asset) => (
                    <div
                      key={asset.id}
                      className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-[#FFFFFF] border border-[#E2E8F0] flex items-center justify-center text-[#4F46E5] shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#0F172A] truncate">
                            {asset.name}
                          </p>
                          <p className="text-xs text-[#475569]">
                            {formatFileSize(asset.size)} • {asset.type || 'File'}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-[#475569] sm:text-right break-words">
                        {asset.notes?.trim() ? `Note: ${asset.notes}` : 'No file note'}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-3.5 py-2.5 text-sm text-[#94A3B8] italic rounded-lg border border-[#E2E8F0] bg-[#F8FAFC]">
                  No supporting files uploaded
                </div>
              )}
            </div>

            {/* General Notes About Uploaded Files */}
            <ReadOnlyField
              label="Information About Uploaded Files"
              value={assetsRequirements?.filesInfo}
            />
          </div>
        </section>

        <hr className="border-[#E2E8F0]" />

        {/* 5. Website Style Preferences */}
        <section aria-labelledby="review-style-preferences">
          <div className="mb-4">
            <h2
              id="review-style-preferences"
              className="text-base font-semibold text-[#0F172A] flex items-center gap-2"
            >
              <Palette className="w-4 h-4 text-[#4F46E5]" />
              <span>5. Website Style Preferences</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ReadOnlyField label="Visual Style" value={design?.visualStyle} />
            <ReadOnlyField label="Design System" value={design?.designSystem} />
            <ReadOnlyField label="Font Preference" value={design?.fontPreference} />
            <ColorSwatch label="Primary Color" hex={design?.primaryColor} />
            <ColorSwatch label="Secondary Color" hex={design?.secondaryColor} />
          </div>

          <div className="mt-4">
            <span className="block text-xs font-medium text-[#475569] mb-1.5">
              Reference Websites
            </span>
            {referenceWebsites.length > 0 ? (
              <div className="flex flex-wrap gap-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
                {referenceWebsites.map((url) => (
                  <span
                    key={url}
                    className="inline-flex items-center gap-1.5 bg-[#FFFFFF] text-[#0F172A] border border-[#E2E8F0] rounded-full px-3 py-1 text-xs font-medium"
                  >
                    <Globe className="w-3.5 h-3.5 text-[#4F46E5]" />
                    <span>{url}</span>
                  </span>
                ))}
              </div>
            ) : (
              <div className="px-3.5 py-2.5 text-sm text-[#94A3B8] italic rounded-lg border border-[#E2E8F0] bg-[#F8FAFC]">
                No reference websites added
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Footer Actions */}
      <div className="bg-[#F8FAFC] border-t border-[#E2E8F0] px-6 py-4 sm:px-8 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <button
          type="button"
          onClick={props.handlePrevStep}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-[#0F172A] bg-[#FFFFFF] hover:bg-slate-100 border border-[#E2E8F0] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 text-[#475569]" />
          <span>Back to Edit</span>
        </button>

        <button
          type="submit"
          disabled={props.isSubmitting}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] disabled:opacity-60 disabled:cursor-not-allowed rounded-lg shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>{props.isSubmitting ? 'Submitting...' : 'Confirm & Generate Website'}</span>
        </button>
      </div>
      {props.submitError && (
        <div className="mx-6 sm:mx-8 mt-6 p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs sm:text-sm text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{props.submitError}</span>
        </div>
      )}
    </form>
  );
};

export default FinalReview;