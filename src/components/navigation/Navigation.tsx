import { supabase } from "@/services/SupabaseClientService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { PiBellRingingFill } from "react-icons/pi";
import AvatarMenu from "./AvatarMenu";
import { ISong } from "@/interfaces/SongInterface";

interface IArtist {
  artist_id: string;
  artist_name: string;
  artist_avatar: string;
}

const Navigation = () => {
  const [songs, setSongs] = useState<ISong[]>([]);
  const [artists, setArtists] = useState<IArtist[]>([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchSongsAndArtists();
  }, []);

  const fetchSongsAndArtists = async () => {
    const { data: songData, error: songError } = await supabase.from("Songs").select("*");

    if (songError) {
      throw songError;
    }

    const { data: artistData, error: artistError } = await supabase.from("Artists").select("*");

    if (artistError) {
      throw artistError;
    }

    setSongs(songData || []);
    setArtists(artistData || []);
  };

  const filteredSongs = songs.filter((song) =>
    song.article.toLowerCase().includes(query.toLowerCase())
  );

  const filteredArtists = artists.filter((artist) =>
    artist.artist_name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex items-center p-6 absolute top-0 left-0 w-full z-50">
      <div className="w-full max-w-[550px] mx-auto">
        <div className="flex gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-black bg-opacity-40 rounded-2xl transition duration-200"
          >
            <IoArrowBackOutline size={26} style={{ color: "white" }} />
          </button>
          <input
            type="text"
            className="p-4 pl-10 bg-black bg-opacity-40 text-white placeholder-gray-500 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-white w-full backdrop-blur-lg"
            placeholder="Search songs, albums or artist..."
            onChange={(e) => setQuery(e.target.value)}
            style={{
              backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M8 16a8 8 0 110-16 8 8 0 010 16zM21 21l-4.35-4.35' /%3E%3C/svg%3E')`,
              backgroundPosition: '10px center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <button className="p-3 bg-black bg-opacity-40 rounded-2xl transition duration-200 hidden md:flex">
            <PiBellRingingFill size={25} style={{ color: "white" }} />
          </button>
          <AvatarMenu/>
        </div>
        <ul className="list-none mt-4 space-y-2 max-h-[400px] overflow-y-auto">
          {query && (filteredSongs.length > 0 || filteredArtists.length > 0) ? (
            <>
              {filteredSongs.map((song) => (
                <li
                  key={song.id}
                  className="flex items-center gap-4 p-4 bg-white bg-opacity-30 backdrop-blur-lg text-white rounded-lg shadow-lg hover:bg-opacity-50 transition duration-200"
                >
                  <img src={song.image_link} className="w-10 h-10 object-cover" alt={song.article} />
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold">{song.article}</h3>
                    <p className="text-sm">{song.author}</p>
                  </div>
                </li>
              ))}
              {filteredArtists.map((artist) => (
                <li
                  key={artist.artist_id}
                  className="flex items-center gap-4 p-4 bg-white bg-opacity-30 backdrop-blur-lg text-white rounded-lg shadow-lg hover:bg-opacity-50 transition duration-200"
                >
                  <img src={artist.artist_avatar} className="w-10 h-10 object-cover rounded-full" alt={artist.artist_name} />
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold">{artist.artist_name}</h3>
                  </div>
                </li>
              ))}
            </>
          ) : (
            query && <li className="text-white text-center">No results found.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
