import { supabase } from "@/services/SupabaseClientService";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();

  useEffect(() => {
    fetchSongsAndArtists();
  }, []);

  const fetchSongsAndArtists = async () => {
    const [
      { data: songData, error: songError }, 
      { data: artistData, error: artistError }, 
      { data: albumData, error: albumError }
    ] = await Promise.all([
      supabase.from("Songs").select("*"),
      supabase.from("Artists").select("*"),
      supabase.from("Albums").select("*"),
    ]);

    if (songError || artistError || albumError) {
      console.error(songError || artistError || albumError);
      return;
    }

    setSongs(songData || []);
    setArtists(artistData || []);
    setAlbums(albumData || []);
  };

  const filteredResults = {
    songs: songs.filter(song => song.article.toLowerCase().includes(query.toLowerCase())),
    artists: artists.filter(artist => artist.artist_name.toLowerCase().includes(query.toLowerCase())),
    albums: albums.filter(album => album.album_article.toLowerCase().includes(query.toLowerCase())),
  };

  const searchCategories = ["all", "artists", "songs", "albums"];

  const renderResults = () => {
    const { songs, artists, albums } = filteredResults;

    if (location.pathname === '/search') {
      switch (selectedCategory) {
        case "artists":
          return artists.map(renderArtist);
        case "songs":
          return songs.map(renderSong);
        case "albums":
          return albums.map(renderAlbum);
        default:
          return (
            <>
              {artists.map(renderArtist)}
              {albums.map(renderAlbum)}
            </>
          );
      }
    } 
    
    else {
      return (
        <>
          {songs.map(renderSong)}
          {artists.map(renderArtist)}
        </>
      );
    }
  };

  const renderSong = (song: ISong) => (
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
  );

  const renderArtist = (artist: IArtist) => (
    <Link 
      to={`/artist/${artist.artist_id}`}
      key={artist.artist_id}
    >
      <li className="flex items-center gap-4 p-4 bg-white bg-opacity-30 backdrop-blur-lg text-white rounded-lg shadow-lg hover:bg-opacity-50 transition duration-200">
        <img src={artist.artist_avatar} className="w-10 h-10 object-cover rounded-full" alt={artist.artist_name} />
        <div className="flex flex-col flex-grow">
          <h3 className="text-lg font-semibold">{artist.artist_name}</h3>
        </div>
      </li>
    </Link>
  );
  
  const renderAlbum = (album: Album) => (
    <Link 
      to={`/album/${album.album_id}`}
      key={album.album_id}
    >
      <li className="flex items-center gap-4 p-4 bg-white bg-opacity-30 backdrop-blur-lg text-white rounded-lg shadow-lg hover:bg-opacity-50 transition duration-200">
        <img src={album.album_photo} className="w-10 h-10 object-cover" alt={album.album_article} />
        <div className="flex flex-col flex-grow">
          <h3 className="text-lg font-semibold">{album.album_article}</h3>
        </div>
      </li>
    </Link>
  );

  return (
    <div className="flex items-center p-6 absolute top-0 left-0 w-full z-50">
      <div className="w-full max-w-[650px] mx-auto">
        <div className="flex gap-4">
          <button onClick={() => navigate(-1)} className="p-3 bg-black bg-opacity-40 rounded-2xl transition duration-200">
            <IoArrowBackOutline size={26} style={{ color: "white" }}/>
          </button>
          <div className="relative w-full">
            <Link to="/search">
              <input
                type="text"
                className="p-4 pl-10 bg-black bg-opacity-40 text-white placeholder-gray-500 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-white w-full backdrop-blur-lg"
                placeholder="Search songs, albums or artist..."
                onChange={(e) => setQuery(e.target.value)}
              />
              <FaSearch 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-white" 
                size={20} 
              />
            </Link>
          </div>
          <button className="p-3 bg-black bg-opacity-40 rounded-2xl transition duration-200 hidden md:flex">
            <PiBellRingingFill size={25} style={{ color: "white" }}/>
          </button>
          <AvatarMenu/>
        </div>

        {location.pathname === '/search' && (
          <div className="flex mt-4 justify-center overflow-x-auto gap-2 pb-2">
            {searchCategories.map(category => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full ${selectedCategory === category ? "bg-white text-black" : "bg-black bg-opacity-40 text-white"}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <ul className="list-none mt-4 space-y-2 max-h-[400px] overflow-y-auto">
          {query && (filteredResults.songs.length > 0 || filteredResults.artists.length > 0) ? (
            renderResults()
          ) : (
            query && <li className="text-white text-center">No results found.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navigation;

