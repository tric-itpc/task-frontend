import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { StyledEngineProvider } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StyledEngineProvider injectFirst>
    <App />
  </StyledEngineProvider>,
);
