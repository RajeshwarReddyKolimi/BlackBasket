import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../apiUrl";

export const getBrands = createAsyncThunk(
    "/getAllBrands",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${apiUrl}/brand`);
            return response.data;
        } catch (error) {
            console.error("Error:", error);
        }
    }
);
