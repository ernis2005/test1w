import { createSlice ,  createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import { Api } from '../../api';


export const getUserList = createAsyncThunk(
    "user/getUserList",
    async () => {
        try {
            const { data } = await axios.get(`${Api}user-lists`);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
)


const userListSlice = createSlice({
    name: 'userList',
    initialState: {
        data: [],
        status: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserList.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getUserList.fulfilled, (state, action) => {
                state.status = "success";
                state.data = action.payload;
            })
            .addCase(getUserList.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.error.message;
            });
    },
});

export default userListSlice.reducer