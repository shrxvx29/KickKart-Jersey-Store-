import { X } from "lucide-react";

const ViewOrder = ({ order, onClose }) => {

    if (!order) return null;

    return (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">

                {/* Header */}

                <div className="flex justify-between items-center p-6 border-b">

                    <div>

                        <h2 className="text-2xl font-bold">
                            Order #{order.id}
                        </h2>

                        <p className="text-gray-500 mt-1">
                            {new Date(order.createdAt).toLocaleString()}
                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <X size={22} />
                    </button>

                </div>

                {/* Body */}

                <div className="p-6 space-y-8">

                    {/* Customer */}

                    <div>

                        <h3 className="font-bold text-lg mb-3">
                            Customer Details
                        </h3>

                        <div className="grid grid-cols-2 gap-4">

                            <div>

                                <p className="text-gray-500">
                                    Name
                                </p>

                                <p className="font-medium">
                                    {order.customerName}
                                </p>

                            </div>

                            <div>

                                <p className="text-gray-500">
                                    Email
                                </p>

                                <p className="font-medium">
                                    {order.customerEmail}
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Shipping */}

                    <div>

                        <h3 className="font-bold text-lg mb-3">
                            Shipping Address
                        </h3>

                        <p>
                            {order.shippingAddress}
                        </p>

                    </div>

                    {/* Products */}

                    <div>

                        <h3 className="font-bold text-lg mb-4">
                            Ordered Products
                        </h3>

                        <table className="w-full">

                            <thead className="bg-gray-100">

                                <tr>

                                    <th className="text-left p-3">
                                        Product
                                    </th>

                                    <th className="text-left p-3">
                                        Size
                                    </th>

                                    <th className="text-left p-3">
                                        Qty
                                    </th>

                                    <th className="text-left p-3">
                                        Price
                                    </th>

                                    <th className="text-left p-3">
                                        Total
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {order.items.map((item) => (

                                    <tr
                                        key={item.id}
                                        className="border-b"
                                    >

                                        <td className="p-3">

                                            <div className="flex items-center gap-3">

                                                <img
                                                    src={`http://localhost:8080${item.imageUrl}`}
                                                    alt={item.productName}
                                                    className="w-14 h-14 rounded-lg object-cover"
                                                />

                                                <span>
                                                    {item.productName}
                                                </span>

                                            </div>

                                        </td>

                                        <td className="p-3">
                                            {item.size}
                                        </td>

                                        <td className="p-3">
                                            {item.quantity}
                                        </td>

                                        <td className="p-3">
                                            ₹{item.price}
                                        </td>

                                        <td className="p-3 font-semibold">
                                            ₹{item.subtotal}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                    {/* Summary */}

                    <div className="grid md:grid-cols-2 gap-6">

                        <div>

                            <h3 className="font-bold mb-2">
                                Payment
                            </h3>

                            <p>
                                <strong>Status:</strong>{" "}
                                {order.paymentStatus}
                            </p>

                            <p>
                                <strong>Method:</strong>{" "}
                                {order.paymentMethod}
                            </p>

                        </div>

                        <div className="text-right">

                            <h3 className="font-bold mb-2">
                                Order Summary
                            </h3>

                            <h2 className="text-3xl font-bold">
                                ₹{order.totalAmount}
                            </h2>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default ViewOrder;