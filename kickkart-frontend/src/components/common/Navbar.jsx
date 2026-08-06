import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaFutbol } from "react-icons/fa";
import {
    Menu,
    X,
    ShoppingBag,
    LogOut,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useCart } from "../../contexts/CartContext";

function Navbar() {

    const navigate = useNavigate();
    const { cartCount } = useCart();

    const [mobileOpen, setMobileOpen] = useState(false);

    const navItems = [
        {
            name: "Home",
            path: "/home",
        },
        {
            name: "Shop",
            path: "/shop",
        },
        {
            name: "Collections",
            path: "/collections",
        },
        {
            name: "Orders",
            path: "/orders",
        },
    ];
    const navLinkClass = ({ isActive }) =>
        `relative text-sm font-medium transition-all duration-300
    ${isActive
            ? "text-white after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-blue-500"
            : "text-gray-400 hover:text-white"
        }`;

    const handleLogout = () => {
        localStorage.removeItem("token");
        toast.success("Logged Out Successfully");
        navigate("/", { replace: true });
    };

    return (

        <header className="sticky top-2 z-50 bg-black backdrop-blur-xl border-b border-white/10  mx-2 rounded-2xl">

            <div className="max-w-7xl mx-auto h-16 px-5 flex items-center justify-between">

                {/* Logo */}

                <div
                    onClick={() => navigate("/home")}
                    className="flex items-center gap-3 cursor-pointer"
                >

                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">

                        <FaFutbol className="text-white text-lg" />

                    </div>

                    <div>

                        <h1 className="text-white text-xl font-bold">
                            KickKart
                        </h1>

                        <p className="text-xs text-gray-400 -mt-1">
                            Football Jersey  Store
                        </p>

                    </div>

                </div>

                {/* Desktop Navigation */}


                <nav className="hidden lg:flex items-center gap-8">

                    {navItems.map((item) => (

                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={navLinkClass}
                        >
                            {item.name}
                        </NavLink>

                    ))}

                </nav>

                {/* Right Side */}

                <div className="flex items-center gap-3">

                    {/* Cart */}

                    <button
                        onClick={() => navigate("/cart")}
                        className="
            relative
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            text-white
            transition-all
            duration-300
            hover:bg-white/10
        "
                    >

                        <ShoppingBag size={21} />

                        <span
                            className="
                absolute
                -top-1
                -right-1
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
                bg-white
                text-[10px]
                font-semibold
                text-black
            "
                        >
                            {cartCount}
                        </span>

                    </button>

                    {/* Logout Button (Desktop Only) */}

                    <button
                        onClick={handleLogout}
                        className="
            hidden
            lg:flex
            items-center
            gap-2
            rounded-xl
            border
            border-red-500/30
            bg-red-500/10
            px-4
            py-2
            text-red-400
            transition-all
            duration-300
            hover:bg-red-500
            hover:text-white
        "
                    >

                        <LogOut size={18} />

                        <span className="text-sm font-medium">
                            Logout
                        </span>

                    </button>

                    {/* Mobile Menu Button */}

                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="
            flex
            lg:hidden
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            text-white
            transition-all
            duration-300
            hover:bg-white/10
        "
                    >

                        {mobileOpen ? (
                            <X size={24} />
                        ) : (
                            <Menu size={24} />
                        )}

                    </button>

                </div>


            </div>
            {/* Mobile Menu */}

            {mobileOpen && (
                <div className="absolute top-20 right-5 z-50 lg:hidden">

                    <div className="w-56 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/95 backdrop-blur-xl shadow-2xl">

                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setMobileOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-5 py-3 text-sm font-medium transition-all duration-300 ${isActive
                                        ? "bg-blue-600 text-white"
                                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                                    }`
                                }
                            >
                                {item.icon && item.icon}
                                <span>{item.name}</span>
                            </NavLink>
                        ))}

                        <div className="border-t border-white/10" />

                        <button
                            onClick={() => {
                                setMobileOpen(false);
                                handleLogout();
                            }}
                            className="flex w-full items-center gap-3 px-5 py-3 text-sm font-medium text-red-400 transition-all duration-300 hover:bg-red-500 hover:text-white"
                        >
                            <LogOut size={18} />
                            <span>Logout</span>
                        </button>

                    </div>

                </div>
            )}

        </header>

    );
}

export default Navbar;