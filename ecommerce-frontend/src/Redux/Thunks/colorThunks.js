import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getColors = createAsyncThunk(
    "/getAllColors",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${apiUrl}/color`);
            return response.data;
        } catch (error) {
            console.error("Error:", error);
        }
    }
);
