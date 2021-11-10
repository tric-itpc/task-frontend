import * as yup from 'yup';
import {
  VALIDATION_ERROR_EMAIL,
  VALIDATION_ERROR_REQUIRED,
  getValidationErrorMinMessage,
  VALIDATION_ERROR_FILE_TYPE,
  VALIDATION_ERROR_FILE_SIZE,
  VALIDATION_ERROR_NAME_OR_FAMILY_REQUIRED,
} from './validators';

const FILE_SIZE = 2097152; //2mb

const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];

const FeedbackFormValidationSchemaPrototype = yup.object({
  name: yup.string().required(),
  family: yup.string().required(),
  email: yup
    .string()
    .email(VALIDATION_ERROR_EMAIL)
    .required(VALIDATION_ERROR_REQUIRED),
  category: yup.string().required(VALIDATION_ERROR_REQUIRED),
  message: yup
    .string()
    .min(10, getValidationErrorMinMessage(10))
    .required(VALIDATION_ERROR_REQUIRED),
  img: yup.string(),
});

export interface Feedback
  extends yup.Asserts<typeof FeedbackFormValidationSchemaPrototype> {
  file: File | null;
}

export const FeedbackFormValidationSchema =
  FeedbackFormValidationSchemaPrototype.shape(
    {
      name: yup.string().when('family', {
        is: (family: string) => !family,
        then: yup.string().required(VALIDATION_ERROR_NAME_OR_FAMILY_REQUIRED),
      }),
      family: yup.string().when('name', {
        is: (name: string) => !name,
        then: yup.string().required(VALIDATION_ERROR_NAME_OR_FAMILY_REQUIRED),
      }),
      file: yup
        .mixed()
        .test('fileFormat', VALIDATION_ERROR_FILE_TYPE, (value) => {
          if (!value) {
            return true;
          }
          return value && SUPPORTED_FORMATS.includes(value.type);
        })
        .test('size', VALIDATION_ERROR_FILE_SIZE, (value) => {
          if (!value) {
            return true;
          }
          return value && value.size <= FILE_SIZE;
        }),
    },

    [['family', 'name']],
  );
