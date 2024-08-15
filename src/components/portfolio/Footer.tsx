import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-950 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                    <div className="md:col-span-2 lg:col-span-1">
                        <h4 className="text-2xl font-semibold mb-4">Notent</h4>
                        <p className="text-gray-400 mb-4 hidden md:flex">
                            Say goodbye to interruptions and enjoy uninterrupted music streaming.
                        </p>
                        <Link to="/register"><button className="bg-pink-600 text-white p-2 px-6 rounded-full hover:bg-pink-700 transition">Sign Up</button></Link>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Get Started</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#download" className="hover:underline">Download</a></li>
                            <li><a href="#new-users" className="hover:underline">New Users</a></li>
                            <li><a href="#upgrade" className="hover:underline">Upgrade</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Account</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#sign-in" className="hover:underline">Sign In</a></li>
                            <li><a href="#preferences" className="hover:underline">Preferences</a></li>
                            <li><a href="#support" className="hover:underline">Support</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Price</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#features" className="hover:underline">Features</a></li>
                            <li><a href="#plans" className="hover:underline">Plans</a></li>
                            <li><a href="#pricing" className="hover:underline">Pricing</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Explore</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#music" className="hover:underline">Music</a></li>
                            <li><a href="#artists" className="hover:underline">Artists</a></li>
                            <li><a href="#albums" className="hover:underline">Albums</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 pt-6 text-gray-600 text-sm flex flex-col md:flex-row justify-between items-center">
                    <p>&copy; 2024 Notent. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="#terms" className="hover:underline">Terms & Conditions</a>
                        <a href="#privacy" className="hover:underline">Privacy Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

  