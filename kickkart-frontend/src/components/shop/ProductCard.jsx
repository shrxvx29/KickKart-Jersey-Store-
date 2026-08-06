import { Link } from "react-router-dom";
import { useState } from "react";

const ProductCard = ({ product }) => {

    const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300">

      {/* Product Image */}
      <div className="relative h-72">

    {!imageLoaded && (
        <div className="absolute inset-0 shimmer bg-gray-200"/>
    )}

    <img
    src={
        product.imageUrl.startsWith("http")
            ? product.imageUrl
            : `http://localhost:8080${product.imageUrl}`
    }
    alt={product.name}
    loading="lazy"
    onLoad={() => setImageLoaded(true)}
    className={`w-full h-full object-cover transition-opacity duration-300 ${
        imageLoaded ? "opacity-100" : "opacity-0"
    }`}
/>

</div>

      {/* Product Info */}
      <div className="p-4">

        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {product.name}
        </h3>

        <p className="mt-2 text-2xl font-bold text-black">
          ₹{product.price}
        </p>

        <Link
          to={`/products/${product.id}`}
          className="mt-4 block w-full text-center bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
        >
          View Details
        </Link>

      </div>

    </div>
  );
};

export default ProductCard;