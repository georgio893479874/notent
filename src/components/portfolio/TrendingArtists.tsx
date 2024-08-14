import JustinBieberPhoto from '../../assets/justin-bieber.png';
import TaylorSwiftPhoto from '../../assets/taylor-swift.png';
import LisaPhoto from '../../assets/lisa.png';
import EdSheeranPhoto from '../../assets/ed-sheeran.png';
import RihannaPhoto from '../../assets/rihanna.png';

const artists = [
  { name: 'Justin Bieber', image: JustinBieberPhoto },
  { name: 'Taylor Swift', image: TaylorSwiftPhoto },
  { name: 'Lisa', image: LisaPhoto },
  { name: 'Ed Sheeran', image: EdSheeranPhoto },
  { name: 'Rihanna', image: RihannaPhoto }
];

export default function TrendingArtists() {
  return (
    <section className="bg-gradient-to-r from-purple-800 to-black text-white p-8 text-center">
      <h3 className="text-3xl font-bold mb-6">Trending Artists</h3>
      <div className="flex justify-around">
        {artists.map((artist, index) => (
          <div key={index} className="text-center">
            <img src={artist.image} alt={artist.name} className="rounded-full mb-4" />
            <h4 className="text-lg font-semibold">{artist.name}</h4>
          </div>
        ))}
      </div>
      <button className="mt-4 bg-pink-500 text-white px-6 py-3 rounded">See All Artists</button>
    </section>
  );
}

