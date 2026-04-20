import React, { useState } from 'react';
import AppRouter from './router/AppRouter';
import SplashScreen from './components/SplashScreen';

const App = () => {
  const [splashDone, setSplashDone] = useState(false);

  // Show splash only on first load
  if (!splashDone) {
    return <SplashScreen onDone={() => setSplashDone(true)} />;
  }

  return <AppRouter />;
};

export default App;
