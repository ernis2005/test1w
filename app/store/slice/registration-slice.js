import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Api } from '../../api';



export const registration = createAsyncThunk(
    "registration",
    async (data, { rejectWithValue }) => {


        const formData = new FormData()
        formData.append("files", data.image)
        try {
          const postImage  =   await axios.post(`${Api}upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept-Language': 'ru',
                }
            }).then(res => {
                const newData = {
                    data: {
                        name: data.name,
                        email: data.email,
                        logo: res.data,
                        token: data.token
                    }
                }
                return newData
            })
        await  axios({
                method: "post",
                url: `${Api}user-lists`,
                data: postImage,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ru',
                }
            },).then(res => {
                localStorage.setItem('token',data.token)
            })
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
const registrationSlice = createSlice({
    name: 'registration',
    initialState: {
     
    },
    status: null,
    data: [],
    error: null, 
    isRegistered: false,
    userList:[],
    extraReducers: (builder) => {
        builder
           
            .addCase(registration.pending, (state, action) => {
                state.status = 'loading'
            })
           
            .addCase(registration.fulfilled, (state, action) => {
                state.status = 'success'
                state.isRegistered = true
            })
            .addCase(registration.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.payload
                state.isRegistered = true
            })
    }
})

export default registrationSlice.reducer

