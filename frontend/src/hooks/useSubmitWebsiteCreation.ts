import { useMutation } from '@tanstack/react-query';
import api from '../api/axios';
import type { WebsiteCreationState } from '../redux/slice/websiteCreationSlice';

export interface SubmitWebsiteCreationPayload {
  formData: WebsiteCreationState;
  fileRegistry: Record<string, File>;
}

export interface WebsiteGenerationResponse {
  projectId?: string;
  status?: string;
  message?: string;
  [key: string]: unknown;
}

export function getReadableErrorMessage(err: unknown): string {
  if (err === 'UPLOAD_CANCELLED') return 'Upload was cancelled.';
  if (err === 'NETWORK_ERROR') return 'Network error. Check your connection and try again.';
  if (typeof err === 'string') return err;
  if (err && typeof err === 'object') {
    const maybeMessage =
      ('message' in err && typeof err.message === 'string' && err.message) ||
      ('error' in err && typeof err.error === 'string' && err.error);
    if (maybeMessage) return maybeMessage;
  }
  return 'Failed to submit website creation details.';
}

function buildWebsiteCreationFormData({
  formData,
  fileRegistry,
}: SubmitWebsiteCreationPayload): FormData {
  const payload = new FormData();

  payload.append(
    'data',
    JSON.stringify({
      businessDetails: formData.businessDetails,
      projectDetails: formData.projectDetails,
      websiteRequirements: formData.websiteRequirements,
      assetsRequirements: formData.assetsRequirements,
      websiteStylePreferences: formData.websiteStylePreferences,
    })
  );

  const logoMeta = formData.assetsRequirements?.brandLogo;
  if (logoMeta?.id && fileRegistry[logoMeta.id]) {
    payload.append('brandLogo', fileRegistry[logoMeta.id], logoMeta.name);
  }

  const assetItems = formData.assetsRequirements?.assets ?? [];
  assetItems.forEach((asset) => {
    const file = fileRegistry[asset.id];
    if (file) {
      payload.append(`assets[${asset.id}]`, file, asset.name);
    }
  });
  console.log(payload)
  return payload;
}

export function useSubmitWebsiteCreation() {
  return useMutation<
    WebsiteGenerationResponse,
    unknown,
    SubmitWebsiteCreationPayload
  >({
    mutationFn: async ({ formData, fileRegistry }) => {
      const body = buildWebsiteCreationFormData({ formData, fileRegistry });
      const response = await api.post<
        WebsiteGenerationResponse,
        WebsiteGenerationResponse
      >('/websites/generate', body, {
        headers: {
          'Content-Type': undefined,
        },
      });

      return response;
    },
  });
}