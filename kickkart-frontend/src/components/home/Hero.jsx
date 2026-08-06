import React from "react";
import {
    ArrowRight,
    ShieldCheck,
    Truck,
    Star,
} from "lucide-react";

import heroImg from "../../assets/stadium-hero.jpg";
import { Link } from "react-router-dom";

function Hero() {
    return (
        <section
            className="relative -mt-16 h-screen overflow-hidden bg-fit bg-center"
            style={{
                backgroundImage: `url(${heroImg})`,
            }}
        >
            {/* Dark Overlay */}
            {/* <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" /> */}

            {/* Glow Effects */}
            <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-blue-600/20 blur-[150px]" />
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/15 blur-[180px]" />

            {/* Hero Content */}
            <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 pt-24 lg:px-10 lg:pt-20">

                <div className="max-w-3xl">

                    {/* Badge */}

                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 backdrop-blur-md">

                        <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>

                        <span className="text-sm font-medium text-blue-300">
                            New Season Collection 2026
                        </span>

                    </div>

                    {/* Heading */}

                    <h1 className="text-5xl font-black uppercase leading-tight text-white md:text-6xl lg:text-7xl">

                        Elevate Your

                        <span className="block text-blue-500">
                            Game Day Style
                        </span>

                    </h1>

                    {/* Description */}

                    <p className="mt-8 max-w-2xl text-base leading-8 text-gray-300 md:text-lg">

                        Shop authentic football jerseys from the world's
                        biggest clubs and national teams. Premium quality,
                        secure payments and lightning-fast delivery across
                        India.

                    </p>

                    {/* Buttons */}

                    <div className="mt-10 flex flex-wrap gap-4">
                        <Link to="/shop">
                        <button className="group flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700">

                            Shop Now

                            <ArrowRight
                                size={18}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />

                        </button>
                        
                        </Link>

                       <Link to="/collections"> 

                        <button className="rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20">

                            Explore Collection

                        </button>
                        </Link>

                    </div>

                    {/* Features */}

                    <div className="mt-12 flex flex-wrap gap-8">

                        <div className="flex items-center gap-2 text-gray-300">

                            <Star
                                size={18}
                                className="fill-yellow-400 text-yellow-400"
                            />

                            <span className="text-sm">
                                4.9 Customer Rating
                            </span>

                        </div>

                        <div className="flex items-center gap-2 text-gray-300">

                            <Truck
                                size={18}
                                className="text-blue-400"
                            />

                            <span className="text-sm">
                                Free Shipping
                            </span>

                        </div>

                        <div className="flex items-center gap-2 text-gray-300">

                            <ShieldCheck
                                size={18}
                                className="text-green-400"
                            />

                            <span className="text-sm">
                                Secure Checkout
                            </span>

                        </div>

                    </div>

                </div>

            </div>

            {/* Bottom Fade */}

            <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-[#0B0B0B] to-transparent" />

        </section>
    );
}

export default Hero;