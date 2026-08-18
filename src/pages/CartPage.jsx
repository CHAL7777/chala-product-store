import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { useToast } from '../context/ToastContext';
import CartItem from '../components/CartItem';
import EmptyState from '../components/ui/EmptyState';
import { ShoppingBag, ArrowRight, Trash2, Tag, ShieldCheck } from 'lucide-react';

const CartPage = () => {
  const { products, cartItems, getTotalCartAmount, clearCart, getTotalCartItems } = useContext(ShopContext);
  const { addToast } = useToast();

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedCode, setAppliedCode] = useState('');

  const cartProductList = products.filter((p) => cartItems[p.id] > 0);
  const subtotal = getTotalCartAmount();
  const shippingFee = subtotal > 100 || subtotal === 0 ? 0 : 9.99;
  const grandTotal = Math.max(0, subtotal - discount + shippingFee);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoCode.trim()) return;

    if (promoCode.toUpperCase() === 'SOLEFLOW10' || promoCode.toUpperCase() === 'SOLEFLOW') {
      const disc = subtotal * 0.1;
      setDiscount(disc);
      setAppliedCode(promoCode.toUpperCase());
      addToast('Promo code SOLEFLOW10 applied (10% OFF)!', 'success');
    } else {
      addToast('Invalid promo code. Try SOLEFLOW10', 'error');
    }
  };

  const handleClearCart = () => {
    clearCart();
    setDiscount(0);
    setAppliedCode('');
    addToast('Shopping cart cleared', 'info');
  };

  const handleCheckout = () => {
    addToast('Proceeding to Checkout... (Demo Mode)', 'info');
  };

  if (cartProductList.length === 0) {
    return (
      <div className="section-container py-16">
        <EmptyState
          icon={ShoppingBag}
          title="Your Cart is Empty"
          description="Looks like you haven't added any shoes to your shopping cart yet."
          actionText="Start Shopping"
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
            Shopping Cart
          </h1>
          <p className="text-xs md:text-sm text-zinc-400 mt-1">
            You have <span className="text-brand font-bold">{getTotalCartItems()}</span> item(s) in your cart
          </p>
        </div>
        <button
          onClick={handleClearCart}
          className="text-xs font-semibold text-zinc-400 hover:text-rose-400 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 transition-colors"
        >
          <Trash2 size={14} />
          <span>Clear Cart</span>
        </button>
      </div>

      {/* Main Grid: Items List (Left) + Order Summary (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cartProductList.map((product) => (
            <CartItem
              key={product.id}
              product={product}
              quantity={cartItems[product.id]}
            />
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-6 sticky top-24">
          <h3 className="text-lg font-bold text-zinc-100 border-b border-zinc-800 pb-4">
            Order Summary
          </h3>

          {/* Price Breakdown */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-zinc-300">
              <span>Subtotal</span>
              <span className="font-semibold text-zinc-100">${subtotal.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Discount ({appliedCode})</span>
                <span className="font-semibold">-${discount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-zinc-300">
              <span>Estimated Shipping</span>
              <span className="font-semibold text-zinc-100">
                {shippingFee === 0 ? <span className="text-emerald-400">FREE</span> : `$${shippingFee.toFixed(2)}`}
              </span>
            </div>

            <div className="border-t border-zinc-800 pt-3 flex justify-between text-base font-bold text-zinc-100">
              <span>Total</span>
              <span className="text-xl text-brand">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Promo Code Input */}
          <form onSubmit={handleApplyPromo} className="space-y-2 pt-2">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
              Promo Code
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag size={14} className="absolute left-3 top-3 text-zinc-500" />
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="SOLEFLOW10"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-100 uppercase placeholder-zinc-600 focus:outline-none focus:border-brand"
                />
              </div>
              <button type="submit" className="btn-secondary py-2 px-3 text-xs font-bold">
                Apply
              </button>
            </div>
            {appliedCode && (
              <p className="text-xs text-emerald-400">✓ Code {appliedCode} active!</p>
            )}
          </form>

          {/* Checkout CTA */}
          <button
            onClick={handleCheckout}
            className="btn-primary w-full py-3 text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand/20"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={16} />
          </button>

          {/* Continue Shopping */}
          <Link
            to="/products"
            className="block text-center text-xs font-semibold text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            Or Continue Shopping
          </Link>

          {/* Security badge */}
          <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 pt-2 border-t border-zinc-800">
            <ShieldCheck size={14} className="text-brand" />
            <span>Secure 256-bit SSL Encrypted Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
