import { memo } from "react";

const Footer = ({ language }) => {
  const currentYear = new Date().getFullYear();

  const t = {
    pt: "Desenvolvido por Josué Goulart com React & Vite",
    en: "Developed by Josué Goulart with React & Vite"
  }[language] || "Desenvolvido por Josué Goulart com React & Vite";

  return (
    <footer className="w-full bg-[#050505] border-t border-white/[0.05] py-6 px-8 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Lado Esquerdo: Nome e Ano */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-black text-white italic tracking-tighter uppercase">
            JG<span className="text-indigo-500 not-italic">.</span>
          </span>
          <span className="text-[10px] text-white/20 font-mono tracking-widest">
            © {currentYear}
          </span>
        </div>

        {/* Lado Direito: Stack simplificada */}
        <div className="flex items-center gap-4">
          <p className="text-[10px] text-white/40 font-medium uppercase tracking-[0.2em]">
            {t}
          </p>
          <div className="w-1 h-1 rounded-full bg-indigo-500 animate-pulse" />
        </div>

      </div>
    </footer>
  );
};

export default memo(Footer);