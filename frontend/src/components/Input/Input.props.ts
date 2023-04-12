import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Feedback, FeedbackFields } from '../../types/Feedback.interface';
import { HTMLAttributes } from 'react';

export interface InputProps extends HTMLAttributes<HTMLInputElement> {
  name: FeedbackFields;
  errors: FieldErrors<Feedback>;
  title: string;
  errorMessage?: string;
  optionsValidate?: object;
  register: UseFormRegister<Feedback>
}
