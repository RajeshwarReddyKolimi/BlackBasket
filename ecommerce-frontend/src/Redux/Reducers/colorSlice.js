import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getColors } from "../Thunks/colorThunks";
const colorSlice = createSlice({
    name: "Color",
    initialState: {
        colors: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        const setLoadingState = (state) => {};

        builder.addCase(getColors.pending, setLoadingState);
        builder.addCase(getColors.fulfilled, (state, action) => {
            state.colors = action.payload;
        });
        builder.addCase(getColors.rejected, (state, action) => {});
    },
});
export default colorSlice;
