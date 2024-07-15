
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderState {
  order: any;
}

const initialState: OrderState = {
  order: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    saveOrder: (state, action: PayloadAction<any>) => {
      state.order = action.payload;
    },
  },
});

export const { saveOrder } = orderSlice.actions;
export default orderSlice.reducer;
