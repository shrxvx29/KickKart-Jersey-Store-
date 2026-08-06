const ProductDetailsSkeleton = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12 animate-pulse">
            <div className="grid lg:grid-cols-2 gap-12">

                {/* Product Image */}
                <div>
                    <div className="w-full aspect-square rounded-3xl bg-gray-200"></div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">

                    <div className="h-6 w-24 rounded bg-gray-200"></div>

                    <div className="h-10 w-3/4 rounded bg-gray-200"></div>

                    <div className="h-8 w-40 rounded bg-gray-200"></div>

                    <div className="space-y-3">
                        <div className="h-4 rounded bg-gray-200"></div>
                        <div className="h-4 rounded bg-gray-200"></div>
                        <div className="h-4 w-5/6 rounded bg-gray-200"></div>
                    </div>

                    {/* Size */}
                    <div>
                        <div className="h-5 w-24 rounded bg-gray-200 mb-4"></div>

                        <div className="flex gap-3">
                            {[1,2,3,4].map((item)=>(
                                <div
                                    key={item}
                                    className="w-12 h-12 rounded-xl bg-gray-200"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gray-200"></div>
                        <div className="w-16 h-12 rounded-xl bg-gray-200"></div>
                        <div className="w-12 h-12 rounded-xl bg-gray-200"></div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 pt-4">
                        <div className="flex-1 h-14 rounded-xl bg-gray-200"></div>
                        <div className="w-14 h-14 rounded-xl bg-gray-200"></div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default ProductDetailsSkeleton;