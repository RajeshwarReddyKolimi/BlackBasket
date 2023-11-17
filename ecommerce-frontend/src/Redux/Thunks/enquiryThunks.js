import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../apiUrl";
import { setErrorMessage, setSuccessMessage } from "../Reducers/globalSlice";

export const createQuery = createAsyncThunk(
    "/createQuery",
    async (query, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${apiUrl}/enquiry/`,
                {
                    query,
                },
                { withCredentials: true }
            );
            dispatch(setSuccessMessage("Query Raised"));
            return response.data;
        } catch (error) {
            dispatch(setErrorMessage(error.response.data.message));

            console.error(error.message);
            return rejectWithValue(error.message);
        }
    }
);
