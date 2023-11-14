import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../apiUrl";
import { setErrorMessage, setSuccessMessage } from "../Reducers/globalSlice";

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
            const response = await axios.post(`${apiUrl}/admin/login`, {
                email: credentials.email,
                password: credentials.password,
            });
            dispatch(setSuccessMessage("Successfully Logged in"));
            return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error));
            console.error("Fetch error:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const adminLogout = createAsyncThunk(
    "/logout",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiUrl}/admin/logout`, {
                withCredentials: true,
            });
            dispatch(setSuccessMessage("Successfully logged out"));
            return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error));
            console.error("Fetch error:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const getAdminDetails = createAsyncThunk(
    "/getAdminDetails",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiUrl}/admin/details`, {
                withCredentials: true,
            });
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
            const response = await axios.get(`${apiUrl}/admin/users/all`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status < 300) return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error));
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
                `${apiUrl}/admin/blockUser/${id}`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            dispatch(setSuccessMessage("User blocked"));
            if (response.status < 300) return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error));
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
                `${apiUrl}/admin/unblockUser/${id}`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            dispatch(setSuccessMessage("User unblocked"));
            if (response.status < 300) return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error));
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
                `${apiUrl}/admin/deleteUser/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            dispatch(setSuccessMessage("User deleted"));
            if (response.status < 300) return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error));
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
            const response = await axios.get(`${apiUrl}/admin/user/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status < 300) return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error));
            console.error("Fetched error:", error);
            return rejectWithValue(error.message);
        }
    }
);
