import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
    name: "Global",
    initialState: {
        errorMessage: "",
        successMessage: "",
    },
    reducers: {
        setSuccessMessage: (state, action) => {
            state.successMessage = action.payload;
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload;
        },
    },
});

export const { setSuccessMessage, setErrorMessage } = globalSlice.actions;
export default globalSlice;
