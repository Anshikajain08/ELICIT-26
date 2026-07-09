import React from 'react';
import { ActiveTab, ExplorerState } from '../types';
import { PixelAstronaut, PixelStarCoin } from './PixelArtwork';
import { playSound } from '../utils/sound';
import { Volume2, VolumeX, Music, Music2 } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  state: ExplorerState;
  toggleSound: () => void;
  toggleMusic: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  state,
  toggleSound,
  toggleMusic,
  onOpenProfile,
}) => {
  const tabs: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT US' },
    { id: 'events', label: 'EVENTS' },
    { id: 'sponsors', label: 'SPONSORS' },
    { id: 'gallery', label: 'GALLERY' },
    { id: 'team', label: 'TEAM' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleTabClick = (tabId: ActiveTab) => {
    playSound('click', state.soundEnabled);
    setActiveTab(tabId);
  };

  const xpPercent = Math.min(100, Math.floor((state.xp / (state.level * 200)) * 100));

  return (
    <header className="w-full bg-[#050110]/80 backdrop-blur-md border-b-4 border-purple-950/80 sticky top-0 z-50 px-4 py-3 select-none shadow-[0_4px_25px_rgba(124,58,237,0.15)]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        
        {/* Logo and Brand */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleTabClick('home')}
        >
          <div className="w-10 h-10 flex-shrink-0 animate-[spin_8s_linear_infinite] group-hover:scale-110 transition-transform">
            <svg viewBox="0 0 64 64" className="w-full h-full">
              <circle cx="32" cy="32" r="20" fill="#a78bfa" />
              <path d="M 4,32 Q 32,12 60,32" stroke="#facc15" strokeWidth="4" fill="none" />
              <circle cx="25" cy="24" r="3" fill="#ffffff" />
            </svg>
          </div>
          <div>
            <h1 className="font-pixel text-xl lg:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 tracking-wider">
              ELICIT'26
            </h1>
            <p className="font-mono text-xs text-purple-400 font-bold tracking-widest mt-0.5">
              MUJ ACM STUDENT CHAPTER
            </p>
          </div>
        </div>

        {/* Central Retro Navigation */}
        <nav className="flex flex-wrap items-center justify-center gap-2 bg-[#12052c] p-1.5 border-2 border-purple-800 rounded-md">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                onMouseEnter={() => playSound('hover', state.soundEnabled)}
                className={`font-pixel text-[10px] sm:text-xs px-3 py-2 transition-all duration-150 relative ${
                  isActive
                    ? 'text-yellow-400 bg-purple-950 border-2 border-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.4)]'
                    : 'text-purple-300 hover:text-white border-2 border-transparent hover:border-purple-700'
                }`}
                style={{ imageRendering: 'pixelated' }}
              >
                {tab.label}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-yellow-400 border border-yellow-600 rounded-full animate-ping" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right side stats and controls */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          
          {/* Level & XP HUD */}
          <div className="flex items-center gap-2 bg-[#12052c] border-2 border-purple-800 rounded px-2.5 py-1.5">
            <div className="w-8 h-8 flex-shrink-0 relative">
              <PixelAstronaut pose="standing" className="w-12 h-12 -left-2 -top-2 scale-75" />
            </div>
            <div>
              <div className="flex items-center justify-between font-pixel text-[9px] text-purple-200">
                <span>EXPLORER</span>
                <span className="text-yellow-400 ml-2">LVL {String(state.level).padStart(2, '0')}</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-24 sm:w-28 h-2 bg-purple-950 border border-purple-700 overflow-hidden rounded relative">
                  <div 
                    className="h-full bg-cyan-400 transition-all duration-500 ease-out"
                    style={{ width: `${xpPercent}%` }}
                  />
                </div>
                <span className="font-tall text-sm text-cyan-400 leading-none">
                  {state.xp}/{state.level * 200}
                </span>
              </div>
            </div>
          </div>

          {/* Star Coins */}
          <div className="flex items-center gap-2 bg-[#12052c] border-2 border-yellow-500/70 rounded px-3 py-1.5">
            <div className="w-5 h-5 flex items-center justify-center">
              <PixelStarCoin className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-pixel text-[8px] text-yellow-500 leading-none">STAR COINS</span>
              <span className="font-tall text-lg text-yellow-400 leading-none font-bold mt-1">
                {state.coins}
              </span>
            </div>
          </div>

          {/* Astronaut Profile Button */}
          <button
            id="btn-header-profile"
            onClick={() => {
              playSound('click', state.soundEnabled);
              onOpenProfile();
            }}
            onMouseEnter={() => playSound('hover', state.soundEnabled)}
            className="flex items-center gap-2 bg-[#1b093a] border-2 border-cyan-500 hover:border-yellow-400 rounded px-3.5 py-1.5 cursor-pointer text-cyan-400 hover:text-yellow-400 transition-all font-pixel text-[9px] shadow-[0_0_10px_rgba(34,211,238,0.25)] hover:shadow-[0_0_15px_rgba(250,204,21,0.4)] hover:-translate-y-0.5 active:translate-y-0 flex-shrink-0"
          >
            <span>👨‍🚀</span>
            <span>PROFILE</span>
          </button>

          {/* Audio controls */}
          <div className="flex items-center gap-1 bg-[#12052c] border border-purple-800 rounded p-1">
            <button
              onClick={() => {
                toggleSound();
                playSound('click', !state.soundEnabled);
              }}
              className={`p-1.5 rounded hover:bg-purple-900 transition-colors ${
                state.soundEnabled ? 'text-yellow-400' : 'text-purple-600'
              }`}
              title={state.soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
            >
              {state.soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            <button
              onClick={toggleMusic}
              className={`p-1.5 rounded hover:bg-purple-900 transition-colors ${
                state.bgMusicEnabled ? 'text-cyan-400' : 'text-purple-600'
              }`}
              title={state.bgMusicEnabled ? 'Mute Chiptune BGM' : 'Play Chiptune BGM'}
            >
              <Music2 size={16} className={state.bgMusicEnabled ? 'animate-pulse' : ''} />
            </button>
          </div>

        </div>

      </div>
    </header>
  );
};
