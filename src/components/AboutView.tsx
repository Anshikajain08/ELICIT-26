import React from 'react';
import { ActiveTab, ExplorerState } from '../types';
import { playSound } from '../utils/sound';
import { PixelSpaceStation } from './PixelArtwork';
import { motion } from 'motion/react';

interface AboutProps {
  state: ExplorerState;
  addXp: (amount: number) => void;
  completeMission: (id: string) => void;
  setActiveTab?: (tab: ActiveTab) => void;
}

const VALUES = [
  { icon: '⚡', label: 'INNOVATE', desc: 'Pushing boundaries with new ideas and technology.', color: '#ffd700', bg: 'rgba(250, 204, 21, 0.05)', shadow: 'rgba(250, 204, 21, 0.3)' },
  { icon: '🤝', label: 'COLLABORATE', desc: 'Stronger together, building the future.', color: '#22d3ee', bg: 'rgba(34, 211, 238, 0.05)', shadow: 'rgba(34, 211, 238, 0.3)' },
  { icon: '📚', label: 'LEARN', desc: 'Continuous learning fuels our growth.', color: '#a855f7', bg: 'rgba(168, 85, 247, 0.05)', shadow: 'rgba(168, 85, 247, 0.3)' },
  { icon: '🌍', label: 'IMPACT', desc: 'Creating real impact through technology.', color: '#22c55e', bg: 'rgba(34, 197, 94, 0.05)', shadow: 'rgba(34, 197, 94, 0.3)' },
];

const MILESTONES = [
  { year: '2019', label: 'Chapter Founded', icon: '🚀', color: '#22d3ee' },
  { year: '2021', label: "ELICIT'21 — 200+ participants", icon: '⭐', color: '#ffd700' },
  { year: '2023', label: "ELICIT'23 — 400+ participants", icon: '🪐', color: '#a855f7' },
  { year: '2024', label: '15+ Sponsors onboarded', icon: '🏆', color: '#f97316' },
  { year: '2025', label: 'ACM Best Chapter Award', icon: '👑', color: '#ffd700' },
  { year: '2026', label: "ELICIT'26 — The Cosmic Edition", icon: '🌌', color: '#22d3ee' },
];

const STATS = [
  { v: '4+', l: 'YEARS ACTIVE', c: '#ffd700' },
  { v: '200+', l: 'MEMBERS', c: '#22d3ee' },
  { v: '30+', l: 'EVENTS', c: '#a855f7' },
  { v: '1000+', l: 'LIVES IMPACTED', c: '#22c55e' },
];

export const AboutView: React.FC<AboutProps> = ({ state, addXp, completeMission, setActiveTab }) => {
  React.useEffect(() => {
    // Completes the 'base-mission' when user views the About page
    completeMission('base-mission');
  }, []);

  const handleWarpTab = (tab: ActiveTab) => {
    playSound('warp', state.soundEnabled);
    addXp(20);
    if (setActiveTab) {
      setActiveTab(tab);
    }
  };

  const handleScrollToJourney = () => {
    playSound('click', state.soundEnabled);
    const element = document.getElementById('journey-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full relative px-6 py-8 md:py-12 select-none animate-[fadeIn_0.5s_ease-out]">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Page Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Block */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-pixel text-xs text-cyan-400 tracking-[0.25em] block uppercase">
                ✦ ABOUT US ✦
              </span>
              <h2 className="font-pixel text-3xl sm:text-4xl lg:text-[40px] font-black text-white tracking-wider leading-[1.1]">
                OUR MISSION <br />
                OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-500 to-pink-500 font-extrabold animate-pulse">UNIVERSE</span>
              </h2>
            </div>

            <div className="flex flex-col gap-4 font-mono text-xs sm:text-sm text-purple-200 leading-relaxed font-bold">
              <p>
                ACM MUJ is a student chapter driven by{' '}
                <strong className="text-yellow-400">innovation</strong>,{' '}
                <strong className="text-cyan-400">collaboration</strong>, and a passion for technology.
                We build, we learn, we elevate.
              </p>
              <p>
                As a galactic node of technology and code, our mission is to foster continuous development, technical literacy, and state-of-the-art hacks. Together we journey into deep-space heights of computer science and technical mastery.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-2 flex flex-wrap gap-4">
              <button
                onClick={handleScrollToJourney}
                onMouseEnter={() => playSound('hover', state.soundEnabled)}
                className="font-pixel text-xs tracking-wider bg-yellow-400 hover:bg-yellow-300 text-black font-bold border-4 border-yellow-500 rounded px-5 py-3 cursor-pointer shadow-[0_0_10px_rgba(250,204,21,0.3)] transition-all"
              >
                OUR JOURNEY ▶
              </button>
              <button
                onClick={() => handleWarpTab('team')}
                onMouseEnter={() => playSound('hover', state.soundEnabled)}
                className="font-pixel text-xs tracking-wider bg-purple-950/20 hover:bg-purple-900/40 border-4 border-purple-700 hover:border-purple-400 text-purple-200 hover:text-white px-5 py-3 rounded cursor-pointer transition-all font-bold"
              >
                MEET THE TEAM
              </button>
            </div>
          </div>

          {/* Right Floating Space Station */}
          <div className="lg:col-span-5 flex items-center justify-center relative min-h-[300px]">
            {/* Soft background glow */}
            <div className="absolute w-60 h-60 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
            <PixelSpaceStation className="w-64 h-64 sm:w-72 sm:h-72 relative z-10 animate-[float-slow_6s_ease-in-out_infinite]" />
          </div>

        </div>

        {/* Pixel Divider */}
        <div className="h-1 bg-purple-950/60 w-full rounded border-b border-purple-900" />

        {/* Values Section */}
        <div className="flex flex-col gap-6">
          <p className="font-pixel text-xs text-purple-400 tracking-widest text-center font-bold">
            — OUR CORE VALUES —
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.label}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                onMouseEnter={() => playSound('hover', state.soundEnabled)}
                className="bg-[#0b011d]/90 border-4 rounded p-5 flex flex-col gap-3 relative transition-all duration-200 hover:-translate-y-1"
                style={{
                  borderColor: v.color,
                  boxShadow: `0 0 15px ${v.shadow}`,
                  background: `linear-gradient(135deg, #0b011d 0%, ${v.bg} 100%)`
                }}
              >
                <div className="text-3xl mb-2">{v.icon}</div>
                <div className="font-pixel text-xs font-bold" style={{ color: v.color }}>
                  {v.label}
                </div>
                <p className="font-mono text-xs text-purple-300 font-bold leading-relaxed mt-1">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pixel Divider */}
        <div className="h-1 bg-purple-950/60 w-full rounded border-b border-purple-900" />

        {/* Journey Timeline Section */}
        <div id="journey-section" className="flex flex-col gap-8 scroll-mt-24">
          <p className="font-pixel text-xs text-cyan-400 tracking-widest text-center font-bold">
            📡 OUR JOURNEY THROUGH TIME
          </p>

          <div className="relative w-full max-w-4xl mx-auto flex flex-col gap-8 py-4">
            {/* Dashed timeline absolute vertical line guide */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 border-l-4 border-dashed border-purple-900/60 md:-translate-x-1/2 z-0" />

            {MILESTONES.map((m, i) => {
              const isEven = i % 2 === 0;
              return (
                <div 
                  key={m.year} 
                  className={`relative flex flex-col md:flex-row items-start md:items-center justify-between w-full z-10 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Node Icon (centered exactly on the vertical line) */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ type: "spring", stiffness: 180, damping: 15, delay: 0.1 }}
                    className="absolute left-1.5 md:left-1/2 md:-translate-x-1/2 w-10 h-10 bg-[#0e0422] border-4 rounded-full flex items-center justify-center text-lg z-20 shadow-[0_0_10px_rgba(124,58,237,0.4)] transition-transform hover:scale-110"
                    style={{ borderColor: m.color }}
                  >
                    {m.icon}
                  </motion.div>

                  {/* Content Card with generous padding away from the line */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -40 : 40, y: 15 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                    className={`w-full md:w-[45%] pl-14 md:pl-0 ${
                      isEven ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'
                    }`}
                  >
                    <div 
                      onMouseEnter={() => playSound('hover', state.soundEnabled)}
                      className="bg-[#0b011d]/90 border-4 rounded p-4 shadow-lg transition-all hover:scale-[1.02] cursor-default"
                      style={{ borderColor: m.color }}
                    >
                      <div className="font-pixel text-xs font-bold" style={{ color: m.color }}>
                        {m.year}
                      </div>
                      <div className="font-pixel text-xs text-white tracking-wider mt-2 leading-relaxed">
                        {m.label}
                      </div>
                    </div>
                  </motion.div>

                  {/* Empty spacer block to balance the other side on md screens and larger */}
                  <div className="hidden md:block md:w-[45%]" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Pixel Divider */}
        <div className="h-1 bg-purple-950/60 w-full rounded border-b border-purple-900" />

        {/* About Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <motion.div 
              key={s.l} 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
              onMouseEnter={() => playSound('hover', state.soundEnabled)}
              className="bg-[#0b011d]/90 border-4 rounded p-5 text-center transition-all duration-200 hover:-translate-y-1 shadow-[0_0_10px_rgba(124,58,237,0.15)]" 
              style={{ borderColor: s.c }}
            >
              <div 
                className="font-pixel text-2xl md:text-3xl font-bold mb-2 leading-none" 
                style={{ color: s.c, textShadow: `0 0 15px ${s.c}55` }}
              >
                {s.v}
              </div>
              <div className="font-pixel text-xs text-purple-300 tracking-wider leading-relaxed font-semibold">
                {s.l}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

