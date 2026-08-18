import React from 'react';
import Hero from '../components/Hero';
import products from '../data/products';
import ProductGrid from '../components/ProductGrid';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, RotateCcw, Zap } from 'lucide-react';

const HomePage = () => {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 8);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Showcase */}
      <Hero />

      {/* Feature Value Props Banner */}
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 lg:p-8">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-brand/10 text-brand border border-brand/20 shrink-0">
              <Truck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-zinc-100 text-sm">Free Express Delivery</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Complimentary shipping on all orders over $100</p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-zinc-800/80 pt-4 md:pt-0 md:pl-6">
            <div className="p-3.5 rounded-2xl bg-brand/10 text-brand border border-brand/20 shrink-0">
              <RotateCcw size={24} />
            </div>
            <div>
              <h4 className="font-bold text-zinc-100 text-sm">30-Day Hassle-Free Returns</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Love your shoes or get 100% full money back</p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-zinc-800/80 pt-4 md:pt-0 md:pl-6">
            <div className="p-3.5 rounded-2xl bg-brand/10 text-brand border border-brand/20 shrink-0">
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
        <div className="flex justify-between items-end">
          <div>
            <span className="uppercase text-xs font-bold text-brand tracking-widest block">Categories</span>
            <h2 className="text-3xl font-extrabold text-zinc-100 tracking-tight mt-1">Shop by Gender</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/products?category=men"
            className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-end transition-all duration-300 hover:border-brand"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-10" />
            <img
              src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3db2e706-40e9-4ee4-a87c-9b908f4f3db2/NIKE+AIR+MAX+PULSE+ROAM.png"
              alt="Men's collection"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
            />
            <div className="relative z-20 space-y-1">
              <h3 className="text-2xl font-black text-zinc-100 group-hover:text-brand transition-colors">Men's Collection</h3>
              <p className="text-xs text-zinc-400 flex items-center gap-1">
                <span>Explore Performance Footwear</span>
                <ArrowRight size={14} />
              </p>
            </div>
          </Link>

          <Link
            to="/products?category=women"
            className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-end transition-all duration-300 hover:border-brand"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-10" />
            <img
              src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/24d390b5-d2d2-443f-b545-59535c5b0cd6/W+NIKE+AIR+MAX+1.png"
              alt="Women's collection"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
            />
            <div className="relative z-20 space-y-1">
              <h3 className="text-2xl font-black text-zinc-100 group-hover:text-brand transition-colors">Women's Collection</h3>
              <p className="text-xs text-zinc-400 flex items-center gap-1">
                <span>Explore Style & Comfort</span>
                <ArrowRight size={14} />
              </p>
            </div>
          </Link>

          <Link
            to="/products?category=kid"
            className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-end transition-all duration-300 hover:border-brand"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-10" />
            <img
              src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b67bc122-804c-4902-8b91-b232acc55b5c/AIR+MAX+1+EASYON+%28TD%29.png"
              alt="Kids' collection"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
            />
            <div className="relative z-20 space-y-1">
              <h3 className="text-2xl font-black text-zinc-100 group-hover:text-brand transition-colors">Kids' Collection</h3>
              <p className="text-xs text-zinc-400 flex items-center gap-1">
                <span>Explore Playtime Ready</span>
                <ArrowRight size={14} />
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="section-container space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-1.5 text-brand text-xs font-bold uppercase tracking-widest">
              <Zap size={14} />
              <span>Handpicked Favorites</span>
            </div>
            <h2 className="text-3xl font-extrabold text-zinc-100 tracking-tight mt-1">
              Featured Footwear
            </h2>
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
