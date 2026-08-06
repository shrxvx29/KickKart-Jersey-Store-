import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Logout = () => {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");

        toast.success("Logged out successfully");

        navigate("/login", { replace: true });

    };

    return (

        <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition"
        >

            <LogOut size={20} />

            <span className="font-medium">
                Logout
            </span>

        </button>

    );

};

export default Logout;