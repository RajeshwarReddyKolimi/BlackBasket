import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
    userLogin,
    userLogout,
    getUserDetails,
    getCart,
    removeFromCart,
    addToCart,
    toWishlist,
    getWishlist,
} from "../Thunks/userThunks";

const userSlice = createSlice({
    name: "User",
    initialState: {
        loginStatus: false,
        errorMessage: "",
        userData: {},
    },
    reducers: {
        checkStatus: (state, action) => {
            let cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim();
                if (cookie.indexOf("refreshToken=") === 0) {
                    state.loginStatus = true;
                    return;
                }
            }
            state.loginStatus = false;
        },
    },
    extraReducers: (builder) => {
        const setLoadingState = (state) => {
            state.errorMessage = "Loading";
        };
        builder.addCase(userLogin.pending, setLoadingState);
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.loginStatus = true;
            state.userData = action.payload;
            state.errorMessage = "";
        });
        builder.addCase(userLogin.rejected, (state, action) => {
            state.errorMessage = "Cannot Log In";
            state.userData = {};
            state.loginStatus = false;
        });
        builder.addCase(userLogout.fulfilled, (state, action) => {
            state.loginStatus = false;
            state.userData = {};
            state.errorMessage = "";
        });
        builder.addCase(userLogout.rejected, (state, action) => {
            state.errorMessage = "Cannot Log Out";
            state.userData = {};
            state.loginStatus = false;
        });
        builder.addCase(getUserDetails.pending, setLoadingState);
        builder.addCase(getUserDetails.fulfilled, (state, action) => {
            state.errorMessage = "";
            state.loginStatus = true;
            state.userData = action.payload;
        });
        builder.addCase(getUserDetails.rejected, (state, action) => {
            state.errorMessage = "Cannot Get Details";
            state.userData = {};
            state.loginStatus = false;
        });
        builder.addCase(removeFromCart.pending, setLoadingState);
        builder.addCase(removeFromCart.fulfilled, (state, action) => {
            state.errorMessage = "";
            state.userData.cart = action.payload;
            state.userData.cartSize = action.payload.items
                ? action.payload.items.length
                : 0;
        });
        builder.addCase(removeFromCart.rejected, (state, action) => {
            state.errorMessage = "Cannot Remove from Cart";
        });
        builder.addCase(addToCart.pending, setLoadingState);
        builder.addCase(addToCart.fulfilled, (state, action) => {
            state.errorMessage = "";
            state.userData.cart = action.payload;
            state.userData.cartSize = action.payload.items
                ? action.payload.items.length
                : 0;
        });
        builder.addCase(addToCart.rejected, (state, action) => {
            state.errorMessage = "Cannot Add to Cart";
        });
        builder.addCase(getCart.pending, setLoadingState);
        builder.addCase(getCart.fulfilled, (state, action) => {
            state.errorMessage = "";
            state.userData.cart = action.payload;
            state.userData.cartSize = action.payload.items
                ? action.payload.items.length
                : 0;
        });
        builder.addCase(getCart.rejected, (state, action) => {
            state.errorMessage = "Cannot Get Cart";
        });
        builder.addCase(toWishlist.pending, setLoadingState);
        builder.addCase(toWishlist.fulfilled, (state, action) => {
            state.errorMessage = "";
            state.userData.wishlist = action.payload;
            state.userData.wishlistSize = state.userData.wishlist.length;
        });
        builder.addCase(toWishlist.rejected, (state, action) => {
            state.errorMessage = "Cannot Wishlist";
        });
        builder.addCase(getWishlist.pending, setLoadingState);
        builder.addCase(getWishlist.fulfilled, (state, action) => {
            state.errorMessage = "";
            state.userData.wishlist = action.payload;
            state.userData.wishlistSize = state.userData.wishlist.length;
        });
        builder.addCase(getWishlist.rejected, (state, action) => {
            state.errorMessage = "Cannot Get Wishlist";
        });
    },
});

export default userSlice;
export const { checkStatus } = userSlice.actions;
