import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import menuReducer from './slices/menuSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import tableReducer from './slices/tableSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    menu: menuReducer,
    cart: cartReducer,
    order: orderReducer,
    table: tableReducer,
  },
});

export default store;
