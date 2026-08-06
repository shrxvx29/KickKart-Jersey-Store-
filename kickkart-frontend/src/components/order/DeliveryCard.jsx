import {
    MapPin,
    Phone,
    CreditCard,
    Wallet
} from "lucide-react";

const DeliveryCard = ({ order }) => {

    return (

        <div className="bg-white rounded-3xl shadow-sm p-8 h-full">

            <h2 className="text-2xl font-bold mb-8">
                Delivery Details
            </h2>

            <div className="space-y-8">

                {/* Address */}
                <div className="flex items-start gap-4">

                    <div className="bg-blue-100 p-3 rounded-xl">
                        <MapPin className="text-blue-600" size={22} />
                    </div>

                    <div>

                        <h3 className="font-semibold text-lg">
                            Shipping Address
                        </h3>

                        <p className="text-gray-600 mt-2 leading-7 whitespace-pre-line">
                            {order.shippingAddress}
                        </p>

                    </div>

                </div>

                {/* Phone */}
                <div className="flex items-center gap-4">

                    <div className="bg-green-100 p-3 rounded-xl">
                        <Phone className="text-green-600" size={22} />
                    </div>

                    <div>

                        <h3 className="font-semibold text-lg">
                            Phone Number
                        </h3>

                        <p className="text-gray-600 mt-1">
                            {order.phoneNumber}
                        </p>

                    </div>

                </div>

                {/* Payment Method */}
                <div className="flex items-center gap-4">

                    <div className="bg-purple-100 p-3 rounded-xl">
                        <CreditCard className="text-purple-600" size={22} />
                    </div>

                    <div>

                        <h3 className="font-semibold text-lg">
                            Payment Method
                        </h3>

                        <p className="text-gray-600 mt-1">
                            {order.paymentMethod}
                        </p>

                    </div>

                </div>

                {/* Payment Status */}
                <div className="flex items-center gap-4">

                    <div className="bg-yellow-100 p-3 rounded-xl">
                        <Wallet className="text-yellow-600" size={22} />
                    </div>

                    <div>

                        <h3 className="font-semibold text-lg">
                            Payment Status
                        </h3>

                        <span
                            className={`inline-flex mt-2 px-4 py-2 rounded-full text-sm font-semibold
                            ${
                                order.paymentStatus === "SUCCESS"
                                    ? "bg-green-100 text-green-700"
                                    : order.paymentStatus === "PENDING"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                        >
                            {order.paymentStatus}
                        </span>

                    </div>

                </div>

            </div>

        </div>

    );
};

export default DeliveryCard;