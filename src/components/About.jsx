import { motion } from 'framer-motion';
import { memo } from 'react';

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const About = ({ language }) => {
  const content = {
    pt: {
      tag: "// about_me",
      title: "Minha Trajetória",
      description: "Estudante de Engenharia de Software na PUC Minas e Dev Full Stack.",
      focus: "Focado em projetar arquiteturas eficientes e soluções escaláveis. Atuo com o ecossistema Java/Spring Boot no back-end e interfaces modernas com React/Next.js no front-end.",
      goals: "Acredito que o rigor analítico é fundamental para a criação de sistemas limpos, seguros e manuteníveis.",
      stats: [
        { n: '5º', label: 'Período', sub: 'Eng. Software' },
        { n: '5+', label: 'Projetos', sub: 'Construídos' },
        { n: 'PUC', label: 'Minas', sub: 'Estudos' },
      ]
    },
    en: {
      tag: "// about_me",
      title: "My Journey",
      description: "Software Engineering student at PUC Minas and Full Stack Developer.",
      focus: "Focused on designing efficient architectures and scalable solutions. I work with Java/Spring Boot on the back-end and modern React/Next.js interfaces on the front-end.",
      goals: "I believe analytical rigor is fundamental to creating clean, secure, and maintainable systems.",
      stats: [
        { n: '5th', label: 'Semester', sub: 'SW Engineering' },
        { n: '5+', label: 'Projects', sub: 'Completed' },
        { n: 'PUC', label: 'Minas', sub: 'University' },
      ]
    }
  };

  const text = content[language] || content.pt;

  return (
    <section id="sobre" className="relative py-20 md:py-32 px-6 md:px-16 lg:px-24 bg-[#050505] overflow-hidden">
      
      {/* Background Decor sutil */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute -bottom-24 -right-24 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-500/5 blur-[80px] md:blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header da Seção */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="mb-12 md:mb-20 text-center lg:text-left"
        >
          <motion.p variants={itemVariants} className="text-indigo-500/60 font-mono text-[10px] md:text-[11px] tracking-[0.4em] md:tracking-[0.5em] uppercase mb-3 md:mb-4">
            {text.tag}
          </motion.p>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter">
            {text.title}<span className="text-indigo-500 not-italic">.</span>
          </motion.h2>
          <motion.div variants={itemVariants} className="h-px w-16 md:w-20 bg-indigo-500/30 mt-4 md:mt-6 mx-auto lg:mx-0" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start">
          
          {/* TEXTO PRINCIPAL */}
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="lg:col-span-7 space-y-6 md:space-y-8"
          >
            <motion.p variants={itemVariants} className="text-lg md:text-2xl font-medium text-white/90 leading-tight md:leading-snug">
              {text.description}
            </motion.p>
            
            <motion.p variants={itemVariants} className="text-slate-500 text-sm md:text-lg leading-relaxed font-light">
              {text.focus}
            </motion.p>

            {/* Quote/Goals */}
            <motion.div 
              variants={itemVariants}
              className="relative p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm"
            >
              <span className="absolute -top-3 -left-1 md:-top-4 md:-left-2 text-4xl md:text-6xl text-indigo-500/20 font-serif">&quot;</span>
              <p className="relative z-10 text-slate-400 text-sm md:text-base italic font-light leading-relaxed">
                {text.goals}
              </p>
            </motion.div>
          </motion.div>

          {/* STATS - Melhorado para Mobile */}
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 md:gap-4"
          >
            {text.stats.map((s, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group p-5 md:p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-indigo-500/30 transition-all duration-500 flex lg:block items-center justify-between"
              >
                <div className="flex items-center lg:items-end gap-4 lg:gap-6">
                  <span className="text-3xl md:text-5xl font-black tracking-tighter text-white group-hover:text-indigo-400 transition-colors min-w-[3rem]">
                    {s.n}
                  </span>
                  <div className="text-left">
                    <p className="text-[10px] md:text-xs font-black text-indigo-500/80 uppercase tracking-widest leading-none mb-1">
                      {s.label}
                    </p>
                    <p className="text-[9px] md:text-[11px] text-slate-500 uppercase font-medium">
                      {s.sub}
                    </p>
                  </div>
                </div>
                {/* Indicador visual discreto para mobile no final do card */}
                <div className="lg:hidden w-1 h-1 rounded-full bg-indigo-500/20" />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default memo(About);