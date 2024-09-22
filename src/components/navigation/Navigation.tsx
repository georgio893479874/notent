import { supabase } from "@/services/SupabaseClientService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { PiBellRingingFill } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";
import AvatarMenu from "./AvatarMenu";
import { ISong } from "@/interfaces/SongInterface";
import { Album } from "@/pages/Album";

interface IArtist {
  artist_id: string;
  artist_name: string;
  artist_avatar: string;
}

const Navigation = () => {
  const [songs, setSongs] = useState<ISong[]>([]);
  const [artists, setArtists] = useState<IArtist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchSongsAndArtists();
  }, []);

  const fetchSongsAndArtists = async () => {
    const { data: songData, error: songError } = await supabase.from("Songs").select("*");

    if (songError) throw songError;

    const { data: artistData, error: artistError } = await supabase.from("Artists").select("*");

    if (artistError) throw artistError;

    const { data: albumData, error: albumError } = await supabase.from("Albums").select("*");

    if (albumError) throw albumError;

    setSongs(songData || []);
    setArtists(artistData || []);
    setAlbums(albumData || []);
  };

  const handleSearch = () => {
    if (query) navigate("/search");
  };

  const filteredSongs = songs.filter((song) =>
    song.article.toLowerCase().includes(query.toLowerCase())
  );

  const filteredArtists = artists.filter((artist) =>
    artist.artist_name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredAlbums = albums.filter((album) =>
    album.album_article.toLowerCase().includes(query.toLowerCase())
  );

  const searchCategories = [
    { value: "all" },
    { value: "artists" },
    { value: "songs" },
    { value: "albums" },
  ];

  const getFilteredResults = () => {
    if (selectedCategory === "artists") {
      return filteredArtists.map((artist) => (
        <li
          key={artist.artist_id}
          className="flex items-center gap-4 p-4 bg-white bg-opacity-30 backdrop-blur-lg text-white rounded-lg shadow-lg hover:bg-opacity-50 transition duration-200"
        >
          <img src={artist.artist_avatar} className="w-10 h-10 object-cover rounded-full" alt={artist.artist_name} />
          <div className="flex flex-col flex-grow">
            <h3 className="text-lg font-semibold">{artist.artist_name}</h3>
          </div>
        </li>
      ));
    } 
    
    else if (selectedCategory === "songs") {
      return filteredSongs.map((song) => (
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
      ));
    } 

    else if (selectedCategory === "albums") {
      return filteredAlbums.map((album) => (
        <li
          key={album.album_id}
          className="flex items-center gap-4 p-4 bg-white bg-opacity-30 backdrop-blur-lg text-white rounded-lg shadow-lg hover:bg-opacity-50 transition duration-200"
        >
          <img src={album.album_photo} className="w-10 h-10 object-cover" alt={album.album_article} />
          <div className="flex flex-col flex-grow">
            <h3 className="text-lg font-semibold">{album.album_article}</h3>
          </div>
        </li>
      ));
    } 
    
    else {
      return (
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
      );
    }
  };

  return (
    <div className="flex items-center p-6 absolute top-0 left-0 w-full z-50">
      <div className="w-full max-w-[650px] mx-auto">
        <div className="flex gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-black bg-opacity-40 rounded-2xl transition duration-200"
          >
            <IoArrowBackOutline size={26} style={{ color: "white" }} />
          </button>
          <div className="relative w-full">
            <input
              type="text"
              className="p-4 pl-10 bg-black bg-opacity-40 text-white placeholder-gray-500 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-white w-full backdrop-blur-lg"
              placeholder="Search songs, albums or artist..."
              onChange={(e) => setQuery(e.target.value)}
              onClick={() => handleSearch()}
            />
            <FaSearch
              onClick={handleSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-white"
              size={20}
            />
          </div>
          <button className="p-3 bg-black bg-opacity-40 rounded-2xl transition duration-200 hidden md:flex">
            <PiBellRingingFill size={25} style={{ color: "white" }} />
          </button>
          <AvatarMenu />
        </div>
        <div className="flex mt-4 justify-center overflow-x-auto gap-2 pb-2">
          {searchCategories.map((category) => (
            <button
              key={category.value}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category.value ? "bg-white text-black" : "bg-black bg-opacity-40 text-white"
              }`}
              onClick={() => setSelectedCategory(category.value)}
            >
              {category.value}
            </button>
          ))}
        </div>
        <ul className="list-none mt-4 space-y-2 max-h-[400px] overflow-y-auto">
          {query && (filteredSongs.length > 0 || filteredArtists.length > 0) ? (
            getFilteredResults()
          ) : (
            query && <li className="text-white text-center">No results found.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
