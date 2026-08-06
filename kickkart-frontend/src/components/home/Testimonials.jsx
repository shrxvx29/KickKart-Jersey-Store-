import React from "react";
import { Star } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Rahul Sharma",
        role: "Football Enthusiast",
        image: "https://i.pravatar.cc/150?img=12",
        review:
            "Amazing quality! The jersey feels exactly like the official club version. Delivery was super fast too.",
    },
    {
        id: 2,
        name: "Arjun Kumar",
        role: "Manchester United Fan",
        image: "https://i.pravatar.cc/150?img=32",
        review:
            "KickKart exceeded my expectations. Premium fabric, perfect fit, and excellent customer support.",
    },
    {
        id: 3,
        name: "Vikram Patel",
        role: "Barcelona Supporter",
        image: "https://i.pravatar.cc/150?img=68",
        review:
            "I've ordered twice already. Authentic designs, affordable prices, and smooth shopping experience.",
    },
];

function Testimonials() {
    return (
        <section className="bg-white py-24">

            <div className="mx-auto max-w-7xl px-6">

                {/* Heading */}

                <div className="mb-16 text-center">

                    <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
                        Testimonials
                    </span>

                    <h2 className="mt-5 text-4xl font-bold text-gray-900 md:text-5xl">
                        What Our Customers Say
                    </h2>

                    <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600">
                        Thousands of football fans trust KickKart for premium jerseys,
                        secure shopping, and fast delivery.
                    </p>

                </div>

                {/* Cards */}

                <div className="grid gap-8 lg:grid-cols-3">

                    {testimonials.map((user) => (

                        <div
                            key={user.id}
                            className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                        >

                            {/* Stars */}

                            <div className="mb-6 flex">

                                {[...Array(5)].map((_, index) => (

                                    <Star
                                        key={index}
                                        size={18}
                                        className="fill-yellow-400 text-yellow-400"
                                    />

                                ))}

                            </div>

                            {/* Review */}

                            <p className="leading-8 text-gray-600">
                                "{user.review}"
                            </p>

                            {/* User */}

                            <div className="mt-8 flex items-center gap-4">

                                <img
                                    src={user.image}
                                    alt={user.name}
                                    className="h-14 w-14 rounded-full object-cover"
                                />

                                <div>

                                    <h4 className="font-bold text-gray-900">
                                        {user.name}
                                    </h4>

                                    <p className="text-sm text-gray-500">
                                        {user.role}
                                    </p>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}

export default Testimonials;