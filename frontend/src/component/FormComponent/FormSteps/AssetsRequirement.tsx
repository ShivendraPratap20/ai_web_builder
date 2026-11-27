import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { FolderUp, Image as ImageIcon, FileText, Upload, X, ChevronRight, ChevronLeft, AlertCircle, CheckCircle2 } from 'lucide-react';
import { isImageFile } from '../../../utils';
import { AssetsRequirementSchemaValidation } from '../../../schema/validationSchema';
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import { setAssetsRequirements } from "../../../redux/slice/websiteCreationSlice";

export interface UploadedAssetItem {
  id: string;
  name: string;
  size: number;
  type: string;
  notes: string;
}

export interface AssetFileMetadata {
  id: string;
  name: string;
  size: number;
  type: string;
}

export interface AssessRequirementData {
  brandLogo: File | null;
  assets: UploadedAssetItem[];
  filesInfo: string;
}

interface PropsType {
  handleNextStep?: () => void;
  handlePrevStep?: () => void;
  fileRegistry: Record<string, File>;
  addFile: (id: string, file: File) => void;
  removeFile: (id: string) => void;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

const AssessRequirement = (props: PropsType) => {
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);
  const [isDraggingAssets, setIsDraggingAssets] = useState(false);

  const dispatch = useAppDispatch();

  const savedAssets = useAppSelector(
    state => state.websiteCreation.assetsRequirements
  );

  const formik = useFormik<AssessRequirementData>({
    initialValues:  savedAssets ?? {
      brandLogo: null,
      assets: [],
      filesInfo: '',
    },
    validationSchema: AssetsRequirementSchemaValidation,
    onSubmit: (values) => {
       dispatch(setAssetsRequirements(values));
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

  useEffect(() => {
    const logoId = values.brandLogo?.id;

    const logoFile = logoId
      ? props.fileRegistry[logoId]
      : null;

    if (!logoFile || !isImageFile(logoFile)) {
      setLogoPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(logoFile);

    setLogoPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);

  }, [values.brandLogo?.id, props.fileRegistry]);

  const handleLogoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.currentTarget.files?.[0];

    if (!file) return;

    if (!isImageFile(file)) {
      formik.setFieldError(
        "brandLogo",
        "Please select a valid image."
      );
      return;
    }

    const id = crypto.randomUUID();

    // Actual file goes into parent state.
    props.addFile(id, file);

    // Only metadata goes into Formik.
    setFieldValue("brandLogo", {
      id,
      name: file.name,
      size: file.size,
      type: file.type
    });

    formik.setFieldError("brandLogo", undefined);

    e.currentTarget.value = "";
  };

  const handleRemoveLogo = () => {
    setFieldValue('brandLogo', null);
    formik.setFieldError('brandLogo', undefined);
  };

  const appendAssetFiles = (fileList: FileList | File[]) => {
    const incoming = Array.from(fileList);

    const newItems = incoming.map(file => {
      const id = crypto.randomUUID();

      // Store actual File separately.
      props.addFile(id, file);

      return {
        id,
        name: file.name,
        size: file.size,
        type: file.type || "application/octet-stream",
        notes: ""
      };
    });

    setFieldValue("assets", [
      ...values.assets,
      ...newItems
    ]);

    setFieldTouched("assets", true, false);
  };

  const handleAssetsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      appendAssetFiles(e.currentTarget.files);
      e.currentTarget.value = '';
    }
  };

  const handleDropAssets = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingAssets(false);
    if (e.dataTransfer.files) {
      appendAssetFiles(e.dataTransfer.files);
    }
  };

  const handleRemoveAsset = (assetId: string) => {
    props.removeFile(assetId);

    setFieldValue(
      "assets",
      values.assets.filter(item => item.id !== assetId)
    );
  };

  const handleAssetNotesChange = (assetId: string, notesValue: string) => {
    setFieldValue(
      'assets',
      values.assets.map((item) =>
        item.id === assetId ? { ...item, notes: notesValue } : item
      )
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl shadow-xs overflow-hidden"
    >

      <div className="px-6 py-6 sm:px-8 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4F46E5] mb-1.5">
          <span>Step 4 of 6</span>
          <span className="text-[#94A3B8]">•</span>
          <span>Brand & Media Assets</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
          Assess Requirement
        </h1>
        <p className="text-sm text-[#475569] mt-1">
          Upload your brand logo in any image format along with supporting files, and add context on how each file should be used.
        </p>
      </div>

      <div className="p-6 sm:p-8 space-y-8">

        <section aria-labelledby="section-brand-logo">
          <div className="mb-4">
            <h2
              id="section-brand-logo"
              className="text-base font-semibold text-[#0F172A] flex items-center gap-2"
            >
              <ImageIcon className="w-4 h-4 text-[#4F46E5]" />
              <span>Brand Logo</span>
            </h2>
            <p className="text-xs text-[#475569] mt-0.5">
              Must be a picture format (PNG, JPG, WEBP, SVG, GIF, etc.) for your navbar, favicon, and footer.
            </p>
          </div>

          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 sm:p-5">
            {!values.brandLogo ? (
              <label
                htmlFor="brandLogo"
                className="flex flex-col items-center justify-center border-2 border-dashed border-[#E2E8F0] hover:border-[#4F46E5] bg-[#FFFFFF] rounded-xl p-6 text-center cursor-pointer transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#4F46E5]/10 text-[#4F46E5] flex items-center justify-center mb-2.5">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <span className="text-sm font-semibold text-[#0F172A]">
                  Upload Brand Logo Image
                </span>
                <span className="text-xs text-[#475569] mt-1">
                  Click to choose any picture file (PNG, JPG, SVG, WEBP, GIF)
                </span>
                <input
                  id="brandLogo"
                  name="brandLogo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  onBlur={handleBlur}
                  className="sr-only"
                />
              </label>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl p-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  {logoPreviewUrl && (
                    <img
                      src={logoPreviewUrl}
                      alt="Brand logo preview"
                      className="w-14 h-14 rounded-lg object-contain bg-[#F8FAFC] border border-[#E2E8F0] p-1.5 shrink-0"
                    />
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#4F46E5] shrink-0" />
                      <p className="text-sm font-semibold text-[#0F172A] truncate">
                        {values.brandLogo.name}
                      </p>
                    </div>
                    <p className="text-xs text-[#475569] mt-0.5">
                      {formatFileSize(values.brandLogo.size)} •{' '}
                      {values.brandLogo.type || 'Image'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <label
                    htmlFor="brandLogoReplace"
                    className="px-3 py-1.5 text-xs font-medium text-[#0F172A] bg-[#F8FAFC] hover:bg-slate-100 border border-[#E2E8F0] rounded-lg cursor-pointer transition-colors"
                  >
                    Replace
                    <input
                      id="brandLogoReplace"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="sr-only"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={handleRemoveLogo}
                    aria-label="Remove brand logo"
                    className="p-1.5 text-[#475569] hover:text-red-600 hover:bg-red-50 rounded-lg border border-transparent hover:border-red-200 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {touched.brandLogo && errors.brandLogo && (
              <p className="mt-2.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.brandLogo}</span>
              </p>
            )}
          </div>
        </section>

        <hr className="border-[#E2E8F0]" />

        <section aria-labelledby="section-project-assets">
          <div className="mb-4">
            <h2
              id="section-project-assets"
              className="text-base font-semibold text-[#0F172A] flex items-center gap-2"
            >
              <FolderUp className="w-4 h-4 text-[#4F46E5]" />
              <span>Supporting Assets</span>
            </h2>
            <p className="text-xs text-[#475569] mt-0.5">
              Upload any file type—images, PDFs, DOC/DOCX, spreadsheets, brand guidelines, or media files.
            </p>
          </div>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDraggingAssets(true);
            }}
            onDragLeave={() => setIsDraggingAssets(false)}
            onDrop={handleDropAssets}
            className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${isDraggingAssets
              ? 'border-[#4F46E5] bg-[#4F46E5]/[0.04]'
              : 'border-[#E2E8F0] bg-[#F8FAFC] hover:border-slate-300'
              }`}
          >
            <div className="w-10 h-10 rounded-full bg-[#FFFFFF] border border-[#E2E8F0] text-[#4F46E5] flex items-center justify-center mx-auto mb-2.5 shadow-2xs">
              <Upload className="w-5 h-5" />
            </div>
            <p className="text-sm font-semibold text-[#0F172A]">
              Drag and drop files here, or{' '}
              <label
                htmlFor="projectAssets"
                className="text-[#4F46E5] hover:text-[#4338CA] underline cursor-pointer"
              >
                browse from your device
              </label>
            </p>
            <p className="text-xs text-[#475569] mt-1">
              Supports images, PDF, DOC, DOCX, TXT, CSV, ZIP, and any other file format
            </p>
            <input
              id="projectAssets"
              name="projectAssets"
              type="file"
              multiple
              onChange={handleAssetsInputChange}
              className="sr-only"
            />
          </div>

          {values.assets.length > 0 && (
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#475569]">
                  Uploaded Files ({values.assets.length})
                </span>
              </div>

              {values.assets.map((asset) => (
                <div
                  key={asset.id}
                  className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
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

                    <button
                      type="button"
                      onClick={() => handleRemoveAsset(asset.id)}
                      aria-label={`Remove ${asset.name}`}
                      className="p-1.5 text-[#475569] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label
                      htmlFor={`asset-notes-${asset.id}`}
                      className="block text-xs font-medium text-[#0F172A] mb-1"
                    >
                      Notes for {asset.name}
                    </label>
                    <input
                      id={`asset-notes-${asset.id}`}
                      type="text"
                      value={asset.notes}
                      onChange={(e) => handleAssetNotesChange(asset.id, e.target.value)}
                      placeholder="e.g., Use this PDF for our services pricing table or hero banner photo"
                      className="block w-full px-3 py-2 text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] bg-[#FFFFFF] rounded-lg border border-[#E2E8F0] transition-colors focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <hr className="border-[#E2E8F0]" />

        <section aria-labelledby="section-files-info">
          <div className="mb-4">
            <h2
              id="section-files-info"
              className="text-base font-semibold text-[#0F172A] flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-[#4F46E5]" />
              <span>Information About Uploaded Files</span>
            </h2>
            <p className="text-xs text-[#475569] mt-0.5">
              Add overall instructions, content details, or notes explaining how your uploaded files should be used.
            </p>
          </div>

          <div>
            <label
              htmlFor="filesInfo"
              className="block text-sm font-medium text-[#0F172A] mb-1.5"
            >
              File Notes & Instructions
            </label>
            <textarea
              id="filesInfo"
              name="filesInfo"
              rows={4}
              value={values.filesInfo}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g., The attached Word doc contains our company bio and FAQs; use the high-res product photos on the Home and Services pages..."
              className="block w-full px-3.5 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] bg-[#FFFFFF] rounded-lg border border-[#E2E8F0] transition-colors focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15 resize-y"
            />
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
          <span>Back to Website Requirement</span>
        </button>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <span className="text-xs text-[#94A3B8] text-center sm:text-right">
            Brand logo accepts picture formats; supporting files accept any format
          </span>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
          >
            <span>Save & Continue to Style Preferences</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default AssessRequirement;