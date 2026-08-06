import { useState } from "react";
import heroimg from "../../assets/stadium-hero.jpg";
import { FaFutbol, FaGoogle } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../api/axios";

function Login() {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleGoogleLogin = () => {
    window.location.href =
  "https://kickkart-jersey-store-production.up.railway.app/oauth2/authorization/google";
    };

    const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.email || !formData.password) {
        toast.error("Please fill all fields");
        return;
    }

    try {

        setLoading(true);

        // Login
        const loginResponse = await api.post("/auth/login", formData);

        const token = loginResponse.data;

        localStorage.setItem("token", token);

        // Get Logged-in User
        const userResponse = await api.get("/user/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        toast.success("Login Successful 🎉");

        // Redirect Based on Role
        if (userResponse.data.role === "ADMIN") {

            navigate("/admin/dashboard", {
                replace: true,
            });

        } else {

            navigate("/home", {
                replace: true,
            });

        }

    } catch (error) {

        toast.error(
            error.response?.data || "Invalid Email or Password"
        );

    } finally {

        setLoading(false);

    }

};



    return (
        <div
            className="relative min-h-screen w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${heroimg})` }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50">
                {/* Center Container */}
                <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
                    {/* Glass Card */}
                    <div className="w-full max-w-md rounded-3xl bg-white/60 backdrop-blur-2xl border border-white/30 shadow-2xl p-8">
                        {/* Logo */}
                        <div className="flex justify-center">
                            <div className="h-20 w-20 rounded-full bg-white/70 backdrop-blur-md border border-white/30 flex items-center justify-center">
                                <FaFutbol className="text-5xl text-black" />
                            </div>
                        </div>

                        {/* Brand Name */}
                        <h1 className="mt-6 text-center text-4xl font-bold text-black tracking-wide">
                            KickKart
                        </h1>

                        {/* Subtitle */}
                        <p className="mt-2 text-center text-gray-700">
                            Welcome back! Sign in to continue.
                        </p>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="mt-8" >
                            {/* Email */}
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter Email Address"
                                className="w-full bg-white/80 rounded-xl py-3 px-4 mb-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-black"
                            />

                            {/* Password */}
                            <div className="relative">

                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter Password"
                                    className="w-full bg-white/80  rounded-xl py-3 px-4 pr-12 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black "
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-4 text-gray-500"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>

                            </div>

                            {/* Remember & Forgot */}
                            <div className="flex items-center justify-between mt-4 text-sm">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" />
                                    <span>Remember me</span>
                                </label>

                                <Link
                                    to="/forgot-password"
                                    className="text-blue-600 hover:underline"
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 transition text-white py-3 rounded-xl font-semibold"
                            >
                                {loading ? "Signing In..." : "Login"}
                            </button>

                            {/* Divider */}
                            <div className="flex items-center my-6">
                                <hr className="flex-1 border-gray-300" />
                                <span className="px-3 text-gray-600">OR</span>
                                <hr className="flex-1 border-gray-300" />
                            </div>

                            {/* Google Login */}
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="w-full bg-black hover:bg-gray-800 transition border border-gray-300 flex justify-center items-center gap-3 py-3 rounded-xl font-medium"
                            >
                                <FaGoogle className="text-red-400 text-xl" />
                                Continue with Google
                            </button>

                            {/* Register */}
                            <p className="text-center mt-6 text-gray-700">
                                New User?{" "}
                                <Link
                                    to="/register"
                                    className="text-blue-600 font-semibold hover:underline"
                                >
                                    Register
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
