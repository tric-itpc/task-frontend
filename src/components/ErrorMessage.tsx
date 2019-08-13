import React from 'react';

interface Props {
  message: string;
}

const ErrorMessage: React.FC<Props> = ({ message }) => <li>{message}</li>;

export default ErrorMessage;
