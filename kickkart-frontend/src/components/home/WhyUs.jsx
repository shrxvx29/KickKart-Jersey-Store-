import React from "react";
import {
    ShieldCheck,
    Truck,
    BadgeCheck,
    Headphones,
} from "lucide-react";

const features = [
    {
        id: 1,
        icon: <ShieldCheck size={40} className="text-blue-600" />,
        title: "100% Authentic",
        description:
            "Every jersey is carefully sourced to ensure premium quality and authenticity.",
    },
    {
        id: 2,
        icon: <Truck size={40} className="text-blue-600" />,
        title: "Fast Delivery",
        description:
            "Quick and secure shipping across India with real-time order tracking.",
    },
    {
        id: 3,
        icon: <BadgeCheck size={40} className="text-blue-600" />,
        title: "Premium Quality",
        description:
            "Made with breathable, durable fabrics designed for comfort and performance.",
    },
    {
        id: 4,
        icon: <Headphones size={40} className="text-blue-600" />,
        title: "24/7 Support",
        description:
            "Our support team is always ready to help with orders, returns, and queries.",
    },
];

function WhyUs() {
    return (
        <section className="bg-white py-24">

            <div className="mx-auto max-w-7xl px-6">

                {/* Heading */}

                <div className="mb-16 text-center">

                    <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
                        Why Choose Us
                    </span>

                    <h2 className="mt-5 text-4xl font-bold text-gray-900 md:text-5xl">
                        Why Shop With KickKart?
                    </h2>

                    <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600">
                        We provide premium football jerseys with trusted quality,
                        secure shopping, and a seamless experience from checkout
                        to delivery.
                    </p>

                </div>

                {/* Cards */}

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

                    {features.map((feature) => (

                        <div
                            key={feature.id}
                            className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl"
                        >

                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 transition-all duration-300 group-hover:bg-black-600">

                                <div className="group-hover:text-white">
                                    {feature.icon}
                                </div>

                            </div>

                            <h3 className="text-2xl font-bold text-gray-900">
                                {feature.title}
                            </h3>

                            <p className="mt-4 leading-7 text-gray-600">
                                {feature.description}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}

export default WhyUs;