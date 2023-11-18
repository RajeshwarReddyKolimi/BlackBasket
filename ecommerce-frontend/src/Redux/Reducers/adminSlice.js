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
        loading: false,
        isAdminLogged: false,
        curUser: {},
        users: [],
        adminData: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        const setLoadingState = (state) => {
            state.loading = true;
        };

        builder.addCase(adminLogin.pending, setLoadingState);
        builder.addCase(adminLogin.fulfilled, (state, action) => {
            state.isAdminLogged = true;
            state.loading = false;
        });
        builder.addCase(adminLogin.rejected, (state, action) => {
            state.loading = false;
        });
        builder.addCase(adminLogout.pending, setLoadingState);
        builder.addCase(adminLogout.fulfilled, (state, action) => {
            state.isAdminLogged = false;
            state.adminData = {};
            state.loading = false;
        });
        builder.addCase(adminLogout.rejected, (state, action) => {
            state.loading = false;
        });
        builder.addCase(getAdminDetails.fulfilled, (state, action) => {
            state.isAdminLogged = true;
            state.adminData = action.payload;
        });
        builder.addCase(getAdminDetails.rejected, (state, action) => {});

        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload;
        });
        builder.addCase(getUsers.rejected, (state, action) => {});

        builder.addCase(blockUser.fulfilled, (state, action) => {
            const id = action.payload.id;
            const userIndex = state.users.findIndex((user) => user._id === id);
            if (userIndex !== -1) {
                state.users[userIndex].isBlocked = true;
            }
        });
        builder.addCase(blockUser.rejected, (state, action) => {});

        builder.addCase(unblockUser.fulfilled, (state, action) => {
            const id = action.payload.id;
            const userIndex = state.users.findIndex((user) => user._id === id);
            if (userIndex !== -1) {
                state.users[userIndex].isBlocked = false;
            }
        });
        builder.addCase(unblockUser.rejected, (state, action) => {});

        builder.addCase(deleteUser.fulfilled, (state, action) => {
            const id = action.payload.id;
            state.users = state.users.filter((user) => user._id !== id);
        });
        builder.addCase(deleteUser.rejected, (state, action) => {});

        builder.addCase(getUserById.fulfilled, (state, action) => {
            state.curUser = action.payload;
        });
        builder.addCase(getUserById.rejected, (state, action) => {
            state.curUser = {};
        });
    },
});

export default adminSlice;
