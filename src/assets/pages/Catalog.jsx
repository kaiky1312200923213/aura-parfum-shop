import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronDown, Grid3X3, LayoutList, Sparkles, MessageCircle, Truck } from 'lucide-react';
import PerfumeCard from '../componentes/PerfumeCard';

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  // Filters
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedFamily, setSelectedFamily] = useState(searchParams.get('family') || '');
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') || '');
  const [selectedIntensity, setSelectedIntensity] = useState('');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortBy, setSortBy] = useState('newest');

  const families = ['Floral', 'Oriental', 'Amadeirado', 'Cítrico', 'Aromático', 'Aquático', 'Frutado', 'Verde'];
  const intensities = ['Parfum', 'Eau de Parfum', 'Eau de Toilette', 'Eau de Cologne', 'Extrait'];

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (selectedFamily) params.append('family', selectedFamily);
    if (selectedBrand) params.append('brand', selectedBrand);
    if (search) params.append('search', search);

    const url = `/api/perfumes?${params.toString()}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setPerfumes(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedFamily, selectedBrand, search]);

  // Get unique brands from perfumes
  const brands = useMemo(() => {
    const uniqueBrands = [...new Set(perfumes.map(p => p.brand).filter(Boolean))];
    return uniqueBrands.sort();
  }, [perfumes]);

  // Filter and sort perfumes
  const filteredPerfumes = useMemo(() => {
    let filtered = [...perfumes];

    if (selectedIntensity) {
      filtered = filtered.filter(p => p.intensity === selectedIntensity);
    }

    filtered = filtered.filter(p => {
      const price = p.price || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-desc':
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'name':
        filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
    }

    return filtered;
  }, [perfumes, selectedIntensity, priceRange, sortBy]);

  const clearFilters = () => {
    setSearch('');
    setSelectedFamily('');
    setSelectedBrand('');
    setSelectedIntensity('');
    setPriceRange([0, 2000]);
    setSortBy('newest');
    setSearchParams({});
  };

  const activeFiltersCount = [
    search,
    selectedFamily,
    selectedBrand,
    selectedIntensity,
    priceRange[0] > 0 || priceRange[1] < 2000,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-12"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-amber-400 text-sm uppercase tracking-wider">Aura Parfum</span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mt-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Catálogo de Perfumes
              </h1>
              <p className="text-white/50 mt-2 flex items-center gap-2">
                {filteredPerfumes.length} fragrâncias • <Truck className="w-4 h-4 text-green-400" /> Entrega Sorocaba
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/5515998033593?text=Olá! Quero pedir um perfume. Vocês entregam em Sorocaba via 99?"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-green-500/30 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Pedir
              </a>
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-amber-500/30 transition-colors"
              >
                {viewMode === 'grid' ? (
                  <LayoutList className="w-5 h-5 text-white/60" />
                ) : (
                  <Grid3X3 className="w-5 h-5 text-white/60" />
                )}
              </button>
            </div>
          </div>

          {/* Search and Filter Toggle */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Buscar perfumes, marcas, notas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-500/50 focus:outline-none text-white placeholder-white/40 transition-colors"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition-colors ${
                showFilters || activeFiltersCount > 0
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                  : 'bg-white/5 border-white/10 text-white/60 hover:border-amber-500/30'
              }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filtros</span>
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-500 text-black text-xs font-bold flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </motion.div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-serif text-lg text-amber-400">Filtros</h3>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-white/60 hover:text-amber-400 transition-colors"
                    >
                      Limpar filtros
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Família Olfativa</label>
                    <div className="relative">
                      <select
                        value={selectedFamily}
                        onChange={(e) => setSelectedFamily(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-500/50 focus:outline-none text-white appearance-none cursor-pointer"
                      >
                        <option value="">Todas</option>
                        {families.map((family) => (
                          <option key={family} value={family}>{family}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">Marca</label>
                    <div className="relative">
                      <select
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-500/50 focus:outline-none text-white appearance-none cursor-pointer"
                      >
                        <option value="">Todas</option>
                        {brands.map((brand) => (
                          <option key={brand} value={brand}>{brand}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">Intensidade</label>
                    <div className="relative">
                      <select
                        value={selectedIntensity}
                        onChange={(e) => setSelectedIntensity(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-500/50 focus:outline-none text-white appearance-none cursor-pointer"
                      >
                        <option value="">Todas</option>
                        {intensities.map((intensity) => (
                          <option key={intensity} value={intensity}>{intensity}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">Ordenar por</label>
                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-500/50 focus:outline-none text-white appearance-none cursor-pointer"
                      >
                        <option value="newest">Mais recentes</option>
                        <option value="price-asc">Menor preço</option>
                        <option value="price-desc">Maior preço</option>
                        <option value="name">Nome A-Z</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm text-white/60 mb-4">
                    Faixa de preço: R$ {priceRange[0]} - R$ {priceRange[1]}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Filters Tags */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {search && (
              <button onClick={() => setSearch('')} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm">
                Busca: {search} <X className="w-3 h-3" />
              </button>
            )}
            {selectedFamily && (
              <button onClick={() => setSelectedFamily('')} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm">
                {selectedFamily} <X className="w-3 h-3" />
              </button>
            )}
            {selectedBrand && (
              <button onClick={() => setSelectedBrand('')} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm">
                {selectedBrand} <X className="w-3 h-3" />
              </button>
            )}
            {selectedIntensity && (
              <button onClick={() => setSelectedIntensity('')} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm">
                {selectedIntensity} <X className="w-3 h-3" />
              </button>
            )}
          </div>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : filteredPerfumes.length === 0 ? (
          <div className="text-center py-20">
            <Sparkles className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-serif text-white mb-2">Nenhum perfume encontrado</h3>
            <p className="text-white/50 mb-6">Fale no WhatsApp para consultar disponibilidade!</p>
            <a href="https://wa.me/5515998033593?text=Olá! Estou procurando um perfume específico" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20 transition-colors inline-flex items-center gap-2">
              <MessageCircle className="w-4 h-4" /> Chamar no WhatsApp
            </a>
          </div>
        ) : (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
            {filteredPerfumes.map((perfume, i) => (
              <PerfumeCard key={perfume.id} perfume={perfume} index={i} />
            ))}
          </div>
        )}

        {/* WhatsApp CTA */}
        <div className="mt-12 text-center">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Truck className="w-5 h-5 text-green-400" />
              <p className="text-green-400 font-medium">Entrega em Sorocaba via 99</p>
            </div>
            <p className="text-white/70 mb-4">Não encontrou? Fale no WhatsApp para pedir!</p>
            <a href="https://wa.me/5515998033593?text=Olá! Quero pedir um perfume" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:shadow-lg hover:shadow-green-500/30 transition-all">
              <MessageCircle className="w-5 h-5" /> Pedir via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}