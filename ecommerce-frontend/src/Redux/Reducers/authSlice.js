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
        const setLoadingState = (state) => {};
        builder.addCase(userSignup.pending, setLoadingState);
        builder.addCase(userSignup.fulfilled, (state, action) => {
            state.isUserLogged = true;
            state.userData = {};
        });
        builder.addCase(userSignup.rejected, (state, action) => {
            state.isUserLogged = false;
            state.userData = {};
        });
        builder.addCase(userLogin.pending, setLoadingState);
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.isUserLogged = true;
        });
        builder.addCase(userLogin.rejected, (state, action) => {
            console.log(action.payload);
            state.userData = {};
            state.isUserLogged = false;
        });

        builder.addCase(userLogout.pending, setLoadingState);
        builder.addCase(userLogout.fulfilled, (state, action) => {
            state.isUserLogged = false;
            state.userData = {};
        });
        builder.addCase(userLogout.rejected, (state, action) => {
            state.isUserLogged = false;
            state.userData = {};
        });
        builder.addCase(getUserDetails.pending, setLoadingState);
        builder.addCase(getUserDetails.fulfilled, (state, action) => {
            state.isUserLogged = true;
            state.userData = action.payload;
        });
        builder.addCase(updateUserDetails.pending, setLoadingState);
        builder.addCase(updateUserDetails.fulfilled, (state, action) => {
            state.userData = action.payload;
        });
        builder.addCase(updateUserDetails.rejected, (state, action) => {
            state.userData = {};
        });
        builder.addCase(addUserAddress.pending, setLoadingState);
        builder.addCase(addUserAddress.fulfilled, (state, action) => {
            state.userData = action.payload;
        });
        builder.addCase(addUserAddress.rejected, (state, action) => {
            state.userData = {};
        });

        builder.addCase(updateUserAddress.pending, setLoadingState);
        builder.addCase(updateUserAddress.fulfilled, (state, action) => {
            state.userData = action.payload;
        });
        builder.addCase(updateUserAddress.rejected, (state, action) => {
            state.userData = {};
        });
        builder.addCase(removeFromCart.pending, setLoadingState);
        builder.addCase(removeFromCart.fulfilled, (state, action) => {
            state.userData.cart = action.payload;
            state.userData.cartSize = action.payload.items
                ? action.payload.items.length
                : 0;
        });
        builder.addCase(removeFromCart.rejected, (state, action) => {});
        builder.addCase(addToCart.pending, setLoadingState);
        builder.addCase(addToCart.fulfilled, (state, action) => {
            state.userData.cart = action.payload;
            state.userData.cartSize =
                action.payload && action.payload.items
                    ? action.payload.items.length
                    : 0;
        });
        builder.addCase(addToCart.rejected, (state, action) => {});
        builder.addCase(addToSaveLater.pending, setLoadingState);
        builder.addCase(addToSaveLater.fulfilled, (state, action) => {
            state.userData.wishlist = action.payload;
            state.userData.wishlistSize = state.userData.wishlist.length;
        });
        builder.addCase(addToSaveLater.rejected, (state, action) => {});
        builder.addCase(removeFromSaveLater.pending, setLoadingState);
        builder.addCase(removeFromSaveLater.fulfilled, (state, action) => {
            state.userData.wishlist = action.payload;
            state.userData.wishlistSize = state.userData.wishlist.length;
        });
        builder.addCase(removeFromSaveLater.rejected, (state, action) => {});
        builder.addCase(updateCartItemQuantity.pending, setLoadingState);
        builder.addCase(updateCartItemQuantity.fulfilled, (state, action) => {
            state.userData.cart = action.payload;
            state.userData.cartSize =
                action.payload && action.payload.items
                    ? action.payload.items.length
                    : 0;
        });
        builder.addCase(updateCartItemQuantity.rejected, (state, action) => {});
        builder.addCase(getCart.pending, setLoadingState);
        builder.addCase(getCart.fulfilled, (state, action) => {
            state.userData.cart = action.payload;
            state.userData.cartSize =
                action.payload && action.payload.items
                    ? action.payload.items.length
                    : 0;
        });
        builder.addCase(getCart.rejected, (state, action) => {});
        builder.addCase(getUserCoupons.pending, setLoadingState);
        builder.addCase(getUserCoupons.fulfilled, (state, action) => {
            state.userData.coupons = action.payload;
        });
        builder.addCase(getUserCoupons.rejected, (state, action) => {});
        builder.addCase(getUserOrders.pending, setLoadingState);
        builder.addCase(getUserOrders.fulfilled, (state, action) => {
            state.userData.orders = action.payload;
        });
        builder.addCase(getUserOrders.rejected, (state, action) => {});

        builder.addCase(applyCoupon.pending, setLoadingState);
        builder.addCase(applyCoupon.fulfilled, (state, action) => {
            state.userData.cart = action.payload;
        });
        builder.addCase(applyCoupon.rejected, (state, action) => {});

        builder.addCase(createOrder.pending, setLoadingState);
        builder.addCase(createOrder.fulfilled, (state, action) => {});
        builder.addCase(createOrder.rejected, (state, action) => {});

        builder.addCase(getWishlist.pending, setLoadingState);
        builder.addCase(getWishlist.fulfilled, (state, action) => {
            state.userData.wishlist = action.payload;
        });
        builder.addCase(getWishlist.rejected, (state, action) => {});

        builder.addCase(deleteAddress.pending, setLoadingState);
        builder.addCase(deleteAddress.fulfilled, (state, action) => {
            state.userData.address = action.payload;
        });
        builder.addCase(deleteAddress.rejected, (state, action) => {});

        builder.addCase(deleteAccount.pending, setLoadingState);
        builder.addCase(deleteAccount.fulfilled, (state, action) => {
            state.userData = {};
        });
        builder.addCase(deleteAccount.rejected, (state, action) => {});

        builder.addCase(createQuery.pending, setLoadingState);
        builder.addCase(createQuery.fulfilled, (state, action) => {
            state.userData.queries = action.payload;
        });
        builder.addCase(createQuery.rejected, (state, action) => {});
    },
});

export const { addItem, updateAddress } = userSlice.actions;

export default userSlice;
