import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Sparkles, Star, Zap, ChevronRight } from 'lucide-react';
import Navbar from './Navbar';
import products from '../data/products';
import { ShopContext } from '../context/ShopContext';
import { useToast } from '../context/ToastContext';

// Select 3 showcase hero products from products dataset
const heroProducts = [
  {
    ...products[0], // Nike Air Max Pulse Roam
    tagline: "NEXT-GEN URBAN UTILITY",
    accentColor: "from-teal-500/20 via-emerald-500/10 to-transparent",
    glowColor: "rgba(20, 184, 166, 0.25)",
    badge: "2026 FLAGSHIP",
  },
  {
    ...products[4], // Nike Air Max Scorpion Flyknit
    tagline: "POINT-LOADED CUSHIONING",
    accentColor: "from-cyan-500/20 via-blue-500/10 to-transparent",
    glowColor: "rgba(6, 182, 212, 0.25)",
    badge: "LIMITED EDITION",
  },
  {
    ...products[1], // Nike Air Max 270
    tagline: "BIG AIR INSTINCT",
    accentColor: "from-amber-500/20 via-orange-500/10 to-transparent",
    glowColor: "rgba(245, 158, 11, 0.25)",
    badge: "BESTSELLER",
  },
];

const Hero = () => {
  const [activeHero, setActiveHero] = useState(heroProducts[0]);
  const { addToCart } = useContext(ShopContext);
  const { addToast } = useToast();

  const handleQuickAdd = () => {
    addToCart(activeHero.id);
    addToast(`Added ${activeHero.name} to cart!`, 'success');
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-zinc-950 text-zinc-100">
      {/* Background Navbar */}
      <Navbar />

      {/* Dynamic Ambient Background Mesh Glow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeHero.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute top-1/4 right-10 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none bg-gradient-to-br ${activeHero.accentColor}`}
        />
      </AnimatePresence>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Large Background Model Watermark */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeHero.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 0.04, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 text-[18vw] font-black uppercase tracking-tighter text-white pointer-events-none whitespace-nowrap select-none"
        >
          {activeHero.category} FLOW
        </motion.div>
      </AnimatePresence>

      {/* Main Hero Content */}
      <div className="section-container relative z-10 py-12 md:py-20 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTA Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tagline Badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHero.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur-md shadow-sm"
              >
                <Sparkles size={14} className="text-brand animate-pulse" />
                <span className="text-xs font-bold tracking-widest uppercase text-brand">
                  {activeHero.badge}
                </span>
                <span className="w-1 h-1 rounded-full bg-zinc-600" />
                <span className="text-xs font-medium text-zinc-400">
                  {activeHero.tagline}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Title */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={activeHero.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight text-zinc-100 leading-[1.05]"
              >
                {activeHero.name}
              </motion.h1>
            </AnimatePresence>

            {/* Subtitle / Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={activeHero.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-zinc-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed"
              >
                {activeHero.description}
              </motion.p>
            </AnimatePresence>

            {/* Price & Primary CTAs */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHero.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
              >
                {/* Price tag */}
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-zinc-100">
                    ${activeHero.price.toFixed(2)}
                  </span>
                  {activeHero.originalPrice > activeHero.price && (
                    <span className="text-base text-zinc-500 line-through">
                      ${activeHero.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleQuickAdd}
                    className="btn-primary py-3.5 px-6 text-sm font-bold flex items-center gap-2 shadow-lg shadow-brand/20 hover:scale-[1.02] active:scale-95"
                  >
                    <ShoppingBag size={18} />
                    <span>Quick Add</span>
                  </button>

                  <Link
                    to={`/products/${activeHero.id}`}
                    className="btn-secondary py-3.5 px-6 text-sm font-bold flex items-center gap-2 hover:bg-zinc-800"
                  >
                    <span>View Product</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Key Performance Stats Bar */}
            <div className="pt-6 border-t border-zinc-800/80 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 text-left">
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Cushioning</p>
                <p className="text-sm font-bold text-zinc-200 mt-0.5">Air Max 360°</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Rating</p>
                <p className="text-sm font-bold text-amber-400 mt-0.5 flex items-center gap-1">
                  <Star size={13} className="fill-current" />
                  <span>{activeHero.rating} / 5.0</span>
                </p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Traction</p>
                <p className="text-sm font-bold text-zinc-200 mt-0.5">Multi-Surface</p>
              </div>
            </div>

          </div>

          {/* Right Column: Floating Interactive Shoe & Selector Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            
            {/* Main Levitation Showcase Frame */}
            <div className="relative w-full aspect-square max-w-[440px] flex items-center justify-center">
              
              {/* Radial Aura Ring */}
              <div className="absolute inset-0 rounded-full border border-zinc-800/60 bg-zinc-900/30 backdrop-blur-sm" />
              
              {/* Animated Floating Shoe Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeHero.id}
                  initial={{ opacity: 0, scale: 0.7, rotate: -15, y: 20 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: -12,
                    y: [0, -12, 0], // Smooth levitation animation loop
                  }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 10, y: -20 }}
                  transition={{
                    opacity: { duration: 0.4 },
                    scale: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                    rotate: { duration: 0.5 },
                    y: {
                      repeat: Infinity,
                      repeatType: 'mirror',
                      duration: 3.5,
                      ease: 'easeInOut',
                    },
                  }}
                  className="relative z-20 w-[90%] drop-shadow-[0_35px_35px_rgba(0,0,0,0.7)]"
                >
                  <img
                    src={activeHero.images[0]}
                    alt={activeHero.name}
                    className="w-full h-full object-contain pointer-events-none filter drop-shadow-2xl"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Shadow Base beneath levitating shoe */}
              <div className="absolute bottom-6 w-3/4 h-6 rounded-full bg-black/60 blur-md pointer-events-none" />
            </div>

            {/* Interactive Shoe Selector Pills */}
            <div className="flex items-center justify-center gap-3 pt-6 z-20">
              {heroProducts.map((item) => {
                const isActive = activeHero.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveHero(item)}
                    className={`relative rounded-2xl p-2 transition-all duration-300 flex items-center gap-3 border ${
                      isActive
                        ? 'bg-zinc-900 border-brand shadow-lg shadow-brand/10 scale-105'
                        : 'bg-zinc-900/50 border-zinc-800/80 hover:bg-zinc-800/80 opacity-70 hover:opacity-100'
                    }`}
                    aria-label={`Select ${item.name}`}
                  >
                    <div className="w-12 h-12 bg-zinc-950 rounded-xl p-1 overflow-hidden shrink-0 flex items-center justify-center">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="text-left pr-2 hidden sm:block">
                      <p className="text-xs font-bold text-zinc-200 line-clamp-1">{item.name}</p>
                      <p className="text-[11px] font-semibold text-brand">${item.price.toFixed(2)}</p>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
