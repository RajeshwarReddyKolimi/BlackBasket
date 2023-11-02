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

const adminSlice = createSlice({
    name: "Admin",
    initialState: {
        isAdminLogged: false,
        errorMessage: "",
        curUser: {},
        users: [],
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
            document.cookie = `refreshToken=${action.payload.token}; path=/; expires=Wed, 30 Nov 2023 07:28:00 GMT;`;
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

        builder.addCase(getUsers.pending, setLoadingState);
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.errorMessage = "";
            state.users = action.payload;
        });
        builder.addCase(getUsers.rejected, (state, action) => {
            state.errorMessage = "Cannot get";
        });

        builder.addCase(blockUser.pending, setLoadingState);
        builder.addCase(blockUser.fulfilled, (state, action) => {
            const id = action.payload.id;
            const userIndex = state.users.findIndex((user) => user._id === id);
            if (userIndex !== -1) {
                state.users[userIndex].isBlocked = true;
            }
            state.errorMessage = "";
        });
        builder.addCase(blockUser.rejected, (state, action) => {
            state.errorMessage = "Cannot block";
        });

        builder.addCase(unblockUser.pending, setLoadingState);
        builder.addCase(unblockUser.fulfilled, (state, action) => {
            const id = action.payload.id;
            const userIndex = state.users.findIndex((user) => user._id === id);
            if (userIndex !== -1) {
                state.users[userIndex].isBlocked = false;
            }
            state.errorMessage = "";
        });
        builder.addCase(unblockUser.rejected, (state, action) => {
            state.errorMessage = "Cannot unblock";
        });

        builder.addCase(deleteUser.pending, setLoadingState);
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            const id = action.payload.id;
            state.users = state.users.filter((user) => user._id !== id);
            state.errorMessage = "";
        });
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.errorMessage = "Cannot Delete";
        });

        builder.addCase(getUserById.pending, setLoadingState);
        builder.addCase(getUserById.fulfilled, (state, action) => {
            state.curUser = action.payload;
            state.errorMessage = "";
        });
        builder.addCase(getUserById.rejected, (state, action) => {
            state.errorMessage = "Cannot Delete";
            state.curUser = {};
        });
    },
});

export default adminSlice;
