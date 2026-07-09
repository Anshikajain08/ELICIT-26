import React from 'react';
import { ExplorerState } from '../types';
import { playSound } from '../utils/sound';
import { motion } from 'motion/react';
import { Github, Linkedin, Shield, Terminal, Paintbrush, Award, Cpu, Star } from 'lucide-react';

interface TeamProps {
  state: ExplorerState;
  addXp?: (amount: number) => void;
  completeMission?: (id: string) => void;
}

interface TeamMember {
  name: string;
  role: string;
  subTitle: string;
  roleIcon: React.ReactNode;
  color: string;
  shadow: string;
  bg: string;
  stats: { label: string; value: number }[]; // 1 to 5 stars or pixel segments
  linkedin: string;
  github?: string;
  bio: string;
  avatar: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'DR. PRIYANK SINGHVI',
    role: 'FLEET ADMIRAL',
    subTitle: 'ACM Faculty Sponsor',
    roleIcon: <Shield className="text-yellow-400" size={16} />,
    color: '#ffd700',
    shadow: 'rgba(250, 204, 21, 0.4)',
    bg: 'rgba(250, 204, 21, 0.05)',
    stats: [
      { label: 'Leadership', value: 5 },
      { label: 'Mentorship', value: 5 },
      { label: 'Knowledge', value: 5 },
    ],
    linkedin: 'https://linkedin.com',
    bio: 'Guiding the ACM Student Chapter through infinite star systems of research, academia, and technical prowess.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400',
  },
  {
    name: 'SARTHAK GUPTA',
    role: 'COMMANDING OFFICER',
    subTitle: 'Chairperson',
    roleIcon: <Star className="text-cyan-400" size={16} />,
    color: '#22d3ee',
    shadow: 'rgba(34, 211, 238, 0.4)',
    bg: 'rgba(34, 211, 238, 0.05)',
    stats: [
      { label: 'Warp Speed', value: 5 },
      { label: 'Strategy', value: 5 },
      { label: 'Caffeine', value: 4 },
    ],
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    bio: 'Directing the fleet. Sarthak drives innovation, pilots administrative operations, and leads MUJ ACM to new heights.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&h=400',
  },
  {
    name: 'ANSHIKA JAIN',
    role: 'FIRST OFFICER',
    subTitle: 'Vice Chairperson',
    roleIcon: <Award className="text-pink-400" size={16} />,
    color: '#f472b6',
    shadow: 'rgba(244, 114, 182, 0.4)',
    bg: 'rgba(244, 114, 182, 0.05)',
    stats: [
      { label: 'Execution', value: 5 },
      { label: 'Management', value: 5 },
      { label: 'Code Speed', value: 4 },
    ],
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    bio: 'Second-in-command of the flagship. Anshika spearheads project operations, synchronizes timelines, and designs cosmic UI.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400',
  },
  {
    name: 'DEVANSH SAXENA',
    role: 'WARP ARCHITECT',
    subTitle: 'Technical Head',
    roleIcon: <Terminal className="text-emerald-400" size={16} />,
    color: '#34d399',
    shadow: 'rgba(52, 211, 153, 0.4)',
    bg: 'rgba(52, 211, 153, 0.05)',
    stats: [
      { label: 'Algorithm', value: 5 },
      { label: 'Git Push', value: 5 },
      { label: 'Bugs Fixed', value: 5 },
    ],
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    bio: 'Chief engineer of our backend cores. Devansh compiles and structures quantum databases and react logic engines.',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400',
  },
  {
    name: 'ISHAAN PANT',
    role: 'CREATIVE CHIEF',
    subTitle: 'Graphics Head',
    roleIcon: <Paintbrush className="text-purple-400" size={16} />,
    color: '#c084fc',
    shadow: 'rgba(192, 132, 252, 0.4)',
    bg: 'rgba(192, 132, 252, 0.05)',
    stats: [
      { label: 'Pixel Art', value: 5 },
      { label: 'Color Theory', value: 5 },
      { label: 'Aesthetics', value: 5 },
    ],
    linkedin: 'https://linkedin.com',
    bio: 'Designing the galaxy itself. Ishaan curates gorgeous vector assets, animations, and renders beautiful space graphics.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400',
  },
  {
    name: 'PRIYANSHU SHARMA',
    role: 'SYSTEM CHANCELLOR',
    subTitle: 'Secretary',
    roleIcon: <Cpu className="text-amber-400" size={16} />,
    color: '#fbbf24',
    shadow: 'rgba(251, 191, 36, 0.4)',
    bg: 'rgba(251, 191, 36, 0.05)',
    stats: [
      { label: 'Coordination', value: 5 },
      { label: 'Sub-wave PR', value: 4 },
      { label: 'Database', value: 4 },
    ],
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    bio: 'Managing subspace transmission protocols, logs, and keeping the fleet synchronized during emergency warp jumps.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400',
  },
];

export const TeamView: React.FC<TeamProps> = ({ state, addXp, completeMission }) => {
  React.useEffect(() => {
    if (completeMission) {
      // Complete base-mission as part of explore
      completeMission('base-mission');
    }
    if (addXp) {
      addXp(10);
    }
  }, []);

  const handleSocialClick = (url: string) => {
    playSound('warp', state.soundEnabled);
    window.open(url, '_blank');
  };

  return (
    <div className="w-full relative px-6 py-8 md:py-12 select-none animate-[fadeIn_0.5s_ease-out]">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Page Title Header */}
        <div className="text-center">
          <span className="font-pixel text-xs text-cyan-400 tracking-[0.25em] block uppercase mb-1">
            ✦ MEET THE FLIGHT SQUADRON ✦
          </span>
          <h2 className="font-pixel text-3xl sm:text-4xl font-black text-white tracking-wider leading-[1.1]">
            ACM TEAM <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 animate-pulse font-extrabold">COMMANDERS</span>
          </h2>
          <p className="font-mono text-sm text-purple-300 font-bold mt-2 max-w-xl mx-auto">
            The pilots, architects, and engineers guiding the Elicit'26 space expedition.
          </p>
        </div>

        {/* Pixel Divider */}
        <div className="h-1 bg-purple-950/60 w-full rounded border-b border-purple-900" />

        {/* Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
              onMouseEnter={() => playSound('hover', state.soundEnabled)}
              className="bg-[#0b011d]/90 border-2 rounded-xl p-3 flex flex-col gap-3 relative transition-all duration-200 hover:-translate-y-1.5 shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
              style={{
                borderColor: member.color,
                boxShadow: `0 0 12px ${member.shadow}`,
                background: `linear-gradient(135deg, #0b011d 0%, ${member.bg} 100%)`
              }}
            >
              {/* Holographic Cockpit Portrait */}
              <div className="relative w-full aspect-square overflow-hidden rounded-lg border bg-black/40 group/portrait" style={{ borderColor: member.color }}>
                {/* Image */}
                <img 
                  src={member.avatar} 
                  alt={member.name} 
                  className="w-full h-full object-cover filter saturate-[0.85] contrast-[1.1] brightness-[0.9] group-hover/portrait:scale-105 group-hover/portrait:saturate-100 transition-all duration-300"
                  referrerPolicy="no-referrer"
                />

                {/* Cyberpunk Overlay Grid and Grid Lines */}
                <div className="absolute inset-0 opacity-[0.12] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(18, 5, 44, 0.4) 50%, transparent 50%), linear-gradient(90deg, rgba(18, 5, 44, 0.4) 50%, transparent 50%)', backgroundSize: '4px 4px' }} />

                {/* Corner Bracket HUD Decorations */}
                <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l" style={{ borderColor: member.color }} />
                <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r" style={{ borderColor: member.color }} />
                <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l" style={{ borderColor: member.color }} />
                <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r" style={{ borderColor: member.color }} />

                {/* Dynamic HUD Scanners */}
                <div className="absolute top-0 inset-x-0 h-0.5 bg-cyan-400 opacity-70 shadow-[0_0_8px_#22d3ee] animate-[scan_2s_linear_infinite]" />
              </div>

              {/* Card Header */}
              <div className="flex flex-col gap-0.5 text-center">
                <h3 className="font-pixel text-[11px] sm:text-xs text-white leading-tight font-bold tracking-wide">
                  {member.name}
                </h3>
                <span className="font-mono text-[9px] sm:text-[10px] text-purple-300 font-bold block">
                  {member.subTitle}
                </span>
                <span className="font-pixel text-[8px] sm:text-[9px] tracking-wider font-bold mt-1 block" style={{ color: member.color }}>
                  {member.role}
                </span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};
