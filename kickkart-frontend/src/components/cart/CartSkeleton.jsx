const CartSkeleton = () => {

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 animate-pulse">

            <div className="h-8 w-52 bg-gray-200 rounded mb-8"></div>

            <div className="grid lg:grid-cols-3 gap-10">

                {/* Left */}

                <div className="lg:col-span-2 space-y-6">

                    {[1,2,3].map((item) => (

                        <div
                            key={item}
                            className="flex gap-6 p-5 rounded-2xl border border-gray-200"
                        >

                            <div className="w-40 h-40 rounded-xl bg-gray-200"></div>

                            <div className="flex-1 space-y-4">

                                <div className="h-5 w-24 rounded bg-gray-200"></div>

                                <div className="h-7 w-64 rounded bg-gray-200"></div>

                                <div className="h-5 w-20 rounded bg-gray-200"></div>

                                <div className="h-7 w-32 rounded bg-gray-200"></div>

                                <div className="flex gap-3 mt-6">

                                    <div className="w-12 h-12 rounded bg-gray-200"></div>

                                    <div className="w-16 h-12 rounded bg-gray-200"></div>

                                    <div className="w-12 h-12 rounded bg-gray-200"></div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

                {/* Summary */}

                <div className="border border-gray-200 rounded-2xl p-6 h-fit">

                    <div className="h-8 w-40 rounded bg-gray-200 mb-8"></div>

                    <div className="space-y-5">

                        <div className="h-5 bg-gray-200 rounded"></div>

                        <div className="h-5 bg-gray-200 rounded"></div>

                        <div className="h-5 bg-gray-200 rounded"></div>

                        <hr />

                        <div className="h-7 bg-gray-200 rounded"></div>

                        <div className="h-14 bg-gray-200 rounded-xl mt-6"></div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default CartSkeleton;