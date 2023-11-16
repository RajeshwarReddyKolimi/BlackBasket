import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../apiUrl";
import { setErrorMessage, setSuccessMessage } from "../Reducers/globalSlice";

export const createSlider = createAsyncThunk(
    "/admin/slider/create",
    async (slider, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${apiUrl}/slider`,
                {
                    slider,
                },
                { withCredentials: true }
            );
            dispatch(setSuccessMessage("Slider added"));
            return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error.response.data.message));
            console.error("Fetch error:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const updateSlider = createAsyncThunk(
    "/admin/slider/update",
    async ({ slider, id }, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${apiUrl}/slider/${id}`,
                {
                    slider,
                },
                { withCredentials: true }
            );
            dispatch(setSuccessMessage("Slider Updated"));
            return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error.response.data.message));
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
            const id = credentials;
            const response = await axios.delete(`${apiUrl}/slider/${id}`, {
                withCredentials: true,
            });
            dispatch(setSuccessMessage("Slider Deleted"));
            return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error.response.data.message));
            console.error("Fetch error:", error);
            return rejectWithValue(error.message);
        }
    }
);
