import { useNavigate } from "react-router-dom";
import LeagueLogo from "../assets/LeagueLogo.png";
import NationalLogo from "../assets/NationalLogo.png";

const Collections = () => {

    const navigate = useNavigate();

    const openCollection = (category) => {
        navigate(`/shop?category=${category}`);
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-20">

            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold">
                    Collections
                </h1>

                <p className="text-gray-500 mt-4">
                    Explore your favourite football jerseys.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

                {/* Club */}

                <div
                    className="relative h-[450px] rounded-3xl overflow-hidden cursor-pointer group"
                    onClick={() => openCollection("CLUB")}
                >
                    <img
                        src={LeagueLogo}
                        alt="Club Jerseys"
                        className="w-full h-full object-contain group-hover:scale-105 transition duration-500"
                    />

                    <div className="absolute inset-0 bg-black/45 flex flex-col justify-end p-8">

                        <h2 className="text-4xl font-bold text-white">
                            Club Jerseys
                        </h2>

                        <p className="text-white/80 mt-2">
                            Premier League, La Liga, Serie A and more.
                        </p>

                        <button className="mt-6 w-fit px-6 py-3 rounded-xl bg-white text-black font-semibold">
                            Explore
                        </button>

                    </div>

                </div>

                {/* National */}

                <div
                    className="relative h-[450px] rounded-3xl overflow-hidden cursor-pointer group"
                    onClick={() => openCollection("NATIONAL")}
                >
                    <img
                        src={NationalLogo}
                        alt="National Jerseys"
                        className="w-full h-full object-contain group-hover:scale-105 transition duration-500"
                    />

                    <div className="absolute inset-0 bg-black/45 flex flex-col justify-end p-8">

                        <h2 className="text-4xl font-bold text-white">
                            National Teams
                        </h2>

                        <p className="text-white/80 mt-2">
                            World Cup and international football jerseys.
                        </p>

                        <button className="mt-6 w-fit px-6 py-3 rounded-xl bg-white text-black font-semibold">
                            Explore
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Collections;