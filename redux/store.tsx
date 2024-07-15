import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartslice';
import paymentReducer from './paymentslice';
import orderReducer from './orderslice';
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    payment: paymentReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
