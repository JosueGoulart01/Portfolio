import { useState, memo } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent
} from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";
import { useNavigate, useLocation } from "react-router-dom"; // Importamos os hooks de rota
import { FaFileDownload } from "react-icons/fa";

const Navbar = ({ language, toggleLanguage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const { scrollY, scrollYProgress } = useScroll();
  const lenis = useLenis();
  const navigate = useNavigate(); // Hook para navegar entre páginas
  const location = useLocation(); // Hook para saber em qual página estamos

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handleLogoClick = (e) => {
    e.preventDefault();

    // Se NÃO estivermos na home (/), navegamos para ela
    if (location.pathname !== "/") {
      navigate("/");
      // Opcional: timeout curto para dar tempo da página carregar antes do scroll
      setTimeout(() => {
        if (lenis) lenis.scrollTo("#home", { duration: 1.5 });
      }, 100);
    } else {
      // Se já estivermos na home, apenas faz o scroll
      if (lenis) {
        lenis.scrollTo("#home", {
          offset: -80,
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    }
  };

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    // Se clicar em um link de âncora (ex: #sobre) estando em outra página
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        if (lenis) lenis.scrollTo(href, { offset: -80, duration: 1.5 });
      }, 100);
    } else {
      if (lenis) {
        lenis.scrollTo(href, {
          offset: -80,
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    }
  };

  const content = {
    pt: { btnResume: "CV", logo: "JG" },
    en: { btnResume: "CV", logo: "JG" },
  };

  const links = language === "pt" 
    ? [
        { name: "Sobre", href: "#sobre" },
        { name: "Projetos", href: "#projetos" },
        { name: "Experiência", href: "#experiencias" },
        { name: "Insight", href: "#insight" },
        { name: "Contato", href: "#contato" },
      ]
    : [
        { name: "About", href: "#sobre" },
        { name: "Projects", href: "#projetos" },
        { name: "Experience", href: "#experiencias" },
        { name: "Insight", href: "#insight" },
        { name: "Contact", href: "#contato" },
      ];

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[130] origin-left pointer-events-none"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, transparent, #6366f1, #a5b4fc)',
          boxShadow: scrolled ? '0 0 8px rgba(99, 102, 241, 0.4)' : 'none'
        }}
      />

      <header className="fixed top-0 left-0 right-0 z-[120] flex justify-center px-6 py-6 pointer-events-none">
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`
            pointer-events-auto flex items-center justify-between w-full max-w-5xl px-5 py-2.5 rounded-full
            transition-all duration-700 ease-in-out border
            ${
              scrolled
                ? "bg-[#050505]/40 backdrop-blur-xl border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.5)] scale-[0.98]"
                : "bg-transparent border-transparent scale-100"
            }
          `}
        >
          {/* Logo JG - Agora com inteligência de rota */}
          <a
            href="/"
            onClick={handleLogoClick}
            className="flex items-center group relative px-2 pointer-events-auto cursor-pointer"
          >
            <span className="text-sm font-black text-white tracking-tighter transition-all group-hover:tracking-normal">
              {content[language].logo}
              <span className="text-indigo-500 group-hover:text-white transition-colors">.</span>
            </span>
          </a>

          {/* Links de Navegação */}
          <div className="hidden md:flex items-center gap-2 relative">
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onMouseEnter={() => setHoveredLink(idx)}
                onMouseLeave={() => setHoveredLink(null)}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="relative px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] transition-colors duration-300 z-10"
                style={{ color: hoveredLink === idx ? '#fff' : 'rgba(255,255,255,0.4)' }}
              >
                {link.name}
                {hoveredLink === idx && (
                  <motion.div
                    layoutId="nav-hover"
                    className="absolute inset-0 bg-white/[0.05] rounded-full -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/josue_goulart_dev.pdf"
              download
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full 
                       bg-indigo-500/10 border border-indigo-500/20 text-indigo-300
                       hover:bg-indigo-500 hover:text-white transition-all duration-500 
                       text-[10px] font-black uppercase tracking-widest active:scale-95 pointer-events-auto"
            >
              <FaFileDownload size={10} />
              {content[language].btnResume}
            </a>

            <button
              onClick={toggleLanguage}
              className="w-9 h-9 flex items-center justify-center rounded-full 
                       border border-white/5 bg-white/[0.02] text-white/40 
                       hover:border-indigo-500/50 hover:text-indigo-400 transition-all 
                       active:scale-90 relative overflow-hidden group pointer-events-auto"
            >
              <span className="text-[10px] font-black group-hover:scale-110 transition-transform">
                {language === "pt" ? "EN" : "PT"}
              </span>
            </button>
          </div>
        </motion.nav>
      </header>
    </>
  );
};

export default memo(Navbar);