import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../apiUrl";
import { setErrorMessage, setSuccessMessage } from "../Reducers/globalSlice";

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
            dispatch(setErrorMessage(error.response.data.message));
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
            dispatch(setErrorMessage(error.response.data.message));
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
            const response = await axios.get(`${apiUrl}/admin/users/all`, {
                withCredentials: true,
            });
            if (response.status < 300) return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error.response.data.message));
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
            const response = await axios.put(
                `${apiUrl}/admin/blockUser/${id}`,
                {},
                { withCredentials: true }
            );
            dispatch(setSuccessMessage("User blocked"));
            if (response.status < 300) return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error.response.data.message));
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
            const response = await axios.put(
                `${apiUrl}/admin/unblockUser/${id}`,
                {},
                { withCredentials: true }
            );

            dispatch(setSuccessMessage("User unblocked"));
            if (response.status < 300) return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error.response.data.message));
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
            const response = await axios.delete(
                `${apiUrl}/admin/deleteUser/${id}`,
                { withCredentials: true }
            );

            dispatch(setSuccessMessage("User deleted"));
            if (response.status < 300) return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error.response.data.message));
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
            const response = await axios.get(`${apiUrl}/admin/user/${id}`, {
                withCredentials: true,
            });

            if (response.status < 300) return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error.response.data.message));
            console.error("Fetched error:", error);
            return rejectWithValue(error.message);
        }
    }
);
