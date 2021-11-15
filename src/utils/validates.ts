import { Dispatch, SetStateAction } from 'react';
import { InputsData, InputNames } from '../types/types';

const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
};

export const checkInputs = (
  value: string,
  type: InputNames,
  setErrorText: Dispatch<SetStateAction<string>>,
  required: boolean,
): void => {
  !value && required
    ? setErrorText('Обязательное поле')
    : setErrorText('');

  switch (type) {
    case InputNames.email:
      !validateEmail(value)
        ? setErrorText('Некорректный email')
        : setErrorText('');
      break;
    case InputNames.message:
      value.trim().length < 10
        ? setErrorText('Введите как минимум 10 символов')
        : setErrorText('');
      break;
    default:
      break;
  }
};

export const getIsSubmitDisabled = (inputs: InputsData, fileError: boolean): boolean => {
  let key: keyof typeof InputNames;
  if (!inputs.name.props.value && !inputs.lastname.props.value) {
    return true;
  }

  if (fileError) {
    return true;
  }

  for (key in inputs) {
    if (inputs[key].props.error || (inputs[key].required && !inputs[key].props.value)) {
      return true;
    }
  }

  return false;
};
