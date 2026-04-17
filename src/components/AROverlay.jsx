import React, { useState, useEffect, useRef } from 'react';
import { Camera, Compass, Crosshair, ChevronUp, Map as MapIcon, Info, Coffee, X } from 'lucide-react';

export default function AROverlay() {
  const [distance, setDistance] = useState(120);
  const [panX, setPanX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setDistance(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || e.touches?.[0]?.clientX || 0);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || e.touches?.[0]?.clientX || 0;
    const diff = currentX - startX;
    // Bound the panning to avoid dragging completely off the image
    const newPan = Math.max(-500, Math.min(500, panX + diff));
    setPanX(newPan);
    setStartX(currentX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Calculate compass rotation based on pan
  const compassRotation = (panX / 500) * 45;

  return (
    <div 
      style={{ height: '100%', position: 'relative', overflow: 'hidden', background: '#000' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <style dangerouslySetInnerHTML={{__html: `
        .hotspot { animation: pulse 2s infinite; }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); } 70% { box-shadow: 0 0 0 15px rgba(59, 130, 246, 0); } 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); } }
      `}} />

      {/* 360 Panoramic Virtual Tour Interactive Layer */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: `calc(50% + ${panX}px)`,
        width: '300vw',
        height: '100%',
        transform: 'translateX(-50%)',
        backgroundImage: "url('/ar_tunnel.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'none',
        zIndex: 0
      }}>
        
        {/* Interactive Virtual Tour Hotspots */}
        <div 
          className="hotspot"
          onClick={(e) => { e.stopPropagation(); setActiveHotspot('suite'); }}
          style={{ position: 'absolute', left: '40%', top: '45%', background: '#3b82f6', borderRadius: '50%', padding: '10px', cursor: 'pointer', zIndex: 10 }}
        >
          <Info size={24} color="#fff" />
        </div>
        
        <div 
          className="hotspot"
          onClick={(e) => { e.stopPropagation(); setActiveHotspot('concession'); }}
          style={{ position: 'absolute', left: '60%', top: '50%', background: '#10b981', borderRadius: '50%', padding: '10px', cursor: 'pointer', zIndex: 10 }}
        >
          <Coffee size={24} color="#fff" />
        </div>
      </div>

      {/* Hotspot Popup Modal */}
      {activeHotspot && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 100, width: '280px' }} className="glass-panel">
          <div style={{ padding: '20px', position: 'relative' }}>
            <X size={20} color="#fff" style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }} onClick={() => setActiveHotspot(null)} />
            {activeHotspot === 'suite' ? (
              <>
                <h4 style={{ color: '#fff', marginBottom: '8px', fontSize: '1.2rem', fontWeight: 800 }}>MetLife VIP Suite 204</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.4' }}>Exclusive club access with premium catering, widescreen monitors, and padded seating.</p>
                <div style={{ width: '100%', height: '100px', background: '#000', borderRadius: '8px', marginTop: '12px', border: '1px solid #333' }}></div>
              </>
            ) : (
              <>
                <h4 style={{ color: '#fff', marginBottom: '8px', fontSize: '1.2rem', fontWeight: 800 }}>Prime Concessions</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.4' }}>Order directly from the app to skip the line. Wait time: 3 mins.</p>
                <button style={{ width: '100%', padding: '10px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '8px', marginTop: '12px', fontWeight: 700, cursor: 'pointer' }}>View Menu</button>
              </>
            )}
          </div>
        </div>
      )}

      {/* AR HUD UI Overlay Layer */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 1 }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0) 100%)' }}></div>
      </div>

      {/* Foreground UI Nav (pointerEvents: none allows dragging through HUD) */}
      <div style={{ position: 'relative', zIndex: 10, padding: '20px', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', pointerEvents: 'none' }}>
        
        {/* Top HUD */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div className="glass-panel" style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px', pointerEvents: 'auto' }}>
            <Camera size={16} color="var(--neon-red)" style={{ animation: 'flash-congestion 2s infinite' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: '600' }}>Virtual Tour</span>
          </div>

          {/* Minimap UI element as requested from SuiteView features */}
          <div className="glass-panel" style={{ padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'auto', width: '90px' }}>
             <MapIcon size={20} color="#94a3b8" style={{ marginBottom: '6px' }} />
             <div style={{ position: 'relative', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                {/* Simulated Field Cone of Vision */}
                <div style={{ 
                  position: 'absolute', top: '50%', left: '50%', width: 0, height: 0,
                  borderLeft: '15px solid transparent', borderRight: '15px solid transparent', borderTop: '25px solid rgba(59, 130, 246, 0.5)',
                  transform: `translate(-50%, -100%) rotate(${compassRotation}deg)`,
                  transformOrigin: 'bottom center'
                }}></div>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '8px', height: '8px', background: '#fff', borderRadius: '50%' }}></div>
             </div>
             <span style={{ fontSize: '0.6rem', color: '#cbd5e1', fontWeight: 600, marginTop: '8px' }}>114 / ROW F</span>
          </div>
        </div>

        {/* Floating Floor Direction Indicator */}
        <div style={{ position: 'absolute', top: '65%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ChevronUp size={80} color="rgba(255,255,255,0.8)" strokeWidth={2} style={{ filter: 'drop-shadow(0 4px 10px rgba(59, 130, 246, 0.8))', transform: `perspective(500px) rotateX(60deg) translateX(${panX * -0.5}px)` }} />
        </div>

        {/* Center Reticle */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.3 }}>
          <Crosshair size={40} color="var(--accent-color)" />
        </div>

        {/* Bottom HUD info */}
        <div className="glass-panel" style={{ padding: '20px', textAlign: 'center', marginBottom: '80px', pointerEvents: 'auto' }}>
          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', marginBottom: '8px', fontWeight: '800' }}>Proceed Straight</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Follow the virtual markers down the concourse
          </p>
          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <span style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--accent-color)' }}>
              {distance}
            </span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '1rem', paddingTop: '8px', fontWeight: '600' }}>ft</span>
          </div>
        </div>
      </div>
    </div>
  );
}
