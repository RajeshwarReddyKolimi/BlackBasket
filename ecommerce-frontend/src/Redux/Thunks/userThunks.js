import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Import Axios

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
    async (credentials, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post(
                "http://localhost:4000/api/user/register",
                {
                    email: credentials.email,
                    password: credentials.password,
                    firstName: credentials.firstName,
                    lastName: credentials.lastName,
                }
            );
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
            const response = await axios.post(
                "http://localhost:4000/api/user/login",
                {
                    email: credentials.email,
                    password: credentials.password,
                }
            );
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
            const response = await axios.get(
                "http://localhost:4000/api/user/logout",
                {
                    withCredentials: true, // Include credentials
                }
            );
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
            const response = await axios.get(
                "http://localhost:4000/api/user/details",
                {
                    withCredentials: true, // Include credentials
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
            const response = await axios.put(
                "http://localhost:4000/api/user/cart/remove",
                {
                    productId: productId,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${findToken()}`,
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
                "http://localhost:4000/api/product/cart",
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

export const toWishlist = createAsyncThunk(
    "/toWishlist",
    async (productId, { dispatch, rejectWithValue }) => {
        try {
            const token = await findToken();

            const response = await axios.put(
                "http://localhost:4000/api/product/wishlist",
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

export const getWishlist = createAsyncThunk(
    "/getWishlist",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const token = await findToken();

            const response = await axios.get(
                "http://localhost:4000/api/user/wishlist",
                {
                    withCredentials: true,
                    headers: {
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
export const getCart = createAsyncThunk(
    "/getCart",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const token = await findToken();

            const response = await axios.get(
                "http://localhost:4000/api/user/cart",
                {
                    withCredentials: true, // Include credentials
                    headers: {
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
