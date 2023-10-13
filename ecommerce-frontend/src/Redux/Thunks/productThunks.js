import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
    "/getAllProducts",
    async (_, { dispatch, getState }) => {
        try {
            const response = await fetch("http://localhost:4000/api/product/", {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error(
                    `Failed to getProducts: ${response.status} ${response.statusText}`
                );
            }
            const res = await response.json();
            return res;
        } catch (error) {
            console.error("Error:", error);
        }
    }
);
