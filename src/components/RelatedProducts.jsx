import React from 'react';
import products from '../data/products';
import ProductCard from './ProductCard';

const RelatedProducts = ({ currentProductId, category }) => {
  const related = products
    .filter((p) => p.id !== currentProductId && (p.category === category || p.featured))
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div className="space-y-6 pt-12 border-t border-zinc-800">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-zinc-100 tracking-tight">You Might Also Like</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
