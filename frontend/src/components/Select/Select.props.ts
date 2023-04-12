import { HTMLAttributes } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Feedback, FeedbackFields } from '../../types/Feedback.interface';

export interface IOption {
  value: string;
  label: string;
  disabled?: boolean;
}
export interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
  name: FeedbackFields;
  errors: FieldErrors<Feedback>;
  title: string;
  options: IOption[];
  register: UseFormRegister<Feedback>;
}
