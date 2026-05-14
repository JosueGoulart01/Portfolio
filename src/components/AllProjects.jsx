import { useState, useMemo, memo, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FaGithub, FaSearch, FaArrowLeft, FaReact, FaPython,
  FaNodeJs, FaJava, FaDocker, FaTimes, FaExternalLinkAlt,
} from "react-icons/fa";
import {
  SiSpringboot, SiMysql, SiJavascript, SiTypescript, SiNextdotjs,
} from "react-icons/si";
import { Link } from "react-router-dom";
import TechCarousel from "./TechCarousel";
 
// ─────────────────────────────────────────────
// TECH ICONS — fora do componente: objeto estável, nunca recriado
// ─────────────────────────────────────────────
const TECH_ICONS = {
  React:        <FaReact />,
  "Next.js":    <SiNextdotjs />,
  TypeScript:   <SiTypescript />,
  Python:       <FaPython />,
  "Node.js":    <FaNodeJs />,
  Java:         <FaJava />,
  "Spring Boot":<SiSpringboot />,
  MySQL:        <SiMysql />,
  Docker:       <FaDocker />,
  JS:           <SiJavascript />,
};
 
// ─────────────────────────────────────────────
// IMAGE CAROUSEL — para o timer quando fora da viewport
// ─────────────────────────────────────────────
const ImageCarousel = memo(({ images, altText }) => {
  const [idx, setIdx] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.4 });
 
  useEffect(() => {
    if (!images || images.length <= 1 || !isInView) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % images.length), 3200);
    return () => clearInterval(id);
  }, [images, isInView]);
 
  if (!images?.length) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a] text-white/10 text-xs uppercase font-black">
        Sem Imagem
      </div>
    );
  }
 
  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden rounded-2xl bg-[#0a0a0a] group/img">
      <AnimatePresence mode="wait">
        <motion.img
          key={idx}
          src={images[idx]}
          alt={`${altText} — ${idx + 1}`}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover/img:opacity-100 transition-opacity duration-500"
        />
      </AnimatePresence>
 
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-20 pointer-events-none">
          {images.map((_, i) => (
            <div
              key={i}
              className={`h-[3px] rounded-full transition-all duration-400 ${
                i === idx ? "w-4 bg-indigo-400" : "w-1 bg-white/15"
              }`}
            />
          ))}
        </div>
      )}
 
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/70 via-transparent to-transparent pointer-events-none" />
    </div>
  );
});
ImageCarousel.displayName = "ImageCarousel";
 
// ─────────────────────────────────────────────
// PROJECT CARD — memo: só re-renderiza se o projeto ou seleção mudar
// ─────────────────────────────────────────────
const ProjectCard = memo(({ project, onSelect }) => (
  <motion.article
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.92 }}
    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    onClick={() => onSelect(project)}
    className="
      group cursor-pointer flex flex-col
      bg-[#0a0a0a] border border-white/[0.07]
      rounded-[28px] overflow-hidden
      hover:border-indigo-500/35
      transition-colors duration-300
    "
  >
    {/* Imagem */}
    <div className="relative h-48 w-full overflow-hidden bg-[#0c0c10]">
      <ImageCarousel images={project.images} altText={project.title} />
    </div>
 
    {/* Corpo */}
    <div className="flex flex-col flex-1 p-6 gap-4">
      <div>
        <h3 className="text-white font-black italic uppercase tracking-tight text-base leading-tight mb-1 group-hover:text-indigo-300 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-white/35 text-[10px] leading-relaxed line-clamp-2">
          {project.summary}
        </p>
      </div>
 
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-[7px] font-black uppercase tracking-widest px-2 py-1 rounded-md bg-indigo-500/[0.06] border border-indigo-500/15 text-indigo-400/70"
          >
            {t}
          </span>
        ))}
      </div>
 
      {/* Footer */}
      <div
        className="flex items-center justify-between pt-4 border-t border-white/[0.04]"
        onClick={(e) => e.stopPropagation()}
      >
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/20 hover:text-white transition-colors duration-200"
          aria-label="GitHub"
        >
          <FaGithub size={13} />
        </a>
        <button
          onClick={(e) => { e.stopPropagation(); }}
          className="text-[8px] font-black uppercase tracking-[0.2em] text-indigo-500/60 hover:text-indigo-400 transition-colors"
        >
          Ver detalhes →
        </button>
      </div>
    </div>
  </motion.article>
));
ProjectCard.displayName = "ProjectCard";
 
// ─────────────────────────────────────────────
// PROJECT MODAL — detalhe completo com fechar por Escape/overlay
// ─────────────────────────────────────────────
const ProjectModal = memo(({ project, onClose, language }) => {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    // Trava o scroll do body enquanto modal está aberto
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);
 
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
 
      {/* Painel */}
      <motion.div
        className="relative z-10 w-full max-w-2xl bg-[#0d0d0f] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Imagem Header */}
        <div className="relative h-52 w-full bg-[#0c0c10]">
          <ImageCarousel images={project.images} altText={project.title} />
        </div>
 
        {/* Conteúdo */}
        <div className="p-8 space-y-5">
          <div>
            <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">
              {project.title}
            </h2>
            <p className="text-white/40 text-xs mt-1">{project.summary}</p>
          </div>
 
          <p className="text-white/60 text-sm leading-relaxed">{project.description}</p>
 
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-[8px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300/80"
              >
                {t}
              </span>
            ))}
          </div>
 
          <div className="flex gap-3 pt-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-500 hover:text-white transition-all duration-300"
            >
              <FaGithub size={14} />
              GitHub
            </a>
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 text-white/50 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white/10 transition-all duration-300"
            >
              <FaTimes size={12} />
              {language === "pt" ? "Fechar" : "Close"}
            </button>
          </div>
        </div>
 
        {/* Botão X no canto */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all"
        >
          <FaTimes size={11} />
        </button>
      </motion.div>
    </motion.div>
  );
});
ProjectModal.displayName = "ProjectModal";
 
// ─────────────────────────────────────────────
// DADOS — fora do componente: nunca recriados
// ─────────────────────────────────────────────
const PROJECTS_DATA = {
  pt: [
    { id: 1, title: "Re.use — Plataforma Sustentável", category: "full", summary: "Solução completa para descarte e reutilização de tecidos.", description: "Plataforma digital para economia circular têxtil. Fluxo completo de cadastro, triagem e redistribuição.", tech: ["Java", "Spring Boot", "MySQL", "Node.js"], github: "https://github.com/JosueGoulart01/Re.use", images: ["/img/Re.use/image.png", "/img/Re.use/image2.png"] },
    { id: 2, title: "IA Cirúrgica", category: "full", summary: "Detecção de instrumentos médicos em tempo real.", description: "Visão computacional com YOLOv8n para identificar instrumentos cirúrgicos em sala de operação.", tech: ["Python", "Flask", "React", "Docker"], github: "https://github.com/ICEI-PUC-Minas-PPLES-TI", images: ["/img/ProjetoExtensao/imagem3.jpeg", "/img/ProjetoExtensao/imagem4.jpeg"] },
    { id: 3, title: "Detalhes em Prata", category: "full", summary: "E-commerce de joias focado em performance.", description: "Aplicação full-stack para e-commerce de joias com integração de pagamentos e painel admin.", tech: ["Java", "Spring Boot", "TypeScript", "Next.js"], github: "https://github.com/JosueGoulart01/loja-de-joias", images: ["/img/detalhesPrata/image.png", "/img/detalhesPrata/image2.png"] },
    { id: 4, title: "Personal Portfolio v2", category: "front", summary: "Interface dark futurista de alto nível.", description: "Portfólio profissional focado em UX/UI com animações 3D, scroll suave e design system próprio.", tech: ["React", "TypeScript", "Next.js", "JS"], github: "https://github.com/JosueGoulart01/Portfolio", images: ["/img/portfolio/img1.png", "/img/portfolio/img2.png"] },
    { id: 5, title: "API Nutricional", category: "back", summary: "Microsserviço para consulta de alimentos.", description: "API REST para consulta de valores nutricionais de alimentos regionais brasileiros.", tech: ["Java", "Spring Boot", "MySQL", "Docker"], github: "https://github.com/JosueGoulart01/Api-TabelaNutricionalBrasileira", images: ["/img/ApiTabelaNutricionalBrasileira/ft1.png", "/img/ApiTabelaNutricionalBrasileira/ft2.png"] },
  ],
  en: [],
};
 
const CATEGORIES = ["all", "front", "back", "full"];
 
// ─────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────
const AllProjects = ({ language }) => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
 
  const projects = PROJECTS_DATA[language] ?? PROJECTS_DATA.pt;
 
  const filteredProjects = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return projects.filter((p) => {
      const matchesFilter = filter === "all" || p.category === filter;
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q));
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchTerm, projects]);
 
  const handleSelect = useCallback((p) => setSelectedProject(p), []);
  const handleClose = useCallback(() => setSelectedProject(null), []);
 
  return (
    <>
      <div className="min-h-screen bg-[#050505] text-white pt-32 px-6 md:px-14 lg:px-24 pb-24 relative overflow-x-hidden">
        {/* Glow ambiente */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[350px] bg-indigo-600/[0.04] blur-[140px] rounded-full pointer-events-none" />
 
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div className="space-y-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-indigo-500 font-mono text-[9px] tracking-[0.35em] uppercase group"
              >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-200" />
                {language === "pt" ? "Voltar para Home" : "Back to Home"}
              </Link>
              <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
                {language === "pt" ? "Galeria" : "Gallery"}
                <span className="text-indigo-500 not-italic">.</span>
              </h1>
            </div>
 
            {/* Search */}
            <div className="relative w-full md:w-72 group">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-indigo-400 transition-colors duration-200 text-xs" />
              <input
                type="text"
                placeholder={language === "pt" ? "Buscar projeto ou tech..." : "Search project or tech..."}
                className="w-full bg-white/[0.025] border border-white/8 rounded-2xl py-3.5 pl-11 pr-4 outline-none focus:border-indigo-500/40 text-[10px] font-bold tracking-[0.15em] text-white/70 placeholder:text-white/20 transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/60 transition-colors"
                >
                  <FaTimes size={10} />
                </button>
              )}
            </div>
          </div>
 
          {/* Carrossel de tecnologias */}
          <TechCarousel
            icons={TECH_ICONS}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
 
          {/* Filtros de categoria */}
          <div className="flex flex-wrap gap-2 mb-10 p-1.5 bg-white/[0.02] border border-white/5 rounded-2xl w-fit">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-250 ${
                  filter === cat
                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                    : "text-white/35 hover:text-white/65"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
 
          {/* Contador */}
          <p className="text-white/20 text-[9px] font-bold uppercase tracking-widest mb-6">
            {filteredProjects.length}{" "}
            {language === "pt" ? "projeto(s) encontrado(s)" : "project(s) found"}
          </p>
 
          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={handleSelect}
                />
              ))}
            </AnimatePresence>
          </motion.div>
 
          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center"
            >
              <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">
                {language === "pt" ? "Nenhum projeto encontrado" : "No projects found"}
              </p>
            </motion.div>
          )}
        </div>
      </div>
 
      {/* Modal de detalhes */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={handleClose}
            language={language}
          />
        )}
      </AnimatePresence>
    </>
  );
};
 
export default memo(AllProjects);