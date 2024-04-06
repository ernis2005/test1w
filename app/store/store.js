import user from "./slice/user-slice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user,
  },
});

export default store;
