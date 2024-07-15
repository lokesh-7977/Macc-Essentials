import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: string;
  image: string;
  content: string;
  description: string;
  price: string;
  originalPrice: string;
  about: string[];
}

interface CartState {
  items: Product[];
}

const loadCartFromLocalStorage = (): CartState => {
  if (typeof window !== 'undefined') { // Check if running on client-side
    try {
      const serializedCart = localStorage.getItem('cart');
      if (serializedCart) {
        return JSON.parse(serializedCart);
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
  }
  return { items: [] };
};

const saveCartToLocalStorage = (state: CartState) => {
  if (typeof window !== 'undefined') { // Ensure this only runs on client side
    try {
      const serializedCart = JSON.stringify(state);
      localStorage.setItem('cart', serializedCart);
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }
};

const initialState: CartState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
      saveCartToLocalStorage(state); 
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveCartToLocalStorage(state); // Save to localStorage
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
