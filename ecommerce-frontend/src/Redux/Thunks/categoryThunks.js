import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import apiUrl from "../../apiUrl";
export const getCategories = createAsyncThunk(
    "/getAllCategories",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${apiUrl}/productCategory`);
            return response.data;
        } catch (error) {}
    }
);
