import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await api.get("/orders");
            setOrders(response.data);
        } catch (error) {
            console.error("Failed to fetch orders", error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "PENDING":
                return "bg-yellow-100 text-yellow-700";
            case "DELIVERED":
                return "bg-green-100 text-green-700";
            case "CANCELLED":
                return "bg-red-100 text-red-700";
            case "SHIPPED":
                return "bg-blue-100 text-blue-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <h2 className="text-xl font-semibold">Loading Orders...</h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-6xl mx-auto px-4">

                <h1 className="text-4xl font-bold mb-8">
                    My Orders
                </h1>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow p-10 text-center">
                        <h2 className="text-2xl font-semibold">
                            No Orders Found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Start shopping to place your first order.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white rounded-2xl shadow-lg p-6"
                            >
                                <div className="flex flex-col md:flex-row justify-between gap-6">

                                    <div>
                                        <h2 className="text-xl font-bold">
                                            {order.orderNumber}
                                        </h2>

                                        <p className="text-gray-500 mt-2">
                                            Total: ₹{order.totalAmount}
                                        </p>

                                        <p className="text-gray-500">
                                            Payment: {order.paymentStatus}
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-start md:items-end gap-3">

                                        <span
                                            className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.orderStatus)}`}
                                        >
                                            {order.orderStatus}
                                        </span>

                                        <button
                                            onClick={() =>
                                                navigate(`/orders/${order.id}`)
                                            }
                                            className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
                                        >
                                            View Details
                                        </button>

                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default Orders;