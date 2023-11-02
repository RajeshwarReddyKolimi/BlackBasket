import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories } from "../Thunks/categoryThunks";
const categorySlice = createSlice({
    name: "Category",
    initialState: {
        errorMessage: "",
        categories: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        const setLoadingState = (state) => {
            state.errorMessage = "Loading";
        };

        builder.addCase(getCategories.pending, setLoadingState);
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.errorMessage = "";
            state.categories = action.payload;
        });
        builder.addCase(getCategories.rejected, (state, action) => {
            state.errorMessage = "Cannot get Categories";
        });
    },
});
export default categorySlice;
