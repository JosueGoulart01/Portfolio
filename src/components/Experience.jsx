import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCodeBranch, FaTerminal, FaAngleRight, FaLayerGroup } from 'react-icons/fa';

const Experience = ({ language }) => {
  const [selectedNode, setSelectedNode] = useState(null);

  const experienceData = {
    pt: [
      {
        id: 1,
        role: "Dev Spring Boot & Lead",
        company: "Laboratório LIM",
        period: "Out. 2025 - Presente",
        description: "Desenvolvimento de sistemas escaláveis para gestão acadêmica, focando em robustez e performance no ecossistema Java.",
        techStack: ["Java 21", "Spring Boot", "PostgreSQL", "Docker"],
        achievements: [
          "Arquitetura de microsserviços e APIs RESTful.",
          "Implementação de Spring Security e OAuth2.",
          "Otimização de queries e persistência de dados com JPA/Hibernate."
        ],
        pos: { x: 30, y: 35 }, 
        color: "text-indigo-400",
        delay: 0
      },
      {
        id: 2,
        role: "Analista de Dados",
        company: "PUC Minas",
        period: "Junho 2025 - Out. 2025",
        description: "Extração de insights e modelagem estatística para suporte à decisão em projetos de extensão universitária.",
        techStack: ["Python", "Pandas", "Power BI", "SQL"],
        achievements: [
          "Criação de dashboards interativos para monitoramento de KPIs.",
          "Limpeza e tratamento de grandes volumes de dados (ETL).",
          "Aplicação de modelos de regressão para previsão de demanda."
        ],
        pos: { x: 70, y: 65 },
        color: "text-indigo-400",
        delay: 0.2
      }
    ],
    en: [
      {
        id: 1,
        role: "Spring Boot Dev & Lead",
        company: "LIM Laboratory",
        period: "Oct. 2025 - Present",
        description: "Development of scalable systems for academic management, focusing on robustness and performance within the Java ecosystem.",
        techStack: ["Java 21", "Spring Boot", "PostgreSQL", "Docker"],
        achievements: [
          "Microservices architecture and RESTful APIs.",
          "Implementation of Spring Security and OAuth2.",
          "Query optimization and data persistence with JPA/Hibernate."
        ],
        pos: { x: 30, y: 35 },
        color: "text-indigo-400",
        delay: 0
      },
      {
        id: 2,
        role: "Data Analyst",
        company: "PUC Minas",
        period: "June 2025 - Oct. 2025",
        description: "Insight extraction and statistical modeling to support decision-making in university outreach projects.",
        techStack: ["Python", "Pandas", "Power BI", "SQL"],
        achievements: [
          "Creation of interactive dashboards for KPI monitoring.",
          "Data cleaning and processing of large volumes (ETL).",
          "Application of regression models for demand forecasting."
        ],
        pos: { x: 70, y: 65 },
        color: "text-indigo-400",
        delay: 0.2
      }
    ]
  };

  const experiences = experienceData[language] || experienceData.pt;
  const title = language === 'pt' ? 'Experiência' : 'Experience';
  const centerPos = { x: 50, y: 50 };

  useEffect(() => {
    if (selectedNode) {
      const translatedNode = experiences.find(exp => exp.id === selectedNode.id);
      setSelectedNode(translatedNode);
    }
  }, [language, experiences]);

  return (
    <section id="experiencias" className="py-24 px-6 md:px-12 bg-[#050505] relative overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col lg:grid lg:grid-cols-10 gap-12 items-center">
        
        {/* Painel Esquerdo: Grafo */}
        <div className="w-full lg:col-span-4 relative h-[400px] bg-[#0c0c0e] border border-white/5 rounded-2xl overflow-hidden group">
          
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {experiences.map((exp) => (
              <motion.line 
                key={`line-${exp.id}`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: selectedNode?.id === exp.id ? 0.6 : 0.15 
                }}
                x1={`${centerPos.x}%`} y1={`${centerPos.y}%`} 
                x2={`${exp.pos.x}%`} y2={`${exp.pos.y}%`} 
                stroke={selectedNode?.id === exp.id ? "#6366f1" : "white"} 
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            ))}
          </svg>

          {/* Root Node */}
          <div 
            className="absolute z-10 flex flex-col items-center justify-center"
            style={{ left: `${centerPos.x}%`, top: `${centerPos.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <div className="w-12 h-12 rounded-full bg-black border border-indigo-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                <span className="text-[10px] font-bold text-white tracking-widest">LF</span>
            </div>
          </div>

          {/* Nodes */}
          {experiences.map((exp) => {
            const isActive = selectedNode?.id === exp.id;
            return (
              <motion.div
                key={exp.id}
                whileHover={{ scale: 1.1 }}
                onClick={() => setSelectedNode(exp)}
                className="absolute z-20 cursor-pointer"
                style={{ left: `${exp.pos.x}%`, top: `${exp.pos.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                  ${isActive ? 'bg-indigo-500 border-white shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'bg-[#1a1a1a] border border-white/10'}`}>
                  <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-indigo-500/50'}`} />
                </div>
                {!isActive && (
                    <span className="absolute top-10 left-1/2 -translate-x-1/2 text-[8px] text-white/30 uppercase tracking-tighter whitespace-nowrap">
                        {exp.company}
                    </span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Painel Direito: Terminal */}
        <div className="w-full lg:col-span-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <span className="text-indigo-500 text-[9px] font-bold tracking-[0.5em] uppercase">{language === 'pt' ? 'Carreira' : 'Career'}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-2">{title}</h2>
          </motion.div>

          <div className="relative bg-[#0c0c0e] border border-white/5 rounded-xl overflow-hidden min-h-[400px]">
            <div className="bg-white/[0.02] px-5 py-3 border-b border-white/5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
                <span className="text-[9px] text-[#444] font-mono ml-4 tracking-widest uppercase">experience.sys</span>
            </div>

            <div className="p-8">
              <AnimatePresence mode="wait">
                {selectedNode ? (
                  <motion.div
                    key={selectedNode.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-white text-xl font-bold">{selectedNode.role}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest">{selectedNode.company}</span>
                        <span className="text-[#444] text-[10px] font-mono">{selectedNode.period}</span>
                      </div>
                    </div>

                    <p className="text-[#8e8e93] text-sm leading-relaxed italic border-l border-indigo-500/30 pl-4">
                      {selectedNode.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <span className="text-[9px] font-bold text-[#444] uppercase tracking-widest flex items-center gap-2">
                          <FaLayerGroup size={10} className="text-indigo-500" /> Stack
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedNode.techStack.map((tech, idx) => (
                            <span key={idx} className="bg-white/5 border border-white/5 text-white/60 text-[9px] px-2 py-1 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <span className="text-[9px] font-bold text-[#444] uppercase tracking-widest flex items-center gap-2">
                          <div className="w-1 h-1 bg-indigo-500 rounded-full" /> {language === 'pt' ? 'Conquistas' : 'Achievements'}
                        </span>
                        <ul className="space-y-2">
                          {selectedNode.achievements.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-[10px] text-[#8e8e93]">
                              <FaAngleRight className="mt-1 text-indigo-500 shrink-0" size={8} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-[280px] flex flex-col items-center justify-center text-center">
                    <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center mb-4">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping" />
                    </div>
                    <p className="text-[10px] text-[#444] uppercase tracking-[0.3em]">
                      {language === 'pt' ? 'Selecione um nó para explorar' : 'Select a node to explore'}
                    </p>
                  </div>
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