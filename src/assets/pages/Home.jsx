import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Sparkles, ArrowRight, Star, Heart, Droplets, Wind, ChevronDown, MessageCircle, Instagram, Gift, Crown, Truck, Phone } from 'lucide-react';
import PerfumeCard from '../componentes/PerfumeCard';

// Helper function for WhatsApp
const openWhatsApp = (message) => {
  const phone = '5515998033593';
  const encodedMsg = encodeURIComponent(message);
  
  if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    window.location.href = `whatsapp://send?phone=${phone}&text=${encodedMsg}`;
    setTimeout(() => {
      window.open(`https://wa.me/${phone}?text=${encodedMsg}`, '_blank');
    }, 2000);
  } else {
    window.open(`https://wa.me/${phone}?text=${encodedMsg}`, '_blank');
  }
};

export default function Home() {
  const [perfumes, setPerfumes] = useState([]);
  const [allPerfumes, setAllPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heroVideo, setHeroVideo] = useState('');
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    fetch('/api/perfumes')
      .then(res => res.json())
      .then(data => {
        setAllPerfumes(data);
        setPerfumes(data.filter(p => p.featured).slice(0, 4));
        setLoading(false);
      })
      .catch(() => setLoading(false));

    fetch('/api/site-video')
      .then(res => res.json())
      .then(data => setHeroVideo(data.videoUrl || ''))
      .catch(() => {});
  }, []);

  const brands = ['O Boticário', 'Natura', 'Chanel', 'Dior', 'Tom Ford', 'Versace', 'YSL', 'Armani'];

  const olfactoryFamilies = [
    { name: 'Floral', icon: '🌸', color: 'from-pink-500 to-rose-500', description: 'Romântico e feminino' },
    { name: 'Oriental', icon: '🌙', color: 'from-amber-500 to-orange-500', description: 'Sensual e misterioso' },
    { name: 'Amadeirado', icon: '🌳', color: 'from-amber-700 to-amber-900', description: 'Elegante e sofisticado' },
    { name: 'Cítrico', icon: '🍋', color: 'from-yellow-400 to-amber-400', description: 'Fresco e vibrante' },
    { name: 'Aromático', icon: '🌿', color: 'from-green-500 to-emerald-500', description: 'Herbal e refrescante' },
    { name: 'Aquático', icon: '🌊', color: 'from-blue-400 to-cyan-400', description: 'Leve e aquático' },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {heroVideo ? (
            <>
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-40"
                src={heroVideo}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
          )}
          <motion.div style={{ y }} className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <motion.div key={i} className="absolute w-1 h-1 bg-amber-400 rounded-full" initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, opacity: 0 }} animate={{ y: [null, Math.random() * -200], opacity: [0, 1, 0] }} transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5 }} />
            ))}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[128px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-[200px]" />
          </motion.div>
        </div>

        <motion.div style={{ opacity }} className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-rose-500/20 border border-amber-500/30 text-amber-400 text-sm">
              <Gift className="w-4 h-4" /> Os Melhores Preços da Região!
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight mb-6">
            <span className="block bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">Aura Parfum</span>
            <span className="block text-2xl sm:text-3xl md:text-4xl font-normal mt-4 bg-gradient-to-r from-amber-200 via-amber-400 to-rose-400 bg-clip-text text-transparent">Perfumaria de Luxo</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Descubra fragrâncias exclusivas com os melhores preços! Entregamos em Sorocaba e região via 99.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => openWhatsApp('Olá! Gostaria de pedir um perfume. Vocês entregam em Sorocaba via 99?')} className="group px-8 py-4 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-lg flex items-center justify-center gap-2 hover:shadow-2xl hover:shadow-green-500/30 transition-all hover:scale-105">
              <MessageCircle className="w-5 h-5" /> Falar no WhatsApp <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link to="/catalogo" className="px-8 py-4 rounded-full border-2 border-amber-500/50 text-amber-400 font-semibold text-lg flex items-center justify-center gap-2 hover:bg-amber-500/10 transition-all">Ver Catálogo</Link>
          </motion.div>

          {/* Phone Number for mobile */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex items-center justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 text-white/70">
              <Phone className="w-5 h-5 text-green-400" />
              <span className="text-lg font-medium">(15) 99803-3593</span>
            </div>
            <a href="https://instagram.com/japaeikosan" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/50 hover:text-amber-400 transition-colors">
              <Instagram className="w-5 h-5" /> <span className="text-sm">@japaeikosan</span>
            </a>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center gap-2 text-white/40">
            <span className="text-xs uppercase tracking-wider">Scroll</span><ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* Brands Marquee */}
      <section className="py-12 border-y border-white/10 overflow-hidden bg-gradient-to-r from-black via-zinc-950 to-black">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...brands, ...brands].map((brand, i) => (<span key={i} className="mx-8 text-2xl sm:text-3xl font-serif text-white/20 hover:text-amber-400/60 transition-colors cursor-default">{brand}</span>))}
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-amber-400 text-sm uppercase tracking-wider">Seleção Especial</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mt-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Destaques da Semana</h2>
          <p className="text-white/50 mt-4 max-w-2xl mx-auto">Fragrâncias selecionadas com os melhores preços para transformar seus momentos especiais.</p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{[...Array(4)].map((_, i) => (<div key={i} className="aspect-square rounded-2xl bg-white/5 animate-pulse" />))}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{perfumes.map((perfume, i) => (<PerfumeCard key={perfume.id} perfume={perfume} index={i} />))}</div>
        )}

        <div className="text-center mt-12">
          <Link to="/catalogo" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 transition-all">Ver Catálogo Completo <ArrowRight className="w-5 h-5" /></Link>
        </div>
      </section>

      {/* O Boticário & Natura Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-amber-400 text-sm uppercase tracking-wider">Parcerias Exclusivas</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mt-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Marcas Brasileiras de Luxo</h2>
            <p className="text-white/50 mt-4 max-w-2xl mx-auto">Os melhores preços em O Boticário e Natura — consulte disponibilidade!</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative group rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-900/20 to-emerald-950/30 border border-emerald-500/20 p-6 sm:p-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]" />
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-emerald-400 mb-4">O Boticário</h3>
                <p className="text-white/60 mb-6 leading-relaxed">Malbec, Egeo, Floratta e toda a linha O Boticário com preços imperdíveis. Consulte nossa disponibilidade e faça seu pedido!</p>
                <Link to="/catalogo?brand=O%20Botic%C3%A1rio" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors">Ver O Boticário <ArrowRight className="w-4 h-4" /></Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative group rounded-3xl overflow-hidden bg-gradient-to-br from-purple-900/20 to-purple-950/30 border border-purple-500/20 p-6 sm:p-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-purple-400 mb-4">Natura</h3>
                <p className="text-white/60 mb-6 leading-relaxed">Kaiak, Humor, Essencial, Ekos e toda linha Natura com descontos exclusivos. Fale comigo e descubra as ofertas!</p>
                <Link to="/catalogo?brand=Natura" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">Ver Natura <ArrowRight className="w-4 h-4" /></Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-amber-400 text-sm uppercase tracking-wider">Por que Aura Parfum?</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mt-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Nossos Diferenciais</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[{ icon: Gift, title: 'Melhores Preços', desc: 'Descontos exclusivos em todas as marcas', color: 'from-amber-500/20 to-amber-600/20', border: 'border-amber-500/30' }, { icon: Crown, title: '100% Original', desc: 'Produtos autênticos com garantia', color: 'from-purple-500/20 to-purple-600/20', border: 'border-purple-500/30' }, { icon: Truck, title: 'Entrega 99', desc: 'Entregamos em Sorocaba e região', color: 'from-green-500/20 to-green-600/20', border: 'border-green-500/30' }, { icon: Heart, title: 'Seleção Premium', desc: 'Fragrâncias cuidadosamente selecionadas', color: 'from-rose-500/20 to-rose-600/20', border: 'border-rose-500/30' }].map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`p-6 rounded-2xl bg-gradient-to-br ${item.color} border ${item.border} text-center`}>
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} border ${item.border} flex items-center justify-center mx-auto mb-4`}>
                <item.icon className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="font-serif text-lg text-white mb-2">{item.title}</h3>
              <p className="text-white/50 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Delivery Section */}
      <section className="py-16 bg-gradient-to-b from-black via-green-950/20 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20">
              <Truck className="w-8 h-8 text-green-400" />
              <div>
                <h3 className="font-serif text-xl text-green-400">Entrega em Sorocaba e Região</h3>
                <p className="text-white/60 text-sm mt-1">Pedidos via WhatsApp • Entrega via 99</p>
              </div>
            </div>
            <p className="text-white/50 mt-6 max-w-xl mx-auto">Fale no WhatsApp para pedir seu perfume! Entregamos rapidamente em Sorocaba e região via 99.</p>
            <button onClick={() => openWhatsApp('Olá! Quero pedir um perfume. Vocês entregam em Sorocaba via 99?')} className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:shadow-lg hover:shadow-green-500/30 transition-all">
              <MessageCircle className="w-5 h-5" /> Pedir via WhatsApp
            </button>
          </motion.div>
        </div>
      </section>

      {/* Olfactory Pyramid Education */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-amber-400 text-sm uppercase tracking-wider">Aprenda</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mt-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">A Arte da Pirâmide Olfativa</h2>
          <p className="text-white/50 mt-4 max-w-2xl mx-auto">Entenda como as notas se revelam ao longo do tempo e escolha a fragrância perfeita.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="relative group rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 p-6 sm:p-8">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mb-6"><Wind className="w-7 h-7 text-white" /></div>
            <h3 className="text-xl font-serif font-bold text-cyan-400 mb-3">Notas de Saída</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4">As primeiras impressões. Notas leves e frescas que duram 5-15 minutos.</p>
            <div className="flex flex-wrap gap-2">{['Cítricos', 'Aquáticos', 'Verdes'].map((note) => (<span key={note} className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs">{note}</span>))}</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="relative group rounded-2xl overflow-hidden bg-gradient-to-br from-rose-500/10 to-pink-500/10 border border-rose-500/20 p-6 sm:p-8">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center mb-6"><Heart className="w-7 h-7 text-white" /></div>
            <h3 className="text-xl font-serif font-bold text-rose-400 mb-3">Notas de Coração</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4">A personalidade do perfume. Revelam-se após as notas de saída e duram 2-4 horas.</p>
            <div className="flex flex-wrap gap-2">{['Florais', 'Especiarias', 'Frutados'].map((note) => (<span key={note} className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">{note}</span>))}</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="relative group rounded-2xl overflow-hidden bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 p-6 sm:p-8">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-6"><Droplets className="w-7 h-7 text-white" /></div>
            <h3 className="text-xl font-serif font-bold text-amber-400 mb-3">Notas de Fundo</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4">A assinatura final. Notas profundas e duradouras que permanecem por 6-12 horas.</p>
            <div className="flex flex-wrap gap-2">{['Amadeirados', 'Orientais', 'Musgos'].map((note) => (<span key={note} className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">{note}</span>))}</div>
          </motion.div>
        </div>
      </section>

      {/* Olfactory Families */}
      <section className="py-20 sm:py-32 bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-amber-400 text-sm uppercase tracking-wider">Explore</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mt-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Famílias Olfativas</h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {olfactoryFamilies.map((family, i) => (
              <motion.div key={family.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -5 }}>
                <Link to={`/catalogo?family=${encodeURIComponent(family.name)}`} className="block p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all text-center group">
                  <div className="text-4xl mb-3">{family.icon}</div>
                  <h3 className={`font-serif font-bold bg-gradient-to-r ${family.color} bg-clip-text text-transparent mb-1`}>{family.name}</h3>
                  <p className="text-white/40 text-xs">{family.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-amber-400 text-sm uppercase tracking-wider">Depoimentos</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mt-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">O Que Dizem Nossos Clientes</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[{ name: 'Marina Silva', text: 'Aura Parfum tem os melhores preços! Comprei meu Malbec por um valor incrível. Super recomendo!', rating: 5 }, { name: 'Carolina Mendes', text: 'Atendimento excepcional via WhatsApp! Adriana me ajudou a escolher o perfume ideal. Ótima experiência!', rating: 5 }, { name: 'Fernanda Costa', text: 'Produtos 100% originais e com descontos amazing. Já sou cliente fiel da Aura Parfum!', rating: 5 }].map((review, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10">
              <div className="flex gap-1 mb-4">{[...Array(review.rating)].map((_, j) => (<Star key={j} className="w-5 h-5 text-amber-400 fill-amber-400" />))}</div>
              <p className="text-white/70 mb-6 leading-relaxed">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-rose-400 flex items-center justify-center text-black font-bold">{review.name[0]}</div>
                <span className="font-medium text-white">{review.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-32 bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden">
        <div className="absolute inset-0"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[200px]" /></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent mb-6">Pronta Para Encontrar Sua Fragrância?</h2>
            <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">Fale no WhatsApp e descubra os melhores preços! Entregamos em Sorocaba via 99.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => openWhatsApp('Olá! Gostaria de saber sobre os perfumes disponíveis na Aura Parfum')} className="px-8 py-4 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-lg flex items-center justify-center gap-2 hover:shadow-2xl hover:shadow-green-500/30 transition-all hover:scale-105">
                <MessageCircle className="w-6 h-6" /> Chamar no WhatsApp
              </button>
              <Link to="/catalogo" className="px-8 py-4 rounded-full border-2 border-amber-500/50 text-amber-400 font-semibold text-lg flex items-center justify-center gap-2 hover:bg-amber-500/10 transition-all">Ver Catálogo</Link>
            </div>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/70">
              <div className="flex items-center gap-2"><Phone className="w-5 h-5 text-green-400" /><span>(15) 99803-3593</span></div>
              <a href="https://instagram.com/japaeikosan" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-amber-400 transition-colors"><Instagram className="w-5 h-5" /><span>@japaeikosan</span></a>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } } .animate-marquee { animation: marquee 30s linear infinite; }`}</style>
    </div>
  );
}