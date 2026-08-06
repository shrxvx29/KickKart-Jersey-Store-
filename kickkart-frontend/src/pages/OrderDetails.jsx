import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

import OrderHeader from "../components/order/OrderHeader";
import DeliveryCard from "../components/order/DeliveryCard";
import OrderTimeline from "../components/order/OrderTimeline";
import ProductCard from "../components/order/ProductCard";
import PriceSummary from "../components/order/PriceSummary";
import OrderDetailSkeleton from "../components/order/OrderDetailSkeleton";

const OrderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cancelLoading, setCancelLoading] = useState(false);

    useEffect(() => {
        fetchOrder();
    }, []);

    const fetchOrder = async () => {
        try {
            setLoading(true);

            const res = await api.get(`/orders/${id}`);

            setOrder(res.data);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async () => {
        if (!window.confirm("Are you sure you want to cancel this order?")) {
            return;
        }

        try {
            setCancelLoading(true);

            await api.put(`/orders/${id}/cancel`);

            fetchOrder();

        } catch (err) {
            console.error(err);
            alert("Unable to cancel order.");
        } finally {
            setCancelLoading(false);
        }
    };

    if (loading) {
        return <OrderDetailSkeleton />;
    }

    if (!order) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <div className="text-center">

                    <h2 className="text-3xl font-bold">
                        Order not found
                    </h2>

                    <button
                        onClick={() => navigate("/orders")}
                        className="mt-6 px-6 py-3 rounded-xl bg-black text-white"
                    >
                        Back to Orders
                    </button>

                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen py-10">

            <div className="max-w-7xl mx-auto px-4">

                {/* Header */}

                <OrderHeader order={order} />

                {/* Delivery + Timeline */}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

                    <div className="lg:col-span-2">
                        <DeliveryCard order={order} />
                    </div>

                    <div>
                        <OrderTimeline order={order} />
                    </div>

                </div>

                {/* Products */}

                <section className="mb-8">

                    <h2 className="text-2xl font-bold mb-6">
                        Ordered Products
                    </h2>

                    <div className="space-y-6">

                        {order.items.map((item) => (
                            <ProductCard
                                key={item.productId}
                                item={item}
                            />
                        ))}

                    </div>

                </section>

                {/* Price Summary */}

                <PriceSummary
                    order={order}
                    onCancel={handleCancel}
                    cancelLoading={cancelLoading}
                />

            </div>

        </div>
    );
};

export default OrderDetail;