const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 py-8 text-center border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-slate-400 font-medium mb-1">
          &copy; {currentYear} Luiz Fernando Batista Moreira. Todos os direitos reservados.
        </p>
        <p className="text-slate-600 text-sm">
          Desenvolvido com React, Vite e precisão algorítmica.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
