import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Import Axios
import apiUrl from "../../apiUrl";

async function findToken() {
    const cookie = document.cookie
        .split(";")
        .find((cookie) => cookie.startsWith("refreshToken="));
    let token = "";
    if (cookie) token = cookie.split("=")[1];
    return token;
}

export const userSignup = createAsyncThunk(
    "/signup",
    async (userDetails, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiUrl}/user/register`, {
                userDetails,
            });
            return response.data;
        } catch (error) {
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
            return response.data;
        } catch (error) {
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
                withCredentials: true, // Include credentials
            });
            return response.data;
        } catch (error) {
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
            const token = await findToken();
            const response = await axios.put(
                `${apiUrl}/user/update`,
                {
                    firstName: details.firstName,
                    lastName: details.lastName,
                    email: details.email,
                    mobile: details.mobile,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Fetch error:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const addUserAddress = createAsyncThunk(
    "/addUserAddress",
    async (address, { dispatch, rejectWithValue }) => {
        try {
            const token = await findToken();
            const response = await axios.post(
                `${apiUrl}/user/address`,
                {
                    address: address,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Fetch error:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const updateUserAddress = createAsyncThunk(
    "/updateUserAddress",
    async ({ id, address }, { dispatch, rejectWithValue }) => {
        try {
            const token = await findToken();
            const response = await axios.put(
                `${apiUrl}/user/address/${id}`,
                {
                    address: address,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Fetch error:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const removeFromCart = createAsyncThunk(
    "/removeFromCart",
    async (productId, { dispatch, rejectWithValue }) => {
        try {
            const token = await findToken();

            const response = await axios.put(
                `${apiUrl}/user/cart/remove`,
                {
                    productId: productId,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const addToCart = createAsyncThunk(
    "/addToCart",
    async (productId, { dispatch, rejectWithValue }) => {
        try {
            const token = await findToken();
            const response = await axios.put(
                `${apiUrl}/product/cart`,
                {
                    productId,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const updateCartItemQuantity = createAsyncThunk(
    "/updateCartItemQuantity",
    async ({ productId, value }, { dispatch, rejectWithValue }) => {
        try {
            const token = await findToken();
            const response = await axios.put(
                `${apiUrl}/user/cart/update`,
                {
                    productId,
                    value,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const addToSaveLater = createAsyncThunk(
    "/addToSaveLater",
    async (productId, { dispatch, rejectWithValue }) => {
        try {
            const token = await findToken();

            const response = await axios.put(
                `${apiUrl}/product/wishlist/${productId}`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const removeFromSaveLater = createAsyncThunk(
    "/removeFromSaveLater",
    async (productId, { dispatch, rejectWithValue }) => {
        try {
            const token = await findToken();
            const response = await axios.delete(
                `${apiUrl}/product/wishlist/${productId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            console.error("Error:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const getWishlist = createAsyncThunk(
    "/getWishlist",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const token = await findToken();
            const response = await axios.get(`${apiUrl}/user/wishlist`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
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
            const token = await findToken();
            const response = await axios.get(`${apiUrl}/user/cart`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
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
            const token = await findToken();
            const response = await axios.get(`${apiUrl}/user/coupons`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
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
            const token = await findToken();
            const response = await axios.get(`${apiUrl}/user/orders`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
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
            const token = await findToken();
            const response = await axios.put(
                `${apiUrl}/user/applyCoupon`,
                {
                    couponCode,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Fetch error:", error);
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
            const token = await findToken();
            const response = await axios.post(
                `${apiUrl}/user/createOrder`,
                {
                    couponCode,
                    address,
                    finalPrice,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Fetch error:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const deleteAccount = createAsyncThunk(
    "/user/delete",
    async (credentials, { dispatch, rejectWithValue }) => {
        try {
            const token = await findToken();
            const couponId = credentials;
            const response = await axios.delete(`${apiUrl}/user`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Fetch error:", error);
            return rejectWithValue(error.message);
        }
    }
);
