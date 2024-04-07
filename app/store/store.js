import user from "./slice/user-slice";
import { configureStore } from "@reduxjs/toolkit";
import product from './slice/product-list-slice'
import productSliceFull from './slice/product-full-information'
const store = configureStore({
  reducer: {
    user,
    product,
    productSliceFull
  },
});

export default store;
