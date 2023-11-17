import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "../Thunks/categoryThunks";
const categorySlice = createSlice({
    name: "Category",
    initialState: {
        loading: false,
        categories: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        const setLoadingState = (state) => {
            state.loading = true;
        };
        builder.addCase(getCategories.pending, setLoadingState);
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
            state.loading = false;
        });
        builder.addCase(getCategories.rejected, (state, action) => {
            state.loading = false;
        });
    },
});
export default categorySlice;
