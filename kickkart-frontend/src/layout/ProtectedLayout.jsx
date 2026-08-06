import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

function ProtectedLayout() {
    return (
        <div className="min-h-screen bg-white text-black selection:bg-blue-600 selection:text-white">
            <Navbar />

            <main>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

export default ProtectedLayout;