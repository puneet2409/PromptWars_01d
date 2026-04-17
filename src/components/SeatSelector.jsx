import React, { useState } from 'react';
import { Ticket, MapPin, ChevronRight, UserCircle } from 'lucide-react';

export default function SeatSelector({ stadium, onConfirm }) {
  const [section, setSection] = useState('102');
  const [row, setRow] = useState('F');
  const [seat, setSeat] = useState('12');

  const handleConfirm = () => {
    let targetX, targetY, defaultPath, reroutedPath, congestionX, congestionY;
    if (section === '101') {
      targetX = 350; targetY = 100;
      congestionX = 450; congestionY = 225;
      defaultPath = "M 450 430 L 450 100 L 350 100";
      reroutedPath = "M 450 430 L 250 430 L 250 100 L 350 100";
    } else if (section === '102') {
      targetX = 550; targetY = 100;
      congestionX = 450; congestionY = 225;
      defaultPath = "M 450 430 L 450 100 L 550 100";
      reroutedPath = "M 450 430 L 650 430 L 650 100 L 550 100";
    } else if (section === '103') {
      targetX = 350; targetY = 360;
      congestionX = 450; congestionY = 390;
      defaultPath = "M 450 430 L 450 360 L 350 360";
      reroutedPath = "M 450 430 L 250 430 L 250 360 L 350 360";
    } else { // 104
      targetX = 550; targetY = 360;
      congestionX = 450; congestionY = 390;
      defaultPath = "M 450 430 L 450 360 L 550 360";
      reroutedPath = "M 450 430 L 650 430 L 650 360 L 550 360";
    }

    onConfirm({ section, row, seat, targetX, targetY, congestionX, congestionY, path: defaultPath, reroutedPath });
  };

  const inputStyle = {
    width: '100%',
    padding: '14px',
    background: 'rgba(15, 23, 42, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '1.1rem',
    outline: 'none',
    WebkitAppearance: 'none',
    appearance: 'none',
    cursor: 'pointer'
  };

  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      padding: '40px 24px',
      overflowY: 'auto'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '40px', paddingTop: '20px' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 800, 
          background: 'linear-gradient(135deg, #60a5fa 0%, #a855f7 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '8px'
        }}>
          Ticket Details
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <MapPin size={18} color="#60a5fa" />
          {stadium.name}
        </p>
      </div>

      <div className="glass-panel" style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
           <Ticket size={28} color="var(--accent-color)" />
           <h3 style={{ fontSize: '1.3rem', fontWeight: '700' }}>Locate Your Seat</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ color: '#cbd5e1', fontSize: '0.9rem', fontWeight: 500, paddingLeft: '4px' }}>Section</label>
          <div style={{ position: 'relative' }}>
            <select value={section} onChange={e => setSection(e.target.value)} style={inputStyle}>
              <option value="101" style={{ color: '#000' }}>Section 101</option>
              <option value="102" style={{ color: '#000' }}>Section 102</option>
              <option value="103" style={{ color: '#000' }}>Section 103</option>
              <option value="104" style={{ color: '#000' }}>Section 104</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
            <label style={{ color: '#cbd5e1', fontSize: '0.9rem', fontWeight: 500, paddingLeft: '4px' }}>Row</label>
            <div style={{ position: 'relative' }}>
              <select value={row} onChange={e => setRow(e.target.value)} style={inputStyle}>
                {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map(r => (
                   <option key={r} value={r} style={{ color: '#000' }}>Row {r}</option>
                ))}
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
            <label style={{ color: '#cbd5e1', fontSize: '0.9rem', fontWeight: 500, paddingLeft: '4px' }}>Seat</label>
            <div style={{ position: 'relative' }}>
              <select value={seat} onChange={e => setSeat(e.target.value)} style={inputStyle}>
                {[1,2,3,4,5,6,7,8,9,10,11,12].map(s => (
                   <option key={s} value={s} style={{ color: '#000' }}>Seat {s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button 
          onClick={handleConfirm}
          style={{
            marginTop: '24px',
            background: 'var(--accent-color)',
            color: '#fff',
            border: 'none',
            padding: '16px',
            borderRadius: '12px',
            fontSize: '1.1rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 8px 24px rgba(37,99,235,0.4)',
            transition: 'background 0.3s ease'
          }}
          onMouseOver={e => e.currentTarget.style.background = 'var(--accent-hover)'}
          onMouseOut={e => e.currentTarget.style.background = 'var(--accent-color)'}
        >
          Confirm & Navigate <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
