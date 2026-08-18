import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import products from '../data/products';
import ProductGrid from '../components/ProductGrid';
import EmptyState from '../components/ui/EmptyState';
import { Heart, Trash2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const WishlistPage = () => {
  const { wishlist, clearWishlist } = useWishlist();
  const { addToast } = useToast();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleClearWishlist = () => {
    clearWishlist();
    addToast('Wishlist cleared', 'info');
  };

  if (wishlistedProducts.length === 0) {
    return (
      <div className="section-container py-16">
        <EmptyState
          icon={Heart}
          title="Your Wishlist is Empty"
          description="Save your favorite shoes by clicking the heart icon on any product card."
          actionText="Explore Footwear"
          actionLink="/products"
        />
      </div>
    );
  }

  return (
    <div className="section-container py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-100 tracking-tight">
            My Wishlist
          </h1>
          <p className="text-xs md:text-sm text-zinc-400 mt-1">
            You have <span className="text-rose-400 font-bold">{wishlistedProducts.length}</span> saved item(s)
          </p>
        </div>
        <button
          onClick={handleClearWishlist}
          className="text-xs font-semibold text-zinc-400 hover:text-rose-400 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 transition-colors"
        >
          <Trash2 size={14} />
          <span>Clear Wishlist</span>
        </button>
      </div>

      {/* Wishlist Grid */}
      <ProductGrid products={wishlistedProducts} />
    </div>
  );
};

export default WishlistPage;
