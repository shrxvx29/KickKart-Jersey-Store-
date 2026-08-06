import { useState } from "react";
import heroimg from "../../assets/stadium-hero.jpg";
import { FaFutbol } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../api/axios";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      toast.success("Registration Successful 🎉");

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (error) {
      toast.error(error.response?.data || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${heroimg})` }}
    >
      <div className="absolute inset-0 bg-black/50">
        <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
          <div className="w-full max-w-md rounded-3xl bg-white/60 backdrop-blur-2xl border border-white/30 shadow-2xl p-8">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-white/70 backdrop-blur-md border border-white/30 flex items-center justify-center">
                <FaFutbol className="text-5xl text-black" />
              </div>
            </div>

            <h1 className="mt-6 text-center text-4xl font-bold text-black tracking-wide">
              KickKart
            </h1>

            <p className="mt-2 text-center text-gray-700">
              Create your account
            </p>

            <form onSubmit={handleSubmit} className="mt-8">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter Full Name"
                className="w-full bg-white/80 rounded-xl py-3 px-4 mb-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-black"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email Address"
                className="w-full bg-white/80 rounded-xl py-3 px-4 mb-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-black"
              />
              {/* Password */}
              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="w-full bg-white/80 rounded-xl py-3 px-4 pr-12 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-black"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onPaste={(e) => e.preventDefault()}
                  placeholder="Confirm Password"
                  className="w-full bg-white/80 rounded-xl py-3 px-4 pr-12 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-black"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold disabled:bg-gray-400"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

              <p className="text-center mt-6 text-gray-700">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;