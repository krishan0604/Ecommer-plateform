import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: number;
  productId: number;
  productName: string;
  productPrice: number;
  productImageUrl: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: any, quantity: number) => void;
  removeItem: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity) => {
        const items = get().items;
        const existingItem = items.find((item) => item.productId === product.id);
        
        if (existingItem) {
          set({
            items: items.map((item) =>
              item.productId === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({
            items: [
              ...items,
              {
                id: Date.now(), // Temporary ID for frontend
                productId: product.id,
                productName: product.name,
                productPrice: product.price,
                productImageUrl: product.imageUrl,
                quantity: quantity,
              },
            ],
          });
        }
      },
      removeItem: (itemId) => {
        set({ items: get().items.filter((item) => item.id !== itemId) });
      },
      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
      subtotal: () => get().items.reduce((acc, item) => acc + item.productPrice * item.quantity, 0),
    }),
    {
      name: 'cart-storage',
    }
  )
);
