import { createSlice } from '@reduxjs/toolkit';

const invoiceSlice = createSlice({
  name: 'invoices',
  initialState: {
    invoices: [],
    currentInvoice: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setInvoices: (state, action) => {
      state.invoices = action.payload;
    },
    setCurrentInvoice: (state, action) => {
      state.currentInvoice = action.payload;
    },
    addInvoice: (state, action) => {
      state.invoices.push(action.payload);
    },
    updateInvoice: (state, action) => {
      const index = state.invoices.findIndex(i => i._id === action.payload._id);
      if (index !== -1) {
        state.invoices[index] = action.payload;
      }
    },
    deleteInvoice: (state, action) => {
      state.invoices = state.invoices.filter(i => i._id !== action.payload);
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
  setInvoices,
  setCurrentInvoice,
  addInvoice,
  updateInvoice,
  deleteInvoice,
  setLoading,
  setError,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
