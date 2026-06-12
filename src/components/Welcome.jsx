import { lazy, Suspense, useState, useEffect } from "react";
import { motion } from "framer-motion";

// Carregamento preguiçoso
const RobotBackground = lazy(() => import("./Background"));

const Welcome = ({ language, onEnter }) => {
  const [loadRobot, setLoadRobot] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoadRobot(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "circIn" } }}
      className="fixed inset-0 z-[100] bg-[#030303] flex flex-col items-center justify-center overflow-hidden"
      style={{ willChange: "opacity" }}
    >
      {/* Container do Robô */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {loadRobot && (
          <Suspense fallback={<div className="w-full h-full bg-[#030303]" />}>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }} 
              transition={{ duration: 2 }}
              className="w-full h-full"
            >
              <RobotBackground />
            </motion.div>
          </Suspense>
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030303_90%)] z-[1]" />
      </div>

      {/* Grid sutil */}
      <div className="absolute inset-0 z-[2] opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Badge de Status */}
          <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-white/5 rounded-full bg-white/[0.02] backdrop-blur-sm mb-6">
            <div className="flex gap-1">
              <span className="w-1 h-1 rounded-full bg-indigo-500 animate-pulse"></span>
              <span className="w-1 h-1 rounded-full bg-indigo-500/50"></span>
            </div>
            <span className="text-[8px] text-slate-500 font-bold uppercase tracking-[0.4em]">
              Kernel Interface v2
            </span>
          </div>

          {/* TEXTO DE BOAS-VINDAS */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-indigo-400 font-mono text-[10px] md:text-[12px] tracking-[0.6em] uppercase mb-4"
          >
            {language === 'pt' ? 'Bem-vindo ao meu universo' : 'Welcome to my universe'}
          </motion.p>
          
          <h1 className="text-6xl md:text-9xl font-black text-white mb-6 tracking-tighter uppercase leading-[0.85]">
            Creative
            <br />
            <span className="text-transparent stroke-text italic">Engineer</span>
          </h1>

          <p className="max-w-xs text-slate-500 text-[11px] md:text-xs font-medium leading-relaxed mb-12 mx-auto tracking-[0.1em] uppercase opacity-70">
            {language === 'pt' 
              ? 'Arquitetura de software & Design de alta fidelidade' 
              : 'Software architecture & High-fidelity design'}
          </p>

          {/* BOTÃO CENTRALIZADO */}
          <div className="w-full flex justify-center">
            <button 
              onClick={onEnter}
              className="group relative flex items-center justify-center px-12 py-5 bg-white text-black text-[11px] font-black uppercase tracking-[0.5em] rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transform hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">
                {language === 'pt' ? 'Inicializar' : 'Initialize'}
              </span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decoração Lateral */}
      <div className="absolute left-6 bottom-10 hidden lg:block opacity-20 pointer-events-none">
        <div className="text-[8px] font-mono text-white tracking-[0.5em] [writing-mode:vertical-lr] uppercase flex items-center gap-4">
          <span>System_Ready</span>
          <div className="h-12 w-[1px] bg-white"></div>
          <span>2026_Edition</span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.2);
        }
        @media (min-width: 768px) {
          .stroke-text { -webkit-text-stroke: 2px rgba(255,255,255,0.2); }
        }
      `}} />
    </motion.div>
  );
};

export default Welcome;