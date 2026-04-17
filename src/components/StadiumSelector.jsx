import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

const stadiums = [
  { id: 'att', name: 'AT&T Stadium', location: 'Arlington, TX', capacity: '80,000', image: '/assets/att_stadium.png' },
  { id: 'metlife', name: 'MetLife Stadium', location: 'East Rutherford, NJ', capacity: '82,500', image: '/assets/metlife_stadium.png' },
  { id: 'sofi', name: 'SoFi Stadium', location: 'Inglewood, CA', capacity: '70,240', image: '/assets/sofi_stadium.png' }
];

export default function StadiumSelector({ onSelect }) {
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
          fontSize: '3rem', 
          fontWeight: 800, 
          background: 'linear-gradient(135deg, #60a5fa 0%, #a855f7 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '12px'
        }}>
          NaviStadium
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', fontWeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Navigation size={18} color="#60a5fa" />
          Next-Gen Indoor Navigation
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
        <h3 style={{ color: '#e2e8f0', fontSize: '1.2rem', fontWeight: 600, paddingLeft: '8px' }}>Select Venue</h3>
        {stadiums.map((stadium) => (
          <div 
            key={stadium.id} 
            onClick={() => onSelect(stadium)}
            style={{ 
              borderRadius: '24px',
              overflow: 'hidden',
              cursor: 'pointer',
              position: 'relative',
              height: '160px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.03) translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 30px 60px rgba(96, 165, 250, 0.2)';
              e.currentTarget.querySelector('.stadium-bg').style.filter = 'brightness(0.8) saturate(1.4)';
              e.currentTarget.querySelector('.enter-btn').style.background = 'rgba(96, 165, 250, 0.8)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1) translateY(0)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
              e.currentTarget.querySelector('.stadium-bg').style.filter = 'brightness(0.6) saturate(1.2)';
              e.currentTarget.querySelector('.enter-btn').style.background = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            <div 
              className="stadium-bg"
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: `url(${stadium.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.6) saturate(1.2)',
                transition: 'filter 0.3s ease'
              }} 
            />
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.2) 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '24px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <h4 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '6px', letterSpacing: '0.5px' }}>{stadium.name}</h4>
                  <p style={{ color: '#cbd5e1', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 300 }}>
                    <MapPin size={16} color="#94a3b8" /> {stadium.location}
                  </p>
                </div>
                <div 
                  className="enter-btn"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    padding: '8px 16px',
                    borderRadius: '30px',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    transition: 'background 0.3s ease'
                  }}>
                  Explore
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Events Section */}
      <div style={{ maxWidth: '600px', margin: '40px auto 0 auto', width: '100%', paddingBottom: '40px' }}>
        <h3 style={{ color: '#e2e8f0', fontSize: '1.2rem', fontWeight: 600, paddingLeft: '8px', marginBottom: '16px' }}>Upcoming Highlight Events</h3>
        <style dangerouslySetInnerHTML={{__html: `
          .events-scroll::-webkit-scrollbar { display: none; }
          .events-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />
        <div className="events-scroll" style={{ 
          display: 'flex', 
          overflowX: 'auto', 
          gap: '20px', 
          padding: '0 8px 20px 8px', 
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch'
        }}>
          {[
            { id: 1, title: 'LONE STAR SMOKEOUT', date: 'April 24 - April 26, 2026', image: '/lonestar_poster.png' },
            { id: 2, title: 'FIFA WORLD CUP 26 GROUP STAGE MATCH: NETHERLANDS V JAPAN', date: 'June 14, 2026', image: '/fifa_dallas.png' },
            { id: 3, title: 'FIFA WORLD CUP 26 GROUP STAGE MATCH: ENGLAND V CROATIA', date: 'June 17, 2026', image: '/fifa_dallas.png' }
          ].map((evt) => (
             <div key={evt.id} style={{ 
               minWidth: '280px', 
               maxWidth: '280px',
               background: '#ffffff', 
               borderRadius: '12px', 
               overflow: 'hidden',
               scrollSnapAlign: 'start',
               boxShadow: '0 12px 24px rgba(0,0,0,0.5)',
               display: 'flex',
               flexDirection: 'column'
             }}>
               <div style={{ height: '160px', width: '100%', backgroundImage: `url(${evt.image})`, backgroundSize: 'cover', backgroundPosition: 'top center', borderBottom: '2px solid rgba(0,0,0,0.05)' }} />
               <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flex: 1 }}>
                  <h4 style={{ color: '#0f172a', fontSize: '0.85rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '12px', minHeight: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{evt.title}</h4>
                  <div style={{ width: '60%', height: '1px', background: '#1e3a8a', opacity: 0.3, marginBottom: '12px' }}></div>
                  <p style={{ color: '#1e3a8a', fontSize: '0.8rem', fontWeight: 600, marginBottom: '24px' }}>{evt.date}</p>
                  <button style={{ 
                    marginTop: 'auto', 
                    background: 'transparent',
                    border: '1.5px solid #0f172a',
                    color: '#0f172a',
                    fontWeight: 800,
                    fontSize: '0.75rem',
                    padding: '8px 24px',
                    borderRadius: '24px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    width: '100%'
                   }}>MORE INFO</button>
               </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
