import { createSlice } from "@reduxjs/toolkit";
import {
    createSlider,
    deleteSlider,
    getSliders,
    updateSlider,
} from "../Thunks/sliderThunks";

const sliderSlice = createSlice({
    name: "Slider",
    initialState: {
        loading: false,
        sliders: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        const setLoadingState = (state) => {
            state.loading = true;
        };

        builder.addCase(createSlider.pending, setLoadingState);
        builder.addCase(createSlider.fulfilled, (state, action) => {
            state.sliders = action.payload;
            state.loading = false;
        });
        builder.addCase(createSlider.rejected, (state, action) => {
            state.loading = false;
        });

        builder.addCase(updateSlider.pending, setLoadingState);
        builder.addCase(updateSlider.fulfilled, (state, action) => {
            state.sliders = action.payload;
            state.loading = false;
        });
        builder.addCase(updateSlider.rejected, (state, action) => {
            state.loading = false;
        });

        builder.addCase(deleteSlider.pending, setLoadingState);
        builder.addCase(deleteSlider.fulfilled, (state, action) => {
            state.sliders = action.payload;
            state.loading = false;
        });
        builder.addCase(deleteSlider.rejected, (state, action) => {
            state.loading = false;
        });

        builder.addCase(getSliders.pending, setLoadingState);
        builder.addCase(getSliders.fulfilled, (state, action) => {
            state.sliders = action.payload;
            state.loading = false;
        });
        builder.addCase(getSliders.rejected, (state, action) => {
            state.loading = false;
        });
    },
});

export default sliderSlice;
