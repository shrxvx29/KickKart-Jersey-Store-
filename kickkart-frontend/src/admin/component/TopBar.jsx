import { Bell, User } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../api/axios";

const Topbar = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get("/user/me");
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="h-20 bg-white border-b px-8 flex items-center justify-between text-black border-none">

      {/* Left */}
      <div>

        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="text-sm text-gray-500">
          Welcome back,
          <span className="font-semibold text-black">
            {" "}
            {user?.fullName || "Admin"}
          </span>
        </p>

      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Notification */}
        <button className="relative w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center">

          <Bell size={20} />

          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>

        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2">

          <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">

            <User size={18} />

          </div>

          <div>

            <p className="font-semibold text-sm">
              {user?.fullName || "Admin"}
            </p>

            <p className="text-xs text-gray-500">
              {user?.role}
            </p>

          </div>

        </div>

      </div>

    </header>
  );
};

export default Topbar;