import React from "react";

const OrderDetailSkeleton = () => {

    return (

        <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">

            {/* Header */}

            <div className="bg-white rounded-3xl shadow-sm p-8 mb-8">

                <div className="h-5 w-40 bg-gray-200 rounded mb-6" />

                <div className="flex justify-between items-start">

                    <div className="space-y-4">

                        <div className="h-8 w-72 bg-gray-200 rounded" />

                        <div className="h-4 w-44 bg-gray-200 rounded" />

                    </div>

                    <div className="h-10 w-28 rounded-full bg-gray-200" />

                </div>

            </div>

            {/* Delivery + Timeline */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

                <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm p-8">

                    <div className="h-7 w-52 bg-gray-200 rounded mb-8" />

                    {[1,2,3,4].map((i)=>(
                        <div
                            key={i}
                            className="flex gap-4 mb-8"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gray-200"/>

                            <div className="flex-1 space-y-3">

                                <div className="h-5 w-40 bg-gray-200 rounded"/>

                                <div className="h-4 w-60 bg-gray-200 rounded"/>

                            </div>

                        </div>
                    ))}

                </div>

                <div className="bg-white rounded-3xl shadow-sm p-8">

                    <div className="h-7 w-40 bg-gray-200 rounded mb-8"/>

                    {[1,2,3,4].map((i)=>(
                        <div
                            key={i}
                            className="flex gap-4 mb-8"
                        >

                            <div className="w-10 h-10 rounded-full bg-gray-200"/>

                            <div className="space-y-3 flex-1">

                                <div className="h-5 w-32 bg-gray-200 rounded"/>

                                <div className="h-4 w-24 bg-gray-200 rounded"/>

                            </div>

                        </div>
                    ))}

                </div>

            </div>

            {/* Products */}

            <div className="space-y-6">

                <div className="h-8 w-56 bg-gray-200 rounded"/>

                {[1,2].map((i)=>(
                    <div
                        key={i}
                        className="bg-white rounded-3xl shadow-sm p-6"
                    >

                        <div className="flex gap-6">

                            <div className="w-36 h-36 rounded-2xl bg-gray-200"/>

                            <div className="flex-1">

                                <div className="h-6 w-72 bg-gray-200 rounded mb-6"/>

                                <div className="flex gap-3 mb-8">

                                    <div className="h-8 w-24 rounded-full bg-gray-200"/>

                                    <div className="h-8 w-20 rounded-full bg-gray-200"/>

                                    <div className="h-8 w-20 rounded-full bg-gray-200"/>

                                </div>

                                <div className="flex justify-between">

                                    <div>

                                        <div className="h-4 w-20 bg-gray-200 rounded mb-2"/>

                                        <div className="h-6 w-24 bg-gray-200 rounded"/>

                                    </div>

                                    <div>

                                        <div className="h-4 w-20 bg-gray-200 rounded mb-2"/>

                                        <div className="h-8 w-28 bg-gray-200 rounded"/>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                ))}

            </div>

            {/* Price Summary */}

            <div className="bg-white rounded-3xl shadow-sm p-8 mt-8">

                <div className="h-7 w-44 bg-gray-200 rounded mb-8"/>

                {[1,2,3].map((i)=>(
                    <div
                        key={i}
                        className="flex justify-between mb-5"
                    >

                        <div className="h-4 w-32 bg-gray-200 rounded"/>

                        <div className="h-4 w-24 bg-gray-200 rounded"/>

                    </div>
                ))}

                <div className="border-t pt-6 flex justify-between">

                    <div className="h-6 w-24 bg-gray-200 rounded"/>

                    <div className="h-8 w-32 bg-gray-200 rounded"/>

                </div>

            </div>

        </div>

    );

};

export default OrderDetailSkeleton;