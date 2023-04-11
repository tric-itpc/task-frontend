export function isImageValidate(image: File): boolean {
  const acceptedImageTypes = ['image/jpeg', 'image/png'];
  return image && acceptedImageTypes.includes(image['type']);
}
