import { Link } from "react-router-dom";

const CartSummary = ({ subtotal, totalItems }) => {

    const deliveryCharge = 0;
    const tax = 0;

    const total = subtotal + deliveryCharge + tax;

    return (
        <div className="sticky top-24 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

            <h2 className="text-2xl font-bold mb-6">
                Order Summary
            </h2>

            <div className="space-y-4">

                <div className="flex justify-between">
                    <span className="text-gray-600">
                        Items ({totalItems})
                    </span>

                    <span className="font-semibold">
                        ₹{subtotal.toFixed(2)}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-600">
                        Delivery
                    </span>

                    <span className="text-green-600 font-semibold">
                        FREE
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-600">
                        Tax
                    </span>

                    <span className="font-semibold">
                        ₹{tax.toFixed(2)}
                    </span>
                </div>

                <hr className="my-4" />

                <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>

                    <span>
                        ₹{total.toFixed(2)}
                    </span>
                </div>

            </div>

            <Link
                to="/checkout"
                className="mt-8 block w-full text-center bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-900 transition"
            >
                Proceed to Checkout
            </Link>

            <Link
                to="/shop"
                className="mt-4 block text-center text-gray-600 hover:text-black transition"
            >
                Continue Shopping
            </Link>

        </div>
    );
};

export default CartSummary;