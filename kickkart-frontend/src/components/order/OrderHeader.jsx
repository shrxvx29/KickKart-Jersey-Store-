import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderHeader = ({ order }) => {

    const navigate = useNavigate();

    const badgeColor = () => {
        switch (order.orderStatus) {
            case "PENDING":
                return "bg-yellow-100 text-yellow-700";

            case "SHIPPED":
                return "bg-blue-100 text-blue-700";

            case "DELIVERED":
                return "bg-green-100 text-green-700";

            case "CANCELLED":
                return "bg-red-100 text-red-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (

        <div className="bg-white rounded-3xl shadow-sm p-8 mb-8">

            <button
                onClick={() => navigate("/orders")}
                className="flex items-center gap-2 text-gray-600 hover:text-black transition"
            >
                <ArrowLeft size={20} />

                Back to Orders
            </button>

            <div className="flex flex-col lg:flex-row justify-between mt-6">

                <div>

                    <h1 className="text-3xl font-bold">

                        Order #{order.orderNumber}

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Placed on{" "}

                        {new Date(order.createdAt).toLocaleDateString()}

                    </p>

                </div>

                <span
                    className={`mt-5 lg:mt-0 h-fit px-5 py-2 rounded-full font-semibold ${badgeColor()}`}
                >
                    {order.orderStatus}
                </span>

            </div>

        </div>

    );
};

export default OrderHeader;