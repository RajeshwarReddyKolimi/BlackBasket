import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBrands } from "../Thunks/brandThunks";
const brandSlice = createSlice({
    name: "Brand",
    initialState: {
        errorMessage: "",
        brands: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        const setLoadingState = (state) => {
            state.errorMessage = "Loading";
        };

        builder.addCase(getBrands.pending, setLoadingState);
        builder.addCase(getBrands.fulfilled, (state, action) => {
            state.errorMessage = "";
            state.brands = action.payload;
        });
        builder.addCase(getBrands.rejected, (state, action) => {
            state.errorMessage = "Cannot get Brands";
        });
    },
});
export default brandSlice;
