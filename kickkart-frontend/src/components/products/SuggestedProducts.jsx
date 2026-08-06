import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../api/productService";

const SuggestedProducts = ({ currentProduct }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!currentProduct) return;

        fetchSuggestedProducts();
    }, [currentProduct]);

    const fetchSuggestedProducts = async () => {
        try {
            setLoading(true);

            const response = await getProducts(0, 8);

            const filtered = response.content
                .filter(
                    (item) =>
                        item.category === currentProduct.category &&
                        item.id !== currentProduct.id
                )
                .slice(0, 4);

            setProducts(filtered);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="mt-20">
                <h2 className="text-2xl font-bold mb-8">
                    You May Also Like
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, index) => (
                        <div
                            key={index}
                            className="shimmer"
                        >
                            <div className="aspect-square bg-gray-200 rounded-2xl"></div>

                            <div className="h-4 bg-gray-200 rounded mt-4"></div>

                            <div className="h-4 w-1/2 bg-gray-200 rounded mt-2"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (products.length === 0) return null;

    return (
        <section className="mt-20">
            <h2 className="text-2xl font-bold mb-8">
                You May Also Like
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {products.map((product) => (
                    <Link
                        key={product.id}
                        to={`/products/${product.id}`}
                        className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden"
                    >
                        <div className="aspect-square overflow-hidden">
                            <img
                            src={`${product.imageUrl}?w=600&auto=format&fit=crop&q=80`}        alt={product.name}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                            />
                        </div>

                        <div className="p-4">
                            <span className="text-xs font-semibold text-gray-500 uppercase">
                                {product.category}
                            </span>

                            <h3 className="font-semibold mt-2 line-clamp-2">
                                {product.name}
                            </h3>

                            <p className="text-xl font-bold mt-3">
                                ₹{product.price}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default SuggestedProducts;