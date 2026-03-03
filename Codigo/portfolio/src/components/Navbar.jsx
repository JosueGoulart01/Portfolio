import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = ({ language, toggleLanguage }) => {
  const [scrolled, setScrolled] = useState(false);

  // Efeito para detectar o scroll da página e aplicar o "fundo de vidro"
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dicionário exato das rotas do menu de navegação
  const navLinks = {
    pt: [
      { name: 'Sobre Mim', href: '#sobre' },
      { name: 'Tecnologias', href: '#tecnologias' }, // Nova página alocada aqui
      { name: 'Projetos', href: '#projetos' },
      { name: 'Topologia', href: '#experiencias' },  // Atualizado de Experiências para Topologia
      { name: 'Contato', href: '#contato' }
    ],
    en: [
      { name: 'About Me', href: '#sobre' },
      { name: 'Technologies', href: '#tecnologias' }, // Nova página alocada aqui
      { name: 'Projects', href: '#projetos' },
      { name: 'Topology', href: '#experiencias' },    // Tradução exata aplicada
      { name: 'Contact', href: '#contato' }
    ]
  };

  const links = navLinks[language];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-cosmic-dark/80 backdrop-blur-md border-b border-white/10 py-4 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo Esquerda */}
        <motion.a 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          href="#home" 
          className="text-2xl font-bold text-white tracking-widest cursor-pointer"
        >
          LF<span className="text-neon-cyan animate-pulse">.</span>
        </motion.a>

        {/* Links Centrais (Desktop) */}
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:flex items-center gap-8"
        >
          {links.map((link, index) => (
            <a 
              key={index} 
              href={link.href} 
              className="text-sm font-semibold text-slate-300 hover:text-neon-cyan transition-colors tracking-wide"
            >
              {link.name}
            </a>
          ))}
        </motion.nav>

        {/* Botão de Tradução Direita */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <button 
            onClick={toggleLanguage}
            className="px-4 py-2 rounded-lg border border-white/20 text-white text-xs font-bold hover:bg-white/10 hover:border-neon-cyan transition-all cursor-pointer tracking-widest"
          >
            {language === 'pt' ? 'EN' : 'PT'}
          </button>
        </motion.div>

      </div>
    </header>
  );
};

export default Navbar;