import TaylorSwiftPhoto from "../../assets/taylor-swift-transparent.png";
import BlankSpaceIcon from "../../assets/blank-space.png";
import GorgeousIcon from "../../assets/gorgeous.png";
import LoverIcon from "../../assets/lover.png";
import RedIcon from "../../assets/red.png";
import MidnightIcon from "../../assets/midnight.png";

const tracks = [
    { title: 'Anti-Hero', duration: '03:21', imgSrc: MidnightIcon },
    { title: 'Blank Space', duration: '04:22', imgSrc: BlankSpaceIcon },
    { title: 'Gorgeous', duration: '03:56', imgSrc: GorgeousIcon },
    { title: 'Lover', duration: '04:01', imgSrc: LoverIcon },
    { title: 'Red', duration: '03:45', imgSrc: RedIcon },
    { title: 'Midnight', duration: '04:12', imgSrc: MidnightIcon },
];

const FeaturedArtist = () => {
  return (
    <section className="bg-black text-white p-8 text-center">
        <h3 className="text-3xl font-bold mb-4">Taylor Alison Swift</h3>
        <p className="mb-6">Taylor Alison Swift is an American singer-songwriter, known for her narrative songwriting, which often centers around her personal life.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <div>
                <img 
                    src={TaylorSwiftPhoto}
                    className="rounded mx-auto mb-auto object-contain"
                />
            </div>
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h4 className="text-2xl font-semibold">Latest Songs</h4>
                    <a href="#" className="text-pink-500">View All</a>
                </div>
                <ul>
                    {tracks.map((track, index) => (
                    <li key={index} className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <img
                                src={track.imgSrc}
                                alt={track.title}
                                className="w-12 h-12 rounded mr-4"
                            />
                            <div>
                                <span className="block">{track.title}</span>
                            </div>
                        </div>
                        <span>{track.duration}</span>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    </section>
  )
}

export default FeaturedArtist;
