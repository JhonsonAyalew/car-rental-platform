import React, { useEffect, useState } from 'react';
import { Truck } from 'lucide-react';

const SplashScreen = ({ onDone }) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFade(true), 1200);
    const t2 = setTimeout(() => onDone?.(), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background: 'var(--bg-base)',
        opacity: fade ? 0 : 1,
        transition: 'opacity 0.4s ease',
      }}
    >
      <div className="flex flex-col items-center gap-5">
        {/* Logo */}
        <div
          className="w-16 h-16 flex items-center justify-center"
          style={{
            background: 'var(--brand)',
            borderRadius: 'var(--r-xl)',
            boxShadow: '0 0 32px rgba(232,101,10,0.4)',
            animation: 'fadeUp 0.5s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <Truck className="w-8 h-8 text-white" />
        </div>

        {/* Name */}
        <div className="text-center" style={{ animation: 'fadeUp 0.5s 0.1s cubic-bezier(0.22,1,0.36,1) both' }}>
          <h1
            className="text-2xl font-black tracking-tight"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            EquipRent
          </h1>
          <p className="text-xs font-bold tracking-[0.2em] uppercase mt-1" style={{ color: 'var(--brand)' }}>
            Ethiopia
          </p>
        </div>

        {/* Spinner */}
        <div
          className="w-5 h-5 border-2 rounded-full"
          style={{
            borderColor: 'var(--border-base)',
            borderTopColor: 'var(--brand)',
            animation: 'spin 0.8s linear infinite, fadeIn 0.4s 0.3s ease both',
          }}
        />
      </div>
    </div>
  );
};

export default SplashScreen;
