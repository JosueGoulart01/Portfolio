import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FaEnvelope, FaWhatsapp, FaLinkedin, FaGithub, FaSpinner } from "react-icons/fa";

const Contact = ({ language }) => {
  const form = useRef();
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});

  const content = {
    pt: {
      tagline: "Vamos conversar",
      title: "Transforme sua ideia em realidade digital.",
      description: "Estou disponível para projetos freelance, colaborações ou oportunidades de carreira. Envie uma mensagem e vamos discutir como posso agregar valor ao seu time.",
      nameLabel: "Seu Nome",
      emailLabel: "Seu E-mail",
      messageLabel: "Sua Mensagem",
      buttonText: "Enviar Mensagem",
      loadingText: "Enviando...",
      successMsg: "Mensagem enviada com sucesso!",
      errorMsg: "Erro ao enviar. Tente novamente.",
    },
    en: {
      tagline: "Let's connect",
      title: "Turn your idea into digital reality.",
      description: "I am available for freelance projects, collaborations, or career opportunities. Send a message and let's discuss how I can add value to your team.",
      nameLabel: "Your Name",
      emailLabel: "Your Email",
      messageLabel: "Your Message",
      buttonText: "Send Message",
      loadingText: "Sending...",
      successMsg: "Message sent successfully!",
      errorMsg: "Error sending. Please try again.",
    },
  };

  const text = content[language];

  const validateForm = () => {
    const name = form.current.user_name.value;
    const email = form.current.user_email.value;
    const message = form.current.message.value;
    const newErrors = {};

    if (!name.trim()) newErrors.user_name = "Nome é obrigatório";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.user_email = "E-mail inválido";
    if (!message.trim()) newErrors.message = "Mensagem é obrigatória";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus("loading");

    const SERVICE_ID = "service_64ecjrg";
    const PUBLIC_KEY = "xFCMQC3gdoWmZTdbp";

    // Envio 1: Para VOCÊ (Template Original corrigido)
    const sendToMe = emailjs.sendForm(
      SERVICE_ID,
      "template_7zdl0h4",
      form.current,
      PUBLIC_KEY
    );

    // Envio 2: Para o USUÁRIO (O novo Template que você criou)
    const sendToUser = emailjs.sendForm(
      SERVICE_ID,
      "template_t7agmlf",
      form.current,
      PUBLIC_KEY
    );

    Promise.all([sendToMe, sendToUser])
      .then(() => {
        setStatus("success");
        form.current.reset();
        setErrors({});
        setTimeout(() => setStatus(""), 5000);
      })
      .catch((err) => {
        console.error("Erro no EmailJS:", err);
        setStatus("error");
        setTimeout(() => setStatus(""), 5000);
      });
  };

  const socialLinks = [
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/josu%C3%A9-goulart/", label: "LinkedIn" },
    { icon: FaGithub, href: "https://github.com/JosueGoulart01", label: "GitHub" },
    { icon: FaWhatsapp, href: "https://wa.me/5531986944904", label: "WhatsApp" },
    { icon: FaEnvelope, href: "mailto:josuegoulart.engdesoftware@gmail.com", label: "Email" },
  ];

  return (
    <section id="contato" className="py-32 px-6 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        
        {/* ESQUERDA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-neon-cyan font-bold tracking-widest uppercase mb-4 block text-sm flex items-center gap-2">
            <div className="w-8 h-px bg-neon-cyan"></div> {text.tagline}
          </span>

          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            {text.title}
          </h2>

          <p className="text-slate-300 text-lg mb-10 leading-relaxed max-w-lg font-light">
            {text.description}
          </p>

          <div className="flex gap-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white hover:text-neon-cyan hover:border-neon-cyan transition-all duration-300 hover:-translate-y-1.5"
              >
                <link.icon size={24} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* FORMULÁRIO */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form
            ref={form}
            onSubmit={sendEmail}
            className="bg-black/40 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl"
          >
            <div className="space-y-6">
              <div>
                <label className="text-slate-300 text-sm font-semibold mb-2 block">
                  {text.nameLabel}
                </label>
                <input
                  type="text"
                  name="user_name"
                  className={`w-full bg-white/5 border ${errors.user_name ? 'border-red-500' : 'border-white/10'} rounded-xl p-4 text-white focus:outline-none focus:border-neon-cyan`}
                />
              </div>

              <div>
                <label className="text-slate-300 text-sm font-semibold mb-2 block">
                  {text.emailLabel}
                </label>
                <input
                  type="email"
                  name="user_email"
                  className={`w-full bg-white/5 border ${errors.user_email ? 'border-red-500' : 'border-white/10'} rounded-xl p-4 text-white focus:outline-none focus:border-neon-cyan`}
                />
              </div>

              <div>
                <label className="text-slate-300 text-sm font-semibold mb-2 block">
                  {text.messageLabel}
                </label>
                <textarea
                  name="message"
                  rows="4"
                  className={`w-full bg-white/5 border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-xl p-4 text-white focus:outline-none focus:border-neon-cyan`}
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-white/10 text-white border border-neon-cyan hover:bg-neon-cyan hover:text-black font-bold py-4 px-8 rounded-xl transition-all duration-300 flex justify-center items-center"
              >
                {status === "loading" ? <FaSpinner className="animate-spin mr-2" /> : text.buttonText}
              </button>

              {status === "success" && (
                <div className="text-emerald-400 text-center font-medium">{text.successMsg}</div>
              )}

              {status === "error" && (
                <div className="text-red-400 text-center font-medium">{text.errorMsg}</div>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;