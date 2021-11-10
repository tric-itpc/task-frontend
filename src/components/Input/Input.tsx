import React, { useState } from 'react';
import { InputProps } from './types';

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  label,
  placeholder,
  name,
  onBlur,
  type,
}) => {
  const isFileType = type === 'file';

  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <div className="input__wrap">
      <div>
        <label className="input__label">{label}</label>
      </div>
      <div className="input__input-wrap">
        {isFileType ? (
          <div
            className={`input__input-emulator ${
              isFocused ? 'is-focused' : ''
            } ${value ? '' : 'placeholder'}`}
          >
            {value ? value.split('\\').reverse()[0] : 'Выберите картинку'}
          </div>
        ) : null}
        <input
          className={`input__input ${isFileType ? 'is-file-type' : ''}`}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          onBlur={(e) => {
            onBlur(e);
            setIsFocused(false);
          }}
          onFocus={() => {
            setIsFocused(true);
          }}
        />
      </div>
    </div>
  );
};
