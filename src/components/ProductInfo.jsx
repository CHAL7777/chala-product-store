import React, { useState, useContext } from 'react';
import { Star, ShoppingBag, Heart, ShieldCheck, Truck, RotateCcw, Plus, Minus } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { Badge } from './ui/Skeleton';

const ProductInfo = ({ product }) => {
  const { addToCart } = useContext(ShopContext);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useToast();

  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : 'UK 8');
  const [quantity, setQuantity] = useState(1);

  const price = product.price || product.new_price;
  const originalPrice = product.originalPrice || product.old_price;
  const rating = product.rating || 4.8;
  const reviewCount = product.reviewCount || 128;
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product.id);
    }
    addToast(`Added ${quantity}× ${product.name} (${selectedSize}) to cart!`, 'success');
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product.id);
    addToast(
      inWishlist
        ? `Removed ${product.name} from wishlist`
        : `Added ${product.name} to wishlist`,
      'info'
    );
  };

  return (
    <div className="space-y-6">
      {/* Category & Status */}
      <div className="flex items-center justify-between">
        <span className="uppercase text-xs font-bold tracking-widest text-brand">
          {product.category}'s Footwear
        </span>
        <Badge variant={product.inStock !== false ? 'success' : 'sale'}>
          {product.inStock !== false ? 'In Stock' : 'Out of Stock'}
        </Badge>
      </div>

      {/* Title */}
      <h1 className="text-3xl lg:text-4xl font-extrabold text-zinc-100 tracking-tight leading-tight">
        {product.name}
      </h1>

      {/* Ratings */}
      <div className="flex items-center gap-3">
        <div className="flex items-center text-amber-400 gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < Math.floor(rating) ? 'fill-current' : 'text-zinc-700'}
            />
          ))}
        </div>
        <span className="text-sm font-semibold text-zinc-200">{rating}</span>
        <span className="text-sm text-zinc-500">({reviewCount} customer reviews)</span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3 py-2 border-y border-zinc-800">
        <span className="text-3xl font-black text-zinc-100">${price.toFixed(2)}</span>
        {originalPrice > price && (
          <span className="text-lg text-zinc-500 line-through">
            ${originalPrice.toFixed(2)}
          </span>
        )}
        {originalPrice > price && (
          <Badge variant="sale">Save ${(originalPrice - price).toFixed(2)}</Badge>
        )}
      </div>

      {/* Description */}
      <p className="text-zinc-300 text-sm leading-relaxed">
        {product.description}
      </p>

      {/* Size Selector */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-zinc-300 uppercase tracking-wider">Select Size</span>
            <button className="text-brand hover:underline font-medium">Size Guide</button>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                  selectedSize === size
                    ? 'bg-brand text-zinc-950 border-brand shadow-md shadow-brand/20'
                    : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-600'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity & CTA Actions */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        {/* Quantity Controls */}
        <div className="flex items-center justify-between border border-zinc-800 bg-zinc-900 rounded-xl px-4 py-2 sm:w-36">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="text-zinc-400 hover:text-zinc-100 p-1"
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="font-bold text-zinc-100 text-sm">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="text-zinc-400 hover:text-zinc-100 p-1"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Add to Cart Button (Does NOT force navigation) */}
        <button
          onClick={handleAddToCart}
          className="btn-primary flex-1 py-3.5 text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand/20"
        >
          <ShoppingBag size={18} />
          <span>Add To Shopping Cart</span>
        </button>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={`p-3.5 rounded-xl border transition-all ${
            inWishlist
              ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
              : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-600 hover:text-white'
          }`}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={20} className={inWishlist ? 'fill-current' : ''} />
        </button>
      </div>

      {/* Value Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-zinc-800 text-xs text-zinc-400">
        <div className="flex items-center gap-2.5">
          <Truck size={18} className="text-brand shrink-0" />
          <span>Free express delivery on orders over $100</span>
        </div>
        <div className="flex items-center gap-2.5">
          <RotateCcw size={18} className="text-brand shrink-0" />
          <span>30-day hassle-free returns & exchanges</span>
        </div>
        <div className="flex items-center gap-2.5">
          <ShieldCheck size={18} className="text-brand shrink-0" />
          <span>100% authentic product guarantee</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
