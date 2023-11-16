import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../apiUrl";
import { setErrorMessage, setSuccessMessage } from "../Reducers/globalSlice";

export const getProducts = createAsyncThunk(
    "/getAllProducts",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiUrl}/product/`);
            return response.data;
        } catch (error) {
            console.error("Error:", error);
            return rejectWithValue(error);
        }
    }
);

export const createProduct = createAsyncThunk(
    "/createAProduct",
    async ({ formData }, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiUrl}/product/`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            dispatch(setSuccessMessage("Product added"));
            return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error.response.data.message));
            console.error("Error:", error);
            return rejectWithValue(error);
        }
    }
);
export const updateProduct = createAsyncThunk(
    "/updateProduct",
    async ({ formData, id }, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${apiUrl}/product/${id}`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            dispatch(setSuccessMessage("Product Updated"));
            return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error.response.data.message));
            console.error("Error:", error);
            return rejectWithValue(error);
        }
    }
);
export const uploadProductImages = createAsyncThunk(
    "/uploadProductImages",
    async ({ formData, productId }, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${apiUrl}/product/upload/${productId.toString()}`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            dispatch(setSuccessMessage("Images uploaded"));
            return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error.response.data.message));
            console.error("Error:", error);
            return rejectWithValue(error);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "/deleteProduct",
    async (id, { dispatch, rejectWithValue }) => {
        try {
            const pId = id;
            const response = await axios.delete(`${apiUrl}/product/${pId}`, {
                withCredentials: true,
            });
            dispatch(setSuccessMessage("Product deleted"));
            return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error.response.data.message));
            console.error("Error:", error);
            return rejectWithValue(error);
        }
    }
);

export const getProductById = createAsyncThunk(
    "/getProductById",
    async (id, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiUrl}/product/${id}`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error("Error:", error);
            return rejectWithValue(error);
        }
    }
);
