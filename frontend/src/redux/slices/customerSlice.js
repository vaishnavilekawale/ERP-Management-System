import { createSlice } from '@reduxjs/toolkit';

const customerSlice = createSlice({
  name: 'customers',
  initialState: {
    customers: [],
    currentCustomer: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setCustomers: (state, action) => {
      state.customers = action.payload;
    },
    setCurrentCustomer: (state, action) => {
      state.currentCustomer = action.payload;
    },
    addCustomer: (state, action) => {
      state.customers.push(action.payload);
    },
    updateCustomer: (state, action) => {
      const index = state.customers.findIndex(c => c._id === action.payload._id);
      if (index !== -1) {
        state.customers[index] = action.payload;
      }
    },
    deleteCustomer: (state, action) => {
      state.customers = state.customers.filter(c => c._id !== action.payload);
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
  setCustomers,
  setCurrentCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  setLoading,
  setError,
} = customerSlice.actions;

export default customerSlice.reducer;
