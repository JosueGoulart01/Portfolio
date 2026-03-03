import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { CardContainer, CardBody, CardItem } from './ui/3d-card';

const Projects = ({ language }) => {
  // Matriz de Dados (Com as URLs reais dos repositórios injetadas)
  const projectsData = {
    pt: [
      {
        id: 1,
        title: "Re.use - Plataforma Sustentável",
        description: "Plataforma digital para economia circular têxtil. Fluxo completo de cadastro, triagem e redistribuição de peças de vestuário.",
        tech: ["Java", "Spring Boot", "MySQL", "Node.js"],
        github: "https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2025-1-ti2-3687100-brecho-re-use",
        image: "/reuse-demo.gif",
        alt: "Demonstração da plataforma Re.use"
      },
      {
        id: 2,
        title: "IA Cirúrgica (Iniciação Científica)",
        description: "Aplicação web com visão computacional (YOLOv8n) para automatizar a identificação e validação de instrumentos cirúrgicos em tempo real.",
        tech: ["Python", "Flask", "React", "YOLOv8n", "Docker", "AWS"],
        github: "https://github.com/ICEI-PUC-Minas-PPLES-TI/plu-es-2025-2-extensao-software-saude-fhsfa",
        image: "/ia-cirurgica.gif",
        alt: "Detecção de instrumentos cirúrgicos em tempo real"
      },
      {
        id: 3,
        title: "RoomBookings - Gestão de Reservas",
        description: "Sistema ágil para gestão e controle de reservas de salas de reunião, otimizando espaços no modelo híbrido e prevenindo conflitos de agenda.",
        tech: ["Java", "MySQL", "Lógica de Negócios", "POO"],
        github: "https://github.com/LuizFMoreira/Trabalho-Programa-o-Modular",
        image: "/roombookings.gif",
        alt: "Sistema de reservas de salas de reunião"
      }
    ],
    en: [
      {
        id: 1,
        title: "Re.use - Sustainable Platform",
        description: "Digital platform for textile circular economy. Complete flow for registration, sorting, and redistribution of clothing.",
        tech: ["Java", "Spring Boot", "MySQL", "Node.js"],
        github: "https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2025-1-ti2-3687100-brecho-re-use",
        image: "/reuse-demo.gif",
        alt: "Re.use platform demonstration"
      },
      {
        id: 2,
        title: "Surgical AI (Scientific Research)",
        description: "Web application with computer vision (YOLOv8n) to automate the identification and validation of surgical instruments in real-time.",
        tech: ["Python", "Flask", "React", "YOLOv8n", "Docker", "AWS"],
        github: "https://github.com/ICEI-PUC-Minas-PPLES-TI/plu-es-2025-2-extensao-software-saude-fhsfa",
        image: "/ia-cirurgica.gif",
        alt: "Real-time surgical instrument detection"
      },
      {
        id: 3,
        title: "RoomBookings - Meeting Management",
        description: "Agile system for managing and controlling meeting room reservations, optimizing hybrid workspace usage and preventing schedule conflicts.",
        tech: ["Java", "MySQL", "Business Logic", "OOP"],
        github: "https://github.com/LuizFMoreira/Trabalho-Programa-o-Modular",
        image: "/roombookings.gif",
        alt: "Meeting room reservation system"
      }
    ]
  };

  const projects = projectsData[language];
  const sectionTitle = language === 'pt' ? 'Projetos e Pesquisa' : 'Projects & Research';

  return (
    <section id="projetos" className="py-24 px-6 relative z-10 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center text-white mb-16 tracking-tight"
        >
          {sectionTitle}
        </motion.h2>
        
        {/* A Topologia da Grade de Projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project) => (
            <CardContainer key={project.id} className="inter-var w-full h-full">
              <CardBody className="bg-cosmic-light/30 relative group/card hover:shadow-2xl hover:shadow-neon-cyan/[0.1] border-white/10 w-full h-full rounded-2xl p-6 border backdrop-blur-sm flex flex-col justify-between">
                
                <div>
                  <CardItem translateZ="50" className="text-xl font-bold text-white mb-2">
                    {project.title}
                  </CardItem>
                  
                  <CardItem as="p" translateZ="60" className="text-slate-400 text-sm mt-2 mb-6 leading-relaxed min-h-[80px]">
                    {project.description}
                  </CardItem>
                  
                  <CardItem translateZ="100" className="w-full mb-6">
                    <div className="h-48 w-full overflow-hidden rounded-xl border border-white/10 relative group-hover/card:border-neon-cyan/50 transition-colors">
                      <img
                        src={project.image}
                        onError={(e) => { e.target.src = `https://via.placeholder.com/600x400/0f0728/38bdf8?text=${project.title.replace(/ /g, '+')}` }}
                        className="h-full w-full object-cover"
                        alt={project.alt}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cosmic-dark/80 to-transparent"></div>
                    </div>
                  </CardItem>
                </div>
                
                <div className="flex flex-col gap-4">
                  <CardItem translateZ={20} className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="text-[10px] font-mono tracking-wider bg-slate-800/80 text-neon-cyan px-2 py-1 rounded-md border border-neon-cyan/20">
                        {tech}
                      </span>
                    ))}
                  </CardItem>
                  
                  <CardItem translateZ={20} as="a" href={project.github} target="_blank"
                    className="w-full py-3 rounded-lg bg-white text-cosmic-dark text-sm font-bold flex items-center justify-center gap-2 hover:bg-neon-cyan hover:text-white transition-colors shadow-md cursor-pointer">
                    <FaGithub size={18} /> Ver Repositório
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;