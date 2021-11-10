import React from 'react';
import { ButtonProps } from './types';

export const Button: React.FC<ButtonProps> = ({
  caption,
  disabled = false,
  type,
}) => {
  return (
    <div className="button__wrap">
      <button
        type={type}
        disabled={disabled}
        className={`button__button ${disabled ? 'disabled' : ''}`}
      >
        {caption}
      </button>
    </div>
  );
};
