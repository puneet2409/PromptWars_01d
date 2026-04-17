import React, { useState, useEffect } from 'react';
import { MapPin, Map as MapIcon, Users, ArrowRightCircle, CheckCircle } from 'lucide-react';

export default function StadiumMap({ customRoute, selectedSeat }) {
  const [routeState, setRouteState] = useState('initial'); 

  useEffect(() => {
    // Only simulate crowd disruption if we are navigating to our seat (no custom Route)
    if (customRoute) {
      setRouteState('custom_route');
      return;
    }

    const timer1 = setTimeout(() => {
      setRouteState('congestion_detected');
    }, 3000);

    const timer2 = setTimeout(() => {
      setRouteState('rerouting');
    }, 5000);

    const timer3 = setTimeout(() => {
      setRouteState('rerouted');
    }, 6500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [customRoute]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Top UI Overlay */}
      <div style={{ padding: '0 20px 20px 20px', zIndex: 10 }}>
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '4px' }}>
              {customRoute ? customRoute.name : (selectedSeat ? `Section ${selectedSeat.section}, Row ${selectedSeat.row}, Seat ${selectedSeat.seat}` : 'Section 114, Row F, Seat 12')}
            </h4>
            <p style={{ color: 'var(--accent-color)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600' }}>
              <ArrowRightCircle size={14} /> 
              {routeState === 'rerouting' ? 'Calculating new path...' : 'Optimal Route'}
            </p>
          </div>
          <div style={{ background: 'var(--accent-light)', padding: '10px', borderRadius: '50%' }}>
            <MapIcon size={24} color="var(--accent-color)" />
          </div>
        </div>

        {/* Dynamic AI Alert */}
        <div 
          className="glass-panel" 
          style={{ 
            marginTop: '12px', 
            padding: '12px', 
            background: routeState === 'congestion_detected' ? '#fef2f2' : (customRoute ? '#ecfdf5' : 'var(--panel-bg)'),
            border: routeState === 'congestion_detected' ? '1px solid var(--neon-red)' : '1px solid var(--border-color)',
            opacity: routeState === 'initial' ? 0 : 1,
            transition: 'opacity 0.5s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
          {customRoute ? (
             <CheckCircle size={20} color="var(--success)" />
          ) : (
             <Users size={20} color={routeState === 'rerouting' || routeState === 'rerouted' ? 'var(--accent-color)' : 'var(--neon-red)'} />
          )}
          
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              {routeState === 'custom_route' && "Routing to Service"}
              {routeState === 'congestion_detected' && "Crowd Disruption Detected"}
              {routeState === 'rerouting' && "AI Smart Routing Active"}
              {routeState === 'rerouted' && "New Optimal Route Found"}
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              {routeState === 'custom_route' && `Guiding you to ${customRoute.type}.`}
              {routeState === 'congestion_detected' && "Heavy traffic at Gate C. Recalculating..."}
              {routeState === 'rerouting' && "Analyzing alternate corridors..."}
              {routeState === 'rerouted' && "Bypassing congestion via West Tunnel."}
            </p>
          </div>
        </div>
      </div>

      {/* Map Container - Fixed aspect ratio mapping so SVG and image align perfectly */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '800px', aspectRatio: '16/9' }}>
          
          {/* Background Generated Map Image */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: "url('/stadium_map.png')",
            backgroundSize: '100% 100%',
            opacity: 0.85,
            zIndex: 1
          }}></div>

          {/* SVG Drawing Layer over Map */}
          <svg viewBox="0 0 800 450" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }}>
            {/* User Location */}
            <circle cx="450" cy="430" r="6" fill="var(--accent-color)" stroke="#ffffff" strokeWidth="2" filter="drop-shadow(0 0 10px rgba(37,99,235,0.8))" />
            
            {/* Custom Route Destination */}
            {customRoute ? (
              <>
                {/* Google Maps style: Thick outer border, inner glowing line */}
                <path 
                  d={customRoute.path} 
                  fill="none" 
                  stroke="#1a73e8" 
                  strokeWidth="12" 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="2000"
                  filter="drop-shadow(0 8px 12px rgba(26,115,232,0.4))"
                  style={{ animation: 'draw-path 2s forwards' }}
                />
                <path 
                  d={customRoute.path} 
                  fill="none" 
                  stroke="#4285f4" 
                  strokeWidth="8" 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="2000"
                  style={{ animation: 'draw-path 2s forwards' }}
                />
                <circle cx={customRoute.targetX} cy={customRoute.targetY} r="8" fill="#ea4335" stroke="#ffffff" strokeWidth="3" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))" />
              </>
            ) : (
              <>
                {/* Default Seat Destination */}
                <circle cx={selectedSeat?.targetX || 550} cy={selectedSeat?.targetY || 100} r="8" fill="#ea4335" stroke="#ffffff" strokeWidth="3" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))" />
                
                {/* Original Path */}
                <g style={{
                    animation: 'draw-path 3s forwards',
                    opacity: routeState === 'rerouting' || routeState === 'rerouted' ? 0.3 : 1,
                    transition: 'opacity 0.5s ease'
                  }}>
                  <path 
                    d={selectedSeat?.path || "M 450 430 L 450 100 L 550 100"} 
                    fill="none" 
                    stroke="#1a73e8" 
                    strokeWidth="12" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="2000"
                  />
                  <path 
                    d={selectedSeat?.path || "M 450 430 L 450 100 L 550 100"} 
                    fill="none" 
                    stroke="#4285f4" 
                    strokeWidth="8" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="2000"
                  />
                </g>

                {/* Congestion Hotspot */}
                {routeState !== 'initial' && (
                  <circle 
                    cx={selectedSeat?.congestionX || 450} cy={selectedSeat?.congestionY || 225} r="35" 
                    fill="rgba(234,67,53,0.6)" 
                    filter="blur(10px)"
                    style={{ animation: 'flash-congestion 2s infinite' }}
                  />
                )}

                {/* New Rerouted Path */}
                {routeState === 'rerouted' && (
                  <g style={{ animation: 'draw-path 2s forwards' }}>
                    {/* Congestion color indication segment (Orange/Green) */}
                    <path 
                      d={selectedSeat?.reroutedPath || "M 450 430 L 650 430 L 650 100 L 550 100"} 
                      fill="none" 
                      stroke="#0d652d" 
                      strokeWidth="12" 
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="2000"
                      filter="drop-shadow(0 8px 12px rgba(13,101,45,0.4))"
                    />
                    <path 
                      d={selectedSeat?.reroutedPath || "M 450 430 L 650 430 L 650 100 L 550 100"} 
                      fill="none" 
                      stroke="#34a853" 
                      strokeWidth="8" 
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="2000"
                    />
                  </g>
                )}
              </>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}
