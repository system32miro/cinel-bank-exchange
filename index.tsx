import React from 'react';
import ReactDOM from 'react-dom/client';
import BancoCinelExchange from './BancoCinelExchange.tsx';  // Adicione a extensão .tsx
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BancoCinelExchange />
  </React.StrictMode>
);