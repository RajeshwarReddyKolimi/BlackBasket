import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "../Thunks/productThunks";

const productSlice = createSlice({
    name: "Product",
    initialState: {
        products: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        });
    },
});

export default productSlice;
