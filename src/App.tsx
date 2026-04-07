/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Droplets, 
  Skull, 
  CheckCircle2, 
  XCircle, 
  Filter, 
  Info, 
  RotateCcw, 
  Play,
  FlaskConical,
  Bug,
  Waves
} from "lucide-react";

// Types for our app state
type Screen = "WELCOME" | "CHOOSE_WATER" | "QUESTION" | "FEEDBACK" | "FIX_FILTER" | "FINAL_RESULT";

interface WaterType {
  id: string;
  name: string;
  color: string;
  icon: any;
  isSafe: boolean;
  description: string;
}

const WATER_TYPES: WaterType[] = [
  { 
    id: "muddy", 
    name: "Muddy Water", 
    color: "bg-amber-900/40", 
    icon: Waves, 
    isSafe: false,
    description: "This water is full of dirt and sediment."
  },
  { 
    id: "clear_unsafe", 
    name: "Clear Water", 
    color: "bg-blue-200/20", 
    icon: Droplets, 
    isSafe: false,
    description: "It looks clean, but it might have invisible germs!"
  },
  { 
    id: "colored", 
    name: "Red Water", 
    color: "bg-red-500/30", 
    icon: FlaskConical, 
    isSafe: false,
    description: "This water has chemicals or dyes in it."
  }
];

export default function App() {
  const [screen, setScreen] = useState<Screen>("WELCOME");
  const [selectedWater, setSelectedWater] = useState<WaterType | null>(null);
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
  const [filterChoice, setFilterChoice] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  // Reset the game state
  const resetGame = () => {
    setScreen("WELCOME");
    setSelectedWater(null);
    setUserAnswer(null);
    setFilterChoice(null);
    setScore(0);
  };

  const handleStart = () => setScreen("CHOOSE_WATER");

  const handleSelectWater = (water: WaterType) => {
    setSelectedWater(water);
    setScreen("QUESTION");
  };

  const handleAnswer = (answer: boolean) => {
    setUserAnswer(answer);
    if (answer === selectedWater?.isSafe) {
      setScore(s => s + 1);
    }
    setScreen("FEEDBACK");
  };

  const handleNextToFilter = () => setScreen("FIX_FILTER");

  const handleFilterChoice = (choice: string) => {
    setFilterChoice(choice);
    if (choice === "Charcoal") {
      setScore(s => s + 1);
      setTimeout(() => setScreen("FINAL_RESULT"), 1500);
    }
  };

  // Common button style
  const buttonBase = "px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 flex items-center justify-center gap-2 active:scale-95";
  const neonButton = `${buttonBase} bg-transparent border-2 border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black shadow-[0_0_15px_rgba(0,255,65,0.3)]`;
  const amberButton = `${buttonBase} bg-transparent border-2 border-[#ffb000] text-[#ffb000] hover:bg-[#ffb000] hover:text-black shadow-[0_0_15px_rgba(255,176,0,0.3)]`;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#00ff41] font-sans selection:bg-[#00ff41] selection:text-black flex flex-col items-center justify-center p-4 overflow-hidden">
      
      {/* Background Grid Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-10" 
           style={{ backgroundImage: 'radial-gradient(#00ff41 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <AnimatePresence mode="wait">
        {/* Welcome Screen */}
        {screen === "WELCOME" && (
          <motion.div 
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center max-w-2xl z-10"
          >
            <div className="mb-8 inline-block p-4 rounded-full bg-[#00ff41]/10 border border-[#00ff41]/30">
              <Droplets className="w-16 h-16 animate-pulse" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter uppercase italic">
              Invisible <span className="text-white">Water</span> Detector
            </h1>
            <p className="text-xl md:text-2xl text-[#00ff41]/80 mb-12 font-mono">
              Can you tell if water is safe?
            </p>
            <button onClick={handleStart} className={neonButton}>
              <Play className="w-6 h-6" /> START MISSION
            </button>
          </motion.div>
        )}

        {/* Choose Water Type Screen */}
        {screen === "CHOOSE_WATER" && (
          <motion.div 
            key="choose"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-4xl z-10"
          >
            <h2 className="text-3xl font-bold mb-8 text-center uppercase tracking-widest">Select a Sample to Test</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {WATER_TYPES.map((water) => (
                <motion.button
                  key={water.id}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSelectWater(water)}
                  className={`p-8 rounded-2xl border-2 border-[#00ff41]/20 hover:border-[#00ff41] transition-colors flex flex-col items-center gap-4 ${water.color}`}
                >
                  <water.icon className="w-16 h-16" />
                  <span className="text-xl font-bold uppercase">{water.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Question Screen */}
        {screen === "QUESTION" && selectedWater && (
          <motion.div 
            key="question"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="text-center max-w-xl z-10"
          >
            <div className={`w-48 h-48 mx-auto rounded-full flex items-center justify-center mb-8 border-4 border-[#00ff41] shadow-[0_0_30px_rgba(0,255,65,0.2)] ${selectedWater.color}`}>
              <selectedWater.icon className="w-24 h-24 animate-bounce" />
            </div>
            <h2 className="text-3xl font-bold mb-4 uppercase tracking-tight">Analyzing: {selectedWater.name}</h2>
            <p className="text-xl mb-12 text-white/70">Is this water safe to drink?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => handleAnswer(true)} className={neonButton}>
                <CheckCircle2 className="w-6 h-6" /> YES, IT'S SAFE
              </button>
              <button onClick={() => handleAnswer(false)} className={amberButton}>
                <XCircle className="w-6 h-6" /> NO, IT'S UNSAFE
              </button>
            </div>
          </motion.div>
        )}

        {/* Feedback Screen */}
        {screen === "FEEDBACK" && selectedWater && (
          <motion.div 
            key="feedback"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="text-center max-w-2xl z-10"
          >
            {userAnswer === selectedWater.isSafe ? (
              <div className="mb-6">
                <CheckCircle2 className="w-20 h-20 text-[#00ff41] mx-auto mb-4" />
                <h2 className="text-4xl font-black mb-4">CORRECT!</h2>
                <p className="text-xl text-white/80">Great job! You have a sharp eye for safety.</p>
              </div>
            ) : (
              <div className="mb-6">
                <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
                <h2 className="text-4xl font-black mb-4 text-red-500">NOT QUITE!</h2>
                <p className="text-xl text-white/80">
                  {selectedWater.id === "clear_unsafe" 
                    ? "Some water looks clean but has invisible germs!" 
                    : "This water is definitely not safe to drink."}
                </p>
              </div>
            )}
            
            <div className="bg-[#00ff41]/5 border border-[#00ff41]/20 p-6 rounded-2xl mb-8 text-left italic font-mono">
              <div className="flex gap-3 items-start">
                <Info className="w-6 h-6 shrink-0 mt-1" />
                <p className="text-lg">
                  "Sand and rocks can catch big dirt, but they cannot remove tiny germs or chemicals that you can't even see!"
                </p>
              </div>
            </div>

            <button onClick={handleNextToFilter} className={neonButton}>
              NEXT: FIX THE FILTER <Play className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {/* Fix the Filter Screen */}
        {screen === "FIX_FILTER" && (
          <motion.div 
            key="filter"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="text-center max-w-3xl z-10"
          >
            <Filter className="w-16 h-16 mx-auto mb-6 text-[#ffb000]" />
            <h2 className="text-3xl font-bold mb-4 uppercase">Fix the Filter</h2>
            <p className="text-xl mb-8 text-white/70">What should you add to clean the water better?</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {["Sand", "Rocks", "Charcoal"].map((choice) => (
                <button
                  key={choice}
                  onClick={() => handleFilterChoice(choice)}
                  className={`p-6 rounded-xl border-2 font-bold text-xl transition-all ${
                    filterChoice === choice 
                      ? (choice === "Charcoal" ? "bg-[#00ff41] text-black border-[#00ff41]" : "bg-red-500 text-white border-red-500")
                      : "border-[#00ff41]/30 hover:border-[#00ff41] text-[#00ff41]"
                  }`}
                >
                  {choice}
                </button>
              ))}
            </div>

            {filterChoice && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`p-4 rounded-lg font-mono ${filterChoice === "Charcoal" ? "text-[#00ff41]" : "text-red-400"}`}
              >
                {filterChoice === "Charcoal" 
                  ? "Great choice! Charcoal can trap tiny particles and chemicals." 
                  : "Try again! You need something that catches very small particles."}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Final Result Screen */}
        {screen === "FINAL_RESULT" && (
          <motion.div 
            key="final"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center max-w-2xl z-10"
          >
            <div className="relative mb-8">
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-[#00ff41]/20 blur-3xl rounded-full"
              />
              <CheckCircle2 className="w-32 h-32 mx-auto text-[#00ff41] relative z-10" />
            </div>
            <h2 className="text-5xl font-black mb-6 italic uppercase tracking-tighter">Mission Accomplished!</h2>
            <p className="text-2xl mb-12 text-white">The water is now clean and safer to drink!</p>
            
            <div className="flex flex-col items-center gap-4">
              <div className="text-[#00ff41]/60 font-mono mb-4">
                SCORE: {score}/2 | STATUS: EXPERT DETECTOR
              </div>
              <button onClick={resetGame} className={neonButton}>
                <RotateCcw className="w-6 h-6" /> TRY AGAIN
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Info */}
      <div className="fixed bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none opacity-40 font-mono text-[10px] uppercase tracking-[0.2em]">
        <div>System: Active</div>
        <div>Detector v1.0.4</div>
      </div>
    </div>
  );
}
