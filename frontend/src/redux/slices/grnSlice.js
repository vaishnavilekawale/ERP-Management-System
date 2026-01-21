import { createSlice } from '@reduxjs/toolkit';

const grnSlice = createSlice({
  name: 'grn',
  initialState: {
    grns: [],
    currentGRN: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setGRNs: (state, action) => {
      state.grns = action.payload;
    },
    setCurrentGRN: (state, action) => {
      state.currentGRN = action.payload;
    },
    addGRN: (state, action) => {
      state.grns.push(action.payload);
    },
    updateGRN: (state, action) => {
      const index = state.grns.findIndex(g => g._id === action.payload._id);
      if (index !== -1) {
        state.grns[index] = action.payload;
      }
    },
    deleteGRN: (state, action) => {
      state.grns = state.grns.filter(g => g._id !== action.payload);
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
  setGRNs,
  setCurrentGRN,
  addGRN,
  updateGRN,
  deleteGRN,
  setLoading,
  setError,
} = grnSlice.actions;

export default grnSlice.reducer;
