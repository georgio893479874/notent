import Sidebar from '@/components/sidebar/Sidebar';
import { supabase } from '@/services/SupabaseClientService';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Album {
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

  useEffect(() => {
    const fetchAlbum = async () => {
      const { data: albumData, error: albumError } = await supabase.from('Albums').select('*').eq('album_id', albumId).single();

      if (albumError) {
        console.error(albumError);
      } 
      
      else {
        setAlbum(albumData);
      }
    };

    const fetchSongs = async () => {
      const { data: songsData, error: songsError } = await supabase.from('Songs').select('*').eq('album_id', albumId);

      if (songsError) {
        throw songsError;
      } 
      
      else {
        setSongs(songsData || []);
      }
    };

    const fetchAuthor = async () => {
        if (album?.album_author_id) {
            const { data: authorData, error: authorError } = await supabase.from('Artists').select('*').eq('artist_id', album.album_author_id);

            if (authorError) {
                throw authorError;
            } 

            else {
                setAuthor(authorData?.[0] || null);
            }
        }
    };

    fetchAlbum();
    fetchSongs();
    fetchAuthor();
  }, [albumId, album?.album_author_id]);

  if (!album) return null;

  return (
    <>
      <Sidebar />
      <div className="bg-[#323131] text-white flex flex-col items-center p-8 h-screen">
        <div className="text-center mb-8">
          <img
            src={album.album_photo}
            className="w-48 h-48 object-cover mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold">{album.album_article}</h1>
          <h2 className="text-lg text-gray-400">
            {author?.artist_name} · {(album.public_date).split('-')[0]} · 13 songs, 49 min 57 s
          </h2>
        </div>
        <div className="w-full max-w-3xl">
          <ul className="space-y-2">
            {songs.map((song) => (
              <li
                key={song.id}
                className="flex justify-between items-center bg-gray-800 p-4 rounded-lg hover:bg-gray-700"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400">{song.id}</span>
                  <h3 className="text-lg">{song.article}</h3>
                </div>
                <p className="text-gray-400">{author?.artist_name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Album;
