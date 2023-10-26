import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import { Provider } from "react-redux";
import store from "./Redux/store";
import Products from "./Components/Products/Products";
import Cart from "./Components/User/Cart";
import Wishlist from "./Components/User/Wishlist";
import Checkout from "./Components/User/Checkout";
import Payment from "./Components/User/Payment";
import AdminLogin from "./Components/Admin/AdminLogin";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import Dashboard from "./Components/User/Dashboard";
import UserLogin from "./Components/User/UserLogin";
import UserSignup from "./Components/User/UserSignup";
import AdminProducts from "./Components/Admin/AdminProducts";
import AdminUsers from "./Components/Admin/AdminUsers";
import Coupons from "./Components/Coupons/Coupons";
import UserCoupons from "./Components/User/UserCoupons";
import UserHeader from "./Components/User/UserHeader";
import UserFooter from "./Components/User/UserFooter";
import UserAccount from "./Components/User/UserAccount";
import UserProfile from "./Components/User/UserProfile";
import UpdateUserProfile from "./Components/User/UpdateUserProfile";
import UserOrders from "./Components/User/UserOrders";
import UserAddress from "./Components/User/UserAddress";
import AddAddress from "./Components/User/AddAddress";
import UpdateAddress from "./Components/User/UpdateAddress";
function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <BrowserRouter>
                    <UserHeader />
                    <Routes>
                        <Route index element={<Home />} />
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
                        <Route path="/admin/users" element={<AdminUsers />} />
                        <Route path="/coupons" element={<Coupons />} />
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
                        <Route path="/user/cart" element={<Cart />} />
                        <Route path="/user/wishlist" element={<Wishlist />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/payment" element={<Payment />} />
                    </Routes>
                    <UserFooter />
                </BrowserRouter>
            </div>
        </Provider>
    );
}

export default App;
