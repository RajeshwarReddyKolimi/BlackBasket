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
    async (credentials, { dispatch, rejectWithValue }) => {
        const token = await findToken();
        const { name, expiry, discount } = credentials;
        try {
            const response = await axios.post(
                "http://localhost:4000/api/coupon",
                {
                    name: name,
                    expiry: expiry,
                    discount: discount,
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
            const response = await axios.get(
                "http://localhost:4000/api/coupon",
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

export const deleteCoupon = createAsyncThunk(
    "/admin/coupon/",
    async (credentials, { dispatch, rejectWithValue }) => {
        try {
            const token = await findToken();
            const id = credentials;
            const response = await axios.delete(
                `http://localhost:4000/api/coupon/${id}`,
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
