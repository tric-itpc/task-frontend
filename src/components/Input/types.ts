import React, { ChangeEvent, InputHTMLAttributes } from 'react';

export interface InputProps {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  type: InputHTMLAttributes<null>['type'];
  onBlur: React.FocusEventHandler<HTMLInputElement>;
}
