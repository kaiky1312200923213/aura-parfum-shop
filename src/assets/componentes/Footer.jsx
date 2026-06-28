import { Link } from 'react-router-dom';
import { Sparkles, Instagram, MessageCircle, Heart, Mail, Truck, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-black via-zinc-950 to-black border-t border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                  Aura Parfum
                </span>
                <span className="text-[10px] text-amber-500/70 tracking-[0.3em] uppercase -mt-1">
                  Perfumaria de Luxo
                </span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-md mb-4">
              Descubra fragrâncias exclusivas com os melhores preços! 
              Entregamos em Sorocaba e região via 99. Fale no WhatsApp para pedir seu perfume!
            </p>
            <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
              <Truck className="w-4 h-4 text-green-400" />
              <span>Entrega via 99 em Sorocaba e região</span>
            </div>
            <div className="flex gap-4 mt-4">
              <a
                href="https://wa.me/5515998033593?text=Olá! Tenho interesse nas fragrâncias da Aura Parfum"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-green-400 hover:border-green-400/30 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/japaeikosan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-amber-400 hover:border-amber-400/30 transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:ja.pa.dri@hotmail.com"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-amber-400 hover:border-amber-400/30 transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif text-lg text-amber-400 mb-4">Navegação</h4>
            <ul className="space-y-2">
              {[
                { path: '/', label: 'Início' },
                { path: '/catalogo', label: 'Catálogo' },
                { path: '/colecoes', label: 'Coleções' },
                { path: '/sobre', label: 'Sobre Nós' },
                { path: '/contato', label: 'Contato' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-amber-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg text-amber-400 mb-4">Contato</h4>
            <ul className="space-y-3 text-sm">
              <li className="text-white/60">
                <span className="text-amber-400/80">WhatsApp:</span>
                <br />
                <a href="https://wa.me/5515998033593" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                  (15) 99803-3593
                </a>
              </li>
              <li className="text-white/60">
                <span className="text-amber-400/80">Instagram:</span>
                <br />
                <a href="https://instagram.com/japaeikosan" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                  @japaeikosan
                </a>
              </li>
              <li className="text-white/60">
                <span className="text-amber-400/80">Email:</span>
                <br />
                <a href="mailto:ja.pa.dri@hotmail.com" className="hover:text-amber-400 transition-colors">
                  ja.pa.dri@hotmail.com
                </a>
              </li>
              <li className="text-white/60 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-400" />
                <span>Sorocaba e região</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

        {/* Copyright */}
        <div className="pt-6 text-center">
          <p className="text-white/40 text-sm">
            © {currentYear} Kaiky Yoshio Ono Marins — Todos os direitos reservados
          </p>
          <p className="text-white/30 text-xs mt-2 flex items-center justify-center gap-1">
            Desenvolvido com <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> por Kaiky Yoshio Ono Marins
          </p>
        </div>
      </div>
    </footer>
  );
}