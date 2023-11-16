import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "../Thunks/categoryThunks";
const categorySlice = createSlice({
    name: "Category",
    initialState: {
        categories: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        const setLoadingState = (state) => {};
        builder.addCase(getCategories.pending, setLoadingState);
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
        });
        builder.addCase(getCategories.rejected, (state, action) => {});
    },
});
export default categorySlice;
