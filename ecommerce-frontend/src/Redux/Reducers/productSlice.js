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
        products: [],
        searchedProduct: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        const setLoadingState = (state) => {};

        builder.addCase(getProducts.pending, setLoadingState);
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        });
        builder.addCase(getProducts.rejected, (state, action) => {});

        builder.addCase(getProductById.pending, setLoadingState);
        builder.addCase(getProductById.fulfilled, (state, action) => {
            state.searchedProduct = action.payload;
        });
        builder.addCase(getProductById.rejected, (state, action) => {});

        builder.addCase(createProduct.pending, setLoadingState);
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.products.push(action.payload);
        });
        builder.addCase(createProduct.rejected, (state, action) => {});

        builder.addCase(updateProduct.pending, setLoadingState);
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            const updatedProduct = action.payload;
            const productIndex = state.products.findIndex(
                (product) => product._id === updatedProduct._id
            );
            if (productIndex !== -1) {
                state.products[productIndex] = updatedProduct;
            }
        });
        builder.addCase(updateProduct.rejected, (state, action) => {});

        builder.addCase(deleteProduct.pending, setLoadingState);
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            const deletedProductId = action.payload._id;
            state.products = state.products.filter(
                (product) => product._id !== deletedProductId
            );
        });
        builder.addCase(deleteProduct.rejected, (state, action) => {});
    },
});

export default productSlice;
