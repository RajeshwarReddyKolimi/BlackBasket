import { createSlice } from "@reduxjs/toolkit";
import { bestSellers, recent, topRated } from "../Thunks/homeListThunks";
const homeListSlice = createSlice({
    name: "homeList",
    initialState: {
        topRatedLoading: false,
        recentLoading: false,
        bestSellersLoading: false,
        recent: [],
        topRated: [],
        bestSellers: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(recent.pending, (state) => {
            state.recentLoading = true;
        });
        builder.addCase(topRated.pending, (state) => {
            state.topRatedLoading = true;
        });
        builder.addCase(bestSellers.pending, (state) => {
            state.bestSellersLoading = true;
        });
        builder.addCase(recent.fulfilled, (state, action) => {
            state.recent = action.payload.getProducts;
            state.recentLoading = false;
        });
        builder.addCase(topRated.fulfilled, (state, action) => {
            state.topRated = action.payload.getProducts;
            state.topRatedLoading = false;
        });
        builder.addCase(bestSellers.fulfilled, (state, action) => {
            state.bestSellers = action.payload.getProducts;
            state.bestSellersLoading = false;
        });
        builder.addCase(recent.rejected, (state, action) => {
            state.recent = [];
            state.recentLoading = false;
        });
        builder.addCase(topRated.rejected, (state, action) => {
            state.topRated = [];
            state.topRatedLoading = false;
        });
        builder.addCase(bestSellers.rejected, (state, action) => {
            state.bestSellers = [];
            state.bestSellersLoading = false;
        });
    },
});
export default homeListSlice;
