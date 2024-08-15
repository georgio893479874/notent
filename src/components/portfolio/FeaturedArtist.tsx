import TaylorSwiftPhoto from "@assets/taylor-swift-transparent.png";
import NineHundredEightyNineIcon from "@assets/1989.jpg";
import ReputationIcon from "@assets/reputation.jpg";
import LoverIcon from "@assets/lover.jpg";
import RedIcon from "@assets/red.jpg";
import MidnightIcon from "@assets/midnight.jpg";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

const tracks = [
    { title: 'Anti-Hero', duration: '03:21', imgSrc: MidnightIcon },
    { title: 'Blank Space', duration: '04:22', imgSrc: NineHundredEightyNineIcon },
    { title: 'Gorgeous', duration: '03:56', imgSrc: ReputationIcon },
    { title: 'Lover', duration: '04:01', imgSrc: LoverIcon },
    { title: 'Red', duration: '03:45', imgSrc: RedIcon },
    { title: 'Midnight', duration: '04:12', imgSrc: MidnightIcon },
];

const FeaturedArtist = () => {
  return (
    <section className="bg-gray-950 text-white p-6 md:p-8 lg:p-12 text-center">
        <h3 className="text-3xl md:text-4xl font-bold mb-4">Taylor Alison Swift</h3>
        <p className="text-base md:text-lg mb-6 mx-auto max-w-3xl">
          Taylor Alison Swift is an American singer-songwriter known for her narrative songwriting, which often centers around her personal experiences and relationships.
        </p>
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-6 md:gap-8">
            <div className="flex-shrink-0">
                <img 
                    src={TaylorSwiftPhoto}
                    alt="Taylor Swift"
                    className="rounded-full w-full h-full mx-auto object-cover shadow-lg border-2 border-gray-800"
                />
            </div>
            <div className="flex-1 mt-6 md:mt-0">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xl md:text-2xl font-semibold">Latest Songs</h4>
                    <a href="#" className="text-pink-500 hover:underline">View All</a>
                </div>
                <ul className="list-none p-0 space-y-3">
                    {tracks.map((track, index) => (
                    <li key={index} className="flex items-center justify-between py-2 px-3 bg-gray-800 rounded-lg shadow-md gap-16">
                        <div className="flex items-center">
                            <img
                                src={track.imgSrc}
                                alt={track.title}
                                className="w-8 h-8 md:w-10 md:h-10 rounded-lg mr-3 border-2 border-gray-700"
                            />
                            <div>
                                <span className="block text-sm md:text-base font-medium">{track.title}</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-400 text-sm">{track.duration}</span>
                            <Link to="/register">
                                <button className="text-pink-500 hover:text-pink-400">
                                    <FaPlay size={18}/>
                                </button>
                            </Link>
                        </div>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    </section>
  )
}

export default FeaturedArtist;
