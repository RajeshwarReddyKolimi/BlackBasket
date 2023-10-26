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

export const getProducts = createAsyncThunk(
    "/getAllProducts",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(
                "http://localhost:4000/api/product/"
            );
            return response.data;
        } catch (error) {
            console.error("Error:", error);
        }
    }
);

export const createProduct = createAsyncThunk(
    "/createAProduct",
    async (_, thunkAPI) => {
        try {
            const token = await findToken();
            const response = await axios.post(
                "http://localhost:4000/api/product/",

                {
                    title: " Samsung Mobile",
                    description: "Mobile ",
                    price: 18900,
                    quantity: 10,
                    brand: "Samsung",
                    color: "Black",
                    category: "Mobile",
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
            console.error("Error:", error);
        }
    }
);

export const updateProduct = createAsyncThunk(
    "/updateProduct",
    async (id, thunkAPI) => {
        try {
            const token = await findToken();
            const pId = id;
            const response = await axios.put(
                `http://localhost:4000/api/product/${pId}`,

                {
                    title: " Samsong Mobile",
                    description: "Mobile ",
                    price: 18100,
                    quantity: 12,
                    brand: "Samsung",
                    color: "Black",
                    category: "Mobile",
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
            console.error("Error:", error);
        }
    }
);

export const uploadProductImages = createAsyncThunk(
    "/uploadProductImages",
    async ({ formData, productId }, { dispatch, rejectWithValue }) => {
        try {
            const token = await findToken();
            const response = await axios.put(
                `http://localhost:4000/api/product/upload/${productId.toString()}`,
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
            const response = await axios.delete(
                `http://localhost:4000/api/product/${pId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
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
