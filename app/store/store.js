import user from "./slice/user-slice";
import { configureStore } from "@reduxjs/toolkit";
import product from './slice/product-list-slice'
import productSliceFull from './slice/product-full-information'
import userListSlice from './slice/user-list'
import registrationSlice from  './slice/registration-slice'
const store = configureStore({
  reducer: {
    user,
    product,
    productSliceFull,
    registrationSlice,
    userListSlice
  },
});

export default store;
