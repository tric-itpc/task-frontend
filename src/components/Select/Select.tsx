import React from 'react';
import { SelectProps } from './types';

const EMPTY_VALUE = '';

export const Select: React.FC<SelectProps> = ({
  label,
  placeholder,
  value,
  onBlur,
  name,
  onChange,
  optionList,
}) => {
  const isEmpty = value === '';

  return (
    <div className="select__wrap">
      <div>
        <label className="select__label">{label}</label>
      </div>
      <div>
        <select
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          className={`select__select ${isEmpty ? 'empty' : ''}`}
          value={value}
        >
          <option value={EMPTY_VALUE} hidden disabled>
            {placeholder}
          </option>
          {optionList.map((option) => (
            <option value={option.value} key={option.id}>
              {option.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
