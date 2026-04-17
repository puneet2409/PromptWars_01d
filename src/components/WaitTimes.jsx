import React, { useState, useEffect } from 'react';
import { Clock, Coffee, Pizza, Beer, Droplets, ArrowUpRight, TrendingDown } from 'lucide-react';

export default function WaitTimes({ onRoute }) {
  const [concessions, setConcessions] = useState([
    { id: 1, name: 'Burger Joint - Gate A', type: 'food', wait: 12, trend: 'up', icon: Pizza, targetX: 250, targetY: 225, path: "M 450 430 L 450 225 L 250 225" },
    { id: 2, name: 'Refreshments - Gate B', type: 'drink', wait: 4, trend: 'down', icon: Beer, targetX: 650, targetY: 225, path: "M 450 430 L 450 225 L 650 225" },
    { id: 3, name: 'Restroom (Mens) - Sec 112', type: 'restroom', wait: 2, trend: 'down', icon: Droplets, targetX: 650, targetY: 100, path: "M 450 430 L 650 430 L 650 100" },
    { id: 4, name: 'Restroom (Womens) - Sec 112', type: 'restroom', wait: 8, trend: 'up', icon: Droplets, targetX: 250, targetY: 100, path: "M 450 430 L 250 430 L 250 100" },
    { id: 5, name: 'Coffee Kiosk - Sec 118', type: 'drink', wait: 15, trend: 'up', icon: Coffee, targetX: 650, targetY: 360, path: "M 450 430 L 650 430 L 650 360" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setConcessions(prev => prev.map(c => {
        const change = Math.floor(Math.random() * 3) - 1;
        const newWait = Math.max(1, c.wait + change);
        return {
          ...c,
          wait: newWait,
          trend: newWait > c.wait ? 'up' : newWait < c.wait ? 'down' : c.trend
        };
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const sortedConcessions = [...concessions].sort((a, b) => a.wait - b.wait);

  return (
    <div style={{ padding: '0 20px 80px 20px', height: '100%', overflowY: 'auto', background: 'transparent' }}>
      <div style={{ marginBottom: '24px', paddingTop: '10px' }}>
        <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', marginBottom: '8px' }}>Concourse Services & Queues</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Live tracked wait times. Tap route to navigate to the fastest line.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {sortedConcessions.map((item) => (
          <div key={item.id} className="glass-panel" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ 
                background: item.wait < 5 ? 'rgba(16, 185, 129, 0.15)' : item.wait < 10 ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)', 
                padding: '12px', 
                borderRadius: '12px',
                color: item.wait < 5 ? 'var(--success)' : item.wait < 10 ? '#f59e0b' : 'var(--neon-red)'
              }}>
                <item.icon size={24} />
              </div>
              <div>
                <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', marginBottom: '4px' }}>{item.name}</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={14} color="var(--text-secondary)" />
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '500' }}>Est. {item.wait} mins</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
              {item.trend === 'up' ? (
                <ArrowUpRight size={18} color="var(--neon-red)" />
              ) : (
                <TrendingDown size={18} color="var(--success)" />
              )}
              <button 
                className="neon-btn" 
                style={{ padding: '6px 12px', fontSize: '0.8rem', borderRadius: '20px' }}
                onClick={() => onRoute(item)}
              >
                Route
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
