import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/productService";

import ProductGallery from "../components/products/ProductGallery";
import ProductInfo from "../components/products/ProductInfo";
import SuggestedProducts from "../components/products/SuggestedProducts";
import ProductDetailsSkeleton from "../components/products/ProductDetailsSkeleton";

import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            setLoading(true);

            const data = await getProductById(id);

            setProduct(data);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-10">
                Loading...
            </div>
        );
    }

    if (!product) {
        return (
            <ProductDetailsSkeleton />
        );
    }

    return (


        <div className="max-w-7xl mx-auto px-4 py-10">
            <button
                onClick={() => navigate("/shop")}
                className="mb-8 flex items-center gap-2 text-gray-600 hover:text-black transition-colors duration-200 group"
            >
                <ArrowLeft
                    size={20}
                    className="group-hover:-translate-x-1 transition-transform duration-200"
                />

                <span className="font-medium">
                    Back to Shop
                </span>
            </button>

            <div className="grid lg:grid-cols-2 gap-12">

                <ProductGallery product={product} />

                <ProductInfo product={product} />

            </div>

            <SuggestedProducts
                currentProduct={product}
            />

        </div>

    );
};

export default ProductDetails;