import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCodeBranch, FaTerminal, FaAngleRight, FaLayerGroup } from 'react-icons/fa';

const Experience = ({ language }) => {
  const [selectedNode, setSelectedNode] = useState(null);

  // Esquema de Dados Expandido
  const experienceData = {
    pt: [
      {
        id: 1,
        role: "Desenvolvedor & Líder de Equipe",
        company: "Laboratório LIM",
        period: "Out. 2025 - Presente",
        description: "Desenvolvimento de software para gestão de estágios universitários, aplicando princípios sólidos de arquitetura.",
        techStack: ["Java", "Spring Boot", "TypeScript", "Next.js"],
        achievements: [
          "Liderança técnica e delegação de tarefas ágeis para a equipe de desenvolvimento.",
          "Aplicação prática de Engenharia de Requisitos para levantamento e modelagem do sistema.",
          "Integração de banco de dados relacional com interfaces modernas e tipadas."
        ],
        pos: { x: 25, y: 30 }, 
        color: "text-neon-cyan",
        borderGlow: "border-neon-cyan",
        glow: "shadow-[0_0_25px_rgba(34,211,238,0.8)]",
        bgCore: "bg-cyan-500",
        delay: 0
      },
      {
        id: 2,
        role: "Gestor de Projetos",
        company: "PUC Minas (Hackathon)",
        period: "Junho 2025",
        description: "Gerenciamento estratégico e coordenação de equipes durante a maratona de desenvolvimento estruturada.",
        techStack: ["Metodologias Ágeis", "Gestão de Ciclo de Vida", "Figma", "MVP"],
        achievements: [
          "Coordenação do ciclo de vida da aplicação do zero à prova de conceito.",
          "Garantia da entrega do MVP (Minimum Viable Product) dentro do prazo crítico estabelecido.",
          "Resolução de conflitos lógicos e priorização de features de alto impacto."
        ],
        pos: { x: 75, y: 65 },
        color: "text-neon-purple",
        borderGlow: "border-neon-purple",
        glow: "shadow-[0_0_25px_rgba(168,85,247,0.8)]",
        bgCore: "bg-purple-500",
        delay: 0.2
      }
    ],
    en: [
      {
        id: 1,
        role: "Developer & Team Lead",
        company: "LIM Laboratory",
        period: "Oct. 2025 - Present",
        description: "Software development for university internship management, applying solid architecture principles.",
        techStack: ["Java", "Spring Boot", "TypeScript", "Next.js"],
        achievements: [
          "Technical leadership and agile task delegation for the development team.",
          "Practical application of Requirements Engineering for system modeling.",
          "Relational database integration with modern, typed interfaces."
        ],
        pos: { x: 25, y: 30 },
        color: "text-neon-cyan",
        borderGlow: "border-neon-cyan",
        glow: "shadow-[0_0_25px_rgba(34,211,238,0.8)]",
        bgCore: "bg-cyan-500",
        delay: 0
      },
      {
        id: 2,
        role: "Project Manager",
        company: "PUC Minas (Hackathon)",
        period: "June 2025",
        description: "Strategic project management and team coordination during the structured development marathon.",
        techStack: ["Agile Methodologies", "Lifecycle Management", "Figma", "MVP"],
        achievements: [
          "Coordination of the application lifecycle from scratch to proof of concept.",
          "Ensured the delivery of the MVP within the established critical deadline.",
          "Resolution of logical conflicts and prioritization of high-impact features."
        ],
        pos: { x: 75, y: 65 },
        color: "text-neon-purple",
        borderGlow: "border-neon-purple",
        glow: "shadow-[0_0_25px_rgba(168,85,247,0.8)]",
        bgCore: "bg-purple-500",
        delay: 0.2
      }
    ]
  };

  const experiences = experienceData[language];
  const title = language === 'pt' ? 'Topologia Profissional.' : 'Professional Topology.';
  const centerPos = { x: 50, y: 50 };

  // ==========================================
  // O ALGORITMO DE SINCRONIZAÇÃO DE IDIOMA
  // ==========================================
  useEffect(() => {
    if (selectedNode) {
      // Procura o nó exato na nova linguagem e atualiza o estado
      const translatedNode = experienceData[language].find(exp => exp.id === selectedNode.id);
      setSelectedNode(translatedNode);
    }
  }, [language]);

  return (
    <section id="experiencias" className="py-32 px-6 relative z-10 min-h-[900px] flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        
        {/* Painel Esquerdo: O Grafo Dinâmico */}
        <div className="w-full lg:w-1/2 relative h-[500px] md:h-[650px] bg-cosmic-light/30 border border-white/5 rounded-3xl backdrop-blur-xl overflow-hidden shadow-2xl group">
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-[300px] h-[300px] rounded-full border border-slate-500"></div>
            <div className="absolute w-[500px] h-[500px] rounded-full border border-slate-600 border-dashed"></div>
            <div className="absolute w-[700px] h-[700px] rounded-full border border-slate-700"></div>
          </div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {experiences.map((exp) => {
              const isActive = selectedNode?.id === exp.id;
              const isDimmed = selectedNode && !isActive;
              return (
                <motion.line 
                  key={`line-${exp.id}`}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: isDimmed ? 0.1 : 0.4,
                    strokeDashoffset: [0, -100]
                  }}
                  transition={{ 
                    pathLength: { duration: 1.5, ease: "easeInOut" },
                    strokeDashoffset: { repeat: Infinity, duration: 3, ease: "linear" },
                    opacity: { duration: 0.3 }
                  }}
                  x1={`${centerPos.x}%`} 
                  y1={`${centerPos.y}%`} 
                  x2={`${exp.pos.x}%`} 
                  y2={`${exp.pos.y}%`} 
                  stroke={isActive ? "url(#gradient-active)" : "#ffffff"} 
                  strokeWidth={isActive ? "3" : "2"}
                  strokeDasharray="8 8"
                />
              );
            })}
            <defs>
              <linearGradient id="gradient-active" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>

          <motion.div 
            className="absolute z-10 flex flex-col items-center justify-center"
            style={{ left: `${centerPos.x}%`, top: `${centerPos.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <div className="absolute w-32 h-32 bg-slate-100/5 rounded-full animate-ping"></div>
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-cosmic-dark border border-white/20 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.05)] backdrop-blur-md relative overflow-hidden">
               <span className="text-2xl font-bold text-white tracking-widest relative z-10">LF.</span>
               <span className="text-[9px] text-slate-400 font-mono mt-1 relative z-10 tracking-widest uppercase">Root</span>
            </div>
          </motion.div>

          {experiences.map((exp) => {
            const isActive = selectedNode?.id === exp.id;
            const isDimmed = selectedNode && !isActive;

            return (
              <motion.div
                key={exp.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: isDimmed ? 0.8 : 1, 
                  opacity: isDimmed ? 0.3 : 1,
                  y: [0, -10, 0]
                }}
                transition={{ 
                  scale: { type: "spring", stiffness: 200, damping: 20 },
                  opacity: { duration: 0.3 },
                  y: { repeat: Infinity, duration: 4 + exp.delay * 10, ease: "easeInOut" }
                }}
                className="absolute z-20 cursor-pointer"
                style={{ left: `${exp.pos.x}%`, top: `${exp.pos.y}%`, transform: 'translate(-50%, -50%)' }}
                onClick={() => setSelectedNode(exp)}
              >
                <div className="relative flex flex-col items-center group">
                  <div className={`w-8 h-8 rounded-full bg-cosmic-dark border-2 ${isActive ? 'border-white' : 'border-white/30'} ${isActive ? exp.glow : 'shadow-lg'} flex items-center justify-center transition-all duration-300 group-hover:scale-125 z-10`}>
                    <div className={`w-2.5 h-2.5 rounded-full ${exp.bgCore} ${isActive ? 'animate-none' : 'animate-pulse'}`}></div>
                  </div>
                  
                  <div className={`absolute top-12 flex flex-col items-center transition-all duration-300 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-70 group-hover:opacity-100 group-hover:translate-y-1'}`}>
                    <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700 px-4 py-2 rounded-lg whitespace-nowrap shadow-xl">
                      <span className={`text-sm font-bold ${exp.color} tracking-wide`}>{exp.company}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Painel Direito: O HUD Expandido */}
        <div className="w-full lg:w-1/2 h-full flex flex-col justify-center">
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              {title}
            </h2>
            <div className="w-16 h-1 bg-neon-cyan mt-4 rounded-full"></div>
          </motion.div>

          <div className="relative w-full bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden min-h-[480px] shadow-2xl">
            <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center gap-2">
              <FaTerminal className="text-slate-500 text-sm" />
              <span className="text-xs text-slate-500 font-mono tracking-widest uppercase">Data_Stream_Output</span>
            </div>

            <div className="p-6 md:p-8 relative h-full flex flex-col">
              <AnimatePresence mode="wait">
                {selectedNode ? (
                  <motion.div
                    key={selectedNode.id}
                    initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10 flex flex-col h-full"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center border ${selectedNode.borderGlow} ${selectedNode.glow}`}>
                        <FaCodeBranch className={`text-xl ${selectedNode.color}`} />
                      </div>
                      <span className="text-xs font-mono text-slate-500 bg-slate-950 px-3 py-1.5 rounded-md border border-slate-800">
                        ID_NODE: 00{selectedNode.id}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-1">{selectedNode.role}</h3>
                    <div className="text-slate-400 text-sm font-mono mb-6 pb-4 border-b border-white/10 flex flex-wrap gap-2">
                      <span className="text-white font-semibold">{selectedNode.company}</span> 
                      <span>|</span> 
                      <span className={selectedNode.color}>{selectedNode.period}</span>
                    </div>

                    <p className="text-slate-300 leading-relaxed font-light mb-6">
                      {selectedNode.description}
                    </p>

                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <FaLayerGroup className="text-slate-500 text-sm" />
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Tech Stack</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedNode.techStack.map((tech, idx) => (
                          <span key={idx} className="bg-slate-800 border border-slate-700 text-slate-300 text-xs px-3 py-1 rounded-full shadow-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Key Outputs</span>
                      </div>
                      <ul className="space-y-2">
                        {selectedNode.achievements.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-400">
                            <FaAngleRight className={`mt-1 flex-shrink-0 ${selectedNode.color}`} />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </motion.div>
                ) : (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-slate-600 h-full"
                  >
                    <div className="w-16 h-16 rounded-full border border-slate-700/50 flex items-center justify-center mb-4">
                      <div className="w-2 h-2 rounded-full bg-slate-700 animate-ping"></div>
                    </div>
                    <p className="text-sm font-mono tracking-widest uppercase">
                      {language === 'pt' ? 'Aguardando Seleção de Nó...' : 'Awaiting Node Selection...'}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;