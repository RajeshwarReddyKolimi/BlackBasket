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
            const token = await findToken();
            const response = await axios.post(`${apiUrl}/product/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch(setSuccessMessage("Product added"));
            return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error));
            console.error("Error:", error);
            return rejectWithValue(error);
        }
    }
);
export const updateProduct = createAsyncThunk(
    "/updateProduct",
    async ({ formData, id }, { dispatch, rejectWithValue }) => {
        try {
            const token = await findToken();
            const response = await axios.put(
                `${apiUrl}/product/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            dispatch(setSuccessMessage("Product Updated"));
            return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error));
            console.error("Error:", error);
            return rejectWithValue(error);
        }
    }
);
export const uploadProductImages = createAsyncThunk(
    "/uploadProductImages",
    async ({ formData, productId }, { dispatch, rejectWithValue }) => {
        try {
            const token = await findToken();
            const response = await axios.put(
                `${apiUrl}/product/upload/${productId.toString()}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            dispatch(setSuccessMessage("Images uploaded"));
            return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error));
            console.error("Error:", error);
            return rejectWithValue(error);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "/deleteProduct",
    async (id, { dispatch, rejectWithValue }) => {
        try {
            const token = await findToken();
            const pId = id;
            const response = await axios.delete(`${apiUrl}/product/${pId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch(setSuccessMessage("Product deleted"));
            return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error));
            console.error("Error:", error);
            return rejectWithValue(error);
        }
    }
);

export const getProductById = createAsyncThunk(
    "/getProductById",
    async (id, { dispatch, rejectWithValue }) => {
        try {
            const token = await findToken();
            const response = await axios.get(`${apiUrl}/product/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error:", error);
            return rejectWithValue(error);
        }
    }
);
