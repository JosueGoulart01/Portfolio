import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaGithub, FaSearch, FaArrowLeft, FaCode, FaServer, FaLayerGroup,
  FaReact, FaPython, FaNodeJs, FaJava, FaDocker 
} from "react-icons/fa";
import { SiSpringboot, SiMysql, SiFlask, SiTailwindcss, SiJavascript } from "react-icons/si";
import { Link } from "react-router-dom";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";

const AllProjects = ({ language }) => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mapeamento de Ícones Core
  const techIcons = {
    "React": <FaReact className="text-[#61DAFB]" />,
    "Python": <FaPython className="text-[#3776AB]" />,
    "Node.js": <FaNodeJs className="text-[#339933]" />,
    "Java": <FaJava className="text-[#007396]" />,
    "Spring Boot": <SiSpringboot className="text-[#6DB33F]" />,
    "MySQL": <SiMysql className="text-[#4479A1]" />,
    "Docker": <FaDocker className="text-[#2496ED]" />,
    "JS": <SiJavascript className="text-[#F7DF1E]" />
  };

  const allProjects = [
    {
      id: 1,
      title: "Re.use - Plataforma Sustentável",
      category: "back",
      description: "Plataforma digital para economia circular têxtil. Fluxo completo de cadastro e redistribuição.",
      tech: ["Java", "Spring Boot", "MySQL", "Node.js"],
      github: "https://github.com/...",
      image: "/reuse-demo.webp",
    },
    {
      id: 2,
      title: "IA Cirúrgica (Pesquisa)",
      category: "full",
      description: "Visão computacional (YOLOv8n) para identificar instrumentos cirúrgicos em tempo real.",
      tech: ["Python", "Flask", "React", "Docker"],
      github: "https://github.com/...",
      image: "/ia-cirurgica.webp",
    },
    {
      id: 3,
      title: "RoomBookings - Reservas",
      category: "back",
      description: "Sistema ágil para gestão e controle de reservas de salas de reunião.",
      tech: ["Java", "MySQL", "POO"],
      github: "https://github.com/...",
      image: "/roombookings.webp",
    }
  ];

  const filteredProjects = useMemo(() => {
    return allProjects.filter((p) => {
      const matchesFilter = filter === "all" || p.category === filter;
      const matchesSearch = p.tech.some(t => 
        t.toLowerCase().includes(searchTerm.toLowerCase())
      ) || p.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchTerm, allProjects]);

  return (
    <div className="min-h-screen bg-black text-white pt-32 px-6 pb-20 relative overflow-hidden">
      {/* Glow de fundo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neon-cyan/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-neon-cyan transition-colors group">
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
            {language === 'pt' ? 'Voltar para Home' : 'Back to Home'}
          </Link>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
            {language === 'pt' ? 'GALERIA DE PROJETOS' : 'PROJECT GALLERY'}
          </h1>
        </div>

        {/* Grade de Tecnologias */}
        <div className="mb-12">
          <p className="text-[10px] uppercase font-bold text-slate-500 mb-4 tracking-[0.2em] text-center md:text-left">
            {language === 'pt' ? 'Filtrar por Tecnologia' : 'Filter by Tech'}
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {Object.entries(techIcons).map(([name, icon]) => (
              <button
                key={name}
                onClick={() => setSearchTerm(name === searchTerm ? "" : name)}
                className={`flex flex-col items-center justify-center p-4 w-24 h-24 rounded-2xl border transition-all duration-300 group ${
                  searchTerm.toLowerCase() === name.toLowerCase()
                  ? 'bg-neon-cyan/20 border-neon-cyan shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                  : 'bg-white/5 border-white/10 hover:border-white/30'
                }`}
              >
                <div className={`text-3xl mb-2 transition-transform ${searchTerm.toLowerCase() === name.toLowerCase() ? 'scale-110' : 'grayscale group-hover:grayscale-0'}`}>
                  {icon}
                </div>
                <span className="text-[10px] font-bold tracking-tight">{name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filtros de Categoria e Busca */}
        <div className="flex flex-col lg:flex-row gap-6 mb-16 items-center justify-between bg-white/5 p-4 rounded-3xl border border-white/10 backdrop-blur-xl">
          <div className="flex flex-wrap gap-2 p-1 bg-black/40 rounded-2xl">
            {[
              { id: 'all', label: 'Todos', icon: <FaLayerGroup /> },
              { id: 'front', label: 'Front', icon: <FaCode /> },
              { id: 'back', label: 'Back', icon: <FaServer /> },
              { id: 'full', label: 'Full', icon: <FaLayerGroup /> }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-bold transition-all ${
                  filter === cat.id ? 'bg-neon-cyan text-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-96">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text"
              placeholder={language === 'pt' ? "Buscar tecnologia..." : "Search tech..."}
              className="w-full bg-black/60 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-neon-cyan outline-none text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Grid de Cards */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <CardContainer className="w-full h-full">
                  <CardBody className="bg-black/40 backdrop-blur-md border border-white/10 hover:border-neon-cyan/40 w-full h-full rounded-3xl p-6 flex flex-col justify-between transition-all">
                    <div>
                      <CardItem translateZ="50" className="text-xl font-bold text-white mb-2">{project.title}</CardItem>
                      <CardItem translateZ="60" as="p" className="text-slate-400 text-sm mb-6 line-clamp-2">{project.description}</CardItem>
                      <CardItem translateZ="100" className="w-full mb-6">
                        <img src={project.image} alt={project.title} className="h-44 w-full object-cover rounded-2xl" />
                      </CardItem>
                    </div>
                    <div className="space-y-6">
                      <CardItem translateZ="30" className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span key={t} className="text-[10px] font-mono bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 px-2 py-1 rounded">
                            {t}
                          </span>
                        ))}
                      </CardItem>
                      <CardItem translateZ="50" className="w-full">
                        <a href={project.github} target="_blank" className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-neon-cyan hover:text-black transition-all">
                          <FaGithub size={18} /> GitHub
                        </a>
                      </CardItem>
                    </div>
                  </CardBody>
                </CardContainer>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default AllProjects;