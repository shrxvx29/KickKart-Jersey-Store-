import { useEffect, useState } from "react";
import KpiCard from "../component/dashboard/KpiCard";
import QuickOverview from "../component/dashboard/QuickOverview";
import { getDashboardStats } from "../api/AdminDashboardService";

const Dashboard = () => {

    const [stats, setStats] = useState({
        totalOrders: 0,
        completedOrders: 0,
        pendingOrders: 0,
        cancelledOrders: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {

            const data = await getDashboardStats();

            setStats(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    };

    if (loading) {
        return (
            <div className="text-center py-20 text-gray-500">
                Loading Dashboard...
            </div>
        );
    }

    return (
        <div className="space-y-8 text-black">

            <h1 className="text-3xl font-bold">
                Dashboard
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

                <KpiCard
                    title="Total Orders"
                    value={stats.totalOrders}
                />

                <KpiCard
                    title="Completed"
                    value={stats.completedOrders}
                />

                <KpiCard
                    title="Pending"
                    value={stats.pendingOrders}
                />

                <KpiCard
                    title="Cancelled"
                    value={stats.cancelledOrders}
                />

            </div>

            <QuickOverview stats={stats} />

        </div>
    );
};

export default Dashboard;