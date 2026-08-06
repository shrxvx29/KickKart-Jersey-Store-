import { useState } from "react";
import heroimg from "../../assets/stadium-hero.jpg";
import { FaFutbol, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../api/axios";

function ResetPassword() {

    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;
    const otp = location.state?.otp;

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.newPassword || !formData.confirmPassword) {
            toast.error("Please fill all fields");
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {

            setLoading(true);

            const response = await api.post(
                "/auth/reset-password",
                {
                    email,
                    otp,
                    newPassword: formData.newPassword,
                }
            );

            toast.success(response.data);

            setTimeout(() => {

                navigate("/");

            }, 1500);

        } catch (error) {

            toast.error(
                error.response?.data ||
                "Password Reset Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (
        <div
            className="relative min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${heroimg})` }}
        >

            <div className="absolute inset-0 bg-black/60">

                <div className="flex justify-center items-center min-h-screen px-6">

                    <div className="w-full max-w-md rounded-3xl bg-white/15 backdrop-blur-xl border border-white/20 shadow-2xl p-8">

                        <div className="flex justify-center">

                            <div className="w-20 h-20 rounded-full bg-white/20 flex justify-center items-center">

                                <FaFutbol className="text-5xl text-white"/>

                            </div>

                        </div>

                        <h1 className="text-4xl font-bold text-center text-white mt-6">
                            Reset Password
                        </h1>

                        <p className="text-center text-gray-300 mt-2 mb-8">
                            Create your new password
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            {/* New Password */}

                            <div className="relative">

                                <FaLock className="absolute left-4 top-4 text-gray-300"/>

                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="newPassword"
                                    placeholder="New Password"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    className="w-full rounded-xl bg-white/20 border border-white/20 py-3 pl-12 pr-12 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-4 top-4 text-gray-300"
                                >

                                    {
                                        showPassword
                                            ? <FaEyeSlash/>
                                            : <FaEye/>
                                    }

                                </button>

                            </div>

                            {/* Confirm Password */}

                            <div className="relative">

                                <FaLock className="absolute left-4 top-4 text-gray-300"/>

                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full rounded-xl bg-white/20 border border-white/20 py-3 pl-12 pr-12 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(!showConfirmPassword)
                                    }
                                    className="absolute right-4 top-4 text-gray-300"
                                >

                                    {
                                        showConfirmPassword
                                            ? <FaEyeSlash/>
                                            : <FaEye/>
                                    }

                                </button>

                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl py-3 font-semibold text-white disabled:opacity-60"
                            >

                                {
                                    loading
                                        ? "Updating Password..."
                                        : "Reset Password"
                                }

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ResetPassword;