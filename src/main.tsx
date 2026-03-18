import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import 'modern-normalize/modern-normalize.css';
import App from './components/App/App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <Toaster position="top-right" reverseOrder={false} />
  </React.StrictMode>
);