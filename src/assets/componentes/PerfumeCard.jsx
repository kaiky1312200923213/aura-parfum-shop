
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Sparkles } from 'lucide-react';

export default function PerfumeCard({ perfume, index = 0 }) {
  const discount = perfume.original_price
    ? Math.round((1 - perfume.price / perfume.original_price) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/perfume/${perfume.id}`} className="group block">
        <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden">
            <img
              src={perfume.image_url || 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400'}
              alt={perfume.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {perfume.featured && (
                <span className="px-2 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Destaque
                </span>
              )}
              {discount > 0 && (
                <span className="px-2 py-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] font-bold uppercase tracking-wider">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Quick Actions */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 hover:text-rose-400 hover:border-rose-400/50 transition-all"
              >
                <Heart className="w-4 h-4" />
              </button>
            </div>

            {/* Family Badge */}
            <div className="absolute bottom-3 left-3">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white/80 text-xs">
                {perfume.olfactory_family}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-5">
            <p className="text-amber-400/80 text-xs uppercase tracking-wider mb-1">{perfume.brand}</p>
            <h3 className="font-serif text-lg sm:text-xl text-white group-hover:text-amber-400 transition-colors line-clamp-1">
              {perfume.name}
            </h3>
            <p className="text-white/50 text-sm mt-2 line-clamp-2">{perfume.description}</p>
            
            {/* Price */}
            <div className="flex items-baseline gap-2 mt-3">
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                R$ {perfume.price?.toFixed(2).replace('.', ',')}
              </span>
              {perfume.original_price && (
                <span className="text-white/40 text-sm line-through">
                  R$ {perfume.original_price.toFixed(2).replace('.', ',')}
                </span>
              )}
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold text-sm flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ShoppingBag className="w-4 h-4" />
              Consultar
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}