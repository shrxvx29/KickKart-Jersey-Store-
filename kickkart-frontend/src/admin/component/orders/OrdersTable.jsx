import React from "react";

const OrdersTable = ({ orders, onView, onStatus }) => {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

            <table className="w-full">

                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-4 text-left">Order ID</th>
                        <th className="px-6 py-4 text-left">Customer</th>
                        <th className="px-6 py-4 text-left">Amount</th>
                        <th className="px-6 py-4 text-left">Payment</th>
                        <th className="px-6 py-4 text-left">Status</th>
                        <th className="px-6 py-4 text-left">Date</th>
                        <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {orders.length === 0 ? (

                        <tr>
                            <td
                                colSpan="7"
                                className="text-center py-10 text-gray-500"
                            >
                                No Orders Found
                            </td>
                        </tr>

                    ) : (

                        orders.map((order) => (

                            <tr
                                key={order.id}
                                className="border-t hover:bg-gray-50"
                            >

                                <td className="px-6 py-4 font-medium">
                                    #{order.id}
                                </td>

                                <td className="px-6 py-4">
                                    {order.customerName}
                                </td>

                                <td className="px-6 py-4">
                                    ₹{order.totalAmount}
                                </td>

                                <td className="px-6 py-4">
                                    {order.paymentStatus}
                                </td>

                                <td className="px-6 py-4">

                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium
                                            ${
                                                order.orderStatus === "DELIVERED"
                                                    ? "bg-green-100 text-green-700"
                                                    : order.orderStatus === "PENDING"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : order.orderStatus === "CANCELLED"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-blue-100 text-blue-700"
                                            }`}
                                    >
                                        {order.orderStatus}
                                    </span>

                                </td>

                                <td className="px-6 py-4">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>

                                <td className="px-6 py-4">

                                    <div className="flex justify-center gap-2">

                                        <button
                                            onClick={() => onView(order)}
                                            className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                                        >
                                            View
                                        </button>

                                        <button
                                            onClick={() => onStatus(order)}
                                            className="px-3 py-2 rounded-lg bg-black text-white hover:bg-gray-800"
                                        >
                                            Update
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>
    );
};

export default OrdersTable;