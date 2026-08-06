import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { placeOrder } from "../../api/orderService";
import {
    createRazorpayOrder,
    verifyPayment,
} from "../../api/paymentService";
import { loadRazorpay } from "../../utils/loadRazorpay";

const CheckoutForm = ({ totalAmount }) => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        shippingAddress: "",
        phoneNumber: "",
        paymentMethod: "COD",
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleOnlinePayment = async () => {

        const loaded = await loadRazorpay();

        if (!loaded) {
            alert("Failed to load Razorpay.");
            return;
        }

        try {

            const razorpayOrder = await createRazorpayOrder(totalAmount);

            const options = {

                key: import.meta.env.VITE_RAZORPAY_KEY_ID,

                

                amount: razorpayOrder.amount,

                currency: razorpayOrder.currency,

                order_id: razorpayOrder.id,

                name: "KickKart",

                description: "Football Jersey Purchase",

                handler: async function (response) {

                    try {

                        await verifyPayment({

                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature,

                        });

                        await placeOrder({

                            ...formData,

                            paymentMethod: "ONLINE",

                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature,

                        });

                        alert("Payment Successful!");

                        navigate("/orders");

                    } catch (error) {

                        alert(
                            error.response?.data?.message ||
                            "Payment verification failed."
                        );

                    }

                },

                theme: {
                    color: "#16a34a",
                },

            };

            const razorpay = new window.Razorpay(options);
            console.log("Razorpay Key:", options.key);
console.log("Razorpay Options:", options);

            razorpay.open();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to initiate payment."
            );

        }

    };
        const handleSubmit = async () => {

        if (formData.shippingAddress.trim().length < 10) {
            alert("Please enter a valid shipping address.");
            return;
        }

        if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        try {

            setLoading(true);

            if (formData.paymentMethod === "COD") {

                await placeOrder(formData);

                alert("Order placed successfully!");

                navigate("/orders");

            } else {

                await handleOnlinePayment();

            }

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Something went wrong."
            );

        } finally {

            setLoading(false);

        }

    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold mb-8">
                Shipping Details
            </h2>

            <div className="space-y-6">

                {/* Shipping Address */}
                <div>

                    <label className="block mb-2 font-medium">
                        Shipping Address
                    </label>

                    <textarea
                        rows={4}
                        name="shippingAddress"
                        value={formData.shippingAddress}
                        onChange={handleChange}
                        placeholder="Enter your complete address..."
                        className="w-full rounded-xl border border-gray-300 p-4 focus:ring-2 focus:ring-black outline-none resize-none"
                    />

                </div>

                {/* Phone Number */}
                <div>

                    <label className="block mb-2 font-medium">
                        Phone Number
                    </label>

                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="9876543210"
                        maxLength={10}
                        className="w-full rounded-xl border border-gray-300 p-4 focus:ring-2 focus:ring-black outline-none"
                    />

                </div>

                {/* Payment Method */}
                <div>

                    <label className="block mb-4 font-medium">
                        Payment Method
                    </label>

                    <div className="space-y-4">

                        <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer">

                            <input
                                type="radio"
                                name="paymentMethod"
                                value="COD"
                                checked={formData.paymentMethod === "COD"}
                                onChange={handleChange}
                            />

                            <span>Cash On Delivery</span>

                        </label>

                        <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer">

                            <input
                                type="radio"
                                name="paymentMethod"
                                value="ONLINE"
                                checked={formData.paymentMethod === "ONLINE"}
                                onChange={handleChange}
                            />

                            <span>Online Payment (Razorpay)</span>

                        </label>
                                                <div className="mt-8">

                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading
                                    ? "Processing..."
                                    : formData.paymentMethod === "ONLINE"
                                    ? "Pay Now"
                                    : "Place Order"}
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default CheckoutForm;