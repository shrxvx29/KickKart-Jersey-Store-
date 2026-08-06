import React from "react";
import { ArrowRight } from "lucide-react";
import collections from "../../utils/CollectionData";

function FeaturedCollections() {
    return (
        <section className="bg-white py-24">
            <div className="mx-auto max-w-7xl px-6">

                {/* Heading */}

                <div className="mb-16 text-center">

                    <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
                        Collections
                    </span>

                    <h2 className="mt-5 text-4xl font-bold text-gray-900 md:text-5xl">
                        Featured Collections
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
                        Discover premium football jerseys from the world's
                        biggest clubs. Authentic designs, premium quality,
                        and unbeatable style.
                    </p>

                </div>

                {/* Cards */}

                <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">

                    {collections.map((item) => (

                        <div
                            key={item.id}
                            className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
                        >

                            {/* Image */}

                            <div className="relative h-80 overflow-hidden">

                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                {/* Badge */}

                                <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-1 text-xs font-semibold uppercase tracking-wider text-black shadow-lg">
                                    Featured
                                </span>

                            </div>

                            {/* Content */}

                            <div className="p-6">

                                <h3 className="text-2xl font-bold text-gray-900">
                                    {item.title}
                                </h3>

                                <p className="mt-2 text-gray-600">
                                    Jerseys Available
                                </p>

                                <button className="mt-6 flex items-center gap-2 font-semibold text-blue-600 transition-all duration-300 hover:gap-3">

                                    Explore

                                    <ArrowRight
                                        size={18}
                                        className="transition-transform duration-300"
                                    />

                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>
        </section>
    );
}

export default FeaturedCollections;