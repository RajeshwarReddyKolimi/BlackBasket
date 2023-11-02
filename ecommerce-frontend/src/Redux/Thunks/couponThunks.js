import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

async function findToken() {
    const cookie = document.cookie
        .split(";")
        .find((cookie) => cookie.startsWith("refreshToken="));
    let token = "";
    if (cookie) token = cookie.split("=")[1];
    return token;
}

export const createCoupon = createAsyncThunk(
    "/admin/coupon/create",
    async (coupon, { dispatch, rejectWithValue }) => {
        const token = await findToken();
        try {
            const response = await axios.post(
                `${apiUrl}/coupon`,
                {
                    coupon,
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

export const updateCoupon = createAsyncThunk(
    "/admin/coupon/update",
    async ({ coupon, id }, { dispatch, rejectWithValue }) => {
        const token = await findToken();
        try {
            const response = await axios.put(
                `${apiUrl}/coupon/${id}`,
                {
                    coupon,
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

export const getCoupons = createAsyncThunk(
    "/admin/coupon/get",
    async (credentials, { dispatch, rejectWithValue }) => {
        try {
            const token = await findToken();
            const response = await axios.get(`${apiUrl}/coupon`, {
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

export const deleteCoupon = createAsyncThunk(
    "/admin/coupon/",
    async (credentials, { dispatch, rejectWithValue }) => {
        try {
            const token = await findToken();
            const id = credentials;
            const response = await axios.delete(`${apiUrl}/coupon/${id}`, {
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
