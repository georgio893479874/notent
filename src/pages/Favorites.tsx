import { useEffect, useState } from 'react';
import { supabase } from '@/services/SupabaseClientService';
import { usePlayer } from '@/context/PlayerContext';
import { ISong } from '@/interfaces/SongInterface';

const Favorites: React.FC = () => {
  const [favoriteSongs, setFavoriteSongs] = useState<ISong[]>([]);
  const { setSelectedSong } = usePlayer();

  useEffect(() => {
    const fetchFavoriteSongs = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
        return;
      }

      const userId = userData?.user?.id;

      if (userId) {
        const { data: favoriteSongIds, error: favoriteError } = await supabase.from('FavoriteSongs').select('song_id').eq('user_id', userId);

        if (favoriteError) {
          throw favoriteError;
          return;
        }

        if (favoriteSongIds && favoriteSongIds.length > 0) {
          const songIds = favoriteSongIds.map(favorite => favorite.song_id);

          const { data: songsData, error: songsError } = await supabase.from('Songs').select('*').in('id', songIds);

          if (songsError) {
            throw songsError;
            return;
          }
          
          const songsWithDuration = await Promise.all(
            (songsData || []).map(async (song: ISong) => {
              const audio = new Audio(song.audio_link);

              await new Promise<void>((resolve) => {
                audio.addEventListener('loadedmetadata', () => {
                  resolve();
                });
              });
              return { ...song, duration: audio.duration };
            })
          );
    
          if (songsWithDuration) {
            setFavoriteSongs(songsWithDuration);
          }
        }
      }
    }

    fetchFavoriteSongs();
  }, []);

  const formatSongDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.round(duration % 60);

    return `${minutes}:${seconds}`;
  };
  
  if (favoriteSongs.length === 0) {
    return (
      <div className="bg-[#323131] text-white flex flex-col items-center py-32 h-screen overflow-y-auto px-4">
        <h2 className="text-2xl">You haven't added any favorites yet.</h2>
      </div>
    );
  }

  return (
    <div className="bg-[#323131] text-white flex flex-col items-center py-32 h-screen overflow-y-auto px-4">
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl mb-6">Your Favorite Songs</h2>
        <ul className="space-y-2">
          {favoriteSongs.map((song, key) => (
            <li
              key={song.id}
              className="flex flex-row justify-between items-center bg-[#2c2b2b] p-3 sm:p-4 rounded-lg cursor-pointer"
              onClick={() => setSelectedSong(song)}
            >
              <div className="flex items-center space-x-2 sm:space-x-4">
                <span className="text-gray-400 text-sm sm:text-base">{key + 1}</span>
                <img src={song.image_link} className='w-[40px] h-[40px]'/>
                <h3 className="text-base sm:text-lg">{song.article}</h3>
              </div>
              <span className="text-gray-400 text-sm sm:text-base">
                {formatSongDuration(song.duration)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Favorites;
