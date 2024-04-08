import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Api } from '../../api'


export const createProduct = createAsyncThunk(
    "createProduct",
    async (data, { rejectWithValue }) => {

        const formData = new FormData()
        data[1].forEach((image) => {
            formData.append("files", image)
        })

        try {
            const postImage = await axios.post(`${Api}upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept-Language': 'ru',
                }
            })
      
            await axios.post(`${Api}products`, {
                data: {
                    name: data[0].name,
                    price: data[0].price,
                    description: data[0].description,
                    image: postImage.data,
                    userNmae: data[2].userNmae,
                    userToken: data[2].userToken,
                    userLogo: data[2].userLogo,
                    isPublish: data[0].published
                }
            })
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const  editProductList = createAsyncThunk(
    "editProductList",
    async (data, { rejectWithValue , dispatch }) => {
        try {
                await axios.put(`${Api}products/${data[1]}`, {
                    data: {
                        name: data[0].name,
                        price: data[0].price,
                        description: data[0].description,
                        isPublish: data[0].published
                    }
                })
               
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
const createProductSlice = createSlice({
    name: 'createProduct',
    initialState: {
        data: [],
        status: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createProduct.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.status = "success";
                state.data = action.payload;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.error.message;
            });
    },
});

export default createProductSlice.reducer
