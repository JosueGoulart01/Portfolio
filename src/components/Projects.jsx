import { memo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FaGithub, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

/* ─── Carrossel de Imagens Compacto ─── */
const ImageCarousel = memo(({ images, altText }) => {
  const [idx, setIdx] = useState(0);
  const carouselRef = useRef(null);
  const isInView = useInView(carouselRef, { amount: 0.6 });

  useEffect(() => {
    if (!images || images.length <= 1 || !isInView) return;
    const id = window.setInterval(() => setIdx((i) => (i + 1) % images.length), 3500);
    return () => window.clearInterval(id);
  }, [images, isInView]);

  return (
    <div ref={carouselRef} className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={idx}
          src={images[idx]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 w-full h-full object-cover"
          alt={altText}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
});

const Projects = ({ language }) => {
  const projectsData = {
    pt: [
      { id: 1, title: "Re.use", description: "Plataforma de economia circular têxtil.", tech: ["Java", "Spring"], github: "#", images: ["/img/Re.use/image.png"], alt: "Re.use" },
      { id: 2, title: "IA Cirúrgica", description: "Visão computacional para instrumentos.", tech: ["Python", "YOLO"], github: "#", images: ["/img/ProjetoExtensao/imagem3.jpeg"], alt: "Surgical AI" },
      { id: 3, title: "E-commerce", description: "Loja full-stack em Next.js e Spring.", tech: ["Next.js", "TS"], github: "#", images: ["/img/detalhesPrata/image.png"], alt: "E-commerce" },
    ],
    en: [
        { id: 1, title: "Re.use", description: "Circular textile economy platform.", tech: ["Java", "Spring"], github: "#", images: ["/img/Re.use/image.png"], alt: "Re.use" },
        { id: 2, title: "Surgical AI", description: "Computer vision for instruments.", tech: ["Python", "YOLO"], github: "#", images: ["/img/ProjetoExtensao/imagem3.jpeg"], alt: "Surgical AI" },
        { id: 3, title: "E-commerce", description: "Full-stack Next.js & Spring store.", tech: ["Next.js", "TS"], github: "#", images: ["/img/detalhesPrata/image.png"], alt: "E-commerce" },
    ]
  };

  const projects = projectsData[language] || projectsData.pt;

  return (
    <section id="projetos" className="py-20 px-6 md:px-12 bg-[#050505]">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Minimalista */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center md:text-left"
        >
          <span className="text-indigo-500 text-[8px] font-bold tracking-[0.6em] uppercase">
            {language === "pt" ? "Portfólio" : "Portfolio"}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-white mt-1 tracking-tight">
            {language === "pt" ? "Projetos" : "Projects"}
          </h2>
        </motion.div>

        {/* Grid de 3 Colunas: Cards Menores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col bg-[#0c0c0e] border border-white/[0.04] rounded-lg overflow-hidden hover:border-indigo-500/30 transition-all duration-300"
            >
              {/* Imagem Compacta (Aspect Ratio 16:10) */}
              <div className="aspect-[16/10] w-full relative overflow-hidden bg-[#0c0c10]">
                <ImageCarousel images={project.images} altText={project.alt} />
              </div>

              {/* Conteúdo com Padding Reduzido */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-white text-sm font-bold mb-1 group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-[#8e8e93] text-[10px] leading-relaxed mb-4 flex-1 font-light line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Tags Mini */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tech.map((t, j) => (
                    <span key={j} className="text-[7px] uppercase tracking-wider font-bold px-1.5 py-0.5 bg-indigo-500/5 text-indigo-400/70 rounded border border-indigo-500/10">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Footer Minimalista */}
                <div className="flex items-center justify-between pt-3 border-t border-white/[0.03]">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#444] hover:text-white transition-colors"
                  >
                    <FaGithub size={12} />
                  </a>
                  <Link
                    to="/todos-projetos"
                    className="flex items-center gap-1 text-[8px] font-bold text-indigo-500/80 hover:text-indigo-400 transition-colors uppercase tracking-[0.15em]"
                  >
                    {language === "pt" ? "Detalhes" : "Details"}
                    <FaArrowRight size={7} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Botão de Saída Discreto */}
        <div className="mt-12 text-center">
          <Link
            to="/todos-projetos"
            className="group inline-flex items-center gap-2 px-5 py-2 border border-white/[0.05] text-[#8e8e93] text-[9px] font-bold rounded-full hover:bg-white hover:text-black hover:border-white transition-all"
          >
            {language === "pt" ? "Ver todos" : "View all"}
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={8} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;