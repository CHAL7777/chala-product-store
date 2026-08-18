import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { Badge } from './ui/Skeleton';

import TransparentImage from './ui/TransparentImage';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(ShopContext);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useToast();

  const id = product.id;
  const name = product.name;
  const category = product.category;
  const image = product.images ? product.images[0] : product.image;
  const price = product.price || product.new_price;
  const originalPrice = product.originalPrice || product.old_price;
  const rating = product.rating || 4.7;
  const reviewCount = product.reviewCount || 45;

  const inWishlist = isInWishlist(id);
  const discountPercent = originalPrice > price
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(id);
    addToast(`Added ${name} to cart!`, 'success');
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(id);
    if (!inWishlist) {
      addToast(`Added ${name} to wishlist`, 'info');
    } else {
      addToast(`Removed ${name} from wishlist`, 'info');
    }
  };

  return (
    <div className="product-card group flex flex-col justify-between h-full">
      <div>
        {/* Image Container with Top-to-Bottom overlay reveal effect */}
        <div className="card-image-wrap aspect-square w-full bg-zinc-900/60 rounded-xl overflow-hidden relative flex items-center justify-center p-3">
          <Link to={`/products/${id}`} aria-label={`View ${name}`} className="w-full h-full flex items-center justify-center">
            <TransparentImage
              src={image}
              alt={name}
              loading="lazy"
              className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500"
            />
          </Link>

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 pointer-events-none">
            {discountPercent > 0 && (
              <Badge variant="sale">-{discountPercent}%</Badge>
            )}
            {product.featured && (
              <Badge variant="brand">Featured</Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-3 right-3 z-20 p-2.5 rounded-full transition-all duration-300 backdrop-blur-md border ${
              inWishlist
                ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/20'
                : 'bg-zinc-900/70 text-zinc-300 border-zinc-700/60 hover:bg-zinc-800 hover:text-white'
            }`}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={16} className={inWishlist ? 'fill-current' : ''} />
          </button>
        </div>

        {/* Info Content */}
        <div className="p-4 flex flex-col gap-2">
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="uppercase tracking-wider font-semibold text-brand">
              {category}'s Footwear
            </span>
            <div className="flex items-center gap-1 text-amber-400">
              <Star size={13} className="fill-current" />
              <span className="font-medium text-zinc-300">{rating}</span>
              <span className="text-zinc-500">({reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link to={`/products/${id}`} className="group-hover:text-brand transition-colors">
            <h3 className="font-semibold text-zinc-100 line-clamp-1 text-base leading-snug">
              {name}
            </h3>
          </Link>

          {/* Description snippet */}
          {product.description && (
            <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>
      </div>

      {/* Footer / Price & Add to Cart Action */}
      <div className="p-4 pt-0 mt-auto flex items-center justify-between border-t border-zinc-800/60 pt-3">
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-zinc-100">${price.toFixed(2)}</span>
          {originalPrice > price && (
            <span className="text-xs text-zinc-500 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className="btn-primary py-2 px-3 text-xs rounded-lg flex items-center gap-1.5 shadow-md shadow-brand/10 hover:shadow-brand/20 active:scale-95"
          aria-label={`Add ${name} to cart`}
        >
          <ShoppingBag size={14} />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
