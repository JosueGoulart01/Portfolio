import { useRef, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FaEnvelope, FaWhatsapp, FaLinkedin, FaGithub, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

const Contact = ({ language }) => {
  const form = useRef();
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});

  const content = {
    pt: {
      label: "// contato",
      title: "Vamos trabalhar juntos",
      description: "Estou disponível para novos projetos, colaborações em open source ou oportunidades de carreira.",
      nameLabel: "Seu nome",
      emailLabel: "Seu e-mail",
      messageLabel: "Como posso ajudar?",
      buttonText: "Enviar mensagem",
      loadingText: "Sincronizando...",
      successMsg: "Mensagem enviada com sucesso!",
      errorMsg: "Ops! Tente novamente.",
      placeholderMsg: "Olá, Josué! Tenho uma proposta sobre...",
    },
    en: {
      label: "// contact",
      title: "Let's work together",
      description: "I'm available for new projects, open-source collaborations, or career opportunities.",
      nameLabel: "Your name",
      emailLabel: "Your email",
      messageLabel: "How can I help?",
      buttonText: "Send message",
      loadingText: "Syncing...",
      successMsg: "Message sent successfully!",
      errorMsg: "Oops! Please try again.",
      placeholderMsg: "Hi, Josué! I have a proposal about...",
    },
  };

  const t = content[language] || content.pt;

  const validate = () => {
    const name = form.current.user_name.value;
    const email = form.current.user_email.value;
    const message = form.current.message.value;
    const errs = {};
    if (!name.trim()) errs.user_name = true;
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.user_email = true;
    if (!message.trim()) errs.message = true;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    
    const CONFIG = {
      SERVICE_ID: "service_64ecjrg",
      PUBLIC_KEY: "xFCMQC3gdoWmZTdbp",
      TEMPLATES: ["template_7zdl0h4", "template_t7agmlf"]
    };

    Promise.all(CONFIG.TEMPLATES.map(id => 
      emailjs.sendForm(CONFIG.SERVICE_ID, id, form.current, CONFIG.PUBLIC_KEY)
    ))
      .then(() => {
        setStatus("success");
        form.current.reset();
        setErrors({});
        setTimeout(() => setStatus(""), 6000);
      })
      .catch(() => {
        setStatus("error");
        setTimeout(() => setStatus(""), 6000);
      });
  };

  const socialLinks = [
    { Icon: FaLinkedin, href: "https://www.linkedin.com/in/josu%C3%A9-goulart/", label: "LinkedIn" },
    { Icon: FaGithub,   href: "https://github.com/JosueGoulart01", label: "GitHub" },
    { Icon: FaWhatsapp, href: "https://wa.me/5531986944904", label: "WhatsApp" },
    { Icon: FaEnvelope, href: "mailto:josuegoulart.engdesoftware@gmail.com", label: "Email" },
  ];

  return (
    // Padding lateral (px-8 até px-24) alinhado com o Insight e Hero
    <section id="contato" className="relative py-32 px-8 md:px-16 lg:px-24 bg-[#050505] overflow-hidden">
      
      {/* Glow de fundo sutil para manter a unidade visual */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Container max-w-6xl alinhado com os outros componentes */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Lado Esquerdo: Texto e Social */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <p className="text-indigo-500/60 font-mono text-[10px] tracking-[0.5em] uppercase mb-4">
                {t.label}
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none mb-6">
                {t.title}<span className="text-indigo-500 not-italic">.</span>
              </h2>
              <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed max-w-md">
                {t.description}
              </p>
            </div>

            <div className="flex gap-4">
              {socialLinks.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/[0.03] border border-white/5 text-white/30 hover:text-indigo-400 hover:border-indigo-500/30 transition-all duration-300 shadow-xl"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Lado Direito: Formulário com o padrão de borda 32px */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <form
              ref={form}
              onSubmit={sendEmail}
              className="relative p-8 md:p-10 rounded-[32px] border border-white/10 bg-[#0a0a0a] shadow-2xl overflow-hidden"
            >
              <AnimatePresence>
                {status === "success" && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 bg-[#0a0a0a] flex flex-col items-center justify-center text-center p-6"
                  >
                    <FaCheckCircle className="text-indigo-500 mb-4" size={48} />
                    <h4 className="text-xl font-bold text-white mb-2 italic uppercase">{t.successMsg}</h4>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">{t.nameLabel}</label>
                  <input
                    name="user_name"
                    type="text"
                    placeholder="Josué Goulart"
                    className={`w-full bg-white/[0.02] border ${errors.user_name ? 'border-red-500/50' : 'border-white/5'} rounded-2xl px-5 py-4 text-sm text-white outline-none focus:border-indigo-500/50 transition-all`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">{t.emailLabel}</label>
                  <input
                    name="user_email"
                    type="email"
                    placeholder="email@exemplo.com"
                    className={`w-full bg-white/[0.02] border ${errors.user_email ? 'border-red-500/50' : 'border-white/5'} rounded-2xl px-5 py-4 text-sm text-white outline-none focus:border-indigo-500/50 transition-all`}
                  />
                </div>
              </div>

              <div className="space-y-2 mb-8">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">{t.messageLabel}</label>
                <textarea
                  name="message"
                  rows="5"
                  placeholder={t.placeholderMsg}
                  className={`w-full bg-white/[0.02] border ${errors.message ? 'border-red-500/50' : 'border-white/5'} rounded-2xl px-5 py-4 text-sm text-white outline-none focus:border-indigo-500/50 transition-all resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="group relative w-full py-5 rounded-2xl bg-indigo-500 text-white text-[11px] font-black uppercase tracking-[0.2em] overflow-hidden transition-all hover:bg-indigo-600 active:scale-[0.98] disabled:opacity-50"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {status === "loading" ? (
                    <> <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> {t.loadingText} </>
                  ) : (
                    <> <FiSend size={14} /> {t.buttonText} </>
                  )}
                </span>
              </button>

              {status === "error" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 flex items-center justify-center gap-2 text-red-400 text-[10px] font-bold uppercase">
                  <FaExclamationCircle /> {t.errorMsg}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(Contact);