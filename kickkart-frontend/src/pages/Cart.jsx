import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getCart } from "../api/cartService";

import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import EmptyCart from "../components/cart/EmptyCart";
import CartSkeleton from "../components/cart/CartSkeleton";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            setLoading(true);

            const response = await getCart();

            setCartItems(response);
        } catch (error) {
            console.error("Failed to load cart:", error);
        } finally {
            setLoading(false);
        }
    };

    const subtotal = cartItems.reduce(
        (total, item) => total + Number(item.subtotal),
        0
    );

    if (loading) {
        return <CartSkeleton />;
    }

    if (cartItems.length === 0) {
        return <EmptyCart />;
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">

            {/* Continue Shopping */}

            <Link
                to="/shop"
                className="inline-flex items-center text-gray-600 hover:text-black transition mb-8"
            >
                ← Continue Shopping
            </Link>

            {/* Heading */}

            <h1 className="text-4xl font-bold mb-10">
                Shopping Cart ({cartItems.length})
            </h1>

            <div className="grid lg:grid-cols-3 gap-10">

                {/* Left */}

                <div className="lg:col-span-2 space-y-6">

                    {cartItems.map((item) => (
                        <CartItem
                            key={item.cartId}
                            item={item}
                            refreshCart={fetchCart}
                        />
                    ))}

                </div>

                {/* Right */}

                <div>

                    <CartSummary
                        subtotal={subtotal}
                        totalItems={cartItems.length}
                    />

                </div>

            </div>

        </div>
    );
};

export default Cart;