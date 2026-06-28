import { motion } from 'framer-motion';
import { MessageCircle, Mail, Instagram, Clock, Send, Heart, Sparkles, Truck, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <span className="text-amber-400 text-sm uppercase tracking-wider">Fale Conosco</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mt-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Entre em Contato
          </h1>
          <p className="text-white/50 mt-4 max-w-2xl mx-auto">
            Fale no WhatsApp para pedir seu perfume! Entregamos em Sorocaba e região via 99.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <motion.a href="https://wa.me/5515998033593?text=Olá! Quero pedir um perfume. Vocês entregam em Sorocaba via 99?" target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} whileHover={{ scale: 1.02 }} className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 hover:border-green-500/40 transition-all">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-lg font-serif font-bold text-green-400 mb-2">WhatsApp</h3>
            <p className="text-white/60">(15) 99803-3593</p>
            <p className="text-green-400/80 text-sm mt-2">Clique para pedir →</p>
          </motion.a>

          <motion.a href="https://instagram.com/japaeikosan" target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} whileHover={{ scale: 1.02 }} className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-rose-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
              <Instagram className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-serif font-bold text-purple-400 mb-2">Instagram</h3>
            <p className="text-white/60">@japaeikosan</p>
            <p className="text-purple-400/80 text-sm mt-2">Siga-nos →</p>
          </motion.a>

          <motion.a href="mailto:ja.pa.dri@hotmail.com" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} whileHover={{ scale: 1.02 }} className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/10 border border-amber-500/20 hover:border-amber-500/40 transition-all">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-lg font-serif font-bold text-amber-400 mb-2">Email</h3>
            <p className="text-white/60">ja.pa.dri@hotmail.com</p>
            <p className="text-amber-400/80 text-sm mt-2">Enviar email →</p>
          </motion.a>
        </div>

        {/* Delivery Info */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="max-w-3xl mx-auto mb-12">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 text-center">
            <Truck className="w-10 h-10 text-green-400 mx-auto mb-4" />
            <h3 className="font-serif text-xl text-green-400 mb-2">Entrega em Sorocaba e Região</h3>
            <p className="text-white/60">Pedidos via WhatsApp • Entrega via 99</p>
            <p className="text-white/50 text-sm mt-2">Fale no WhatsApp para pedir seu perfume!</p>
          </div>
        </motion.div>

        {/* Info Section */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="max-w-3xl mx-auto mb-12">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
                <Sparkles className="w-7 h-7 text-black" />
              </div>
              <div>
                <h2 className="text-xl font-serif font-bold text-white">Aura Parfum</h2>
                <p className="text-white/50 text-sm">Perfumaria de Luxo</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-400" />
                <div>
                  <p className="text-white/50 text-sm">Horário</p>
                  <p className="text-white">Seg-Sex: 9h - 18h</p>
                  <p className="text-white">Sáb: 10h - 14h</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-white/50 text-sm">Local</p>
                  <p className="text-white">Sorocaba e Região</p>
                  <p className="text-white/60 text-sm">Entrega via 99</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="max-w-xl mx-auto">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10">
            <h2 className="text-xl font-serif font-bold text-white mb-6 text-center">Envie uma Mensagem</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">Nome</label>
                <input type="text" placeholder="Seu nome" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-500/50 focus:outline-none text-white placeholder-white/40 transition-colors" />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">WhatsApp</label>
                <input type="tel" placeholder="(15) 99999-9999" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-500/50 focus:outline-none text-white placeholder-white/40 transition-colors" />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Mensagem</label>
                <textarea rows={4} placeholder="Quero pedir um perfume..." className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-500/50 focus:outline-none text-white placeholder-white/40 resize-none transition-colors" />
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold flex items-center justify-center gap-2">
                <Send className="w-5 h-5" /> Enviar Mensagem
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* WhatsApp CTA */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-12 text-center">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 max-w-xl mx-auto">
            <p className="text-white/70 mb-4">Prefere conversar direto? Chame no WhatsApp!</p>
            <a href="https://wa.me/5515998033593?text=Olá! Quero pedir um perfume" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:shadow-lg hover:shadow-green-500/30 transition-all">
              <MessageCircle className="w-5 h-5" /> Chamar no WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}