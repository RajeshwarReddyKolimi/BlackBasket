import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createCoupon, deleteCoupon, getCoupons } from "../Thunks/couponThunks";
const couponSlice = createSlice({
    name: "Coupon",
    initialState: {
        errorMessage: "",
        coupons: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        const setLoadingState = (state) => {
            state.errorMessage = "Loading";
        };

        builder.addCase(getCoupons.pending, setLoadingState);
        builder.addCase(getCoupons.fulfilled, (state, action) => {
            state.errorMessage = "";
            state.coupons = action.payload;
        });
        builder.addCase(getCoupons.rejected, (state, action) => {
            state.errorMessage = "Cannot get Coupons";
        });

        builder.addCase(createCoupon.pending, setLoadingState);
        builder.addCase(createCoupon.fulfilled, (state, action) => {
            state.errorMessage = "";
            state.coupons.push(action.payload);
        });
        builder.addCase(createCoupon.rejected, (state, action) => {
            state.errorMessage = "Cannot create Coupon";
        });

        builder.addCase(deleteCoupon.pending, setLoadingState);
        builder.addCase(deleteCoupon.fulfilled, (state, action) => {
            state.errorMessage = "";
            state.coupons = state.coupons.filter(
                (coupon) => coupon._id !== action.payload._id
            );
        });
        builder.addCase(deleteCoupon.rejected, (state, action) => {
            state.errorMessage = "Cannot create Coupon";
        });
    },
});
export default couponSlice;
