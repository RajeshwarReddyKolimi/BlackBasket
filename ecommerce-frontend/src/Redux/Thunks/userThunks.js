import { createAsyncThunk } from "@reduxjs/toolkit";

const cookie = document.cookie
    .split(";")
    .find((cookie) => cookie.startsWith("refreshToken="));
const token = cookie.split("=")[1];

export const userLogin = createAsyncThunk(
    "/login",
    async (credentials, { dispatch, rejectWithValue }) => {
        try {
            const response = await fetch(
                "http://localhost:4000/api/user/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Failed to log in: ${response.status} ${response.statusText}`
                );
            }
            const res = await response.json();
            document.cookie = `refreshToken=${res.token}; path=/; expires=Wed, 21 Oct 2023 07:28:00 GMT;`;
            return res;
        } catch (error) {
            console.error("Fetch error:", error);
            return rejectWithValue(error.message);
        }
    }
);
export const userLogout = createAsyncThunk(
    "/logout",
    async (_, { dispatch, getState }) => {
        try {
            const response = await fetch(
                "http://localhost:4000/api/user/logout",
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Failed to log out: ${response.status} ${response.statusText}`
                );
            }
            return;
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }
);

export const getUserDetails = createAsyncThunk(
    "/getUserDetails",
    async (_, { dispatch, getState }) => {
        try {
            const response = await fetch(
                "http://localhost:4000/api/user/getUserDetails",
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Failed to fetch Details: ${response.status} ${response.statusText}`
                );
            }
            const res = await response.json();
            return res;
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }
);

export const getCart = createAsyncThunk(
    "/getCart",
    async (_, { dispatch, getState }) => {
        try {
            const response = await fetch(
                "http://localhost:4000/api/user/cart",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Failed to fetch Details: ${response.status} ${response.statusText}`
                );
            }
            const res = await response.json();
            return res;
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }
);

export const removeFromCart = createAsyncThunk(
    "/removeFromCart",
    async (productId, { dispatch, getState }) => {
        try {
            const response = await fetch(
                "http://localhost:4000/api/user/cart/removeFromCart",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        productId: productId,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Failed to removeFromCart: ${response.status} ${response.statusText}`
                );
            }
            const res = await response.json();
            return res;
        } catch (error) {
            console.error("Error:", error);
        }
    }
);

export const addToCart = createAsyncThunk(
    "/addToCart",
    async (productId, { dispatch, getState }) => {
        try {
            const response = await fetch(
                "http://localhost:4000/api/product/addToCart",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        productId,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Failed to addToCart: ${response.status} ${response.statusText}`
                );
            }
            const res = await response.json();
            return res;
        } catch (error) {
            console.error("Error:", error);
        }
    }
);

export const toWishlist = createAsyncThunk(
    "/toWishlist",
    async (productId, { dispatch, getState }) => {
        try {
            const response = await fetch(
                "http://localhost:4000/api/product/wishlist",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        productId,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Failed to addToCart: ${response.status} ${response.statusText}`
                );
            }
            const res = await response.json();
            return res;
        } catch (error) {
            console.error("Error:", error);
        }
    }
);

export const getWishlist = createAsyncThunk(
    "/getWishlist",
    async (_, { dispatch, getState }) => {
        try {
            const response = await fetch(
                "http://localhost:4000/api/user/wishlist",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Failed to fetch Details: ${response.status} ${response.statusText}`
                );
            }
            const res = await response.json();
            return res;
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }
);
