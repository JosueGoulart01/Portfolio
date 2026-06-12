import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight, FiRefreshCw, FiBookOpen } from 'react-icons/fi';

const Insight = ({ language }) => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  // Busca um artigo aleatório sobre Engenharia de Software ou Java
  const fetchArticle = async () => {
    setLoading(true);
    try {
      // Tags sugeridas para o seu perfil: softwareengineering, java, architecture
      const tags = ['softwareengineering', 'java', 'webdev', 'architecture'];
      const randomTag = tags[Math.floor(Math.random() * tags.length)];
      
      const response = await fetch(`https://dev.to/api/articles?tag=${randomTag}&top=7&per_page=30`);
      const data = await response.json();
      
      if (data.length > 0) {
        // Pega um artigo aleatório da lista de top artigos
        const randomArticle = data[Math.floor(Math.random() * data.length)];
        setArticle(randomArticle);
      }
    } catch (error) {
      console.error("Erro ao buscar insight:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, []);

  const content = {
    pt: {
      tag: "// daily_insight",
      title: "Insight do Dia",
      description: "Uma dose diária de conhecimento técnico curada automaticamente para expandir horizontes em engenharia de software.",
      readMore: "Ler artigo completo",
      syncing: "Sincronizando com a rede..."
    },
    en: {
      tag: "// daily_insight",
      title: "Daily Insight",
      description: "A daily dose of technical knowledge automatically curated to expand horizons in software engineering.",
      readMore: "Read full article",
      syncing: "Syncing with network..."
    }
  };

  const t = content[language] || content.pt;

  return (
    <section id="insight" className="relative py-32 px-8 md:px-16 lg:px-24 bg-[#050505] overflow-hidden border-t border-white/[0.02]">
      
      {/* Glow de fundo sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Lado Esquerdo: Info Fixa */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-indigo-500/60 font-mono text-[11px] tracking-[0.5em] uppercase"
            >
              {t.tag}
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter"
            >
              {t.title}<span className="text-indigo-500 not-italic">.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.5 }}
              className="text-slate-400 text-sm md:text-base font-light leading-relaxed max-w-md mx-auto lg:mx-0"
            >
              {t.description}
            </motion.p>

            <button 
              onClick={fetchArticle}
              disabled={loading}
              className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/5 bg-white/[0.02] text-[11px] font-black text-white/40 uppercase tracking-widest hover:text-white hover:border-indigo-500/30 transition-all group mx-auto lg:mx-0"
            >
              <FiRefreshCw className={`transition-transform duration-700 ${loading ? 'animate-spin' : 'group-active:rotate-180'}`} />
              {loading ? "Update" : "Refresh Insight"}
            </button>
          </div>

          {/* Lado Direito: O Artigo (Card) */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div 
                  key="loader"
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="w-full max-w-[500px] aspect-[4/3] flex items-center justify-center border border-white/5 rounded-[32px] bg-white/[0.01]"
                >
                  <span className="text-[11px] font-mono text-indigo-500/40 animate-pulse tracking-widest uppercase">{t.syncing}</span>
                </motion.div>
              ) : (
                article && (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, scale: 0.98, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.98, x: -20 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-[500px] group relative"
                  >
                    {/* Sombra de destaque */}
                    <div className="absolute inset-0 bg-indigo-500/5 blur-3xl rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <div className="relative p-8 md:p-10 rounded-[32px] border border-white/10 bg-[#0a0a0a] hover:border-indigo-500/40 transition-all duration-500 flex flex-col h-full">
                      
                      <div className="flex items-center gap-4 mb-8">
                        <img 
                          src={article.user.profile_image_90} 
                          alt={article.user.name} 
                          className="w-10 h-10 rounded-full border border-white/10 grayscale group-hover:grayscale-0 transition-all"
                        />
                        <div>
                          <p className="text-[11px] font-black text-white tracking-widest uppercase">{article.user.name}</p>
                          <p className="text-[10px] text-indigo-400 font-mono tracking-tighter">@{article.user.username}</p>
                        </div>
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold text-white mb-6 leading-tight tracking-tight group-hover:text-indigo-100 transition-colors">
                        {article.title}
                      </h3>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {article.tag_list.slice(0, 3).map(tag => (
                          <span key={tag} className="text-[10px] font-bold text-white/20 bg-white/5 px-2 py-1 rounded-md uppercase tracking-widest group-hover:text-indigo-300/60 transition-colors">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                        <a 
                          href={article.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-[11px] font-black text-indigo-400 uppercase tracking-[0.2em] group/link"
                        >
                          {t.readMore}
                          <FiArrowUpRight size={14} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                        </a>
                        <div className="flex items-center gap-2 text-white/20">
                          <FiBookOpen size={12} />
                          <span className="text-[11px] font-mono tracking-tighter">{article.reading_time_minutes} min read</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default memo(Insight);