import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    activeOrders: [],
    loading: false,
    error: null,
  },
  reducers: {
    setLoading(state, action) { state.loading = action.payload; },
    setError(state, action) { state.error = action.payload; },
    setOrders(state, action) { state.orders = action.payload; },
    addOrder(state, action) { state.orders.unshift(action.payload); },
    updateOrderStatus(state, action) {
      const order = state.orders.find((o) => o.id === action.payload.id);
      if (order) order.status = action.payload.status;
    },
  },
});

export const { setLoading, setError, setOrders, addOrder, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
