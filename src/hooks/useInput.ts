import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { checkInputs } from '../utils/validates';
import { InputNames } from '../types/types';

export interface IUseInput {
  value: string;
  onBlur: () => void;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  helperText: string;
  error: boolean;
  setValue?: Dispatch<SetStateAction<string>>;
}

export const useInput = (initial: string, type: InputNames, required: boolean): IUseInput => {
  const [value, setValue] = useState<string>(initial);
  const [helperText, setHelperText] = useState<string>('');

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const targetValue = evt.target.value;
    checkInputs(targetValue, type, setHelperText, required);
    setValue(targetValue);
  };

  const onBlur = () => {
    checkInputs(value, type, setHelperText, required);
  };

  return {value, helperText, onChange, onBlur, error: Boolean(helperText), setValue};
};
