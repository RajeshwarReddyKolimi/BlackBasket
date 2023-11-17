import { createSlice } from "@reduxjs/toolkit";
import {
    createProduct,
    deleteProduct,
    getProductById,
    getProducts,
    updateProduct,
} from "../Thunks/productThunks";

const productSlice = createSlice({
    name: "Product",
    initialState: {
        loading: false,
        products: [],
        searchedProduct: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        const setLoadingState = (state) => {
            state.loading = true;
        };

        builder.addCase(getProducts.pending, setLoadingState);
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.loading = false;
        });
        builder.addCase(getProducts.rejected, (state, action) => {
            state.loading = false;
        });

        builder.addCase(getProductById.pending, setLoadingState);
        builder.addCase(getProductById.fulfilled, (state, action) => {
            state.searchedProduct = action.payload;
            state.loading = false;
        });
        builder.addCase(getProductById.rejected, (state, action) => {
            state.loading = false;
        });

        builder.addCase(createProduct.pending, setLoadingState);
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.products.push(action.payload);
            state.loading = false;
        });
        builder.addCase(createProduct.rejected, (state, action) => {
            state.loading = false;
        });

        builder.addCase(updateProduct.pending, setLoadingState);
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            const updatedProduct = action.payload;
            const productIndex = state.products.findIndex(
                (product) => product._id === updatedProduct._id
            );
            if (productIndex !== -1) {
                state.products[productIndex] = updatedProduct;
            }
            state.loading = false;
        });
        builder.addCase(updateProduct.rejected, (state, action) => {
            state.loading = false;
        });

        builder.addCase(deleteProduct.pending, setLoadingState);
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            const deletedProductId = action.payload._id;
            state.products = state.products.filter(
                (product) => product._id !== deletedProductId
            );
            state.loading = false;
        });
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false;
        });
    },
});

export default productSlice;
