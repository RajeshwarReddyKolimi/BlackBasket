import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../apiUrl";

export const recent = createAsyncThunk("/getRecent", async (_, thunkAPI) => {
    try {
        const response = await axios.get(
            `${apiUrl}/product/search?sort=timeAsc&limit=4&page=1`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {}
});

export const topRated = createAsyncThunk(
    "/getTopRated",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(
                `${apiUrl}/product/search?sort=ratingDesc&limit=4&page=1`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }
);

export const bestSellers = createAsyncThunk(
    "/getBestSellers",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(
                `${apiUrl}/product/search?sort=mostSold&limit=4&page=1`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }
);
