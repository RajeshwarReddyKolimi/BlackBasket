import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getColors } from "../Thunks/colorThunks";
const colorSlice = createSlice({
    name: "Color",
    initialState: {
        errorMessage: "",
        colors: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        const setLoadingState = (state) => {
            state.errorMessage = "Loading";
        };

        builder.addCase(getColors.pending, setLoadingState);
        builder.addCase(getColors.fulfilled, (state, action) => {
            state.errorMessage = "";
            state.colors = action.payload;
        });
        builder.addCase(getColors.rejected, (state, action) => {
            state.errorMessage = "Cannot get Colors";
        });
    },
});
export default colorSlice;
