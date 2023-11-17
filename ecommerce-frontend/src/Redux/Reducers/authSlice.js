import { createSlice } from "@reduxjs/toolkit";
import {
    userLogin,
    userLogout,
    getUserDetails,
    getCart,
    removeFromCart,
    addToCart,
    getWishlist,
    userSignup,
    applyCoupon,
    createOrder,
    updateUserDetails,
    addUserAddress,
    updateUserAddress,
    getUserOrders,
    updateCartItemQuantity,
    deleteAccount,
    getUserCoupons,
    addToSaveLater,
    removeFromSaveLater,
    deleteAddress,
} from "../Thunks/userThunks";
import { createQuery } from "../Thunks/enquiryThunks";

const userSlice = createSlice({
    name: "User",
    initialState: {
        loading: true,
        couponLoading: false,
        cartLoading: false,
        orderLoading: false,
        saveLaterLoading: false,
        isUserLogged: false,
        userData: {},
    },
    reducers: {
        addItem: (state, action) => {
            state.userData.cart = action.payload;
        },
        updateAddress: (state, action) => {
            state.userData.address = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(userSignup.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(userSignup.fulfilled, (state, action) => {
            state.isUserLogged = true;
            state.userData = {};
        });
        builder.addCase(userSignup.rejected, (state, action) => {
            state.isUserLogged = false;
            state.userData = {};
        });
        builder.addCase(userLogin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.isUserLogged = true;
        });
        builder.addCase(userLogin.rejected, (state, action) => {
            state.userData = {};
            state.isUserLogged = false;
        });

        builder.addCase(userLogout.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(userLogout.fulfilled, (state, action) => {
            state.isUserLogged = false;
            state.userData = {};
        });
        builder.addCase(userLogout.rejected, (state, action) => {
            state.isUserLogged = false;
            state.userData = {};
        });
        builder.addCase(getUserDetails.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUserDetails.fulfilled, (state, action) => {
            state.isUserLogged = true;
            state.userData = action.payload;
        });
        builder.addCase(updateUserDetails.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateUserDetails.fulfilled, (state, action) => {
            state.userData = action.payload;
        });
        builder.addCase(updateUserDetails.rejected, (state, action) => {
            state.userData = {};
        });
        builder.addCase(addUserAddress.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addUserAddress.fulfilled, (state, action) => {
            state.userData = action.payload;
        });
        builder.addCase(addUserAddress.rejected, (state, action) => {
            state.userData = {};
        });

        builder.addCase(updateUserAddress.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateUserAddress.fulfilled, (state, action) => {
            state.userData = action.payload;
        });
        builder.addCase(updateUserAddress.rejected, (state, action) => {
            state.userData = {};
        });

        builder.addCase(removeFromCart.fulfilled, (state, action) => {
            state.userData.cart = action.payload;
            state.userData.cartSize = action.payload.items
                ? action.payload.items.length
                : 0;
        });
        builder.addCase(removeFromCart.rejected, (state, action) => {});
        builder.addCase(addToCart.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addToCart.fulfilled, (state, action) => {
            state.userData.cart = action.payload;
            state.userData.cartSize =
                action.payload && action.payload.items
                    ? action.payload.items.length
                    : 0;
        });
        builder.addCase(addToCart.rejected, (state, action) => {});
        builder.addCase(addToSaveLater.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addToSaveLater.fulfilled, (state, action) => {
            state.userData.wishlist = action.payload;
            state.userData.wishlistSize = state.userData.wishlist.length;
        });
        builder.addCase(addToSaveLater.rejected, (state, action) => {});
        builder.addCase(removeFromSaveLater.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(removeFromSaveLater.fulfilled, (state, action) => {
            state.userData.wishlist = action.payload;
            state.userData.wishlistSize = state.userData.wishlist.length;
        });
        builder.addCase(removeFromSaveLater.rejected, (state, action) => {});
        builder.addCase(updateCartItemQuantity.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateCartItemQuantity.fulfilled, (state, action) => {
            state.userData.cart = action.payload;
            state.userData.cartSize =
                action.payload && action.payload.items
                    ? action.payload.items.length
                    : 0;
        });
        builder.addCase(updateCartItemQuantity.rejected, (state, action) => {});
        builder.addCase(getCart.pending, (state) => {
            state.cartLoading = true;
        });
        builder.addCase(getCart.fulfilled, (state, action) => {
            state.userData.cart = action.payload;
            state.userData.cartSize =
                action.payload && action.payload.items
                    ? action.payload.items.length
                    : 0;
            state.cartLoading = false;
        });
        builder.addCase(getCart.rejected, (state, action) => {
            state.cartLoading = false;
        });
        builder.addCase(getUserCoupons.pending, (state) => {
            state.couponLoading = true;
        });
        builder.addCase(getUserCoupons.fulfilled, (state, action) => {
            state.userData.coupons = action.payload;
            state.couponLoading = false;
        });
        builder.addCase(getUserCoupons.rejected, (state, action) => {
            state.couponLoading = false;
        });
        builder.addCase(getUserOrders.pending, (state) => {
            state.orderLoading = true;
        });
        builder.addCase(getUserOrders.fulfilled, (state, action) => {
            state.userData.orders = action.payload;
            state.orderLoading = false;
        });
        builder.addCase(getUserOrders.rejected, (state, action) => {
            state.couponLoading = false;
        });

        builder.addCase(applyCoupon.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(applyCoupon.fulfilled, (state, action) => {
            state.userData.cart = action.payload;
        });
        builder.addCase(applyCoupon.rejected, (state, action) => {});

        builder.addCase(createOrder.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createOrder.fulfilled, (state, action) => {});
        builder.addCase(createOrder.rejected, (state, action) => {});

        builder.addCase(getWishlist.pending, (state) => {
            state.saveLaterLoading = true;
        });
        builder.addCase(getWishlist.fulfilled, (state, action) => {
            state.userData.wishlist = action.payload;
            state.saveLaterLoading = false;
        });
        builder.addCase(getWishlist.rejected, (state, action) => {
            state.saveLaterLoading = false;
        });

        builder.addCase(deleteAddress.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteAddress.fulfilled, (state, action) => {
            state.userData.address = action.payload;
        });
        builder.addCase(deleteAddress.rejected, (state, action) => {});

        builder.addCase(deleteAccount.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteAccount.fulfilled, (state, action) => {
            state.userData = {};
        });
        builder.addCase(deleteAccount.rejected, (state, action) => {});

        builder.addCase(createQuery.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createQuery.fulfilled, (state, action) => {
            state.userData.queries = action.payload;
        });
        builder.addCase(createQuery.rejected, (state, action) => {});
    },
});

export const { addItem, updateAddress } = userSlice.actions;

export default userSlice;
