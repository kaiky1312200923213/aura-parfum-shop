import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export default function LanguageSelector({ currentLang = 'pt', onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(l => l.code === currentLang) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all"
      >
        <Globe className="w-4 h-4 text-amber-400" />
        <span className="text-sm">{currentLanguage.flag}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 mt-2 py-2 rounded-xl bg-zinc-900 border border-white/10 shadow-xl overflow-hidden z-50"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  onChange(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 flex items-center gap-3 hover:bg-white/5 transition-colors ${
                  currentLang === lang.code ? 'bg-amber-500/10' : ''
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="text-sm text-white">{lang.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}