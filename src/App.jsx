import React, { useState } from 'react';
import StadiumSelector from './components/StadiumSelector';
import SeatSelector from './components/SeatSelector';
import WiFiScanner from './components/WiFiScanner';
import StadiumMap from './components/StadiumMap';
import WaitTimes from './components/WaitTimes';
import AROverlay from './components/AROverlay';
import { Navigation, Map as MapIcon, Clock, Camera, ChevronLeft } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState('selector'); // 'selector', 'seat_selection', 'scanner', 'main'
  const [activeTab, setActiveTab] = useState('map'); // 'map', 'wait_times', 'ar'
  const [selectedStadium, setSelectedStadium] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [customRoute, setCustomRoute] = useState(null);

  const handleStadiumSelect = (stadium) => {
    setSelectedStadium(stadium);
    setCurrentView('seat_selection');
  };

  const handleSeatConfirm = (seatData) => {
    setSelectedSeat(seatData);
    setCurrentView('scanner');
    setTimeout(() => {
      setCurrentView('main');
    }, 4500); 
  };

  const handleGoHome = () => {
    setCurrentView('selector');
    setSelectedStadium(null);
    setSelectedSeat(null);
    setCustomRoute(null);
    setActiveTab('map');
  };

  const NavButton = ({ tab, icon: Icon, label }) => (
    <button 
      onClick={() => setActiveTab(tab)}
      style={{
        background: 'transparent',
        border: 'none',
        color: activeTab === tab ? 'var(--accent-color)' : 'var(--text-secondary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        cursor: 'pointer',
        transition: 'color 0.3s ease'
      }}
    >
      <Icon size={24} style={{ opacity: activeTab === tab ? 1 : 0.6 }} />
      <span style={{ fontSize: '0.75rem', fontWeight: activeTab === tab ? '600' : '400' }}>{label}</span>
    </button>
  );

  return (
    <div className="app-wrapper">
      {currentView !== 'selector' && currentView !== 'scanner' && (
        <header className="header glass-panel" style={{ margin: '10px', borderRadius: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              onClick={handleGoHome} 
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--text-primary)' }}
            >
              <ChevronLeft size={24} />
            </button>
            <div>
              <h2 className="text-gradient" style={{ margin: 0, fontSize: '1.2rem' }}>NaviStadium</h2>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {selectedStadium?.name || ''}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'var(--accent-light)', border: '1px solid rgba(37, 99, 235, 0.2)', borderRadius: '20px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--accent-color)' }}>GPS Locked</span>
            <Navigation size={14} color="var(--accent-color)" />
          </div>
        </header>
      )}


      <main className="main-content" style={{ paddingBottom: currentView === 'main' ? '80px' : '0', flex: 1, position: 'relative' }}>
        {currentView === 'selector' && (
          <StadiumSelector onSelect={handleStadiumSelect} />
        )}
        
        {currentView === 'seat_selection' && (
          <SeatSelector stadium={selectedStadium} onConfirm={handleSeatConfirm} />
        )}

        {currentView === 'scanner' && (
          <WiFiScanner />
        )}

        {currentView === 'main' && activeTab === 'map' && (
          <StadiumMap customRoute={customRoute} selectedSeat={selectedSeat} />
        )}

        {currentView === 'main' && activeTab === 'wait_times' && (
          <WaitTimes onRoute={(item) => {
            setCustomRoute(item);
            setActiveTab('map');
          }} />
        )}

        {currentView === 'main' && activeTab === 'ar' && (
          <AROverlay />
        )}
      </main>

      {currentView === 'main' && (
        <div className="glass-panel" style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          right: '10px',
          padding: '12px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          zIndex: 100,
          borderRadius: '24px',
          background: 'rgba(30, 41, 59, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.5)'
        }}>
          <NavButton tab="map" icon={MapIcon} label="Map" />
          <NavButton tab="wait_times" icon={Clock} label="Services" />
          <NavButton tab="ar" icon={Camera} label="AR Guide" />
        </div>
      )}
    </div>
  );
}

export default App;
