import { useState } from "react";
import heroimg from "../../assets/stadium-hero.jpg";
import { FaEnvelope, FaFutbol } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../api/axios";

function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        try {

            setLoading(true);

            const response = await api.post(
                "/auth/forgot-password",
                { email }
            );

            toast.success(response.data);

            navigate("/verify-otp", {
                state: {
                    email,
                },
            });

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                error.response?.data ||
                "Something went wrong"
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
                            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                                <FaFutbol className="text-5xl text-white" />
                            </div>
                        </div>

                        <h1 className="text-4xl font-bold text-center text-white mt-6">
                            KickKart
                        </h1>

                        <p className="text-center text-gray-300 mt-2">
                            Forgot Password
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-5"
                        >

                            <div className="relative">

                                <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    className="w-full rounded-xl bg-white/20 border border-white/20 py-3 pl-12 pr-4 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 transition-all duration-300 py-3 font-semibold text-white disabled:opacity-60"
                            >
                                {loading ? "Sending OTP..." : "Send OTP"}
                            </button>

                        </form>

                        <div className="mt-6 text-center">

                            <Link
                                to="/"
                                className="text-blue-300 hover:text-white transition"
                            >
                                ← Back to Login
                            </Link>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default ForgotPassword;