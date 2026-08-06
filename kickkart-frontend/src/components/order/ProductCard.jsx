import { Tag, Ruler, Hash } from "lucide-react";

const ProductCard = ({ item }) => {

    return (

        <div className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 p-6">

            <div className="flex flex-col md:flex-row gap-6">

                {/* Product Image */}

                <div className="flex-shrink-0">

                    <img
                        src={item.imageUrl}
                        alt={item.productName}
                        className="w-36 h-36 rounded-2xl object-cover border"
                    />

                </div>

                {/* Product Details */}

                <div className="flex-1 flex flex-col justify-between">

                    <div>

                        <h2 className="text-xl font-bold text-gray-900">
                            {item.productName}
                        </h2>

                        <div className="flex flex-wrap gap-3 mt-4">

                            <span className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">

                                <Tag size={15} />

                                {item.category}

                            </span>

                            <span className="flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">

                                <Ruler size={15} />

                                {item.size}

                            </span>

                            <span className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">

                                <Hash size={15} />

                                Qty {item.quantity}

                            </span>

                        </div>

                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">

                        <div>

                            <p className="text-gray-500 text-sm">
                                Unit Price
                            </p>

                            <h3 className="text-lg font-semibold">
                                ₹{item.price}
                            </h3>

                        </div>

                        <div className="text-right mt-4 sm:mt-0">

                            <p className="text-gray-500 text-sm">
                                Total
                            </p>

                            <h2 className="text-2xl font-bold text-green-600">
                                ₹{item.subtotal}
                            </h2>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default ProductCard;