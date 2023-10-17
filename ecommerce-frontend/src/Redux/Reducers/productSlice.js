import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    createProduct,
    deleteProduct,
    getProducts,
    updateProduct,
} from "../Thunks/productThunks";

const productSlice = createSlice({
    name: "Product",
    initialState: {
        errorMessage: "",
        products: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        const setLoadingState = (state) => {
            state.errorMessage = "Loading";
        };

        builder.addCase(getProducts.pending, setLoadingState);
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.errorMessage = "";
            state.products = action.payload;
        });
        builder.addCase(getProducts.rejected, (state, action) => {
            state.errorMessage = "Cannot get Products";
        });

        builder.addCase(createProduct.pending, setLoadingState);
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.errorMessage = "";
            state.products.push(action.payload);
        });
        builder.addCase(createProduct.rejected, (state, action) => {
            state.errorMessage = "Cannot Create Product";
        });

        builder.addCase(updateProduct.pending, setLoadingState);
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.errorMessage = "";
            const updatedProduct = action.payload;
            const productIndex = state.products.findIndex(
                (product) => product._id === updatedProduct._id
            );
            if (productIndex !== -1) {
                state.products[productIndex] = updatedProduct;
            }
        });
        builder.addCase(updateProduct.rejected, (state, action) => {
            state.errorMessage = "Cannot Update Product";
        });

        builder.addCase(deleteProduct.pending, setLoadingState);
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.errorMessage = "";
            const deletedProductId = action.payload._id;
            state.products = state.products.filter(
                (product) => product._id !== deletedProductId
            );
        });
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.errorMessage = "Cannot Delete Product";
        });
    },
});

export default productSlice;
