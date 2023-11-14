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
        errorMessage: "",
        sliders: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        const setLoadingState = (state) => {
            state.errorMessage = "Loading";
        };

        builder.addCase(createSlider.pending, setLoadingState);
        builder.addCase(createSlider.fulfilled, (state, action) => {
            state.errorMessage = "";
            state.sliders = action.payload;
        });
        builder.addCase(createSlider.rejected, (state, action) => {
            state.errorMessage = "Cannot create Slider";
        });

        builder.addCase(updateSlider.pending, setLoadingState);
        builder.addCase(updateSlider.fulfilled, (state, action) => {
            state.errorMessage = "";
            state.sliders = action.payload;
        });
        builder.addCase(updateSlider.rejected, (state, action) => {
            state.errorMessage = "Cannot update Slider";
        });

        builder.addCase(deleteSlider.pending, setLoadingState);
        builder.addCase(deleteSlider.fulfilled, (state, action) => {
            state.errorMessage = "";
            state.sliders = action.payload;
        });
        builder.addCase(deleteSlider.rejected, (state, action) => {
            state.errorMessage = "Cannot delete Slider";
        });

        builder.addCase(getSliders.pending, setLoadingState);
        builder.addCase(getSliders.fulfilled, (state, action) => {
            state.errorMessage = "";
            state.sliders = action.payload;
        });
        builder.addCase(getSliders.rejected, (state, action) => {
            state.errorMessage = "Cannot get Slider";
        });
    },
});

export default sliderSlice;
