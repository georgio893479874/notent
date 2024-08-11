import { ISong } from "@/services/ControlsService";
import { supabase } from "@/services/SupabaseClientService";
import Sidebar from "@/components/sidebar/Sidebar";
import { useEffect, useState } from "react";

const Search = () => {
  const [songs, setSongs] = useState<ISong[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id || "";

    const { data, error } = await supabase.from("Songs").select("*").eq("user_id", userId);

    if (error) {
      throw error;
    }

    setSongs(data || []);
  };

  const filteredSongs = songs.filter((song) => {
    song.article.toLowerCase().includes(query.toLowerCase()) || 
    song.author.toLowerCase().includes(query.toLowerCase())
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-grow p-6 min-h-screen items-center justify-start">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white text-center">Search Songs</h1>
          <input 
            type="text" 
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 w-full" 
            placeholder="Search by title or author..." 
            onChange={(e) => setQuery(e.target.value)}
          />
          <ul className="list-none">
            {query && filteredSongs.length > 0 ? (
              filteredSongs.map((song) => (
                <li key={song.id} className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 shadow rounded-lg mb-2 hover:shadow-lg transition-shadow duration-200">
                  <img src={song.image_link} className="w-16 h-16 object-cover rounded-lg" alt={song.article} />
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{song.article}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{song.author}</p>
                  </div>
                </li>
              ))
            ) : (
              query ? (
                <li className="text-gray-500 text-center dark:text-gray-300">No songs found.</li>
              ) : null
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Search;





