import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    items: [],
    categories: ['All', 'Veg', 'Non-Veg', 'Drinks', 'Specials'],
    loading: false,
    error: null,
  },
  reducers: {
    setLoading(state, action) { state.loading = action.payload; },
    setError(state, action) { state.error = action.payload; },
    setMenuItems(state, action) { state.items = action.payload; },
    addMenuItem(state, action) { state.items.push(action.payload); },
    updateMenuItem(state, action) {
      const index = state.items.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
    removeMenuItem(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    toggleAvailability(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.available = !item.available;
    },
  },
});

export const { setLoading, setError, setMenuItems, addMenuItem, updateMenuItem, removeMenuItem, toggleAvailability } = menuSlice.actions;
export default menuSlice.reducer;
