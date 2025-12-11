
import React, { useState, useEffect } from 'react';
import { 
  Hammer, 
  HardHat, 
  Ruler, 
  BrickWall, 
  Phone, 
  CheckCircle2, 
  MapPin, 
  Mail,
  Menu,
  X,
  Quote,
  ArrowLeft,
  Instagram,
  Facebook,
  Linkedin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div as any;

// Typewriter Animation Component
const TypewriterText = ({ text, duration = 2 }: { text: string; duration?: number }) => {
  return (
    <motion.span
      initial={{ width: 0 }}
      animate={{ width: 'auto' }}
      transition={{ duration, ease: 'linear' }}
      className="inline-block overflow-hidden"
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
      >
        {text}
      </motion.span>
    </motion.span>
  );
};

const services = [
  {
    title: "Gestão de Obras",
    description: "Supervisão completa do canteiro, garantindo prazos e qualidade na execução.",
    icon: <HardHat className="w-8 h-8 text-white" />
  },
  {
    title: "Alvenaria e Estrutura",
    description: "Execução precisa de fundações, paredes e estruturas de concreto armado.",
    icon: <BrickWall className="w-8 h-8 text-white" />
  },
  {
    title: "Reformas Gerais",
    description: "Renovação de ambientes residenciais e comerciais com acabamento fino.",
    icon: <Hammer className="w-8 h-8 text-white" />
  },
  {
    title: "Leitura de Projetos",
    description: "Interpretação técnica avançada de plantas arquitetônicas e estruturais.",
    icon: <Ruler className="w-8 h-8 text-white" />
  }
];

// ATENÇÃO: Renomeie suas 6 fotos na pasta 'public' conforme os nomes abaixo
const projects = [
  {
    title: "Fundação e Impermeabilização",
    category: "Infraestrutura",
    description: "Execução de viga baldrame com impermeabilização asfáltica e preparação de solo compactado.",
    image: "/fundacao-baldrame.jpg", 
  },
  {
    title: "Estrutura de Concreto Armado",
    category: "Estrutura",
    description: "Levantamento de sobrado com pilares e vigas aparentes, seguindo rigorosamente o projeto estrutural.",
    image: "/estrutura-sobrado.jpg",
  },
  {
    title: "Alvenaria e Vedação",
    category: "Residencial",
    description: "Levantamento de paredes com alinhamento e prumo perfeitos, preparando para a etapa de laje.",
    image: "/alvenaria-tijolo.jpg", 
  },
  {
    title: "Centro Comercial Moderno",
    category: "Fachada Comercial",
    description: "Acabamento de fachada com design geométrico, pintura projetada vibrante e instalação de vidros.",
    image: "/fachada-comercial.jpg",
  },
  {
    title: "Área de Lazer e Piscina",
    category: "Área Externa",
    description: "Construção de piscina em alvenaria com revestimento em pastilhas, escada submersa e borda térmica.",
    image: "/piscina-lazer.jpg", 
  },
  {
    title: "Escadaria em Mármore e Serralheria",
    category: "Acabamento Fino",
    description: "Escada curva revestida em mármore travertino, com guarda-corpo em serralheria artística preta e corrimão de madeira.",
    image: "/escada-marmore.jpg",
  }
];

// --- Components ---

const QuoteModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (!name.trim() || !phone.trim()) {
      alert("Por favor, preencha pelo menos seu Nome e Telefone.");
      return;
    }

    const phoneNumber = "5515998974445";
    const text = `Olá, vim pelo site da Macase Construções.\n\n*Nome:* ${name}\n*Telefone:* ${phone}\n*Mensagem:* ${message}`;
    const encodedText = encodeURIComponent(text);
    
    // Utilizando a URL da API para redirecionamento mais robusto
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedText}`;
    
    // Abre o WhatsApp em nova aba
    window.open(url, '_blank');
    
    // Limpa o formulário e fecha o modal para melhorar a experiência (UX)
    setName('');
    setPhone('');
    setMessage('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] overflow-y-auto">
          {/* Backdrop escuro com blur */}
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />
          
          {/* Wrapper para centralização e scroll no mobile */}
          <div className="flex min-h-full items-center justify-center p-4">
            {/* Modal Card */}
            <MotionDiv
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-[#18181b] w-full max-w-md rounded-2xl shadow-2xl border border-zinc-800 overflow-hidden z-[71]"
            >
              {/* Cabeçalho do Modal */}
              <div className="px-6 py-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  <HardHat className="w-5 h-5 text-gray-400" />
                  Solicitar Orçamento
                </h3>
                <button 
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-zinc-800 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Formulário */}
              <form onSubmit={handleSendMessage} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Nome Completo</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#27272a] border border-zinc-700 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-white focus:border-white outline-none transition-all placeholder-zinc-500 text-sm"
                    placeholder="Seu nome"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Telefone / WhatsApp</label>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#27272a] border border-zinc-700 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-white focus:border-white outline-none transition-all placeholder-zinc-500 text-sm"
                    placeholder="(00) 00000-0000"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Mensagem</label>
                  <textarea 
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#27272a] border border-zinc-700 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-white focus:border-white outline-none transition-all placeholder-zinc-500 text-sm resize-none"
                    placeholder="Descreva brevemente sua obra..."
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-white hover:bg-gray-200 text-black font-bold py-3.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2 mt-2 shadow-lg shadow-white/5 active:scale-[0.98]"
                >
                  Enviar Mensagem 
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </form>
            </MotionDiv>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

const AboutModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  // Previne rolagem do body quando modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionDiv
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[60] bg-zinc-950 flex flex-col md:flex-row overflow-hidden"
        >
          {/* Botão de Fechar Flutuante (Mobile e Desktop) */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-2 bg-black/50 backdrop-blur-md text-white hover:text-gray-300 rounded-full border border-white/10 transition-colors group"
          >
            <X className="w-8 h-8 group-hover:scale-110 transition-transform" />
          </button>

          {/* Coluna da Imagem (Esquerda/Topo) */}
          <div className="w-full md:w-1/2 h-[40vh] md:h-full relative shrink-0">
            <img 
              src="/marcelo-perfil.jpg" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000&auto=format&fit=crop";
              }}
              alt="Engenheiro Mestre de Obras" 
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-zinc-950/20 md:to-zinc-950"></div>
          </div>

          {/* Coluna do Texto (Direita/Baixo) */}
          {/* flex-1 garante que o texto ocupe o espaço restante no mobile sem ser cortado */}
          <div className="w-full md:w-1/2 flex-1 md:h-full bg-zinc-950 text-white overflow-y-auto relative">
            <div className="p-8 md:p-16 lg:p-24 flex flex-col justify-center min-h-full">
              
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-white/10 p-3 rounded-lg border border-white/10">
                    <HardHat className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-sm font-bold tracking-widest uppercase text-gray-400">Sobre o Fundador</span>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-2">
                  A Construção da <br/> <span className="text-gray-500">Minha História</span>
                </h2>
                <p className="text-xl text-white font-medium mt-2">Marcelo Camargo, CEO da Macase</p>
              </div>

              <div className="space-y-6 text-gray-400 text-lg leading-relaxed text-justify">
                <p>
                  Minha jornada na construção civil começou cedo, aos 15 anos, quando dei meus primeiros passos como servente de pedreiro. Naquela época, eu ainda não imaginava aonde o trabalho duro, a dedicação e a vontade de aprender poderiam me levar. Mas a cada massa preparada, a cada tijolo assentado e a cada obra acompanhada de perto, eu fui moldando não apenas meu conhecimento técnico, mas também meu caráter.
                </p>

                <div className="border-l-2 border-white pl-6 py-2 my-8 italic text-white text-xl">
                  "Com o passar do tempo, aprendi a profissão com humildade e determinação. Tornei-me pedreiro, aperfeiçoei minhas habilidades e me dediquei a executar cada serviço com excelência."
                </div>

                <p>
                  Cada projeto concluído representava mais do que uma entrega — era um passo a mais rumo a novos desafios. Hoje, com orgulho, atuo como mestre de obras e já liderei diversos projetos de grande porte, todos entregues com responsabilidade, qualidade e compromisso. Minha trajetória me ensinou que construir vai muito além de erguer paredes: é sobre transformar espaços, realizar sonhos e deixar um legado.
                </p>

                <p>
                  Como CEO da Macase, carrego comigo toda essa vivência e a certeza de que o sucesso é resultado de perseverança, aprendizado contínuo e paixão por aquilo que se faz. Minha história é uma prova de que, quando se constrói com propósito, cada etapa importa — da base ao acabamento.
                </p>
              </div>

              <div className="mt-12 mb-8 md:mb-0">
                <button 
                  onClick={onClose}
                  className="flex items-center text-white font-bold hover:text-gray-300 transition-colors group"
                >
                  <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Voltar para o site
                </button>
              </div>
            </div>
          </div>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};

const Navbar = ({ onOpenAbout, onOpenQuote }: { onOpenAbout: () => void; onOpenQuote: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-40 backdrop-blur-lg bg-white/30 border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <HardHat className="h-8 w-8 text-gray-900" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              <TypewriterText text="Macase Construções" duration={2} />
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={onOpenAbout} className="text-gray-700 hover:text-gray-900 font-medium transition-colors focus:outline-none">
              Sobre
            </button>
            <button onClick={onOpenQuote} className="bg-gray-900 text-white px-4 py-2 rounded-md font-medium hover:bg-black transition-colors">
              Solicitar Orçamento
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-gray-900 focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden backdrop-blur-lg bg-white/30 border-b border-white/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button onClick={() => { onOpenAbout(); setIsOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-white/20 transition-colors">
              Sobre
            </button>
            <button onClick={() => { onOpenQuote(); setIsOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-900 font-bold hover:bg-white/20 transition-colors">
              Solicitar Orçamento
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-20 pb-32 md:py-32 bg-gray-950 overflow-hidden min-h-[85vh] md:min-h-[600px] flex items-center">
      <div className="absolute inset-0">
        {/* Usando uma das fotos reais do usuário como background do Hero */}
        <img 
          src="/estrutura-sobrado.jpg" 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
          }}
          alt="Obra em Andamento" 
          className="w-full h-full object-cover opacity-30 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-gray-950/20"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <MotionDiv 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-white text-sm font-semibold tracking-wide uppercase mb-4 border border-white/20 backdrop-blur-sm">
            Qualidade & Segurança
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-6">
            Construindo Sonhos com <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Excelência Técnica
            </span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300 mb-10">
            Mais de 15 anos de experiência liderando obras residenciais e comerciais. 
            Do alicerce ao acabamento, sua obra em mãos seguras.
          </p>
        </MotionDiv>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  return (
    <section id="servicos" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base text-gray-500 font-semibold tracking-wide uppercase">Especialidades</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Soluções Completas para sua Obra
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <MotionDiv 
              key={service.title}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200 flex flex-col items-center text-center sm:block sm:text-left"
            >
              <div className="w-14 h-14 bg-gray-900 rounded-lg flex items-center justify-center mb-6 shadow-lg shadow-gray-900/20">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-500 leading-relaxed">{service.description}</p>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectsSection = () => {
  return (
    <section id="projetos" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Projetos Recentes</h2>
            <p className="mt-4 text-xl text-gray-500">
              Uma seleção de obras reais executadas pela nossa equipe, mostrando a qualidade do início ao fim.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {projects.map((project) => (
            <div key={project.title} className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] bg-gray-100">
              <div className="h-80 relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    // Fallback visual para avisar o usuário se a imagem não for encontrada
                    if (!target.src.includes('placeholder')) {
                      target.src = "https://placehold.co/600x400/e2e8f0/475569?text=FOTO+NAO+ENCONTRADA:+Verifique+a+Pasta+Public";
                      target.className = "w-full h-full object-contain p-4 bg-gray-100 opacity-70";
                    }
                  }}
                  // Usando object-cover com object-center para garantir que a imagem preencha o espaço sem distorção
                  // Removido filtros excessivos para manter a imagem "sem alteração"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Gradiente reduzido para não escurecer demais a foto original */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <p className="text-gray-300 text-xs font-bold uppercase tracking-wider mb-2">{project.category}</p>
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-2">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black py-12 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <HardHat className="h-6 w-6 text-gray-500" />
          <span className="ml-2 text-gray-400 font-medium">Macase Construções &copy; Todos os direitos reservados.</span> 
        </div>
        <div className="flex space-x-6">
          <a 
            href="https://www.instagram.com/macase_construcoes/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="h-6 w-6" />
          </a>
          <a 
            href="#" 
            className="text-gray-500 hover:text-white transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="h-6 w-6" />
          </a>
          <a 
            href="#" 
            className="text-gray-500 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

function App() {
  const [isAboutModalOpen, setAboutModalOpen] = useState(false);
  const [isQuoteModalOpen, setQuoteModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-gray-300 selection:text-black">
      <Navbar 
        onOpenAbout={() => setAboutModalOpen(true)} 
        onOpenQuote={() => setQuoteModalOpen(true)}
      />
      
      <AboutModal isOpen={isAboutModalOpen} onClose={() => setAboutModalOpen(false)} />
      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
      
      <Hero />
      <ServicesSection />
      <ProjectsSection />
      <Footer />
    </div>
  );
}

export default App;
