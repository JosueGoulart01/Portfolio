import { motion } from 'framer-motion';

const About = ({ language }) => {
  const content = {
  pt: {
    title: "Sobre Mim.",
    description: "Sou estudante de Engenharia de Software na PUC Minas e Desenvolvedor Full Stack, com foco em back-end e construção de sistemas escaláveis.",
    focus: "Atuo no desenvolvimento de aplicações end-to-end, com ênfase em back-end utilizando Java e Spring Boot para construção de APIs REST robustas, aplicando princípios SOLID, arquitetura em camadas e testes automatizados com JUnit e Mockito. Tenho experiência com bancos de dados relacionais (MySQL e PostgreSQL), incluindo modelagem, otimização de consultas e integração com serviços. No front-end, desenvolvo interfaces modernas e responsivas com React, TypeScript e Tailwind CSS, priorizando componentização, tipagem forte e boa experiência do usuário.",
    goals: "Também utilizo Python para automação e web scraping, além de Docker para containerização e padronização de ambientes. Trabalho com versionamento usando Git e sigo práticas de desenvolvimento orientadas à qualidade e manutenibilidade. Busco evoluir continuamente na construção de sistemas distribuídos, arquitetura de software e soluções de alto desempenho."
  },
  en: {
    title: "About Me.",
    description: "I am a Software Engineering student at PUC Minas and a Full Stack Developer focused on back-end and scalable systems.",
    focus: "I build end-to-end applications with a strong focus on back-end development using Java and Spring Boot to design robust REST APIs, applying SOLID principles, layered architecture, and automated testing with JUnit and Mockito. I have experience with relational databases (MySQL and PostgreSQL), including data modeling, query optimization, and service integration. On the front-end, I develop modern and responsive interfaces using React, TypeScript, and Tailwind CSS, emphasizing component-based architecture, strong typing, and user experience.",
    goals: "I also use Python for automation and web scraping, as well as Docker for containerization and environment standardization. I work with Git for version control and follow best practices focused on code quality and maintainability. I am continuously improving my skills in distributed systems, software architecture, and high-performance solutions."
  }
};

  const text = content[language];

  return (
    <section id="sobre" className="py-32 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        
        {/* Container Glassmorphism */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-black/30 backdrop-blur-md bg-black/60 border border-white/10 p-8 md:p-14 rounded-3xl shadow-2xl relative overflow-hidden"
        >
          {/* Brilho decorativo de fundo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>

          <div className="flex flex-col md:flex-row gap-12 md:gap-20 relative z-10">
            
            {/* Esquerda: Título */}
            <div className="md:w-1/3">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                {text.title}
              </h2>
              <div className="w-16 h-1.5 bg-gradient-to-r from-neon-cyan to-transparent rounded-full mb-8"></div>
            </div>

            {/* Direita: Texto */}
            <div className="md:w-2/3 space-y-6 text-slate-300 font-light leading-relaxed">
              <p className="text-xl md:text-2xl text-white font-medium leading-snug">
                {text.description}
              </p>
              <p className="text-base md:text-lg opacity-90">
                {text.focus}
              </p>
              
              {/* Citação orgânica */}
              <div className="bg-white/5 border border-white/5 p-6 rounded-2xl relative mt-8">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-neon-purple rounded-l-2xl shadow-[0_0_10px_rgba(139,92,246,0.6)]"></div>
                <p className="italic text-slate-200">
                  "{text.goals}"
                </p>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;