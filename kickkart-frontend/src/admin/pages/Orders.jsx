import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import OrdersTable from "../component/orders/OrdersTable";
import ViewOrder from "../component/orders/ViewOrders";
import UpdateStatus from "../component/orders/UpdateStatus";
import Pagination from "../component/products/Pagination";

import { getAllOrders } from "../api/AdminOrderService";

const Orders = () => {

    const [orders, setOrders] = useState([]);

    const [page, setPage] = useState(0);

    const [totalPages, setTotalPages] = useState(0);

    const [selectedOrder, setSelectedOrder] = useState(null);

    const [showView, setShowView] = useState(false);

    const [showStatus, setShowStatus] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, [page]);

    const fetchOrders = async () => {

        try {

            const data = await getAllOrders(page);

            setOrders(data.content);

            setTotalPages(data.totalPages);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load orders");

        }

    };

    const handleView = (order) => {

        setSelectedOrder(order);

        setShowView(true);

    };

    const handleStatus = (order) => {

        setSelectedOrder(order);

        setShowStatus(true);

    };

    return (

        <div className="space-y-6 text-black">

            <h1 className="text-3xl font-bold">
                Orders
            </h1>

            <OrdersTable
                orders={orders}
                onView={handleView}
                onStatus={handleStatus}
            />

            <Pagination
                page={page}
                totalPages={totalPages}
                onPrevious={() => setPage(page - 1)}
                onNext={() => setPage(page + 1)}
            />

            {showView && (

                <ViewOrder
                    order={selectedOrder}
                    onClose={() => {
                        setShowView(false);
                        setSelectedOrder(null);
                    }}
                />

            )}

            {showStatus && (

                <UpdateStatus
                    order={selectedOrder}
                    refreshOrders={fetchOrders}
                    onClose={() => {
                        setShowStatus(false);
                        setSelectedOrder(null);
                    }}
                />

            )}

        </div>

    );

};

export default Orders;