import { useState } from "react";
import { addToCart } from "../../api/cartService";
import toast from "react-hot-toast";

const ProductInfo = ({ product }) => {

    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const sizes = ["S", "M", "L", "XL"];

    const [selectedSize, setSelectedSize] = useState("");

    const [adding, setAdding] = useState(false);

    const handleAddToCart = async () => {

        if (!selectedSize) {
            toast.error("Please select a size");
            return;
        }

        try {

            setAdding(true);

            await addToCart(product.id, quantity, selectedSize);

            toast.success("Added to cart");

        } catch (error) {

            console.error(error);

            toast.error("Unable to add item");

        } finally {

            setAdding(false);

        }

    };
    return (

        <div className="flex flex-col justify-center">

            {/* Category */}
            <span className="inline-block w-fit px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
                {product.category}
            </span>

            {/* Title */}
            <h1 className="mt-4 text-4xl font-bold text-gray-900">
                {product.name}
            </h1>

            {/* Price */}
            <p className="mt-6 text-4xl font-extrabold text-black">
                ₹{product.price}
            </p>

            {/* Description */}
            <p className="mt-6 text-gray-600 leading-7">
                {product.description}
            </p>

            {/* Stock */}
            <div className="mt-6">
                {product.stock > 0 ? (
                    <span className="text-green-600 font-semibold">
                        ✓ In Stock ({product.stock} available)
                    </span>
                ) : (
                    <span className="text-red-600 font-semibold">
                        Out of Stock
                    </span>
                )}
            </div>
            <div className="mt-8">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Select Size
                </h3>

                <div className="flex gap-3">
                    {sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`w-12 h-12 rounded-xl border-2 font-semibold transition-all duration-200
                    ${selectedSize === size
                                    ? "bg-black text-white border-black"
                                    : "bg-white text-gray-700 border-gray-300 hover:border-black"
                                }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>

                {!selectedSize && (
                    <p className="text-sm text-red-500 mt-2">
                        Please select a size.
                    </p>
                )}
            </div>

            {/* Quantity */}
            <div className="mt-8 flex items-center gap-4">

                <span className="font-semibold">
                    Quantity
                </span>

                <div className="flex items-center border rounded-xl overflow-hidden">

                    <button
                        onClick={decreaseQuantity}
                        className="px-4 py-2 hover:bg-gray-100"
                    >
                        −
                    </button>

                    <span className="px-6 font-semibold">
                        {quantity}
                    </span>

                    <button
                        onClick={increaseQuantity}
                        className="px-4 py-2 hover:bg-gray-100"
                    >
                        +
                    </button>

                </div>

            </div>

            {/* Add To Cart */}
            <button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || adding || !selectedSize}
                className="mt-10 w-full bg-black text-white py-4 rounded-xl text-lg font-semibold hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {adding ? "Adding..." : "Add To Cart"}

            </button>

        </div>

    );
};

export default ProductInfo;