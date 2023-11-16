import { createSlice } from "@reduxjs/toolkit";
import { bestSellers, recent, topRated } from "../Thunks/homeListThunks";
const homeListSlice = createSlice({
    name: "homeList",
    initialState: {
        recent: [],
        topRated: [],
        bestSellers: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        const setLoadingState = (state) => {};

        builder.addCase(recent.pending, setLoadingState);
        builder.addCase(recent.fulfilled, (state, action) => {
            state.recent = action.payload.getProducts;
        });
        builder.addCase(topRated.fulfilled, (state, action) => {
            state.topRated = action.payload.getProducts;
        });
        builder.addCase(bestSellers.fulfilled, (state, action) => {
            state.bestSellers = action.payload.getProducts;
        });
    },
});
export default homeListSlice;
