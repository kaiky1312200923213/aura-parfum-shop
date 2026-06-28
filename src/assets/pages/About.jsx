import { motion } from 'framer-motion';
import { Sparkles, Heart, Star, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 text-sm uppercase tracking-wider">Nossa História</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mt-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Sobre a Éclat
          </h1>
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <p className="text-white/60 text-lg leading-relaxed">
            A Éclat nasceu da paixão de Adriana Eiko Ono por fragrâncias e pela arte de conectar 
            pessoas através de perfumes. Cada seleção é feita com cuidado, conhecimento e amor, 
            trazendo o melhor da perfumaria brasileira e internacional para você.
          </p>
        </motion.div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/10 border border-amber-500/20 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-7 h-7 text-amber-400" />
            </div>
            <h3 className="text-xl font-serif font-bold text-amber-400 mb-3">Curadoria Exclusiva</h3>
            <p className="text-white/60 leading-relaxed">
              Cada perfume é selecionado com expertise e carinho, garantindo qualidade e exclusividade.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-rose-500/10 to-rose-600/10 border border-rose-500/20 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-rose-500/20 flex items-center justify-center mx-auto mb-6">
              <Heart className="w-7 h-7 text-rose-400" />
            </div>
            <h3 className="text-xl font-serif font-bold text-rose-400 mb-3">Atendimento Personalizado</h3>
            <p className="text-white/60 leading-relaxed">
              Consultoria especializada para encontrar a fragrância ideal para cada pessoa e momento.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-6">
              <Star className="w-7 h-7 text-purple-400" />
            </div>
            <h3 className="text-xl font-serif font-bold text-purple-400 mb-3">Qualidade Premium</h3>
            <p className="text-white/60 leading-relaxed">
              Produtos 100% originais das melhores marcas, com garantia de autenticidade.
            </p>
          </motion.div>
        </div>

        {/* Founder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-8">A Fundadora</h2>
          <div className="max-w-md mx-auto p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-rose-400 flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-black">
              AEO
            </div>
            <h3 className="text-xl font-serif font-bold text-amber-400 mb-2">Adriana Eiko Ono</h3>
            <p className="text-white/50 text-sm mb-4">Curadora & Fundadora</p>
            <p className="text-white/60 leading-relaxed">
              "Cada perfume é uma história, uma emoção, uma memória. Meu objetivo é ajudar cada pessoa 
              a encontrar a fragrância que combina com sua essência."
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}