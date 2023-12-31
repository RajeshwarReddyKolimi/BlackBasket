import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";
import Products from "./Components/Products/Products";
import Cart from "./Components/User/Cart";
import Wishlist from "./Components/User/Wishlist";
import Checkout from "./Components/User/Checkout";
import AdminLogin from "./Components/Admin/AdminLogin";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import Dashboard from "./Components/User/Dashboard";
import UserLogin from "./Components/User/UserLogin";
import UserSignup from "./Components/User/UserSignup";
import AdminProducts from "./Components/Admin/AdminProducts";
import AdminUsers from "./Components/Admin/AdminUsers";
import UserCoupons from "./Components/User/UserCoupons";
import UserHeader from "./Components/User/UserHeader";
import UserAccount from "./Components/User/UserAccount";
import UserProfile from "./Components/User/UserProfile";
import UpdateUserProfile from "./Components/User/UpdateUserProfile";
import UserOrders from "./Components/User/UserOrders";
import UserAddress from "./Components/User/UserAddress";
import AddAddress from "./Components/User/AddAddress";
import UpdateAddress from "./Components/User/UpdateAddress";
import AdminAddProduct from "./Components/Admin/AdminAddProduct";
import ProductPage from "./Components/Products/ProductPage";
import AdminUpdateProduct from "./Components/Admin/AdminUpdateProduct";
import AdminProductPage from "./Components/Admin/AdminProductPage";
import AdminCoupons from "./Components/Admin/AdminCoupons";
import AdminUpdateCoupon from "./Components/Admin/AdminUpdateCoupon";
import AdminAddCoupon from "./Components/Admin/AdminAddCoupon";
import UserCreateQuery from "./Components/User/UserCreateQuery";
import UserSupport from "./Components/User/UserSupport";
import UserOrderCard from "./Components/User/UserOrderCard";
import ProductSearchPage from "./Components/Products/ProductSearchPage";
import UserRating from "./Components/User/UserRating";
import UpdateRating from "./Components/User/UpdateRating";
import ResultPopup from "./Components/ResultPopup";
import ScrollToTop from "./Components/ScrollToTop";
function App() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <Provider store={store}>
            <div className="App">
                <ResultPopup />
                <BrowserRouter>
                    <ScrollToTop />
                    <UserHeader />
                    <Routes>
                        <Route index element={<Dashboard />} />
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route path="/admin/" element={<AdminDashboard />} />
                        <Route
                            path="/admin/dashboard"
                            element={<AdminDashboard />}
                        />
                        <Route
                            path="/admin/products"
                            element={<AdminProducts />}
                        />
                        <Route
                            path="/admin/product/add"
                            element={<AdminAddProduct />}
                        />
                        <Route
                            path="/admin/product/update/:id"
                            element={<AdminUpdateProduct />}
                        />
                        <Route path="/admin/users" element={<AdminUsers />} />
                        <Route
                            path="/admin/coupons"
                            element={<AdminCoupons />}
                        />
                        <Route
                            path="/admin/coupon/update/:id"
                            element={<AdminUpdateCoupon />}
                        />
                        <Route
                            path="/admin/coupon/add/"
                            element={<AdminAddCoupon />}
                        />
                        <Route
                            path="/admin/product/:id"
                            element={<AdminProductPage />}
                        />

                        <Route path="/user/login" element={<UserLogin />} />
                        <Route path="/user/signup" element={<UserSignup />} />
                        <Route path="/user/dashboard" element={<Dashboard />} />
                        <Route path="/user/account" element={<UserAccount />} />
                        <Route path="/user/address" element={<UserAddress />} />
                        <Route
                            path="/user/address/add"
                            element={<AddAddress />}
                        />
                        <Route
                            path="/user/address/update/:id"
                            element={<UpdateAddress />}
                        />
                        <Route path="/user/orders" element={<UserOrders />} />
                        <Route
                            path="/user/orders/:id"
                            element={<UserOrderCard />}
                        />
                        <Route path="/user/coupons" element={<UserCoupons />} />
                        <Route
                            path="/user/account/profile"
                            element={<UserProfile />}
                        />
                        <Route
                            path="/user/account/profile/update"
                            element={<UpdateUserProfile />}
                        />

                        <Route path="/products" element={<Products />} />
                        <Route
                            path="/product/search"
                            element={<ProductSearchPage />}
                        />

                        <Route path="/product/:id" element={<ProductPage />} />
                        <Route path="/user/cart" element={<Cart />} />
                        <Route
                            path="/user/rating/:id"
                            element={<UserRating />}
                        />
                        <Route
                            path="/user/rating/edit/:id"
                            element={<UpdateRating />}
                        />
                        <Route path="/user/wishlist" element={<Wishlist />} />
                        <Route path="/user/support" element={<UserSupport />} />
                        <Route
                            path="/user/support/create-query"
                            element={<UserCreateQuery />}
                        />
                        <Route path="/user/checkout" element={<Checkout />} />
                    </Routes>
                    <div className="nav-item-right-buffer"></div>
                </BrowserRouter>
            </div>
        </Provider>
    );
}

export default App;
