import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './i18n'; // Import i18n
import App from './App';
import Spinner from './components/ui/Spinner';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    }>
      <App />
    </Suspense>
  </React.StrictMode>
);
