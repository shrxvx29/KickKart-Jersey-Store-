import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

const AdminRoute = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {

        const checkAdmin = async () => {

            try {

                const response = await api.get("/user/me");

                if (response.data.role === "ADMIN") {
                    setIsAdmin(true);
                }

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        };

        checkAdmin();

    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!isAdmin) {
        return <Navigate to="/home" replace />;
    }

    return children;

};

export default AdminRoute;