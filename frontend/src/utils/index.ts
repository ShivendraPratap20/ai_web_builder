import { IMAGE_MIME_TYPES } from "../constants/projectFormData";

const isImageFile = (file: File): boolean => {
  if (file.type && file.type.startsWith('image/')) return true;
  if (IMAGE_MIME_TYPES.includes(file.type)) return true;
  return /\.(png|jpe?g|webp|gif|svg|avif|bmp|ico)$/i.test(file.name);
};

export { 
    isImageFile,
}