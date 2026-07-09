import React, { useState } from 'react';
import { ActiveTab, ExplorerState, Mission } from '../types';
import { 
  PixelEarth, 
  PixelOrange, 
  PixelBlue, 
  PixelTeal, 
  PixelPurple, 
  PixelAstronaut, 
  PixelAstronautHero,
  PixelRocket, 
  PixelStar, 
  PixelStarCoin,
  PixelTrophy,
  PixelAsteroid,
  PixelAsteroidAlt
} from './PixelArtwork';

import { playSound } from '../utils/sound';
import { FlightSimulator } from './FlightSimulator';

interface HomeProps {
  setActiveTab: (tab: ActiveTab) => void;
  state: ExplorerState;
  missions: Mission[];
  completeMission: (id: string) => void;
  addXp: (amount: number) => void;
  addCoins: (amount: number) => void;
  triggerToast: (title: string, desc: string, icon?: string) => void;
}

export const HomeView: React.FC<HomeProps> = ({
  setActiveTab,
  state,
  missions,
  completeMission,
  addXp,
  addCoins,
  triggerToast,
}) => {
  const [isPressStartHovered, setIsPressStartHovered] = useState(false);
  const [isLaunchingNext, setIsLaunchingNext] = useState(false);
  const [showSimulator, setShowSimulator] = useState(false);

  // Calculate dynamic rank based on Level
  const getRankName = (lvl: number) => {
    if (lvl <= 1) return 'COSMIC CADET';
    if (lvl === 2) return 'STAR SCOUT';
    if (lvl === 3) return 'ASTEROID PILOT';
    if (lvl === 4) return 'NEBULA NAVIGATOR';
    if (lvl === 5) return 'GALAXY EXPLORER';
    return 'STARFLEET LEGEND';
  };

  const handlePressStart = () => {
    playSound('warp', state.soundEnabled);
    addXp(50);
    setActiveTab('about');
  };

  const handleLaunchNext = () => {
    playSound('laser', state.soundEnabled);
    setIsLaunchingNext(true);
    setTimeout(() => {
      setActiveTab('events');
      setIsLaunchingNext(false);
    }, 8000);
  };

  const handleDestinationClick = (tabId: ActiveTab) => {
    playSound('warp', state.soundEnabled);
    setActiveTab(tabId);
  };

  // 5 destinations cards matching bottom row
  const destinations: { id: ActiveTab; label: string; difficulty: number; planet: React.ReactNode }[] = [
    { id: 'about', label: 'ABOUT US', difficulty: 3, planet: <PixelEarth /> },
    { id: 'events', label: 'EVENTS', difficulty: 4, planet: <PixelOrange /> },
    { id: 'gallery', label: 'GALLERY', difficulty: 3, planet: <PixelBlue /> },
    { id: 'sponsors', label: 'SPONSORS', difficulty: 2, planet: <PixelTeal /> },
    { id: 'contact', label: 'CONTACT', difficulty: 3, planet: <PixelPurple /> },
  ];

  return (
    <div className="w-full relative px-4 py-8 overflow-hidden select-none">
      
      {/* Main Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">

        
        {/* Left column: Mission Status HUD */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="bg-[#0b011d]/95 border-4 border-purple-900 rounded p-4 relative shadow-[0_0_15px_rgba(124,58,237,0.3)]">
            <h3 className="font-pixel text-xs text-cyan-400 tracking-wider mb-4 border-b-2 border-purple-950 pb-2 flex items-center gap-1.5">
              <span>●</span> MISSION STATUS
            </h3>
            
            {/* Missions Completed Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between font-mono text-sm text-purple-300 font-bold mb-1">
                <span>MISSIONS:</span>
                <span className="text-cyan-400">{state.completedMissions.length}/07</span>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 7 }).map((_, idx) => {
                  const isCompleted = idx < state.completedMissions.length;
                  return (
                    <div 
                      key={idx}
                      className={`h-5 flex-1 border border-purple-950 ${
                        isCompleted 
                          ? 'bg-gradient-to-t from-cyan-600 to-cyan-400 shadow-[0_0_4px_rgba(6,182,212,0.5)]' 
                          : 'bg-purple-950/40'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Star Coins Balance */}
            <div className="mb-6 flex items-center gap-3 bg-[#110526] p-2.5 border border-purple-950 rounded">
              <PixelStarCoin className="w-8 h-8 flex-shrink-0" />
              <div>
                <span className="font-pixel text-xs text-yellow-500 leading-none block font-bold">STAR COINS</span>
                <span className="font-tall text-2xl text-yellow-400 leading-none font-bold block mt-1">
                  {state.coins}
                </span>
              </div>
            </div>

            {/* Current Explorer Rank */}
            <div className="flex items-center gap-3 bg-[#110526] p-2.5 border border-purple-950 rounded">
              <PixelTrophy className="w-8 h-8 flex-shrink-0" />
              <div>
                <span className="font-pixel text-xs text-purple-300 leading-none block font-bold">RANK</span>
                <span className="font-pixel text-xs text-purple-200 block mt-1 tracking-wider font-semibold">
                  {getRankName(state.level)}
                </span>
              </div>
            </div>
          </div>

          {/* Hey Explorer Helper Box */}
          <div className="bg-[#0b011d]/95 border-4 border-purple-900 rounded p-4 relative shadow-[0_0_15px_rgba(124,58,237,0.2)] flex items-center gap-4">
            <div className="w-12 h-12 flex-shrink-0 relative">
              <PixelAstronaut pose="standing" className="w-16 h-16 -left-2 -top-2" />
            </div>
            <div className="flex-1">
              <h4 className="font-pixel text-xs text-yellow-500 tracking-wider font-bold">HEY EXPLORER!</h4>
              <p className="font-mono text-xs text-purple-300 font-bold mt-1 leading-snug">
                Complete missions to earn Star Coins and unlock galactic rewards!
              </p>
            </div>
          </div>
        </div>

        {/* Center column: Main Astro surface & Title (Open space with no box) */}
        <div className="lg:col-span-6 flex flex-col items-center justify-between min-h-[500px] relative p-2">
          
          {showSimulator ? (
            <div className="w-full flex flex-col items-center gap-4 animate-[fadeIn_0.3s_ease-out]">
              <div className="w-full flex items-center justify-between bg-[#12052c] border-2 border-purple-900 rounded p-3 mb-1">
                <span className="font-pixel text-xs text-purple-300 font-bold">STARFLEET INTERACTIVE UNIT</span>
                <button
                  onClick={() => {
                    playSound('click', state.soundEnabled);
                    setShowSimulator(false);
                  }}
                  className="font-pixel text-xs bg-red-950/60 hover:bg-red-900 border border-red-700 text-red-400 hover:text-white px-2.5 py-1.5 rounded cursor-pointer transition-colors font-bold"
                >
                  ◀ BACK TO COCKPIT
                </button>
              </div>

              <FlightSimulator 
                state={state}
                addCoins={addCoins}
                addXp={addXp}
                triggerToast={triggerToast}
              />
            </div>
          ) : (
            <>
              {/* Big Title & Slogan */}
              <div className="text-center w-full z-10 mt-2 overflow-visible">
                <h1 className="font-pixel text-4xl sm:text-6xl md:text-7xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-yellow-400 select-none tracking-widest leading-none drop-shadow-[5px_5px_0px_rgba(124,58,237,0.7)] animate-neon whitespace-nowrap">
                  ELICIT'26
                </h1>
                <p className="font-pixel text-[10px] sm:text-sm text-cyan-400 tracking-widest mt-3.5 font-bold whitespace-nowrap uppercase">
                  EXPLORE. INNOVATE. ELEVATE.
                </p>
              </div>

              {/* Action Buttons Container - Centered below Title */}
              <div className="z-10 w-full flex flex-col items-center gap-4 my-4">
                <button
                  onClick={handlePressStart}
                  onMouseEnter={() => {
                    setIsPressStartHovered(true);
                    playSound('hover', state.soundEnabled);
                  }}
                  onMouseLeave={() => setIsPressStartHovered(false)}
                  className={`font-pixel text-xs sm:text-sm px-6 py-3.5 border-4 border-yellow-400 text-yellow-400 bg-[#3b0d75] shadow-[0_0_15px_rgba(250,204,21,0.4)] cursor-pointer hover:bg-yellow-400 hover:text-black hover:shadow-[0_0_25px_rgba(250,204,21,0.7)] rounded transition-all duration-150 relative ${
                    isPressStartHovered ? 'scale-105' : ''
                  }`}
                >
                  <span>PRESS START </span>
                  <span className={`inline-block ml-1 ${isPressStartHovered ? 'animate-ping' : 'animate-pulse'}`}>▶</span>
                </button>

                {/* Minigame Launch trigger */}
                <button
                  onClick={() => {
                    playSound('warp', state.soundEnabled);
                    setShowSimulator(true);
                  }}
                  onMouseEnter={() => playSound('hover', state.soundEnabled)}
                  className="font-pixel text-xs text-cyan-400 hover:text-white bg-purple-950/50 hover:bg-purple-900 border-2 border-purple-800 hover:border-cyan-400 px-4 py-2.5 rounded flex items-center gap-2 cursor-pointer transition-all animate-pulse font-bold tracking-wider"
                >
                  <span>🕹️ SIMULATOR GAME DRILL</span>
                </button>
              </div>

              {/* Standing Astronaut and Planet Horizon Artwork (Beautiful wide horizon spanning across) */}
              <div className="relative w-full h-64 flex flex-col items-center justify-end overflow-visible mt-auto">
                {/* Back-view Astronaut replaced by beautiful front-facing Hero Astronaut */}
                <div className="relative z-20 mb-4 scale-110">
                  <PixelAstronautHero className="w-56 h-56 sm:w-64 sm:h-64" />
                </div>

                {/* Big planet-type curvature platform extending downwards */}
                <div className="absolute bottom-[-112px] left-1/2 -translate-x-1/2 w-[220%] sm:w-[280%] lg:w-[320%] h-32 bg-gradient-to-b from-[#1b0c33] via-[#0d0424] to-[#070114] border-t-4 border-purple-500 rounded-t-[100%] shadow-[0_-12px_24px_rgba(124,58,237,0.4)] z-10 overflow-hidden flex flex-col items-center justify-start pt-6">
                  {/* Subtle neon grid or crater elements inside the curvature */}
                  <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #c084fc 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }} />
                  
                  {/* Craters */}
                  <div className="w-16 h-3.5 bg-[#090214] rounded-full opacity-60 blur-[0.5px] absolute top-4 left-[20%] border border-purple-900/30" />
                  <div className="w-12 h-2.5 bg-[#090214] rounded-full opacity-50 blur-[0.5px] absolute top-6 right-[25%] border border-purple-900/30" />
                  <div className="w-20 h-4 bg-[#090214] rounded-full opacity-65 blur-[0.5px] absolute top-8 left-[45%] border border-purple-900/30" />
                  <div className="w-10 h-2.5 bg-[#090214] rounded-full opacity-40 blur-[0.5px] absolute top-10 right-[15%] border border-purple-900/30" />
                </div>
              </div>
            </>
          )}

        </div>


        {/* Right column: Next Mission Finder & Achievements */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          
          {/* Next Mission HUD */}
          <div className="bg-[#0b011d]/95 border-4 border-purple-900 rounded p-4 relative shadow-[0_0_15px_rgba(124,58,237,0.3)] flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-pixel text-xs text-cyan-400 tracking-wider mb-4 border-b-2 border-purple-950 pb-2 flex items-center gap-1.5">
                <span>●</span> NEXT MISSION
              </h3>

              {/* Orbiting Purple planet */}
              <div className="w-20 h-20 mx-auto my-3 flex items-center justify-center animate-[bounce_4s_infinite]">
                <PixelPurple />
              </div>

              <div className="text-center mt-2 px-1">
                <span className="font-pixel text-xs text-yellow-400 block tracking-widest font-bold">EVENTS</span>
                <p className="font-mono text-xs text-purple-300 font-bold mt-1 leading-snug">
                  Explore all upcoming competitive missions and technical challenges.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-purple-950/50">
              <button
                onClick={handleLaunchNext}
                onMouseEnter={() => playSound('hover', state.soundEnabled)}
                disabled={isLaunchingNext}
                className={`w-full font-pixel text-xs bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold py-2.5 px-4 border-b-4 border-r-4 border-cyan-800 rounded active:translate-x-0.5 active:translate-y-0.5 hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer ${
                  isLaunchingNext ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <span>{isLaunchingNext ? 'WARPING...' : 'LAUNCH'}</span>
                <span>▶</span>
              </button>
            </div>
          </div>

          {/* Latest Achievement Unlocked Panel */}
          <div className="bg-[#0b011d]/95 border-4 border-yellow-500/70 rounded p-4 relative shadow-[0_0_15px_rgba(250,204,21,0.2)]">
            <h3 className="font-pixel text-xs text-yellow-400 tracking-widest mb-3 flex items-center gap-1 font-bold">
              ⭐ ACHIEVEMENT UNLOCKED
            </h3>
            <div className="flex items-center gap-3 bg-yellow-950/20 p-2.5 border border-yellow-600/30 rounded">
              <span className="text-2xl">🚀</span>
              <div>
                <span className="font-pixel text-xs text-yellow-400 block tracking-wider leading-none font-bold">FIRST STEPS</span>
                <span className="font-mono text-xs text-purple-200 block mt-1 leading-tight font-bold">
                  Visited 3 planetary coordinates!
                </span>
                <span className="font-tall text-sm text-yellow-400 block mt-1 leading-none font-bold">
                  +100 STAR COINS 🪙
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Panel: CHOOSE YOUR DESTINATION Row */}
      <div className="max-w-7xl mx-auto mt-8 relative z-10 bg-[#070114]/60 border-4 border-purple-900 rounded p-5 shadow-2xl">
        <h2 className="font-pixel text-center text-xs text-cyan-400 tracking-widest mb-4 flex items-center justify-center gap-2">
          🚀 CHOOSE YOUR DESTINATION 🚀
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {destinations.map((dest) => {
            const isCompleted = state.completedMissions.includes(`${dest.id}-mission`);
            return (
              <div
                key={dest.id}
                onClick={() => handleDestinationClick(dest.id)}
                onMouseEnter={() => playSound('hover', state.soundEnabled)}
                className="bg-[#0b011d] border-2 border-purple-800 hover:border-yellow-400 rounded p-3.5 flex flex-col items-center justify-between text-center cursor-pointer hover:shadow-[0_0_12px_rgba(234,179,8,0.3)] hover:-translate-y-1 transition-all duration-150 group"
              >
                {/* Planet Drawing */}
                <div className="w-16 h-16 my-2 group-hover:scale-110 transition-transform">
                  {dest.planet}
                </div>

                {/* Destination Label */}
                <span className="font-pixel text-xs text-purple-200 group-hover:text-yellow-400 tracking-wider font-semibold">
                  {dest.label}
                </span>

                {/* Difficulty Stars */}
                <div className="flex items-center gap-0.5 mt-2.5">
                  {Array.from({ length: 5 }).map((_, sIdx) => (
                    <PixelStar 
                      key={sIdx} 
                      filled={sIdx < dest.difficulty} 
                      className="w-3.5 h-3.5"
                    />
                  ))}
                </div>

                {/* Mini Play / Action Button */}
                <div className="mt-3.5 w-7 h-7 bg-purple-950 border border-purple-700 hover:border-yellow-400 hover:bg-yellow-400 hover:text-black rounded flex items-center justify-center text-[10px] text-purple-300 font-bold transition-all">
                  ▶
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
