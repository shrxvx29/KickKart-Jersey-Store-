import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, LogOut } from "lucide-react";
import toast from "react-hot-toast";

const Sidebar = () => {

    const handleLogout = () => {

        localStorage.removeItem("token");

        toast.success("Logged out successfully");

        window.location.href = "/";

    };

    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            isActive
                ? "bg-black text-white"
                : "text-gray-700 hover:bg-gray-100"
        }`;

    return (

        <aside className="w-64 min-h-screen bg-white border-r flex flex-col text-black border-none">

            {/* Logo */}

            <div className="h-20 flex items-center justify-center border-b">

                <h1 className="text-2xl font-bold">
                    KickKart
                </h1>

            </div>

            {/* Menu */}

            <nav className="flex-1 p-4 space-y-2">

                <NavLink
                    to="/admin/dashboard"
                    className={navLinkClass}
                >
                    <LayoutDashboard size={20} />
                    Dashboard
                </NavLink>

                <NavLink
                    to="/admin/products"
                    className={navLinkClass}
                >
                    <Package size={20} />
                    Products
                </NavLink>

                <NavLink
                    to="/admin/orders"
                    className={navLinkClass}
                >
                    <ShoppingCart size={20} />
                    Orders
                </NavLink>

            </nav>

            {/* Logout */}

            <div className="p-4 border-t">

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition"
                >
                    <LogOut size={20} />
                    Logout
                </button>

            </div>

        </aside>

    );

};

export default Sidebar;