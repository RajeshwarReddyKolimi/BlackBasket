import { createSlice } from "@reduxjs/toolkit";
import { getBrands } from "../Thunks/brandThunks";
const brandSlice = createSlice({
    name: "Brand",
    initialState: {
        loading: false,
        brands: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        const setLoadingState = (state) => {
            state.loading = true;
        };

        builder.addCase(getBrands.pending, setLoadingState);
        builder.addCase(getBrands.fulfilled, (state, action) => {
            state.brands = action.payload;
            state.loading = false;
        });
        builder.addCase(getBrands.rejected, (state, action) => {
            state.loading = false;
        });
    },
});
export default brandSlice;
