import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import supplierReducer from './slices/supplierSlice';
import customerReducer from './slices/customerSlice';
import purchaseOrderReducer from './slices/purchaseOrderSlice';
import salesOrderReducer from './slices/salesOrderSlice';
import invoiceReducer from './slices/invoiceSlice';
import grnReducer from './slices/grnSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    suppliers: supplierReducer,
    customers: customerReducer,
    purchaseOrders: purchaseOrderReducer,
    salesOrders: salesOrderReducer,
    invoices: invoiceReducer,
    grn: grnReducer,
  },
});

export default store;
