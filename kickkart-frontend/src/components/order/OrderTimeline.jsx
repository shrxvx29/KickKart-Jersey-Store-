import {
    CircleCheckBig,
    PackageCheck,
    Truck,
    House,
    CircleX
} from "lucide-react";

const OrderTimeline = ({ order }) => {

    if (order.orderStatus === "CANCELLED") {
        return (
            <div className="bg-white rounded-3xl shadow-sm p-8 h-full">

                <h2 className="text-2xl font-bold mb-8">
                    Order Status
                </h2>

                <div className="flex items-center gap-4">

                    <div className="bg-red-100 p-3 rounded-full">
                        <CircleX
                            className="text-red-600"
                            size={26}
                        />
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg text-red-600">
                            Order Cancelled
                        </h3>

                        <p className="text-gray-500">
                            This order has been cancelled.
                        </p>
                    </div>

                </div>

            </div>
        );
    }

    const steps = [
        {
            title: "Order Placed",
            icon: CircleCheckBig,
            key: "PENDING",
        },
        {
            title: "Packed",
            icon: PackageCheck,
            key: "PACKED",
        },
        {
            title: "Shipped",
            icon: Truck,
            key: "SHIPPED",
        },
        {
            title: "Delivered",
            icon: House,
            key: "DELIVERED",
        },
    ];

    const currentStep = (() => {
        switch (order.orderStatus) {
            case "PENDING":
                return 0;
            case "PACKED":
                return 1;
            case "SHIPPED":
                return 2;
            case "DELIVERED":
                return 3;
            default:
                return 0;
        }
    })();

    return (
        <div className="bg-white rounded-3xl shadow-sm p-8">

            <h2 className="text-2xl font-bold mb-8">
                Order Timeline
            </h2>

            <div className="relative">

                {steps.map((step, index) => {

                    const Icon = step.icon;

                    const completed = index <= currentStep;

                    return (

                        <div
                            key={step.key}
                            className="flex gap-5 relative pb-10 last:pb-0"
                        >

                            {/* Vertical Line */}

                            {index !== steps.length - 1 && (

                                <div
                                    className={`absolute left-[18px] top-10 w-1 h-full rounded-full ${
                                        completed
                                            ? "bg-green-500"
                                            : "bg-gray-200"
                                    }`}
                                />

                            )}

                            {/* Icon */}

                            <div
                                className={`z-10 w-10 h-10 rounded-full flex items-center justify-center ${
                                    completed
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-200 text-gray-500"
                                }`}
                            >
                                <Icon size={20} />
                            </div>

                            {/* Text */}

                            <div>

                                <h3
                                    className={`font-semibold ${
                                        completed
                                            ? "text-black"
                                            : "text-gray-400"
                                    }`}
                                >
                                    {step.title}
                                </h3>

                                {completed && (
                                    <p className="text-sm text-gray-500 mt-1">
                                        Completed
                                    </p>
                                )}

                            </div>

                        </div>

                    );

                })}

            </div>

        </div>
    );
};

export default OrderTimeline;