import React from 'react';

const Background = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {/* O spline-viewer é um Web Component que carrega o motor 3D 
          de forma isolada, evitando conflitos com os Hooks do React 19.
      */}
      <spline-viewer 
        url="https://prod.spline.design/ZndJi4aqN9OwgcvB/scene.splinecode"
        loading-library="lazy"
      ></spline-viewer>

      {/* Overlay de Gradiente:
          Essencial para que o robô não "brigue" visualmente com seus textos.
          Ele escurece levemente o lado esquerdo (onde fica o texto) e deixa 
          o lado direito (onde fica o robô) mais nítido.
      */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent"></div>
    </div>
  );
};

export default Background;