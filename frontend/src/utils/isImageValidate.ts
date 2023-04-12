export function isImageValidate(file: File): boolean {
  const acceptedImageTypes = ['image/jpeg', 'image/png'];
  const MAX_IMAGE_SIZE = 2_097_152; // 2MB
  return acceptedImageTypes.includes(file['type']) && file.size < MAX_IMAGE_SIZE;
}
