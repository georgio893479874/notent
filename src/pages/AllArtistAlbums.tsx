import { supabase } from '@/services/SupabaseClientService';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Album } from './Album';

const AllArtistAlbums = () => {
  const { authorId } = useParams();
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      const { data, error } = await supabase.from('Albums').select('*').eq('album_author_id', authorId);

      if (error) {
        throw error;
      } 
    
      else {
        setAlbums(data || []);
      }
    };

    fetchAlbums();
  }, [authorId]);

  return (
    <div className="flex min-h-screen text-white my-28">
      <main className="w-full lg:ml-72 ml-0 flex flex-col items-center lg:items-start p-6 overflow-y-auto lg:px-12 px-6">
        <h1 className="text-4xl font-bold mb-12 text-center">Artist Albums</h1>
        <div className="flex flex-col gap-8 w-full">
          {albums.map((album) => (
            <Link to={`/album/${album.album_id}`}>
                <div
                    key={album.album_article}
                    className="bg-[#2c282c9b] rounded-lg overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105 flex"
                >
                    <div className="w-1/3 flex-shrink-0">
                        <img
                        src={album.album_photo}
                        alt={album.album_article}
                        className="w-full h-full object-cover"
                        style={{ aspectRatio: '1 / 1' }}
                        />
                    </div>
                    <div className="w-2/3 p-6">
                        <h2 className="text-2xl font-semibold mb-2">{album.album_article}</h2>
                        <p className="text-white font-bolt text-sm mb-4">{(album.public_date).split('-')[0]}</p>
                    </div>
                </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AllArtistAlbums;





