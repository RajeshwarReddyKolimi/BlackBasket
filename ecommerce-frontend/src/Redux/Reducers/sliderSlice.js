import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    adminLogin,
    adminLogout,
    blockUser,
    deleteUser,
    getAdminDetails,
    getUserById,
    getUsers,
    unblockUser,
} from "../Thunks/adminThunks";
import {
    createSlider,
    deleteSlider,
    getSliders,
    updateSlider,
} from "../Thunks/sliderThunks";

const sliderSlice = createSlice({
    name: "Slider",
    initialState: {
        sliders: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        const setLoadingState = (state) => {};

        builder.addCase(createSlider.pending, setLoadingState);
        builder.addCase(createSlider.fulfilled, (state, action) => {
            state.sliders = action.payload;
        });
        builder.addCase(createSlider.rejected, (state, action) => {});

        builder.addCase(updateSlider.pending, setLoadingState);
        builder.addCase(updateSlider.fulfilled, (state, action) => {
            state.sliders = action.payload;
        });
        builder.addCase(updateSlider.rejected, (state, action) => {});

        builder.addCase(deleteSlider.pending, setLoadingState);
        builder.addCase(deleteSlider.fulfilled, (state, action) => {
            state.sliders = action.payload;
        });
        builder.addCase(deleteSlider.rejected, (state, action) => {});

        builder.addCase(getSliders.pending, setLoadingState);
        builder.addCase(getSliders.fulfilled, (state, action) => {
            state.sliders = action.payload;
        });
        builder.addCase(getSliders.rejected, (state, action) => {});
    },
});

export default sliderSlice;
