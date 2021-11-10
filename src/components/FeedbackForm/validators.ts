export const VALIDATION_ERROR_REQUIRED = 'Должно быть заполнено!';
export const VALIDATION_ERROR_NAME_OR_FAMILY_REQUIRED =
  'Заполните имя или фамилию!';

export const VALIDATION_ERROR_EMAIL = 'Введена не почта!';
export const getValidationErrorMinMessage = (min: number): string =>
  `Введите не менее ${min} символов`;
export const VALIDATION_ERROR_FILE_TYPE = 'Только PNG или JPEG файлы!';
export const VALIDATION_ERROR_FILE_SIZE = 'Размер файла превышает 2 мегабайта';
