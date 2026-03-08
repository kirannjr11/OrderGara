import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    tableId: null,
  },
  reducers: {
    setTableId(state, action) { state.tableId = action.payload; },
    addToCart(state, action) {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      const existing = state.items.find((i) => i.id === action.payload);
      if (existing && existing.quantity > 1) {
        existing.quantity -= 1;
      } else {
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
    },
    deleteFromCart(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCart(state) { state.items = []; },
  },
});

export const { setTableId, addToCart, removeFromCart, deleteFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
