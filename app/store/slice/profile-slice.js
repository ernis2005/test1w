import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'
import { Api } from '../../api';


export const getProfile = createAsyncThunk(
    "profile/getProfile",
    async (status) => {
        try {
    
            const { data } = await axios.get(`${Api}products?populate=*`);
            const token = localStorage.getItem("token");
            const filterDataUserCards = await data.data.filter((res) => res.attributes.userToken == token);
            const filterData = await filterDataUserCards.filter((res) => res.attributes.isPublish == status);
            filterData.sort((a, b) => new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt));
            const formattedData = {
                data: filterData,
            };
            return formattedData;
        } catch (error) {
          
        }
    }
)


const profileSlice = createSlice({
    name: "profile",
    initialState: {
        data: [],
        status: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProfile.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.status = "success";
                state.data = action.payload;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.error.message;
            });

    },
});

export default profileSlice.reducer