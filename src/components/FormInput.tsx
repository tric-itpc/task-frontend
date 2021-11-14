import React from 'react';

interface PropsType {
  text: string;
  type: string;
  htmlFor: string;
  value: any;
  touched: any;
  errors: any;
  handleChange: (e: React.ChangeEvent) => void;
  handleBlur: (e: React.FocusEvent) => void;
}

export const FormInput: React.FC<PropsType> = ({ text, type, htmlFor, value, touched, errors, handleChange, handleBlur }) => {
  const name = htmlFor;
  return (
    <div className='content-form__item'>
      <label className='content-form__label' htmlFor={htmlFor}>{text}</label>
      <input
        className='content-form__input'
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        name={name}
        type={type}
      />
      {touched && errors && <div className='content-form__error-msg error-msg'>{errors}</div>}
    </div>
  );
}