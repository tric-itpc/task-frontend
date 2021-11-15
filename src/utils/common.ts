import { IFormData } from '../types/types';

export const encodeToBase64 = (file: File): Promise<string> => (
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const result = reader.result.split('base64,')[1];
        resolve(result);
      }
    };
  })
);

// TODO: remove fake send data
export const fakeSendData = (data: IFormData): Promise<string> => {
  const json = JSON.stringify(data);
  console.log('data: ', json);
  return new Promise((resolve) => {
    setTimeout(() => resolve(json), 1000);
  });
};
