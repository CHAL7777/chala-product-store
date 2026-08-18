import React, { useState } from 'react';
import { CheckCircle2, Shield, Sparkles } from 'lucide-react';

const Description = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 lg:p-8 space-y-6">
      {/* Tabs Header */}
      <div className="flex border-b border-zinc-800 gap-6">
        <button
          onClick={() => setActiveTab('description')}
          className={`pb-3 text-sm font-bold transition-all relative ${
            activeTab === 'description'
              ? 'text-brand border-b-2 border-brand'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Description & Specs
        </button>
        <button
          onClick={() => setActiveTab('shipping')}
          className={`pb-3 text-sm font-bold transition-all relative ${
            activeTab === 'shipping'
              ? 'text-brand border-b-2 border-brand'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Delivery & Returns
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'description' ? (
        <div className="space-y-6 text-sm text-zinc-300 leading-relaxed">
          <p>
            {product?.description ||
              "Designed for all-day comfort and engineered to withstand the demands of athletic performance. Featuring advanced heel cushioning and breathable mesh overlays."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-zinc-800/80">
            <div className="flex items-start gap-3">
              <Sparkles size={18} className="text-brand shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-zinc-100 mb-1">Max Cushioning & Response</h4>
                <p className="text-xs text-zinc-400">Point-loaded air technology delivers maximum bounce with every stride.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield size={18} className="text-brand shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-zinc-100 mb-1">Engineered Durability</h4>
                <p className="text-xs text-zinc-400">Multi-surface rubber waffle tread outsole provides exceptional grip.</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4 text-sm text-zinc-300 leading-relaxed">
          <h4 className="font-bold text-zinc-100">Standard Shipping & Easy Returns</h4>
          <ul className="space-y-2 text-xs text-zinc-400">
            <li className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-brand" />
              <span>Standard delivery: 2-4 business days ($4.99 or free over $100)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-brand" />
              <span>Express delivery: 1-2 business days ($12.99)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-brand" />
              <span>30-day return policy for unused items in original packaging</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Description;
