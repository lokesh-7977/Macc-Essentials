
import { createSlice } from '@reduxjs/toolkit';

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    paymentMethod: '',
    address: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: ''
    }
  },
  reducers: {
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('paymentMethod', action.payload);
    },
    setAddress: (state, action) => {
      state.address = action.payload;
      localStorage.setItem('address', JSON.stringify(action.payload));
    },
    loadStateFromLocalStorage: (state) => {
      const paymentMethod = localStorage.getItem('paymentMethod');
      const address = localStorage.getItem('address');
      
      if (paymentMethod) state.paymentMethod = paymentMethod;
      if (address) state.address = JSON.parse(address);
    }
  }
});

export const { setPaymentMethod, setAddress, loadStateFromLocalStorage } = paymentSlice.actions;
export default paymentSlice.reducer;
