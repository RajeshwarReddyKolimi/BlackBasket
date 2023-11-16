import { createSlice } from "@reduxjs/toolkit";

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
});
export default enquirySlice;
