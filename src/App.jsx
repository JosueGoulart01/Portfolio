import { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ReactLenis } from "@studio-freight/react-lenis";
import { AnimatePresence } from "framer-motion";

// Componentes
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Insight from "./components/Insight"; 
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Welcome from "./components/Welcome";
import SectionCinematic3D from "./components/ui/SectionCinematic3D";
import SectionTunnel3D from "./components/ui/SectionTunnel3D";
import "./App.css";

// Lazy loading para otimização de rota pesada
const AllProjects = lazy(() => import("./components/AllProjects"));

function App() {
  const [language, setLanguage] = useState("pt");
  const [hasEntered, setHasEntered] = useState(false);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "pt" ? "en" : "pt"));
  };

  // Configurações do Scroll Suave (Lenis)
  const lenisOptions = {
    duration: 1.2,
    lerp: 0.1,
    smoothWheel: true,
    wheelMultiplier: 1,
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothTouch: false,
  };

  return (
    <ReactLenis root options={lenisOptions}>
      {/* Ativando as Future Flags do React Router v7 para limpar o console 
        e preparar a aplicação para a próxima versão estável.
      */}
      <Router 
        future={{ 
          v7_startTransition: true, 
          v7_relativeSplatPath: true 
        }}
      >
        <div className="relative font-sans min-h-screen text-[#e8e8ed] bg-[#050505] selection:bg-indigo-500/30 overflow-x-hidden">
          
          {/* TELA DE INTRODUÇÃO (WELCOME) */}
          <AnimatePresence mode="wait">
            {!hasEntered && (
              <Welcome 
                key="welcome-screen"
                language={language} 
                onEnter={() => setHasEntered(true)} 
              />
            )}
          </AnimatePresence>

          {/* CONTEÚDO PRINCIPAL - Renderiza apenas após a interação no Welcome */}
          {hasEntered && (
            <div className="relative z-10 flex flex-col min-h-screen animate-in fade-in duration-1000">
              <Navbar language={language} toggleLanguage={toggleLanguage} />

              <main className="flex-grow">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <>
                        <SectionCinematic3D direction="down" intensity="deep" amount={0.5}>
                          <Hero language={language} />
                        </SectionCinematic3D>
                        
                        <SectionTunnel3D>
                          <About language={language} />
                        </SectionTunnel3D>
                        
                        <SectionCinematic3D direction="right" intensity="deep">
                          <Projects language={language} />
                        </SectionCinematic3D>
                        
                        <SectionCinematic3D direction="up" intensity="medium">
                          <Experience language={language} />
                        </SectionCinematic3D>
                        
                        {/* Seção Insight do Dia */}
                        <SectionCinematic3D direction="left" intensity="soft">
                          <Insight language={language} />
                        </SectionCinematic3D>
                        
                        <SectionTunnel3D delay={0.05}>
                          <Contact language={language} />
                        </SectionTunnel3D>
                      </>
                    }
                  />
                  
                  <Route
                    path="/todos-projetos"
                    element={
                      <Suspense 
                        fallback={
                          <div className="h-screen w-full flex items-center justify-center bg-[#050505]">
                            <div className="w-12 h-[1px] bg-indigo-500 animate-pulse" />
                          </div>
                        }
                      >
                        <AllProjects language={language} />
                      </Suspense>
                    }
                  />
                </Routes>
              </main>

              <Footer language={language} />
            </div>
          )}
        </div>
      </Router>
    </ReactLenis>
  );
}

export default App;