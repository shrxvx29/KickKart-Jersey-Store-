import { useEffect, useRef, useState } from "react";
import heroimg from "../../assets/stadium-hero.jpg";
import { FaFutbol } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../api/axios";

function VerifyOtp() {
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(60);

    const inputRefs = useRef([]);

    useEffect(() => {
        if (!email) {
            navigate("/forgot-password");
        }
    }, [email, navigate]);

    useEffect(() => {
        if (timer === 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (value, index) => {

        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {

        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {

        const pasted = e.clipboardData.getData("text").trim();

        if (!/^\d{6}$/.test(pasted)) return;

        const values = pasted.split("");

        setOtp(values);

        values.forEach((v, i) => {
            inputRefs.current[i].value = v;
        });

        inputRefs.current[5].focus();
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const enteredOtp = otp.join("");

        if (enteredOtp.length !== 6) {
            toast.error("Enter valid OTP");
            return;
        }

        try {

            setLoading(true);

            const response = await api.post(
                "/auth/verify-otp",
                {
                    email,
                    otp: enteredOtp,
                }
            );

            toast.success(response.data);

            navigate("/reset-password", {
                state: {
                    email,
                    otp: enteredOtp,
                },
            });

        } catch (error) {

            toast.error(
                error.response?.data ||
                "OTP Verification Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    const resendOtp = async () => {

        try {

            await api.post("/auth/forgot-password", {
                email,
            });

            toast.success("OTP Sent Again");

            setTimer(60);

        } catch {

            toast.error("Unable to resend OTP");

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
                            Verify OTP
                        </h1>

                        <p className="text-center text-gray-300 mt-2">
                            OTP sent to
                        </p>

                        <p className="text-center text-blue-300 mb-8">
                            {email}
                        </p>

                        <form onSubmit={handleSubmit}>

                            <div
                                onPaste={handlePaste}
                                className="flex justify-between mb-8"
                            >

                                {otp.map((digit, index) => (

                                    <input
                                        key={index}
                                        ref={(el) =>
                                            (inputRefs.current[index] = el)
                                        }
                                        type="text"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) =>
                                            handleChange(
                                                e.target.value,
                                                index
                                            )
                                        }
                                        onKeyDown={(e) =>
                                            handleKeyDown(e, index)
                                        }
                                        className="w-12 h-14 rounded-xl bg-white/20 border border-white/20 text-center text-2xl text-white outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                ))}

                            </div>

                            <button
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl py-3 text-white font-semibold"
                            >
                                {loading
                                    ? "Verifying..."
                                    : "Verify OTP"}
                            </button>

                        </form>

                        <div className="text-center mt-6">

                            {timer > 0 ? (

                                <p className="text-gray-300">

                                    Resend OTP in {timer}s

                                </p>

                            ) : (

                                <button
                                    onClick={resendOtp}
                                    className="text-blue-300 hover:text-white"
                                >
                                    Resend OTP
                                </button>

                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default VerifyOtp;