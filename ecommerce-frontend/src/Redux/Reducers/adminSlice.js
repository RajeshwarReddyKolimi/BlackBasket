import { createSlice } from "@reduxjs/toolkit";
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
        curUser: {},
        users: [],
        adminData: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        const setLoadingState = (state) => {};

        builder.addCase(adminLogin.pending, setLoadingState);
        builder.addCase(adminLogin.fulfilled, (state, action) => {
            state.isAdminLogged = true;
        });
        builder.addCase(adminLogin.rejected, (state, action) => {});
        builder.addCase(adminLogout.pending, setLoadingState);
        builder.addCase(adminLogout.fulfilled, (state, action) => {
            state.isAdminLogged = false;
            state.adminData = {};
        });
        builder.addCase(adminLogout.rejected, (state, action) => {});
        builder.addCase(getAdminDetails.pending, setLoadingState);
        builder.addCase(getAdminDetails.fulfilled, (state, action) => {
            state.isAdminLogged = true;
            state.adminData = action.payload;
        });
        builder.addCase(getAdminDetails.rejected, (state, action) => {});

        builder.addCase(getUsers.pending, setLoadingState);
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload;
        });
        builder.addCase(getUsers.rejected, (state, action) => {});

        builder.addCase(blockUser.pending, setLoadingState);
        builder.addCase(blockUser.fulfilled, (state, action) => {
            const id = action.payload.id;
            const userIndex = state.users.findIndex((user) => user._id === id);
            if (userIndex !== -1) {
                state.users[userIndex].isBlocked = true;
            }
        });
        builder.addCase(blockUser.rejected, (state, action) => {});

        builder.addCase(unblockUser.pending, setLoadingState);
        builder.addCase(unblockUser.fulfilled, (state, action) => {
            const id = action.payload.id;
            const userIndex = state.users.findIndex((user) => user._id === id);
            if (userIndex !== -1) {
                state.users[userIndex].isBlocked = false;
            }
        });
        builder.addCase(unblockUser.rejected, (state, action) => {});

        builder.addCase(deleteUser.pending, setLoadingState);
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            const id = action.payload.id;
            state.users = state.users.filter((user) => user._id !== id);
        });
        builder.addCase(deleteUser.rejected, (state, action) => {});

        builder.addCase(getUserById.pending, setLoadingState);
        builder.addCase(getUserById.fulfilled, (state, action) => {
            state.curUser = action.payload;
        });
        builder.addCase(getUserById.rejected, (state, action) => {
            state.curUser = {};
        });
    },
});

export default adminSlice;
