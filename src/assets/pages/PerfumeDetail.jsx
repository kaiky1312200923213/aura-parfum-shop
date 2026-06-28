import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Share2, Star, Sparkles, Droplets, Wind, MessageCircle, ChevronRight, Truck, Shield, Gift } from 'lucide-react';
import PerfumeCard from '../componentes/PerfumeCard';

export default function PerfumeDetail() {
  const { id } = useParams();
  const [perfume, setPerfume] = useState(null);
  const [relatedPerfumes, setRelatedPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeNote, setActiveNote] = useState('top');

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`/api/perfumes/${id}`).then(res => res.json()),
      fetch('/api/perfumes').then(res => res.json()),
    ])
      .then(([perfumeData, allPerfumes]) => {
        setPerfume(perfumeData);
        const related = allPerfumes.filter(p => p.id !== perfumeData.id && p.olfactory_family === perfumeData.olfactory_family).slice(0, 4);
        setRelatedPerfumes(related);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!perfume) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-white mb-4">Perfume não encontrado</h2>
          <Link to="/catalogo" className="text-amber-400 hover:underline">Voltar ao catálogo</Link>
        </div>
      </div>
    );
  }

  const images = [perfume.image_url, perfume.image_url_secondary].filter(Boolean);
  const discount = perfume.original_price ? Math.round((1 - perfume.price / perfume.original_price) * 100) : 0;

  const noteColors = {
    top: { bg: 'from-cyan-500/20 to-blue-500/20', border: 'border-cyan-500/30', text: 'text-cyan-400', icon: Wind },
    heart: { bg: 'from-rose-500/20 to-pink-500/20', border: 'border-rose-500/30', text: 'text-rose-400', icon: Heart },
    base: { bg: 'from-amber-500/20 to-orange-500/20', border: 'border-amber-500/30', text: 'text-amber-400', icon: Droplets },
  };
  const whatsappMessage = encodeURIComponent(`Olá! Quero pedir o perfume ${perfume.name} da ${perfume.brand} por R$ ${perfume.price?.toFixed(2).replace('.', ',')}. Vocês entregam em Sorocaba via 99?`);

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/50 mb-8">
          <Link to="/" className="hover:text-amber-400 transition-colors">Aura Parfum</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/catalogo" className="hover:text-amber-400 transition-colors">Catálogo</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white/80">{perfume.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10">
              <img src={images[selectedImage] || 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600'} alt={perfume.name} className="w-full h-full object-cover" />
              {discount > 0 && <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-bold">-{discount}% OFF</div>}
              {perfume.featured && <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black text-sm font-bold flex items-center gap-1"><Sparkles className="w-4 h-4" />Destaque</div>}
              <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-bold flex items-center gap-1"><Gift className="w-4 h-4" />Melhor Preço!</div>
            </motion.div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)} className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === i ? 'border-amber-400' : 'border-white/10 hover:border-white/30'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <p className="text-amber-400 text-sm uppercase tracking-wider mb-2">{perfume.brand}</p>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">{perfume.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">{[...Array(5)].map((_, i) => (<Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />))}</div>
                <span className="text-white/50 text-sm">(47 avaliações)</span>
              </div>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">R$ {perfume.price?.toFixed(2).replace('.', ',')}</span>
                {perfume.original_price && <span className="text-xl text-white/40 line-through">R$ {perfume.original_price.toFixed(2).replace('.', ',')}</span>}
              </div>
              <div className="flex flex-wrap gap-3 mb-6">
                {perfume.intensity && <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm">{perfume.intensity}</span>}
                {perfume.olfactory_family && <span className="px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm">{perfume.olfactory_family}</span>}
              </div>
            </motion.div>

            {/* Story */}
            {perfume.story && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-rose-500/10 border border-purple-500/20">
                <h3 className="font-serif text-lg text-white mb-3 flex items-center gap-2"><Sparkles className="w-5 h-5 text-purple-400" />A História</h3>
                <p className="text-white/70 leading-relaxed italic">"{perfume.story}"</p>
              </motion.div>
            )}

            {/* Description */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h3 className="font-serif text-lg text-white mb-3">Descrição</h3>
              <p className="text-white/60 leading-relaxed">{perfume.description}</p>
            </motion.div>

            {/* Olfactory Pyramid */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-4">
              <h3 className="font-serif text-lg text-white">Pirâmide Olfativa</h3>
              <div className="flex gap-2">
                {['top', 'heart', 'base'].map((note) => {
                  const colors = noteColors[note];
                  const labels = { top: 'Saída', heart: 'Coração', base: 'Fundo' };                  const Icon = colors.icon;
                  return (
                    <button key={note} onClick={() => setActiveNote(note)} className={`flex-1 py-3 px-4 rounded-xl border transition-all ${activeNote === note ? `bg-gradient-to-br ${colors.bg} ${colors.border}` : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
                      <div className="flex items-center justify-center gap-2">
                        <Icon className={`w-4 h-4 ${activeNote === note ? colors.text : 'text-white/50'}`} />
                        <span className={`text-sm font-medium ${activeNote === note ? colors.text : 'text-white/60'}`}>{labels[note]}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className={`p-6 rounded-2xl bg-gradient-to-br ${noteColors[activeNote].bg} border ${noteColors[activeNote].border}`}>
                <div className="flex flex-wrap gap-2">
                  {activeNote === 'top' && perfume.top_notes && perfume.top_notes.split(',').map((note, i) => (<motion.span key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} className="px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-sm">{note.trim()}</motion.span>))}
                  {activeNote === 'heart' && perfume.heart_notes && perfume.heart_notes.split(',').map((note, i) => (<motion.span key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} className="px-4 py-2 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-sm">{note.trim()}</motion.span>))}
                  {activeNote === 'base' && perfume.base_notes && perfume.base_notes.split(',').map((note, i) => (<motion.span key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} className="px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-sm">{note.trim()}</motion.span>))}
                  {!((activeNote === 'top' && perfume.top_notes) || (activeNote === 'heart' && perfume.heart_notes) || (activeNote === 'base' && perfume.base_notes)) && <span className="text-white/50">Notas não informadas</span>}
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="space-y-3">
              <a href={`https://wa.me/5515998033593?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer" className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-lg flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-green-500/30 transition-all hover:scale-[1.02]">
                <MessageCircle className="w-6 h-6" />Pedir via WhatsApp
              </a>
              <div className="flex gap-3">
                <button className="flex-1 py-3 rounded-xl border border-white/10 text-white/80 hover:border-amber-500/30 hover:text-amber-400 transition-all flex items-center justify-center gap-2"><Heart className="w-5 h-5" />Favoritar</button>
                <button className="flex-1 py-3 rounded-xl border border-white/10 text-white/80 hover:border-amber-500/30 hover:text-amber-400 transition-all flex items-center justify-center gap-2"><Share2 className="w-5 h-5" />Compartilhar</button>
              </div>
            </motion.div>

            {/* Benefits */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="text-center"><Truck className="w-6 h-6 text-green-400 mx-auto mb-2" /><p className="text-xs text-white/60">Entrega 99</p></div>
              <div className="text-center"><Shield className="w-6 h-6 text-amber-400 mx-auto mb-2" /><p className="text-xs text-white/60">100% Original</p></div>
              <div className="text-center"><Gift className="w-6 h-6 text-amber-400 mx-auto mb-2" /><p className="text-xs text-white/60">Melhor Preço</p></div>
            </motion.div>
          </div>
        </div>

        {/* Related Products */}
        {relatedPerfumes.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-20">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-8">Perfumes Similares</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedPerfumes.map((p, i) => (<PerfumeCard key={p.id} perfume={p} index={i} />))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}