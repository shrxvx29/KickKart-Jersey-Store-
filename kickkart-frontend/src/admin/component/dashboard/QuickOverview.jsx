const QuickOverview = ({ stats }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border p-6 border-none">

            <h2 className="text-2xl font-bold mb-6">
                Quick Overview
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ">

                <div className="rounded-xl border p-5 border-none">
                    <p className="text-gray-500 text-sm">
                        Completion Rate
                    </p>

                    <h3 className="text-3xl font-bold mt-2 border-none">
                        {stats.totalOrders === 0
                            ? "0%"
                            : Math.round(
                                (stats.completedOrders / stats.totalOrders) * 100
                            ) + "%"}
                    </h3>
                </div>

                <div className="rounded-xl border p-5 border-none">
                    <p className="text-gray-500 text-sm">
                        Pending Orders
                    </p>

                    <h3 className="text-3xl font-bold mt-2 text-yellow-500">
                        {stats.pendingOrders}
                    </h3>
                </div>

                <div className="rounded-xl border p-5 border-none">
                    <p className="text-gray-500 text-sm">
                        Cancelled Orders
                    </p>

                    <h3 className="text-3xl font-bold mt-2 text-red-500 border-none">
                        {stats.cancelledOrders}
                    </h3>
                </div>

                <div className="rounded-xl border p-5 border-none">
                    <p className="text-gray-500 text-sm">
                        Success Orders
                    </p>

                    <h3 className="text-3xl font-bold mt-2 text-green-600">
                        {stats.completedOrders}
                    </h3>
                </div>

            </div>

        </div>
    );
};

export default QuickOverview;