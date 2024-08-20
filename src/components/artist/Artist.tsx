//it`s needing to develop

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/services/SupabaseClientService";

export interface IArtist {
  artist_id: string;
  artist_name: string;
  artist_avatar: string;
}

interface IAlbum {
  album_author_id: string;
  album_article: string;
  album_photo: string;
}

const ArtistPage = () => {
  const { id } = useParams<{ id: string }>();
  const [artist, setArtist] = useState<IArtist | null>(null);
  const [albums, setAlbums] = useState<IAlbum[]>([]);

  useEffect(() => {
    const fetchArtistData = async () => {
      const { data: artistData, error: artistError } = await supabase.from('Artists').select('*').eq('artist_id', id).single();

      if (artistError) {
        throw artistError;
      } 
      
      else {
        setArtist(artistData);
      }

      const { data: albumData, error: albumError } = await supabase.from('Albums').select('*').eq('album_author_id', id);

      if (albumError) {
        throw albumError;
      } 
      
      else {
        setAlbums(albumData);
      }
    };

    fetchArtistData();
  }, [id]);

  if (!artist) return;

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col">
      <div className="flex items-center mb-8">
        <div className="mr-6">
          <img 
            className="rounded-full w-32 h-32"
            src={artist.artist_avatar} 
            alt={artist.artist_name}
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold">{artist.artist_name}</h1>
          <p className="text-gray-400 mt-2">82,736,050 monthly listeners</p>
          <div className="flex items-center mt-4">
            <button className="bg-green-500 text-black px-6 py-2 rounded-full font-semibold">
              Play
            </button>
            <button className="ml-4 border border-gray-600 px-6 py-2 rounded-full">
              Following
            </button>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Popular Releases</h2>
        <div className="flex space-x-4">
          {albums.map((album, idx) => (
            <div key={idx} className="w-64">
              <img 
                className="w-64 h-64 rounded-lg"
                src={album.album_photo} 
                alt={album.album_article} 
              />
              <p className="text-center mt-2">{album.album_article}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;


