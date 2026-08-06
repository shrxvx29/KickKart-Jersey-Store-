import { useState } from "react";

const ProductGallery = ({ product }) => {

    const [imageLoaded, setImageLoaded] = useState(false);

    return (

        <div className="w-full">

            <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white">

                {!imageLoaded && (
                    <div className="absolute inset-0 shimmer" />
                )}

                <img
                    src={
                        product.imageUrl.startsWith("http")
                            ? product.imageUrl
                            : `http://localhost:8080${product.imageUrl}`
                    } alt={product.name}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageLoaded(true)}
                    className={`w-full h-[650px] object-cover transition-all duration-500 hover:scale-105 ${imageLoaded
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                />

            </div>

        </div>

    );
};

export default ProductGallery;