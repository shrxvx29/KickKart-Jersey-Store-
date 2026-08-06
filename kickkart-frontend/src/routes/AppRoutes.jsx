import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoutes";
import AdminRoute from "./AdminRoutes";

import ProtectedLayout from "../layout/ProtectedLayout";
import AdminLayout from "../admin/layout/AdminLayout";

// Auth Pages
import Login from "../pages/authpages/Login";
import Register from "../pages/authpages/Register";
import OAuthSuccess from "../pages/authpages/OAuthSuccess";
import ForgotPassword from "../pages/authpages/ForgotPassword";
import VerifyOtp from "../pages/authpages/VerifyOTP";
import ResetPassword from "../pages/authpages/ResetPassword";

// User Pages
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Collections from "../pages/Collection";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/CheckOut";
import Orders from "../pages/Orders";
import OrderDetail from "../pages/OrderDetails";

// Admin Pages
import Dashboard from "../admin/pages/Dashboard";
import Products from "../admin/pages/Products";
import OrdersAdmin from "../admin/pages/Orders";

const AppRoutes = () => {
    return (
        <Routes>

            {/* Public Routes */}

            <Route path="/" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/oauth-success" element={<OAuthSuccess />} />

            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route path="/verify-otp" element={<VerifyOtp />} />

            <Route path="/reset-password" element={<ResetPassword />} />

            {/* User Routes */}

            <Route
                element={
                    <ProtectedRoute>
                        <ProtectedLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="/home" element={<Home />} />

                <Route path="/shop" element={<Shop />} />

                <Route path="/collections" element={<Collections />} />

                <Route path="/products/:id" element={<ProductDetails />} />

                <Route path="/cart" element={<Cart />} />

                <Route path="/checkout" element={<Checkout />} />

                <Route path="/orders" element={<Orders />} />

                <Route path="/orders/:id" element={<OrderDetail />} />
            </Route>

            {/* Admin Routes */}

            <Route
                path="/admin"
                element={
                    <AdminRoute>
                        <AdminLayout />
                    </AdminRoute>
                }
            >
                <Route index element={<Dashboard />} />

                <Route
                    path="dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="products"
                    element={<Products />}
                />

                <Route
                    path="orders"
                    element={<OrdersAdmin />}
                />
            </Route>

        </Routes>
    );
};

export default AppRoutes;