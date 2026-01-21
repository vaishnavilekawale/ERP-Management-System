import { createSlice } from '@reduxjs/toolkit';

const supplierSlice = createSlice({
  name: 'suppliers',
  initialState: {
    suppliers: [],
    currentSupplier: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setSuppliers: (state, action) => {
      state.suppliers = action.payload;
    },
    setCurrentSupplier: (state, action) => {
      state.currentSupplier = action.payload;
    },
    addSupplier: (state, action) => {
      state.suppliers.push(action.payload);
    },
    updateSupplier: (state, action) => {
      const index = state.suppliers.findIndex(s => s._id === action.payload._id);
      if (index !== -1) {
        state.suppliers[index] = action.payload;
      }
    },
    deleteSupplier: (state, action) => {
      state.suppliers = state.suppliers.filter(s => s._id !== action.payload);
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
  setSuppliers,
  setCurrentSupplier,
  addSupplier,
  updateSupplier,
  deleteSupplier,
  setLoading,
  setError,
} = supplierSlice.actions;

export default supplierSlice.reducer;
