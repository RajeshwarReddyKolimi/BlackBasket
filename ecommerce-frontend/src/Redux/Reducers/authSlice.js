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
    userSignup,
    applyCoupon,
    createOrder,
    updateUserDetails,
    addUserAddress,
    updateUserAddress,
} from "../Thunks/userThunks";

const userSlice = createSlice({
    name: "User",
    initialState: {
        isUserLogged: false,
        errorMessage: "",
        userData: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        const setLoadingState = (state) => {
            state.errorMessage = "Loading";
        };
        builder.addCase(userSignup.pending, setLoadingState);
        builder.addCase(userSignup.fulfilled, (state, action) => {
            state.isUserLogged = true;
            state.errorMessage = "";
            document.cookie = `refreshToken=${action.payload.token}; path=/; expires=Wed, 31 Oct 2023 07:28:00 GMT;`;
            state.userData = {};
        });
        builder.addCase(userSignup.rejected, (state, action) => {
            state.isUserLogged = false;
            state.errorMessage = "Cannot Signup";
            state.userData = {};
        });
        builder.addCase(userLogin.pending, setLoadingState);
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.isUserLogged = true;
            document.cookie = `refreshToken=${action.payload.token}; path=/; expires=Wed, 31 Oct 2023 07:28:00 GMT;`;
            state.errorMessage = "";
        });
        builder.addCase(userLogin.rejected, (state, action) => {
            state.errorMessage = "Cannot Log In";
            state.userData = {};
            state.isUserLogged = false;
        });

        builder.addCase(userLogout.pending, setLoadingState);
        builder.addCase(userLogout.fulfilled, (state, action) => {
            state.isUserLogged = false;
            state.userData = {};
            state.errorMessage = "";
        });
        builder.addCase(userLogout.rejected, (state, action) => {
            state.errorMessage = "Cannot Log Out";
            state.isUserLogged = false;
            state.userData = {};
        });
        builder.addCase(getUserDetails.pending, setLoadingState);
        builder.addCase(getUserDetails.fulfilled, (state, action) => {
            state.errorMessage = "";
            state.isUserLogged = true;
            state.userData = action.payload;
        });
        builder.addCase(updateUserDetails.pending, setLoadingState);
        builder.addCase(updateUserDetails.fulfilled, (state, action) => {
            state.errorMessage = "";
            state.userData = action.payload;
        });
        builder.addCase(updateUserDetails.rejected, (state, action) => {
            state.errorMessage = "Cannot Update Details";
            state.userData = {};
        });
        builder.addCase(addUserAddress.pending, setLoadingState);
        builder.addCase(addUserAddress.fulfilled, (state, action) => {
            state.errorMessage = "";
            state.userData = action.payload;
        });
        builder.addCase(addUserAddress.rejected, (state, action) => {
            state.errorMessage = "Cannot Add Address";
            state.userData = {};
        });

        builder.addCase(updateUserAddress.pending, setLoadingState);
        builder.addCase(updateUserAddress.fulfilled, (state, action) => {
            state.errorMessage = "";
            state.userData = action.payload;
        });
        builder.addCase(updateUserAddress.rejected, (state, action) => {
            state.errorMessage = "Cannot Add Address";
            state.userData = {};
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
            state.userData.cartSize =
                action.payload && action.payload.items
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
            state.userData.cartSize =
                action.payload && action.payload.items
                    ? action.payload.items.length
                    : 0;
        });
        builder.addCase(getCart.rejected, (state, action) => {
            state.errorMessage = "Cannot Get Cart";
        });

        builder.addCase(applyCoupon.pending, setLoadingState);
        builder.addCase(applyCoupon.fulfilled, (state, action) => {
            state.errorMessage = "";
            state.userData.cart = action.payload;
        });
        builder.addCase(applyCoupon.rejected, (state, action) => {
            state.errorMessage = "Cannot Apply Coupon";
        });

        builder.addCase(createOrder.pending, setLoadingState);
        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.errorMessage = "";
        });
        builder.addCase(createOrder.rejected, (state, action) => {
            state.errorMessage = "Cannot Create Order";
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