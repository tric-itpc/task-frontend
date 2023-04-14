import React, { FC } from 'react';

interface FormInputProps {
  type: string;
  name: string;
  label?: string;
  onChange: any;
  error: string;
}

const FormInput: FC<FormInputProps> = ({ type, name, label, onChange, error }: FormInputProps) => {

  const styles = error ? 'form--item-input error-placeholder' : 'form--item-input'

  return (
    <div className='form--item item-mt'>
      <label htmlFor={name}>{label}</label>
      <input
        className={styles}
        type={type}
        name={name}
        onChange={onChange}
        ></input>
      {error && <p className='error-text'>{error}</p>}
    </div>
  )
}

export default FormInput