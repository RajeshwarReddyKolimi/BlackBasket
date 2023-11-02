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

export const createQuery = createAsyncThunk(
    "/createQuery",
    async (query, { dispatch, rejectWithValue }) => {
        try {
            const token = await findToken();
            const response = await axios.post(
                `${apiUrl}/enquiry/`,
                {
                    query,
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
            console.error("Fetch error:", error);
            return rejectWithValue(error.message);
        }
    }
);
