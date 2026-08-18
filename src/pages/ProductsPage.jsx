import React, { useState } from 'react';
import useProducts from '../hooks/useProducts';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import SortDropdown from '../components/SortDropdown';
import ProductGrid from '../components/ProductGrid';
import { Filter, X } from 'lucide-react';

const ProductsPage = ({ defaultCategory = 'all' }) => {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const {
    products,
    filteredCount,
    totalCount,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedPriceRange,
    setSelectedPriceRange,
    selectedRating,
    setSelectedRating,
    sortBy,
    setSortBy,
    inStockOnly,
    setInStockOnly,
    resetFilters,
    activeFilterCount,
  } = useProducts(defaultCategory);

  return (
    <div className="section-container py-12 md:py-16 space-y-10">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="eyebrow">The SoleFlow edit</span>
        <h1 className="text-4xl md:text-6xl font-black tracking-[-0.05em] text-zinc-100">
          Find your next pair
        </h1>
        <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
          Premium footwear engineered for peak performance, effortless comfort, and street-ready style.
        </p>
      </div>

      {/* Top Controls Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-zinc-900/55 p-3.5 md:p-4 border border-white/10 rounded-2xl shadow-xl shadow-black/10 backdrop-blur-xl">
        {/* Search */}
        <div className="w-full md:max-w-md">
          <SearchBar onSearch={setSearchQuery} />
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="md:hidden btn-secondary py-2 px-3 text-xs flex items-center gap-2"
          >
            <Filter size={16} />
            <span>Filters ({activeFilterCount})</span>
          </button>

          {/* Result Counter */}
          <p className="text-xs font-medium text-zinc-400">
            Showing <span className="text-zinc-100 font-bold">{filteredCount}</span> of {totalCount} products
          </p>

          {/* Sort Dropdown */}
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar */}
        <div className="hidden md:block md:col-span-1 sticky top-28">
          <FilterSidebar
            category={selectedCategory}
            onCategoryChange={setSelectedCategory}
            priceRange={selectedPriceRange}
            onPriceRangeChange={setSelectedPriceRange}
            rating={selectedRating}
            onRatingChange={setSelectedRating}
            inStockOnly={inStockOnly}
            onInStockChange={setInStockOnly}
            activeCount={activeFilterCount}
            onReset={resetFilters}
          />
        </div>

        {/* Product Grid */}
        <div className="md:col-span-3">
          <ProductGrid products={products} />
        </div>
      </div>

      {/* Mobile Drawer Filter */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs h-full bg-zinc-950 p-6 overflow-y-auto z-10 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <h3 className="font-bold text-zinc-100 text-lg">Filters</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-zinc-400 hover:text-zinc-100"
              >
                <X size={20} />
              </button>
            </div>

            <FilterSidebar
              category={selectedCategory}
              onCategoryChange={(cat) => {
                setSelectedCategory(cat);
                setMobileFilterOpen(false);
              }}
              priceRange={selectedPriceRange}
              onPriceRangeChange={(pr) => {
                setSelectedPriceRange(pr);
                setMobileFilterOpen(false);
              }}
              rating={selectedRating}
              onRatingChange={(r) => {
                setSelectedRating(r);
                setMobileFilterOpen(false);
              }}
              inStockOnly={inStockOnly}
              onInStockChange={setInStockOnly}
              activeCount={activeFilterCount}
              onReset={() => {
                resetFilters();
                setMobileFilterOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
