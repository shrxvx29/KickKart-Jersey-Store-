import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyCart = () => {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-6">

            <div className="text-center max-w-md">

                <div className="w-24 h-24 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
                    <ShoppingCart size={40} className="text-gray-500" />
                </div>

                <h2 className="text-3xl font-bold mt-8">
                    Your cart is empty
                </h2>

                <p className="text-gray-500 mt-3">
                    Looks like you haven't added any jerseys yet.
                </p>

                <Link
                    to="/shop"
                    className="inline-block mt-8 px-8 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-900 transition"
                >
                    Continue Shopping
                </Link>

            </div>

        </div>
    );
};

export default EmptyCart;