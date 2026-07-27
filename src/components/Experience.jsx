import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaAngleRight, FaLayerGroup } from 'react-icons/fa';

const EXPERIENCE_DATA = {
  pt: [
    {
      id: 1,
      role: "Projeto de Extensão – Dev Full-Stack",
      company: "Agência Experimental de Software (PUC Minas)",
      period: "Abr. 2026 - Presente",
      description: "Contribuição para uma plataforma voltada a fisioterapeutas, para monitoramento de pacientes e prescrição de exercícios domiciliares.",
      techStack: ["Java", "Spring Boot", "PostgreSQL", "Flutter", "React"],
      achievements: [
        "Construção de APIs REST integrando PostgreSQL, dando suporte a apps mobile (Flutter) e web (React).",
        "Aplicação de boas práticas de modelagem de dados e versionamento com Git.",
        "Desenvolvimento escalável de funcionalidades em equipe multidisciplinar."
      ],
      pos: { x: 50, y: 12 },
      color: "text-indigo-400",
      delay: 0
    },
    {
      id: 2,
      role: "Dev Full-Stack (Freelance & Projetos Pessoais)",
      company: "Independente",
      period: "2024 - Presente",
      description: "Construção de APIs RESTful escaláveis com Spring Boot e interfaces modernas com React e TypeScript, do back-end ao deploy em nuvem.",
      techStack: ["Java", "Spring Boot", "React", "TypeScript", "Docker", "AWS"],
      achievements: [
        "Projetou APIs RESTful completas com arquitetura em camadas (Controller/Service/Repository).",
        "Implementou autenticação JWT com Spring Security e testes automatizados (JUnit/Mockito).",
        "Containerizou e implantou aplicações na AWS/GCP com CI/CD (GitHub Actions) e Kubernetes."
      ],
      pos: { x: 80, y: 78 },
      color: "text-indigo-400",
      delay: 0.15
    },
    {
      id: 3,
      role: "Pesquisa Científica – Gamificação na Educação",
      company: "PUC Minas",
      period: "Ago. 2025 - Jan. 2026",
      description: "Pesquisa acadêmica sobre o uso de plataformas gamificadas (Kahoot!, Quizizz) como apoio ao ensino e seu impacto no engajamento estudantil.",
      techStack: ["Pesquisa Acadêmica", "Revisão de Literatura", "Metodologia Científica"],
      achievements: [
        "Análise do impacto de ferramentas gamificadas na participação e retenção de conhecimento.",
        "Condução de revisão de literatura e análise de estudos científicos.",
        "Elaboração de relatórios acadêmicos sobre metodologias de aprendizagem ativa."
      ],
      pos: { x: 20, y: 78 },
      color: "text-indigo-400",
      delay: 0.3
    }
  ],
  en: [
    {
      id: 1,
      role: "University Outreach Project – Full-Stack Dev",
      company: "Software Experimental Agency (PUC Minas)",
      period: "Apr. 2026 - Present",
      description: "Contributing to a platform for physical therapists to monitor patients and prescribe home exercises.",
      techStack: ["Java", "Spring Boot", "PostgreSQL", "Flutter", "React"],
      achievements: [
        "Built REST APIs integrating PostgreSQL, supporting mobile (Flutter) and web (React) apps.",
        "Applied data modeling best practices and Git versioning.",
        "Developed scalable features within a multidisciplinary team."
      ],
      pos: { x: 50, y: 12 },
      color: "text-indigo-400",
      delay: 0
    },
    {
      id: 2,
      role: "Full-Stack Dev (Freelance & Personal Projects)",
      company: "Independent",
      period: "2024 - Present",
      description: "Building scalable RESTful APIs with Spring Boot and modern interfaces with React and TypeScript, from back-end to cloud deployment.",
      techStack: ["Java", "Spring Boot", "React", "TypeScript", "Docker", "AWS"],
      achievements: [
        "Designed full RESTful APIs with layered architecture (Controller/Service/Repository).",
        "Implemented JWT authentication with Spring Security and automated tests (JUnit/Mockito).",
        "Containerized and deployed apps on AWS/GCP with CI/CD (GitHub Actions) and Kubernetes."
      ],
      pos: { x: 80, y: 78 },
      color: "text-indigo-400",
      delay: 0.15
    },
    {
      id: 3,
      role: "Scientific Research – Gamification in Education",
      company: "PUC Minas",
      period: "Aug. 2025 - Jan. 2026",
      description: "Academic research on gamified platforms (Kahoot!, Quizizz) as teaching tools and their impact on student engagement.",
      techStack: ["Academic Research", "Literature Review", "Scientific Methodology"],
      achievements: [
        "Analyzed the impact of gamified tools on classroom participation and retention.",
        "Conducted literature review and analysis of scientific studies.",
        "Authored academic reports on active learning methodologies."
      ],
      pos: { x: 20, y: 78 },
      color: "text-indigo-400",
      delay: 0.3
    }
  ]
};

const Experience = ({ language }) => {
  const [selectedNode, setSelectedNode] = useState(null);

  const experiences = EXPERIENCE_DATA[language] || EXPERIENCE_DATA.pt;
  const title = language === 'pt' ? 'Experiência' : 'Experience';
  const centerPos = { x: 50, y: 50 };

  useEffect(() => {
    setSelectedNode((prev) => (prev ? experiences.find((exp) => exp.id === prev.id) ?? null : prev));
  }, [experiences]);

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
                <span className="text-[11px] font-bold text-white tracking-widest">JG</span>
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
                    <span className="absolute top-10 left-1/2 -translate-x-1/2 text-[9px] text-white/30 uppercase tracking-tighter whitespace-nowrap">
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
            <span className="text-indigo-500 text-[10px] font-bold tracking-[0.5em] uppercase">{language === 'pt' ? 'Carreira' : 'Career'}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-2">{title}</h2>
          </motion.div>

          <div className="relative bg-[#0c0c0e] border border-white/5 rounded-xl overflow-hidden min-h-[400px]">
            <div className="bg-white/[0.02] px-5 py-3 border-b border-white/5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
                <span className="text-[10px] text-[#444] font-mono ml-4 tracking-widest uppercase">experience.sys</span>
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
                        <span className="text-[#444] text-[11px] font-mono">{selectedNode.period}</span>
                      </div>
                    </div>

                    <p className="text-[#8e8e93] text-sm leading-relaxed italic border-l border-indigo-500/30 pl-4">
                      {selectedNode.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <span className="text-[10px] font-bold text-[#444] uppercase tracking-widest flex items-center gap-2">
                          <FaLayerGroup size={10} className="text-indigo-500" /> Stack
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedNode.techStack.map((tech, idx) => (
                            <span key={idx} className="bg-white/5 border border-white/5 text-white/60 text-[10px] px-2 py-1 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <span className="text-[10px] font-bold text-[#444] uppercase tracking-widest flex items-center gap-2">
                          <div className="w-1 h-1 bg-indigo-500 rounded-full" /> {language === 'pt' ? 'Conquistas' : 'Achievements'}
                        </span>
                        <ul className="space-y-2">
                          {selectedNode.achievements.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-[11px] text-[#8e8e93]">
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
                    <p className="text-[11px] text-[#444] uppercase tracking-[0.3em]">
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