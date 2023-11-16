import { createSlice } from "@reduxjs/toolkit";
import { getBrands } from "../Thunks/brandThunks";
const brandSlice = createSlice({
    name: "Brand",
    initialState: {
        brands: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        const setLoadingState = (state) => {};

        builder.addCase(getBrands.pending, setLoadingState);
        builder.addCase(getBrands.fulfilled, (state, action) => {
            state.brands = action.payload;
        });
        builder.addCase(getBrands.rejected, (state, action) => {});
    },
});
export default brandSlice;
