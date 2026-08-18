import React from 'react';
import ProductCard from './ProductCard';
import { ProductCardSkeleton } from './ui/Skeleton';
import EmptyState from './ui/EmptyState';

const ProductGrid = ({ products = [], loading = false, emptyTitle, emptyDescription }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title={emptyTitle || "No products found"}
        description={emptyDescription || "Try adjusting your search query, price ranges, or category filters."}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
