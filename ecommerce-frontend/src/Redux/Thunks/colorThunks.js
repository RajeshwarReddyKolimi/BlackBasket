import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import apiUrl from "../../apiUrl";
export const getColors = createAsyncThunk(
    "/getAllColors",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiUrl}/color`);
            return response.data;
        } catch (error) {
            console.error("Error:", error);
            return rejectWithValue(error);
        }
    }
);
