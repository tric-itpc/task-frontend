import React from 'react';

interface PropsType {
  options: {
    id: number;
    value: string;
    text: string;
  }[];
  touched: any;
  errors: any;
  name: string;
  handleChange: (e: React.ChangeEvent) => void;
  handleBlur: (e: React.FocusEvent) => void;
}

export const Dropdown: React.FC<PropsType> = ({ options, touched, errors, name, handleChange, handleBlur }) => (
  <div className='dropdown'>
    <select
      className='dropdown__select'
      onChange={handleChange}
      onBlur={handleBlur}
      name={name}
    >
      {options.map((option =>
        <option
          className='dropdown__select-item'
          key={option.id}
          value={option.value}
        >
          {option.text}
        </option>
      ))}
    </select>
    {touched && errors && <div className='dropdown__error-msg error-msg'>{errors}</div>}
  </div>
);