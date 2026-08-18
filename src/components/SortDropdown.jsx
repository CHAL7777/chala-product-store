import React from 'react';
import { ArrowUpDown } from 'lucide-react';

const SortDropdown = ({ value, onChange }) => {
  const options = [
    { label: 'Featured', value: 'featured' },
    { label: 'Price: Low to High', value: 'price-low' },
    { label: 'Price: High to Low', value: 'price-high' },
    { label: 'Highest Rated', value: 'rating' },
    { label: 'Name: A-Z', value: 'name' },
  ];

  return (
    <div className="relative inline-flex items-center gap-2">
      <ArrowUpDown size={16} className="text-zinc-400" />
      <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider hidden sm:inline">Sort:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-200 py-2 px-3 rounded-lg focus:outline-none focus:border-brand cursor-pointer hover:border-zinc-700 transition-colors"
        aria-label="Sort products by"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown;
