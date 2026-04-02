import { useEffect, useMemo, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const intensityMap = {
  soft: 56,
  medium: 88,
  deep: 120,
};

const makeHiddenState = (direction, depth) => {
  switch (direction) {
    case "left":
      return { opacity: 0, x: 34, rotateY: 16, z: -depth, scale: 0.985 };
    case "right":
      return { opacity: 0, x: -34, rotateY: -16, z: -depth, scale: 0.985 };
    case "down":
      return { opacity: 0, y: -32, rotateX: -13, z: -depth, scale: 0.985 };
    case "up":
    default:
      return { opacity: 0, y: 32, rotateX: 13, z: -depth, scale: 0.985 };
  }
};

const SectionCinematic3D = ({
  children,
  className = "",
  direction = "up",
  intensity = "medium",
  amount = 0.35,
  fpsLimit = 30,
  motionScale = 1,
  palette,
}) => {
  const rootRef = useRef(null);
  const animationRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(rootRef, { amount, margin: "-8% 0px -12% 0px" });
  const depth = intensityMap[intensity] ?? intensityMap.medium;
  const safeFps = Math.min(Math.max(fpsLimit, 20), 45);
  const safeMotionScale = Math.min(Math.max(motionScale, 0.5), 1.8);

  const sectionPalette = useMemo(
    () => ({
      bg: palette?.bg ?? "rgba(255, 255, 255, 0.07)",
      mid: palette?.mid ?? "rgba(255, 255, 255, 0.05)",
      fg: palette?.fg ?? "rgba(255, 255, 255, 0.09)",
      grain: palette?.grain ?? "rgba(255, 255, 255, 0.04)",
    }),
    [palette]
  );

  useEffect(() => {
    if (shouldReduceMotion) return;
    const root = rootRef.current;
    if (!root) return;

    const state = {
      pointerX: 0,
      pointerY: 0,
      scrollY: 0,
      currentX: 0,
      currentY: 0,
      currentScroll: 0,
      lastTime: 0,
    };

    const frameBudget = 1000 / safeFps;

    const updatePointer = (event) => {
      const nx = (event.clientX / window.innerWidth - 0.5) * 2;
      const ny = (event.clientY / window.innerHeight - 0.5) * 2;
      state.pointerX = Math.max(-1, Math.min(1, nx));
      state.pointerY = Math.max(-1, Math.min(1, ny));
    };

    const updateScroll = () => {
      const rect = root.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const dist = (center - viewportCenter) / window.innerHeight;
      state.scrollY = Math.max(-1, Math.min(1, dist));
    };

    const tick = (time) => {
      animationRef.current = window.requestAnimationFrame(tick);
      if (!isInView) return;
      if (time - state.lastTime < frameBudget) return;

      state.lastTime = time;
      state.currentX += (state.pointerX - state.currentX) * 0.085;
      state.currentY += (state.pointerY - state.currentY) * 0.085;
      state.currentScroll += (state.scrollY - state.currentScroll) * 0.085;

      root.style.setProperty("--parallax-x", state.currentX.toFixed(4));
      root.style.setProperty("--parallax-y", state.currentY.toFixed(4));
      root.style.setProperty("--parallax-scroll", state.currentScroll.toFixed(4));
    };

    window.addEventListener("mousemove", updatePointer, { passive: true });
    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();
    animationRef.current = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", updatePointer);
      window.removeEventListener("scroll", updateScroll);
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isInView, safeFps, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <div ref={rootRef} className={`section-3d-shell ${className}`.trim()}>
        <div className="section-3d-frame">{children}</div>
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className={`section-3d-shell ${className}`.trim()}
      style={{
        "--cinema-scale": safeMotionScale,
        "--layer-bg": sectionPalette.bg,
        "--layer-mid": sectionPalette.mid,
        "--layer-fg": sectionPalette.fg,
        "--layer-grain": sectionPalette.grain,
      }}
    >
      <div className="section-parallax-layers" aria-hidden="true">
        <span className="section-parallax-layer section-parallax-layer-bg" />
        <span className="section-parallax-layer section-parallax-layer-mid" />
        <span className="section-parallax-layer section-parallax-layer-fg" />
        <span className="section-parallax-layer section-parallax-layer-grain" />
      </div>
      <motion.div
        className="section-3d-frame"
        initial={makeHiddenState(direction, depth)}
        whileInView={{
          opacity: 1,
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          z: 0,
          scale: 1,
        }}
        viewport={{ once: false, amount, margin: "-8% 0px -10% 0px" }}
        transition={{ duration: 0.92, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SectionCinematic3D;