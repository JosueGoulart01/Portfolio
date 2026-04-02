import { useState, useEffect, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaGithub, FaSearch, FaArrowLeft, FaReact, FaPython, FaNodeJs, FaJava, FaDocker, FaTimes 
} from "react-icons/fa";
import { 
  SiSpringboot, SiMysql, SiJavascript, SiTypescript, SiNextdotjs 
} from "react-icons/si";
import { Link } from "react-router-dom";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";

// ==========================================
// MÁQUINA DE ESTADOS DO CARROSSEL (IMAGENS DO PROJETO)
// ==========================================
const ImageCarousel = ({ images, altText }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) {
    return <div className="absolute inset-0 w-full h-full bg-[#0a0a0a] flex items-center justify-center text-white/10 text-xs uppercase font-black">Sem Imagem</div>;
  }

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl bg-[#0a0a0a] group/carousel">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover/carousel:opacity-100 transition-opacity duration-500"
          alt={`${altText} - frame ${currentIndex + 1}`}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-20">
          {images.map((_, idx) => (
            <div key={idx} className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-4 bg-indigo-500' : 'w-1 bg-white/20'}`} />
          ))}
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

// ==========================================
// CARROSSEL DE TECNOLOGIAS (UNIVERSAL)
// ==========================================
const TechCarousel = ({ icons, searchTerm, setSearchTerm }) => {
  const duplicatedIcons = [...Object.entries(icons), ...Object.entries(icons), ...Object.entries(icons)];
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div 
      className="relative w-full overflow-hidden py-10 mb-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Sombras de profundidade laterais */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />
      
      <motion.div 
        className="flex gap-4 w-max px-4"
        animate={isPaused ? {} : { x: ["0%", "-33.33%"] }}
        transition={{ 
          ease: "linear", 
          duration: 30, 
          repeat: Infinity,
          repeatType: "loop" 
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
                : 'bg-white/[0.02] border-white/5 text-white/30 hover:border-white/20 hover:text-white/60'
              }`}
            >
              <span className="text-2xl">{icon}</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">{name}</span>
            </button>
          );
        })}
      </motion.div>
    </div>
  );
};

// ==========================================
// COMPONENTE PRINCIPAL (GALERIA)
// ==========================================
const AllProjects = ({ language }) => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  const techIcons = {
    "React": <FaReact />, "Next.js": <SiNextdotjs />, "TypeScript": <SiTypescript />,
    "Python": <FaPython />, "Node.js": <FaNodeJs />, "Java": <FaJava />,
    "Spring Boot": <SiSpringboot />, "MySQL": <SiMysql />, "Docker": <FaDocker />, "JS": <SiJavascript />
  };

  const allProjectsData = {
    pt: [
      { id: 1, title: "Re.use - Plataforma Sustentável", category: "full", summary: "Uma solução completa para o descarte e reutilização de tecidos.", description: "Plataforma digital para economia circular têxtil. Fluxo completo de cadastro, triagem e redistribuição.", tech: ["Java", "Spring Boot", "MySQL", "Node.js"], github: "https://github.com/JosueGoulart01/Re.use", images: ["/img/Re.use/image.png", "/img/Re.use/image2.png"] },
      { id: 2, title: "IA Cirúrgica", category: "full", summary: "Detecção de instrumentos médicos em tempo real.", description: "Visão computacional utilizando YOLOv8n para identificar instrumentos cirúrgicos.", tech: ["Python", "Flask", "React", "Docker"], github: "https://github.com/ICEI-PUC-Minas-PPLES-TI", images: ["/img/ProjetoExtensao/imagem3.jpeg", "/img/ProjetoExtensao/imagem4.jpeg"] },
      { id: 3, title: "Detalhes em Prata", category: "full", summary: "E-commerce de joias focado em performance.", description: "Aplicação full-stack para e-commerce de joias com integração de pagamentos.", tech: ["Java", "Spring Boot", "TypeScript", "Next.js"], github: "https://github.com/JosueGoulart01/loja-de-joias", images: ["/img/detalhesPrata/image.png", "/img/detalhesPrata/image2.png"] },
      { id: 4, title: "Personal Portfolio v2", category: "front", summary: "Interface de alto nível dark futurista.", description: "Meu portfólio profissional focado em UX/UI de alto nível.", tech: ["React", "TypeScript", "Next.js", "JS"], github: "https://github.com/JosueGoulart01/Portfolio", images: ["/img/portfolio/img1.png", "/img/portfolio/img2.png"] },
      { id: 5, title: "API Nutricional", category: "back", summary: "Microsserviço para consulta de alimentos.", description: "API para consulta de valores nutricionais de alimentos regionais.", tech: ["Java", "Spring Boot", "MySQL", "Docker"], github: "https://github.com/JosueGoulart01/Api-TabelaNutricionalBrasileira", images: ["/img/ApiTabelaNutricionalBrasileira/ft1.png", "/img/ApiTabelaNutricionalBrasileira/ft2.png"] }
    ],
    en: [] 
  };

  const allProjects = allProjectsData[language] || allProjectsData['pt'];

  const filteredProjects = useMemo(() => {
    return allProjects.filter((p) => {
      const matchesFilter = filter === "all" || p.category === filter;
      const matchesSearch = p.tech.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())) || 
                           p.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchTerm, allProjects]);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 px-8 md:px-16 lg:px-24 pb-20 relative overflow-x-hidden">
      {/* Blur Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-indigo-500 font-mono text-[10px] tracking-[0.3em] uppercase group">
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
              {language === 'pt' ? 'Voltar para Home' : 'Back to Home'}
            </Link>
            <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
              {language === 'pt' ? 'Galeria' : 'Gallery'}<span className="text-indigo-500 not-italic">.</span>
            </h1>
          </div>

          <div className="relative w-full md:w-80 group">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              type="text"
              placeholder="BUSCAR PROJETO..."
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-indigo-500/50 text-[10px] font-bold tracking-[0.2em] transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* --- CARROSSEL DE TECNOLOGIAS UNIVERSAL --- */}
        <TechCarousel icons={techIcons} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-12 p-1.5 bg-white/[0.02] border border-white/5 rounded-2xl w-fit">
          {['all', 'front', 'back', 'full'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === cat ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'text-white/40 hover:text-white/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de Projetos */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <CardContainer className="w-full">
                  <CardBody className="bg-[#0a0a0a] border border-white/10 w-full rounded-[32px] p-8 flex flex-col justify-between transition-all hover:border-indigo-500/40 min-h-[520px]">
                    <div>
                      <CardItem translateZ="50" className="text-xl font-black italic uppercase tracking-tighter text-white mb-2">
                        {project.title}
                      </CardItem>
                      <CardItem translateZ="60" as="p" className="text-slate-400 text-[11px] mb-6 line-clamp-1">
                        {project.summary}
                      </CardItem>
                      <CardItem translateZ="100" className="w-full mb-8 pointer-events-none">
                        <div className="h-48 w-full">
                           <ImageCarousel images={project.images} altText={project.title} />
                        </div>
                      </CardItem>
                    </div>

                    <div className="space-y-8" onClick={(e) => e.stopPropagation()}>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span key={t} className="text-[8px] font-black uppercase tracking-widest bg-white/[0.03] border border-white/10 text-indigo-400/80 px-2 py-1 rounded-md">
                            {t}
                          </span>
                        ))}
                      </div>
                      <a href={project.github} target="_blank" rel="noopener noreferrer" 
                        className="flex items-center justify-center gap-3 w-full py-4 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-500 hover:text-white transition-all">
                        <FaGithub size={16} /> GitHub
                      </a>
                    </div>
                  </CardBody>
                </CardContainer>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal de Detalhes (Omitido por brevidade, mas mantido conforme seu original) */}
    </div>
  );
};

export default memo(AllProjects);