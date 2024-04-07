import axios from 'axios'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../../api";


export const getProductId = createAsyncThunk(
    "products/getProductId",
    async (id) => {
        const { data } = await axios.get(`${Api}products/${id}?populate=*`);
        return data.data;
    }
);

export const productSliceFull = createSlice({
    name: "product",
    initialState: {
        product: null,
        status: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductId.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getProductId.fulfilled, (state, action) => {
                state.status = "success";
                state.product = action.payload;
            })
            .addCase(getProductId.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.error.message;
            });

    },
});

export default productSliceFull.reducer;
