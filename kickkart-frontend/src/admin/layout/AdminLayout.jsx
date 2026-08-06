import { Outlet } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import Topbar from "../component/TopBar";

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">

            <Sidebar />

            <div className="flex-1 flex flex-col">

                <Topbar />

                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>

            </div>

        </div>
    );
};

export default AdminLayout;