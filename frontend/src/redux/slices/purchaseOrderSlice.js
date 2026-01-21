import { createSlice } from '@reduxjs/toolkit';

const purchaseOrderSlice = createSlice({
  name: 'purchaseOrders',
  initialState: {
    orders: [],
    currentOrder: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    updateOrder: (state, action) => {
      const index = state.orders.findIndex(o => o._id === action.payload._id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    },
    deleteOrder: (state, action) => {
      state.orders = state.orders.filter(o => o._id !== action.payload);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setOrders,
  setCurrentOrder,
  addOrder,
  updateOrder,
  deleteOrder,
  setLoading,
  setError,
} = purchaseOrderSlice.actions;

export default purchaseOrderSlice.reducer;
