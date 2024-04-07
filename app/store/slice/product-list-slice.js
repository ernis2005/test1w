import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../../api";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async  (status) => {
    const { data } = await axios.get(`${Api}products?populate=*`);
    const filterData = await data.data.filter((res) => res.attributes.isPublish == true);
    
    filterData.sort((a, b) => new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt));
    const formattedData = {
      data: filterData,
    };
    return formattedData;
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
