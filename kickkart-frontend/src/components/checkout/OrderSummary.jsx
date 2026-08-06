import { useEffect, useState } from "react";
import { getCart } from "../../api/cartService";

const OrderSummary = ({ setTotalAmount }) => {

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {

            const data = await getCart();

            setCartItems(data);

        } catch (error) {

            console.error("Failed to fetch cart", error);

        } finally {

            setLoading(false);

        }
    };

    const subtotal = cartItems.reduce(
        (total, item) => total + Number(item.subtotal),
        0
    );

    const shipping = subtotal > 0 ? 0 : 0;

    const total = subtotal + shipping;

    useEffect(() => {

    setTotalAmount(total);

}, [total, setTotalAmount]);

    if (loading) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-6">
                Loading...
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">

            <h2 className="text-2xl font-bold mb-6">
                Order Summary
            </h2>

            <div className="space-y-4">

                {
                    cartItems.map((item) => (

                        <div
                            key={item.cartId}
                            className="flex justify-between items-center border-b pb-4"
                        >

                            <div>

                                <h3 className="font-medium">
                                    {item.productName}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    Size: {item.size}
                                </p>

                                <p className="text-sm text-gray-500">
                                    Qty: {item.quantity}
                                </p>

                            </div>

                            <div className="font-semibold">
                                ₹{Number(item.subtotal).toLocaleString()}
                            </div>

                        </div>

                    ))
                }

            </div>

            <div className="border-t mt-6 pt-6 space-y-3">

                <div className="flex justify-between">

                    <span>Subtotal</span>

                    <span>
                        ₹{subtotal.toLocaleString()}
                    </span>

                </div>

                <div className="flex justify-between">

                    <span>Shipping</span>

                    <span className="text-green-600">
                        FREE
                    </span>

                </div>

                <div className="flex justify-between text-xl font-bold border-t pt-4">

                    <span>Total</span>

                    <span>
                        ₹{total.toLocaleString()}
                    </span>

                </div>

            </div>

        </div>
    );
};

export default OrderSummary;