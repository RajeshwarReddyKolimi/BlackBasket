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
function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <BrowserRouter>
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
                        <Route path="/user/login" element={<UserLogin />} />
                        <Route path="/user/signup" element={<UserSignup />} />
                        <Route path="/user/dashboard" element={<Dashboard />} />

                        <Route path="/products" element={<Products />} />
                        <Route path="/user/cart" element={<Cart />} />
                        <Route path="/user/wishlist" element={<Wishlist />} />
                        <Route path="/user/checkout" element={<Checkout />} />
                        <Route path="/user/payment" element={<Payment />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </Provider>
    );
}

export default App;
