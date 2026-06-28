import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Início' },
    { path: '/catalogo', label: 'Catálogo' },
    { path: '/colecoes', label: 'Coleções' },
    { path: '/sobre', label: 'Sobre' },
    { path: '/contato', label: 'Contato' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-xl border-b border-amber-500/20 shadow-lg shadow-amber-500/5'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30"
            >
              <Sparkles className="w-5 h-5 text-black" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                Aura Parfum
              </span>
              <span className="text-[10px] text-amber-500/70 tracking-[0.3em] uppercase -mt-1 hidden sm:block">
                Perfumaria de Luxo
              </span>
            </div>
          </Link>
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium tracking-wide transition-colors ${
                  location.pathname === link.path
                    ? 'text-amber-400'
                    : 'text-white/70 hover:text-amber-400'
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-rose-400"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {user && user.email === 'kaikyono@gmail.com' && (
              <Link
                to="/admin"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/20 to-rose-600/20 border border-purple-500/30 text-purple-300 hover:border-purple-400/50 transition-all text-sm"
              >
                <User className="w-4 h-4" />
                <span>Admin</span>
              </Link>
            )}
            <Link
              to="/catalogo"
              className="hidden sm:block px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold text-sm hover:shadow-lg hover:shadow-amber-500/30 transition-all hover:scale-105"
            >
              Explorar
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-amber-400 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2 border-t border-white/10">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition-colors ${
                      location.pathname === link.path
                        ? 'bg-amber-500/10 text-amber-400'
                        : 'text-white/70 hover:bg-white/5 hover:text-amber-400'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  {user && user.email === 'kaikyono@gmail.com' && (
                    <Link
                      to="/admin"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 rounded-lg bg-purple-500/10 text-purple-300"
                    >
                      <User className="w-4 h-4" />
                      <span>Painel Admin</span>
                    </Link>
                  )}
                  <Link
                    to="/catalogo"
                    onClick={() => setIsOpen(false)}
                    className="block text-center px-4 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold"
                  >
                    Explorar Coleção
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
