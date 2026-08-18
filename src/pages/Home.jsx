import Hero from '../components/Hero';
import products from '../data/products';
import ProductGrid from '../components/ProductGrid';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, RotateCcw, Zap } from 'lucide-react';

import TransparentImage from '../components/ui/TransparentImage';

const HomePage = () => {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 8);

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Showcase */}
      <Hero />

      {/* Feature Value Props Banner */}
      <div className="section-container">
        <div className="relative overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-6 bg-zinc-900/55 border border-white/10 rounded-3xl p-6 lg:p-8 shadow-2xl shadow-black/15">
          <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-brand/10 blur-3xl pointer-events-none" />
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-brand/10 text-brand border border-brand/20 shrink-0 shadow-lg shadow-brand/10">
              <Truck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-zinc-100 text-sm">Free Express Delivery</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Complimentary shipping on all orders over $100</p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-zinc-800/80 pt-4 md:pt-0 md:pl-6">
            <div className="p-3.5 rounded-2xl bg-brand/10 text-brand border border-brand/20 shrink-0 shadow-lg shadow-brand/10">
              <RotateCcw size={24} />
            </div>
            <div>
              <h4 className="font-bold text-zinc-100 text-sm">30-Day Hassle-Free Returns</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Love your shoes or get 100% full money back</p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-zinc-800/80 pt-4 md:pt-0 md:pl-6">
            <div className="p-3.5 rounded-2xl bg-brand/10 text-brand border border-brand/20 shrink-0 shadow-lg shadow-brand/10">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-zinc-100 text-sm">Authenticity Guaranteed</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Directly sourced premium craftsmanship</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Spotlight Cards */}
      <div className="section-container space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-3">
          <div>
            <span className="eyebrow block">Find your flow</span>
            <h2 className="section-heading mt-2">Shop by category</h2>
          </div>
          <Link to="/products" className="text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-brand transition-colors inline-flex items-center gap-1">
            Explore all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/products?category=men"
            className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-zinc-900/80 border border-white/10 p-6 flex flex-col justify-end transition-all duration-300 hover:border-brand/50 hover:-translate-y-1 shadow-xl shadow-black/10"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent z-10" />
            <TransparentImage
              src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3db2e706-40e9-4ee4-a87c-9b908f4f3db2/NIKE+AIR+MAX+PULSE+ROAM.png"
              alt="Men's collection"
              className="absolute inset-0 w-full h-full object-contain p-8 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500 opacity-80"
            />
            <div className="relative z-20 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">01 / Performance</span>
              <h3 className="text-2xl font-black text-zinc-100 group-hover:text-brand transition-colors">Men&apos;s collection</h3>
              <p className="text-xs text-zinc-400 flex items-center gap-1.5">
                <span>Explore Performance Footwear</span>
                <ArrowRight size={14} />
              </p>
            </div>
          </Link>

          <Link
            to="/products?category=women"
            className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-zinc-900/80 border border-white/10 p-6 flex flex-col justify-end transition-all duration-300 hover:border-brand/50 hover:-translate-y-1 shadow-xl shadow-black/10"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent z-10" />
            <TransparentImage
              src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/24d390b5-d2d2-443f-b545-59535c5b0cd6/W+NIKE+AIR+MAX+1.png"
              alt="Women's collection"
              className="absolute inset-0 w-full h-full object-contain p-8 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 opacity-80"
            />
            <div className="relative z-20 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">02 / Everyday</span>
              <h3 className="text-2xl font-black text-zinc-100 group-hover:text-brand transition-colors">Women&apos;s collection</h3>
              <p className="text-xs text-zinc-400 flex items-center gap-1.5">
                <span>Explore Style & Comfort</span>
                <ArrowRight size={14} />
              </p>
            </div>
          </Link>

          <Link
            to="/products?category=kid"
            className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-zinc-900/80 border border-white/10 p-6 flex flex-col justify-end transition-all duration-300 hover:border-brand/50 hover:-translate-y-1 shadow-xl shadow-black/10"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent z-10" />
            <TransparentImage
              src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b67bc122-804c-4902-8b91-b232acc55b5c/AIR+MAX+1+EASYON+%28TD%29.png"
              alt="Kids' collection"
              className="absolute inset-0 w-full h-full object-contain p-8 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500 opacity-80"
            />
            <div className="relative z-20 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">03 / Play</span>
              <h3 className="text-2xl font-black text-zinc-100 group-hover:text-brand transition-colors">Kids&apos; collection</h3>
              <p className="text-xs text-zinc-400 flex items-center gap-1.5">
                <span>Explore Playtime Ready</span>
                <ArrowRight size={14} />
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="section-container space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-1.5 text-brand text-xs font-bold uppercase tracking-widest">
              <Zap size={14} />
              <span>Handpicked Favorites</span>
            </div>
            <h2 className="section-heading mt-2">
              Featured Footwear
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-md">The pairs our community is reaching for right now.</p>
          </div>
          <Link
            to="/products"
            className="btn-secondary text-xs font-bold px-4 py-2 flex items-center gap-2"
          >
            <span>View All Products</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <ProductGrid products={featuredProducts} />
      </div>
    </div>
  );
};

export default HomePage;
