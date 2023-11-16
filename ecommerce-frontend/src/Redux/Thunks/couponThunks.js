import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../apiUrl";
import { setErrorMessage, setSuccessMessage } from "../Reducers/globalSlice";

export const createCoupon = createAsyncThunk(
    "/admin/coupon/create",
    async (coupon, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${apiUrl}/coupon`,
                {
                    coupon,
                },
                { withCredentials: true }
            );
            dispatch(setSuccessMessage("Coupon created"));
            return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error.response.data.message));
            console.error("Fetch error:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const updateCoupon = createAsyncThunk(
    "/admin/coupon/update",
    async ({ coupon, id }, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${apiUrl}/coupon/${id}`,
                {
                    coupon,
                },
                { withCredentials: true }
            );
            dispatch(setSuccessMessage("Coupon Updated"));
            return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error.response.data.message));
            console.error("Fetch error:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const getCoupons = createAsyncThunk(
    "/admin/coupon/get",
    async (credentials, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiUrl}/coupon`, {
                withCredentials: true,
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
            const id = credentials;
            const response = await axios.delete(`${apiUrl}/coupon/${id}`, {
                withCredentials: true,
            });
            dispatch(setSuccessMessage("Coupon Deleted"));
            return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error.response.data.message));
            console.error("Fetch error:", error);
            return rejectWithValue(error.message);
        }
    }
);
