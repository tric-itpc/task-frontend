import { useState, useCallback, useEffect } from 'react';
import { useValidate } from './useValidation';

export function useForm(initialValue, validations) {
  const [value, setValue] = useState('');
  const [inputName, setInputName] = useState();
  const [isBlur, setBlur] = useState(false);
  const [sizeFile, setSizeFile] = useState();
  const valid = useValidate(value, validations, inputName, isBlur, sizeFile);

  const handleChange = (evt) => {
    const input = evt.target;
    const nameInput = input.name;
    const inputValue = input.value;

    setValue(inputValue);
    setInputName(nameInput);
    if (nameInput === 'file') {
      setSizeFile(input?.files[0].size / 1024 / 1024);
    }
  };

  const onBlur = (evt) => {
    setBlur(true);
  };

  const resetFrom = useCallback(
    (newValues = '', newIsValid = false) => {
      setValue(newValues);
      setBlur(newIsValid);
    },
    [setValue, setBlur]
  );

  return {
    value,
    isBlur,
    handleChange,
    onBlur,
    ...valid,
    inputName,
    sizeFile,
    resetFrom,
  };
}
