import { motion } from 'framer-motion';
import { memo } from 'react';

const Hero = ({ language }) => {
  const content = {
    pt: {
      status: "Disponível para projetos",
      greeting: "System.Initialize()",
      role: "Software Engineer & Full Stack",
      description: "Especialista em arquiteturas escaláveis e interfaces de alta fidelidade. Transformando lógica complexa em experiências digitais fluidas.",
      btnProjects: "Projetos",
      btnContact: "Contato"
    },
    en: {
      status: "Available for projects",
      greeting: "System.Initialize()",
      role: "Software Engineer & Full Stack",
      description: "Specialist in scalable architectures and high-fidelity interfaces. Transforming complex logic into fluid digital experiences.",
      btnProjects: "Projects",
      btnContact: "Get in Touch"
    }
  };

  const text = content[language] || content.pt;

  const itemVariants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="home" className="relative min-h-[90svh] flex items-center justify-center px-8 md:px-16 lg:px-24 bg-[#050505] overflow-hidden py-12 lg:py-0">
      
      {/* Background Minimalista */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] opacity-[0.03] bg-indigo-500 blur-[120px]" />
      </div>

      <motion.div 
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.08 }}
        className="relative z-10 max-w-6xl mx-auto w-full flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-32 items-center lg:py-20"
      >
        
        {/* Coluna da Foto - Ajustada para Mobile (Menor e primeiro na ordem) */}
        <motion.div 
          variants={itemVariants} 
          className="relative flex justify-center lg:justify-end order-1 lg:order-2"
        >
          {/* max-w-[220px] no mobile | lg:max-w-[400px] no desktop */}
          <div className="relative w-full max-w-[220px] sm:max-w-[280px] lg:max-w-[400px] aspect-[4/5]">
            <div className="absolute -inset-3 lg:-inset-4 border border-white/[0.03] rounded-[24px] lg:rounded-[32px] rotate-2 pointer-events-none" />
            
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl group transform-gpu">
              <img 
                src="/img/foto-perfil.jpeg" 
                alt="Josué Goulart"
                className="w-full h-full object-cover grayscale opacity-90 lg:opacity-80 lg:group-hover:grayscale-0 lg:group-hover:opacity-100 transition-all duration-700 ease-in-out scale-[1.01]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Tag flutuante visível também no mobile (opcional, ajustado para não poluir) */}
            <div className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-left-10 bg-[#050505] border border-white/10 px-4 py-2 lg:px-5 lg:py-3 rounded-xl shadow-2xl">
               <span className="text-[8px] lg:text-[10px] font-bold text-indigo-400 tracking-widest uppercase">Full-Stack Dev</span>
            </div>
          </div>
        </motion.div>

        {/* Coluna de Texto - Segunda ordem no mobile */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 order-2 lg:order-1">
          
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full border border-white/5 bg-white/[0.02]">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]" />
              <span className="text-[9px] tracking-[0.25em] font-bold text-indigo-300/80 uppercase">{text.status}</span>
            </div>
          </motion.div>

          <div className="space-y-4">
            <motion.p variants={itemVariants} className="text-indigo-500/50 font-mono text-[10px] tracking-[0.4em] uppercase">
              {text.greeting}
            </motion.p>

            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-black tracking-tight leading-[1.1] text-white uppercase italic">
              Josué<br />
              <span className="text-transparent stroke-text not-italic">Goulart</span>
            </motion.h1>
          </div>

          <div className="max-w-md space-y-6">
            <motion.h2 variants={itemVariants} className="text-sm md:text-lg text-white/70 font-medium tracking-wide">
              {text.role}
            </motion.h2>
            <motion.p variants={itemVariants} className="text-slate-500 text-[13px] md:text-base leading-relaxed font-light">
              {text.description}
            </motion.p>
          </div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4 justify-center lg:justify-start w-full sm:w-auto">
            <a href="#projetos" className="px-10 py-3.5 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-indigo-50 transition-all duration-300 transform-gpu active:scale-95 text-center">
              {text.btnProjects}
            </a>
            <a href="#contato" className="px-10 py-3.5 border border-white/10 text-white/50 text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:text-white hover:border-white/20 transition-all duration-300 text-center">
              {text.btnContact}
            </a>
          </motion.div>
        </div>

      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.15);
        }
        @media (max-width: 768px) {
          .stroke-text { -webkit-text-stroke: 0.8px rgba(255, 255, 255, 0.2); }
        }
      `}} />
    </section>
  );
};

export default memo(Hero);