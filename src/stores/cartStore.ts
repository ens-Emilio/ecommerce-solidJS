import { createStore } from 'solid-js/store';
import type { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
}

const STORAGE_KEY = 'rockshop_cart';

function loadCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCartToStorage(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Ignore storage errors
  }
}

const [cart, setCart] = createStore<CartState>({
  items: loadCartFromStorage()
});

export function getCart() {
  return cart;
}

export function getCartTotal(): number {
  return cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
}

export function getCartItemsCount(): number {
  return cart.items.reduce((count, item) => count + item.quantity, 0);
}

export function addToCart(product: Product) {
  const existingItem = cart.items.find(item => item.product.id === product.id);
  
  if (existingItem) {
    setCart('items', item => item.product.id === product.id, 'quantity', q => q + 1);
  } else {
    setCart('items', items => [...items, { product, quantity: 1 }]);
  }
  
  saveCartToStorage(cart.items);
}

export function removeFromCart(productId: string) {
  setCart('items', items => items.filter(item => item.product.id !== productId));
  saveCartToStorage(cart.items);
}

export function updateQuantity(productId: string, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  
  setCart('items', item => item.product.id === productId, 'quantity', quantity);
  saveCartToStorage(cart.items);
}

export function clearCart() {
  setCart('items', []);
  saveCartToStorage([]);
}

export function isInCart(productId: string): boolean {
  return cart.items.some(item => item.product.id === productId);
}
