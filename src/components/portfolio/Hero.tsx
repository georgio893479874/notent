import { Link } from "react-router-dom";
import HeroIcon from "@/assets/hero-icon.jpg"

const Hero = () => {
    return (
        <section className="relative bg-gray-950 min-h-screen flex items-center justify-center text-white">
            <img 
                src={HeroIcon}
                className="absolute inset-0 w-full h-full object-cover opacity-20" 
            />
            <div className="relative z-10 text-center p-8">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6">Music Without Limits</h1>
                <p className="text-lg md:text-xl lg:text-2xl mb-6">
                    Discover and share your music journey with Notent. 
                    Unleash your passion and connect with a community of music lovers.
                </p>
                <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                    <Link to="/signin"><button className="bg-pink-600 hover:bg-pink-700 transition py-3 px-8 rounded-full text-lg font-semibold">Get Started</button></Link>
                </div>
                <div className="mt-12">
                    <p className="text-sm text-gray-400">
                        Available on all platforms. Join now and start your musical adventure.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Hero;

