import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/services/SupabaseClientService';

export interface Album {
    album_id: string;
    album_article: string;
    album_photo: string;
    public_date: string;
}

const FavoriteAlbums: React.FC = () => {
    const [albums, setAlbums] = useState<Album[]>([]);

    useEffect(() => {
        const fetchFavoriteAlbums = async () => {
            const { data: userData, error: userError } = await supabase.auth.getUser();

            if (userError) {
                throw userError;
                return;
            }
            
            const userId = userData?.user?.id;

            if (userId) {
                const { data: favoritesData, error: favoritesError } = await supabase.from('FavoriteAlbums').select('album_id').eq('user_id', userId);

                if (favoritesError) {
                    throw favoritesError;
                    return;
                }

                const albumId = favoritesData.map((favorite: { album_id: string }) => favorite.album_id);
                
                if (albumId.length > 0) {
                    const { data: albumsData, error: albumsError } = await supabase.from('Albums').select('*').in('album_id', albumId);

                    if (albumsError) {
                        throw albumsError;
                        return;
                    }

                    setAlbums(albumsData || []);
                }
            }
        };

        fetchFavoriteAlbums();
    }, []);

    return (
        <div className="text-white p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold mb-4 md:mb-6 text-left">Favorite Albums</h1>
                <div className="flex space-x-4 overflow-x-auto no-scrollbar">
                    {albums.map((album) => (
                        <Link
                            to={`/album/${album.album_id}`}
                            key={album.album_id}
                            className="flex flex-col items-start p-4 rounded-lg cursor-pointer shrink-0"
                        >
                            <img
                                src={album.album_photo}
                                alt={album.album_article}
                                className="w-full h-[160px] md:h-[180px] object-cover mb-2 md:mb-4 rounded-md"
                            />
                            <div className="text-sm text-gray-400 text-left">
                                LABEL
                            </div>
                            <h3 className="text-white text-base font-semibold truncate text-left">
                                {album.album_article}
                            </h3>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FavoriteAlbums;

