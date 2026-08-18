import { useState, useMemo } from 'react';
import products from '../data/products';

export const useProducts = (initialCategory = 'all') => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPriceRange, setSelectedPriceRange] = useState('all'); // 'all', 'under50', '50to100', '100to150', 'over150'
  const [selectedRating, setSelectedRating] = useState(0); // 0, 4, 4.5
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-low', 'price-high', 'rating', 'name'
  const [inStockOnly, setInStockOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // 1. Search Query Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        const matchesTags = item.tags ? item.tags.some(t => t.toLowerCase().includes(query)) : false;
        if (!matchesName && !matchesCategory && !matchesTags) return false;
      }

      // 2. Category Filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // 3. Price Range Filter
      if (selectedPriceRange === 'under50' && item.price >= 50) return false;
      if (selectedPriceRange === '50to100' && (item.price < 50 || item.price > 100)) return false;
      if (selectedPriceRange === '100to150' && (item.price < 100 || item.price > 150)) return false;
      if (selectedPriceRange === 'over150' && item.price <= 150) return false;

      // 4. Rating Filter
      if (selectedRating > 0 && item.rating < selectedRating) return false;

      // 5. In Stock Filter
      if (inStockOnly && !item.inStock) return false;

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'featured':
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });
  }, [searchQuery, selectedCategory, selectedPriceRange, selectedRating, sortBy, inStockOnly]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPriceRange('all');
    setSelectedRating(0);
    setSortBy('featured');
    setInStockOnly(false);
  };

  const activeFilterCount = (selectedCategory !== 'all' ? 1 : 0) +
    (selectedPriceRange !== 'all' ? 1 : 0) +
    (selectedRating > 0 ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (searchQuery.trim() !== '' ? 1 : 0);

  return {
    products: filteredProducts,
    totalCount: products.length,
    filteredCount: filteredProducts.length,
    searchQuery,
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
  };
};

export default useProducts;
