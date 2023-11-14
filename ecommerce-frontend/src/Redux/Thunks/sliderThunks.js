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

export const createSlider = createAsyncThunk(
    "/admin/slider/create",
    async (slider, { dispatch, rejectWithValue }) => {
        const token = await findToken();
        try {
            const response = await axios.post(
                `${apiUrl}/slider`,
                {
                    slider,
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

export const updateSlider = createAsyncThunk(
    "/admin/slider/update",
    async ({ slider, id }, { dispatch, rejectWithValue }) => {
        const token = await findToken();
        try {
            const response = await axios.put(
                `${apiUrl}/slider/${id}`,
                {
                    slider,
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

export const getSliders = createAsyncThunk(
    "/admin/slider/get",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiUrl}/slider`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            console.error("Fetch error:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const deleteSlider = createAsyncThunk(
    "/admin/slider/delete",
    async (credentials, { dispatch, rejectWithValue }) => {
        try {
            const token = await findToken();
            const id = credentials;
            const response = await axios.delete(`${apiUrl}/slider/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Fetch error:", error);
            return rejectWithValue(error.message);
        }
    }
);
