import React, { useState } from 'react';
import { ExplorerState, Sponsor } from '../types';
import { INITIAL_SPONSORS } from '../data';
import { playSound } from '../utils/sound';
import { ExternalLink, Cpu, Layers, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CosmicSponsorsBackground } from './CosmicSponsorsBackground';

interface SponsorsProps {
  state: ExplorerState;
  completeMission: (id: string) => void;
}

export const SponsorsView: React.FC<SponsorsProps> = ({ state, completeMission }) => {
  const [activeSponsor, setActiveSponsor] = useState<Sponsor | null>(null);

  React.useEffect(() => {
    // Complete the sponsor inspection mission
    completeMission('sponsor-mission');
  }, []);

  const handleSponsorClick = (sp: Sponsor) => {
    playSound('success', state.soundEnabled);
    setActiveSponsor(sp === activeSponsor ? null : sp);
  };

  const supernovaSponsors = INITIAL_SPONSORS.filter(s => s.category === 'supernova');
  const nebulaSponsors = INITIAL_SPONSORS.filter(s => s.category === 'nebula');
  const asteroidSponsors = INITIAL_SPONSORS.filter(s => s.category === 'asteroid');

  return (
    <div className="w-full relative px-6 py-8 md:py-12 select-none animate-[fadeIn_0.5s_ease-out] overflow-hidden">
      {/* Clean, cosmic background layer with orbits and drifting spacecraft */}
      <CosmicSponsorsBackground />

      <div className="max-w-7xl mx-auto flex flex-col gap-10 relative z-10">
        
        {/* Elegant Header */}
        <div className="text-center mb-2">
          <span className="font-pixel text-xs text-cyan-400 tracking-[0.25em] block mb-2 uppercase animate-pulse">
            ✦ STARFLEET ACQUISITIONS & ALIGNMENTS ✦
          </span>
          <h2 className="font-pixel text-2xl md:text-3xl text-white tracking-wider">
            COSMIC <span className="text-yellow-400 animate-pulse">PARTNERS</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-purple-200 mt-4 max-w-2xl mx-auto leading-relaxed font-bold">
            Leading organizations powering the ACM Student Chapter with warp energy, advanced developer resources, and prize reserves.
          </p>
        </div>

        {/* Detailed Bubble Popup for selected sponsor */}
        <AnimatePresence mode="wait">
          {activeSponsor && (
            <motion.div 
              key={activeSponsor.id}
              initial={{ opacity: 0, y: -15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="bg-[#12052c] border-2 border-yellow-500 rounded-lg p-5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_15px_rgba(234,179,8,0.3)]"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-950 border border-purple-800 rounded-lg flex items-center justify-center font-pixel text-lg text-yellow-400">
                  {activeSponsor.category === 'supernova' ? '⭐' : activeSponsor.category === 'nebula' ? '💎' : '☄️'}
                </div>
                <div>
                  <span className="font-pixel text-xs text-purple-300 uppercase font-bold tracking-wider">
                    {activeSponsor.category} SPONSOR
                  </span>
                  <h3 className="font-pixel text-sm text-white mt-1">{activeSponsor.name}</h3>
                  <p className="font-mono text-xs text-purple-200 mt-1.5 leading-relaxed font-bold">
                    {activeSponsor.description}
                  </p>
                </div>
              </div>

              <a
                href={activeSponsor.website}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => playSound('hover', state.soundEnabled)}
                onClick={() => playSound('click', state.soundEnabled)}
                className="font-pixel text-xs bg-yellow-400 text-black px-4 py-2.5 rounded hover:bg-yellow-300 border-b-4 border-yellow-700 active:translate-y-0.5 flex items-center gap-1.5 flex-shrink-0 cursor-pointer font-bold tracking-wider"
              >
                <span>VISIT TERMINAL</span>
                <ExternalLink size={12} />
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tier 1: SUPERNOVA (Huge Glowing Cards) */}
        <div className="mb-10">
          <h3 className="font-pixel text-sm text-red-400 tracking-widest mb-4 flex items-center gap-1.5 justify-center md:justify-start font-bold">
            <Cpu size={14} /> SUPERNOVA PARTNERS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supernovaSponsors.map((sp, idx) => {
              const isSelected = activeSponsor?.id === sp.id;
              return (
                <motion.div
                  key={sp.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onClick={() => handleSponsorClick(sp)}
                  onMouseEnter={() => playSound('hover', state.soundEnabled)}
                  className={`bg-[#0b011d]/90 border-4 rounded p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-colors duration-300 group ${
                    isSelected
                      ? 'border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.35)] bg-[#12052c]'
                      : 'border-red-900 hover:border-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                  }`}
                >
                  {/* Simulated Logo Emblem */}
                  <div className={`w-16 h-16 bg-[#12052c] border-2 rounded-full flex items-center justify-center text-3xl transition-all duration-300 shadow-inner ${
                    isSelected ? 'border-yellow-400 scale-110' : 'border-red-950 group-hover:border-red-500 group-hover:scale-110'
                  }`}>
                    {sp.id === 'google' ? '☁️' : sp.id === 'github' ? '🐙' : '🏫'}
                  </div>
                  <h4 className={`font-pixel text-xs mt-4 tracking-wider transition-colors duration-300 ${
                    isSelected ? 'text-yellow-400' : 'text-white group-hover:text-red-400'
                  }`}>
                    {sp.name}
                  </h4>
                  <p className="font-mono text-xs text-purple-400 mt-2.5 font-bold">
                    [RECONSTRUCTED MEMORY]
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Tier 2: NEBULA (Medium Cards) */}
        <div className="mb-10">
          <h3 className="font-pixel text-sm text-cyan-400 tracking-widest mb-4 flex items-center gap-1.5 justify-center md:justify-start font-bold">
            <Layers size={14} /> NEBULA SUPPORT
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nebulaSponsors.map((sp, idx) => {
              const isSelected = activeSponsor?.id === sp.id;
              return (
                <motion.div
                  key={sp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  onClick={() => handleSponsorClick(sp)}
                  onMouseEnter={() => playSound('hover', state.soundEnabled)}
                  className={`bg-[#0b011d]/90 border-2 rounded p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors duration-300 group ${
                    isSelected
                      ? 'border-yellow-400 shadow-[0_0_18px_rgba(250,204,21,0.35)] bg-[#12052c]'
                      : 'border-cyan-800 hover:border-cyan-400 hover:shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                  }`}
                >
                  <div className={`w-12 h-12 bg-[#12052c] border rounded-lg flex items-center justify-center text-2xl transition-all duration-300 ${
                    isSelected ? 'border-yellow-400 scale-105' : 'border-cyan-900 group-hover:border-cyan-400 group-hover:scale-105'
                  }`}>
                    {sp.id === 'devfolio' ? '💼' : sp.id === 'polygon' ? '💜' : '🚀'}
                  </div>
                  <h4 className={`font-pixel text-xs mt-3 tracking-wider transition-colors duration-300 ${
                    isSelected ? 'text-yellow-400 font-bold' : 'text-white group-hover:text-cyan-400 font-bold'
                  }`}>
                    {sp.name}
                  </h4>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Tier 3: ASTEROID (Small Cards) */}
        <div>
          <h3 className="font-pixel text-sm text-purple-400 tracking-widest mb-4 flex items-center gap-1.5 justify-center md:justify-start font-bold">
            <Zap size={14} /> ASTEROID SUPPLIES
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {asteroidSponsors.map((sp, idx) => {
              const isSelected = activeSponsor?.id === sp.id;
              return (
                <motion.div
                  key={sp.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  onClick={() => handleSponsorClick(sp)}
                  onMouseEnter={() => playSound('hover', state.soundEnabled)}
                  className={`bg-[#0b011d]/90 border rounded p-3 flex items-center gap-3 cursor-pointer transition-colors duration-300 group ${
                    isSelected
                      ? 'border-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.35)] bg-[#12052c]'
                      : 'border-purple-900 hover:border-purple-500 hover:shadow-[0_0_8px_rgba(168,85,247,0.2)]'
                  }`}
                >
                  <div className={`w-9 h-9 bg-[#12052c] border rounded flex items-center justify-center text-lg flex-shrink-0 transition-all duration-300 ${
                    isSelected ? 'border-yellow-400' : 'border-purple-950 group-hover:border-purple-500'
                  }`}>
                    {sp.id === 'redbull' ? '🥫' : sp.id === 'figma' ? '🎨' : '💬'}
                  </div>
                  <h4 className={`font-pixel text-xs tracking-wide truncate transition-colors duration-300 ${
                    isSelected ? 'text-yellow-400 font-bold' : 'text-purple-200 group-hover:text-purple-100 font-semibold'
                  }`}>
                    {sp.name}
                  </h4>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
