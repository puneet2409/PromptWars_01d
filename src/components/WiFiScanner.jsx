import React, { useState, useEffect } from 'react';
import { Wifi, Activity, ShieldCheck } from 'lucide-react';

export default function WiFiScanner() {
  const [status, setStatus] = useState('Initializing WiFi scan...');
  const [noiseLevel, setNoiseLevel] = useState(85);

  useEffect(() => {
    const sequence = [
      { msg: 'Reading localized WiFi fingerprints...', delay: 1000 },
      { msg: 'Applying I-WKNN Algorithm...', delay: 2000 },
      { msg: 'Filtering crowd noise & device interference...', delay: 3000 },
      { msg: 'Location matched to database. Pinpointing...', delay: 4000 }
    ];

    let timerId;
    sequence.forEach(({ msg, delay }) => {
      timerId = setTimeout(() => setStatus(msg), delay);
    });

    const noiseInterval = setInterval(() => {
      setNoiseLevel(prev => Math.max(10, prev - (Math.random() * 15)));
    }, 500);

    return () => {
      clearTimeout(timerId);
      clearInterval(noiseInterval);
    };
  }, []);

  return (
    <div className="scanner-container">
      <div className="radar-circle" style={{ marginBottom: '40px' }}>
        <div className="radar-sweep"></div>
        <Wifi size={48} color="var(--neon-blue)" />
        {/* Simulated matched fingerprints */}
        <div className="radar-dot" style={{ top: '30%', left: '40%' }}></div>
        <div className="radar-dot" style={{ top: '60%', left: '70%', animationDelay: '0.5s' }}></div>
        <div className="radar-dot" style={{ top: '20%', left: '80%', animationDelay: '1s' }}></div>
      </div>

      <div className="glass-panel" style={{ padding: '24px', width: '90%', maxWidth: '400px', textAlign: 'center' }}>
        <h3 style={{ marginBottom: '16px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Activity size={20} color="var(--neon-purple)" />
          {status}
        </h3>
        
        <div style={{ textAlign: 'left', marginBottom: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <span>Signal Noise Reduction (Gaussian Filter)</span>
            <span>{100 - Math.floor(noiseLevel)}% Processed</span>
          </div>
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginTop: '6px', overflow: 'hidden' }}>
            <div style={{ 
              height: '100%', 
              background: 'linear-gradient(90deg, var(--neon-purple), var(--neon-blue))',
              width: `${100 - noiseLevel}%`,
              transition: 'width 0.5s ease'
            }}></div>
          </div>
        </div>

        {noiseLevel < 20 && (
          <p style={{ marginTop: '16px', color: '#00ffcc', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <ShieldCheck size={16} /> Strong signal locked
          </p>
        )}
      </div>
    </div>
  );
}
