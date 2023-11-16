import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Import Axios
import apiUrl from "../../apiUrl";

import { setSuccessMessage, setErrorMessage } from "../Reducers/globalSlice";

export const userSignup = createAsyncThunk(
    "/signup",
    async (userDetails, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiUrl}/user/register`, {
                userDetails,
            });
            dispatch(setSuccessMessage("Successfully Signed up"));
            return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error.response.data.message));
            console.error("Fetch error:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const userLogin = createAsyncThunk(
    "/login",
    async (credentials, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiUrl}/user/login`, {
                email: credentials.email,
                password: credentials.password,
            });
            dispatch(setSuccessMessage("Successfully Logged in!"));
            return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error.response.data.message));
            console.error("Fetch error:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const userLogout = createAsyncThunk(
    "/logout",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiUrl}/user/logout`, {
                withCredentials: true,
            });
            dispatch(setSuccessMessage("Successfully Logged out!"));
            return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error.response.data.message));
            console.error("Fetch error:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const getUserDetails = createAsyncThunk(
    "/getUserDetails",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiUrl}/user/details`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error("Fetch error:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const updateUserDetails = createAsyncThunk(
    "/updateUserDetails",
    async (details, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${apiUrl}/user/update`,
                {
                    firstName: details.firstName,
                    lastName: details.lastName,
                    email: details.email,
                    mobile: details.mobile,
                },
                {
                    withCredentials: true,
                }
            );

            dispatch(setSuccessMessage("Profile Updated"));
            return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error.response.data.message));
            console.error("Fetch error:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const addUserAddress = createAsyncThunk(
    "/addUserAddress",
    async (address, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${apiUrl}/user/address`,
                {
                    address: address,
                },
                { withCredentials: true }
            );
            dispatch(setSuccessMessage("Address Added"));
            return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error.response.data.message));
            console.error("Fetch error:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const updateUserAddress = createAsyncThunk(
    "/updateUserAddress",
    async ({ id, address }, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${apiUrl}/user/address/${id}`,
                {
                    address: address,
                },
                { withCredentials: true }
            );
            dispatch(setSuccessMessage("Address Updated"));
            return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error.response.data.message));
            console.error("Fetch error:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const removeFromCart = createAsyncThunk(
    "/removeFromCart",
    async (productId, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${apiUrl}/user/cart/remove`,
                {
                    productId: productId,
                },
                { withCredentials: true }
            );
            dispatch(setSuccessMessage("Removed from Cart"));
            return response.data;
        } catch (error) {
            console.error("Error:", error);

            dispatch(setErrorMessage(error.response.data.message));
            return rejectWithValue(error.message);
        }
    }
);

export const addToCart = createAsyncThunk(
    "/addToCart",
    async (productId, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${apiUrl}/product/cart`,
                {
                    productId,
                },
                { withCredentials: true }
            );
            dispatch(setSuccessMessage("Added to Cart"));
            return response.data;
        } catch (error) {
            console.error("Error:", error);

            dispatch(setErrorMessage(error.response.data.message));
            return rejectWithValue(error.message);
        }
    }
);

export const updateCartItemQuantity = createAsyncThunk(
    "/updateCartItemQuantity",
    async ({ productId, value }, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${apiUrl}/user/cart/update`,
                {
                    productId,
                    value,
                },
                { withCredentials: true }
            );

            dispatch(setSuccessMessage("Quantity Updated"));
            return response.data;
        } catch (error) {
            console.error("Error:", error);

            dispatch(setErrorMessage(error.response.data.message));
            return rejectWithValue(error.message);
        }
    }
);

export const addToSaveLater = createAsyncThunk(
    "/addToSaveLater",
    async (productId, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${apiUrl}/product/wishlist/${productId}`,
                {},
                { withCredentials: true }
            );

            dispatch(setSuccessMessage("Added to save for later"));
            return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error.response.data.message));
            console.error("Error:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const removeFromSaveLater = createAsyncThunk(
    "/removeFromSaveLater",
    async (productId, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${apiUrl}/product/wishlist/${productId}`,
                { withCredentials: true }
            );
            dispatch(setSuccessMessage("Removed from save for later"));
            return response.data;
        } catch (error) {
            console.error("Error:", error);

            dispatch(setErrorMessage(error.response.data.message));
            return rejectWithValue(error.message);
        }
    }
);

export const getWishlist = createAsyncThunk(
    "/getWishlist",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiUrl}/user/wishlist`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getCart = createAsyncThunk(
    "/getCart",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiUrl}/user/cart`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error("Fetch error:", error);
            return rejectWithValue(error.message);
        }
    }
);
export const getUserCoupons = createAsyncThunk(
    "/getUserCoupons",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiUrl}/user/coupons`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error("Fetch error:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const getUserOrders = createAsyncThunk(
    "/getUserOrders",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiUrl}/user/orders`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error("Fetch error:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const applyCoupon = createAsyncThunk(
    "/user/coupon/",
    async ({ couponCode }, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${apiUrl}/user/applyCoupon`,
                {
                    couponCode,
                },
                { withCredentials: true }
            );

            dispatch(setSuccessMessage("Coupon applied"));
            return response.data;
        } catch (error) {
            console.error("Fetch error:", error);

            dispatch(setErrorMessage(error.response.data.message));
            return rejectWithValue(error.message);
        }
    }
);

export const createOrder = createAsyncThunk(
    "/user/order/",
    async (
        { couponCode, address, finalPrice },
        { dispatch, rejectWithValue }
    ) => {
        try {
            const response = await axios.post(
                `${apiUrl}/user/createOrder`,
                {
                    couponCode,
                    address,
                    finalPrice,
                },
                { withCredentials: true }
            );

            dispatch(setSuccessMessage("Order Success"));
            return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error.response.data.message));
            console.error("Fetch error:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const updateRating = createAsyncThunk(
    "/user/delete",
    async ({ id, userStar, userComment }, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${apiUrl}/product/rating`,
                {
                    star: userStar,
                    productId: id,
                    comment: userComment,
                },
                { withCredentials: true }
            );
            dispatch(setSuccessMessage("Rating Updated"));
            return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error.response.data.message));
            console.error("Fetch error:", error);
            return rejectWithValue(error.message);
        }
    }
);
export const deleteAddress = createAsyncThunk(
    "/user/address/delete",
    async ({ id }, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${apiUrl}/user/address/${id}`,
                { withCredentials: true }
            );
            dispatch(setSuccessMessage("Address Deleted"));
            return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error.response.data.message));
            console.error("Fetch error:", error);
            return rejectWithValue(error.message);
        }
    }
);
export const deleteAccount = createAsyncThunk(
    "/user/delete",
    async (credentials, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.delete(`${apiUrl}/user`, {
                withCredentials: true,
            });

            dispatch(setSuccessMessage("Account deleted Successfully"));
            return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error.response.data.message));
            console.error("Fetch error:", error);
            return rejectWithValue(error.message);
        }
    }
);
