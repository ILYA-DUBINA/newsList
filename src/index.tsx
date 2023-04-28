import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

import App from './App';

const Add = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Add />
  </React.StrictMode>
);

