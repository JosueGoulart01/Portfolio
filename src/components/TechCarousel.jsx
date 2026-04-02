import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { useState, useRef } from "react";

const TechCarousel = ({ icons, searchTerm, setSearchTerm }) => {
  // Duplicamos apenas o necessário para performance
  const duplicatedEntries = [...Object.entries(icons), ...Object.entries(icons), ...Object.entries(icons)];
  
  const [isHovered, setIsHovered] = useState(false);
  const baseX = useMotionValue(0);
  
  // UseAnimationFrame roda na taxa de atualização da tela (60fps/120fps)
  // É muito mais fluido que CSS keyframes para interações de pausa.
  useAnimationFrame((t, delta) => {
    // Ajuste o '0.02' para mudar a velocidade base
    let moveBy = -0.02 * delta;

    if (isHovered) {
      // Desaceleração suave (Inércia)
      moveBy = 0; 
    }

    // Se não estiver pausado, move. O Framer lida com a suavidade internamente
    if (!isHovered) {
       baseX.set(baseX.get() + moveBy);
    }

    // Loop infinito: Reset quando chegar em 1/3 do conteúdo
    if (baseX.get() <= -33.33) {
      baseX.set(0);
    }
  });

  // Transformamos o valor numérico em porcentagem para o CSS
  const x = useTransform(baseX, (v) => `${v}%`);

  return (
    <div className="relative w-full overflow-hidden py-10 mb-12">
      {/* Máscaras de Gradiente */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] z-20 pointer-events-none" />
      
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex cursor-pointer"
      >
        <motion.div 
          className="flex gap-4 w-max px-4" 
          style={{ x }}
        >
          {duplicatedEntries.map(([name, icon], idx) => {
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
    </div>
  );
};

export default TechCarousel;