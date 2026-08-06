import { useState } from "react";
import toast from "react-hot-toast";
import { updateOrderStatus } from "../../api/AdminOrderService";

const UpdateStatus = ({ order, onClose, refreshOrders }) => {

    const [status, setStatus] = useState(order.orderStatus);

    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {

        try {

            setLoading(true);

            await updateOrderStatus(order.id, status);

            toast.success("Order status updated");

            refreshOrders();

            onClose();

        } catch (error) {

            console.error(error);

            toast.error("Failed to update status");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl w-full max-w-md p-6">

                <h2 className="text-2xl font-bold mb-6">

                    Update Order Status

                </h2>

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full border rounded-xl p-3 mb-6"
                >
                    <option value="PENDING">
                        Pending
                    </option>

                    <option value="CONFIRMED">
                        Confirmed
                    </option>

                    <option value="SHIPPED">
                        Shipped
                    </option>

                    <option value="DELIVERED">
                        Delivered
                    </option>

                    <option value="CANCELLED">
                        Cancelled
                    </option>

                </select>

                <div className="flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="px-5 py-2 border rounded-xl"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleUpdate}
                        disabled={loading}
                        className="px-5 py-2 bg-black text-white rounded-xl hover:bg-gray-800 disabled:opacity-50"
                    >
                        {loading
                            ? "Updating..."
                            : "Update"}
                    </button>

                </div>

            </div>

        </div>

    );

};

export default UpdateStatus;