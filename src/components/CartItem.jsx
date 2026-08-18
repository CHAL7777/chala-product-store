import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import { useToast } from '../context/ToastContext';

const CartItem = ({ product, quantity }) => {
  const { addToCart, removeFromCart, removeFromCartCompletely } = useContext(ShopContext);
  const { addToast } = useToast();

  const handleRemoveCompletely = () => {
    removeFromCartCompletely(product.id);
    addToast(`Removed ${product.name} from cart`, 'info');
  };

  const image = product.images ? product.images[0] : product.image;
  const price = product.price || product.new_price;
  const itemTotal = price * quantity;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl gap-4 transition-all hover:border-zinc-700">
      {/* Product Image & Details */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <Link to={`/products/${product.id}`} className="shrink-0 rounded-lg overflow-hidden bg-zinc-950 border border-zinc-800 w-20 h-20 p-1">
          <img src={image} alt={product.name} className="w-full h-full object-contain" />
        </Link>
        <div className="space-y-1 flex-1">
          <Link to={`/products/${product.id}`} className="font-semibold text-zinc-100 text-base hover:text-brand transition-colors line-clamp-1">
            {product.name}
          </Link>
          <p className="text-xs text-zinc-400 capitalize">Category: {product.category}'s</p>
          <p className="text-xs text-brand font-bold sm:hidden">${price.toFixed(2)} each</p>
        </div>
      </div>

      {/* Price, Quantity Controls, and Subtotal */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800">
        <div className="hidden sm:block text-right">
          <p className="text-xs text-zinc-400">Unit Price</p>
          <p className="text-sm font-semibold text-zinc-200">${price.toFixed(2)}</p>
        </div>

        {/* Quantity control */}
        <div className="flex items-center border border-zinc-800 bg-zinc-950 rounded-lg px-3 py-1.5">
          <button
            onClick={() => removeFromCart(product.id)}
            className="text-zinc-400 hover:text-zinc-100 p-0.5"
            aria-label="Decrease quantity"
          >
            <Minus size={14} />
          </button>
          <span className="w-8 text-center text-sm font-bold text-zinc-100">{quantity}</span>
          <button
            onClick={() => addToCart(product.id)}
            className="text-zinc-400 hover:text-zinc-100 p-0.5"
            aria-label="Increase quantity"
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Item Total */}
        <div className="text-right">
          <p className="text-xs text-zinc-400">Total</p>
          <p className="text-base font-bold text-zinc-100">${itemTotal.toFixed(2)}</p>
        </div>

        {/* Remove Button */}
        <button
          onClick={handleRemoveCompletely}
          className="text-zinc-500 hover:text-rose-400 p-2 rounded-lg hover:bg-zinc-800 transition-colors"
          aria-label={`Remove ${product.name} completely`}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
