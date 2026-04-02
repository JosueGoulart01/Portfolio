import { motion, useMotionValue, useSpring, useAnimate } from "framer-motion";
import { useState, useEffect } from "react";

const TechCarousel = ({ icons, searchTerm, setSearchTerm }) => {
  const duplicatedIcons = [...Object.entries(icons), ...Object.entries(icons), ...Object.entries(icons)];
  
  // Controle de velocidade: 1 é normal, 0 é parado
  const [isHovered, setIsHovered] = useState(false);
  const speed = useSpring(isHovered ? 0 : 1, {
    damping: 20, // Suavidade da parada
    stiffness: 90, // Força da retomada
  });

  return (
    <div className="relative w-full overflow-hidden py-10 mb-12">
      {/* Máscaras de Gradiente */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] via-[#050505]/80 to-transparent z-20 pointer-events-none" />
      
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex"
      >
        <motion.div 
          className="flex gap-4 w-max px-4"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{ 
            ease: "linear", 
            duration: 35, 
            repeat: Infinity,
          }}
          // A mágica: O style inline de 'animationPlayState' reage ao spring do Framer
          style={{
            // Quando speed < 0.1 (quase parado), pausamos a animação nativa de forma suave
            animationPlayState: isHovered ? "paused" : "running",
            filter: "blur(0px)", // Hack para forçar aceleração de hardware
          }}
        >
          {duplicatedIcons.map(([name, icon], idx) => {
            const isActive = searchTerm.toLowerCase() === name.toLowerCase();
            return (
              <button
                key={`${name}-${idx}`}
                onClick={() => setSearchTerm(isActive ? "" : name)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl border shrink-0 transition-all duration-500 ${
                  isActive 
                  ? 'bg-indigo-500 border-indigo-400 text-white shadow-[0_0_30px_rgba(99,102,241,0.3)] scale-110 z-10' 
                  : 'bg-white/[0.02] border-white/5 text-white/30 hover:border-white/20 hover:text-white/60 hover:bg-white/[0.05]'
                }`}
              >
                <span className="text-2xl">{icon}</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{name}</span>
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* CSS Injetado para garantir que a transição de pausa seja aplicada à animação do transform */}
      <style dangerouslySetInnerHTML={{ __html: `
        .flex > div {
          transition: animation-play-state 0.6s ease-in-out;
        }
      `}} />
    </div>
  );
};

export default TechCarousel;