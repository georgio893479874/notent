import { Link } from "react-router-dom";
import ChillVibesIcon from "@assets/chill-vibes-icon.jpg";
import TopHitsIcon from "@assets/top-hits-icon.jpg";
import PartyAnthemsIcon from "@assets/party-anthems-icon.jpg";
import WorkoutBoostIcon from "@assets/workout-boost-icon.jpg";

const playlists = [
    {
        title: "Chill Vibes",
        description: "Relax and unwind with this smooth collection of beats.",
        imageUrl: ChillVibesIcon,
        link: "/register"
    },
    {
        title: "Top Hits",
        description: "The biggest songs of the moment, all in one place.",
        imageUrl: TopHitsIcon,
        link: "/register"
    },
    {
        title: "Party Anthems",
        description: "Get the party started with these high-energy tracks.",
        imageUrl: PartyAnthemsIcon,
        link: "/register"
    },
    {
        title: "Workout Boost",
        description: "Pump up your workout with these motivating tracks.",
        imageUrl: WorkoutBoostIcon,
        link: "/register"
    },
];

const FeaturedPlaylists = () => {
    return (
        <section className="bg-gray-950 py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-white mb-6">Curated Playlists For You</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {playlists.map((playlist, index) => (
                        <div key={index} className="relative rounded-lg overflow-hidden shadow-lg">
                            <img src={playlist.imageUrl} alt={`${playlist.title} Playlist`} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <div className="text-center">
                                    <h3 className="text-2xl font-semibold text-white">{playlist.title}</h3>
                                    <p className="text-gray-400 mt-2">{playlist.description}</p>
                                    <Link to={playlist.link}>
                                        <button className="mt-4 bg-pink-600 text-white py-2 px-6 rounded-full hover:bg-pink-700 transition">
                                            Listen Now
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedPlaylists;