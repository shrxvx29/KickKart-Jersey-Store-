import { Minus, Plus, Trash2 } from "lucide-react";
import { updateCartItem, removeCartItem } from "../../api/cartService";

const CartItem = ({ item, refreshCart }) => {

    const increaseQuantity = async () => {
        try {
            await updateCartItem(item.cartId, item.quantity + 1);
            refreshCart();
        } catch (error) {
            console.error(error);
        }
    };

    const decreaseQuantity = async () => {
        if (item.quantity <= 1) return;

        try {
            await updateCartItem(item.cartId, item.quantity - 1);
            refreshCart();
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemove = async () => {
        try {
            await removeCartItem(item.cartId);
            refreshCart();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-5">

            {/* Product Image */}

            <div className="w-full md:w-40 h-40 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                <img
                    src={
                        item.imageUrl.startsWith("http")
                            ? item.imageUrl
                            : `http://localhost:8080${item.imageUrl}`
                    }
                    alt={item.productName}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Product Details */}

            <div className="flex-1 flex flex-col justify-between">

                <div>

                    <span className="text-sm text-gray-500 uppercase">
                        {item.category}
                    </span>

                    <h2 className="text-xl font-semibold mt-1">
                        {item.productName}
                    </h2>

                    <p className="text-gray-600 mt-2">
                        Size: <span className="font-medium">{item.size}</span>
                    </p>

                    <p className="text-2xl font-bold mt-4">
                        ₹{item.price}
                    </p>

                </div>

                {/* Bottom Section */}

                <div className="flex flex-wrap justify-between items-center mt-6 gap-4">

                    {/* Quantity */}

                    <div className="flex items-center border rounded-xl overflow-hidden">

                        <button
                            onClick={decreaseQuantity}
                            className="p-3 hover:bg-gray-100 transition"
                        >
                            <Minus size={18} />
                        </button>

                        <span className="px-5 font-semibold">
                            {item.quantity}
                        </span>

                        <button
                            onClick={increaseQuantity}
                            className="p-3 hover:bg-gray-100 transition"
                        >
                            <Plus size={18} />
                        </button>

                    </div>

                    {/* Remove */}

                    <button
                        onClick={handleRemove}
                        className="flex items-center gap-2 text-red-500 hover:text-red-600 transition"
                    >
                        <Trash2 size={18} />
                        Remove
                    </button>

                </div>

            </div>

            {/* Subtotal */}

            <div className="flex md:flex-col justify-between items-end">

                <span className="text-sm text-gray-500">
                    Subtotal
                </span>

                <p className="text-2xl font-bold">
                    ₹{item.subtotal}
                </p>

            </div>

        </div>
    );
};

export default CartItem;