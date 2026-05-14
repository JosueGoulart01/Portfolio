import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "@studio-freight/react-lenis";
 
/**
 * ScrollToTop
 * -----------
 * Reseta o scroll do Lenis toda vez que a rota muda.
 * Isso corrige o bug em que o Lenis fica num estado de scroll
 * intermediário ao navegar via React Router, impedindo que a
 * nova página renderize corretamente quando clicado após rolar.
 *
 * USAGE: coloque <ScrollToTop /> logo dentro de <Router>, antes das <Routes>.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const lenis = useLenis();
 
  useEffect(() => {
    if (!lenis) return;
 
    // Para qualquer animação de scroll em andamento
    lenis.stop();
 
    // Força o scroll para o topo instantaneamente (sem animação)
    lenis.scrollTo(0, { immediate: true });
 
    // Reativa o Lenis após o reset
    lenis.start();
  }, [pathname, lenis]);
 
  return null;
};
 
export default ScrollToTop;