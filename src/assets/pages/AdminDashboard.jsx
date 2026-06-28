import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Plus, Edit3, Trash2, Search, X, Upload, Save, Image, BarChart3, Package, TrendingUp, Users, ChevronDown, Eye, EyeOff, LogOut, Settings, CheckCircle2, AlertCircle, Star, Video, Film } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import supabase from '../lib/supabase';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [perfumes, setPerfumes] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPerfume, setEditingPerfume] = useState(null);
  const [search, setSearch] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const fileInputRef = useRef(null);
  const fileInput2Ref = useRef(null);
  const videoInputRef = useRef(null);

  const [heroVideo, setHeroVideo] = useState('');
  const [videoUploading, setVideoUploading] = useState(false);
  const [videoMessage, setVideoMessage] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    description: '',
    price: '',
    original_price: '',
    olfactory_family: '',
    intensity: '',
    top_notes: '',
    heart_notes: '',
    base_notes: '',
    image_url: '',
    image_url_secondary: '',
    stock: 10,
    featured: false,
    story: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [perfumesRes, statsRes, videoRes] = await Promise.all([
        fetch('/api/perfumes'),
        fetch('/api/stats'),
        fetch('/api/site-video'),
      ]);
      const perfumesData = await perfumesRes.json();
      const statsData = await statsRes.json();
      const videoData = await videoRes.json();
      setPerfumes(perfumesData);
      setStats(statsData);
      setHeroVideo(videoData.videoUrl || '');
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Nome é obrigatório';
    if (!formData.brand.trim()) errors.brand = 'Marca é obrigatória';
    if (!formData.description.trim()) errors.description = 'Descrição é obrigatória';
    if (!formData.price || parseFloat(formData.price) <= 0) errors.price = 'Preço inválido';
    if (!formData.olfactory_family.trim()) errors.olfactory_family = 'Família olfativa é obrigatória';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleImageUpload = async (e, field = 'image_url') => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result.split(',')[1];
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: file.name,
            fileBase64: base64,
            contentType: file.type,
          }),
        });
        const { url } = await res.json();
        setFormData(prev => ({ ...prev, [field]: url }));
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      setVideoMessage('Selecione um arquivo de vídeo válido (MP4, WebM, etc.)');
      return;
    }

    setVideoUploading(true);
    setVideoMessage('');

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result.split(',')[1];
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: file.name,
            fileBase64: base64,
            contentType: file.type,
            bucket: 'videos',
            folder: 'hero',
          }),
        });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.error || 'Falha no upload');

        const saveRes = await fetch('/api/site-video', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ videoUrl: uploadData.url }),
        });
        const saveData = await saveRes.json();
        if (!saveRes.ok) throw new Error(saveData.error || 'Falha ao salvar vídeo');

        setHeroVideo(saveData.videoUrl);
        setVideoMessage('Vídeo publicado no site com sucesso!');
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setVideoMessage(err.message || 'Erro ao enviar vídeo');
    } finally {
      setVideoUploading(false);
      if (videoInputRef.current) videoInputRef.current.value = '';
    }
  };

  const handleRemoveVideo = async () => {
    if (!confirm('Remover o vídeo da página inicial?')) return;
    setVideoUploading(true);
    setVideoMessage('');
    try {
      const res = await fetch('/api/site-video', { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Falha ao remover vídeo');
      setHeroVideo('');
      setVideoMessage('Vídeo removido do site.');
    } catch (err) {
      setVideoMessage(err.message || 'Erro ao remover vídeo');
    } finally {
      setVideoUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        original_price: formData.original_price ? parseFloat(formData.original_price) : null,
        stock: parseInt(formData.stock) || 0,
      };

      if (editingPerfume) {
        await fetch(`/api/perfumes/${editingPerfume.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch('/api/perfumes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      setShowConfetti(true);
      setFormSuccess(true);
      setTimeout(() => {
        setShowConfetti(false);
        setShowForm(false);
        setEditingPerfume(null);
        setFormSuccess(false);
        resetForm();
        fetchData();
      }, 2000);
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  const handleEdit = (perfume) => {
    setEditingPerfume(perfume);
    setFormData({
      name: perfume.name || '',
      brand: perfume.brand || '',
      description: perfume.description || '',
      price: perfume.price?.toString() || '',
      original_price: perfume.original_price?.toString() || '',
      olfactory_family: perfume.olfactory_family || '',
      intensity: perfume.intensity || '',
      top_notes: perfume.top_notes || '',
      heart_notes: perfume.heart_notes || '',
      base_notes: perfume.base_notes || '',
      image_url: perfume.image_url || '',
      image_url_secondary: perfume.image_url_secondary || '',
      stock: perfume.stock || 10,
      featured: perfume.featured || false,
      story: perfume.story || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este perfume?')) return;
    try {
      await fetch(`/api/perfumes/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      fetchData();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '', brand: '', description: '', price: '', original_price: '',
      olfactory_family: '', intensity: '', top_notes: '', heart_notes: '', base_notes: '',
      image_url: '', image_url_secondary: '', stock: 10, featured: false, story: '',
    });
    setFormErrors({});
  };

  const filteredPerfumes = perfumes.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.brand?.toLowerCase().includes(search.toLowerCase())
  );

  const families = ['Floral', 'Oriental', 'Amadeirado', 'Cítrico', 'Aromático', 'Aquático', 'Frutado', 'Verde'];
  const intensities = ['Parfum', 'Eau de Parfum', 'Eau de Toilette', 'Eau de Cologne', 'Extrait'];
  const brands = ['O Boticário', 'Natura', 'Chanel', 'Dior', 'Tom Ford', 'Versace', 'YSL', 'Armani', 'Lancôme', 'Givenchy'];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-hidden pointer-events-none"
          >
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -20,
                  rotate: 0,
                }}
                animate={{
                  y: window.innerHeight + 20,
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: Math.random() * 0.5,
                }}
                className={`w-3 h-3 rounded-full ${
                  i % 3 === 0 ? 'bg-amber-400' : i % 3 === 1 ? 'bg-rose-400' : 'bg-purple-400'
                }`}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
                  <Sparkles className="w-5 h-5 text-black" />
                </div>
                <div>
                  <span className="font-serif text-xl font-bold bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                    Aura Parfum Admin
                  </span>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/" className="text-sm text-white/60 hover:text-amber-400 transition-colors">
                Ver Site
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-rose-400 hover:border-rose-400/30 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/10 border border-amber-500/20"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Package className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <p className="text-white/50 text-sm">Total Perfumes</p>
                <p className="text-2xl font-bold text-amber-400">
                  {stats?.totalPerfumes || 0}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-white/50 text-sm">Destacados</p>
                <p className="text-2xl font-bold text-purple-400">
                  {stats?.featuredPerfumes || 0}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-white/50 text-sm">Em Stock</p>
                <p className="text-2xl font-bold text-green-400">
                  {stats?.inStock || 0}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-rose-500/10 to-rose-600/10 border border-rose-500/20"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-rose-400" />
              </div>
              <div>
                <p className="text-white/50 text-sm">Marcas</p>
                <p className="text-2xl font-bold text-rose-400">
                  {stats?.uniqueBrands || 0}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Hero Video Manager */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-600/10 border border-indigo-500/20"
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                  <Video className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-lg font-serif font-bold text-white">Vídeo da Página Inicial</h2>
                  <p className="text-white/50 text-sm">Somente admin — este vídeo aparece na home do site</p>
                </div>
              </div>

              {videoMessage && (
                <p className={`text-sm mt-3 ${videoMessage.includes('sucesso') || videoMessage.includes('removido') ? 'text-green-400' : 'text-rose-400'}`}>
                  {videoMessage}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => videoInputRef.current?.click()}
                disabled={videoUploading}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {videoUploading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    {heroVideo ? 'Trocar Vídeo' : 'Enviar Vídeo'}
                  </>
                )}
              </button>
              {heroVideo && (
                <button
                  type="button"
                  onClick={handleRemoveVideo}
                  disabled={videoUploading}
                  className="px-5 py-3 rounded-xl border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 transition-colors disabled:opacity-50"
                >
                  Remover
                </button>
              )}
              <input
                ref={videoInputRef}
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="hidden"
              />
            </div>
          </div>

          {heroVideo && (
            <div className="mt-6 rounded-xl overflow-hidden border border-white/10 bg-black/40">
              <video
                src={heroVideo}
                controls
                className="w-full max-h-80 object-cover"
              />
            </div>
          )}
        </motion.div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Buscar perfumes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-500/50 focus:outline-none text-white placeholder-white/40 transition-colors"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => { setShowForm(true); setEditingPerfume(null); resetForm(); }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Novo Perfume
          </motion.button>
        </div>

        {/* Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-2xl bg-gradient-to-br from-zinc-900 to-black rounded-2xl border border-white/10 overflow-hidden"
              >
                {/* Form Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                  <h2 className="text-xl font-serif font-bold text-white">
                    {editingPerfume ? 'Editar Perfume' : 'Novo Perfume'}
                  </h2>
                  <button
                    onClick={() => { setShowForm(false); setEditingPerfume(null); resetForm(); }}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5 text-white/60" />
                  </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                  {/* Success Message */}
                  {formSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                      <span className="text-green-400">Perfume salvo com sucesso!</span>
                    </motion.div>
                  )}

                  {/* Image Upload */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Imagem Principal</label>
                      <div className="relative">
                        {formData.image_url ? (
                          <div className="relative aspect-square rounded-xl overflow-hidden border border-white/10">
                            <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, image_url: '' }))}
                              className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white hover:bg-rose-500/50"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full aspect-square rounded-xl border border-dashed border-white/20 hover:border-amber-500/50 transition-colors flex flex-col items-center justify-center gap-2"
                          >
                            <Upload className="w-8 h-8 text-white/40" />
                            <span className="text-sm text-white/40">Upload</span>
                          </button>
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'image_url')}
                          className="hidden"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Imagem Secundária</label>
                      <div className="relative">
                        {formData.image_url_secondary ? (
                          <div className="relative aspect-square rounded-xl overflow-hidden border border-white/10">
                            <img src={formData.image_url_secondary} alt="Preview" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, image_url_secondary: '' }))}
                              className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white hover:bg-rose-500/50"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => fileInput2Ref.current?.click()}
                            className="w-full aspect-square rounded-xl border border-dashed border-white/20 hover:border-amber-500/50 transition-colors flex flex-col items-center justify-center gap-2"
                          >
                            <Image className="w-8 h-8 text-white/40" />
                            <span className="text-sm text-white/40">Upload</span>
                          </button>
                        )}
                        <input
                          ref={fileInput2Ref}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'image_url_secondary')}
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Basic Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Nome *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${formErrors.name ? 'border-rose-500/50' : 'border-white/10'} focus:border-amber-500/50 focus:outline-none text-white transition-colors`}
                      />
                      {formErrors.name && <p className="text-rose-400 text-xs mt-1">{formErrors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Marca *</label>
                      <select
                        value={formData.brand}
                        onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                        className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${formErrors.brand ? 'border-rose-500/50' : 'border-white/10'} focus:border-amber-500/50 focus:outline-none text-white transition-colors appearance-none`}
                      >
                        <option value="">Selecione...</option>
                        {brands.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                      {formErrors.brand && <p className="text-rose-400 text-xs mt-1">{formErrors.brand}</p>}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Descrição *</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${formErrors.description ? 'border-rose-500/50' : 'border-white/10'} focus:border-amber-500/50 focus:outline-none text-white resize-none transition-colors`}
                    />
                    {formErrors.description && <p className="text-rose-400 text-xs mt-1">{formErrors.description}</p>}
                  </div>

                  {/* Story */}
                  <div>
                    <label className="block text-sm text-white/60 mb-2">História / Storytelling</label>
                    <textarea
                      value={formData.story}
                      onChange={(e) => setFormData(prev => ({ ...prev, story: e.target.value }))}
                      rows={2}
                      placeholder="Uma breve história sobre a fragrância..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-500/50 focus:outline-none text-white resize-none transition-colors placeholder-white/30"
                    />
                  </div>

                  {/* Prices */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Preço (R$) *</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                        className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${formErrors.price ? 'border-rose-500/50' : 'border-white/10'} focus:border-amber-500/50 focus:outline-none text-white transition-colors`}
                      />
                      {formErrors.price && <p className="text-rose-400 text-xs mt-1">{formErrors.price}</p>}
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Preço Original (R$)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.original_price}
                        onChange={(e) => setFormData(prev => ({ ...prev, original_price: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-500/50 focus:outline-none text-white transition-colors"
                      />
                    </div>
                  </div>

                  {/* Family & Intensity */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Família Olfativa *</label>
                      <select
                        value={formData.olfactory_family}
                        onChange={(e) => setFormData(prev => ({ ...prev, olfactory_family: e.target.value }))}
                        className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${formErrors.olfactory_family ? 'border-rose-500/50' : 'border-white/10'} focus:border-amber-500/50 focus:outline-none text-white transition-colors appearance-none`}
                      >
                        <option value="">Selecione...</option>
                        {families.map(f => <option key={f} value={f}>{f}</option>)}
                      </select>
                      {formErrors.olfactory_family && <p className="text-rose-400 text-xs mt-1">{formErrors.olfatory_family}</p>}
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Intensidade</label>
                      <select
                        value={formData.intensity}
                        onChange={(e) => setFormData(prev => ({ ...prev, intensity: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-500/50 focus:outline-none text-white transition-colors appearance-none"
                      >
                        <option value="">Selecione...</option>
                        {intensities.map(i => <option key={i} value={i}>{i}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Olfactory Notes */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-white/80">Notas Olfativas</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs text-cyan-400 mb-2">Notas de Saída</label>
                        <input
                          type="text"
                          value={formData.top_notes}
                          onChange={(e) => setFormData(prev => ({ ...prev, top_notes: e.target.value }))}
                          placeholder="Limão, Bergamota..."
                          className="w-full px-3 py-2 rounded-lg bg-cyan-500/5 border border-cyan-500/20 focus:border-cyan-500/50 focus:outline-none text-white text-sm transition-colors placeholder-white/30"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-rose-400 mb-2">Notas de Coração</label>
                        <input
                          type="text"
                          value={formData.heart_notes}
                          onChange={(e) => setFormData(prev => ({ ...prev, heart_notes: e.target.value }))}
                          placeholder="Rosa, Jasmim..."
                          className="w-full px-3 py-2 rounded-lg bg-rose-500/5 border border-rose-500/20 focus:border-rose-500/50 focus:outline-none text-white text-sm transition-colors placeholder-white/30"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-amber-400 mb-2">Notas de Fundo</label>
                        <input
                          type="text"
                          value={formData.base_notes}
                          onChange={(e) => setFormData(prev => ({ ...prev, base_notes: e.target.value }))}
                          placeholder="Amber, Musk..."
                          className="w-full px-3 py-2 rounded-lg bg-amber-500/5 border border-amber-500/20 focus:border-amber-500/50 focus:outline-none text-white text-sm transition-colors placeholder-white/30"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Stock & Featured */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Stock</label>
                      <input
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-500/50 focus:outline-none text-white transition-colors"
                      />
                    </div>
                    <div className="flex items-center gap-3 pt-6">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                        className="w-5 h-5 rounded bg-white/5 border border-white/20 accent-amber-500"
                      />
                      <label className="text-sm text-white/60">Destacar na Home</label>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => { setShowForm(false); setEditingPerfume(null); resetForm(); }}
                      className="flex-1 py-3 rounded-xl border border-white/10 text-white/60 hover:bg-white/5 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={uploading}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {uploading ? (
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          Salvar
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Perfumes Table */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[4/3] rounded-xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : filteredPerfumes.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <p className="text-white/50">Nenhum perfume encontrado</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredPerfumes.map((perfume, i) => (
              <motion.div
                key={perfume.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all"
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={perfume.image_url || 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300'}
                    alt={perfume.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-amber-400/80 text-xs uppercase tracking-wider">{perfume.brand}</p>
                  <h3 className="font-serif text-lg text-white mt-1 line-clamp-1">{perfume.name}</h3>
                  <p className="text-white/50 text-sm mt-1">{perfume.olfactory_family}</p>
                  <p className="text-amber-400 font-bold mt-2">R$ {perfume.price?.toFixed(2).replace('.', ',')}</p>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <Link
                      to={`/perfume/${perfume.id}`}
                      className="flex-1 py-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-amber-400 hover:border-amber-400/30 transition-colors flex items-center justify-center gap-1 text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      Ver
                    </Link>
                    <button
                      onClick={() => handleEdit(perfume)}
                      className="flex-1 py-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-purple-400 hover:border-purple-400/30 transition-colors flex items-center justify-center gap-1 text-sm"
                    >
                      <Edit3 className="w-4 h-4" />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(perfume.id)}
                      className="py-2 px-3 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-rose-400 hover:border-rose-400/30 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Featured Badge */}
                {perfume.featured && (
                  <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-amber-500 text-black text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-black" />
                    Destaque
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center">
        <p className="text-white/40 text-sm">© 2025 Kaiky Yoshio Ono Marins — Todos os direitos reservados</p>
        <p className="text-white/30 text-xs mt-2">Desenvolvido com ❤️ por Kaiky Yoshio Ono Marins</p>
      </footer>
    </div>
  );
}