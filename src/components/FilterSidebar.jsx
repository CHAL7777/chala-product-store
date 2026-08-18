import React from 'react';
import { SlidersHorizontal, RotateCcw, Check, Star } from 'lucide-react';

const FilterSidebar = ({
  category,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  rating,
  onRatingChange,
  inStockOnly,
  onInStockChange,
  activeCount,
  onReset,
}) => {
  const categories = [
    { label: 'All Categories', value: 'all' },
    { label: "Men's Shoes", value: 'men' },
    { label: "Women's Shoes", value: 'women' },
    { label: "Kids' Shoes", value: 'kid' },
  ];

  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under $50', value: 'under50' },
    { label: '$50 to $100', value: '50to100' },
    { label: '$100 to $150', value: '100to150' },
    { label: 'Over $150', value: 'over150' },
  ];

  const ratings = [
    { label: 'All Ratings', value: 0 },
    { label: '4.5★ & Above', value: 4.5 },
    { label: '4.0★ & Above', value: 4.0 },
  ];

  return (
    <aside className="w-full bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2 text-zinc-100 font-semibold text-base">
          <SlidersHorizontal size={18} className="text-brand" />
          <span>Filters</span>
          {activeCount > 0 && (
            <span className="bg-brand text-zinc-950 text-xs px-2 py-0.5 rounded-full font-bold">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={onReset}
            className="text-xs font-medium text-zinc-400 hover:text-brand flex items-center gap-1 transition-colors"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Category</h4>
        <div className="flex flex-wrap md:flex-col gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => onCategoryChange(cat.value)}
              className={`text-left text-xs font-medium px-3 py-2 rounded-lg transition-all flex items-center justify-between ${
                category === cat.value
                  ? 'bg-brand/10 text-brand border border-brand/30'
                  : 'text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100'
              }`}
            >
              <span>{cat.label}</span>
              {category === cat.value && <Check size={14} />}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3 pt-4 border-t border-zinc-800/80">
        <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Price Range</h4>
        <div className="flex flex-wrap md:flex-col gap-2">
          {priceRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => onPriceRangeChange(range.value)}
              className={`text-left text-xs font-medium px-3 py-2 rounded-lg transition-all flex items-center justify-between ${
                priceRange === range.value
                  ? 'bg-brand/10 text-brand border border-brand/30'
                  : 'text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100'
              }`}
            >
              <span>{range.label}</span>
              {priceRange === range.value && <Check size={14} />}
            </button>
          ))}
        </div>
      </div>

      {/* Minimum Rating Filter */}
      <div className="space-y-3 pt-4 border-t border-zinc-800/80">
        <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Rating</h4>
        <div className="flex flex-wrap md:flex-col gap-2">
          {ratings.map((rate) => (
            <button
              key={rate.value}
              onClick={() => onRatingChange(rate.value)}
              className={`text-left text-xs font-medium px-3 py-2 rounded-lg transition-all flex items-center justify-between ${
                rating === rate.value
                  ? 'bg-brand/10 text-brand border border-brand/30'
                  : 'text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100'
              }`}
            >
              <div className="flex items-center gap-1">
                {rate.value > 0 && <Star size={12} className="text-amber-400 fill-current" />}
                <span>{rate.label}</span>
              </div>
              {rating === rate.value && <Check size={14} />}
            </button>
          ))}
        </div>
      </div>

      {/* In Stock Only Checkbox */}
      <div className="pt-4 border-t border-zinc-800/80">
        <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-zinc-300 hover:text-zinc-100">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onInStockChange(e.target.checked)}
            className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-brand focus:ring-brand accent-brand"
          />
          <span>In Stock Only</span>
        </label>
      </div>
    </aside>
  );
};

export default FilterSidebar;
