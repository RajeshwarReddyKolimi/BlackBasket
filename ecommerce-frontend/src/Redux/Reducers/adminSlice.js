import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    adminLogin,
    adminLogout,
    getAdminDetails,
} from "../Thunks/adminThunks";

const adminSlice = createSlice({
    name: "Admin",
    initialState: {
        isAdminLogged: false,
        errorMessage: "",
        adminData: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        const setLoadingState = (state) => {
            state.errorMessage = "Loading";
        };

        builder.addCase(adminLogin.pending, setLoadingState);
        builder.addCase(adminLogin.fulfilled, (state, action) => {
            state.isAdminLogged = true;
            document.cookie = `refreshToken=${action.payload.token}; path=/; expires=Wed, 21 Oct 2023 07:28:00 GMT;`;
            state.errorMessage = "";
        });
        builder.addCase(adminLogin.rejected, (state, action) => {
            state.errorMessage = "Cannot Log In";
        });
        builder.addCase(adminLogout.pending, setLoadingState);
        builder.addCase(adminLogout.fulfilled, (state, action) => {
            state.isAdminLogged = false;
            state.adminData = {};
            state.errorMessage = "";
            document.cookie = `refreshToken=; path=/; expires=Wed, 21 Oct 1970 07:28:00 GMT;`;
        });
        builder.addCase(adminLogout.rejected, (state, action) => {
            state.errorMessage = "Cannot Log Out";
        });
        builder.addCase(getAdminDetails.pending, setLoadingState);
        builder.addCase(getAdminDetails.fulfilled, (state, action) => {
            state.isAdminLogged = true;
            state.adminData = action.payload;
            state.errorMessage = "";
        });
        builder.addCase(getAdminDetails.rejected, (state, action) => {
            state.errorMessage = "Cannot get";
        });
    },
});

export default adminSlice;
