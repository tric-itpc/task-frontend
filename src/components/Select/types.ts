import React, { ChangeEvent } from 'react';

export interface SelectProps {
  name: string;
  value: string;
  onChange: (e: ChangeEvent) => void;
  label: string;
  placeholder: string;
  onBlur: React.FocusEventHandler<HTMLSelectElement>;
  optionList: SelectOption[];
}

export interface SelectOption {
  id: number;
  value: string;
  title: string;
}
