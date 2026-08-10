'use client';

import React, { createContext, useContext, useState } from 'react';
import { CustomProduct, CartItem, ProductVariant, Coupon, User } from '@/types';
import { PRODUCTS, MOCK_COUPONS } from '@/data/mockData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface StoreContextType {
  // Products & Categories
  products: CustomProduct[];
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating';
  setSortBy: (sort: 'featured' | 'price-low' | 'price-high' | 'rating') => void;
  
  // Shopping Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: CustomProduct, variant?: ProductVariant, qty?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, qty: number) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartTotal: number;
  freeShippingThreshold: number;

  // Saved / Wishlist
  savedProductIds: string[];
  toggleSaveProduct: (productId: string) => void;
  toggleSaveProject: (productId: string) => void;

  // Modals
  quickViewProduct: CustomProduct | null;
  setQuickViewProduct: (product: CustomProduct | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;

  // User
  user: User | null;
  setUser: (user: User | null) => void;

  // Toast System
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<CustomProduct[]>(PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const [savedProductIds, setSavedProductIds] = useState<string[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<CustomProduct | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  const [toasts, setToasts] = useState<Toast[]>([]);

  const [user, setUser] = useState<User | null>({
    id: 'u-1',
    name: 'Elena Rostova',
    email: 'elena@kretabazaar.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    role: 'customer',
    savedProductIds: []
  });

  const freeShippingThreshold = 100;

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Add to Cart
  const addToCart = (product: CustomProduct, variant?: ProductVariant, qty: number = 1) => {
    const selectedVariant = variant || (product.variants.length > 0 ? product.variants[0] : undefined);
    const cartItemId = `${product.id}-${selectedVariant ? selectedVariant.id : 'default'}`;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === cartItemId);
      if (existing) {
        return prevCart.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prevCart, { id: cartItemId, product, selectedVariant, quantity: qty }];
    });

    addToast(`Added "${product.title}" to cart! 🛍️`, 'success');
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    addToast('Item removed from cart.', 'info');
  };

  const updateQuantity = (cartItemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Coupons
  const applyCoupon = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    const found = MOCK_COUPONS.find((c) => c.code === cleanCode);
    if (!found) {
      addToast('Invalid coupon code.', 'error');
      return false;
    }
    setAppliedCoupon(found);
    addToast(`Coupon ${found.code} applied (${found.discountPercent}% OFF)!`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed.', 'info');
  };

  // Subtotals
  const cartSubtotal = cart.reduce((acc, item) => {
    const variantOffset = item.selectedVariant?.priceOffset || 0;
    return acc + (item.product.price + variantOffset) * item.quantity;
  }, 0);

  const cartDiscount = appliedCoupon
    ? Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100)
    : 0;

  const cartTotal = Math.max(0, cartSubtotal - cartDiscount);

  const toggleSaveProduct = (productId: string) => {
    setSavedProductIds((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast('Removed from saved wishlist.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        addToast('Saved to wishlist! 🔖', 'success');
        return [...prev, productId];
      }
    });
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        cartSubtotal,
        cartDiscount,
        cartTotal,
        freeShippingThreshold,
        savedProductIds,
        toggleSaveProduct,
        toggleSaveProject: toggleSaveProduct,
        quickViewProduct,
        setQuickViewProduct,
        isSearchOpen,
        setIsSearchOpen,
        isAuthOpen,
        setIsAuthOpen,
        user,
        setUser,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
