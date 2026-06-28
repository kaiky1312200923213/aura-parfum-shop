import { motion } from 'framer-motion';
import { MessageCircle, Truck, Phone } from 'lucide-react';
import { useState } from 'react';

export default function WhatsAppButton() {
  const [showModal, setShowModal] = useState(false);
  const phoneNumber = '5515998033593';
  const displayNumber = '(15) 99803-3593';
  const message = 'Olá! Tenho interesse nas fragrâncias da Aura Parfum. Vocês entregam em Sorocaba?';

  const handleWhatsApp = () => {
    // Try wa.me first (works on most devices)
    const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // For mobile, try to open WhatsApp app directly
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      // Try WhatsApp app URI scheme
      const waAppLink = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
      window.location.href = waAppLink;
      
      // Fallback after 2 seconds if app not installed
      setTimeout(() => {
        window.open(waLink, '_blank');
      }, 2000);
    } else {
      // Desktop - open wa.me
      window.open(waLink, '_blank');
    }
  };

  return (
    <>
      <motion.button
        onClick={handleWhatsApp}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-shadow cursor-pointer"
      >
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-white" />
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, repeat: Infinity, repeatDelay: 3, duration: 0.3 }}
          className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full"
        />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute -top-10 right-0 px-3 py-1 rounded-full bg-amber-500 text-black text-xs font-semibold whitespace-nowrap flex items-center gap-1"
        >
          <Truck className="w-3 h-3" />
          Entrega Sorocaba!
        </motion.span>
      </motion.button>

      {/* Phone number display for accessibility */}
      <div className="fixed bottom-6 left-6 z-50 px-4 py-2 rounded-full bg-black/80 backdrop-blur-sm border border-white/10 text-white/80 text-sm hidden sm:flex items-center gap-2">
        <Phone className="w-4 h-4 text-green-400" />
        <span>{displayNumber}</span>
      </div>
    </>
  );
}