import React from 'react';
import './tooltip-style.css';

interface TooltipProps {
  message: string
}

const Tooltip: React.FC<TooltipProps> = ({ message }) => {
  return (
    <div className='tooltip'>
      {message}
    </div>
  )
}

export default Tooltip