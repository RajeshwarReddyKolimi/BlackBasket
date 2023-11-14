import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createQuery } from "../Thunks/enquiryThunks";

const enquirySlice = createSlice({
    name: "Enquiry",
    initialState: {
        name: "",
        email: "",
        mobile: "",
        subject: "",
        description: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        const setLoadingState = (state) => {};
    },
});
export default enquirySlice;
