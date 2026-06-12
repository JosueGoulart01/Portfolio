import { useEffect, useRef, useState } from 'react';

const Background = () => {
  const containerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Pequeno delay para garantir que o DOM e o CSS 
    // foram calculados antes de injetar o Spline
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none transform-gpu overflow-hidden"
      style={{ width: '100vw', height: '100vh' }} // Força dimensão absoluta
    >
      {isReady && (
        <spline-viewer 
          url="https://prod.spline.design/ZndJi4aqN9OwgcvB/scene.splinecode"
          loading-library="lazy"
          events-target="global" 
          style={{ width: '100%', height: '100%', display: 'block' }}
        ></spline-viewer>
      )}

      {/* Overlay para suavizar a integração com o site */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/40 to-transparent pointer-events-none" />
      
      {/* Fallback de cor caso o WebGL falhe ou demore a carregar */}
      <div className="absolute inset-0 bg-[#050505] -z-10" />
    </div>
  );
};

export default Background;