
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../api";
import axios from 'axios'

const initialState = {
    user: null,
};

export const getUser = createAsyncThunk(
    "user/getUser",
    async () => {
        try {
            const { data } = await axios.get(`${Api}user-lists?populate=*`);
            const userToken = localStorage.getItem("token");
            const filterData= data.data.filter((item) => {
                return item.
                    attributes
                    .token == userToken;
            });
            console.log(filterData[0].attributes    , 'test1 ');
            return filterData[0].attributes;
        } catch (error) {
            console.log(error);
        }
    }
)


const userSlice = createSlice({
    name: "user",
    initialState,
    
    user: null,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {

        builder
            .addCase(getUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.status = "success";
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.error.message;
            });
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;