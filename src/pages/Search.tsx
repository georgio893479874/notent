import { useState, useEffect } from "react";
import { supabase } from "@/services/SupabaseClientService";

const Search = () => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    const { data: genreData, error: genreError } = await supabase.from("Genres").select("*");
    if (genreError) throw genreError;
    setGenres(genreData || []);
  };

  const handleSearch = async () => {
    const { data: songData } = await supabase.from("Songs").select("*").ilike("article", `%${query}%`);
    const { data: artistData } = await supabase.from("Artists").select("*").ilike("artist_name", `%${query}%`);
    const { data: albumData } = await supabase.from("Albums").select("*").ilike("album_article", `%${query}%`);

    setSongs(songData || []);
    setArtists(artistData || []);
    setAlbums(albumData || []);
  };

  const searchCategories = [
    { value: "all" },
    { value: "artists" },
    { value: "songs" },
    { value: "albums" },
  ];

  const getFilteredResults = () => {
    if (selectedCategory === "artists") {
      return artists.map((artist) => (
        <li key={artist.artist_id}>
          <img src={artist.artist_avatar} alt={artist.artist_name} />
          <h3>{artist.artist_name}</h3>
        </li>
      ));
    }
    if (selectedCategory === "songs") {
      return songs.map((song) => (
        <li key={song.id}>
          <img src={song.image_link} alt={song.article} />
          <h3>{song.article}</h3>
        </li>
      ));
    }
    if (selectedCategory === "albums") {
      return albums.map((album) => (
        <li key={album.album_id}>
          <img src={album.album_photo} alt={album.album_article} />
          <h3>{album.album_article}</h3>
        </li>
      ));
    }
    return (
      <>
        {songs.map((song) => (
          <li key={song.id}>
            <img src={song.image_link} alt={song.article} />
            <h3>{song.article}</h3>
          </li>
        ))}
        {artists.map((artist) => (
          <li key={artist.artist_id}>
            <img src={artist.artist_avatar} alt={artist.artist_name} />
            <h3>{artist.artist_name}</h3>
          </li>
        ))}
        {albums.map((album) => (
          <li key={album.album_id}>
            <img src={album.album_photo} alt={album.album_article} />
            <h3>{album.album_article}</h3>
          </li>
        ))}
      </>
    );
  };

  return (
    <div className="search-page">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for songs, artists, or albums..."
        onKeyUp={handleSearch}
      />
      <div className="categories">
        {searchCategories.map((category) => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
          >
            {category.value}
          </button>
        ))}
      </div>
      <div className="genres">
        {genres.map((genre) => (
          <button key={genre.id}>{genre.genre_name}</button>
        ))}
      </div>
      <ul>{query && getFilteredResults()}</ul>
    </div>
  );
};

export default Search;