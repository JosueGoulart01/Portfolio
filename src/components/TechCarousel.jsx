import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef, useMemo, useCallback, memo } from "react";
import { useInView } from "framer-motion";
 
/**
 * TechCarousel — Otimizado
 *
 * Melhorias vs versão anterior:
 * 1. Pausa com inércia real via useSpring (desacelera suavemente ao hover)
 * 2. useInView: para o loop quando fora da viewport (economiza CPU/GPU)
 * 3. useMemo nas entries duplicadas (evita recriar array em cada render)
 * 4. useCallback no handler de click (evita re-render dos botões filhos)
 * 5. Botões individuais com memo implícito via chave estável
 * 6. will-change: transform aplicado via style (hint pro browser)
 * 7. Gradientes com to-transparent explícito (fix visual cross-browser)
 */
const TechCarousel = ({ icons, searchTerm, setSearchTerm }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "200px" });
 
  // ─── Memoiza as entries duplicadas: só recria se `icons` mudar ───
  const duplicatedEntries = useMemo(
    () => {
      const entries = Object.entries(icons);
      return [...entries, ...entries, ...entries];
    },
    [icons]
  );
 
  // ─── Posição base (% do container) ───
  const baseX = useMotionValue(0);
 
  // ─── Spring de velocidade: dá inércia real na pausa/retomada ───
  // Quando hover → target 0 (para); ao sair → target -1 (retoma)
  // stiffness baixo + damping médio = desaceleração suave
  const velocityFactor = useSpring(1, { stiffness: 40, damping: 20, mass: 1 });
 
  const handleMouseEnter = useCallback(() => velocityFactor.set(0), [velocityFactor]);
  const handleMouseLeave = useCallback(() => velocityFactor.set(1), [velocityFactor]);
 
  // ─── Loop frame-perfect, para quando fora da viewport ───
  useAnimationFrame((_, delta) => {
    if (!isInView) return;
 
    // 0.018 px/ms ≈ velocidade base. Multiplica pelo spring para inércia.
    const move = -0.018 * delta * velocityFactor.get();
    const next = baseX.get() + move;
 
    // Reset seamless: quando chega em -33.33% (1 cópia percorrida), volta a 0
    baseX.set(next <= -33.33 ? 0 : next);
  });
 
  // ─── Transforma número → string CSS ───
  const x = useTransform(baseX, (v) => `${v}%`);
 
  const handleClick = useCallback(
    (name) => setSearchTerm((prev) => (prev.toLowerCase() === name.toLowerCase() ? "" : name)),
    [setSearchTerm]
  );
 
  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden py-10 mb-12"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Máscaras laterais — to-transparent explícito evita artefato cinza no Firefox/Safari */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />
 
      <motion.div
        className="flex gap-4 w-max px-4"
        style={{ x, willChange: "transform" }}
      >
        {duplicatedEntries.map(([name, icon], idx) => {
          const isActive = searchTerm.toLowerCase() === name.toLowerCase();
          return (
            <TechButton
              key={`${name}-${idx}`}
              name={name}
              icon={icon}
              isActive={isActive}
              onClick={handleClick}
            />
          );
        })}
      </motion.div>
    </div>
  );
};
 
// ─── Botão extraído + memo: só re-renderiza se suas props mudarem ───
// Isso é crítico: sem isso, TODOS os 30 botões re-renderizam ao hover em qualquer um.
const TechButton = memo(({ name, icon, isActive, onClick }) => (
  <button
    onClick={() => onClick(name)}
    className={`
      flex items-center gap-3 px-6 py-4 rounded-2xl border shrink-0
      transition-all duration-300
      ${isActive
        ? "bg-indigo-500 border-indigo-400 text-white shadow-[0_0_30px_rgba(99,102,241,0.35)] scale-110 z-10"
        : "bg-white/[0.02] border-white/5 text-white/30 hover:border-white/20 hover:text-white/60 hover:bg-white/[0.05]"
      }
    `}
  >
    <span className="text-2xl">{icon}</span>
    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{name}</span>
  </button>
));
 
TechButton.displayName = "TechButton";
 
export default memo(TechCarousel);