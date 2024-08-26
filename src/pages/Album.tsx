import React, { useEffect, useState } from "react";
import Player from '@/components/player/Player';
import Sidebar from '@/components/sidebar/Sidebar';
import { supabase } from '@/services/SupabaseClientService';
import { Link, useParams } from 'react-router-dom';
import { ISong } from "@/services/ControlsService";
export interface Album {
  album_id: string;
  album_article: string;
  album_author_id: string;
  album_photo: string;
  public_date: string;
}

interface Song {
  id: string;
  article: string;
  artist: string;
  album_id: string;
  duration: number;
}

interface Author {
  artist_name: string;
  artist_id: string;
  artist_avatar: string;
}

const Album: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const [album, setAlbum] = useState<Album | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [author, setAuthor] = useState<Author | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [selectedSong, setSelectedSong] = useState<ISong | undefined>(undefined);

  useEffect(() => {
    const fetchAlbum = async () => {
      const { data: albumData, error: albumError } = await supabase.from('Albums').select('*').eq('album_id', albumId).single();

      if (albumError) {
        throw albumError;
      } 

      setAlbum(albumData);
    };

    const fetchSongs = async () => {
      const { data: songsData, error: songsError } = await supabase.from('Songs').select('*').eq('album_id', albumId);

      if (songsError) {
        throw songsError;
      } 

      setSongs(songsData || []);
    };

    const fetchAuthor = async () => {
      if (album?.album_author_id) {
        const { data: authorData, error: authorError } = await supabase.from('Artists').select('*').eq('artist_id', album.album_author_id);

        if (authorError) {
          throw authorError;
        } 

        setAuthor(authorData?.[0] || null);
      }
    };

    const checkFavorite = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError) {
          throw userError;
      } 
      
      const id = userData?.user?.id;

      setUserId(id);

      const { data, error } = await supabase.from('FavoriteAlbums').select('*').eq('album_id', albumId).eq('user_id', userId);

      if (data && data.length > 0) {
        setIsFavorite(true);
      }

      if (error) {
        throw error;
      }
    };

    fetchAlbum();
    fetchSongs();
    fetchAuthor();
    checkFavorite();
  }, [albumId, album?.album_author_id, userId]);

  const addToFavorites = async () => {
    const { data, error } = await supabase.from('FavoriteAlbums').insert([
      { 
        album_id: albumId, 
        user_id: userId,
      }
    ]);

    if (error) {
      throw error;
    } 

    else if (data) {
      setIsFavorite(false);
    }
  }

  const removeFromFavorites = async () => {
    const { data, error } = await supabase.from('FavoriteAlbums').delete().eq('album_id', albumId).eq('user_id', userId);

    if (error) {
      throw error;
    } 

    else if (data) {
      setIsFavorite(false);
    }
  }

  const toggleFavorite = async () => {
    if (isFavorite) {
      await removeFromFavorites();
    } 
    
    else {
      await addToFavorites();
    }
  }

  const totalSongs = songs.length;
  const totalDurationInSeconds = songs.reduce((total, song) => total + (song.duration || 0), 0);
  
  const formatDuration = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes} min ${seconds} s`;
  };

  if (!album) return null;

  return (
    <>
      <Sidebar />
      <div className="bg-[#323131] text-white flex flex-col items-center py-32 h-screen overflow-y-auto px-4">
        <div className="text-center mb-6 sm:mb-8">
          <img
            src={album.album_photo}
            className="w-56 h-56 sm:w-52 sm:h-52 object-cover mx-auto mb-4"
          />
          <h1 className="text-2xl sm:text-4xl font-bold">{album.album_article}</h1>
          <h2 className="text-sm sm:text-lg text-gray-400">
            <Link to={`/artist/${album.album_author_id}`}>{author?.artist_name}</Link> · {(album.public_date).split('-')[0]} · {totalSongs} songs, {formatDuration(totalDurationInSeconds)}
          </h2>
          <button 
            onClick={toggleFavorite} 
            disabled={!userId} 
            className={`mt-4 p-2 rounded ${isFavorite ? 'bg-gray-600' : 'bg-blue-500 hover:bg-blue-700'} transition-colors duration-200`}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
        <div className="w-full max-w-3xl">
          <ul className="space-y-2">
            {songs.map((song, key) => (
              <li
                key={song.id}
                className="flex flex-col sm:flex-row justify-between items-center bg-[#2c2b2b] p-3 sm:p-4 rounded-lg cursor-pointer"
                //@ts-ignore
                onClick={() => setSelectedSong(song)}
              >
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <span className="text-gray-400 text-sm sm:text-base">{key + 1}</span>
                  <h3 className="text-base sm:text-lg">{song.article}</h3>
                </div>
                <p className="text-gray-400 text-sm sm:text-base">{author?.artist_name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Player selectedSong={selectedSong} />
    </>
  );
};

export default Album;

