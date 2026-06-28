import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Collections() {
  const collections = [
    {
      name: 'Essencial Collection',
      description: 'Fragrâncias para o dia a dia, leves e versáteis para qualquer ocasião.',
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600',
      color: 'from-cyan-500/20 to-blue-500/20',
      borderColor: 'border-cyan-500/30',
      family: 'Cítrico',
    },
    {
      name: 'Nocturne Collection',
      description: 'Perfumes intensos e misteriosos para momentos especiais e noite.',
      image: 'https://images.unsplash.com/photo-1594035910387-fea477942dd4?w=600',
      color: 'from-purple-500/20 to-rose-500/20',
      borderColor: 'border-purple-500/30',
      family: 'Oriental',
    },
    {
      name: 'Nature Collection',
      description: 'Conexão com a natureza através de notas frescas e herbais.',
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600',
      color: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-500/30',
      family: 'Aromático',
    },
    {
      name: 'Signature Collection',
      description: 'Fragrâncias exclusivas de grife internacional para quem busca o extraordinário.',
      image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600',
      color: 'from-amber-500/20 to-orange-500/20',
      borderColor: 'border-amber-500/30',
      family: 'Amadeirado',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 text-sm uppercase tracking-wider">Curadoria Especial</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mt-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Coleções Exclusivas
          </h1>
          <p className="text-white/50 mt-4 max-w-2xl mx-auto">
            Explore nossas coleções cuidadosamente selecionadas para cada momento e estilo.
          </p>
        </motion.div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map((collection, i) => (
            <motion.div
              key={collection.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/catalogo?family=${encodeURIComponent(collection.family)}`}
                className="group block relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-amber-500/30 transition-all"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>
                
                <div className={`absolute inset-0 bg-gradient-to-br ${collection.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-serif font-bold text-white group-hover:text-amber-400 transition-colors">
                    {collection.name}
                  </h3>
                  <p className="text-white/60 mt-2 group-hover:text-white/80 transition-colors">
                    {collection.description}
                  </p>
                  <div className="flex items-center gap-2 mt-4 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium">Explorar coleção</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}