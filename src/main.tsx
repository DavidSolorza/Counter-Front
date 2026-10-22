import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './core/theme/variables.css';
import './core/theme/reset.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
