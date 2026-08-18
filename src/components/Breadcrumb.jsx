import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ product }) => {
  if (!product) return null;

  return (
    <nav className="flex items-center gap-2 text-xs font-medium text-zinc-400 py-2 overflow-x-auto scrollbar-hide">
      <Link to="/" className="flex items-center gap-1 hover:text-zinc-100 transition-colors">
        <Home size={14} />
        <span>Home</span>
      </Link>

      <ChevronRight size={12} className="text-zinc-600 shrink-0" />

      <Link to="/products" className="hover:text-zinc-100 transition-colors">
        Products
      </Link>

      <ChevronRight size={12} className="text-zinc-600 shrink-0" />

      <Link
        to={`/products?category=${product.category}`}
        className="capitalize hover:text-zinc-100 transition-colors"
      >
        {product.category}'s
      </Link>

      <ChevronRight size={12} className="text-zinc-600 shrink-0" />

      <span className="text-zinc-200 truncate font-semibold">{product.name}</span>
    </nav>
  );
};

export default Breadcrumb;
