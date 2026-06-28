import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Lock, Mail, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import supabase from '../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  // If already logged in as admin, redirect to admin
  if (user && user.email === 'kaikyono@gmail.com') {
    navigate('/admin');
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (typeof supabase.auth?.signInWithPassword !== 'function') {
        setError('Login por senha indisponível. Verifique a configuração do Supabase e atualize a página.');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Check if user is admin
      if (data.user?.email !== 'kaikyono@gmail.com') {
        setError('Acesso restrito. Este painel é exclusivo para Kaiky Yoshio Ono Marins.');
        await supabase.auth.signOut();
        setLoading(false);
        return;
      }

      navigate('/admin');
    } catch (err) {
      const message = err.message || 'Erro ao fazer login. Verifique suas credenciais.';
      if (/invalid api key/i.test(message)) {
        setError('Chave da API do Supabase inválida. Verifique VITE_SUPABASE_ANON_KEY no arquivo .env e reinicie o servidor.');
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Back Link */}
        <Link
          to="/"
          className="absolute -top-12 left-0 flex items-center gap-2 text-white/60 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Voltar ao site</span>
        </Link>

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30 mb-4">
            <Sparkles className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-2xl font-serif font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
            Aura Parfum
          </h1>
          <p className="text-white/50 text-sm mt-2">Painel Administrativo</p>
        </div>

        {/* Login Form */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-xl">
          <div className="text-center mb-6">
            <div className="w-12 h-12 mx-auto rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-3">
              <Lock className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-lg font-serif text-white">Acesso Exclusivo</h2>
            <p className="text-white/50 text-sm mt-1">
              Este painel é restrito para Kaiky Yoshio Ono Marins
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm text-white/60 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-500/50 focus:outline-none text-white placeholder-white/40 transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-white/60 mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-500/50 focus:outline-none text-white placeholder-white/40 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold text-lg hover:shadow-2xl hover:shadow-amber-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                'Entrar'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white/40 text-xs">
          <p>© 2025 Kaiky Yoshio Ono Marins</p>
          <p className="mt-1">Desenvolvido com ❤️ por Kaiky Yoshio Ono Marins</p>
        </div>
      </motion.div>
    </div>
  );
}