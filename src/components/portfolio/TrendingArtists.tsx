import JustinBieberPhoto from '@assets/justin-bieber.png';
import TaylorSwiftPhoto from '@assets/taylor-swift.png';
import LisaPhoto from '@assets/lisa.png';
import EdSheeranPhoto from '@assets/ed-sheeran.png';
import RihannaPhoto from '@assets/rihanna.png';

const artists = [
  { name: 'Justin Bieber', image: JustinBieberPhoto, genre: 'Pop', topSong: 'Sorry' },
  { name: 'Taylor Swift', image: TaylorSwiftPhoto, genre: 'Country/Pop', topSong: 'Love Story' },
  { name: 'Lisa', image: LisaPhoto, genre: 'K-Pop', topSong: 'LALISA' },
  { name: 'Ed Sheeran', image: EdSheeranPhoto, genre: 'Pop', topSong: 'Shape of You' },
  { name: 'Rihanna', image: RihannaPhoto, genre: 'Pop/R&B', topSong: 'Umbrella' }
];

export default function TrendingArtists() {
  return (
    <section className="bg-gray-950 text-white p-8 text-center">
      <h3 className="text-3xl font-bold mb-6">Trending Artists</h3>
      <div className="flex flex-wrap justify-center gap-8">
        {artists.map((artist, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 text-center">
            <img 
              src={artist.image} 
              alt={artist.name} 
              className="rounded-full mb-4 w-32 h-32 mx-auto object-cover shadow-lg" 
            />
            <h4 className="text-lg font-semibold">{artist.name}</h4>
            <p className="text-gray-300 text-sm">{artist.genre}</p>
            <p className="text-gray-400 text-sm">Top Song: {artist.topSong}</p>
          </div>
        ))}
      </div>
      <button className="mt-6 bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition">
        See All Artists
      </button>
    </section>
  );
}
