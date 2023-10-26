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

export const getUsers = createAsyncThunk(
    "/getUsers",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const token = await findToken();
            const response = await axios.get(
                "http://localhost:4000/api/admin/users/all",
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status < 300) return response.data;
        } catch (error) {
            console.error("Fetched error:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const blockUser = createAsyncThunk(
    "/blockUser",
    async (credentials, { dispatch, rejectWithValue }) => {
        try {
            const id = credentials;
            const token = await findToken();
            const response = await axios.put(
                `http://localhost:4000/api/admin/blockUser/${id}`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status < 300) return response.data;
        } catch (error) {
            console.error("Fetched error:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const unblockUser = createAsyncThunk(
    "/unblockUser",
    async (credentials, { dispatch, rejectWithValue }) => {
        try {
            const id = credentials;
            const token = await findToken();
            const response = await axios.put(
                `http://localhost:4000/api/admin/unblockUser/${id}`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status < 300) return response.data;
        } catch (error) {
            console.error("Fetched error:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const deleteUser = createAsyncThunk(
    "/deleteUser",
    async (credentials, { dispatch, rejectWithValue }) => {
        try {
            const id = credentials;
            const token = await findToken();
            const response = await axios.delete(
                `http://localhost:4000/api/admin/deleteUser/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status < 300) return response.data;
        } catch (error) {
            console.error("Fetched error:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const getUserById = createAsyncThunk(
    "/getUserById",
    async (credentials, { dispatch, rejectWithValue }) => {
        try {
            const id = credentials;
            const token = await findToken();
            const response = await axios.get(
                `http://localhost:4000/api/admin/user/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status < 300) return response.data;
        } catch (error) {
            console.error("Fetched error:", error);
            return rejectWithValue(error.message);
        }
    }
);
