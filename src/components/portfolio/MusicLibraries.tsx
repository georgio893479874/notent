import HipHopIcon from "../../assets/hip-hop.png";
import SoulIcon from "../../assets/soul.png";
import KPopIcon from "../../assets/k-pop.png";
import SummerHitsIcon from "../../assets/summer-hits.png";

const libraries = [
  { title: 'Hip Hop', songs: 300, image: HipHopIcon },
  { title: 'Soul', songs: 245, image: SoulIcon },
  { title: 'K-Pop', songs: 260, image: KPopIcon },
  { title: 'Summer Hits', songs: 180, image: SummerHitsIcon }
];

const MusicLibraries = () => {
  return (
    <section className="bg-black text-white p-8 text-center">
      <h3 className="text-3xl font-bold mb-6">Explore Endless Music Libraries</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {libraries.map((library, index) => (
          <div key={index} className="bg-gray-900 p-4 rounded">
            <img src={library.image} alt={library.title} className="rounded mb-4"/>
            <h4 className="text-lg font-semibold">{library.title}</h4>
            <p className="text-sm">{library.songs} songs</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default MusicLibraries;
