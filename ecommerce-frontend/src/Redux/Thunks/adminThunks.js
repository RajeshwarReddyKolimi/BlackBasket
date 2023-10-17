import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const adminLogin = createAsyncThunk(
    "/admin/login",
    async (credentials, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post(
                "http://localhost:4000/api/admin/login",
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

export const adminLogout = createAsyncThunk(
    "/logout",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get(
                "http://localhost:4000/api/admin/logout",
                {
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            console.error("Fetch error:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const getAdminDetails = createAsyncThunk(
    "/getAdminDetails",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get(
                "http://localhost:4000/api/admin/details",
                {
                    withCredentials: true,
                }
            );
            if (response.status < 300) return response.data;
        } catch (error) {
            console.error("Fetched error:", error);
            return rejectWithValue(error.message);
        }
    }
);
