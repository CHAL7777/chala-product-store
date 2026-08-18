import { useState } from 'react';
import { CheckCircle2, Shield, Sparkles, Truck, RotateCcw } from 'lucide-react';

const Description = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="relative overflow-hidden bg-zinc-900/55 border border-white/10 rounded-3xl p-5 sm:p-6 lg:p-8 space-y-6 shadow-2xl shadow-black/15">
      <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-brand/10 blur-3xl pointer-events-none" />
      {/* Tabs Header */}
      <div className="relative flex border-b border-white/10 gap-2 sm:gap-6" role="tablist" aria-label="Product information">
        <button
          onClick={() => setActiveTab('description')}
          role="tab"
          aria-selected={activeTab === 'description'}
          className={`pb-3 text-sm font-bold transition-all relative ${
            activeTab === 'description'
              ? 'text-brand after:absolute after:-bottom-px after:left-0 after:right-0 after:h-0.5 after:bg-brand'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <span className="px-2">Description & specs</span>
        </button>
        <button
          onClick={() => setActiveTab('shipping')}
          role="tab"
          aria-selected={activeTab === 'shipping'}
          className={`pb-3 text-sm font-bold transition-all relative ${
            activeTab === 'shipping'
              ? 'text-brand after:absolute after:-bottom-px after:left-0 after:right-0 after:h-0.5 after:bg-brand'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <span className="px-2">Delivery & returns</span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'description' ? (
        <div className="relative space-y-6 text-sm text-zinc-300 leading-relaxed" role="tabpanel">
          <p>
            {product?.description ||
              "Designed for all-day comfort and engineered to withstand the demands of athletic performance. Featuring responsive cushioning and breathable mesh overlays."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t border-white/10">
            <div className="rounded-2xl bg-white/[0.035] border border-white/5 p-4 flex items-start gap-3">
              <Sparkles size={18} className="text-brand shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h4 className="font-semibold text-zinc-100 mb-1">Responsive cushioning</h4>
                <p className="text-xs text-zinc-400">Lightweight comfort that keeps every stride feeling fresh.</p>
              </div>
            </div>
            <div className="rounded-2xl bg-white/[0.035] border border-white/5 p-4 flex items-start gap-3">
              <Shield size={18} className="text-brand shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h4 className="font-semibold text-zinc-100 mb-1">Built to go further</h4>
                <p className="text-xs text-zinc-400">Durable traction gives you confident grip across every surface.</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative space-y-5 text-sm text-zinc-300 leading-relaxed" role="tabpanel">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-3 rounded-2xl bg-white/[0.035] border border-white/5 p-4">
              <Truck size={20} className="text-brand" aria-hidden="true" />
              <div>
                <h4 className="font-bold text-zinc-100 text-sm">Fast delivery</h4>
                <p className="text-xs text-zinc-500 mt-0.5">Free over $100</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-white/[0.035] border border-white/5 p-4">
              <RotateCcw size={20} className="text-brand" aria-hidden="true" />
              <div>
                <h4 className="font-bold text-zinc-100 text-sm">Easy returns</h4>
                <p className="text-xs text-zinc-500 mt-0.5">30 days, no stress</p>
              </div>
            </div>
          </div>
          <h4 className="font-bold text-zinc-100">Standard shipping & easy returns</h4>
          <ul className="space-y-3 text-xs text-zinc-400">
            <li className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-brand shrink-0" aria-hidden="true" />
              <span>Standard delivery: 2-4 business days ($4.99 or free over $100)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-brand shrink-0" aria-hidden="true" />
              <span>Express delivery: 1-2 business days ($12.99)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-brand shrink-0" aria-hidden="true" />
              <span>30-day return policy for unused items in original packaging</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Description;
