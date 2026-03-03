import { motion } from "framer-motion";
import { FaArrowRight, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom"; 
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";

const Projects = ({ language }) => {
  const projectsData = {
    pt: [
      {
        id: 1,
        title: "Re.use - Plataforma Sustentável",
        description: "Plataforma digital para economia circular têxtil. Fluxo completo de cadastro, triagem e redistribuição.",
        tech: ["Java", "Spring Boot", "MySQL", "Node.js"],
        github: "https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2025-1-ti2-3687100-brecho-re-use",
        image: "/reuse-demo.webp",
        alt: "Demonstração da plataforma Re.use",
      },
      {
        id: 2,
        title: "IA Cirúrgica (Pesquisa)",
        description: "Aplicação web com visão computacional (YOLOv8n) para identificar instrumentos cirúrgicos em tempo real.",
        tech: ["Python", "Flask", "React", "YOLOv8n", "Docker"],
        github: "https://github.com/ICEI-PUC-Minas-PPLES-TI/plu-es-2025-2-extensao-software-saude-fhsfa",
        image: "/ia-cirurgica.webp",
        alt: "Detecção de instrumentos cirúrgicos",
      },
      {
        id: 3,
        title: "RoomBookings - Reservas",
        description: "Sistema ágil para gestão e controle de reservas de salas de reunião com foco em POO.",
        tech: ["Java", "MySQL", "POO", "Lógica"],
        github: "https://github.com/LuizFMoreira/Trabalho-Programa-o-Modular",
        image: "/roombookings.webp",
        alt: "Sistema de reservas de salas",
      },
    ],
    en: [], // Pode preencher com os mesmos dados traduzidos futuramente
  };

  const projects = projectsData[language] || projectsData['pt'];
  const sectionTitle = language === "pt" ? "Projetos e Pesquisa." : "Projects & Research.";

  return (
    <section id="projetos" className="py-24 px-6 relative z-10 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            {sectionTitle}
          </h2>
          <div className="w-20 h-1.5 bg-neon-cyan mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.slice(0, 3).map((project) => (
            <CardContainer key={project.id} className="w-full h-full">
              <CardBody className="bg-black/30 backdrop-blur-md border border-white/10 hover:border-neon-cyan/40 w-full h-full rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:shadow-neon-cyan/20">
                <div>
                  <CardItem translateZ="40" className="text-xl font-bold text-white mb-3">
                    {project.title}
                  </CardItem>

                  <CardItem
                    as="p"
                    translateZ="50"
                    className="text-slate-300 text-sm mb-5 leading-relaxed"
                  >
                    {project.description}
                  </CardItem>

                  <CardItem translateZ="80" className="w-full mb-6">
                    <div className="h-44 w-full overflow-hidden rounded-xl border border-white/5">
                      <img
                        src={project.image}
                        loading="lazy"
                        className="h-full w-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
                        alt={project.alt}
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/600x400/0f0728/38bdf8?text=${project.title.replace(/ /g, "+")}`;
                        }}
                      />
                    </div>
                  </CardItem>
                </div>

                <div className="flex flex-col gap-4">
                  <CardItem translateZ={20} className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono tracking-wider bg-white/5 text-neon-cyan px-2 py-1 rounded-md border border-neon-cyan/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </CardItem>

                  <div className="flex items-center justify-between mt-2">
                    <CardItem
                      translateZ={20}
                      as="a"
                      href={project.github}
                      target="_blank"
                      className="px-4 py-2 rounded-xl bg-white/10 text-white border border-white/10 hover:bg-white/20 text-xs font-bold flex items-center gap-2 transition-all"
                    >
                      <FaGithub size={16} /> GitHub
                    </CardItem>

                    <CardItem translateZ={20}>
                      <Link 
                        to="/todos-projetos" 
                        className="text-neon-cyan text-xs font-bold flex items-center gap-2 hover:underline group"
                      >
                        {language === 'pt' ? 'Detalhes' : 'Details'} 
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </CardItem>
                  </div>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>

        {/* BOTÃO VER TODOS */}
        <div className="mt-20 text-center">
          <Link to="/todos-projetos">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(34, 211, 238, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-transparent border-2 border-neon-cyan text-neon-cyan font-bold rounded-full hover:bg-neon-cyan hover:text-black transition-all duration-300"
            >
              {language === "pt" ? "Ver Todos os Projetos" : "View All Projects"}
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;