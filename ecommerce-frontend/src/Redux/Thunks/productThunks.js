import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../apiUrl";

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
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${apiUrl}/product/`);
            return response.data;
        } catch (error) {
            console.error("Error:", error);
        }
    }
);

export const createProduct = createAsyncThunk(
    "/createAProduct",
    async ({ formData }, thunkAPI) => {
        try {
            const token = await findToken();
            const response = await axios.post(`${apiUrl}/product/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error:", error);
        }
    }
);
export const updateProduct = createAsyncThunk(
    "/updateProduct",
    async ({ formData, id }, thunkAPI) => {
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
            return response.data;
        } catch (error) {
            console.error("Error:", error);
        }
    }
);
export const uploadProductImages = createAsyncThunk(
    "/uploadProductImages",
    async ({ formData, productId }, { dispatch, rejectWithValue }) => {
        try {
            const token = await findToken();
            console.log(productId);
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
            return response.data;
        } catch (error) {
            console.error("Error:", error);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "/deleteProduct",
    async (id, thunkAPI) => {
        try {
            const token = await findToken();
            const pId = id;
            const response = await axios.delete(`${apiUrl}/product/${pId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error:", error);
        }
    }
);

export const getProductById = createAsyncThunk(
    "/getProductById",
    async (id, thunkAPI) => {
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
        }
    }
);
