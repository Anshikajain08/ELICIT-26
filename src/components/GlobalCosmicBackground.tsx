import React from 'react';
import { 
  PixelPurple, 
  PixelOrange, 
  PixelBlue, 
  PixelAsteroid, 
  PixelAsteroidAlt,
  PixelSpiralGalaxy,
  PixelSpaceStation
} from './PixelArtwork';

interface BackgroundProps {
  activeTab?: string;
}

export const GlobalCosmicBackground: React.FC<BackgroundProps> = ({ activeTab = 'home' }) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none bg-[#04010b]">
      {/* Dynamic Ambient Background color matching the active tab */}
      {activeTab === 'home' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#060112] via-[#09031c] to-[#04000b]" />
      )}
      {activeTab === 'about' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#03010a] via-[#07031c] to-[#040010]" />
      )}
      {activeTab === 'gallery' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#020008] via-[#050212] to-[#030006]" />
      )}
      {activeTab !== 'home' && activeTab !== 'about' && activeTab !== 'gallery' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#05010e] via-[#060214] to-[#030008]" />
      )}
      
      {/* Nebulae purple/blue glow spots */}
      <div className="absolute top-[10%] left-[5%] w-[45%] h-[45%] rounded-full bg-purple-900/12 blur-[120px]" />
      <div className="absolute bottom-[15%] right-[8%] w-[40%] h-[40%] rounded-full bg-blue-900/18 blur-[120px]" />
      <div className="absolute top-[40%] right-[20%] w-[35%] h-[35%] rounded-full bg-fuchsia-900/8 blur-[100px]" />

      {/* Cybernetic Grid - Opacity changes per page for unique contrast */}
      <div className={`absolute inset-0 retro-grid-bg transition-opacity duration-500 ${
        activeTab === 'gallery' ? 'opacity-10' : activeTab === 'about' ? 'opacity-15' : 'opacity-25'
      }`} />

      {/* Dynamic Starfield with twinkle animations */}
      <div className="absolute inset-0 opacity-75">
        <div className="absolute w-1 h-1 bg-white rounded-full top-[8%] left-[15%] animate-[pulse_1.5s_infinite]" />
        <div className="absolute w-1.5 h-1.5 bg-yellow-300 rounded-full top-[12%] left-[45%] animate-[pulse_2s_infinite]" />
        <div className="absolute w-1 h-1 bg-cyan-300 rounded-full top-[25%] left-[8%] animate-[pulse_2.5s_infinite]" />
        <div className="absolute w-1.5 h-1.5 bg-white rounded-full top-[32%] left-[78%] animate-[pulse_1.8s_infinite]" />
        <div className="absolute w-1 h-1 bg-fuchsia-300 rounded-full top-[48%] left-[23%] animate-[pulse_3s_infinite]" />
        <div className="absolute w-1 h-1 bg-white rounded-full top-[55%] left-[88%] animate-[pulse_1.2s_infinite]" />
        <div className="absolute w-2 h-2 bg-yellow-200 rounded-full top-[68%] left-[12%] animate-[pulse_2.2s_infinite]" />
        <div className="absolute w-1 h-1 bg-cyan-200 rounded-full top-[75%] left-[42%] animate-[pulse_1.7s_infinite]" />
        <div className="absolute w-1.5 h-1.5 bg-white rounded-full top-[82%] left-[65%] animate-[pulse_2.8s_infinite]" />
        <div className="absolute w-1 h-1 bg-purple-300 rounded-full top-[90%] left-[28%] animate-[pulse_1.4s_infinite]" />
        <div className="absolute w-1 h-1 bg-white rounded-full top-[18%] left-[93%] animate-[pulse_2.1s_infinite]" />
        <div className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full top-[62%] left-[94%] animate-[pulse_1.9s_infinite]" />
      </div>

      {/* ----------------- HOME VIEW EXCLUSIVE BACKGROUND ----------------- */}
      {activeTab === 'home' && (
        <>
          {/* LARGE SATURN-LIKE PLANET (LEFT MARGIN) */}
          <div className="absolute -left-10 lg:left-[2%] top-[14%] w-48 h-48 lg:w-72 lg:h-72 opacity-40 lg:opacity-90 transition-all duration-500">
            <PixelPurple />
            <div className="absolute inset-0 rounded-full border border-purple-500/20 scale-[1.4] -rotate-12" />
            <div className="absolute inset-0 rounded-full border border-pink-500/10 scale-[1.8] -rotate-12" />
          </div>

          {/* MEDIUM RED/ORANGE PLANET (RIGHT MARGIN) */}
          <div className="absolute -right-8 lg:right-[4%] top-[16%] w-36 h-36 lg:w-56 lg:h-56 opacity-40 lg:opacity-95 transition-all duration-500">
            <PixelOrange />
          </div>

          {/* SMALL BLUE PLANET (RIGHT MIDDLE BACKDROP) */}
          <div className="absolute right-[16%] top-[48%] w-12 h-12 lg:w-20 lg:h-20 opacity-30 lg:opacity-60 animate-[bounce_8s_infinite]">
            <PixelBlue />
          </div>

          {/* DECORATIVE SPACE CRUISE ROCKET (ZOOMING UPWARD) */}
          <div className="absolute right-[24%] top-[26%] w-12 h-12 lg:w-20 lg:h-20 opacity-20 lg:opacity-85 animate-float-slow transform -rotate-45">
            <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">
              <g stroke="#000" strokeWidth="2" strokeLinejoin="miter">
                <path d="M 12,52 L 2,62 L 6,50 Z" fill="#ef4444" className="animate-pulse" />
                <path d="M 10,50 L 5,55 L 7,48 Z" fill="#f59e0b" className="animate-pulse" />
                <path d="M 12,42 L 6,48 L 18,48 Z" fill="#dc2626" />
                <path d="M 32,22 L 38,16 L 38,28 Z" fill="#dc2626" />
                <path d="M 14,44 L 36,22 L 48,22 L 52,26 L 52,38 L 44,42 Z" fill="#f3f4f6" />
                <path d="M 44,22 L 54,12 C 58,8 60,8 62,2 C 56,4 56,6 52,10 Z" fill="#ef4444" />
                <circle cx="34" cy="30" r="3" fill="#38bdf8" />
                <circle cx="35" cy="29" r="1" fill="#fff" />
              </g>
            </svg>
          </div>

          {/* FLOATING SPACE ROCKS / ASTEROIDS */}
          <div className="absolute left-[3%] top-[45%] w-12 h-12 opacity-40 lg:opacity-85 animate-float-slow">
            <PixelAsteroid />
          </div>
          <div className="absolute left-[10%] top-[25%] w-8 h-8 opacity-30 lg:opacity-75 animate-float-medium">
            <PixelAsteroidAlt />
          </div>
          <div className="absolute left-[6%] top-[72%] w-14 h-14 opacity-35 lg:opacity-90 animate-float-fast">
            <PixelAsteroidAlt />
          </div>
          <div className="absolute right-[2%] top-[40%] w-10 h-10 opacity-45 lg:opacity-90 animate-float-medium">
            <PixelAsteroidAlt />
          </div>
          <div className="absolute right-[10%] top-[68%] w-12 h-12 opacity-35 lg:opacity-80 animate-float-slow">
            <PixelAsteroid />
          </div>
          <div className="absolute right-[14%] top-[12%] w-9 h-9 opacity-25 lg:opacity-75 animate-float-fast">
            <PixelAsteroid />
          </div>
        </>
      )}

      {/* ----------------- ABOUT VIEW EXCLUSIVE BACKGROUND ----------------- */}
      {activeTab === 'about' && (
        <>
          {/* Distant tiny asteroids floating */}
          <div className="absolute left-[8%] top-[15%] w-10 h-10 opacity-35 animate-float-slow">
            <PixelAsteroid />
          </div>
          <div className="absolute right-[10%] top-[12%] w-8 h-8 opacity-40 animate-float-medium">
            <PixelAsteroidAlt />
          </div>

          {/* Small flying cruising ship */}
          <div className="absolute right-[22%] top-[15%] w-16 h-16 opacity-75 animate-float-slow">
            <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_12px_rgba(59,130,246,0.5)] transform rotate-12">
              <g stroke="#000" strokeWidth="1.5" strokeLinejoin="miter">
                <path d="M 12,48 L 4,56 L 8,46 Z" fill="#3b82f6" />
                <path d="M 14,40 L 38,20 L 52,24 L 46,38 L 22,42 Z" fill="#ffffff" />
                <path d="M 40,22 L 58,10 C 56,18 48,26 40,22 Z" fill="#60a5fa" />
                <circle cx="28" cy="30" r="2.5" fill="#38bdf8" />
              </g>
            </svg>
          </div>

          {/* Large curved planet horizon along the bottom of the page */}
          <div className="absolute bottom-[-150px] left-[-10%] right-[-10%] h-[350px] bg-gradient-to-t from-[#0e163d] via-[#1034a6]/40 to-transparent border-t-2 border-cyan-500/40 rounded-[100%_100%_0_0] opacity-80 shadow-[0_-15px_40px_rgba(6,182,212,0.25)]" />
        </>
      )}

      {/* ----------------- GALLERY VIEW EXCLUSIVE BACKGROUND ----------------- */}
      {activeTab === 'gallery' && (
        <>
          {/* Swirling Spiral Galaxy in the top-right corner */}
          <div className="absolute top-[8%] right-[5%] w-32 h-32 lg:w-48 lg:h-48 opacity-80 transition-all duration-500 z-0">
            <PixelSpiralGalaxy className="w-full h-full" />
          </div>

          {/* Soft background blue constellation lines details */}
          <div className="absolute inset-0 opacity-15">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <line x1="20%" y1="30%" x2="40%" y2="50%" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="40%" y1="50%" x2="60%" y2="25%" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="60%" y1="25%" x2="80%" y2="45%" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="40%" y1="50%" x2="55%" y2="75%" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="55%" y1="75%" x2="72%" y2="85%" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
            </svg>
          </div>
        </>
      )}
    </div>
  );
};
