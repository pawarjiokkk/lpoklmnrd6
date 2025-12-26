
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const mountApp = () => {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    // If running in a dev environment where the script might execute before HTML is parsed
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', mountApp);
      return;
    }
    throw new Error("ExploreaToolHub: Critical Error - Could not find root element to mount to. Please check index.html for <div id='root'></div>.");
  }

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

mountApp();
