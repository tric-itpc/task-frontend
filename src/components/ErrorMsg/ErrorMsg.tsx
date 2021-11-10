import React, { FC } from 'react';
import { ErrorMsgProps } from './types';

export const ErrorMsg: FC<ErrorMsgProps> = ({ error, showError }) => {
  return (
    <div>
      {showError ? (
        <div className="error__message">{error ? error : <>&nbsp;</>}</div>
      ) : (
        <div className="error__message">&nbsp;</div>
      )}
    </div>
  );
};
