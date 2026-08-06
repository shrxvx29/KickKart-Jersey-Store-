import React from "react";
import { MapPin, Phone, Mail, ArrowUp } from "lucide-react";

import {
    FaFacebookF,
    FaInstagram,
    FaXTwitter,
    FaYoutube,
} from "react-icons/fa6";

function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer className="bg-gray-950 text-white">

            {/* Top */}

            <div className="mx-auto max-w-7xl px-6 py-20">

                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

                    {/* Logo */}

                    <div>

                        <h2 className="text-3xl font-black tracking-wide">
                            Kick<span className="text-blue-500">Kart</span>
                        </h2>

                        <p className="mt-5 leading-7 text-gray-400">
                            Premium football jerseys from the world's biggest clubs.
                            Shop authentic kits with secure payments and fast
                            delivery across India.
                        </p>

                        <div className="mt-8 flex gap-4">

                            <a
                                href="#"
                                className="rounded-full bg-gray-800 p-3 transition hover:bg-blue-600"
                            >
                                <FaFacebookF size={20} />
                            </a>

                            <a
                                href="#"
                                className="rounded-full bg-gray-800 p-3 transition hover:bg-pink-600"
                            >
                                <FaInstagram size={20} />
                            </a>

                            <a
                                href="#"
                                className="rounded-full bg-gray-800 p-3 transition hover:bg-sky-500"
                            >
                                <FaXTwitter size={20} />
                            </a>

                            <a
                                href="#"
                                className="rounded-full bg-gray-800 p-3 transition hover:bg-red-600"
                            >
                                <FaYoutube size={20} />
                            </a>

                        </div>

                    </div>

                    {/* Quick Links */}

                    <div>

                        <h3 className="mb-6 text-xl font-semibold">
                            Quick Links
                        </h3>

                        <ul className="space-y-4 text-gray-400">

                            <li><a href="#" className="hover:text-white">Home</a></li>
                            <li><a href="#" className="hover:text-white">Shop</a></li>
                            <li><a href="#" className="hover:text-white">Collections</a></li>
                            <li><a href="#" className="hover:text-white">Orders</a></li>

                        </ul>

                    </div>

                    {/* Shop */}

                    <div>

                        <h3 className="mb-6 text-xl font-semibold">
                            Categories
                        </h3>

                        <ul className="space-y-4 text-gray-400">

                            <li><a href="#" className="hover:text-white">Club Jerseys</a></li>
                            <li><a href="#" className="hover:text-white">National Teams</a></li>
                            <li><a href="#" className="hover:text-white">New Arrivals</a></li>
                            <li><a href="#" className="hover:text-white">Best Sellers</a></li>

                        </ul>

                    </div>

                    {/* Contact */}

                    <div>

                        <h3 className="mb-6 text-xl font-semibold">
                            Contact
                        </h3>

                        <div className="space-y-5 text-gray-400">

                            <div className="flex gap-3">

                                <MapPin className="mt-1 text-blue-500" size={18} />

                                <span>
                                    Chennai, Tamil Nadu, India
                                </span>

                            </div>

                            <div className="flex gap-3">

                                <Phone className="text-blue-500" size={18} />

                                <span>+91 98765 43210</span>

                            </div>

                            <div className="flex gap-3">

                                <Mail className="text-blue-500" size={18} />

                                <span>support@kickkart.com</span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* Bottom */}

            <div className="border-t border-gray-800">

                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-6 md:flex-row">

                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} KickKart. All rights reserved.
                    </p>

                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-medium transition hover:bg-blue-700"
                    >
                        Back to Top
                        <ArrowUp size={16} />
                    </button>

                </div>

            </div>

        </footer>
    );
}

export default Footer;