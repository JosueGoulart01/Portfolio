import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * SectionTunnel3D
 * Apple-style "fly-into-tunnel" entrance for sections.
 * Content starts small, far and blurred, then zooms forward as it enters the viewport.
 */
const SectionTunnel3D = ({ children, className = "", delay = 0 }) => {
  const rootRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div ref={rootRef} className={`tunnel-shell ${className}`.trim()}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className={`tunnel-shell ${className}`.trim()}
    >
      {/* Ambient glow layer — purely decorative */}
      <div className="tunnel-ambient" aria-hidden="true" />

      <motion.div
        className="tunnel-frame"
        initial={{
          opacity: 0,
          scale: 0.8,
          filter: "blur(24px) brightness(0.6)",
          z: -320,
          y: 48,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
          filter: "blur(0px) brightness(1)",
          z: 0,
          y: 0,
        }}
        viewport={{ once: false, amount: 0.18, margin: "-5% 0px -10% 0px" }}
        transition={{
          duration: 1.1,
          delay,
          ease: [0.16, 1, 0.3, 1],
          filter: { duration: 0.9, ease: "easeOut" },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SectionTunnel3D;
