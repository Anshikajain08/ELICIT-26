import React, { useState } from 'react';
import { ActiveTab, ExplorerState, EventItem } from '../types';
import { PixelRocket, PixelStar, PixelStarCoin } from './PixelArtwork';
import { ChooseYourMissionCard } from './AnimatedCosmicVessel';
import { CosmicEventsBackground } from './CosmicEventsBackground';
import { playSound } from '../utils/sound';
import { INITIAL_EVENTS } from '../data';
import { RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EventsProps {
  state: ExplorerState;
  addCoins: (amount: number) => void;
  addXp: (amount: number) => void;
  completeMission: (id: string) => void;
  triggerToast: (title: string, desc: string, icon?: string) => void;
}

export const EventsView: React.FC<EventsProps> = ({
  state,
  addCoins,
  addXp,
  completeMission,
  triggerToast,
}) => {
  const [filter, setFilter] = useState<'all' | 'hackathon' | 'workshop' | 'competition'>('all');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  
  // Interactive Quiz States for Quiz Nexus
  const [quizActive, setQuizActive] = useState(false);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  const quizQuestions = [
    {
      q: "What does ACM stand for?",
      options: [
        "Associated Computer Machinery",
        "Association for Computing Machinery",
        "Autonomous Computer Networks",
        "Advanced Coding Matrix"
      ],
      correct: 1
    },
    {
      q: "Which protocol operates on Port 80?",
      options: ["FTP", "SSH", "HTTP", "HTTPS"],
      correct: 2
    },
    {
      q: "What is the speed of light in deep space?",
      options: ["~300,000 km/s", "~150,000 km/s", "~1,000,000 km/s", "Instantaneous"],
      correct: 0
    }
  ];

  React.useEffect(() => {
    // Complete simple event viewing mission
    completeMission('event-mission');
  }, []);

  const handleFilterClick = (cat: typeof filter) => {
    playSound('click', state.soundEnabled);
    setFilter(cat);
  };

  const handleCardClick = (event: EventItem) => {
    playSound('click', state.soundEnabled);
    setSelectedEvent(event);
    
    // Reset quiz state when selecting another event
    setQuizActive(false);
    setQuizFinished(false);
    setCurrentQuizQuestion(0);
    setQuizAnswers([]);
  };

  const handleRegister = (eventId: string) => {
    playSound('success', state.soundEnabled);
    if (!state.registeredEvents.includes(eventId)) {
      state.registeredEvents.push(eventId);
      addXp(100);
      addCoins(50);
      triggerToast('Registration Confirmed', `You have registered for ${eventId.replace('-', ' ').toUpperCase()}!`, '🚀');
      
      if (eventId === 'cosmic-hack') {
        completeMission('hackathon-mission');
      }
    } else {
      triggerToast('Already Registered', 'Your starship is already registered for this coordinate.', '🛡️');
    }
    setSelectedEvent(null);
  };

  const startQuiz = () => {
    playSound('warp', state.soundEnabled);
    setQuizActive(true);
    setQuizFinished(false);
    setCurrentQuizQuestion(0);
    setQuizAnswers([]);
  };

  const handleQuizAnswer = (optionIndex: number) => {
    playSound('click', state.soundEnabled);
    const newAnswers = [...quizAnswers, optionIndex];
    setQuizAnswers(newAnswers);

    if (currentQuizQuestion < quizQuestions.length - 1) {
      setCurrentQuizQuestion(currentQuizQuestion + 1);
    } else {
      // Calculate score
      let score = 0;
      newAnswers.forEach((ans, idx) => {
        if (ans === quizQuestions[idx].correct) score++;
      });

      setQuizFinished(true);
      state.quizCompleted = true;
      state.quizScore = score;
      
      if (score === quizQuestions.length) {
        playSound('success', state.soundEnabled);
        addCoins(200);
        addXp(250);
        completeMission('quiz-mission');
        triggerToast('Perfect Score!', 'You got 3/3 on the Quiz Nexus! +200 coins', '🧠');
      } else {
        playSound('laser', state.soundEnabled);
        addCoins(score * 30);
        addXp(score * 50);
        triggerToast('Quiz Completed', `You scored ${score}/3 on the Quiz Nexus. Try again for a perfect score!`, '⭐');
      }
    }
  };

  const filteredEvents = filter === 'all' 
    ? INITIAL_EVENTS 
    : INITIAL_EVENTS.filter(e => e.category === filter);

  return (
    <div className="w-full relative px-6 py-8 md:py-12 select-none animate-[fadeIn_0.5s_ease-out] overflow-hidden">
      {/* Background layer */}
      <CosmicEventsBackground />

      <div className="max-w-7xl mx-auto flex flex-col gap-10 relative z-10">
        
        {/* Elegant Header */}
        <div className="text-center mb-6">
          <span className="font-pixel text-xs text-cyan-400 tracking-[0.25em] block mb-2 uppercase animate-pulse">
            ✦ STARDATE LOGS & OPERATIONS ✦
          </span>
          <h2 className="font-pixel text-2xl md:text-3xl text-white tracking-wider">
            COSMIC <span className="text-yellow-400 animate-pulse">EVENTS</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-purple-200 mt-4 max-w-2xl mx-auto leading-relaxed font-bold">
            Participate in hackathons, workshops, and coding challenges to earn coins, unlock XP, and upgrade your level.
          </p>
        </div>

        {/* Main Content Layout with Sticky Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Mission Control Panel (with high-fidelity rocket/UFO) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 flex flex-col gap-6">
            <ChooseYourMissionCard state={state} />
          </div>

          {/* Right Column: Events and Filters */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Categories Tab Row */}
            <div className="flex flex-wrap items-center justify-start gap-3 mb-4">
              {[
                { id: 'all', label: 'ALL EVENTS' },
                { id: 'hackathon', label: 'HACKATHONS' },
                { id: 'workshop', label: 'WORKSHOPS' },
                { id: 'competition', label: 'COMPETITIONS' },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleFilterClick(tab.id as any)}
                  className={`font-pixel text-xs px-4 py-2.5 rounded transition-all cursor-pointer relative overflow-hidden ${
                    filter === tab.id
                      ? 'bg-purple-950 text-yellow-400 border border-yellow-500 font-bold shadow-[0_0_10px_rgba(250,204,21,0.25)]'
                      : 'text-purple-300 hover:text-white hover:bg-purple-950/40 border border-purple-950'
                  }`}
                >
                  {tab.label}
                </motion.button>
              ))}
            </div>

            {/* Symmetrical Events Grid */}
            <motion.div 
              layout="position"
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              <AnimatePresence mode="popLayout">
                {filteredEvents.map((ev, i) => {
                  const isRegistered = state.registeredEvents.includes(ev.id);
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 35, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, y: 15 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ 
                        type: 'spring', 
                        stiffness: 100, 
                        damping: 15,
                        delay: i * 0.05 
                      }}
                      whileHover={{ y: -6, scale: 1.015 }}
                      key={ev.id}
                      onClick={() => handleCardClick(ev)}
                      onMouseEnter={() => playSound('hover', state.soundEnabled)}
                      className={`bg-[#0b011d]/90 border-4 rounded p-5 flex flex-col justify-between min-h-[220px] cursor-pointer transition-colors duration-300 ${
                        ev.category === 'hackathon' 
                          ? 'border-red-900/60 hover:border-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]' 
                          : ev.category === 'workshop' 
                          ? 'border-yellow-900/60 hover:border-yellow-500 hover:shadow-[0_0_15px_rgba(234,179,8,0.3)]' 
                          : 'border-cyan-900/60 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className={`font-pixel text-xs font-bold px-2 py-1 rounded border ${
                            ev.category === 'hackathon' 
                              ? 'border-red-500 bg-red-950/40 text-red-400' 
                              : ev.category === 'workshop' 
                              ? 'border-yellow-500 bg-yellow-950/40 text-yellow-400' 
                              : 'border-cyan-500 bg-cyan-950/40 text-cyan-400'
                          }`}>
                            {ev.category.toUpperCase()}
                          </span>
                          <span className="font-mono text-xs text-purple-300 font-bold">
                            {ev.date}
                          </span>
                        </div>

                        <h3 className="font-pixel text-xs text-white tracking-wide mb-3 leading-snug">
                          {ev.title}
                        </h3>

                        <div className="flex items-center gap-0.5 mb-3">
                          <span className="font-mono text-xs text-purple-300 font-bold mr-1.5 uppercase">STATION:</span>
                          {Array.from({ length: 5 }).map((_, sIdx) => (
                            <PixelStar key={sIdx} filled={sIdx < ev.difficulty} className="w-3.5 h-3.5" />
                          ))}
                        </div>

                        <p className="font-mono text-xs text-purple-200 line-clamp-2 leading-relaxed">
                          {ev.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-purple-950/80 mt-5">
                        <span className="font-pixel text-xs text-purple-300 tracking-wider font-bold">
                          {isRegistered ? '✅ MISSION ENGAGED' : '▶ DISPATCH COMMAND'}
                        </span>
                        
                        <div className={`w-8 h-8 rounded border flex items-center justify-center text-[10px] font-bold transition-all ${
                          isRegistered 
                            ? 'bg-purple-950/80 border-purple-900 text-purple-400'
                            : 'bg-purple-950/50 border-purple-800 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black group-hover:border-cyan-300 shadow-md'
                        }`}>
                          ▶
                        </div>
                      </div>

                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

          </div>
        </div>

      </div>

      {/* Interactive Detail Modal & Challenge Room */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-[110] px-4 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 25, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 25, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 26 }}
              className="bg-[#0b011d] border-4 border-purple-700 rounded p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto relative shadow-[0_0_45px_rgba(124,58,237,0.5)]"
            >
              {/* Close Button */}
              <button
                onClick={() => { playSound('click', state.soundEnabled); setSelectedEvent(null); }}
                className="absolute top-4 right-4 font-pixel text-xs text-purple-300 hover:text-white px-2.5 py-1.5 bg-[#12052c] border border-purple-800 rounded hover:border-purple-400 cursor-pointer transition-colors"
              >
                [X] CLOSE
              </button>

              {/* Event Content inside Modal */}
              <div className="flex flex-col gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <span className="font-pixel text-xs bg-purple-900 border-2 border-purple-600 text-purple-300 px-2.5 py-1 rounded">
                    {selectedEvent.category.toUpperCase()}
                  </span>
                  <span className="font-mono text-xs text-purple-400 font-bold bg-[#12052c] px-2.5 py-0.5 border border-purple-950 rounded">
                    {selectedEvent.date}
                  </span>
                </div>

                <h2 className="font-pixel text-sm md:text-base text-yellow-400 tracking-wider">
                  {selectedEvent.title}
                </h2>

                <p className="font-mono text-xs text-purple-200 leading-relaxed font-bold border-l-4 border-yellow-500 pl-3 py-1">
                  {selectedEvent.description}
                </p>

                {/* Tags list */}
                <div className="flex flex-wrap gap-1.5 my-1">
                  {selectedEvent.tags.map((tg, idx) => (
                    <span key={idx} className="font-mono text-xs text-cyan-400 bg-cyan-950/30 border border-cyan-800/60 px-2 py-0.5 rounded">
                      #{tg}
                    </span>
                  ))}
                </div>

                {/* Reward Block */}
                <div className="bg-[#12052c] border-2 border-purple-900 p-3 rounded flex items-center gap-3">
                  <PixelStarCoin className="w-8 h-8 animate-bounce" />
                  <div>
                    <span className="font-pixel text-xs text-yellow-400 leading-none block font-bold">MISSION REWARD</span>
                    <span className="font-mono text-xs text-white font-bold block mt-1">100 XP / 50 Coins</span>
                  </div>
                </div>

                {/* SPECIAL INTERACTIVE QUIZ FOR QUIZ NEXUS! */}
                {selectedEvent.id === 'quiz-nexus' && (
                  <div className="mt-4 pt-4 border-t border-purple-950/50">
                    <span className="font-pixel text-xs text-cyan-400 block mb-2 tracking-wider font-bold">ACADEMY CO-PILOT APTITUDE TEST</span>
                    
                    {!quizActive ? (
                      <button
                        onClick={startQuiz}
                        className="w-full font-pixel text-xs bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2.5 px-4 border-b-4 border-r-4 border-cyan-800 hover:border-cyan-600 rounded flex items-center justify-center gap-2 cursor-pointer transition-all active:translate-y-0.5"
                      >
                        <span>START CHALLENGE</span>
                        <span>▶</span>
                      </button>
                    ) : quizFinished ? (
                      <div className="text-center p-4 bg-[#12052c] border-4 border-purple-900 rounded relative overflow-hidden">
                        <span className="text-4xl block animate-bounce">
                          {state.quizScore === 3 ? '🥇' : state.quizScore === 2 ? '🥈' : '🥉'}
                        </span>
                        <span className="font-pixel text-xs text-yellow-400 block mt-2 font-bold">TEST RECONSTRUCTION COMPLETE</span>
                        
                        <div className="my-3 font-mono text-xs text-purple-200 font-bold max-w-xs mx-auto">
                          <div className="flex justify-between py-1 border-b border-purple-950">
                            <span>ANSWERS SUBMITTED:</span>
                            <span className="text-white">3 / 3</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-purple-950">
                            <span>CORRECT PROCESSORS:</span>
                            <span className="text-cyan-400">{state.quizScore} / 3</span>
                          </div>
                          <div className="flex justify-between py-1 text-yellow-400">
                            <span>REWARDS ALLOCATED:</span>
                            <span>+{state.quizScore === 3 ? '250 XP & 200 Coins' : `${state.quizScore * 50} XP`}</span>
                          </div>
                        </div>

                        <button
                          onClick={startQuiz}
                          className="mt-3 font-pixel text-xs bg-purple-900 text-purple-200 hover:text-white hover:bg-purple-800 border-2 border-purple-600 px-4 py-2 rounded flex items-center gap-1 mx-auto cursor-pointer transition-all font-bold"
                        >
                          <RefreshCw size={10} />
                          <span>RETRY TEST TERMINAL</span>
                        </button>
                      </div>
                    ) : (
                      <div className="bg-[#12052c] border border-purple-950 rounded p-4">
                        {/* Quest progress tracker */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-pixel text-xs text-purple-300 font-bold">QUESTION {currentQuizQuestion + 1} OF 3</span>
                          <div className="flex gap-1">
                            {Array.from({ length: 3 }).map((_, qIdx) => (
                              <div 
                                key={qIdx}
                                className={`w-6 h-1.5 rounded-sm ${
                                  qIdx < currentQuizQuestion 
                                    ? 'bg-cyan-400' 
                                    : qIdx === currentQuizQuestion 
                                    ? 'bg-yellow-400 animate-pulse' 
                                    : 'bg-purple-950'
                                }`} 
                              />
                            ))}
                          </div>
                        </div>

                        {/* Question Text */}
                        <p className="font-mono text-xs text-white font-bold leading-relaxed mb-4">
                          {quizQuestions[currentQuizQuestion].q}
                        </p>

                        {/* Options Grid */}
                        <div className="flex flex-col gap-2">
                          {quizQuestions[currentQuizQuestion].options.map((opt, oIdx) => (
                            <button
                              key={oIdx}
                              onClick={() => handleQuizAnswer(oIdx)}
                              className="w-full text-left font-mono text-xs text-purple-200 bg-purple-950/40 hover:bg-purple-950 hover:text-white border border-purple-900/60 rounded p-2.5 transition-colors cursor-pointer"
                            >
                              [{String.fromCharCode(65 + oIdx)}] {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Register / Sign log button */}
                {selectedEvent.id !== 'quiz-nexus' && (
                  <div className="mt-4 pt-4 border-t border-purple-950/50">
                    <button
                      onClick={() => handleRegister(selectedEvent.id)}
                      className={`w-full font-pixel text-xs font-bold py-3 px-6 border-b-4 border-r-4 rounded flex items-center justify-center gap-2 cursor-pointer transition-all ${
                        state.registeredEvents.includes(selectedEvent.id)
                          ? 'bg-purple-950 border-purple-800 text-purple-400 cursor-default'
                          : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black border-orange-800 hover:border-orange-600 active:translate-y-0.5'
                      }`}
                    >
                      <span>{state.registeredEvents.includes(selectedEvent.id) ? 'ALREADY REGISTERED ✔' : 'REGISTER FOR EVENT ▶'}</span>
                    </button>
                  </div>
                )}

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
