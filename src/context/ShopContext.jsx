import React, { createContext, useState, useEffect } from "react";
import products from "../data/products";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  // Initialize cart state from localStorage or default
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("soleflow_cart");
      if (savedCart) {
        return JSON.parse(savedCart);
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    }
    // Default initial cart: mapping 1..36 to quantity 0
    let cart = {};
    for (let index = 1; index <= products.length; index++) {
      cart[index] = 0;
    }
    return cart;
  });

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("soleflow_cart", JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cartItems]);

  const addToCart = (itemId, count = 1) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + count,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) - 1),
    }));
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max(0, newQuantity),
    }));
  };

  const removeFromCartCompletely = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: 0,
    }));
  };

  const clearCart = () => {
    let emptyCart = {};
    for (let index = 1; index <= products.length; index++) {
      emptyCart[index] = 0;
    }
    setCartItems(emptyCart);
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += cartItems[item] * itemInfo.price;
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    all_product: products,
    products,
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    removeFromCartCompletely,
    clearCart,
    getTotalCartAmount,
    getTotalCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;