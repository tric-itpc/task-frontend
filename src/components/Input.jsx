import { React } from 'react';

const InputPopup = function ({
  name,
  type,
  value,
  onClick,
  onChange,
  className,
  placeholder,
  onBlur,
  isData,
}) {
  return (
    <div className='form__wrap'>
      <label className='form__label form__label-extend'>{placeholder}</label>
      <input
        name={name}
        type={type}
        value={value}
        onClick={onClick}
        onChange={onChange}
        className={className}
        onBlur={onBlur}
        autoComplete='off'
      />
      <span className='form__input-error'>
        {' '}
        {isData?.isBlur && isData?.textError}
      </span>
    </div>
  );
};

export default InputPopup;
